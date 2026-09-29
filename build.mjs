// Shooter Atlas — static build.
// Renders every page in src/pages.mjs into ./dist, then writes robots.txt and a
// sitemap.xml whose lastmod dates come from git history (falling back to the
// file mtime, then the build date). Add a page to src/pages.mjs and both the
// page and its sitemap entry appear on the next build.

import { mkdir, writeFile, stat, cp, readFile, readdir } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import path from "node:path";
import { layout } from "./src/layout.mjs";
import { pages, notFound } from "./src/pages.mjs";
import { htmlToMarkdown, tokenCount } from "./src/markdown.mjs";
import { agentDocuments } from "./src/agent.mjs";

const SITE = (process.env.SITE_URL || "https://shooteratlas.com").replace(/\/+$/, "");
const OUT = "dist";

function gitDate(file) {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", file], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
  } catch {
    return null;
  }
}

async function lastmod(file) {
  const fromGit = gitDate(file);
  if (fromGit) return fromGit;
  try {
    const s = await stat(file);
    return s.mtime.toISOString().slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

function urlFor(p) {
  return p === "/" ? SITE + "/" : SITE + p;
}

async function build() {
  await mkdir(OUT, { recursive: true });

  // Every asset URL carries a hash of the file it points at.
  //
  // A card is redrawn but keeps its filename, and Cloudflare caches /assets/*
  // for four hours whatever the origin says. Versioning the URL is the one fix
  // that holds whatever the cache policy is: a redrawn card is a new URL and is
  // fetched at once, and og:image moves with it, which is also what busts the
  // copy a social platform has already scraped.
  const assetVersions = new Map();
  try {
    for (const name of await readdir("assets/img")) {
      const bytes = await readFile(path.join("assets/img", name));
      assetVersions.set(name, createHash("sha256").update(bytes).digest("hex").slice(0, 8));
    }
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }
  const versionAssets = (html) =>
    html.replace(/\/assets\/img\/([A-Za-z0-9._-]+)/g, (whole, name) =>
      assetVersions.has(name) ? whole + "?v=" + assetVersions.get(name) : whole);

  const sitemapEntries = [];
  const rendered = [];
  for (const page of pages) {
    const html = layout({
      title: page.title,
      description: page.description,
      canonical: urlFor(page.path),
      body: page.body,
      extraHead: page.extraHead ?? "",
      ogImage: page.ogImage ?? "",
      toc: page.toc !== false,
    });
    // "/" -> index.html ; "/wardogs" -> wardogs.html (Pages serves /wardogs from it)
    const clean = page.path.replace(/^\//, "");
    const rel = clean === "" ? "index.html" : clean.endsWith(".html") ? clean : clean + ".html";
    const target = path.join(OUT, rel);
    await mkdir(path.dirname(target), { recursive: true });
    // The Markdown twin keeps the plain URL: it is read, not rendered, and the
    // version query would only be noise in a text answer.
    await writeFile(target, versionAssets(html), "utf8");
    const pageLastmod = await lastmod(page.source);
    sitemapEntries.push({ loc: urlFor(page.path), lastmod: pageLastmod });
    rendered.push({ page, html, lastmod: pageLastmod });
    console.log("page    " + rel + "  (lastmod " + sitemapEntries.at(-1).lastmod + ")");
  }

  // Markdown for Agents: the same pages, rendered from the same source, so an
  // agent that asks for text/markdown gets the page rather than a stub.
  const pageList = [];
  for (const { page, html, lastmod: pageLastmod } of rendered) {
    const id = page.path.replace(/^\//, "") || "index";
    const md = htmlToMarkdown(html);
    const mdRel = "md/" + id + ".md";
    await mkdir(path.dirname(path.join(OUT, mdRel)), { recursive: true });
    await writeFile(path.join(OUT, mdRel), md, "utf8");
    const headings = [...page.body.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({
      level: Number(m[1]),
      text: htmlToMarkdown(m[2]).replace(/\n+/g, " ").trim(),
    }));
    pageList.push({
      id,
      path: page.path,
      url: urlFor(page.path),
      title: page.title,
      description: page.description,
      last_modified: pageLastmod,
      markdown_url: SITE + "/" + mdRel,
      markdown_file: mdRel,
      tokens: tokenCount(md),
      headings,
      text: md,
      source: page.source,
    });
    console.log("md      " + mdRel + "  (" + md.length + " chars)");
  }

  // One data file backs the agent API and the MCP tool, so both answer from the
  // same content the HTML pages were built from.
  const today = new Date().toISOString().slice(0, 10);
  const dataDir = path.join(OUT, "agent-data");
  await mkdir(dataDir, { recursive: true });
  await writeFile(
    path.join(dataDir, "pages.json"),
    JSON.stringify({ site: SITE, generated: today, pages: pageList }, null, 2) + "\n",
    "utf8",
  );
  console.log("file    agent-data/pages.json  (" + pageList.length + " pages)");

  const nf = layout({
    title: notFound.title,
    description: notFound.description,
    canonical: SITE + "/404.html",
    body: notFound.body,
  });
  await writeFile(path.join(OUT, "404.html"), nf, "utf8");
  console.log("page    404.html");

  // Static assets (the per-page images) ship with the build. Cloudflare Pages
  // serves dist/ as-is, so anything not copied here never reaches the live site.
  try {
    await cp("assets", path.join(OUT, "assets"), { recursive: true });
    console.log("dir     assets/");
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
    console.log("dir     assets/ (none)");
  }

  // Content Signals: search and agent input are welcome (this site exists to be
  // read and cited), model training is not. The owner can flip a value here and
  // the next build carries it.
  const robots =
    [
      "User-agent: *",
      "Allow: /",
      "Content-Signal: search=yes, ai-input=yes, ai-train=no",
      "Sitemap: " + SITE + "/sitemap.xml",
    ].join("\n") + "\n";
  await writeFile(path.join(OUT, "robots.txt"), robots, "utf8");
  console.log("file    robots.txt");

  // Agent discovery documents, all generated from the page data above.
  for (const doc of agentDocuments({ site: SITE, pageList, generated: today })) {
    const target = path.join(OUT, doc.path);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, doc.body, "utf8");
    console.log("agent   " + doc.path + "  (" + doc.type + ", " + doc.body.length + " bytes)");
  }

  // Response headers. The Link relations point at resources that are really
  // served, and the extensionless discovery documents get their exact media
  // types here.
  const headers = [
    "# Generated by build.mjs. Do not edit dist/ by hand.",
    "/*",
    '  Link: </.well-known/api-catalog>; rel="api-catalog", </openapi.json>; rel="service-desc", </ai/index.md>; rel="service-doc", </.well-known/ai-catalog.json>; rel="describedby"',
    "",
    "/.well-known/api-catalog",
    "  Content-Type: application/linkset+json",
    "",
    "/.well-known/oauth-authorization-server",
    "  Content-Type: application/json",
    "",
    "/.well-known/oauth-protected-resource",
    "  Content-Type: application/json",
    "",
    "/.well-known/*",
    "  Access-Control-Allow-Origin: *",
    "",
    "/api/*",
    "  Access-Control-Allow-Origin: *",
    "",
    "/ai/*",
    "  Access-Control-Allow-Origin: *",
    "",
    // Declared, but not currently in force. This zone's Browser Cache TTL —
    // four hours, Cloudflare's default — overrides the Cache-Control an origin
    // sends for a cached static asset, which is why a reader could get the new
    // page next to the previous drawing of its card. The CORS rule further up
    // in this same file does apply, so it is the zone setting and not the file.
    //
    // It is left harmless by the versioned asset URLs below: a redrawn card is
    // a different URL and is fetched at once whatever the cache policy is. The
    // rule stays so that switching the zone to respect origin headers would
    // change nothing rather than something.
    "/assets/*",
    "  Cache-Control: public, max-age=0, must-revalidate",
    "",
    "/md/*",
    "  Access-Control-Allow-Origin: *",
    "  Content-Type: text/markdown; charset=utf-8",
    "",
  ].join("\n");
  await writeFile(path.join(OUT, "_headers"), headers, "utf8");
  console.log("file    _headers");

  const sitemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    sitemapEntries
      .map((e) => "  <url>\n    <loc>" + e.loc + "</loc>\n    <lastmod>" + e.lastmod + "</lastmod>\n  </url>")
      .join("\n") +
    "\n</urlset>\n";
  await writeFile(path.join(OUT, "sitemap.xml"), sitemap, "utf8");
  console.log("file    sitemap.xml  (" + sitemapEntries.length + " url)");
}

await build();
