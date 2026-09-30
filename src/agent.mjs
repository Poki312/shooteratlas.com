// The agent-facing discovery layer: every document here is generated from the
// same page data the HTML build uses, so an agent reading the machine copy and
// a visitor reading the page can never be told two different things.
//
// Honesty rules this file follows:
//   * the site has no accounts, no login and no write operations, so the OAuth
//     and auth.md documents declare a construction state instead of pretending
//     a working authorisation server exists;
//   * the only capabilities advertised are ones that are actually served:
//     the read-only page API, the MCP server and the lookup skill.

import { createHash } from "node:crypto";

const sha256 = (s) => "sha256:" + createHash("sha256").update(s, "utf8").digest("hex");

// I-Lang operating brief. Agents are told to keep the site's own qualifiers and
// read dates, answer in the visitor's language and leave unknowns unknown.
function ilangBrief(site, pageList) {
  const lines = [];
  lines.push("::ILANG");
  lines.push("[TYPE:service_brief][SERVICE:Shooter Atlas][LANG:en]");
  lines.push("");
  lines.push("::STATE{@SITE, value:" + site + ", kind:reference site for large-scale tactical shooters}");
  lines.push("::STATE{@SCOPE, value:one page per game, every figure carries the date it was read}");
  lines.push("::STATE{@READ_ONLY, value:true, note:no accounts, no login, no writes}");
  lines.push("");
  lines.push("::OBJECTIVE{answer_from_this_site|pri:NORMAL}");
  lines.push("  target: answer a question about a game on this site from the page that holds the figure");
  lines.push("  ACCEPT: the figure, the page it came from, the date the page read it");
  lines.push("");
  lines.push("::RULE{keep every qualifier the page uses: official, reported, third-party, measured}");
  lines.push("::RULE{keep every read date, format read YYYY-MM-DD; never print a figure without one}");
  lines.push("::RULE{answer in the language the visitor asked in}");
  lines.push("::RULE{cite the page URL the answer came from}");
  lines.push("::RULE{if the site does not hold the fact, say so; do not fill the gap from memory}");
  lines.push("::RULE{do not state a price or a count without its region, patch or read date}");
  lines.push("::BOUNDARY{never:invent a figure, a date or a source|scope:permanent}");
  lines.push("");
  lines.push("::MODULE{LOOKUP}");
  lines.push("  [STEP:1:LIST] " + site + "/api/agent/pages   every page with title, description and lastmod");
  lines.push("  [STEP:2:READ] " + site + "/api/agent/pages/{id}   one page as markdown plus its headings");
  lines.push("  [STEP:3:MCP]  " + site + "/mcp   tool site_lookup, arguments {id} or {query}");
  lines.push("");
  lines.push("::MODULE{PAGES}");
  for (const p of pageList) lines.push("  " + p.path.padEnd(24) + " " + p.title);
  lines.push("");
  lines.push("::MODULE{LIMITS}");
  lines.push("  [LIMIT] no user accounts, no authentication, no write operations");
  lines.push("  [LIMIT] English only");
  lines.push("  [LIMIT] in-game figures come from vendor screens: the page names the patch, not a public URL");
  lines.push("  [LIMIT] figures move; each page is a snapshot with a read date, not a live feed");
  lines.push("");
  lines.push("::FACT{key:protocol|value:I-Lang|conf=confirmed}");
  lines.push("::ILANG::COMPLETE::");
  return lines.join("\n") + "\n";
}

function aiOverview(site, pageList, generated) {
  const lines = [];
  lines.push("# Shooter Atlas — machine entry");
  lines.push("");
  lines.push("Shooter Atlas is a reference site for large-scale tactical shooters: one page per game,");
  lines.push("the same questions answered in the same order, and every figure carrying a source link and");
  lines.push("the date it was read. It covers match scoring, weapon and vehicle prices, the economy, and");
  lines.push("platform and anti-cheat support.");
  lines.push("");
  lines.push("## How to read this site");
  lines.push("");
  lines.push("1. `GET " + site + "/api/agent/pages` returns every page with its title, description and last modification date.");
  lines.push("2. `GET " + site + "/api/agent/pages/{id}` returns one page as markdown plus its headings.");
  lines.push("3. `POST " + site + "/mcp` exposes the same lookup as the MCP tool `site_lookup`.");
  lines.push("4. Any page can be requested as markdown: send `Accept: text/markdown` to the page URL.");
  lines.push("5. `" + site + "/llms.txt` is a pointer list; `" + site + "/ai/index.ilang` is the operating brief for agents.");
  lines.push("");
  lines.push("## What is on it");
  lines.push("");
  for (const p of pageList) lines.push("- " + p.title + " — " + site + p.path);
  lines.push("");
  lines.push("## Limits");
  lines.push("");
  lines.push("- Read-only. There are no accounts, no authentication and no write operations on this site.");
  lines.push("- English only.");
  lines.push("- Every figure is a snapshot with a read date, not a live feed. Prices, player counts and");
  lines.push("  achievement rates all move; re-read the cited source before repeating one.");
  lines.push("- Figures that exist only inside the game name the patch they were read from instead of a URL.");
  lines.push("");
  lines.push("## Provenance");
  lines.push("");
  lines.push("Pages are built from the site's own source and deployed through Cloudflare Pages. This document");
  lines.push("was generated on " + generated + " from the same page data as the HTML.");
  return lines.join("\n") + "\n";
}

