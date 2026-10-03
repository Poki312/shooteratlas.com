// Site skin, 2026-10-03.
//
// This is a *skin*, and it is deliberately opt-in: every rule below is scoped
// to `body.skin-20261003`, a class a page only gets if it asks for it. A page
// that does not ask is untouched, byte for byte, which is what lets the owner
// roll this out one page at a time.
//
// The home page wears it as `skin-20261003 v2-hero`; an article page wears
// `skin-20261003` alone. The extra `v2-hero` lifts the h1 and nothing else,
// because a landing-page title is short and an article title is long, and the
// two do not want the same type size.
//
// Nothing here adds, removes or rewrites a word. The page's blocks, their order
// and every string stay exactly as they were; this file only changes the
// palette, the type scale, the rhythm, and the surfaces those blocks sit on.
//
// Where the look comes from: the reference sites we opened on 2026-10-03 —
// recent.design, 60fps.design and supahero.io (see the report for why those
// three). What we took from them is structural, not literal: a light neutral
// canvas with white cards floating on it, hairlines instead of heavy borders,
// one accent used sparingly, larger display type set tighter, and more air
// between sections. No image, no font file and no stylesheet was copied from
// any of them, and they are not credited as a source of any figure.
//
// Two site rules this file is written to respect:
//   * no web fonts — the stack below is the system stack the site already
//     used, so the page still makes exactly one external request (the
//     Cloudflare beacon). The references set Inter; we get the same feel from
//     size, weight and tracking rather than from a downloaded font.
//   * the table's sideways-scroll hint is load-bearing. `.matrix-scroll` is
//     left alone here — overriding its `background` would erase the two
//     gradients that tell a reader there is more table to the right.

