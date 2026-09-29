// Planned authorisation endpoints. Nothing here is implemented, and the answer
// says so: every call returns 503 temporarily_unavailable. The request body is
// never read, nothing is stored, no account is created, no token is issued and
// no redirect is started.

const headers = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "Access-Control-Allow-Origin": "*",
};

const unavailable = {
  status: "under_construction",
  available: false,
  capabilities_status: "planned_contract_only",
  error: "temporarily_unavailable",
  error_description:
    "Coming soon. No registration, claim or token issuance is available. Use the public read-only lookup service at /api/agent/pages, which needs no credential.",
  launch_date: null,
  public_service: {
    lookup: "/api/agent/pages",
    mcp: "/mcp",
    skill: "/ai/skills/site-lookup/SKILL.md",
    auth_md: "/auth.md",
  },
};

export async function onRequest() {
  return new Response(JSON.stringify(unavailable, null, 2) + "\n", { status: 503, headers });
}
