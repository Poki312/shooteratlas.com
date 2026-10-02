// The map page. Queue: wardogs map / wardogs tracker.
//
// Two things shape this page.
//
// 1. Nothing official lists a location on a WARDOGS map. Bulkhead and Team17
//    publish the size (256 km2), the objective (a randomised 2 x 2 km Control
//    Zone) and the Hot Zone, and nothing else. The marker sets in circulation
//    were data-mined by community projects, and this site does not republish
//    another site's marker set - the same line the gameplay page already takes.
//    So the page prints the tool, the official mechanics and a recorded-blank
//    list, and every location row lives in one data file the owner fills in.
//
// 2. The map itself is ours: a to-scale 16 x 16 km plane on the 1 km lettered
//    grid, drawn from tokens, with no tiles, no map library and no request off
//    this origin. It pans, zooms, reads out a grid reference and drops the
//    Control Zone where the match put it, because a 4 km2 zone on a 256 km2 map
//    is the one number on this page that a picture carries better than a table.
import { readFileSync } from "node:fs";
import { adUnit } from "../ad.mjs";
import { faqList } from "../faq.mjs";

// The single source of truth for every figure the tool draws. Editing this file
// and pushing is the whole update procedure; the page never carries a location
// of its own.
export const dataFile = "assets/data/wardogs-map-points.json";
const MAP_DATA = JSON.parse(readFileSync(new URL("../../" + dataFile, import.meta.url), "utf8"));

// Inlined as inert JSON rather than fetched, so the tool is complete on first
// paint: no request, no spinner, nothing to block the first screen.
const DATA_TAG =
  '<script type="application/json" id="wm-data">' +
  JSON.stringify(MAP_DATA).replace(/</g, "\\u003c") +
  "</script>";

const SITE = "https://shooteratlas.com";
const READ = "3 October 2026";

const faqs = [
  {
    q: "How big is a WARDOGS map?",
    a: "256 km\u00b2, and the studio's own comparison is a 2 \u00d7 2 km Control Zone randomised inside it (<a href='https://store.steampowered.com/news/app/1867240'>Bulkhead, WARDOGS \u2014 TOP QUESTIONS, Steam news</a>, 18 February 2026, and the <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, both read " + READ + "). Community map projects print that as a 16 \u00d7 16 km square on a 1 km grid, letters A\u2013P across and numbers 1\u201316 down (<a href='https://wardogshub.gg/map/'>wardogshub.gg</a>, read " + READ + "). The plane on this page is that square, to scale.",
  },
  {
    q: "How big is the Control Zone, on the map?",
    a: "4 km\u00b2 out of 256 km\u00b2 \u2014 one sixty-fourth of the map's area, and one eighth of one of its sides, since 2 km of 16 km is 1/8 and 2 km \u00d7 2 km of 16 km \u00d7 16 km is 1/64. That is the number worth holding on to: every match is decided inside a square that is 1/64th of the ground, and the other 252 km\u00b2 are the trip to it. Drag the square on this page to any of the 225 whole-kilometre positions its north-west corner can take \u2014 15 along one side \u00d7 15 down the other \u2014 and the proportions stay the same.",
  },
  {
    q: "What does the Hot Zone do?",
    a: "It doubles both halves of what standing in the objective is worth: players inside it count twice towards their team's count, and they earn double cash (<a href='https://store.steampowered.com/news/app/1867240'>Bulkhead, WARDOGS \u2014 TOP QUESTIONS, Steam news</a>, 18 February 2026, read " + READ + "). It shifts inside the Control Zone during the match rather than sitting still. No official material gives it a diameter, so this page draws it as an unmeasured dashed ring.",
  },
  {
    q: "Is there an official WARDOGS map, or an official location list?",
    a: "No. The material read for this page carries the map size, the Control Zone, the Hot Zone and the tower mechanic, and no map list, no location name and no coordinates (read " + READ + "). Every location set in circulation comes from community projects that read them out of the game files, and this page does not republish another project's marker set, which is why the location rows here start empty and carry the source for each one that is added.",
  },
  {
    q: "What are the three maps called?",
    a: "The names in circulation are Bakurani, Ozeti and Zestafona, and they are community data-mining rather than studio material: the hub's interactive maps page carries all three at 256 km\u00b2 each (<a href='https://wardogshub.gg/map/'>wardogshub.gg</a>, read " + READ + "), and the Steam guides point at a third-party map app using the same three names. Treat them as the names the server browser prints, not as names Bulkhead has published.",
  },
  {
    q: "Can I use this page to give a squad a position?",
    a: "Yes \u2014 that is what the grid readout is for. Move the pointer or your finger over the map and the panel prints the 1 km cell, the letters and numbers, and the offset in kilometres from the west and north edges; the copy button puts the whole line on the clipboard. What you cannot do yet is look up a named location, because no location row has been read and added. The readout is a coordinate, not a gazetteer.",
  },
  {
    q: "Why does the location list start empty?",
    a: "Because filling it any other way would mean copying a community project's data-mined marker set, and inventing one would be worse. The page therefore ships the tool, the official geometry and the category list, and takes locations from one data file (<code>" + dataFile + "</code>) where every row carries the page it was read from and the date it was read. The rows that are still missing are listed on the page rather than filled with a plausible number.",
  },
];

const faqHtml = faqList(faqs);

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: "Wardogs", item: SITE + "/wardogs" },
        { "@type": "ListItem", position: 3, name: "Map", item: SITE + "/wardogs-map" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a.replace(/<[^>]+>/g, "") },
      })),
    },
  ],
};

