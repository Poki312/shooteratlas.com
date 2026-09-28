// Shared HTML shell. One inline stylesheet, no web fonts. The only external
// request is Cloudflare's own Web Analytics beacon at the end of the body.

export function layout({ title, description, canonical, body, extraHead = "" }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#0b57d0">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Shooter Atlas">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta name="twitter:card" content="summary">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2032%2032'%3E%3Crect%20width='32'%20height='32'%20rx='7'%20fill='%230b57d0'/%3E%3Ccircle%20cx='16'%20cy='16'%20r='6.5'%20fill='none'%20stroke='%23fff'%20stroke-width='2.4'/%3E%3Cpath%20d='M16%203.5v5M16%2023.5v5M3.5%2016h5M23.5%2016h5'%20stroke='%23fff'%20stroke-width='2.4'%20stroke-linecap='round'/%3E%3C/svg%3E">
${extraHead}
<style>
:root{--ink:#111722;--muted:#5b6774;--rule:#e3e7ed;--bg:#fff;--link:#0b57d0;--bg-soft:#f6f8fb;--ink-soft:#2b3441;--btn-hover:#0a4bb5}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font:17px/1.62 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
.wrap{max-width:41rem;margin:0 auto;padding:0 1.25rem}
.site-head{border-bottom:1px solid var(--rule);background:var(--bg-soft);padding:1.4rem 0 1.15rem}
.site-head-in{display:flex;align-items:center;justify-content:space-between;gap:1.25rem;flex-wrap:wrap}
.brand-block{min-width:0}
.site-head-nav{display:flex;gap:1.1rem;flex-wrap:wrap}
.site-head-nav a{color:var(--ink);text-decoration:none;font-size:.95rem}
.site-head-nav a:hover{text-decoration:underline}
.brand{display:inline-block;font-weight:700;font-size:1.14rem;letter-spacing:-.01em;color:var(--ink);text-decoration:none}
.mark{width:1.05em;height:1.05em;vertical-align:-.16em;margin-right:.45rem}
.tagline{margin:.25rem 0 0;color:var(--muted);font-size:.94rem}
main{padding:2.4rem 0 1.2rem}
h1{font-size:2rem;line-height:1.2;letter-spacing:-.02em;margin:0 0 .85rem;overflow-wrap:break-word}
.lede{font-size:1.16rem;line-height:1.55;color:var(--ink-soft);margin:0 0 2.2rem}
h2{font-size:1.3rem;line-height:1.35;letter-spacing:-.01em;margin:2.6rem 0 .55rem}
p{margin:0 0 1.05rem;overflow-wrap:break-word}
ul{margin:0 0 1.05rem;padding-left:1.15rem}
li{margin:.4rem 0}
a{color:var(--link);text-decoration:underline;text-underline-offset:2px}
a:hover{color:var(--btn-hover)}
a:focus-visible{outline:2px solid var(--link);outline-offset:2px;border-radius:3px}
.site-foot{border-top:1px solid var(--rule);background:var(--bg-soft);margin-top:2.8rem;padding:1.2rem 0 2.6rem;color:var(--muted);font-size:.9rem}
.site-foot p{margin:0}
.site-nav{margin:.8rem 0 0;display:flex;flex-wrap:wrap;gap:.25rem 1.1rem}
.site-nav a{color:var(--muted);text-decoration:none}
.site-nav a:hover{text-decoration:underline}
.btn{display:inline-block;background:var(--link);color:#fff;font-weight:600;padding:.7rem 1.15rem;border-radius:8px;text-decoration:none}
.btn:hover{background:var(--btn-hover);color:#fff}
.hub{margin:0 0 2.4rem;border:1px solid var(--rule);border-radius:10px;background:var(--bg-soft);padding:0 1.1rem}
.hub a{display:block;padding:.8rem 0;border-top:1px solid var(--rule);font-weight:600;text-decoration:none}
.hub a:first-child{border-top:0}
.hub a:hover{text-decoration:underline}
.readnext{margin:2.8rem 0 0;border:1px solid var(--rule);border-radius:10px;background:var(--bg-soft);padding:1.1rem 1.2rem 1.2rem}
.readnext p{margin:.5rem 0}
.readnext p:first-child{margin-top:0}
.readnext p:last-child{margin-bottom:0}
.qa{margin:2.9rem 0 0;border-top:1px solid var(--rule);padding-top:1.7rem}
.qa h2{margin-top:0}
.qa h3{font-size:1.05rem;line-height:1.4;margin:1.55rem 0 .35rem}
.qa p{margin:0 0 .45rem;color:var(--ink-soft)}
.src{margin:2.3rem 0 0;font-size:.88rem;line-height:1.6;color:var(--muted);border-top:1px solid var(--rule);padding-top:1rem}
.src a{color:inherit}
.ad{margin:2.7rem 0 0;border:1px solid var(--rule);border-radius:10px;background:var(--bg-soft);padding:1rem 1.15rem 1.05rem}
.ad-label{margin:0 0 .4rem;font-size:.72rem;letter-spacing:.09em;text-transform:uppercase;color:var(--muted)}
.ad-body{margin:0;font-size:1.05rem;font-weight:600;line-height:1.45}
.ad-note{margin:.5rem 0 0;font-size:.85rem;color:var(--muted)}
.cta{margin:2.6rem 0 1.2rem}
@media (prefers-color-scheme: dark){
:root{--ink:#e7ecf3;--muted:#9aa7b6;--rule:#242c37;--bg:#0f1319;--bg-soft:#151b23;--link:#7fb0ff;--ink-soft:#c3ccd4;--btn-hover:#9cc2ff}
.btn,.btn:hover{color:#0b1220}
}
@media (max-width:560px){
.wrap{padding:0 1.1rem}
.site-head{padding:1.1rem 0 .95rem}
main{padding:1.9rem 0 1rem}
h1{font-size:1.75rem}
h2{font-size:1.22rem;margin-top:2.2rem}
.lede{font-size:1.08rem}
.site-nav{gap:.15rem 1.1rem}
.site-nav a,.site-head-nav a{display:inline-block;padding:.6rem 0}
}
@media (max-width:430px){
body{font-size:17px}
h1{font-size:1.6rem}
.lede{font-size:1.05rem}
}
</style>
</head>
<body>
<header class="site-head"><div class="wrap site-head-in">
<div class="brand-block">
<a class="brand" href="/"><svg class="mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><rect width="32" height="32" rx="7" fill="currentColor" opacity=".12"/><circle cx="16" cy="16" r="6.5" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M16 3.5v5M16 23.5v5M3.5 16h5M23.5 16h5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>Shooter Atlas</a>
<p class="tagline">Numbers for large-scale tactical shooters</p>
</div>
<nav class="site-head-nav" aria-label="Site">
<a href="/wardogs">Wardogs</a>
<a href="/about">About</a>
<a href="/contact">Contact</a>
</nav>
</div></header>
<main><div class="wrap">
${body}
</div></main>
<footer class="site-foot"><div class="wrap">
<p>Shooter Atlas. Every figure on this site is either taken from official material or measured in game, and is labelled with which of the two it is.</p>
<nav class="site-nav" aria-label="Site">
<a href="/about">About</a>
<a href="/privacy">Privacy</a>
<a href="/contact">Contact</a>
</nav>
</div></footer>
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "37c294a762ef45d995a15279d79a66d1"}'></script>
</body>
</html>`;
}
