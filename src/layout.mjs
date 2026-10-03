// Shared HTML shell. One inline stylesheet, no web fonts. The only external
// request is Cloudflare's own Web Analytics beacon at the end of the body.
//
// The stylesheet is the "Tactical Data" system: dark for readers whose OS asks
// for it, light otherwise, with a switch that remembers the choice. Every
// colour lives in the token block at the top of the stylesheet.
//
// Two container widths are deliberate. The shell runs at --wrap; running text
// is capped at --prose so a line stays readable, while tables, callouts and
// figures may use the full width, because that is where numbers get compared.

// Social-card tags. When a page has an image, the same file backs og:image and
// twitter:image so a shared link never renders a broken card.
function socialMeta(ogImage) {
  if (!ogImage) return `<meta name="twitter:card" content="summary">`;
  return [
    `<meta property="og:image" content="${ogImage}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="Shooter Atlas">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:image" content="${ogImage}">`,
  ].join("\n");
}

// Light is the default token set. The dark set is applied twice on purpose —
// once for the OS preference, once for an explicit choice — so the two can
// never disagree.
const LIGHT_TOKENS =
  "--ink:#0e1620;--ink-2:#3b4757;--muted:#67737f;--rule:#dde5ee;--rule-soft:#eaeff5;" +
  "--bg:#ffffff;--bg-band:#f5f8fb;--surface:#ffffff;--surface-2:#f4f7fa;--surface-3:#eaf0f6;" +
  "--accent:#a35f00;--accent-ink:#ffffff;--accent-wash:rgba(163,95,0,.10);" +
  "--ok:#0f7a5a;--ok-wash:rgba(15,122,90,.10);--link:#0b57d0;--link-hover:#093f96;" +
  "--grid:rgba(15,22,32,.045)";

const DARK_TOKENS =
  "--ink:#e9eef4;--ink-2:#b9c4d0;--muted:#7c8a9b;--rule:#26313d;--rule-soft:#1a232d;" +
  "--bg:#0a0e13;--bg-band:#0e141b;--surface:#121a23;--surface-2:#17212c;--surface-3:#1c2833;" +
  "--accent:#f0a92c;--accent-ink:#10161d;--accent-wash:rgba(240,169,44,.12);" +
  "--ok:#4ec9a0;--ok-wash:rgba(78,201,160,.13);--link:#6fb4ff;--link-hover:#a2ccff;" +
  "--grid:rgba(255,255,255,.035)";

