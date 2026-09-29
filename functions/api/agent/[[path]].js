// The public read-only lookup API behind the API catalog, the OpenAPI document
// and the site-lookup skill. It serves the same data the HTML pages were built
// from, needs no credential, and has no write operations.

const ENDPOINT = "/agent-data/pages.json";

const headers = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, max-age=300",
  "Access-Control-Allow-Origin": "*",
};

const json = (body, status = 200) => new Response(JSON.stringify(body, null, 2) + "\n", { status, headers });

export async function onRequestGet(context) {
  const { request, env, params } = context;
  const res = await env.ASSETS.fetch(new URL(ENDPOINT, request.url));
  if (!res.ok) return json({ error: "unavailable", message: "Page index is not readable" }, 503);
  const data = await res.json();

  const segments = Array.isArray(params.path) ? params.path : params.path ? [params.path] : [];

  if (segments.length === 0) {
    return json({
      service: "Shooter Atlas agent lookup",
      site: data.site,
      generated: data.generated,
      read_only: true,
      endpoints: {
        pages: "/api/agent/pages",
        page: "/api/agent/pages/{id}",
        mcp: "/mcp",
        skill: "/ai/skills/site-lookup/SKILL.md",
      },
    });
  }

  if (segments[0] !== "pages") return json({ error: "not_found", path: "/" + segments.join("/") }, 404);

  if (segments.length === 1) {
    return json({
      site: data.site,
      generated: data.generated,
      pages: data.pages.map((p) => ({
        id: p.id,
        path: p.path,
        url: p.url,
        title: p.title,
        description: p.description,
        last_modified: p.last_modified,
        markdown_url: p.markdown_url,
      })),
    });
  }

  const id = segments[1].replace(/\.json$/, "");
  const page = data.pages.find((p) => p.id === id);
  if (!page) return json({ error: "not_found", id, known_ids: data.pages.map((p) => p.id) }, 404);

  return json({
    id: page.id,
    path: page.path,
    url: page.url,
    title: page.title,
    description: page.description,
    last_modified: page.last_modified,
    source: page.source,
    headings: page.headings,
    markdown_url: page.markdown_url,
    text: page.text,
  });
}

export async function onRequest(context) {
  if (context.request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "content-type",
      },
    });
  }
  if (context.request.method !== "GET") {
    return json({ error: "method_not_allowed", message: "This API is read-only; use GET." }, 405);
  }
  return onRequestGet(context);
}
