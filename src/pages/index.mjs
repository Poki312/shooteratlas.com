import { adUnit } from "../ad.mjs";

export const page = {
  // The home page is not an article: it has no contents rail.
  toc: false,
  // Every page wears the 2026-10-03 skin by default. This flag is the whole of
  // what makes the home page different: it raises the h1 to landing-page size
  // instead of the article size an inner page uses.
  heroType: true,
  ogImage: "https://shooteratlas.com/assets/img/home.png",
  source: "src/pages/index.mjs",
  path: "/",
  title: "Tactical shooters, sourced and dated — Shooter Atlas",
  description:
    "Shooter Atlas documents large-scale tactical shooters one page at a time, with every figure carrying its source and the date it was read.",
  extraHead:
    "<meta name='impact-site-verification' value='d4f89c0e-f51b-4811-8db0-8aaa955f9dde'>" +
    "\n<meta name='awin-verification' content='Awin'>" +
    "\n<meta name='mitgo-verification' content='ce9af179-d266-486b-a5e5-1d1362de694c'>" +
    "\n<meta name='commission-factory-verification' content='efa67650281a4a0986ac78ae4f310090'>" +
    "\n<!-- Awin publisher verification marker -->",
  body: `<div class="hero">
<div>
<h1>Tactical shooters, every figure sourced and dated</h1>
<p class="lede">Large-scale tactical shooters, where every figure carries its source and the date it was read.</p>
</div>
<aside class="spec" aria-label="At a glance">
<div class="spec-head"><span>At a glance</span><span>v2026.10</span></div>
<div class="spec-grid">
<div><span class="stat-n">6</span><span class="stat-k">games documented</span></div>
<div><span class="stat-n">1</span><span class="stat-k">page type, every game</span></div>
<div><span class="stat-n">0</span><span class="stat-k">figures without a source and a read date</span></div>
<div><span class="stat-n">{{CONTENT_PAGES}}</span><span class="stat-k">pages published</span></div>
</div>
</aside>
</div>

<h2>Pages</h2>
<p>One page per game, the same questions in the same order on every one, and every figure with its source and the date it was read.</p>
<div class="filter">
<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5l5 5"/></svg>
<label class="sr-only" for="page-filter">Filter pages</label>
<input id="page-filter" type="search" placeholder="Filter pages &mdash; try &ldquo;price&rdquo; or &ldquo;reviews&rdquo;" autocomplete="off">
</div>
<div class="data-block">
<div class="matrix-scroll" role="region" tabindex="0" aria-label="Pages">
<table class="matrix" id="pages-table">
<thead><tr><th scope="col">Page</th><th scope="col">What it answers</th><th scope="col" class="num">Read on</th></tr></thead>
<tbody>
<tr data-terms="rising storm 2 vietnam player count concurrent players steam charts peak online how many players tripwire antimatter 64 player servers population live"><td><a href="/rising-storm-2-player-count">Rising Storm 2 player count</a></td><td class="wrap-cell">208 accounts open on Steam, the two all-time peaks that disagree by 26, and a record month that is simply the month the game launched.</td><td class="num">3 Oct 2026</td></tr>
<tr data-terms="arma reforger player count concurrent players steam charts peak online how many players crossplay xbox playstation console population live"><td><a href="/arma-reforger-player-count">Arma Reforger player count</a></td><td class="wrap-cell">8,681 accounts open on Steam, the two all-time peaks that disagree by 1,591, and a studio that has never printed how many players a server holds.</td><td class="num">3 Oct 2026</td></tr>
<tr data-terms="hell let loose player count concurrent players steam charts peak online how many players server browser console playstation xbox population live"><td><a href="/hell-let-loose-player-count">Hell Let Loose player count</a></td><td class="wrap-cell">2,207 accounts open on Steam, the two all-time peaks that disagree by 21, and the console half of the game that no public number covers.</td><td class="num">3 Oct 2026</td></tr>
<tr data-terms="foxhole player count concurrent players steam charts peak online how many players shards war persistent queue population live"><td><a href="/foxhole-player-count">Foxhole player count</a></td><td class="wrap-cell">1,774 accounts open on Steam, the two all-time peaks that disagree by 213, and the war the game publishes instead of a count of who is in it.</td><td class="num">3 Oct 2026</td></tr>
<tr data-terms="squad player count concurrent players steam charts peak online how many players server browser queue population live"><td><a href="/squad-player-count">Squad player count</a></td><td class="wrap-cell">10,302 accounts open on Steam, the two all-time peaks that disagree by 39, and why nobody can print the count of players actually on a map.</td><td class="num">3 Oct 2026</td></tr>
<tr data-terms="wardogs overview match scoring economy platforms kit loadout"><td><a href="/wardogs">WARDOGS</a></td><td class="wrap-cell">How a match is scored, what kit costs, what gates it, and what runs it.</td><td class="num">28 Sep 2026</td></tr>
<tr data-terms="price region steam store japan korea brazil currency premium supporter"><td><a href="/wardogs-price">Price by region</a></td><td class="wrap-cell">What Steam charges in eight countries, and the premium each one carries on the Supporter Edition.</td><td class="num">29 Sep 2026</td></tr>
<tr data-terms="achievements rarity steam global stats big spender tutorial"><td><a href="/wardogs-achievements">Achievements</a></td><td class="wrap-cell">All ten, and how rare each one is &mdash; from 78.3% on the tutorial to 0.1% on Big Spender.</td><td class="num">28 Sep 2026</td></tr>
<tr data-terms="reviews steam sentiment positive summary very positive mostly positive all languages"><td><a href="/wardogs-reviews">Steam reviews</a></td><td class="wrap-cell">What 51,079 English reviews say, why the all-language total grades lower, and what a review score can and cannot tell you.</td><td class="num">28 Sep 2026</td></tr>
<tr data-terms="early access timeline roadmap developer jets weapons price rise"><td><a href="/wardogs-early-access">Early Access</a></td><td class="wrap-cell">The official Q&amp;A in the developer's own words: the timeline, the price rise, and what is planned for 1.0.</td><td class="num">28 Sep 2026</td></tr>
<tr data-terms="reddit community requests mortar sniper looting buy or wait"><td><a href="/wardogs-reddit">On Reddit</a></td><td class="wrap-cell">Ten threads from the first month: five are the same buy-or-wait question, and the four asks that keep returning.</td><td class="num">28 Sep 2026</td></tr>
<tr data-terms="release date launch unlock hour 16:00 utc steam early access september 2026 console 2028 queue sales"><td><a href="/wardogs-release-date">Release date</a></td><td class="wrap-cell">The day, the unlock hour in fourteen time zones, the launch-day queue figures and what the date did not settle.</td><td class="num">30 Sep 2026</td></tr>
<tr data-terms="battalion 1944 bulkhead previous game developer design maps alpha movement unlocks drop shot"><td><a href="/wardogs-battalion-1944">Battalion 1944</a></td><td class="wrap-cell">The studio's previous tactical shooter, from its own 2017 notes: the map formula, the refusal to make unlocks the reward, and the alpha cuts.</td><td class="num">29 Sep 2026</td></tr>
<tr data-terms="battalion 1944 launch closed alpha nda no streaming roadmap 2018 dlc free offline lan clanwars square enix price rise"><td><a href="/wardogs-battalion-1944-launch">Battalion 1944 launch</a></td><td class="wrap-cell">The rules the alpha ran under, the three dates behind it, and the 2018 plan that promised free DLC and printed a price rise months ahead.</td><td class="num">30 Sep 2026</td></tr>
<tr data-terms="languages language support subtitles full audio localisation german french japanese korean russian chinese polish turkish ukrainian italian spanish portuguese"><td><a href="/wardogs-languages">Languages</a></td><td class="wrap-cell">Fourteen languages in Valve's table, one with full audio, no subtitles ticks at all &mdash; plus where the players in each language actually are.</td><td class="num">30 Sep 2026</td></tr>
<tr data-terms="genres categories platform windows vr controller specs steam api"><td><a href="/wardogs-genres">Genres and specs</a></td><td class="wrap-cell">Five genres and eight categories read out of Valve's API, Windows as the only platform, no VR entry and no controller category.</td><td class="num">30 Sep 2026</td></tr>
<tr data-terms="gameplay game mode king of the hill control zone hot zone 100 points infantry mode low level server modifiers"><td><a href="/wardogs-gameplay">Gameplay and modes</a></td><td class="wrap-cell">The one mode in the developers' own words, and the two names that are server modifiers rather than modes.</td><td class="num">1 Oct 2026</td></tr>
<tr data-terms="steam deck steamdeck linux proton steamos machine unsupported compatibility refund deck verified"><td><a href="/wardogs-steam-deck">Steam Deck</a></td><td class="wrap-cell">Valve's own compatibility result for the Deck, SteamOS and Steam Machine, and the studio's pinned answer to Linux players.</td><td class="num">1 Oct 2026</td></tr>
<tr data-terms="player count concurrent players steam charts peak online how many players server browser queue population live"><td><a href="/wardogs-player-count">Player count</a></td><td class="wrap-cell">103,208 accounts open on Steam against 83,730 people inside matches, the three competing peak figures, and how to check the number yourself.</td><td class="num">1 Oct 2026</td></tr>
</tbody>
</table>
</div>
<p class="data-foot">Every page carries the source link and the date each figure was read. Nothing here is a live value: every reading carries the minute it was taken, and nothing is a round number invented to fill a cell.</p>
</div>
<p>Two more WARDOGS pages go with that list. <a href="/wardogs-discord">The WARDOGS Discord page</a> reads the official server's member and online counts from Discord's own invite endpoint, and <a href="/wardogs-towers">the WARDOGS towers page</a> lists the twelve tower positions across the three maps, each cross-checked between three or four community projects.</p>
<h2>What this site is</h2>
<p>Every game gets the same pages in the same order, so two games can be compared without re-learning a layout. The WARDOGS set answers:</p>
<ul>
<li>How a match is scored, and what actually moves the objective.</li>
<li>What each weapon and vehicle costs, and which gate you pass before you are allowed to buy it.</li>
<li>What the economy pays for &mdash; kills, revives, transport, logistics &mdash; and what it charges you for dying.</li>
<li>Which platforms are supported, and which are ruled out.</li>
</ul>

<h2>Who it is for</h2>
<p>Two readers. The first is a player deciding what to buy and how to spend the first hours in a game like WARDOGS, where the starter kit is deliberately weak and travelling back to the fight costs real money. The second is a squad lead who needs the numbers on one screen while the rest of the team is still loading in.</p>
<p>Both of them want the same thing: the figure, where it came from, and whether it still holds after the last patch.</p>

<h2>What the WARDOGS pages cover</h2>
<p>The WARDOGS hub opens with the two things a new player hits immediately: how the 2&nbsp;km&nbsp;&times;&nbsp;2&nbsp;km Control Zone scores, and how the smaller Hot Zone inside it doubles both cash and count. From there it goes through the vendor list &mdash; what each rifle and vehicle costs, what class level and one-off unlock fee stands in front of it, and why the cheapest shopping window in the game is also the window in which nothing worth buying is unlocked. It closes on the platform questions people ask before paying: which storefront, which hardware, and what the anti-cheat rules out.</p>

<h2>How the numbers here get checked</h2>
<ul>
<li>Official material first: store pages, patch notes, developer posts. Those are quoted as they are written.</li>
<li>Figures that exist only inside the game are captured in the game itself and stamped with the build they were read from.</li>
<li>Anything the studio has never published is labelled as reported rather than confirmed.</li>
<li>What cannot be sourced does not go on the page. There is no filler figure and no round number invented to fill a table cell.</li>
</ul>
<p>The result is a site that is slower to fill up than a news blog, and that is the point: a number you cannot trace back is worse than a blank space.</p>

<figure class="pagefig"><picture><source media="(prefers-color-scheme: light)" srcset="/assets/img/home-light.png"><img src="/assets/img/home.png" width="1200" height="630" alt="Shooter Atlas card: the at-a-glance figures for games documented, page type and pages published"></picture><figcaption>Drawn for this page, dark or light to match. Figures as read on 3 October 2026.</figcaption></figure>

${adUnit}

<p class="cta"><a class="btn" href="/wardogs">Read the WARDOGS page &rarr;</a></p>
<p style="color:var(--muted);font-size:.82rem">Awin publisher verification.</p>

<script>
// Filter for the page list above. The rows carry their own search terms so a
// reader can type "price" or "reviews" rather than the exact page title.
(function () {
  var input = document.getElementById("page-filter");
  var table = document.getElementById("pages-table");
  if (!input || !table) return;
  var rows = Array.prototype.slice.call(table.querySelectorAll("tbody tr"));
  input.addEventListener("input", function () {
    var q = input.value.trim().toLowerCase();
    rows.forEach(function (tr) {
      var hay = (tr.getAttribute("data-terms") + " " + tr.textContent).toLowerCase();
      tr.hidden = q.length > 0 && hay.indexOf(q) === -1;
    });
  });
})();
</script>`,
};