const STYLES = `
:root{${LIGHT_TOKENS};--sans:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;--mono:ui-monospace,SFMono-Regular,"Cascadia Mono","Segoe UI Mono",Menlo,Consolas,monospace;--wrap:72rem;--prose:44rem;--measure:38rem;--rail:14rem;--r:12px;--r-sm:6px}
:root[data-theme="dark"]{${DARK_TOKENS}}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){${DARK_TOKENS}}}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);font:17px/1.62 var(--sans);-webkit-font-smoothing:antialiased}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}*{transition:none!important;animation:none!important}}
.wrap{max-width:var(--wrap);margin:0 auto;padding:0 1.5rem}
main{padding:2.4rem 0 0}
.skip{position:absolute;left:-9999px;background:var(--accent);color:var(--accent-ink);padding:.6rem 1rem;border-radius:var(--r-sm);font-weight:700;z-index:60}
.skip:focus{left:1rem;top:1rem}
/* A control that reads fine to the eye but still needs a real label: the text
   stays in the accessibility tree only, so nothing on the page moves. */
.sr-only{position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;overflow:hidden;white-space:nowrap;clip-path:inset(50%)}
h1{font-size:clamp(1.85rem,1.4rem + 1.8vw,2.5rem);line-height:1.12;letter-spacing:-.025em;font-weight:800;margin:0 0 .9rem;text-wrap:balance;overflow-wrap:break-word}
h2{font-size:1.35rem;line-height:1.28;letter-spacing:-.015em;font-weight:750;margin:2.8rem 0 .7rem;scroll-margin-top:5rem}
h2::before{content:"";display:block;width:28px;height:2px;background:var(--accent);margin-bottom:.8rem;border-radius:2px}
h3{font-size:1.04rem;line-height:1.4;letter-spacing:-.005em;margin:1.8rem 0 .4rem}
p{margin:0 0 1.05rem;overflow-wrap:break-word;text-wrap:pretty}
ul,ol{margin:0 0 1.15rem;padding-left:1.2rem}
li{margin:.42rem 0}
li::marker{color:var(--accent)}
a{color:var(--link);text-decoration:underline;text-underline-offset:2px;text-decoration-thickness:1px}
a:hover{color:var(--link-hover)}
/* A pasted API URL is one unbreakable token and it will set the width of the
   whole document if nothing is allowed to break inside it. */
code{overflow-wrap:anywhere}
a:focus-visible,.btn:focus-visible,summary:focus-visible{outline:2px solid var(--accent);outline-offset:2px;border-radius:4px}
blockquote{margin:1.4rem 0 1.6rem;padding:.1rem 0 .1rem 1.15rem;border-left:2px solid var(--accent);color:var(--ink-2)}
blockquote p:last-child{margin-bottom:0}
figure.pagefig{margin:2.4rem 0 0}
figure.pagefig img{display:block;width:100%;height:auto;border:1px solid var(--rule);border-radius:var(--r)}
figure.pagefig figcaption{margin:.6rem 0 0;font-size:.84rem;color:var(--muted)}
/* Running text keeps a readable measure; data blocks stay at full width,
   with or without the contents rail beside them.
   Two caps, not one: headings may use the wider --prose because they are set
   large and short, while running text sits at --measure. At 17px the old
   single cap of 44rem ran to 92 characters a line; --measure holds it to
   about 75, which is where the return sweep stops costing the reader a line. */
main>.wrap>:is(h1,h2,h3),
.page-grid>article>:is(h1,h2,h3){max-width:var(--prose)}
main>.wrap>:is(p,ul,ol,blockquote,.src,.lede),
.page-grid>article>:is(p,ul,ol,blockquote,.src,.lede){max-width:var(--measure)}
.page-grid{display:grid;grid-template-columns:minmax(0,1fr) var(--rail);gap:2.5rem;align-items:start}
.toc{position:sticky;top:5.5rem;font-size:.88rem}
.toc summary{margin:0 0 .7rem;font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);cursor:pointer;list-style:none}
.toc summary::-webkit-details-marker{display:none}
.toc summary::marker{content:""}
.toc h2{margin:0 0 .7rem;font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.toc h2::before{display:none}
.toc ol{list-style:none;margin:0;padding:0;border-left:1px solid var(--rule)}
.toc li{margin:0}
.toc a{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;padding:.32rem 0 .32rem .85rem;margin-left:-1px;border-left:2px solid transparent;color:var(--ink-2);text-decoration:none;line-height:1.4}
.toc a:hover{color:var(--ink);border-left-color:var(--rule)}
.hero{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,.9fr);gap:2.5rem;align-items:start;margin:0 0 2.4rem}
.hero>:is(h1,p,.lede,.strip,.btn-row){max-width:none}
.spec{border:1px solid var(--rule);border-radius:var(--r);background:var(--surface);overflow:hidden;justify-self:end;width:100%;max-width:24rem}
.spec-head{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.8rem 1.1rem;border-bottom:1px solid var(--rule);background:var(--surface-2);font-size:.74rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:var(--muted)}
.spec-grid{display:grid;grid-template-columns:1fr 1fr}
.spec-grid>div{padding:1.05rem 1.1rem;border-right:1px solid var(--rule-soft);border-bottom:1px solid var(--rule-soft)}
.spec-grid>div:nth-child(2n){border-right:0}
.spec-grid>div:nth-last-child(-n+2){border-bottom:0}
.filter{display:flex;align-items:center;gap:.6rem;max-width:22rem;margin:0 0 1rem;padding:.55rem .8rem;border:1px solid var(--rule);border-radius:var(--r-sm);background:var(--surface)}
.filter:focus-within{border-color:var(--accent)}
.filter svg{flex:none;color:var(--muted)}
.filter input{border:0;background:none;color:var(--ink);font:inherit;font-size:.93rem;width:100%;outline:none}
.filter input::placeholder{color:var(--muted)}
.lede{font-size:1.14rem;line-height:1.58;color:var(--ink-2);margin:0 0 2.2rem;text-wrap:pretty}
.src{margin:2.3rem 0 0;font-size:.88rem;line-height:1.6;color:var(--muted);border-top:1px solid var(--rule);padding-top:1rem}
.src a{color:inherit}
.cta{margin:2.6rem 0 1.2rem}
.btn{display:inline-flex;align-items:center;gap:.5rem;background:var(--accent);color:var(--accent-ink);font-weight:650;padding:.72rem 1.15rem;border-radius:var(--r-sm);text-decoration:none;border:1px solid transparent}
.btn:hover{color:var(--accent-ink);filter:brightness(1.08)}
.site-head{position:sticky;top:0;z-index:40;background:var(--bg-band);border-bottom:1px solid var(--rule)}
/* The header sticks, so what passes under it must be either fully covered or
   fully visible: a half-transparent band leaves a link showing through and
   still out of reach. It stays opaque. */
.site-head-in{display:flex;align-items:center;gap:1.1rem;min-height:64px;flex-wrap:wrap;padding-top:.5rem;padding-bottom:.5rem}
.brand-block{min-width:0}
.brand{display:flex;align-items:center;gap:.6rem;color:var(--ink);text-decoration:none}
.brand-mark{width:30px;height:30px;flex:none;display:grid;place-items:center;border-radius:9px;background:linear-gradient(150deg,var(--accent),color-mix(in srgb,var(--accent) 62%,#7a3d00));color:var(--accent-ink)}
.mark{width:18px;height:18px;display:block}
.brand-text{display:flex;flex-direction:column;line-height:1.15}
.brand-name{font-weight:700;font-size:1.02rem;letter-spacing:-.015em}
.tagline{margin:0;color:var(--muted);font-size:.74rem;line-height:1.2}
.site-head-nav{display:flex;align-items:center;gap:.2rem;margin-left:auto;flex-wrap:wrap}
.site-head-nav a{color:var(--ink-2);text-decoration:none;font-size:.92rem;font-weight:500;padding:.5rem .7rem;border-radius:var(--r-sm)}
.site-head-nav a:hover{background:var(--surface-2);color:var(--ink)}
.theme-btn{display:inline-grid;place-items:center;width:36px;height:36px;margin-left:.35rem;padding:0;border:1px solid var(--rule);border-radius:var(--r-sm);background:var(--surface);color:var(--ink-2);cursor:pointer}
.theme-btn:hover{border-color:var(--accent);color:var(--accent)}
.hub{margin:0 0 2.4rem;border:1px solid var(--rule);border-radius:var(--r);background:var(--bg-band);padding:0 1.1rem}
.hub a{display:block;padding:.8rem 0;border-top:1px solid var(--rule);font-weight:600;color:var(--ink);text-decoration:none}
.hub a:first-child{border-top:0}
.hub a:hover{color:var(--accent)}
/* A table that is wider than its column scrolls sideways, and nothing on
   screen says so until the reader happens to swipe. The two local gradients
   sit exactly over the two scroll shadows while that edge is reached, so the
   hint appears on the side that still has content behind it and disappears
   once there is none. */
.matrix-scroll,.tablewrap{margin:0 0 1.05rem;overflow-x:auto;-webkit-overflow-scrolling:touch;border:1px solid var(--rule);border-radius:var(--r);
  background:
    linear-gradient(to right,var(--surface) 22%,transparent) left center/34px 100% no-repeat local,
    linear-gradient(to left,var(--surface) 22%,transparent) right center/34px 100% no-repeat local,
    radial-gradient(farthest-side at 0 50%,color-mix(in srgb,var(--ink) 16%,transparent),transparent) left center/14px 100% no-repeat scroll,
    radial-gradient(farthest-side at 100% 50%,color-mix(in srgb,var(--ink) 16%,transparent),transparent) right center/14px 100% no-repeat scroll,
    var(--surface)}
.matrix-scroll:focus-visible,.tablewrap:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:8px}
table.matrix{border-collapse:collapse;width:100%;font-size:.93rem;line-height:1.45;font-variant-numeric:tabular-nums}
table.matrix caption{caption-side:top;text-align:left;font-size:.86rem;color:var(--muted);padding:.85rem 1.1rem .1rem}
table.matrix th,table.matrix td{text-align:left;padding:.62rem 1.1rem;border-bottom:1px solid var(--rule-soft);white-space:nowrap}
table.matrix thead th{position:sticky;top:0;z-index:1;background:var(--surface-2);color:var(--muted);font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border-bottom:1px solid var(--rule)}
table.matrix tbody tr:last-child td{border-bottom:0}
table.matrix tbody tr:hover td{background:color-mix(in srgb,var(--accent) 6%,transparent)}
table.matrix td:first-child{color:var(--ink);font-weight:600}
table.matrix td.wrap-cell{white-space:normal;min-width:14rem}
table.matrix code{font-size:.88em}
.num,td.num,th.num{font-variant-numeric:tabular-nums;text-align:right}
/* Flex, not grid, for one reason: a grid leaves the tail of a five- or
   six-stat row empty, and the 1px gap colour that draws the hairlines fills
   that empty area as a solid slab. Flex distributes the free space back into
   the cells, so every row ends flush and no page can grow a grey rectangle. */
.strip{display:flex;flex-wrap:wrap;gap:1px;background:var(--rule);border:1px solid var(--rule);border-radius:var(--r);overflow:hidden;margin:0 0 2rem}
.strip>div{flex:1 1 9.5rem;min-width:0;background:var(--surface);padding:.95rem 1.05rem 1rem;display:grid;grid-template-rows:auto 1fr auto;align-content:start}
.stat-n{display:block;font-family:var(--mono);font-variant-numeric:tabular-nums;font-size:1.4rem;font-weight:700;line-height:1.15;letter-spacing:-.01em;overflow-wrap:anywhere}
.stat-k{display:block;margin-top:.3rem;font-size:.83rem;color:var(--muted)}
.stat-src{display:block;margin-top:.5rem}
.src-chip{display:inline-flex;align-items:center;gap:.34rem;padding:.1rem .45rem .12rem;border-radius:5px;font-family:var(--mono);font-size:.68rem;font-weight:600;letter-spacing:.07em;text-transform:uppercase;border:1px solid;white-space:nowrap}
.src-chip::before{content:"";width:5px;height:5px;border-radius:50%;background:currentColor}
.src-official{color:var(--ok);border-color:color-mix(in srgb,var(--ok) 40%,transparent);background:var(--ok-wash)}
.src-ingame{color:var(--accent);border-color:color-mix(in srgb,var(--accent) 40%,transparent);background:var(--accent-wash)}
.src-third{color:var(--link);border-color:color-mix(in srgb,var(--link) 40%,transparent);background:color-mix(in srgb,var(--link) 12%,transparent)}
.src-reported{color:var(--muted);border-color:var(--rule);background:var(--surface-2)}
.src-calc{color:var(--muted);border-color:var(--rule);background:var(--surface-2)}
.pill{display:inline-flex;align-items:center;gap:.35rem;padding:.22rem .55rem;border-radius:999px;font-size:.72rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap;border:1px solid var(--rule);color:var(--muted);background:var(--surface-2)}
.pill--live{color:var(--ok);border-color:color-mix(in srgb,var(--ok) 45%,transparent);background:var(--ok-wash)}
.pill--ea{color:var(--accent);border-color:color-mix(in srgb,var(--accent) 45%,transparent);background:var(--accent-wash)}
.bar{display:flex;align-items:center;gap:.6rem;min-width:9rem}
.bar-track{position:relative;flex:1;height:6px;border-radius:999px;background:var(--surface-3);overflow:hidden}
.bar-fill{position:absolute;inset:0 auto 0 0;border-radius:999px;background:linear-gradient(90deg,color-mix(in srgb,var(--accent) 70%,transparent),var(--accent))}
.bar-val{font-family:var(--mono);font-variant-numeric:tabular-nums;font-size:.85rem;min-width:3.4rem;text-align:right}
.data-block{margin:2rem 0 0;border:1px solid var(--rule);border-radius:var(--r);background:var(--surface);overflow:hidden}
.data-head{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.85rem 1.1rem;border-bottom:1px solid var(--rule);background:var(--surface-2);flex-wrap:wrap}
.data-head h3{margin:0;font-size:.95rem;font-weight:700}
.data-head h3::before,.verdict-col h3::before,.foot-grid h2::before{display:none}
.data-note{display:flex;align-items:center;gap:.5rem;font-size:.8rem;color:var(--muted)}
.data-block .matrix-scroll{margin:0;border:0;border-radius:0}
.data-foot{margin:0;padding:.8rem 1.1rem .85rem;border-top:1px solid var(--rule-soft);font-size:.82rem;line-height:1.55;color:var(--muted)}
.data-foot a{color:var(--muted)}
.verdict{display:grid;grid-template-columns:1fr 1fr;margin:2rem 0 0;border:1px solid var(--rule);border-radius:var(--r);overflow:hidden;background:var(--surface)}
.verdict-col{padding:1.15rem 1.25rem 1.25rem}
.verdict-col+.verdict-col{border-left:1px solid var(--rule)}
.verdict-col h3{margin:0 0 .55rem;font-size:.74rem;letter-spacing:.13em;text-transform:uppercase}
.verdict-yes h3{color:var(--ok)}
.verdict-no h3{color:var(--accent)}
.verdict-col p{margin:0;font-size:.96rem;color:var(--ink-2)}
.readnext{margin:2.8rem 0 0;border:1px solid var(--rule);border-radius:var(--r);background:var(--bg-band);padding:1.1rem 1.2rem 1.2rem}
.readnext p{margin:.5rem 0}
.readnext p:first-child{margin-top:0}
.readnext p:last-child{margin-bottom:0}
.ad{margin:2.7rem 0 0;border:1px dashed var(--rule);border-radius:var(--r);background:var(--surface);padding:1rem 1.15rem 1.05rem}
.ad-label{margin:0 0 .4rem;font-family:var(--mono);font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.ad-body{margin:0;font-size:1.02rem;font-weight:650;line-height:1.45}
.ad-note{margin:.45rem 0 0;font-size:.82rem;color:var(--muted)}
details.qa{border:1px solid var(--rule);border-radius:var(--r);background:var(--surface);margin:.6rem 0 0;overflow:hidden}
details.qa[open]{border-color:color-mix(in srgb,var(--accent) 35%,var(--rule))}
/* A closed disclosure hides its content either way. Saying display:none as
   well is what stops the hidden rows keeping a layout box: without it a link
   inside a closed rail still answers getBoundingClientRect with its open size,
   and a hit test aimed at it lands on whatever is really there. */
details.toc:not([open])>nav,details.qa:not([open])>.qa-body{display:none}
details.qa>summary{list-style:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.95rem 1.15rem;font-weight:650;font-size:1rem}
details.qa>summary::-webkit-details-marker{display:none}
details.qa>summary::after{content:"+";flex:none;font-family:var(--mono);font-size:1.15rem;color:var(--accent);line-height:1}
details.qa[open]>summary::after{content:"\\2212"}
.qa-body{padding:0 1.15rem 1.1rem;color:var(--ink-2);font-size:.96rem}
.qa-body p{margin:0;max-width:var(--measure)}
.qa{margin:2.9rem 0 0;border-top:1px solid var(--rule);padding-top:1.7rem}
.qa h2{margin-top:0}
.qa h3{font-size:1.05rem;line-height:1.4;margin:1.55rem 0 .35rem}
.qa p{margin:0 0 .45rem;color:var(--ink-2);max-width:var(--measure)}
.site-foot{border-top:1px solid var(--rule);background:var(--bg-band);margin-top:4rem;padding:2.6rem 0 1.4rem;color:var(--muted);font-size:.9rem}
.foot-grid{display:grid;grid-template-columns:minmax(0,1.6fr) repeat(3,minmax(0,.8fr));gap:2rem}
.foot-grid h2{margin:0 0 .7rem;font-size:.7rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.foot-grid ul{list-style:none;margin:0;padding:0}
.foot-grid li{margin:.35rem 0}
.foot-grid a{color:var(--ink-2);text-decoration:none}
.foot-grid a:hover{color:var(--accent)}
.foot-about p{margin:.8rem 0 0;font-size:.88rem;color:var(--muted);max-width:26rem}
.foot-bar{display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;margin-top:2.4rem;padding-top:1.1rem;border-top:1px solid var(--rule-soft);font-size:.82rem;color:var(--muted)}
@media (max-width:960px){.foot-grid{grid-template-columns:1fr 1fr}}
/* Between 1100px and this one the page is too narrow to hold a 14rem rail and
   a full-width data table at once. The rail gives 2rem back, which is the
   difference between the price matrix fitting and scrolling on a laptop with
   the window snapped to one side. */
@media (min-width:1100px) and (max-width:1240px){:root{--rail:12rem}}
/* Below 1100px the rail does not fit beside the widest table, so the page goes
   single column: the contents become one scrollable row above the h1 and the
   article gets the whole width, which is what the tables need. */
@media (max-width:1099px){
.page-grid{grid-template-columns:minmax(0,1fr);gap:1.6rem}
.toc{position:static;order:-1}
/* Closed on a phone, the contents cost one 44px line instead of the 210px a
   block of wrapped chips took, and the h1 stays on the first screen. Tap it
   and the same chips appear; nothing is hidden behind a sideways swipe. */
.toc summary{display:flex;align-items:center;gap:.45rem;margin:0;padding:.55rem 0;font-size:.72rem}
.toc summary::after{content:"show";font-size:.62rem;letter-spacing:.08em;color:var(--accent)}
.toc[open] summary::after{content:"hide"}
.toc ol{display:flex;flex-wrap:wrap;gap:.4rem;border-left:0;margin:0 0 .2rem}
.toc a{display:block;margin:0;border:1px solid var(--rule);border-radius:999px;padding:.3rem .7rem;font-size:.82rem;overflow:visible}
}
@media (max-width:820px){.hero{grid-template-columns:1fr;gap:1.8rem}.spec{justify-self:stretch;max-width:none}}
@media (max-width:620px){
.wrap{padding:0 1.15rem}
main{padding:1.9rem 0 0}
.site-head-nav{order:3;width:100%;margin:0 0 .5rem;gap:0}
.site-head-nav a{padding:.55rem .6rem}
.verdict{grid-template-columns:1fr}
.verdict-col+.verdict-col{border-left:0;border-top:1px solid var(--rule)}
.foot-grid{grid-template-columns:1fr;gap:1.6rem}
table.matrix th,table.matrix td{padding:.55rem .85rem}
}
@media (max-width:430px){h1{font-size:1.6rem}.lede{font-size:1.05rem}}
`;