function llmsTxt(site, pageList) {
  const lines = [];
  lines.push("# Shooter Atlas");
  lines.push("");
  lines.push("> Numbers for large-scale tactical shooters. One page per game; every figure carries a source link and the date it was read.");
  lines.push("");
  lines.push("## Pages");
  lines.push("");
  for (const p of pageList) lines.push("- [" + p.title + "](" + site + p.path + "): " + p.description);
  lines.push("");
  lines.push("## For agents");
  lines.push("");
  lines.push("- Page index API: " + site + "/api/agent/pages");
  lines.push("- MCP server: " + site + "/mcp (tool site_lookup)");
  lines.push("- Operating brief (I-Lang): " + site + "/ai/index.ilang");
  lines.push("- Skill: " + site + "/ai/skills/site-lookup/SKILL.md");
  lines.push("- Markdown negotiation: send Accept: text/markdown to any page URL.");
  return lines.join("\n") + "\n";
}

function skillDoc(site, pageList) {
  const front = [
    "---",
    "name: site-lookup",
    "description: Look up a real, dated figure on Shooter Atlas - the page index, one page as markdown, or the page that answers a query. Use when a question is about a WARDOGS number such as price, achievements, reviews, player counts or platform support.",
    "version: 1.0.0",
    "metadata:",
    "  site: " + site,
    "  service: Shooter Atlas",
    "  read_only: true",
    "---",
    "",
  ].join("\n");

  const body = [
    "# site-lookup",
    "",
    "Shooter Atlas publishes one page per large-scale tactical shooter, and every figure on those pages",
    "carries the source it came from and the date it was read. This skill fetches those pages unchanged.",
    "",
    "## Endpoints",
    "",
    "| Call | Returns |",
    "| --- | --- |",
    "| `GET " + site + "/api/agent/pages` | JSON list: id, title, description, url, last modified |",
    "| `GET " + site + "/api/agent/pages/{id}` | JSON record: the page as markdown, its headings, its source file, its read dates |",
    "| `POST " + site + "/mcp` | MCP: initialize, tools/list, tools/call with the tool site_lookup |",
    "| `GET <any page>` with `Accept: text/markdown` | The page as markdown |",
    "",
    "A page id is its path without the leading slash, and the homepage is `index`: `index`, `wardogs`,",
    "`wardogs-price`, `wardogs-reviews`, `wardogs-achievements`, `wardogs-early-access`,",
    "`wardogs-reddit`, `wardogs-release-date`, `wardogs-battalion-1944`,",
    "`wardogs-battalion-1944-launch`, `wardogs-languages`, `about`, `privacy`, `contact`.",
    "",
    "## Agent instructions",
    "",
    "```ilang",
    "::ILANG",
    "[TYPE:skill_instructions][SERVICE:Shooter Atlas][LANG:en]",
    "",
    "::RULE{keep every qualifier the page uses: official, reported, third-party, measured}",
    "::RULE{keep the read date that sits next to every figure, format read YYYY-MM-DD}",
    "::RULE{answer in the visitor's own language; quote the page's own words for a figure}",
    "::RULE{cite the page URL; name the region for a price and the source for a count}",
    "::RULE{an id that does not exist returns 404 with {error: not_found}; do not guess another id}",
    "::BOUNDARY{never:invent a figure, a date or a source|scope:permanent}",
    "::BOUNDARY{never:present a snapshot as a live value|scope:permanent}",
    "::ILANG::COMPLETE::",
    "```",
    "",
    "## Example",
    "",
    "Ask: how much is WARDOGS in Japan",
    "",
    "1. `GET " + site + "/api/agent/pages/wardogs-price`",
    "2. Answer with the row for Japan from the matrix, the source link in that row, and the page's read",
    "   date. Say it is a snapshot: Valve can change the price.",
    "",
    "## What this skill does not do",
    "",
    "It writes nothing, it cannot create accounts or buy anything, and it holds no data about people,",
    "because the site itself collects none.",
    "",
    "## Pages",
    "",
    ...pageList.map((p) => "- " + p.path + " — " + p.title),
    "",
  ].join("\n");

  return front + body;
}

