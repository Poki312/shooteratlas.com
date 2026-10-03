// Fourth game on the site, third page of the player-count set. Same page type
// again: answer in the first screen, a source and a read date on every number,
// four-layer table at the end.
//
// This game's own difference: it is the one in the set that also ships on
// consoles, so the number everybody quotes is a PC-only number.
import { adUnit } from "../ad.mjs";

const SITE = "https://shooteratlas.com";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: "Hell Let Loose player count", item: SITE + "/hell-let-loose-player-count" },
      ],
    },
    {
      "@type": "VideoGame",
      name: "HELL LET LOOSE",
      url: SITE + "/hell-let-loose-player-count",
      applicationCategory: "Game",
      gamePlatform: "PC (Windows)",
      publisher: "Team17",
      datePublished: "2021-07-27",
      sameAs: ["https://store.steampowered.com/app/686810/Hell_Let_Loose/"],
    },
  ],
};

export const page = {
  ogImage: "https://shooteratlas.com/assets/img/hell-let-loose-player-count.png",
  source: "src/pages/hell-let-loose-player-count.mjs",
  path: "/hell-let-loose-player-count",
  title: "HELL LET LOOSE player count: 2,207 on Steam, 21,086 at the all-time peak",
  description:
    "2,207 accounts had Hell Let Loose open on Steam at 09:49 UTC on 3 October 2026 — Valve's own figure, from the Steam Web API for app 686810. The all-time peak is 21,086 or 21,107 depending which tracker you read, and this is the one game in this set whose number is PC-only, because the game also ships on console.",
  extraHead:
    "<style>" +
    "blockquote{margin:0 0 1.2rem;padding:.7rem 1rem;border-left:3px solid var(--rule);color:var(--muted);font-style:italic;font-size:.98rem}" +
    "blockquote code,code{font-size:.92em}" +
    "</style>" +
    "<script type='application/ld+json'>" + JSON.stringify(schema) + "</script>",
  body: `<h1>HELL LET LOOSE player count: 2,207 on Steam, 21,086 at the all-time peak</h1>

<p class="lede">2,207 accounts had Hell Let Loose open on Steam at 09:49 UTC on 3 October 2026. Valve's own number, straight out of the Steam Web API for app 686810. On this game that figure is a PC-only figure, because Hell Let Loose also ships on consoles — the official site points at its own Xbox and PlayStation listings — and nobody publishes how many people are playing there. Nobody publishes how many of the 2,207 are in a match either.</p>

<p>Short version: the game is running at 10.5% of its own record. 2,207 ÷ 21,086. My arithmetic, on two published numbers. The record itself is either 21,086 or 21,107, depending which tracker you open — 21 players apart, which is one small server in a game where a server holds 100.</p>

<div class="strip">
<div><span class="stat-n">2,207</span><span class="stat-k">accounts with the game open, 09:49 UTC</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">21,086 / 21,107</span><span class="stat-k">all-time peak, depends who asked</span><span class="stat-src"><span class="src-chip src-third">third-party</span></span></div>
<div><span class="stat-n">3,960</span><span class="stat-k">24-hour peak</span><span class="stat-src"><span class="src-chip src-third">third-party</span></span></div>
<div><span class="stat-n">23,917</span><span class="stat-k">online in the official Discord</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">10.5%</span><span class="stat-k">of the all-time record, running now</span><span class="stat-src"><span class="src-chip src-calc">calculated</span></span></div>
</div>

<h2>Two counts, one game</h2>

<p>Steam counts a session on one platform. Hell Let Loose has two platforms and one count, and the count is the smaller half of the game.</p>

<ul>
<li><strong>BattleMetrics</strong>, the tracker that maps dedicated servers for games like this one, answered this machine with HTTP 403 on 3 October 2026.</li>
<li><strong>SteamDB</strong>'s Hell Let Loose charts returned HTTP 403, with and without a browser user-agent.</li>
<li><strong>hll.wiki.gg</strong>, the community wiki, returned HTTP 403 as well.</li>
<li><strong>The consoles are not in the number at all.</strong> Steam answers for the Steam build. There is no equivalent public endpoint for the PlayStation or Xbox populations, and no site read for this page publishes them.</li>
</ul>

<p>So the two missing counts on this page are different from the missing counts on the other pages in this set. One is the familiar one — how many of the people Steam sees are actually in a match. The other is a whole platform.</p>

<h2>The peak depends who you ask</h2>

<p>Two trackers publish an all-time peak for Hell Let Loose. They disagree by 21 players, and both put the record in the same month.</p>

<ul>
<li><strong>21,086</strong> — SteamCharts, from its all-time peak box, read 3 October 2026. Its monthly table puts the record in January 2025, with a monthly average of 9,192.83.</li>
<li><strong>21,107</strong> — steamplayercount.com, from its all-time peak box, read 3 October 2026.</li>
</ul>

<p>21 apart. Steam publishes no concurrency history of its own: <code>GetNumberOfCurrentPlayers</code> answers "how many right now" and stops. Every peak on the internet is the highest number one sampler happened to catch, and the sampling interval is the whole story. SteamCharts says so on its about page: "The collector queries the number of concurrent players on an hourly interval for every single game in the Steam catalog, and has been collecting data since July of 2012." (steamcharts.com/about, read 3 October 2026)</p>

<h2>January 2025, and what this page will not say about it</h2>

<p>SteamCharts' monthly table makes January 2025 the loudest month in the game's history: an average of 9,192.83, up 4,623.66 — 101.19% — on December 2024, with the all-time peak inside it. February 2025 is down 24.37% again (SteamCharts, read 3 October 2026).</p>

<p>This page does not say what caused it. The studio's own announcement archive for that month could not be read from this machine on 3 October 2026 — the Steam news feed for the app returns only the ten most recent posts, and the official blog's listing reaches back no further than May 2025 in what it served. No cause is printed here because no cause was sourced. The two numbers above are quoted, and the difference between them is left where it is.</p>

<h2>A hundred is the ceiling, and the studio prints it itself</h2>

<blockquote>"Join the ever expanding experience of Hell Let Loose - a hardcore World War Two first person shooter with epic battles of 100 players with infantry, tanks, artillery, a dynamically shifting front line and a unique resource based RTS-inspired meta-game." (<a href="https://store.steampowered.com/app/686810/Hell_Let_Loose/">Steam store page for Hell Let Loose</a>, read 3 October 2026)</blockquote>

<p>The official site puts the same number in its own page title: "Hell Let Loose | Epic 50v50 FPS on PC &amp; Console | Official Site" (<a href="https://www.hellletloose.com/">hellletloose.com</a>, read 3 October 2026). 50 against 50, 100 to a battle, and the platform list in the same line.</p>

<p>That gives this page something the other pages in the set do not have: a ceiling that is also a way to read the number. 21,086 — the all-time peak — is 210.9 full servers (21,086 ÷ 100, my division). Today's 2,207 is 22 of them.</p>

<h2>The number is a PC number</h2>

<p>The official site's own navigation points at its console store listings, and they are live: the Xbox listing for Hell Let Loose and the PlayStation listing both load, and the site carries a second Xbox listing for the follow-up game (read 3 October 2026). The game's own pages describe it as coming to "PC, PS5 and Xbox Series X|S" in the studio's announcement of Hell Let Loose: Vietnam, dated 14 May 2026 in the site's own post data.</p>

<p>Steam's endpoint has no console field. It cannot, by construction: it answers for app 686810, which is the Windows build. So every "Hell Let Loose player count" on the internet is a count of the PC half of a two-platform game, printed as if it were the whole thing.</p>

<h2>What a day looks like</h2>

<p>Valve's figure read 2,207 five times in a row across five minutes: 09:49:09, 09:50:14, 09:51:19, 09:52:24 and 09:53:29 UTC on 3 October 2026. Nothing in it moved while this page was being written.</p>

<p>Inside the same day the swing is much larger. The 24-hour peak is 3,960 (SteamCharts, read 3 October 2026), so the reading at the top of this page sits 44.3% under the day's high: (3,960 − 2,207) ÷ 3,960, my arithmetic.</p>

<p>This is the first page in this set where the live reading sits below the long-run average rather than above it. A 30-day average of 2,400.92, down 2.9 (−0.12%) on the window before it, with a 30-day peak of 5,562 and a September 2026 monthly average of 2,403.79, down 983.84 (−29.04%) on August (SteamCharts, its own sampling, read 3 October 2026). Against that average the reading above is 8.1% low: (2,207 − 2,400.92) ÷ 2,400.92.</p>

<h2>Checking it yourself</h2>

<ol>
<li>Live and official: <code>https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=686810</code>. One JSON field. No key. Read it twice, a minute apart, before you believe a change.</li>
<li>What it cannot answer: anything about PlayStation or Xbox. There is no public equivalent, so a "total" for this game is always a guess about the console half.</li>
<li>The count that matters and is missing: open the game and look at the server browser. That is the only place it exists. Screenshot it or you have no source.</li>
<li>A peak: pick one tracker and stay on it. SteamCharts and steamplayercount.com disagree by 21 on the record (both read 3 October 2026).</li>
<li>Anything that will not tell you which minute it read is not a source. On the morning this page was written the live boxes read 2,255 (SteamCharts, its own clock), 2,146 (steamplayercount.com, no clock) and 2,207 (Valve, 09:49 UTC). Three pages, three numbers, three minutes.</li>
</ol>

<h2>What the number hides</h2>

<p>Three things at once, which is more than either of the other pages in this set has to carry. It hides the people in matches, because no source read here publishes the split. It hides the console players entirely, because the endpoint is per-application and the application is the Windows build. And it hides the shape of the game's decline: the September 2026 average is down 29.04% on August, and the 30-day average is 2,400.92 against 2,207 today.</p>

<p>The other population number that is genuinely available is bigger, and it is also counting a different thing. The official Hell Let Loose Discord (vanity address <code>hellletloose</code>, guild 316459644476456962, described by Discord as the server for "a hardcore WW2 &amp; Vietnam first person shooter with epic battles") answered Discord's own invite endpoint on 3 October 2026 with 164,217 members and 23,917 online. That is 21,710 more people than Valve's concurrent figure for the same morning.</p>

<p>Inference, mine: on this game the quoted number is the least complete figure in the whole set — one platform out of two, one activity out of several, and a snapshot in a month that is down a quarter on the one before it.</p>

<h2>Every claim on this page, sorted</h2>

<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="layers-caption">
<table class="matrix">
<caption id="layers-caption">Every claim on this page, sorted. Read 3 October 2026.</caption>
<thead><tr><th scope="col">Layer</th><th scope="col">What is in it</th></tr></thead>
<tbody>
<tr><td>Confirmed officially</td><td class="wrap-cell">2,207 concurrent at 09:49 UTC (Steam Web API, app 686810). "Epic battles of 100 players", from the store page. "Epic 50v50 FPS on PC &amp; Console", from the official site's own title. The Xbox and PlayStation listings, linked from the official site. 164,217 members and 23,917 online (Discord's own invite endpoint). Update 21 live on 23 September 2026 and Hell Let Loose: Vietnam out on 13 August 2026, from the studio's own announcements.</td></tr>
<tr><td>Read off third parties</td><td class="wrap-cell">2,255 playing and a 3,960 24-hour peak, 21,086 all-time peak, 9,192.83 for January 2025 against 4,569.17 in December 2024, 2,400.92 30-day average, 5,562 30-day peak, 2,403.79 September 2026 average on −29.04% (SteamCharts). 2,146 in the live box and 21,107 as the all-time peak (steamplayercount.com).</td></tr>
<tr><td>Calculated here, not published anywhere</td><td class="wrap-cell">10.5% = 2,207 ÷ 21,086. 21 = 21,107 − 21,086. 44.3% = (3,960 − 2,207) ÷ 3,960. −8.1% = (2,207 − 2,400.92) ÷ 2,400.92. 210.9 = 21,086 ÷ 100. 21,710 = 23,917 − 2,207. 101.19% and −29.04% are SteamCharts' own month-on-month figures, quoted rather than redone.</td></tr>
<tr><td>Not confirmed</td><td class="wrap-cell">How many of the 2,207 are in a match. How many people are playing on PlayStation and Xbox, and whether that number is larger or smaller than the Steam one. What caused the January 2025 peak. Which minute steamplayercount.com's live box was reading. Any concurrency target the studio may have set.</td></tr>
</tbody>
</table>
</div>

<figure class="pagefig"><picture><source media="(prefers-color-scheme: light)" srcset="/assets/img/hell-let-loose-player-count-light.png"><img src="/assets/img/hell-let-loose-player-count.png" width="1200" height="630" alt="Card for the Hell Let Loose player count: 2,207 accounts on Steam, 21,086 at the all-time peak, 10.5% of the record"></picture><figcaption>Drawn for this page, dark or light to match. Figures as read on 3 October 2026.</figcaption></figure>

${adUnit}

<div class="readnext">
<p><a href="/foxhole-player-count">The same page for Foxhole: 1,774 on Steam against a 17,451 record &rarr;</a></p>
<p><a href="/squad-player-count">The same page for Squad: 10,302 on Steam against a 38,573 record &rarr;</a></p>
<p><a href="/wardogs-player-count">The same page for WARDOGS: 103,208 on Steam against 83,730 in a match &rarr;</a></p>
</div>`,
};