export const skinStyles = `
/* ---- palette ------------------------------------------------------------
   Redefining the site's own tokens on the body is the whole trick: every
   shared rule that already reads var(--surface) or var(--rule) re-themes
   itself, and only the rules that need a different *shape* are rewritten. */
body.skin-20261003{
  --bg:#f5f5f6;--bg-band:#ffffff;
  --surface:#ffffff;--surface-2:#fafafa;--surface-3:#f0f0f2;
  --ink:#111114;--ink-2:#45454e;--muted:#6e6e79;
  --rule:#e5e5e9;--rule-soft:#f0f0f3;
  --accent:#a35f00;--accent-ink:#ffffff;--accent-wash:rgba(163,95,0,.09);
  --link:#0b57d0;--link-hover:#093f96;
  --r:16px;--r-sm:10px;--prose:46rem;--measure:40rem;
  --shadow:0 1px 2px rgba(16,18,24,.04),0 18px 34px -26px rgba(16,18,24,.28);
}
html[data-theme="dark"] body.skin-20261003{
  --bg:#0b0b0e;--bg-band:#101014;
  --surface:#16161b;--surface-2:#1c1c22;--surface-3:#24242b;
  --ink:#f2f2f5;--ink-2:#c3c3cb;--muted:#8b8b96;
  --rule:#2a2a32;--rule-soft:#202027;
  --accent:#f0a92c;--accent-ink:#10161d;--accent-wash:rgba(240,169,44,.12);
  --link:#7db4ff;--link-hover:#a8cfff;
  --shadow:0 1px 2px rgba(0,0,0,.5),0 18px 34px -26px rgba(0,0,0,.7);
}
@media (prefers-color-scheme:dark){
  html:not([data-theme="light"]) body.skin-20261003{
    --bg:#0b0b0e;--bg-band:#101014;
    --surface:#16161b;--surface-2:#1c1c22;--surface-3:#24242b;
    --ink:#f2f2f5;--ink-2:#c3c3cb;--muted:#8b8b96;
    --rule:#2a2a32;--rule-soft:#202027;
    --accent:#f0a92c;--accent-ink:#10161d;--accent-wash:rgba(240,169,44,.12);
    --link:#7db4ff;--link-hover:#a8cfff;
    --shadow:0 1px 2px rgba(0,0,0,.5),0 18px 34px -26px rgba(0,0,0,.7);
  }
}

/* ---- type ---------------------------------------------------------------
   Display type goes up and tighter; running text gets a little more leading.
   That split is what makes the reference sites read as "designed" without a
   single extra pixel of decoration. */
body.skin-20261003{font-size:16.5px;line-height:1.68}
body.skin-20261003 h1{font-size:clamp(1.95rem,1.35rem + 1.9vw,2.6rem);line-height:1.07;letter-spacing:-.028em;font-weight:800;margin-bottom:1rem}
body.skin-20261003.v2-hero h1{font-size:clamp(2.15rem,1.5rem + 2.5vw,3.05rem);line-height:1.04;letter-spacing:-.033em}
body.skin-20261003 h2{font-size:1.45rem;line-height:1.22;letter-spacing:-.021em;font-weight:730;margin-top:3.6rem}
body.skin-20261003 h2::before{width:22px;margin-bottom:.75rem}
body.skin-20261003 h3{font-size:1.06rem;letter-spacing:-.01em}
body.skin-20261003 .lede{font-size:1.22rem;line-height:1.5;letter-spacing:-.008em;margin-bottom:0}
body.skin-20261003 p{text-wrap:pretty}
body.skin-20261003 .src,body.skin-20261003 .data-foot{font-size:.85rem;line-height:1.62}

/* A single soft wash at the top of the page, the way the references lift their
   first screen off the canvas without adding a picture or a gradient band. */
body.skin-20261003 main{
  background-image:radial-gradient(1100px 380px at 10% -12%,color-mix(in srgb,var(--accent) 8%,transparent),transparent 68%);
  background-repeat:no-repeat;
}

/* ---- header -------------------------------------------------------------
   White band on a grey canvas, quiet text links that become pills on hover,
   and a round icon button — the navigation shape recent.design and
   navbar.gallery both settle on. */
body.skin-20261003 .site-head{background:var(--surface);border-bottom:1px solid var(--rule)}
body.skin-20261003 .site-head-in{min-height:60px;gap:1rem}
body.skin-20261003 .brand-mark{width:32px;height:32px;border-radius:10px}
body.skin-20261003 .brand-name{font-size:1.02rem;letter-spacing:-.022em}
body.skin-20261003 .tagline{font-size:.72rem}
body.skin-20261003 .site-head-nav{gap:.15rem}
body.skin-20261003 .site-head-nav a{font-size:.9rem;font-weight:550;color:var(--ink-2);padding:.45rem .85rem;border-radius:999px}
body.skin-20261003 .site-head-nav a:hover{background:var(--surface-3);color:var(--ink)}
body.skin-20261003 .theme-btn{width:34px;height:34px;margin-left:.4rem;border-radius:999px;background:transparent;border-color:var(--rule);color:var(--ink-2)}
body.skin-20261003 .theme-btn:hover{background:var(--surface-3);border-color:var(--rule);color:var(--ink)}

/* ---- first screen -------------------------------------------------------
   The two-column hero stays two columns: same blocks, same order, same words.
   What changes is the air around them and the surface the figures sit on. */
body.skin-20261003 .hero{gap:3rem;margin:0 0 3rem}
body.skin-20261003 .spec{max-width:23.5rem;border:1px solid var(--rule);border-radius:var(--r);background:var(--surface);box-shadow:var(--shadow)}
body.skin-20261003 .spec-head{padding:.85rem 1.15rem;background:transparent;border-bottom:1px solid var(--rule);font-size:.68rem;letter-spacing:.15em}
body.skin-20261003 .spec-head span:last-child{font-family:var(--mono);font-size:.68rem;letter-spacing:.05em}
body.skin-20261003 .spec-grid>div{padding:1.15rem 1.15rem 1.2rem;border-color:var(--rule-soft)}
body.skin-20261003 .stat-n{font-size:1.72rem;letter-spacing:-.032em}
body.skin-20261003 .stat-k{font-size:.8rem;margin-top:.35rem}

/* ---- filter + table -----------------------------------------------------
   None of the references ship a data table, so this is the same language
   translated: hairlines only, no vertical rules, a sticky header in small
   caps on the quietest surface, generous rows, and one soft tint on hover. */
body.skin-20261003 .filter{max-width:24rem;padding:.6rem .95rem;border-radius:999px;background:var(--surface);border:1px solid var(--rule)}
body.skin-20261003 .filter:focus-within{border-color:color-mix(in srgb,var(--accent) 55%,var(--rule))}
body.skin-20261003 .data-block{border:1px solid var(--rule);border-radius:var(--r);background:var(--surface);box-shadow:var(--shadow)}
body.skin-20261003 table.matrix{font-size:.94rem;line-height:1.5}
body.skin-20261003 table.matrix thead th{background:var(--surface-2);font-size:.68rem;letter-spacing:.11em;padding-top:.78rem;padding-bottom:.78rem}
body.skin-20261003 table.matrix th,body.skin-20261003 table.matrix td{padding:.8rem 1.15rem}
body.skin-20261003 table.matrix td{color:var(--ink-2)}
body.skin-20261003 table.matrix td:first-child{color:var(--ink);font-weight:600}
body.skin-20261003 table.matrix tbody tr:hover td{background:color-mix(in srgb,var(--accent) 5%,transparent)}
body.skin-20261003 .data-foot{padding:.9rem 1.15rem 1rem;background:var(--surface-2);border-top:1px solid var(--rule-soft)}

/* ---- the rest of the surfaces ------------------------------------------- */
body.skin-20261003 figure.pagefig{margin-top:3rem}
body.skin-20261003 figure.pagefig img{border-radius:var(--r);box-shadow:var(--shadow)}
body.skin-20261003 .ad{border:1px dashed var(--rule);border-radius:var(--r);background:var(--surface);padding:1.05rem 1.2rem 1.1rem}
body.skin-20261003 .readnext{border-radius:var(--r)}
body.skin-20261003 details.qa{border-radius:var(--r);box-shadow:none}
body.skin-20261003 .strip,body.skin-20261003 .verdict{box-shadow:var(--shadow)}
body.skin-20261003 .btn{padding:.78rem 1.3rem;border-radius:999px;font-weight:650;box-shadow:0 1px 2px rgba(16,18,24,.07)}
body.skin-20261003 .site-foot{background:var(--surface);border-top:1px solid var(--rule)}

/* ---- narrow screens -----------------------------------------------------
   Everything below is size, not shape: the same blocks stack in the same
   order, the pills shrink, and the table keeps scrolling inside its own box. */
@media (max-width:820px){
  body.skin-20261003 .hero{gap:2rem;margin-bottom:2.4rem}
}
@media (max-width:620px){
  body.skin-20261003{font-size:16px;line-height:1.66}
  body.skin-20261003 h1{font-size:1.72rem;letter-spacing:-.024em}
  body.skin-20261003.v2-hero h1{font-size:1.95rem;letter-spacing:-.028em}
  body.skin-20261003 h2{font-size:1.32rem;margin-top:2.9rem}
  body.skin-20261003 .lede{font-size:1.1rem}
  body.skin-20261003 .spec{max-width:none;box-shadow:none}
  body.skin-20261003 .spec-grid>div{padding:.95rem 1rem}
  body.skin-20261003 .stat-n{font-size:1.5rem}
  body.skin-20261003 table.matrix{font-size:.9rem}
  body.skin-20261003 table.matrix th,body.skin-20261003 table.matrix td{padding:.62rem .9rem}
  /* The description column's 14rem floor was set for a laptop. On a phone it
     is what pushes the table ~150px past its own box, so the reader's first
     look at the table is a column sliced mid-word. Narrowing the floor takes
     that down without shrinking the text. */
  body.skin-20261003 table.matrix td.wrap-cell{min-width:10.5rem}
  body.skin-20261003 .data-block,body.skin-20261003 figure.pagefig img{box-shadow:none}
  body.skin-20261003 .ad{padding:.95rem 1.05rem 1rem}
}
@media (max-width:430px){
  body.skin-20261003 h1{font-size:1.52rem}
  body.skin-20261003.v2-hero h1{font-size:1.72rem}
  body.skin-20261003 .site-head-nav a{font-size:.85rem;padding:.5rem .55rem}
  body.skin-20261003 .btn{padding:.72rem 1.1rem;font-size:.95rem}
}
`;
