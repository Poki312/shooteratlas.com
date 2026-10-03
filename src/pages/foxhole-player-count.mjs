// Third game on the site, second page of the player-count set. Same page type
// as /wardogs-player-count and /squad-player-count: the answer in the first
// screen, a source and a read date on every number, and the four-layer table at
// the end.
//
// Foxhole's own difference, and the spine of this page: the studio publishes
// the war in more detail than any player-count page publishes anything, and
// still does not publish how many people are in it.
import { adUnit } from "../ad.mjs";

const SITE = "https://shooteratlas.com";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: "Foxhole player count", item: SITE + "/foxhole-player-count" },
      ],
    },
    {
      "@type": "VideoGame",
      name: "FOXHOLE",
      url: SITE + "/foxhole-player-count",
      applicationCategory: "Game",
      gamePlatform: "PC (Windows)",
      publisher: "Siege Camp",
      datePublished: "2022-09-28",
      sameAs: ["https://store.steampowered.com/app/505460/Foxhole/"],
    },
  ],
};

export const page = {
  ogImage: "https://shooteratlas.com/assets/img/foxhole-player-count.png",
  source: "src/pages/foxhole-player-count.mjs",
  path: "/foxhole-player-count",
  title: "FOXHOLE player count: 1,774 on Steam, 17,451 at the all-time peak",
  description:
    "1,774 accounts had Foxhole open on Steam at 09:33 UTC on 3 October 2026 — Valve's own figure, from the Steam Web API for app 505460. The all-time peak is 17,451 or 17,238 depending which tracker you read, the war itself is published map by map, and nobody publishes how many of those players are on a front line.",
  extraHead:
    "<style>" +
    "blockquote{margin:0 0 1.2rem;padding:.7rem 1rem;border-left:3px solid var(--rule);color:var(--muted);font-style:italic;font-size:.98rem}" +
    "blockquote code,code{font-size:.92em}" +
    "</style>" +
    "<script type='application/ld+json'>" + JSON.stringify(schema) + "</script>",
  body: `<h1>FOXHOLE player count: 1,774 on Steam, 17,451 at the all-time peak</h1>

<p class="lede">1,774 accounts had Foxhole open on Steam at 09:33 UTC on 3 October 2026. Valve's own number, straight out of the Steam Web API for app 505460, and the only live count for this game that anybody publishes. What Foxhole prints instead is the war: which map belongs to whom, how many soldiers have enlisted, how many have died. None of it says how many of the 1,774 are on a front line.</p>

<p>Short version: the game is running at 10.2% of its own record. 1,774 ÷ 17,451. My arithmetic, on two published numbers. The record itself is either 17,451 or 17,238, depending which tracker you open — a difference of 213, which is smaller than the swing inside a single day of this game.</p>

<div class="strip">
<div><span class="stat-n">1,774</span><span class="stat-k">accounts with the game open, 09:33 UTC</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">17,451 / 17,238</span><span class="stat-k">all-time peak, depends who asked</span><span class="stat-src"><span class="src-chip src-third">third-party</span></span></div>
<div><span class="stat-n">3,010</span><span class="stat-k">24-hour peak</span><span class="stat-src"><span class="src-chip src-third">third-party</span></span></div>
<div><span class="stat-n">50,210</span><span class="stat-k">online in the official Discord</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">10.2%</span><span class="stat-k">of the all-time record, running now</span><span class="stat-src"><span class="src-chip src-calc">calculated</span></span></div>
</div>

<h2>Two counts, one game</h2>

<p>Steam counts a session. Foxhole counts a soldier who is somewhere on a map, in a war that has been running for weeks. Those have never been the same number, and for this game the second one is not published by anybody we could reach on 3 October 2026.</p>

<ul>
<li><strong>foxholestats.com</strong>, the tracker this game's community actually uses, does not count independently. Its front page prints a figure labelled "Steam Players", and the number it printed when a browser loaded it on 3 October 2026 was 1,718 — the same figure Valve's interface had returned minutes earlier. It is a republisher for the population number, and something else entirely for the war.</li>
<li><strong>The game's own war API</strong> carries no usable player field. <code>https://war-service-live.foxholeservices.com/api/worldconquest/maps/DeadLandsHex/dynamic</code> answered this machine with HTTP 403 on 3 October 2026 — that half of the API is not public. The public half answers with the war, not with people (see below).</li>
<li><strong>BattleMetrics</strong>, which tracks dedicated servers, answered with HTTP 403 on the same day.</li>
<li><strong>SteamDB</strong>'s Foxhole charts returned HTTP 403 as well, with and without a browser user-agent.</li>
</ul>

<p>So the count of people in the war exists on somebody's screen and nowhere else. This page prints Valve's number and says so.</p>

<h2>The peak depends who you ask</h2>

<p>Two trackers publish an all-time peak for Foxhole. They disagree, and both put it in the same month.</p>

<ul>
<li><strong>17,451</strong> — SteamCharts, from its all-time peak box, read 3 October 2026. Its monthly table puts the record in February 2026.</li>
<li><strong>17,238</strong> — steamplayercount.com, from its all-time peak box and its February 2026 row, read 3 October 2026.</li>
</ul>

<p>213 apart. Steam publishes no concurrency history of its own: <code>GetNumberOfCurrentPlayers</code> answers "how many right now" and stops. Every peak on the internet is the highest number one sampler happened to catch, and the sampling interval is the whole story. SteamCharts says so on its about page: "The collector queries the number of concurrent players on an hourly interval for every single game in the Steam catalog, and has been collecting data since July of 2012." (steamcharts.com/about, read 3 October 2026)</p>

<p>One hourly sample can miss the best ten minutes of a night. Nobody is lying; they looked at different minutes.</p>

<h2>February 2026, and the announcement that came with it</h2>

<p>Both trackers put the record in February 2026, and the studio's own news feed says what else happened that month: "Foxhole Airborne is LIVE", posted on 9 February 2026, after a 16 January 2026 post announcing it for that date. SteamCharts' February 2026 average is 5,672.45 against January's 2,557.39 — up 121.81% — and the month's peak is the all-time peak (SteamCharts, read 3 October 2026).</p>

<p>Inference, mine, and not something the studio claims: the release is the obvious candidate for the record, because the two dates line up and the January-to-February jump is the largest in the table. The page does not assert a cause; it prints a release date and a monthly average next to each other.</p>

<h2>There is no match size to quote</h2>

<p>The other pages in this set can end their first screen with a hard ceiling, because a match has one. Foxhole does not have matches. Its own description of scale is a description of the war:</p>

<blockquote>"Foxhole is a massively multiplayer game where you will work with hundreds of players to shape the outcome of a persistent online war." (<a href="https://www.foxholegame.com/about-foxhole">foxholegame.com, About Foxhole</a>, read 3 October 2026)</blockquote>

<blockquote>"Thousands of players connect to the same world and fight in a persistent war that lasts for weeks." (same page)</blockquote>

<p>The store page says the same thing in one line: "thousands of players shape the outcome of a persistent online war" (<a href="https://store.steampowered.com/app/505460/Foxhole/">Steam store page for Foxhole</a>, read 3 October 2026). Hundreds, thousands — neither is a number a player count can be checked against, which is the point. On this game the scale claim and the population claim are the same sentence, and the sentence has no figure in it.</p>

<h2>What the game publishes instead of a player count</h2>

<p>The public half of the war API is generous with the war itself. Read from this machine on 3 October 2026:</p>

<ul>
<li><code>/api/worldconquest/war</code> returned war number <strong>141</strong>, with <strong>34</strong> towns required to win it.</li>
<li><code>/api/worldconquest/maps</code> returned <strong>53</strong> hexes, from TheFingersHex to DrownedValeHex.</li>
<li><code>/api/worldconquest/warReport/DeadLandsHex</code> returned day <strong>41</strong> of the war, <strong>3,047</strong> enlistments, <strong>12,894</strong> Warden casualties and <strong>12,788</strong> Colonial casualties — on one map.</li>
</ul>

<p>That is more detail about a single afternoon of a war than most games publish about their whole playerbase. It is also the reason a player-count page for Foxhole has to be careful: the community's numbers are real, current and precise, and almost none of them are people. Enlistments are soldiers created, casualties are soldiers lost, neither is a session.</p>

<p>One more read, from the third-party side: the copy of the map data that foxholestats.com served on 3 October 2026 gave every one of those 53 maps a field named <code>totalPlayers</code>, and every one of them was <strong>0</strong>. Whatever that field is filled from, it is not the live population.</p>

<h2>What a day looks like</h2>

<p>Valve's figure sat still through four reads — 1,718 at 09:28:39, 09:29:45, 09:30:50 and 09:31:55 UTC on 3 October 2026 — and then moved 56 accounts in the fifth, to 1,774 at 09:33:00. It refreshes in steps, not in a glide, so an argument about a few dozen players is usually an argument about two different minutes.</p>

<p>Inside the same day the swing is much larger than the disagreement between the two trackers. The 24-hour peak is 3,010 (SteamCharts, read 3 October 2026), so the reading at the top of this page sits 41.1% under the day's high: (3,010 − 1,774) ÷ 3,010, my arithmetic.</p>

<p>For the longer view, a 30-day average of 1,594.79, down 17.7 (−1.10%) on the window before it, with a 30-day peak of 4,449 and a September 2026 monthly average of 1,612.50, down 68.20 (−4.06%) on August (SteamCharts, its own sampling, read 3 October 2026). Set against that average the reading above is 11.2% high: (1,774 − 1,594.79) ÷ 1,594.79. A day is not a trend, and this is one day.</p>

<h2>Checking it yourself</h2>

<ol>
<li>Live and official: <code>https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=505460</code>. One JSON field. No key. Read it twice, a minute apart, before you believe a change.</li>
<li>The count that matters and is missing: log into the war and look at the map your side is holding, or the population your shard reports in game. That is the only place it exists. Screenshot it or you have no source.</li>
<li>The war, if you want the war: <code>https://war-service-live.foxholeservices.com/api/worldconquest/war</code> answers without a key and gives the war number. The per-map dynamic endpoint needs a token and returns 403 without one.</li>
<li>A peak: pick one tracker and stay on it. SteamCharts and steamplayercount.com disagree by 213 on the record (both read 3 October 2026).</li>
<li>Anything that will not tell you which minute it read is not a source. On the morning this page was written the live boxes read 1,594 (SteamCharts, its own clock), 1,309 (steamplayercount.com, no clock) and 1,718 (Valve, 09:28 UTC). Three pages, three numbers, three minutes.</li>
</ol>

<h2>What the number hides</h2>

<p>Foxhole is not one world. The community tracker serves a page per shard, and on 3 October 2026 those pages did not show the same game: the first carried world conquest 141 with a war clock running, the second returned zeroes for every map's casualties and enlistments, and the third carried world conquest 22, finished, with a winner and a resistance-mode countdown. Steam's 1,718 counts all of it at once, and nothing in the figure says which shard those accounts are on. Inference, mine: a single number across three shards cannot tell you how full any one war is.</p>

<p>The other population number that is genuinely available is much bigger. The official Foxhole Discord (vanity address <code>foxhole</code>, guild 203512636556574720, described by Discord as "the persistent war sandbox MMO") answered Discord's own invite endpoint on 3 October 2026 with 264,410 members and 50,210 online. That is 48,436 more people than Valve's concurrent figure for the same morning — and it answers a different question, because being online in a chat server is not playing the game.</p>

<p>Inference, mine: for this game the population figure is the least informative number on the page. The war reports know how many soldiers died on Deadlands this week; nobody outside the server knows how many are standing there now.</p>

<h2>Every claim on this page, sorted</h2>

<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="layers-caption">
<table class="matrix">
<caption id="layers-caption">Every claim on this page, sorted. Read 3 October 2026.</caption>
<thead><tr><th scope="col">Layer</th><th scope="col">What is in it</th></tr></thead>
<tbody>
<tr><td>Confirmed officially</td><td class="wrap-cell">1,774 concurrent at 09:33 UTC (Steam Web API, app 505460). "Hundreds of players" and "thousands of players connect to the same world", from the studio's About Foxhole page. War number 141 with 34 towns to win, 53 hexes, and the Deadlands report (day 41, 3,047 enlistments, 12,894 Warden and 12,788 Colonial casualties) from the game's own war API. 264,410 members and 50,210 online (Discord's own invite endpoint). Update 67 on 1 October 2026 and Foxhole Airborne live on 9 February 2026, from the studio's posts.</td></tr>
<tr><td>Read off third parties</td><td class="wrap-cell">1,594 playing and a 3,010 24-hour peak, 17,451 all-time peak, 1,594.79 30-day average, 4,449 30-day peak, 5,672.45 February 2026 average against 2,557.39 in January, 1,612.50 September 2026 average on −4.06% (SteamCharts). 1,309 in the live box and 17,238 as the all-time peak (steamplayercount.com). 1,718 labelled "Steam Players" plus the per-shard pages and the all-zero totalPlayers field (foxholestats.com).</td></tr>
<tr><td>Calculated here, not published anywhere</td><td class="wrap-cell">10.2% = 1,774 ÷ 17,451. 213 = 17,451 − 17,238. 41.1% = (3,010 − 1,774) ÷ 3,010. 11.2% = (1,774 − 1,594.79) ÷ 1,594.79. 48,436 = 50,210 − 1,774. 56 = 1,774 − 1,718. 121.81% is SteamCharts' own January-to-February figure, quoted rather than redone. Also the reading that a sampling interval, not a disagreement, separates the two all-time peaks.</td></tr>
<tr><td>Not confirmed</td><td class="wrap-cell">How many of the 1,774 are in a war rather than in a menu. How full any one shard is, and how many of the three are live at once. What fills the totalPlayers field, and why it reads zero. Whether the February 2026 record was caused by the Airborne release or coincided with it. Which minute steamplayercount.com's live box was reading. Any concurrency target the studio may have set.</td></tr>
</tbody>
</table>
</div>

<figure class="pagefig"><picture><source media="(prefers-color-scheme: light)" srcset="/assets/img/foxhole-player-count-light.png"><img src="/assets/img/foxhole-player-count.png" width="1200" height="630" alt="Card for the Foxhole player count: 1,774 accounts on Steam, 17,451 at the all-time peak, 10.2% of the record"></picture><figcaption>Drawn for this page, dark or light to match. Figures as read on 3 October 2026.</figcaption></figure>

${adUnit}

<div class="readnext">
<p><a href="/squad-player-count">The same page for Squad: 10,302 on Steam against a 38,573 record &rarr;</a></p>
<p><a href="/wardogs-player-count">The same page for WARDOGS: 103,208 on Steam against 83,730 in a match &rarr;</a></p>
<p><a href="/wardogs">Scoring, prices and platform support for WARDOGS &rarr;</a></p>
</div>`,
};