const STYLE = `
/* ---- the map page's own block. Nothing above this line is shared with any
   other page, and nothing outside .wm is touched by it. ---- */
.wm-head-h1{font-size:clamp(1.5rem,1.15rem + 1.2vw,2rem);line-height:1.16;margin:0 0 .55rem}
.wm-lede{font-size:1.02rem;margin:0 0 1.05rem}
.wm{margin:0 0 1.6rem}
.wm-bar{display:flex;flex-wrap:wrap;align-items:center;gap:.6rem;margin:0 0 .7rem}
.wm-maps{display:flex;gap:.35rem;flex-wrap:wrap}
.wm-tab{font:inherit;font-size:.9rem;font-weight:600;padding:.45rem .85rem;border:1px solid var(--rule);border-radius:999px;background:var(--surface);color:var(--ink-2);cursor:pointer}
.wm-tab:hover{border-color:var(--accent);color:var(--ink)}
.wm-tab[aria-pressed="true"]{background:var(--accent);border-color:var(--accent);color:var(--accent-ink)}
.wm-zoom{display:flex;align-items:center;gap:.3rem;margin-left:auto}
.wm-btn{font:inherit;font-size:.86rem;line-height:1;min-width:2.1rem;min-height:2.1rem;padding:.4rem .55rem;border:1px solid var(--rule);border-radius:var(--r-sm);background:var(--surface);color:var(--ink);cursor:pointer}
.wm-btn:hover{border-color:var(--accent)}
.wm-btn[aria-pressed="true"]{background:var(--accent-wash);border-color:var(--accent);color:var(--ink)}
.wm-btn:focus-visible,.wm-chip:focus-visible,.wm-tab:focus-visible,.wm-list button:focus-visible,.wm-mk:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.wm-grid{display:grid;grid-template-columns:minmax(0,1.62fr) minmax(0,1fr);gap:1.1rem;align-items:start}
.wm-stage{position:relative;border:1px solid var(--rule);border-radius:var(--r);background:var(--surface-2);overflow:hidden}
.wm-view{position:relative;height:min(64vh,560px);touch-action:none;cursor:grab;overflow:hidden;outline:none;background:var(--surface-2)}
.wm-view:focus-visible{box-shadow:inset 0 0 0 2px var(--accent)}
.wm-view[data-drag="1"]{cursor:grabbing}
.wm-plane{position:absolute;left:0;top:0;width:960px;height:960px;transform-origin:0 0;background:
  repeating-linear-gradient(to right,var(--rule-soft) 0 1px,transparent 1px 60px),
  repeating-linear-gradient(to bottom,var(--rule-soft) 0 1px,transparent 1px 60px),
  var(--surface);
  box-shadow:inset 0 0 0 1px var(--rule)}
.wm-plane::after{content:"";position:absolute;inset:0;pointer-events:none;background:
  repeating-linear-gradient(to right,var(--grid) 0 1px,transparent 1px 300px),
  repeating-linear-gradient(to bottom,var(--grid) 0 1px,transparent 1px 300px)}
.wm-lbl{position:absolute;font-family:var(--mono);font-size:calc(10px * var(--k,1));color:var(--muted);pointer-events:none;user-select:none}
.wm-lbl-x{top:4px;transform:translateX(-50%)}
.wm-lbl-y{left:5px;transform:translateY(-50%)}
.wm-corner{position:absolute;font-family:var(--mono);font-size:calc(10px * var(--k,1));color:var(--muted);pointer-events:none}
.wm-mk{position:absolute;width:calc(18px * var(--k,1));height:calc(18px * var(--k,1));margin:calc(-9px * var(--k,1)) 0 0 calc(-9px * var(--k,1));border-radius:50%;border:2px solid var(--accent-ink);background:var(--accent);cursor:pointer;padding:0;z-index:3}
.wm-mk[aria-pressed="true"]{box-shadow:0 0 0 3px var(--accent-wash),0 0 0 1px var(--accent)}
.wm-mk-unplaced{opacity:.45;cursor:default}
.wm-zone{position:absolute;width:120px;height:120px;left:420px;top:420px;border:2px solid var(--accent);background:var(--accent-wash);z-index:2;cursor:move;touch-action:none;display:none}
.wm-zone[data-on="1"]{display:block}
.wm-zone-tag{position:absolute;left:0;top:calc(-1.4rem * var(--k,1));font-family:var(--mono);font-size:calc(10px * var(--k,1));letter-spacing:.06em;color:var(--accent);white-space:nowrap;background:var(--surface);border:1px solid var(--accent);border-radius:var(--r-sm);padding:1px 4px}
.wm-hot{position:absolute;left:50%;top:50%;width:calc(26px * var(--k,1));height:calc(26px * var(--k,1));margin:calc(-13px * var(--k,1)) 0 0 calc(-13px * var(--k,1));border:2px dashed var(--accent);border-radius:50%;background:transparent}
.wm-hot-tag{position:absolute;left:50%;top:calc(50% + 16px * var(--k,1));transform:translateX(-50%);font-family:var(--mono);font-size:calc(10px * var(--k,1));color:var(--accent);white-space:nowrap;background:var(--surface);border-radius:var(--r-sm);padding:0 3px}
.wm-scale{position:absolute;left:12px;bottom:12px;font-family:var(--mono);font-size:10px;color:var(--ink-2);background:var(--surface);border:1px solid var(--rule);border-radius:var(--r-sm);padding:2px 6px;pointer-events:none}
.wm-scale i{display:inline-block;height:6px;border-left:1px solid var(--ink-2);border-right:1px solid var(--ink-2);border-bottom:1px solid var(--ink-2);vertical-align:-1px;margin:0 4px}
.wm-hint{position:absolute;right:12px;bottom:12px;font-size:.72rem;color:var(--muted);background:var(--surface);border:1px solid var(--rule);border-radius:var(--r-sm);padding:2px 7px;pointer-events:none}
.wm-side{display:flex;flex-direction:column;gap:.7rem;min-width:0}
.wm-read{border:1px solid var(--rule);border-radius:var(--r-sm);background:var(--surface);padding:.6rem .7rem;font-family:var(--mono);font-size:.8rem;line-height:1.5;color:var(--ink)}
.wm-read b{color:var(--accent);font-weight:700}
.wm-read span{color:var(--muted)}
.wm-types{display:flex;flex-wrap:wrap;gap:.3rem;max-height:8.4rem;overflow:auto;padding-bottom:.1rem}
.wm-chip{font:inherit;font-size:.78rem;padding:.28rem .6rem;border:1px solid var(--rule);border-radius:999px;background:var(--surface);color:var(--ink-2);cursor:pointer;display:inline-flex;align-items:center;gap:.35rem}
.wm-chip:hover{border-color:var(--accent)}
.wm-chip[aria-pressed="true"]{border-color:var(--accent);background:var(--accent-wash);color:var(--ink)}
.wm-chip em{font-style:normal;font-family:var(--mono);font-size:.7rem;color:var(--muted)}
.wm-dot{width:8px;height:8px;border-radius:50%;background:var(--accent);flex:none}
.wm-listbox{border:1px solid var(--rule);border-radius:var(--r-sm);background:var(--surface);overflow:hidden}
.wm-listhead{display:flex;align-items:center;justify-content:space-between;gap:.5rem;padding:.5rem .7rem;border-bottom:1px solid var(--rule-soft);font-family:var(--mono);font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.wm-list{list-style:none;margin:0;padding:0;max-height:min(34vh,300px);overflow:auto}
.wm-list li{margin:0;border-bottom:1px solid var(--rule-soft)}
.wm-list li:last-child{border-bottom:0}
.wm-list button{display:flex;width:100%;gap:.55rem;align-items:baseline;text-align:left;font:inherit;font-size:.9rem;padding:.5rem .7rem;background:none;border:0;color:var(--ink);cursor:pointer}
.wm-list button:hover{background:var(--surface-2)}
.wm-list button[aria-pressed="true"]{background:var(--accent-wash)}
.wm-list .wm-coord{margin-left:auto;font-family:var(--mono);font-size:.72rem;color:var(--muted);white-space:nowrap}
.wm-empty{padding:.7rem;font-size:.86rem;line-height:1.5;color:var(--ink-2)}
.wm-empty ul{margin:.45rem 0 0;padding-left:1.05rem}
.wm-empty li{margin:.2rem 0;font-size:.84rem;color:var(--muted)}
.wm-detail{border:1px solid var(--rule);border-radius:var(--r-sm);background:var(--surface);padding:.7rem}
.wm-detail h3{margin:0 0 .3rem;font-size:.98rem}
.wm-detail p{margin:0 0 .5rem;font-size:.86rem;color:var(--ink-2)}
.wm-detail dl{margin:0 0 .55rem;font-family:var(--mono);font-size:.76rem;color:var(--ink-2);display:grid;grid-template-columns:auto 1fr;gap:.15rem .6rem}
.wm-detail dt{color:var(--muted)}
.wm-detail dd{margin:0;overflow-wrap:anywhere}
.wm-actions{display:flex;flex-wrap:wrap;gap:.4rem}
.wm-actions .wm-btn{min-width:auto}
.wm-actions .wm-btn[data-primary="1"]{background:var(--accent);border-color:var(--accent);color:var(--accent-ink);font-weight:650}
.wm-said{font-size:.78rem;color:var(--muted);margin:.45rem 0 0;min-height:1.1rem}
@media (max-width:1099px){
.wm-grid{grid-template-columns:minmax(0,1fr)}
.wm-view{height:min(58vh,460px)}
.wm-list{max-height:none;max-height:min(38vh,320px)}
}
@media (max-width:620px){
.wm-head-h1{font-size:1.32rem}
.wm-lede{font-size:.98rem;margin-bottom:.85rem}
.wm-bar{gap:.4rem;margin-bottom:.55rem}
.wm-zoom{margin-left:0;width:100%;justify-content:flex-start}
.wm-view{height:min(46vh,380px)}
.wm-hint{display:none}
.wm-read{font-size:.76rem}
}
`;

