# Shooter Atlas

Static site for **shooteratlas.com** — a reference for large-scale tactical
shooters, one game per page.

## Layout

```
build.mjs            build script (no dependencies)
src/layout.mjs       shared HTML shell and stylesheet
src/pages.mjs        the list of pages that should exist
src/pages/*.mjs      page source, one module per page
dist/                build output (generated, not committed)
```

## Build

```
node build.mjs
```

Writes `dist/`:

* one HTML file per entry in `src/pages.mjs`
* `404.html` — served for any path that does not exist, with a real 404 status
* `robots.txt` — three lines: `User-agent`, `Allow`, `Sitemap`
* `sitemap.xml` — one `<url>` per page, each with a `<lastmod>` taken from the
  last git commit that touched that page's source file (falling back to the
  file mtime, then the build date)

Adding a page means adding a module and listing it in `src/pages.mjs`; the
sitemap and the page both appear on the next build.

## Cloudflare Pages

* Build command: `node build.mjs`
* Output directory: `dist`
* No environment variables are required; `SITE_URL` can override the absolute
  URL used in the sitemap and canonical tags.

## Rules this site holds itself to

* No placeholder copy and no "coming soon" pages.
* A path that does not exist returns 404 — it never falls back to the home page.
* Every number carries a source; unsourced figures are left out rather than
  guessed.