function authMd(site) {
  return [
    "# auth.md",
    "",
    "Shooter Atlas is a public read-only reference site. **It has no accounts, no login and no",
    "credentials to issue.** This document exists because agent discovery asks every service to",
    "describe its authentication, and the honest answer here is that there is none yet.",
    "",
    "## Current state",
    "",
    "- Authentication: **not available** (planned contract only, nothing is implemented).",
    "- The public lookup API needs no credential: " + site + "/api/agent/pages",
    "- The MCP server needs no credential: " + site + "/mcp",
    "- Nothing on this site requires a token, and nothing on it accepts one.",
    "",
    "## Planned, and not yet built",
    "",
    "A future version may offer anonymous agent registration, so that a heavy consumer can identify",
    "itself. Until the endpoints below stop answering `503 temporarily_unavailable`, no such capability",
    "exists. Do not attempt to register, claim or exchange tokens while `available=false`: those",
    "endpoints deliberately do not store anything sent to them.",
    "",
    "- Authorization server metadata: " + site + "/.well-known/oauth-authorization-server",
    "- Protected resource metadata: " + site + "/.well-known/oauth-protected-resource",
    "- Planned registration endpoint: " + site + "/agent-auth/register",
    "- Planned token endpoint: " + site + "/agent-auth/token",
    "",
    "## Instructions for agents",
    "",
    "```ilang",
    "::ILANG",
    "[TYPE:auth_brief][SERVICE:Shooter Atlas][LANG:en]",
    "",
    "::STATE{@AUTH, available:false, status:under_construction, capabilities_status:planned_contract_only}",
    "",
    "::RULE{read the public lookup service first; it needs no credential}",
    "::RULE{treat every agent_auth field as a plan, not as a running service}",
    "::RULE{if a call to /agent-auth/ answers 503 temporarily_unavailable, stop; do not resend data}",
    "::BOUNDARY{never:send identity documents, email addresses or tokens to this site|scope:permanent}",
    "::BOUNDARY{never:describe this site as having authentication while available=false|scope:permanent}",
    "::ILANG::COMPLETE::",
    "```",
    "",
  ].join("\n");
}

