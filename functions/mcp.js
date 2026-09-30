// Minimal MCP server over Streamable HTTP: initialize, tools/list, tools/call.
// It exposes exactly one tool, a read-only lookup over the site's own pages,
// backed by the same data file the generated pages come from.

const PROTOCOL = "2025-06-18";
const SERVER = { name: "shooter-atlas-lookup", version: "1.0.0" };
const ENDPOINT = "/agent-data/pages.json";

const TOOL = {
  name: "site_lookup",
  title: "Shooter Atlas page lookup",
  description:
    "Read-only lookup over shooteratlas.com. Give an id to read one page as markdown (for example wardogs-price), or a query to find the page that answers it. Every figure on the site carries its source and the date it was read; keep both when you use them.",
  inputSchema: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "Page id: index, wardogs, wardogs-price, wardogs-reviews, wardogs-achievements, wardogs-early-access, wardogs-reddit, wardogs-release-date, wardogs-battalion-1944, about, privacy, contact",
      },
      query: {
        type: "string",
        description: "Free text; matched against page titles, descriptions, headings and body",
      },
    },
    anyOf: [{ required: ["id"] }, { required: ["query"] }],
  },
  annotations: { readOnlyHint: true, openWorldHint: false },
};

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "content-type, mcp-protocol-version",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    },
  });

const rpc = (id, result) => json({ jsonrpc: "2.0", id, result });
const rpcError = (id, code, message) => json({ jsonrpc: "2.0", id, error: { code, message } });

async function load(env, request) {
  const res = await env.ASSETS.fetch(new URL(ENDPOINT, request.url));
  return res.ok ? res.json() : null;
}

function score(page, terms) {
  const hay = [page.title, page.description, page.headings.map((h) => h.text).join(" ")]
    .join(" ")
    .toLowerCase();
  const body = page.text.toLowerCase();
  let s = 0;
  for (const term of terms) {
    if (hay.includes(term)) s += 10;
    if (body.includes(term)) s += 1;
  }
  return s;
}

async function lookup(env, request, args) {
  const data = await load(env, request);
  if (!data) return { text: "The page index is not readable right now.", isError: true };

  const id = typeof args?.id === "string" ? args.id.replace(/^\/+/, "").replace(/\.html$/, "") : null;
  if (id) {
    const page = data.pages.find((p) => p.id === id);
    if (!page) {
      return {
        text:
          "No page with id " + JSON.stringify(id) + ". Known ids: " + data.pages.map((p) => p.id).join(", ") + ".",
        isError: false,
      };
    }
    return { text: render(data, page) };
  }

  const query = typeof args?.query === "string" ? args.query : "";
  const terms = query.toLowerCase().split(/[^a-z0-9]+/).filter((t) => t.length > 2);
  if (!terms.length) {
    return { text: "Give an id or a longer query. Known ids: " + data.pages.map((p) => p.id).join(", ") + "." };
  }
  const ranked = data.pages
    .map((p) => ({ page: p, s: score(p, terms) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s);
  if (!ranked.length) {
    return {
      text:
        "Nothing on shooteratlas.com matches " +
        JSON.stringify(query) +
        ". Pages: " +
        data.pages.map((p) => p.id).join(", ") +
        ".",
    };
  }
  const others = ranked.slice(1, 4).map((r) => r.page.id);
  const header = others.length ? "Other candidates: " + others.join(", ") + "\n\n" : "";
  return { text: header + render(data, ranked[0].page) };
}

function render(data, page) {
  return [
    "source_url: " + page.url,
    "last_modified: " + page.last_modified,
    "generated: " + data.generated,
    "",
    page.text,
  ].join("\n");
}

export async function onRequestPost(context) {
  const { request, env } = context;
  let message;
  try {
    message = await request.json();
  } catch {
    return rpcError(null, -32700, "Parse error");
  }
  const { id = null, method, params } = message ?? {};

  switch (method) {
    case "initialize":
      return rpc(id, {
        protocolVersion: PROTOCOL,
        capabilities: { tools: { listChanged: false } },
        serverInfo: SERVER,
        instructions:
          "Read-only lookup over shooteratlas.com. Use site_lookup with {id} or {query}. Keep the source link and the read date that accompany every figure.",
      });
    case "notifications/initialized":
    case "notifications/cancelled":
      return new Response(null, { status: 202, headers: { "Access-Control-Allow-Origin": "*" } });
    case "ping":
      return rpc(id, {});
    case "tools/list":
      return rpc(id, { tools: [TOOL] });
    case "tools/call": {
      const name = params?.name;
      if (name !== TOOL.name) return rpcError(id, -32602, "Unknown tool: " + name);
      const result = await lookup(env, request, params?.arguments ?? {});
      return rpc(id, {
        content: [{ type: "text", text: result.text }],
        isError: Boolean(result.isError),
      });
    }
    case "resources/list":
      return rpc(id, { resources: [] });
    case "prompts/list":
      return rpc(id, { prompts: [] });
    default:
      return rpcError(id, -32601, "Method not found: " + method);
  }
}

export async function onRequest(context) {
  const { request } = context;
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "content-type, mcp-protocol-version",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      },
    });
  }
  if (request.method === "POST") return onRequestPost(context);
  // This server answers POST only; it does not offer a server-initiated SSE
  // stream, so GET is refused rather than left hanging.
  return json({ error: "method_not_allowed", message: "This MCP server accepts POST with JSON-RPC." }, 405);
}
