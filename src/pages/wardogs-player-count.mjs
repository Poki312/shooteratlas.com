// Body is the DeAI-passed draft published verbatim. No FAQ block: the draft has
// none, and the brief for this page was "content unchanged, formatting only".
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

export const page = {
  ogImage: "https://shooteratlas.com/assets/img/wardogs-player-count.png",
  source: "src/pages/wardogs-player-count.mjs",
  path: "/wardogs-player-count",
  title: "WARDOGS player count: 103,208 on Steam, 83,730 actually in a match",
  description:
    "103,208 accounts had WARDOGS open on Steam at 08:33 UTC on 1 October 2026. A minute earlier the in-game server browser put 83,730 people inside actual matches. The 19,478 gap, the three competing peak figures, and how to check the number yourself.",
  extraHead:
    "<style>" +
    "blockquote{margin:0 0 1.2rem;padding:.7rem 1rem;border-left:3px solid var(--rule);color:var(--muted);font-style:italic;font-size:.98rem}" +
    "blockquote code,code{font-size:.92em}" +
    "</style>" +
    "<script type='application/ld+json'>" + JSON.stringify(schema) + "</script>",
  body: `<h1>WARDOGS player count: 103,208 on Steam, 83,730 actually in a match</h1>

<p class="lede">103,208 accounts had WARDOGS open on Steam at 08:33 UTC on 1 October 2026. Valve's own number, straight from the Steam Web API for app 1867240. A minute earlier, a tally of the in-game server browser put 83,730 people inside actual matches. Both are true, and almost every player-count page you find quotes one of them without telling you which.</p>

<p>Short version: 19,478 people were logged in and not playing. That is 18.9% of the Steam figure. (103,208 − 83,730) ÷ 103,208. My arithmetic. Neither site publishes it.</p>

<div class="strip">
<div><span class="stat-n">103,208</span><span class="stat-k">accounts with the game open, 08:33 UTC</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">83,730</span><span class="stat-k">players inside matches, 08:32 UTC</span><span class="stat-src"><span class="src-chip src-ingame">in-game</span></span></div>
<div><span class="stat-n">18.9%</span><span class="stat-k">of the Steam count not in a match</span><span class="stat-src"><span class="src-chip src-calc">calculated</span></span></div>
<div><span class="stat-n">428,666 / 402,686</span><span class="stat-k">highest peak, depends who asked</span><span class="stat-src"><span class="src-chip src-third">third-party</span></span></div>
<div><span class="stat-n">221,831.21</span><span class="stat-k">30-day average, down 0.93%</span><span class="stat-src"><span class="src-chip src-third">third-party</span></span></div>
</div>

<h2>Two counts, one game</h2>

<p>The gap is not noise. Steam counts an open session. The server browser counts bodies on a map. Menu, trader, spawn screen, login queue, tabbed out. All of them land in the first number. None of them land in the second.</p>

<p>Which one did the page you just read quote?</p>

<p>Does sitting in a queue count as playing? By Valve's arithmetic, yes.</p>

<p>No source publishes how those 19,478 split between queue, menu and idle. Inference, mine: the queue carries most of it, because the studio has said in writing that a queue exists. Quote below.</p>

<h2>Three peaks, three clocks</h2>

<p>Search this keyword and you will meet 428,666, 428,372 and 402,686, all labelled all-time peak. Steam has no history endpoint. It answers "how many right now" and stops there. So every peak on the internet means one thing only: the highest number that particular site happened to catch.</p>

<ul>
<li><strong>428,666</strong>, at 19:44 UTC on 13 September. Read on every page load (wardogshub.gg).</li>
<li><strong>428,372</strong>, 13 September. Sampled every 10 minutes (wardogshub.uk).</li>
<li><strong>402,686</strong>. Sampled hourly. SteamCharts says so on its own about page: "The collector queries the number of concurrent players on an hourly interval for every single game in the Steam catalog."</li>
</ul>

<p>An eleven-minute spike slips clean between two ten-minute samples. Who is wrong? Nobody. They looked at different minutes.</p>

<h2>The busiest minute on record, counted twice</h2>

<p>13 September. Steam-side peak at 19:44 UTC (428,666). In-match peak at 19:46 UTC (367,742). Two minutes apart. Same rush.</p>

<p>60,924 people were logged in and not on a map at the busiest moment of the game's life so far. 14.2% of the Steam figure: (428,666 − 367,742) ÷ 428,666. My division of two public readings.</p>

<h2>100 is the ceiling. The team size is not published anywhere.</h2>

<blockquote>"WARDOGS is a Tactical All Out Warfare FPS, where 100 players, split across 3 teams, fight over one 'Control Zone'. Set in the derelict industrial mountains of Eastern Europe, on a large-scale, destructible battlefield. Teamwork pays, and cash is king." (<a href="https://store.steampowered.com/news/app/1867240">Steam news post, "WARDOGS – TOP QUESTIONS"</a>, 18 February 2026)</blockquote>

<p>The store page says up to 100. Neither one says how large a team gets. I read the full text of all 61 posts on the official Steam news feed. Not one gives a per-team figure.</p>

<p>Live data shows how far from full the average game actually runs. Of 2,554 servers up at 08:32 UTC, 766 were run by the studio and 1,788 rented from approved hosts. Split them and the picture changes completely. Official servers averaged 89.5 players each (68,592 ÷ 766). Community servers averaged 8.5 (15,138 ÷ 1,788). Take them together and you get 32.8, which reads like proof against a 100-player game until you remember most community servers are empty.</p>

<h2>Why the two counts refuse to meet, in the studio's own words</h2>

<blockquote>"Once the update has been installed and you relaunch the game, all players will return to the login queue... We will then begin allowing players into the game in controlled batches." (<a href="https://store.steampowered.com/news/app/1867240">Steam news post, "Launch Stability Hotfix #1"</a>, 10 September 2026)</blockquote>

<p>A queue is a logged-in state. It is not a match.</p>

<blockquote>"A game with this many players realistically should be using matchmaking, and server browsers aren't massively fit for purpose, but we don't want Community admins and hosts to suffer. They're the lifeblood of the community who keep a game running well beyond its peak player days." (<a href="https://store.steampowered.com/news/app/1867240">Steam news post, "SCHEDULED MAINTENANCE &amp; PATCH 0.11"</a>, 12 September 2026)</blockquote>

<p>The same patch split the front end into two browsers, Community and Official.</p>

<p>No matchmaking to fill a server. A queue in front of the door. 766 official servers listed next to 1,788 community ones. That is the structure. Inference, mine, from those three official statements: it is why the two numbers can sit 19,000 apart in the same minute. Nobody publishes the breakdown.</p>

<h2>What a day looks like</h2>

<p>In-match peak in the last 24 hours was 152,922 at 01:56 UTC. By 08:32 it was 83,730. The population halved in six and a half hours.</p>

<p>On the Steam side, the 24-hour peak is 230,732 against 103,208 now. A 2.24× swing (230,732 ÷ 103,208). Any snapshot taken at 08:00 UTC understates the whole game.</p>

<p>For trend there is one option and it is third-party: a 30-day average of 221,831.21, down 2,086.2 (−0.93%) on the September average of 223,917.42. A weekly wobble. Read one minute as a trend and you will call it a collapse.</p>

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
<tr><td>Confirmed officially</td><td class="wrap-cell">103,208 concurrent at 08:33 UTC (Steam Web API, app 1867240). 100 players across 3 teams, in the studio's own news post of 18 February 2026. The login queue and controlled batches, from the 10 September hotfix. No matchmaking, and the split into Community and Official browsers, from patch 0.11 on 12 September.</td></tr>
<tr><td>Read off third parties</td><td class="wrap-cell">102,998 / 230,732 / 402,686 / 221,831.21 / 223,917.42 (SteamCharts). 102,705 and 428,666 (wardogshub.gg). 428,372 (wardogshub.uk). 83,730 in matches, 152,922 today's peak, 367,742 all-time in-match peak, 2,554 servers as 766 official plus 1,788 community (wardogservers.com).</td></tr>
<tr><td>Calculated here, not published anywhere</td><td class="wrap-cell">18.9% = (103,208 − 83,730) ÷ 103,208. 14.2% = (428,666 − 367,742) ÷ 428,666. 89.5 = 68,592 ÷ 766. 8.5 = 15,138 ÷ 1,788. 32.8 = 83,730 ÷ 2,554. 2.24× = 230,732 ÷ 103,208. Also the reading that sampling interval explains the three peaks.</td></tr>
<tr><td>Not confirmed</td><td class="wrap-cell">How the 19,478 gap splits between queue, menu and idle. No source publishes it. Any per-team player figure: none exists in any official post read here. Any concurrency target the studio may have set.</td></tr>
</tbody>
</table>
</div>

<figure class="pagefig"><picture><source media="(prefers-color-scheme: light)" srcset="/assets/img/wardogs-player-count-light.png"><img src="/assets/img/wardogs-player-count.png" width="1200" height="630" alt="Card for the WARDOGS player count: 103,208 on Steam, 83,730 in matches, an 18.9% gap"></picture><figcaption>Drawn for this page, dark or light to match. Figures as read on 1 October 2026.</figcaption></figure>

${adUnit}

<div class="readnext">
<p><a href="/wardogs">Scoring, prices and platform support for WARDOGS &rarr;</a></p>
<p><a href="/wardogs-gameplay">The one mode, and the two names that are not modes &rarr;</a></p>
<p><a href="/wardogs-release-date">The day it opened, and the hour &rarr;</a></p>
<p><a href="/wardogs-steam-deck">Does WARDOGS run on the Steam Deck? Valve's own answer &rarr;</a></p>
</div>`,
};
