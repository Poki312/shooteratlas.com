// Body is the DeAI-passed draft published verbatim, plus one addition made on
// 2026-10-03: the "Quick answers" block after the first screen. Every figure in
// it is already read on this page, with the same source and read date. There is
// still no foot-of-page FAQ, because the draft has none.
const SITE = "https://shooteratlas.com";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: "Wardogs", item: SITE + "/wardogs" },
        { "@type": "ListItem", position: 3, name: "Player count", item: SITE + "/wardogs-player-count" },
      ],
    },
    {
      "@type": "VideoGame",
      name: "WARDOGS",
      url: SITE + "/wardogs-player-count",
      applicationCategory: "Game",
      gamePlatform: "PC (Windows)",
      publisher: "Team17",
      datePublished: "2026-09-10",
      sameAs: ["https://store.steampowered.com/app/1867240/WARDOGS/"],
    },
  ],
};

import { adUnit } from "../ad.mjs";
import { faqList } from "../faq.mjs";
import { live } from "../data/live.mjs";

const V = live.wardogsPlayerCount;

// Questions the player-count keyword keeps turning up, from the owner's question
// library (wardogs family, 2026-10-03). Answers are one to three sentences and
// use only readings already on this page. No community figure is used as a
// source anywhere below.
const quickAnswers = [
  {
    q: "Is WARDOGS worth it?",
    a: `Not a question these numbers settle, and this page does not pretend otherwise: there is no price, review or tag reading on it. What it has is the population — ${V.countText} accounts with the game open at ${V.timeFull}, and ${V.matchCountText} of those inside a match a minute earlier (<a href='https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=1867240'>Valve's API for app 1867240</a>, wardogservers.com; both read 1 October 2026).`,
  },
  {
    q: "Will the player count hold?",
    a: `${V.countText} accounts had WARDOGS open on Steam at ${V.timeFull} (<a href='https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=1867240'>Valve's API for app 1867240</a>, read 1 October 2026). What \"holding\" would even mean is not published anywhere: a concurrency target sits under \"Not confirmed\" further down this page.`,
  },
  {
    q: "Where is the player base?",
    a: `At ${V.matchTimeFull} it sat on ${V.serversText} servers — ${V.officialServersText} run by the studio, averaging ${V.officialAvg} players each, and ${V.communityServersText} rented from approved hosts, averaging ${V.communityAvg} (wardogservers.com, read 1 October 2026). The busiest single reading on record is ${V.peakAtext} accounts on Steam at 19:44 UTC on 13 September 2026 (wardogshub.gg, read 1 October 2026).`,
  },
];

const quickHtml = faqList(quickAnswers);

