// Shared HTML shell. No external requests: one inline stylesheet, no fonts, no
// scripts until Web Analytics is switched on.

export function layout({ title, description, canonical, body }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<style>
:root{--ink:#111722;--muted:#5b6774;--rule:#e3e7ed;--bg:#fff;--link:#0b57d0}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--ink);font:17px/1.62 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}
.wrap{max-width:44rem;margin:0 auto;padding:0 1.25rem}
.site-head{border-bottom:1px solid var(--rule);padding:1.4rem 0 1.15rem}
.brand{display:inline-block;font-weight:700;font-size:1.14rem;letter-spacing:-.01em;color:var(--ink);text-decoration:none}
.tagline{margin:.25rem 0 0;color:var(--muted);font-size:.94rem}
main{padding:2rem 0 1rem}
h1{font-size:1.74rem;line-height:1.25;letter-spacing:-.02em;margin:0 0 .8rem;overflow-wrap:break-word}
.lede{font-size:1.07rem;color:#2b3441;margin:0 0 2.1rem}
h2{font-size:1.13rem;line-height:1.35;letter-spacing:-.01em;margin:2.2rem 0 .5rem}
p{margin:0 0 1rem;overflow-wrap:break-word}
ul{margin:0 0 1rem;padding-left:1.15rem}
li{margin:.4rem 0}
a{color:var(--link)}
.site-foot{border-top:1px solid var(--rule);margin-top:2.6rem;padding:1.2rem 0 2.6rem;color:var(--muted);font-size:.9rem}
.site-foot p{margin:0}
@media (max-width:430px){body{font-size:16px}h1{font-size:1.5rem}}
</style>
</head>
<body>
<header class="site-head"><div class="wrap">
<a class="brand" href="/">Shooter Atlas</a>
<p class="tagline">Numbers for large-scale tactical shooters</p>
</div></header>
<main><div class="wrap">
${body}
</div></main>
<footer class="site-foot"><div class="wrap">
<p>Shooter Atlas. Every figure on this site is either taken from official material or measured in game, and is labelled with which of the two it is.</p>
</div></footer>
</body>
</html>`;
}