// Runs before first paint, so a reader who chose a theme never sees the other
// one flash.
const THEME_INIT = `<script>
(function () {
  var t = null;
  try { t = localStorage.getItem("sa-theme"); } catch (e) {}
  if (t === "dark" || t === "light") document.documentElement.setAttribute("data-theme", t);
})();
</script>`;

const THEME_TOGGLE = `<script>
(function () {
  var root = document.documentElement, btn = document.getElementById("theme-toggle");
  if (!btn) return;
  function current() {
    var set = root.getAttribute("data-theme");
    if (set) return set;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function label() {
    btn.setAttribute("aria-label", "Switch to " + (current() === "dark" ? "light" : "dark") + " theme");
  }
  // The page card is a drawing, so it cannot inherit the theme the way a rule
  // or a table can. Each page ships both drawings and the picture element picks
  // by the reader's OS; this points it at the reader's explicit choice instead,
  // which is the one thing a media query cannot see.
  function syncCards() {
    var sources = document.querySelectorAll("figure.pagefig picture > source");
    for (var i = 0; i < sources.length; i++) {
      sources[i].media = current() === "light" ? "all" : "not all";
    }
  }
  label();
  syncCards();
  btn.addEventListener("click", function () {
    var next = current() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("sa-theme", next); } catch (e) {}
    label();
    syncCards();
  });
})();
</script>`;