export const page = {
  ogImage: "https://shooteratlas.com/assets/img/wardogs-player-count.png",
  source: "src/pages/wardogs-player-count.mjs",
  path: "/wardogs-player-count",
  title: `WARDOGS player count: ${V.countText} on Steam, ${V.matchCountText} actually in a match`,
  description:
    `${V.countText} accounts had WARDOGS open on Steam at ${V.timeFull}. A minute earlier the in-game server browser put ${V.matchCountText} people inside actual matches. The ${V.gapText} gap, the three competing peak figures, and how to check the number yourself.`,
  extraHead:
    "<style>" +
    "blockquote{margin:0 0 1.2rem;padding:.7rem 1rem;border-left:3px solid var(--rule);color:var(--muted);font-style:italic;font-size:.98rem}" +
    "blockquote code,code{font-size:.92em}" +
    "</style>" +
    "<script type='application/ld+json'>" + JSON.stringify(schema) + "</script>",
  body: `<h1>WARDOGS player count: ${V.countText} on Steam, ${V.matchCountText} actually in a match</h1>

<p class="lede">${V.countText} accounts had WARDOGS open on Steam at ${V.timeFull}. Valve's own number, straight from the Steam Web API for app 1867240. A minute earlier, a tally of the in-game server browser put ${V.matchCountText} people inside actual matches. Both are true, and almost every player-count page you find quotes one of them without telling you which.</p>

<div class="strip">
<div><span class="stat-n">${V.countText}</span><span class="stat-k">accounts with the game open, ${V.timeShort}</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">${V.matchCountText}</span><span class="stat-k">players inside matches, ${V.matchTimeShort}</span><span class="stat-src"><span class="src-chip src-ingame">in-game</span></span></div>
<div><span class="stat-n">${V.timeShort}</span><span class="stat-k">the minute this was read</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">${V.peakAtext} / ${V.peakCtext}</span><span class="stat-k">highest peak, depends who asked</span><span class="stat-src"><span class="src-chip src-third">third-party</span></span></div>
<div><span class="stat-n">${V.avg30Text}</span><span class="stat-k">30-day average, down ${V.avg30DeltaPct}</span><span class="stat-src"><span class="src-chip src-third">third-party</span></span></div>
</div>

<h2>Quick answers</h2>

${quickHtml}

<h2>Two counts, one game</h2>

<p>The gap is not noise. Steam counts an open session. The server browser counts bodies on a map. Menu, trader, spawn screen, login queue, tabbed out. All of them land in the first number. None of them land in the second.</p>

<p>Which one did the page you just read quote?</p>

<p>Does sitting in a queue count as playing? By Valve's arithmetic, yes.</p>

<p>No source publishes how those ${V.gapText} split between queue, menu and idle. Inference, mine: the queue carries most of it, because the studio has said in writing that a queue exists. Quote below.</p>

<h2>Three peaks, three clocks</h2>

<p>Search this keyword and you will meet ${V.peakAtext}, ${V.peakBtext} and ${V.peakCtext}, all labelled all-time peak. Steam has no history endpoint. It answers "how many right now" and stops there. So every peak on the internet means one thing only: the highest number that particular site happened to catch.</p>

<ul>
<li><strong>${V.peakAtext}</strong>, at 19:44 UTC on 13 September. Read on every page load (wardogshub.gg).</li>
<li><strong>${V.peakBtext}</strong>, 13 September. Sampled every 10 minutes (wardogshub.uk).</li>
<li><strong>${V.peakCtext}</strong>. Sampled hourly. SteamCharts says so on its own about page: "The collector queries the number of concurrent players on an hourly interval for every single game in the Steam catalog."</li>
</ul>

<p>An eleven-minute spike slips clean between two ten-minute samples. Who is wrong? Nobody. They looked at different minutes.</p>

<h2>The busiest minute on record, counted twice</h2>

<p>13 September. Steam-side peak at 19:44 UTC (${V.peakAtext}). In-match peak at 19:46 UTC (${V.matchPeakText}). Two minutes apart. Same rush.</p>

<p>${V.busiestGapText} people were logged in and not on a map at the busiest moment of the game's life so far. ${V.busiestGapPct} of the Steam figure: (${V.peakAtext} − ${V.matchPeakText}) ÷ ${V.peakAtext}. My division of two public readings.</p>

<h2>100 is the ceiling. The team size is not published anywhere.</h2>

<blockquote>"WARDOGS is a Tactical All Out Warfare FPS, where 100 players, split across 3 teams, fight over one 'Control Zone'. Set in the derelict industrial mountains of Eastern Europe, on a large-scale, destructible battlefield. Teamwork pays, and cash is king." (<a href="https://store.steampowered.com/news/app/1867240">Steam news post, "WARDOGS – TOP QUESTIONS"</a>, 18 February 2026)</blockquote>

<p>The store page says up to 100. Neither one says how large a team gets. I read the full text of all 61 posts on the official Steam news feed. Not one gives a per-team figure.</p>

<p>Live data shows how far from full the average game actually runs. Of ${V.serversText} servers up at ${V.matchTimeShort}, ${V.officialServersText} were run by the studio and ${V.communityServersText} rented from approved hosts. Split them and the picture changes completely. Official servers averaged ${V.officialAvg} players each (${V.officialPlayersText} ÷ ${V.officialServersText}). Community servers averaged ${V.communityAvg} (${V.communityPlayersText} ÷ ${V.communityServersText}). Take them together and you get ${V.combinedAvg}, which reads like proof against a 100-player game until you remember most community servers are empty.</p>

<h2>Why the two counts refuse to meet, in the studio's own words</h2>

<blockquote>"Once the update has been installed and you relaunch the game, all players will return to the login queue... We will then begin allowing players into the game in controlled batches." (<a href="https://store.steampowered.com/news/app/1867240">Steam news post, "Launch Stability Hotfix #1"</a>, 10 September 2026)</blockquote>

<p>A queue is a logged-in state. It is not a match.</p>

<blockquote>"A game with this many players realistically should be using matchmaking, and server browsers aren't massively fit for purpose, but we don't want Community admins and hosts to suffer. They're the lifeblood of the community who keep a game running well beyond its peak player days." (<a href="https://store.steampowered.com/news/app/1867240">Steam news post, "SCHEDULED MAINTENANCE &amp; PATCH 0.11"</a>, 12 September 2026)</blockquote>

<p>The same patch split the front end into two browsers, Community and Official.</p>

<p>No matchmaking to fill a server. A queue in front of the door. ${V.officialServersText} official servers listed next to ${V.communityServersText} community ones. That is the structure. Inference, mine, from those three official statements: it is why the two numbers can sit 19,000 apart in the same minute. Nobody publishes the breakdown.</p>

<h2>What a day looks like</h2>

<h2>Checking it yourself</h2>

<ol>
<li>Live and official: <code>https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=1867240</code>. One JSON field. No key.</li>
<li>Live and in-match: any site that sums the in-game server browser. Expect 15 to 20% below step 1.</li>
<li>History: no official source exists. Pick one tracker, stay on it, and check its sampling interval before you quote its peak.</li>
<li>Per-server reality: divide players by servers online, official and community separately, before you believe the quotient.</li>
</ol>

<h2>What the number hides</h2>

<p>Three teams share every server. Red, blue and green. The joke about blue always losing is real enough that people queue for blue on purpose to farm it. Nobody is matched by skill. Nobody gets auto-filled. You pick a server and stay on it, so a thin server stays thin until bodies drift in.</p>

<p>That is the mechanical reason the two numbers never quite agree. Print both, or you are not telling the truth about either.</p>

<h2>Every claim on this page, sorted</h2>

<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="layers-caption">
<table class="matrix">
<caption id="layers-caption">Every claim on this page, sorted. Read 1 October 2026.</caption>
<thead><tr><th scope="col">Layer</th><th scope="col">What is in it</th></tr></thead>
<tbody>
<tr><td>Confirmed officially</td><td class="wrap-cell">${V.countText} concurrent at ${V.timeShort} (Steam Web API, app 1867240). 100 players across 3 teams, in the studio's own news post of 18 February 2026. The login queue and controlled batches, from the 10 September hotfix. No matchmaking, and the split into Community and Official browsers, from patch 0.11 on 12 September.</td></tr>
<tr><td>Read off third parties</td><td class="wrap-cell">${V.steamChartsLiveText} / ${V.peak24hText} / ${V.peakCtext} / ${V.avg30Text} / ${V.sepAvgText} (SteamCharts). ${V.hubLiveText} and ${V.peakAtext} (wardogshub.gg). ${V.peakBtext} (wardogshub.uk). ${V.matchCountText} in matches, ${V.matchPeak24hText} today's peak, ${V.matchPeakText} all-time in-match peak, ${V.serversText} servers as ${V.officialServersText} official plus ${V.communityServersText} community (wardogservers.com).</td></tr>
<tr><td>Calculated here, not published anywhere</td><td class="wrap-cell">${V.busiestGapPct} = (${V.peakAtext} − ${V.matchPeakText}) ÷ ${V.peakAtext}. ${V.officialAvg} = ${V.officialPlayersText} ÷ ${V.officialServersText}. ${V.communityAvg} = ${V.communityPlayersText} ÷ ${V.communityServersText}. ${V.combinedAvg} = ${V.matchCountText} ÷ ${V.serversText}. Also the reading that sampling interval explains the three peaks.</td></tr>
<tr><td>Not confirmed</td><td class="wrap-cell">How the ${V.gapText} gap splits between queue, menu and idle. No source publishes it. Any per-team player figure: none exists in any official post read here. Any concurrency target the studio may have set.</td></tr>
</tbody>
</table>
</div>

<figure class="pagefig"><picture><source media="(prefers-color-scheme: light)" srcset="/assets/img/wardogs-player-count-light.png"><img src="/assets/img/wardogs-player-count.png" width="1200" height="630" alt="Card for the WARDOGS player count: ${V.countText} on Steam, ${V.matchCountText} in matches, the minute it was read"></picture><figcaption>Drawn for this page, dark or light to match. Figures as read on 1 October 2026.</figcaption></figure>

${adUnit}

<div class="readnext">
<p><a href="/wardogs">Scoring, prices and platform support for WARDOGS &rarr;</a></p>
<p><a href="/wardogs-gameplay">The one mode, and the two names that are not modes &rarr;</a></p>
<p><a href="/wardogs-release-date">The day it opened, and the hour &rarr;</a></p>
<p><a href="/wardogs-steam-deck">Does WARDOGS run on the Steam Deck? Valve's own answer &rarr;</a></p>
</div>`,
};
