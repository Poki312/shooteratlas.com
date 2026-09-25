// Shooter Atlas — static build.
// Renders every page in src/pages.mjs into ./dist, then writes robots.txt and a
// sitemap.xml whose lastmod dates come from git history (falling back to the
// file mtime, then the build date). Add a page to src/pages.mjs and both the
// page and its sitemap entry appear on the next build.

import { mkdir, writeFile, stat } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { layout } from "./src/layout.mjs";
import { pages, notFound } from "./src/pages.mjs";

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

  const sitemapEntries = [];
  for (const page of pages) {
    const html = layout({
      title: page.title,
      description: page.description,
      canonical: urlFor(page.path),
      body: page.body,
    });
    // "/" -> index.html ; "/wardogs" -> wardogs.html (Pages serves /wardogs from it)
    const clean = page.path.replace(/^\//, "");
    const rel = clean === "" ? "index.html" : clean.endsWith(".html") ? clean : clean + ".html";
    const target = path.join(OUT, rel);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, html, "utf8");
    sitemapEntries.push({ loc: urlFor(page.path), lastmod: await lastmod(page.source) });
    console.log("page    " + rel + "  (lastmod " + sitemapEntries.at(-1).lastmod + ")");
  }

  const nf = layout({
    title: notFound.title,
    description: notFound.description,
    canonical: SITE + "/404.html",
    body: notFound.body,
  });
  await writeFile(path.join(OUT, "404.html"), nf, "utf8");
  console.log("page    404.html");

  const robots = ["User-agent: *", "Allow: /", "Sitemap: " + SITE + "/sitemap.xml"].join("\n") + "\n";
  await writeFile(path.join(OUT, "robots.txt"), robots, "utf8");
  console.log("file    robots.txt");

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