// Sections worth a contents rail. A page with fewer than this many <h2>s reads
// end to end without one, so it does not get a rail it would only clutter.
const TOC_MIN_SECTIONS = 4;

// Build the contents rail from the markup that actually ships: every <h2>
// gets an id and the rail links to it, so the two can never drift apart.
function contentsFor(body) {
  const heads = [...body.matchAll(/<h2\b([^>]*)>([\s\S]*?)<\/h2>/gi)];
  if (heads.length < TOC_MIN_SECTIONS) return null;

  let n = 0;
  const items = [];
  const withIds = body.replace(/<h2\b([^>]*)>([\s\S]*?)<\/h2>/gi, (whole, attrs, text) => {
    const existing = /\bid="([^"]+)"/.exec(attrs);
    const id = existing ? existing[1] : "s" + ++n;
    items.push({ id, label: text.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() });
    return existing ? whole : `<h2${attrs} id="${id}">${text}</h2>`;
  });

  return {
    body: withIds,
    // The rail is a disclosure so a phone can fold it into one line without
    // leaving links sitting off the side of a scroller, where they would be
    // reachable but not visible. The script that closes it on narrow screens
    // sits directly after the element, so it runs while the parser is still on
    // that line and the open state never paints at the wrong width.
    rail:
      `<details class="toc" open>\n<summary>On this page</summary>\n<nav aria-label="On this page">\n<ol>\n` +
      items.map((i) => `<li><a href="#${i.id}">${i.label}</a></li>`).join("\n") +
      `\n</ol>\n</nav>\n</details>\n` +
      `<script>(function(){var d=document.currentScript.previousElementSibling;` +
      `if(d&&matchMedia("(max-width:1099px)").matches)d.removeAttribute("open");})();</script>`,
  };
}

