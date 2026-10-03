// Sixth game on the site, second page of the second batch. Same page type as
// /arma-reforger-player-count and the four before it.
//
// This game's own difference, and the spine of this page: the number is old
// enough to be small, the record is the launch month, and one of the top results
// for the keyword is an unattributed copy of another site's data.
import { adUnit } from "../ad.mjs";

const SITE = "https://shooteratlas.com";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: "Rising Storm 2 player count", item: SITE + "/rising-storm-2-player-count" },
      ],
    },
    {
      "@type": "VideoGame",
      name: "RISING STORM 2: VIETNAM",
      url: SITE + "/rising-storm-2-player-count",
      applicationCategory: "Game",
      gamePlatform: "PC (Windows)",
      publisher: "Tripwire Interactive",
      datePublished: "2017-05-30",
      sameAs: ["https://store.steampowered.com/app/418460/Rising_Storm_2_Vietnam/"],
    },
  ],
};

export const page = {
  ogImage: "https://shooteratlas.com/assets/img/rising-storm-2-player-count.png",
  source: "src/pages/rising-storm-2-player-count.mjs",
  path: "/rising-storm-2-player-count",
  title: "RISING STORM 2 player count: 208 on Steam, 24,518 at the all-time peak",
  description:
    "208 accounts had Rising Storm 2: Vietnam open on Steam at 11:32 UTC on 3 October 2026 — Valve's own figure, from the Steam Web API for app 418460. The all-time peak is 24,518 or 24,492 depending which tracker you read, and both of them put it in the month the game launched.",
  extraHead:
    "<style>" +
    "blockquote{margin:0 0 1.2rem;padding:.7rem 1rem;border-left:3px solid var(--rule);color:var(--muted);font-style:italic;font-size:.98rem}" +
    "blockquote code,code{font-size:.92em}" +
    "</style>" +
    "<script type='application/ld+json'>" + JSON.stringify(schema) + "</script>",
  body: `<h1>RISING STORM 2 player count: 208 on Steam, 24,518 at the all-time peak</h1>

<p class="lede">208 accounts had Rising Storm 2: Vietnam open on Steam at 11:32 UTC on 3 October 2026. Valve's own number, straight out of the Steam Web API for app 418460, and the only live figure anybody publishes. Five reads across four minutes returned that same 208. The record is 24,518 — set in the month the game came out, nine years ago — and that makes today 0.8% of it.</p>

<p>Short version: the game is running at 0.8% of its own record. 208 ÷ 24,518. My arithmetic, on two published numbers. In a game where the studio prints a 64-player ceiling, those 208 people are about three full servers.</p>

<div class="strip">
<div><span class="stat-n">208</span><span class="stat-k">accounts with the game open, 11:32 UTC</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">24,518 / 24,492</span><span class="stat-k">all-time peak, depends who asked</span><span class="stat-src"><span class="src-chip src-third">third-party</span></span></div>
<div><span class="stat-n">357</span><span class="stat-k">24-hour peak</span><span class="stat-src"><span class="src-chip src-third">third-party</span></span></div>
<div><span class="stat-n">1,770</span><span class="stat-k">online in the official Discord</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">0.8%</span><span class="stat-k">of the all-time record, running now</span><span class="stat-src"><span class="src-chip src-calc">calculated</span></span></div>
</div>

<h2>Two counts, one game</h2>

<p>Steam counts a session. The other number this page would want is how many of those people are on a server, and for this game that number exists only in the in-game browser — the third-party trackers that map servers are shut to us.</p>

<ul>
<li><strong>BattleMetrics</strong>, the tracker that lists servers and their populations, is closed to this machine twice over: its API answered <code>{"status":"403","detail":"Access denied. A subscription is required to use the API."}</code>, and its server page for this game served a Cloudflare block instead of a page, in a normal browser window, on 3 October 2026.</li>
<li><strong>SteamDB</strong> answered HTTP 403 as well, with and without a browser user-agent.</li>
<li><strong>app.sensortower.com</strong> appears in the results for this keyword; the path this machine tried returned a 404, so the page behind that result was not read.</li>
<li><strong>104.131.2.73</strong> — the bare address in that same result list — turns out not to be a new source at all. It serves a copy of SteamCharts: same headline, same figures, the same "STEAMCHARTS — An ongoing analysis of Steam's concurrent players" banner, on a raw IP with no site name on it. Its page for this game printed 191 playing, a 24-hour peak of 357 and a 24,518 all-time peak — the same numbers as SteamCharts, read 3 October 2026.</li>
</ul>

<p>So the copy of SteamCharts is a second place to read the same four figures, and the one number that would be different — who is on a server — is the one nobody can reach.</p>

<h2>The peak depends who you ask</h2>

<p>Two trackers publish an all-time peak for Rising Storm 2: Vietnam. They disagree by 26 players, and both put it in May 2017.</p>

<ul>
<li><strong>24,518</strong> — SteamCharts, from its all-time peak box, read 3 October 2026. Its monthly table starts at June 2017, so the row carrying the record is not in it; the highest month the table does show is June 2017 at 13,870.</li>
<li><strong>24,492</strong> — steamplayercount.com, from its all-time peak box and from the May 2017 row of its own monthly table, read 3 October 2026. That row reads 24,492 with a gain of 24,130 over April, which its table puts at 362.</li>
</ul>

<p>Steam publishes no concurrency history of its own: <code>GetNumberOfCurrentPlayers</code> answers "how many right now" and stops. Every peak on the internet is the highest number one sampler happened to catch. SteamCharts says so on its about page: "The collector queries the number of concurrent players on an hourly interval for every single game in the Steam catalog, and has been collecting data since July of 2012." (steamcharts.com/about, read 3 October 2026)</p>

<h2>May 2017 is the month it came out</h2>

<p>Not every record month is a mystery. The store page gives the release date as 30 May 2017 (appdetails for app 418460, read 3 October 2026), and the tracker that keeps a May 2017 row puts that month at 24,492, against 362 in April — the month before the game existed for sale (steamplayercount.com, read 3 October 2026).</p>

<p>An April figure for a game released on 30 May is a wishlists-and-playtest artefact, not a population; the page prints both numbers and lets them sit next to each other. What the launch peak was made of — purchases, a free weekend, or both — is not something this page read a source for.</p>

<h2>The studio does print a ceiling, and it is 64</h2>

<blockquote>"Red Orchestra Series' take on Vietnam: 64-player MP matches; 20+ maps; US Army &amp; Marines, PAVN/NVA, NLF/VC; Australians and ARVN forces; 50+ weapons; 4 flyable helicopters; mines, traps and tunnels; Brutal. Authentic. Gritty. Character customization. And napalm in the morning." (<a href="https://store.steampowered.com/app/418460/Rising_Storm_2_Vietnam/">Steam store page for Rising Storm 2: Vietnam</a>, read 3 October 2026)</blockquote>

<p>The game's own site says the same thing in its own words: "EPIC 64 PLAYER BATTLES — Rising Storm 2: Vietnam offers thrilling combat experiences for up to 64 players in online battles…" (<a href="https://rs2vietnam.com/">rs2vietnam.com</a>, read 3 October 2026).</p>

<p>That ceiling is what makes this page's number readable. 24,518 ÷ 64 = 383.1 full servers at the record; 208 ÷ 64 = 3.3 full servers now. My arithmetic. A tracker shows you a number; the game's own ceiling is what turns it into a room.</p>

<h2>What kind of number is this</h2>

<p>It is one storefront's number and one operating system's number. Valve's record for this app lists Windows only — <code>mac: false</code>, <code>linux: false</code> — and the official site's only buy link goes to Steam (appdetails and rs2vietnam.com, both read 3 October 2026). No console release appears anywhere in the material read for this page.</p>

<p>That is the opposite of the Arma Reforger page in this set, where the figure was the PC half of a three-platform game. Here the figure is the whole market the game was sold into, and it is still only one marketplace. Whether a player bought it elsewhere and runs it through another client is not something any source read here can say.</p>

<h2>What a day looks like</h2>

<p>Valve's figure read 208 five times in a row, at 11:28:00, 11:29:05, 11:30:11, 11:31:16 and 11:32:21 UTC on 3 October 2026. Nothing in it moved while this page was being written.</p>

<p>Inside the same day the swing is proportionally much larger than the number. The 24-hour peak is 357 (SteamCharts, read 3 October 2026), so the reading at the top of this page sits 41.7% under the day's high: (357 − 208) ÷ 357, my arithmetic.</p>

<p>And the long view puts this morning below the recent average rather than above it. A 30-day average of 250.29, down 3.8 (−1.50%) on the window before it, with a 30-day peak of 501 and a September 2026 monthly average of 254.10, down 40.64 (−13.79%) on August (SteamCharts, its own sampling, read 3 October 2026). Against that average the reading above is 16.9% low: (208 − 250.29) ÷ 250.29.</p>

<h2>Checking it yourself</h2>

<ol>
<li>Live and official: <code>https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=418460</code>. One JSON field. No key. Read it twice, a minute apart, before you believe a change.</li>
<li>Check the site you are reading it from. On this keyword, the fifth result was an unnamed copy of SteamCharts running on a bare IP address, printing another site's figures under another site's banner. If a page will not name itself, treat its numbers as borrowed.</li>
<li>The count that matters and is missing: open the game's server browser. That is the only place a per-server population exists, and for this game the trackers that aggregate it are closed.</li>
<li>A peak: pick one tracker and stay on it. SteamCharts and steamplayercount.com disagree by 26 on the record, and one of them keeps a row for the record month while the other does not (both read 3 October 2026).</li>
<li>Anything that will not tell you which minute it read is not a source. On the morning this page was written the live boxes read 191 (SteamCharts, its own clock), 266 (steamplayercount.com, no clock) and 208 (Valve, 11:32 UTC). Three pages, three numbers, three minutes.</li>
</ol>

<h2>What the number hides</h2>

<p>It hides the people on servers, as every page in this set does. It also hides a fact about age: this game is still being worked on — the studio shipped quality-of-life update 1.7.0 on 14 July 2026 and was on hotfix 1.7.4 by 27 August 2026 (the studio's own news feed for the app, read 3 October 2026) — while the population sits at 0.8% of what it was in launch month. Support and population are two different lines, and this page prints both.</p>

<p>The other population number that is available is bigger, and it is the smallest such gap in this set. The official Rising Storm 2: Vietnam Discord (vanity address <code>rs2vietnam</code>, guild 219923731471007744) answered Discord's own invite endpoint on 3 October 2026 with 9,575 members and 1,770 online — 1,562 more people than Valve's concurrent figure for the same morning.</p>

<p>Inference, mine: on a nine-year-old game the concurrent count measures who is playing right now, and the Discord figure measures who still cares. They are not the same audience, and neither one is the number a person searching this keyword is usually looking for.</p>

<h2>Every claim on this page, sorted</h2>

<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="layers-caption">
<table class="matrix">
<caption id="layers-caption">Every claim on this page, sorted. Read 3 October 2026.</caption>
<thead><tr><th scope="col">Layer</th><th scope="col">What is in it</th></tr></thead>
<tbody>
<tr><td>Confirmed officially</td><td class="wrap-cell">208 concurrent at 11:32 UTC, and five identical reads from 11:28:00 (Steam Web API, app 418460). "64-player MP matches", from the store description, and "EPIC 64 PLAYER BATTLES … up to 64 players", from the game's own site. Release date 30 May 2017, Windows only in Valve's platform record, and a Steam-only buy link on the official site. Quality Of Life Update 1.7.0 on 14 July 2026 and Hotfix 1.7.4 on 27 August 2026, from the studio's own news feed. 9,575 members and 1,770 online (Discord's own invite endpoint).</td></tr>
<tr><td>Read off third parties</td><td class="wrap-cell">191 playing and a 357 24-hour peak, 24,518 all-time peak, 250.29 30-day average, 501 30-day peak, 254.10 September 2026 average on −13.79%, and a monthly table starting at June 2017 whose best row is 13,870 (SteamCharts). 266 in the live box, 24,492 as the all-time peak and the same 24,492 in its May 2017 row against 362 in April (steamplayercount.com). The same four headline figures again, from the SteamCharts copy served at 104.131.2.73.</td></tr>
<tr><td>Calculated here, not published anywhere</td><td class="wrap-cell">0.8% = 208 ÷ 24,518. 26 = 24,518 − 24,492. 41.7% = (357 − 208) ÷ 357. −16.9% = (208 − 250.29) ÷ 250.29. 1,562 = 1,770 − 208. 383.1 = 24,518 ÷ 64. 3.3 = 208 ÷ 64. Also the reading that 104.131.2.73 is a copy of SteamCharts rather than an independent source.</td></tr>
<tr><td>Not confirmed</td><td class="wrap-cell">How many of the 208 are on a server. How many servers are running right now, since the tracker that lists them is closed to this machine. What the launch peak was made of. Whether any of these players bought the game somewhere other than Steam. Which minute steamplayercount.com's live box was reading. How long the game will keep receiving hotfixes.</td></tr>
</tbody>
</table>
</div>

<figure class="pagefig"><picture><source media="(prefers-color-scheme: light)" srcset="/assets/img/rising-storm-2-player-count-light.png"><img src="/assets/img/rising-storm-2-player-count.png" width="1200" height="630" alt="Card for the Rising Storm 2 player count: 208 accounts on Steam, 24,518 at the all-time peak, 0.8% of the record"></picture><figcaption>Drawn for this page, dark or light to match. Figures as read on 3 October 2026.</figcaption></figure>

${adUnit}

<div class="readnext">
<p><a href="/arma-reforger-player-count">The same page for Arma Reforger: 8,681 on Steam, and the studio never printed a match size &rarr;</a></p>
<p><a href="/squad-player-count">The same page for Squad: 10,302 on Steam against a 38,573 record &rarr;</a></p>
<p><a href="/hell-let-loose-player-count">The same page for Hell Let Loose: 2,207 on Steam, and a console half nobody counts &rarr;</a></p>
</div>`,
};