const body = `<h1 class="wm-head-h1">WARDOGS map: 256 km\u00b2, one Control Zone, and a grid reference you can copy</h1>

<p class="lede wm-lede">Three maps, each 16 \u00d7 16 km, with a 2 \u00d7 2 km Control Zone dropped into a random square of it every match. Pan the plane, read the grid reference under your finger, drag the objective where your match put it, and copy the coordinates.</p>

<div class="wm">
  <div class="wm-bar">
    <div class="wm-maps" id="wm-maps" role="group" aria-label="Map"></div>
    <div class="wm-zoom">
      <button class="wm-btn" type="button" id="wm-out" aria-label="Zoom out">\u2212</button>
      <button class="wm-btn" type="button" id="wm-in" aria-label="Zoom in">+</button>
      <button class="wm-btn" type="button" id="wm-fit">Fit</button>
      <button class="wm-btn" type="button" id="wm-zone-btn" aria-pressed="false">Control Zone</button>
    </div>
  </div>
  <div class="wm-grid">
    <div class="wm-stage">
      <div class="wm-view" id="wm-view" tabindex="0" role="application" aria-label="WARDOGS map grid. Arrow keys pan, plus and minus zoom.">
        <div class="wm-plane" id="wm-plane">
          <div class="wm-zone" id="wm-zone"><span class="wm-zone-tag">Control Zone 2 \u00d7 2 km</span><span class="wm-hot"></span><span class="wm-hot-tag">Hot Zone</span></div>
        </div>
        <div class="wm-scale" id="wm-scale"><i></i>2 km</div>
        <div class="wm-hint">drag to pan \u00b7 wheel or pinch to zoom</div>
      </div>
    </div>
    <div class="wm-side">
      <div class="wm-read" id="wm-read" aria-live="off">Move over the map to read a grid reference.</div>
      <div class="wm-types" id="wm-types" role="group" aria-label="Filter by location type"></div>
      <div class="wm-listbox">
        <div class="wm-listhead"><span id="wm-listhead">Locations</span><span id="wm-count"></span></div>
        <ul class="wm-list" id="wm-list"></ul>
        <div class="wm-empty" id="wm-empty" hidden></div>
      </div>
      <div class="wm-detail" id="wm-detail"></div>
    </div>
  </div>
</div>
${DATA_TAG}
<script>
(function () {
  var SITE = "${SITE}";
  var DATA = JSON.parse(document.getElementById("wm-data").textContent);
  var TYPES = {};
  DATA.types.forEach(function (t) { TYPES[t.id] = t; });
  var MAPS = {};
  DATA.maps.forEach(function (m) { MAPS[m.id] = m; });

  var PLANE = 960;              // px of the drawn plane at zoom 1
  var KM = DATA.grid.sizeKm;    // 16
  var PX = PLANE / KM;          // 60 px to the kilometre
  var view = document.getElementById("wm-view");
  var plane = document.getElementById("wm-plane");
  var zone = document.getElementById("wm-zone");
  var readEl = document.getElementById("wm-read");
  var listEl = document.getElementById("wm-list");
  var emptyEl = document.getElementById("wm-empty");
  var detailEl = document.getElementById("wm-detail");
  var typesEl = document.getElementById("wm-types");
  var mapsEl = document.getElementById("wm-maps");
  var countEl = document.getElementById("wm-count");
  var listheadEl = document.getElementById("wm-listhead");

  var state = {
    map: DATA.maps[0].id,
    type: "all",
    zoom: 1,
    x: 0,
    y: 0,
    sel: null,          // {kind:"point"|"grid"|"zone", ...}
    zone: null,         // {x,y} km of the zone's north-west corner
    dragZone: false
  };

  function kmToPx(v) { return v * PX; }
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

  function gridRef(x, y) {
    var col = String.fromCharCode(65 + clamp(Math.floor(x), 0, KM - 1));
    var row = clamp(Math.floor(y), 0, KM - 1) + 1;
    return col + row;
  }
  function kmLine(x, y) {
    return x.toFixed(1) + " km east of the west edge, " + y.toFixed(1) + " km south of the north edge";
  }
  function refLine(x, y) {
    return MAPS[state.map].name + " \u00b7 grid " + gridRef(x, y) + " \u00b7 " + kmLine(x, y);
  }

  /* ---- the plane's labels ------------------------------------------------ */
  (function labels() {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < KM; i++) {
      var cx = i * PX + PX / 2;
      var a = document.createElement("span");
      a.className = "wm-lbl wm-lbl-x";
      a.style.left = cx + "px";
      a.textContent = String.fromCharCode(65 + i);
      frag.appendChild(a);
      var b = document.createElement("span");
      b.className = "wm-lbl wm-lbl-y";
      b.style.top = cx + "px";
      b.textContent = String(i + 1);
      frag.appendChild(b);
    }
    var nw = document.createElement("span");
    nw.className = "wm-corner";
    nw.style.left = "6px";
    nw.style.top = "18px";
    nw.textContent = "N";
    frag.appendChild(nw);
    plane.appendChild(frag);
  })();

  /* ---- view ------------------------------------------------------------- */
  function apply() {
    plane.style.transform = "translate(" + state.x + "px," + state.y + "px) scale(" + state.zoom + ")";
    // Labels, markers and their tags are annotations rather than ground, so they
    // keep their screen size: --k undoes the plane's scale for them.
    plane.style.setProperty("--k", String(1 / state.zoom));
    var sc = document.getElementById("wm-scale");
    sc.querySelector("i").style.width = Math.round(2 * PX * state.zoom) + "px";
    sc.lastChild.textContent = " 2 km";
  }
  function fit() {
    var w = view.clientWidth, h = view.clientHeight;
    state.zoom = Math.max(0.34, Math.min(w, h) / PLANE);
    state.x = (w - PLANE * state.zoom) / 2;
    state.y = (h - PLANE * state.zoom) / 2;
    apply();
  }
  function zoomBy(factor, cx, cy) {
    var z0 = state.zoom;
    var z1 = clamp(z0 * factor, 0.34, 6);
    if (z1 === z0) return;
    if (cx == null) { cx = view.clientWidth / 2; cy = view.clientHeight / 2; }
    state.x = cx - (cx - state.x) * (z1 / z0);
    state.y = cy - (cy - state.y) * (z1 / z0);
    state.zoom = z1;
    apply();
  }
  function centreOn(xKm, yKm) {
    state.x = view.clientWidth / 2 - kmToPx(xKm) * state.zoom;
    state.y = view.clientHeight / 2 - kmToPx(yKm) * state.zoom;
    apply();
  }
  function toKm(clientX, clientY) {
    var r = view.getBoundingClientRect();
    return {
      x: clamp((clientX - r.left - state.x) / state.zoom / PX, 0, KM),
      y: clamp((clientY - r.top - state.y) / state.zoom / PX, 0, KM)
    };
  }

  /* ---- readout ---------------------------------------------------------- */
  function showRef(x, y) {
    state.sel = { kind: "grid", x: x, y: y };
    readEl.innerHTML = "<b>" + gridRef(x, y) + "</b> <span>\u00b7 " + kmLine(x, y) + " \u00b7 " + MAPS[state.map].name + "</span>";
    renderDetail();
  }

  /* ---- the Control Zone -------------------------------------------------- */
  function zoneCorner() { return state.zone || { x: (KM - 2) / 2, y: (KM - 2) / 2 }; }
  function drawZone() {
    if (!state.zone) return;
    zone.style.left = kmToPx(state.zone.x) + "px";
    zone.style.top = kmToPx(state.zone.y) + "px";
    zone.style.width = kmToPx(2) + "px";
    zone.style.height = kmToPx(2) + "px";
  }
  function setZone(x, y) {
    state.zone = { x: clamp(x, 0, KM - 2), y: clamp(y, 0, KM - 2) };
    drawZone();
    var c = state.zone;
    readEl.innerHTML = "<b>Control Zone</b> <span>\u00b7 " + MAPS[state.map].name + " \u00b7 grid " + gridRef(c.x, c.y) + "\u2013" + gridRef(c.x + 2 - 0.01, c.y + 2 - 0.01) + " \u00b7 " + kmLine(c.x, c.y) + "</span>";
    state.sel = { kind: "zone", x: c.x, y: c.y };
    renderDetail();
  }
  var zoneBtn = document.getElementById("wm-zone-btn");
  zoneBtn.addEventListener("click", function () {
    var on = zoneBtn.getAttribute("aria-pressed") === "true";
    zoneBtn.setAttribute("aria-pressed", on ? "false" : "true");
    zone.setAttribute("data-on", on ? "0" : "1");
    if (!on) { setZone(zoneCorner().x, zoneCorner().y); }
  });
  zone.addEventListener("pointerdown", function (e) {
    e.stopPropagation();
    state.dragZone = true;
    zone.setPointerCapture(e.pointerId);
  });
  zone.addEventListener("pointermove", function (e) {
    if (!state.dragZone) return;
    e.stopPropagation();
    var p = toKm(e.clientX, e.clientY);
    setZone(p.x - 1, p.y - 1);
  });
  zone.addEventListener("pointerup", function (e) {
    state.dragZone = false;
    try { zone.releasePointerCapture(e.pointerId); } catch (err) {}
  });
  zone.addEventListener("pointercancel", function () { state.dragZone = false; });

  /* ---- pan, zoom, tap ---------------------------------------------------- */
  var pointers = {}, drag = null, pinch = null;
  view.addEventListener("pointerdown", function (e) {
    if (state.dragZone) return;
    pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
    var ids = Object.keys(pointers);
    if (ids.length === 1) {
      drag = { id: e.pointerId, x0: e.clientX, y0: e.clientY, x: e.clientX, y: e.clientY, moved: 0 };
      view.setAttribute("data-drag", "1");
      try { view.setPointerCapture(e.pointerId); } catch (err) {}
    } else if (ids.length === 2) {
      var a = pointers[ids[0]], b = pointers[ids[1]];
      pinch = { d: Math.hypot(a.x - b.x, a.y - b.y), z: state.zoom };
      drag = null;
    }
  });
  view.addEventListener("pointermove", function (e) {
    if (pointers[e.pointerId]) pointers[e.pointerId] = { x: e.clientX, y: e.clientY };
    if (state.dragZone) return;
    var ids = Object.keys(pointers);
    if (pinch && ids.length >= 2) {
      var a = pointers[ids[0]], b = pointers[ids[1]];
      var d = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinch.d > 0) zoomBy((d / pinch.d) * (pinch.z / state.zoom));
      return;
    }
    if (drag && drag.id === e.pointerId) {
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      drag.moved += Math.abs(dx) + Math.abs(dy);
      state.x += dx; state.y += dy;
      drag.x = e.clientX; drag.y = e.clientY;
      apply();
      return;
    }
    var p = toKm(e.clientX, e.clientY);
    readEl.innerHTML = "<b>" + gridRef(p.x, p.y) + "</b> <span>\u00b7 " + kmLine(p.x, p.y) + " \u00b7 " + MAPS[state.map].name + "</span>";
  });
  function endPointer(e) {
    var ids = Object.keys(pointers);
    if (pinch && ids.length < 2) pinch = null;
    if (drag && drag.id === e.pointerId) {
      var wasTap = drag.moved < 8;
      drag = null;
      view.removeAttribute("data-drag");
      if (wasTap) {
        var p = toKm(e.clientX, e.clientY);
        showRef(p.x, p.y);
      }
    }
    delete pointers[e.pointerId];
  }
  view.addEventListener("pointerup", endPointer);
  view.addEventListener("pointercancel", endPointer);
  view.addEventListener("wheel", function (e) {
    e.preventDefault();
    var r = view.getBoundingClientRect();
    zoomBy(e.deltaY < 0 ? 1.12 : 1 / 1.12, e.clientX - r.left, e.clientY - r.top);
  }, { passive: false });
  view.addEventListener("dblclick", function (e) {
    var r = view.getBoundingClientRect();
    zoomBy(1.6, e.clientX - r.left, e.clientY - r.top);
  });
  view.addEventListener("keydown", function (e) {
    var step = 60;
    var k = e.key;
    if (k === "ArrowLeft") state.x += step;
    else if (k === "ArrowRight") state.x -= step;
    else if (k === "ArrowUp") state.y += step;
    else if (k === "ArrowDown") state.y -= step;
    else if (k === "+" || k === "=") zoomBy(1.2);
    else if (k === "-" || k === "_") zoomBy(1 / 1.2);
    else if (k === "0") { fit(); return; }
    else return;
    e.preventDefault();
    apply();
  });
  document.getElementById("wm-in").addEventListener("click", function () { zoomBy(1.25); });
  document.getElementById("wm-out").addEventListener("click", function () { zoomBy(1 / 1.25); });
  document.getElementById("wm-fit").addEventListener("click", function () { fit(); });
  window.addEventListener("resize", function () { apply(); });

  /* ---- filters ----------------------------------------------------------- */
  function chipCount(id) {
    return DATA.points.filter(function (p) { return p.map === state.map && p.type === id; }).length;
  }
  function renderTypes() {
    typesEl.innerHTML = "";
    var all = document.createElement("button");
    all.type = "button";
    all.className = "wm-chip";
    all.setAttribute("aria-pressed", state.type === "all" ? "true" : "false");
    all.innerHTML = "<span class=\\"wm-dot\\" style=\\"background:var(--ink-2)\\"></span>All types <em>" +
      DATA.points.filter(function (p) { return p.map === state.map; }).length + "</em>";
    all.addEventListener("click", function () { state.type = "all"; renderTypes(); renderList(); });
    typesEl.appendChild(all);
    DATA.types.forEach(function (t) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "wm-chip";
      b.setAttribute("aria-pressed", state.type === t.id ? "true" : "false");
      if (t.recorded === false) b.title = "Positions for this category have not been read yet";
      b.innerHTML = "<span class=\\"wm-dot\\" style=\\"background:" + t.colour + "\\"></span>" + t.name + " <em>" + chipCount(t.id) + "</em>";
      b.addEventListener("click", function () { state.type = t.id; renderTypes(); renderList(); });
      typesEl.appendChild(b);
    });
  }
  function renderMaps() {
    mapsEl.innerHTML = "";
    DATA.maps.forEach(function (m) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "wm-tab";
      b.setAttribute("aria-pressed", state.map === m.id ? "true" : "false");
      b.textContent = m.name;
      b.addEventListener("click", function () {
        state.map = m.id;
        state.sel = null;
        renderMaps(); renderTypes(); renderList(); renderDetail(); renderPoints();
        fit();
      });
      mapsEl.appendChild(b);
    });
  }

  /* ---- the point layer --------------------------------------------------- */
  function visiblePoints() {
    return DATA.points.filter(function (p) {
      if (p.map !== state.map) return false;
      if (state.type !== "all" && p.type !== state.type) return false;
      return true;
    });
  }
  function renderPoints() {
    Array.prototype.slice.call(plane.querySelectorAll(".wm-mk")).forEach(function (n) { n.remove(); });
    visiblePoints().forEach(function (p) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "wm-mk" + (p.x == null || p.y == null ? " wm-mk-unplaced" : "");
      if (p.x != null && p.y != null) {
        b.style.left = kmToPx(p.x) + "px";
        b.style.top = kmToPx(p.y) + "px";
        b.style.background = (TYPES[p.type] || {}).colour || "var(--accent)";
        b.title = p.name + (p.x != null ? " \u00b7 " + gridRef(p.x, p.y) : "");
      } else {
        b.hidden = true;
      }
      b.setAttribute("aria-label", p.name);
      b.addEventListener("click", function (e) { e.stopPropagation(); select(p); });
      plane.appendChild(b);
    });
  }

  /* ---- the list ---------------------------------------------------------- */
  function renderList() {
    var pts = visiblePoints();
    listEl.innerHTML = "";
    countEl.textContent = pts.length + " recorded";
    listheadEl.textContent = (state.type === "all" ? "Locations" : (TYPES[state.type] || {}).name) + " \u00b7 " + MAPS[state.map].name;
    pts.forEach(function (p) {
      var li = document.createElement("li");
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-pressed", state.sel && state.sel.kind === "point" && state.sel.id === p.id ? "true" : "false");
      var dot = "<span class=\\"wm-dot\\" style=\\"background:" + ((TYPES[p.type] || {}).colour || "var(--accent)") + "\\"></span>";
      var coord = p.x != null && p.y != null
        ? "<span class=\\"wm-coord\\">" + gridRef(p.x, p.y) + "</span>"
        : "<span class=\\"wm-coord\\">no position yet</span>";
      b.innerHTML = dot + "<span>" + p.name + "</span>" + coord;
      b.addEventListener("click", function () { select(p); });
      li.appendChild(b);
      listEl.appendChild(li);
    });
    if (!pts.length) {
      emptyEl.hidden = false;
      emptyEl.innerHTML =
        "<p><strong>No location has been recorded on this map yet.</strong> Every location set in circulation was data-mined by a community project, and this site does not republish another project's marker set, so the file starts empty and fills from what is read in game.</p>" +
        "<p style=\\"margin:.5rem 0 0\\">Still to read, on every map:</p><ul>" +
        DATA.notYetRecorded.map(function (n) { return "<li>" + n + "</li>"; }).join("") +
        "</ul>" +
        "<p style=\\"margin:.5rem 0 0\\">What the map does do today: read and copy a grid reference anywhere on the plane, and place the Control Zone where your match put it.</p>";
    } else {
      emptyEl.hidden = true;
    }
  }

  /* ---- selection and the copy buttons ------------------------------------ */
  function select(p) {
    state.sel = { kind: "point", id: p.id, ref: p };
    if (p.x != null && p.y != null) centreOn(p.x, p.y);
    renderPoints(); renderList(); renderDetail();
  }
  function copy(text, what) {
    var ok = function () { detailEl.querySelector(".wm-said").textContent = what + " copied."; };
    var fail = function () { detailEl.querySelector(".wm-said").textContent = "Could not reach the clipboard \u2014 select the text above instead."; };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(ok, function () { legacy(text) ? ok() : fail(); });
    } else {
      legacy(text) ? ok() : fail();
    }
  }
  function legacy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-1000px";
    document.body.appendChild(ta);
    ta.select();
    var done = false;
    try { done = document.execCommand("copy"); } catch (e) { done = false; }
    ta.remove();
    return done;
  }
  function jsonRow(x, y) {
    return JSON.stringify({
      id: state.map + "-" + String(x).replace(".", "_") + "-" + String(y).replace(".", "_"),
      name: "",
      type: state.type === "all" ? "tower" : state.type,
      map: state.map,
      x: Number(x.toFixed(1)),
      y: Number(y.toFixed(1)),
      note: "",
      source: { label: "", url: "", readOn: "2026-10-03" },
      confidence: "ingame"
    }, null, 2);
  }
  function renderDetail() {
    var s = state.sel;
    if (!s) {
      detailEl.innerHTML = "<h3>Nothing selected</h3><p>Tap the map for a grid reference, or drag the Control Zone. Locations appear here as they are read and added.</p><p class=\\"wm-said\\"></p>";
      return;
    }
    if (s.kind === "point") {
      var p = s.ref;
      var t = TYPES[p.type] || {};
      var placed = p.x != null && p.y != null;
      var line = placed ? refLine(p.x, p.y) : p.name + " \u00b7 " + MAPS[p.map].name + " \u00b7 position not read yet";
      detailEl.innerHTML =
        "<h3>" + p.name + "</h3>" +
        "<p>" + (p.note || "") + "</p>" +
        "<dl>" +
        "<dt>Type</dt><dd>" + (t.name || p.type) + "</dd>" +
        "<dt>Map</dt><dd>" + MAPS[p.map].name + "</dd>" +
        "<dt>Grid</dt><dd>" + (placed ? gridRef(p.x, p.y) : "not read yet") + "</dd>" +
        "<dt>Position</dt><dd>" + (placed ? kmLine(p.x, p.y) : "not read yet") + "</dd>" +
        "<dt>Source</dt><dd>" + (p.source && p.source.url ? "<a href=\\"" + p.source.url + "\\">" + (p.source.label || p.source.url) + "</a>, read " + p.source.readOn : "not recorded") + "</dd>" +
        "<dt>Layer</dt><dd>" + (p.confidence || "not stated") + "</dd>" +
        "</dl>" +
        "<div class=\\"wm-actions\\">" +
        (placed ? "<button class=\\"wm-btn\\" data-primary=\\"1\\" data-copy=\\"line\\">Copy coordinates</button>" : "") +
        (placed ? "<button class=\\"wm-btn\\" data-copy=\\"json\\">Copy data row</button>" : "") +
        "</div><p class=\\"wm-said\\"></p>";
    } else if (s.kind === "zone") {
      detailEl.innerHTML =
        "<h3>Control Zone</h3>" +
        "<p>" + DATA.features[0].note + "</p>" +
        "<dl>" +
        "<dt>Size</dt><dd>2 \u00d7 2 km (4 km\u00b2)</dd>" +
        "<dt>Map</dt><dd>" + MAPS[state.map].name + "</dd>" +
        "<dt>Grid</dt><dd>" + gridRef(s.x, s.y) + "\u2013" + gridRef(s.x + 2 - 0.01, s.y + 2 - 0.01) + "</dd>" +
        "<dt>Position</dt><dd>" + kmLine(s.x, s.y) + "</dd>" +
        "<dt>Source</dt><dd><a href=\\"" + DATA.features[0].source.url + "\\">" + DATA.features[0].source.label + "</a>, read " + DATA.features[0].source.readOn + "</dd>" +
        "<dt>Layer</dt><dd>" + DATA.features[0].confidence + "</dd>" +
        "</dl>" +
        "<div class=\\"wm-actions\\"><button class=\\"wm-btn\\" data-primary=\\"1\\" data-copy=\\"line\\">Copy coordinates</button></div>" +
        "<p class=\\"wm-said\\"></p>";
    } else {
      detailEl.innerHTML =
        "<h3>Grid " + gridRef(s.x, s.y) + "</h3>" +
        "<p>That is the whole reading: the 1 km cell and the offset from two edges, in the same letters and numbers the community map projects print.</p>" +
        "<dl>" +
        "<dt>Map</dt><dd>" + MAPS[state.map].name + "</dd>" +
        "<dt>Grid</dt><dd>" + gridRef(s.x, s.y) + "</dd>" +
        "<dt>Position</dt><dd>" + kmLine(s.x, s.y) + "</dd>" +
        "<dt>Layer</dt><dd>our-reading \u2014 the grid is the game's, the row numbering is our convention</dd>" +
        "</dl>" +
        "<div class=\\"wm-actions\\"><button class=\\"wm-btn\\" data-primary=\\"1\\" data-copy=\\"line\\">Copy coordinates</button>" +
        "<button class=\\"wm-btn\\" data-copy=\\"json\\">Copy blank data row at this point</button></div>" +
        "<p class=\\"wm-said\\"></p>";
    }
    var line = s.kind === "grid" || s.kind === "zone"
      ? "WARDOGS \u00b7 " + refLine(s.x, s.y) + " \u00b7 " + SITE + "/wardogs-map"
      : "WARDOGS \u00b7 " + (s.ref.x != null ? refLine(s.ref.x, s.ref.y) : s.ref.name + " \u00b7 " + MAPS[s.ref.map].name + " \u00b7 position not read yet");
    Array.prototype.slice.call(detailEl.querySelectorAll("[data-copy]")).forEach(function (b) {
      b.addEventListener("click", function () {
        if (b.getAttribute("data-copy") === "json") copy(jsonRow(s.x, s.y), "Data row");
        else copy(line, "Coordinates");
      });
    });
  }

  renderMaps(); renderTypes(); renderList(); renderDetail(); renderPoints();
  fit(); drawZone();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { fit(); });
})();
</script>

<h2>What this page does, and what it refuses to do</h2>

<p>Three things are confirmed about the ground every match is played on, and one of them is the only figure most players ever quote. The map is <strong>256 km\u00b2</strong>. The objective inside it is a <strong>2 \u00d7 2 km Control Zone</strong>, randomised into that area every match, and inside the Control Zone sits the <strong>Hot Zone</strong>, which shifts and pays double (<a href="https://store.steampowered.com/news/app/1867240">Bulkhead, WARDOGS \u2014 TOP QUESTIONS, Steam news</a>, 18 February 2026, read ${READ}). The store page carries the same two numbers in its own words (<a href="https://store.steampowered.com/app/1867240/WARDOGS/">Steam store page</a>, read ${READ}).</p>

<p>What is confirmed about locations is nothing. Bulkhead's own line is that Kolchia \u201cfeatures multiple locations and POIs\u201d, and the material read for this page names none of them, gives no count, and publishes no coordinates (read ${READ}). The location sets in circulation \u2014 60-odd named places per map, plus spawn points, vendors, garages, fuel points and ladders \u2014 were read out of the game files by community projects. The <a href="/wardogs-gameplay">gameplay page</a> already states this site's position on that: the hub's interactive map \u201cis community work and this page does not copy it.\u201d The same rule applies here, so this page ships the tool, the geometry and the categories, and takes locations from one file.</p>

<div class="data-block">
<div class="data-head"><h3>The one file every location comes from</h3></div>
<div class="matrix-scroll" role="region" tabindex="0" aria-label="Where the map page's data lives">
<table class="matrix">
<caption>Read ${READ}. The page carries no location of its own; delete a row here and it leaves the map.</caption>
<thead><tr><th scope="col">What</th><th scope="col">Where</th></tr></thead>
<tbody>
<tr><td class="wrap-cell">The data file the page reads at build time</td><td class="wrap-cell"><code>${dataFile}</code></td></tr>
<tr><td class="wrap-cell">The same file, served as it is, so you can read it without the repo</td><td class="wrap-cell"><code>/assets/data/wardogs-map-points.json</code></td></tr>
<tr><td class="wrap-cell">One row, in the shape the file uses</td><td class="wrap-cell"><code>{ "id", "name", "type", "map", "x", "y", "note", "source": { "label", "url", "readOn" }, "confidence" }</code></td></tr>
<tr><td class="wrap-cell">x and y</td><td class="wrap-cell">kilometres \u2014 x east from the west edge, y south from the north edge, both 0\u201316 on every map</td></tr>
<tr><td class="wrap-cell">Confidence, one of four</td><td class="wrap-cell"><span class="src-chip src-official">official</span> <span class="src-chip src-ingame">ingame</span> <span class="src-chip src-third">third-party</span> <span class="src-chip src-calc">our-reading</span></td></tr>
<tr><td class="wrap-cell">The button to press</td><td class="wrap-cell">Tap the map, press <em>Copy blank data row at this point</em>, fill in the name and the source, paste it into <code>points</code></td></tr>
</tbody>
</table>
</div>
<p class="data-note">A row with <code>"x": null</code> is allowed on purpose: it is listed with the words <em>no position yet</em> rather than plotted at a guessed spot.</p>
</div>

<h2>Reading the grid reference</h2>

<p>The grid is the one the community map projects print, and the tool on this page draws it from the same two numbers: 16 km a side, 1 km cells, so 16 columns lettered A\u2013P and 16 rows numbered 1\u201316 (<a href="https://wardogshub.gg/map/">wardogshub.gg interactive maps</a>, read ${READ}). Columns run west to east. Rows run down the page here, 1 at the north edge \u2014 and that direction is the one thing on this page that is a convention of ours rather than a reading, because no source we could read says which way the game numbers them. It is written down in the data file so the next reader can correct it in one line.</p>

<p>A reference is a cell plus an offset, and the offsets are what you actually say out loud: <em>\u201cthe yard in H7, four kilometres east of the west edge\u201d</em>. The copy button puts the whole line on the clipboard with the page's address, so a paste into a squad chat arrives with both halves.</p>

<h2>What the Control Zone looks like to scale</h2>

<p>The square on the map is the real proportion, not a symbol. A 2 \u00d7 2 km zone on a 16 \u00d7 16 km map is one eighth of a side (2 of 16 km) and one sixty-fourth of the area (4 of 256 km\u00b2). Press <em>Control Zone</em>, drag it to the corner the match drew, and the other 252 km\u00b2 stop being an abstraction: that is the ground you cross after every death, which is also the reason the studio describes your respawn timer as the choices you make on the way back rather than a countdown on screen.</p>

<div class="qa">
<h2>Common questions</h2>
${faqHtml}
<p class="src">Where these figures come from: the map size, the randomised 2 \u00d7 2 km Control Zone, the Hot Zone and the three factions are Bulkhead's, from <a href="https://store.steampowered.com/news/app/1867240">WARDOGS \u2014 TOP QUESTIONS</a> of 18 February 2026 and the <a href="https://store.steampowered.com/app/1867240/WARDOGS/">Steam store page</a>; the tower and hot-zone-magnet mechanic is from <a href="https://www.pcgamesn.com/wardogs/capture-wardogs-towers">PCGamesN's tower guide</a> of 11 September 2026 and this site's own in-game reading of the tower and terminal screens of 28 September 2026; the 16 \u00d7 16 km plane, the 1 km lettered grid and the three map names are the community map projects' \u2014 <a href="https://wardogshub.gg/map/">wardogshub.gg</a>, <a href="https://wardogstools.org/">wardogstools.org</a> and <a href="https://wardogs.tools/map">wardogs.tools</a>. All read ${READ}. The location categories the filter lists are the ones the community maps track; the locations themselves are not here, because they are that community work and this page does not copy it.</p>
</div>

${adUnit}

<div class="readnext">
<p><a href="/wardogs-gameplay">The one mode, and how the Control Zone actually scores &rarr;</a></p>
<p><a href="/wardogs-factions">LONESTAR, VALKYRA and MANTICORE &mdash; who the three teams are &rarr;</a></p>
<p><a href="/wardogs-player-count">How many people are on the map, and how many per match &rarr;</a></p>
<p><a href="/wardogs">The hub: how a match is scored and what kit costs &rarr;</a></p>
</div>`;

export const page = {
  source: "src/pages/wardogs-map.mjs",
  path: "/wardogs-map",
  title: "WARDOGS map: 256 km\u00b2, the 1 km grid and the Control Zone",
  description:
    "An interactive, to-scale WARDOGS map: 16 \u00d7 16 km, 1 km grid reference, the randomised 2 \u00d7 2 km Control Zone and the Hot Zone. Pan, zoom, read and copy coordinates. Every figure carries its source.",
  extraHead:
    "<style>" + STYLE + "</style>\n" +
    "<script type='application/ld+json'>" + JSON.stringify(schema) + "</script>",
  toc: false,
  body,
};