// `bodyClass` and `pageStyles` exist so one page can be restyled on its own.
// Both default to empty: a page that passes neither produces exactly the same
// bytes it produced before these two knobs were added, which is what lets a
// redesign land one page at a time instead of across the whole site at once.
export function layout({ title, description, canonical, body, extraHead = "", ogImage = "", toc = true, bodyClass = "", pageStyles = "" }) {
  // The Markdown twin of this page. It is served when a client asks for
  // text/markdown instead of HTML; see functions/_middleware.js.
  const contents = toc ? contentsFor(body) : null;
  const main = contents
    ? `<div class="page-grid"><article class="prose">\n${contents.body}\n</article>\n${contents.rail}\n</div>`
    : body;
  let pagePath = "/";
  try {
    pagePath = new URL(canonical).pathname;
  } catch {
    pagePath = "/";
  }
  const mdPath = "/md/" + (pagePath === "/" ? "index" : pagePath.replace(/^\/+|\/+$/g, "")) + ".md";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<link rel="alternate" type="text/markdown" href="${mdPath}" title="Markdown">
<link rel="ai-catalog" href="/.well-known/ai-catalog.json">
<meta name="color-scheme" content="dark light">
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0a0e13" media="(prefers-color-scheme: dark)">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Shooter Atlas">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
${socialMeta(ogImage)}
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2032%2032'%3E%3Crect%20width='32'%20height='32'%20rx='7'%20fill='%23f0a92c'/%3E%3Ccircle%20cx='16'%20cy='16'%20r='6.5'%20fill='none'%20stroke='%2310161d'%20stroke-width='2.4'/%3E%3Cpath%20d='M16%203.5v5M16%2023.5v5M3.5%2016h5M23.5%2016h5'%20stroke='%2310161d'%20stroke-width='2.4'%20stroke-linecap='round'/%3E%3C/svg%3E">
${extraHead}
${THEME_INIT}
<style>${STYLES}</style>${pageStyles ? `\n<style>${pageStyles}</style>` : ""}
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ""}>
<a class="skip" href="#main">Skip to content</a>
<header class="site-head"><div class="wrap site-head-in">
<div class="brand-block">
<a class="brand" href="/"><span class="brand-mark" aria-hidden="true"><svg class="mark" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><circle cx="16" cy="16" r="6.5"/><path d="M16 3.5v5M16 23.5v5M3.5 16h5M23.5 16h5"/></svg></span><span class="brand-text"><span class="brand-name">Shooter Atlas</span><span class="tagline">Numbers for large-scale tactical shooters</span></span></a>
</div>
<nav class="site-head-nav" aria-label="Site">
<a href="/wardogs">WARDOGS</a>
<a href="/wardogs-release-date">Release date</a>
<a href="/wardogs-price">Price by region</a>
<a href="/wardogs-gameplay">Gameplay and modes</a>
<a href="/wardogs-player-count">Player count</a>
<button class="theme-btn" id="theme-toggle" type="button" aria-label="Switch colour theme"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor" stroke="none"/></svg></button>
</nav>
</div></header>
<main id="main"><div class="wrap">
${main}
</div></main>
<footer class="site-foot"><div class="wrap">
<div class="foot-grid">
<div class="foot-about">
<a class="brand" href="/"><span class="brand-mark" aria-hidden="true"><svg class="mark" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><circle cx="16" cy="16" r="6.5"/><path d="M16 3.5v5M16 23.5v5M3.5 16h5M23.5 16h5"/></svg></span><span class="brand-text"><span class="brand-name">Shooter Atlas</span></span></a>
<p>Every figure on this site is either taken from official material or measured in game, and is labelled with which of the two it is. The same figures run as short cards on <a href="https://www.youtube.com/channel/UCaFMBF4EPVor__gBeNZguQg" rel="noopener">YouTube</a>.</p>
<p>Pages are also published as Markdown at <a href="/md/index.md">/md/</a> and through a read-only API at <a href="/api/agent/pages">/api/agent/pages</a>, for readers that are not people.</p>
</div>
<div>
<h2>Pages</h2>
<nav aria-label="Pages"><ul>
<li><a href="/squad-player-count">Squad player count</a></li>
<li><a href="/wardogs">WARDOGS</a></li>
<li><a href="/wardogs-steam">Steam page</a></li>
<li><a href="/wardogs-price">Price by region</a></li>
<li><a href="/wardogs-achievements">Achievements</a></li>
<li><a href="/wardogs-reviews">Steam reviews</a></li>
<li><a href="/wardogs-early-access">Early Access</a></li>
<li><a href="/wardogs-reddit">On Reddit</a></li>
<li><a href="/wardogs-release-date">Release date</a></li>
<li><a href="/wardogs-battalion-1944">Battalion 1944</a></li>
<li><a href="/wardogs-battalion-1944-launch">Battalion 1944 launch</a></li>
<li><a href="/wardogs-languages">Languages</a></li>
<li><a href="/wardogs-genres">Genres and specs</a></li>
<li><a href="/wardogs-gameplay">Gameplay and modes</a></li>
<li><a href="/wardogs-factions">Factions</a></li>
<li><a href="/wardogs-steam-deck">Steam Deck</a></li>
<li><a href="/wardogs-player-count">Player count</a></li>
<li><a href="/wardogs-map">Map</a></li>
</ul></nav>
</div>
<div>
<h2>Site</h2>
<nav aria-label="Site pages"><ul>
<li><a href="/about">About</a></li>
<li><a href="/privacy">Privacy</a></li>
<li><a href="/contact">Contact</a></li>
</ul></nav>
</div>
<div>
<h2>Elsewhere</h2>
<nav aria-label="Machine-readable editions"><ul>
<li><a href="https://www.youtube.com/channel/UCaFMBF4EPVor__gBeNZguQg" rel="noopener">YouTube</a></li>
<li><a href="/md/index.md">Markdown</a></li>
<li><a href="/openapi.json">OpenAPI</a></li>
<li><a href="/.well-known/ai-catalog.json">AI catalogue</a></li>
</ul></nav>
</div>
</div>
<div class="foot-bar">
<span>Shooter Atlas &mdash; an independent reference site. Not affiliated with, endorsed by or sponsored by any studio or publisher.</span>
</div>
</div></footer>
${THEME_TOGGLE}
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "37c294a762ef45d995a15279d79a66d1"}'></script>
<script>
// WebMCP: hand the site's own read-only lookup to an agent that is driving this
// browser. Same data and same rules as the server API, no new capability. A
// browser without the API simply skips this.
(function () {
  var ctx = document.modelContext || navigator.modelContext;
  if (!ctx || typeof ctx.registerTool !== "function") return;
  var controller = new AbortController();
  window.addEventListener("pagehide", function () { try { controller.abort(); } catch (e) {} });
  function register(tool) {
    try {
      var r = ctx.registerTool(tool, { signal: controller.signal });
      if (r && typeof r.catch === "function") r.catch(function () {});
    } catch (e) {}
  }
  function read(url) {
    return fetch(url, { headers: { Accept: "application/json" } }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    });
  }
  var rules = "::ILANG [TYPE:tool][SERVICE:Shooter Atlas][LANG:en] "
    + "::RULE{read-only: this tool only reads published pages} "
    + "::RULE{keep the source link and the read date that sit next to every figure} "
    + "::RULE{never present a snapshot as a live value} "
    + "::BOUNDARY{never:invent a figure, a date or a source|scope:permanent}";
  register({
    name: "site_lookup",
    description: "Read one page of shooteratlas.com as markdown and return it with its source URL and last-modified date. " + rules,
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "Page id, for example wardogs-price, wardogs-achievements, index" }
      },
      required: ["id"]
    },
    execute: function (args) {
      var id = String((args && args.id) || "").replace(/^\\/+/, "");
      if (!id) return Promise.resolve("Give a page id, for example wardogs-price.");
      return read("/api/agent/pages/" + encodeURIComponent(id)).then(function (page) {
        return "source_url: " + page.url + "\\nlast_modified: " + page.last_modified
          + "\\ngenerated: see " + page.markdown_url + "\\n\\n" + page.text;
      }).catch(function () {
      return "No page with id " + id + ". Try: index, wardogs, wardogs-price, wardogs-reviews, wardogs-achievements, wardogs-early-access, wardogs-reddit, wardogs-release-date, wardogs-battalion-1944, wardogs-battalion-1944-launch, wardogs-languages, about, privacy, contact.";
      });
    }
  });
  register({
    name: "find_pages",
    description: "Search the pages of shooteratlas.com by keyword and return the pages that match, each with its URL. " + rules,
    inputSchema: {
      type: "object",
      properties: { query: { type: "string", description: "Words to match against page titles and descriptions" } },
      required: ["query"]
    },
    execute: function (args) {
      var terms = String((args && args.query) || "").toLowerCase().split(/[^a-z0-9]+/).filter(function (t) { return t.length > 2; });
      return read("/api/agent/pages").then(function (data) {
        var hits = data.pages.filter(function (p) {
          var hay = (p.title + " " + p.description).toLowerCase();
          return terms.some(function (t) { return hay.indexOf(t) >= 0; });
        });
        if (!hits.length) return "Nothing matched. Pages: " + data.pages.map(function (p) { return p.id; }).join(", ") + ".";
        return hits.map(function (p) { return p.title + " — " + p.url; }).join("\\n");
      }).catch(function () { return "The page index could not be read."; });
    }
  });
})();
</script>
</body>
</html>`;
}