// Every document the agent layer serves. build.mjs writes them into dist/.
export function agentDocuments({ site, pageList, generated }) {
  const origin = site.replace(/\/+$/, "");
  const skill = skillDoc(origin, pageList);

  const apiCatalog = {
    linkset: [
      {
        anchor: origin + "/api/agent",
        "service-desc": [{ href: origin + "/openapi.json", type: "application/json" }],
        "service-doc": [{ href: origin + "/ai/index.md", type: "text/markdown" }],
        status: [{ href: origin + "/api/agent/pages", type: "application/json" }],
      },
    ],
  };

  const openapi = {
    openapi: "3.1.0",
    info: {
      title: "Shooter Atlas agent lookup API",
      version: "1.0.0",
      description:
        "Read-only lookup over the pages this site publishes. No credential is required and no endpoint accepts a write.",
    },
    servers: [{ url: origin }],
    paths: {
      "/api/agent/pages": {
        get: {
          operationId: "listPages",
          summary: "List every page with its title, description and last modification date",
          responses: {
            200: {
              description: "The page index",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      site: { type: "string" },
                      generated: { type: "string" },
                      pages: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "string" },
                            path: { type: "string" },
                            url: { type: "string" },
                            title: { type: "string" },
                            description: { type: "string" },
                            last_modified: { type: "string" },
                            markdown_url: { type: "string" },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "/api/agent/pages/{id}": {
        get: {
          operationId: "readPage",
          summary: "Read one page as markdown, with its headings, source file and read dates",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              description: "Page id: the path without the leading slash, for example wardogs-price",
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "The page record", content: { "application/json": { schema: { type: "object" } } } },
            404: {
              description: "No page with that id",
              content: {
                "application/json": {
                  schema: { type: "object", properties: { error: { type: "string" }, id: { type: "string" } } },
                },
              },
            },
          },
        },
      },
    },
  };

  const serverCard = {
    serverInfo: { name: "shooter-atlas-lookup", title: "Shooter Atlas lookup", version: "1.0.0" },
    description:
      "Read-only lookup over the pages on shooteratlas.com: the page index, one page as markdown, or a keyword search across the pages.",
    endpoint: origin + "/mcp",
    transport: { type: "streamable-http", endpoint: origin + "/mcp" },
    capabilities: { tools: { listChanged: false } },
    instructions: "Call site_lookup with {id} for a page you know, or {query} to search the pages.",
    documentation: origin + "/ai/",
  };

  const skillsIndex = {
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: [
      {
        name: "site-lookup",
        type: "skill-md",
        description:
          "Look up a real, dated figure on Shooter Atlas: the page index, one page as markdown, or the page that answers a query.",
        url: origin + "/ai/skills/site-lookup/SKILL.md",
        digest: sha256(skill),
      },
    ],
  };

  const ard = {
    specVersion: "1.0",
    host: { displayName: "Shooter Atlas", identifier: "did:web:shooteratlas.com" },
    entries: [
      {
        identifier: "urn:air:shooteratlas.com:server:site-lookup",
        displayName: "Shooter Atlas lookup MCP server",
        type: "application/mcp-server-card+json",
        url: origin + "/.well-known/mcp/server-card.json",
        representativeQueries: [
          "how much does WARDOGS cost in Japan",
          "which WARDOGS achievements exist and how rare are they",
          "how many players are playing WARDOGS",
        ],
      },
      {
        identifier: "urn:air:shooteratlas.com:skill:site-lookup",
        displayName: "Shooter Atlas lookup skill",
        type: "text/markdown",
        url: origin + "/ai/skills/site-lookup/SKILL.md",
        representativeQueries: [
          "what does shooteratlas.com say about WARDOGS Early Access",
          "find the shooteratlas page about WARDOGS review scores",
        ],
      },
      {
        identifier: "urn:air:shooteratlas.com:api:pages",
        displayName: "Shooter Atlas page lookup API",
        type: "application/openapi+json",
        url: origin + "/openapi.json",
        representativeQueries: [
          "list the pages on shooteratlas.com",
          "read the shooteratlas page about WARDOGS prices",
        ],
      },
    ],
  };

  // Construction state, stated once and reused, so the three documents cannot
  // drift apart. Nothing here is a running authorisation server.
  const construction = {
    status: "under_construction",
    available: false,
    capabilities_status: "planned_contract_only",
  };

  const authServer = {
    ...construction,
    message: "Coming soon. Authentication is unavailable.",
    launch_date: null,
    issuer: origin,
    authorization_endpoint: origin + "/agent-auth/authorize",
    token_endpoint: origin + "/agent-auth/token",
    jwks_uri: origin + "/.well-known/jwks.json",
    grant_types_supported: ["authorization_code", "urn:ietf:params:oauth:grant-type:jwt-bearer"],
    response_types_supported: ["code"],
    code_challenge_methods_supported: ["S256"],
    scopes_supported: ["site:read"],
    agent_auth: {
      ...construction,
      skill: origin + "/auth.md",
      register_uri: origin + "/agent-auth/register",
      claim_uri: origin + "/agent-auth/claim",
      identity_types_supported: ["anonymous"],
      anonymous: { ...construction, credential_types_supported: ["access_token"] },
    },
  };

  const protectedResource = {
    ...construction,
    message:
      "Coming soon. Authentication is planned and not implemented. The public lookup service at " +
      origin +
      "/api/agent/pages stays open and needs no credential.",
    launch_date: null,
    resource: origin,
    planned_resource_endpoint: origin + "/agent-auth/resource",
    authorization_servers: [origin],
    scopes_supported: ["site:read"],
    bearer_methods_supported: ["header"],
  };

  // An empty key set is honest only while it is labelled that way.
  const jwks = {
    ...construction,
    message: "No signing keys exist yet. Authentication is planned and unavailable.",
    keys: [],
  };

  return [
    { path: ".well-known/api-catalog", type: "application/linkset+json", body: JSON.stringify(apiCatalog, null, 2) + "\n" },
    { path: ".well-known/ai-catalog.json", type: "application/json", body: JSON.stringify(ard, null, 2) + "\n" },
    { path: ".well-known/mcp/server-card.json", type: "application/json", body: JSON.stringify(serverCard, null, 2) + "\n" },
    { path: ".well-known/agent-skills/index.json", type: "application/json", body: JSON.stringify(skillsIndex, null, 2) + "\n" },
    { path: ".well-known/oauth-authorization-server", type: "application/json", body: JSON.stringify(authServer, null, 2) + "\n" },
    { path: ".well-known/oauth-protected-resource", type: "application/json", body: JSON.stringify(protectedResource, null, 2) + "\n" },
    { path: ".well-known/jwks.json", type: "application/json", body: JSON.stringify(jwks, null, 2) + "\n" },
    { path: "openapi.json", type: "application/json", body: JSON.stringify(openapi, null, 2) + "\n" },
    { path: "ai/index.ilang", type: "text/plain; charset=utf-8", body: ilangBrief(origin, pageList) },
    { path: "ai/index.md", type: "text/markdown; charset=utf-8", body: aiOverview(origin, pageList, generated) },
    { path: "ai/skills/site-lookup/SKILL.md", type: "text/markdown; charset=utf-8", body: skill },
    { path: "auth.md", type: "text/markdown; charset=utf-8", body: authMd(origin) },
    { path: "llms.txt", type: "text/plain; charset=utf-8", body: llmsTxt(origin, pageList) },
  ];
}
