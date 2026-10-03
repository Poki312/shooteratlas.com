// Second game on the site, and the same page type as /wardogs-player-count:
// the answer in the first screen, one source and one read date on every number,
// and the four-layer table at the end that sorts what is official, what was read
// off a third party, what we worked out ourselves and what nobody publishes.
//
// No FAQ block, same as the WARDOGS page this one is modelled on.
import { adUnit } from "../ad.mjs";
import { live } from "../data/live.mjs";

const V = live.squad;

const SITE = "https://shooteratlas.com";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: "Squad player count", item: SITE + "/squad-player-count" },
      ],
    },
    {
      "@type": "VideoGame",
      name: "SQUAD",
      url: SITE + "/squad-player-count",
      applicationCategory: "Game",
      gamePlatform: "PC (Windows)",
      publisher: "Offworld Industries",
      datePublished: "2020-09-23",
      sameAs: ["https://store.steampowered.com/app/393380/Squad/"],
    },
  ],
};

export const page = {
  ogImage: "https://shooteratlas.com/assets/img/squad-player-count.png",
  source: "src/pages/squad-player-count.mjs",
  path: "/squad-player-count",
  title: `SQUAD player count: ${V.countText} on Steam, ${V.peakAtext} at the all-time peak`,
  description:
    `${V.countText} accounts had Squad open on Steam at ${V.timeFull} — Valve's own figure, from the Steam Web API for app 393380. The all-time peak is ${V.peakAtext} or ${V.peakBtext} depending which tracker you read, nobody publishes how many of those people are on a map, and here is how to check every number yourself.`,
  extraHead:
    "<style>" +
    "blockquote{margin:0 0 1.2rem;padding:.7rem 1rem;border-left:3px solid var(--rule);color:var(--muted);font-style:italic;font-size:.98rem}" +
    "blockquote code,code{font-size:.92em}" +
    "</style>" +
    "<script type='application/ld+json'>" + JSON.stringify(schema) + "</script>",
  body: `<h1>SQUAD player count: ${V.countText} on Steam, ${V.peakAtext} at the all-time peak</h1>

<p class="lede">${V.countText} accounts had Squad open on Steam at ${V.timeFull}. Valve's own number, straight out of the Steam Web API for app 393380, and the only live figure for this game that anybody publishes. The game's own server browser knows how many of those people are standing on a map. It does not tell the rest of us, and every site that used to add that up is parked, paid or blocked.</p>

<div class="strip">
<div><span class="stat-n">${V.countText}</span><span class="stat-k">accounts with the game open, ${V.timeShort}</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">${V.peakAtext} / ${V.peakBtext}</span><span class="stat-k">all-time peak, depends who asked</span><span class="stat-src"><span class="src-chip src-third">third-party</span></span></div>
<div><span class="stat-n">${V.peak24hText}</span><span class="stat-k">24-hour peak</span><span class="stat-src"><span class="src-chip src-third">third-party</span></span></div>
<div><span class="stat-n">${V.discordOnlineText}</span><span class="stat-k">online in the official Discord, 08:57 UTC</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">${V.timeShort}</span><span class="stat-k">the minute this was read</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
</div>

<h2>Two counts, one game</h2>

<p>Steam counts a session. Squad counts a body on a map. Those have never been the same number, and for this game only the first one gets printed. Every aggregator that used to total the second one is gone from this machine. What each one answered, checked on 3 October 2026:</p>

<ul>
<li><strong>squad-servers.com</strong> did not serve a server list at all. The bare domain forwarded to an unrelated gambling site, and the <code>www</code> host answered with a Cloudflare "Site Maintenance" page.</li>
<li><strong>BattleMetrics</strong>, which tracks Squad servers, answered this machine's request with <code>{"status":"403","title":"Forbidden","detail":"Access denied. A subscription is required to use the API."}</code> Its server pages return 403 as well.</li>
<li><strong>SteamDB</strong>'s Squad charts returned HTTP 403, with and without a browser user-agent.</li>
<li><strong>Valve's own Source master server</strong>, the UDP list a tool would ask for the server addresses, did not answer this machine on port 27011 at four separate addresses. Ordinary UDP worked on the same machine at the same minute — a DNS query to 8.8.8.8 returned normally — so the silence came from that service, not from the network being off.</li>
</ul>

<p>What is left is Steam's figure and the sites that republish it. Anyone quoting a Squad player count is quoting Valve, whether they say so or not.</p>

<p>The second count does exist. It is in the game's server browser, on your screen, adding up a column. That makes it a screenshot, not a source, which is why this page does not print one.</p>

<h2>The peak depends who you ask</h2>

<p>Two trackers publish an all-time peak for Squad. They disagree, and neither of them is wrong.</p>

<ul>
<li><strong>${V.peakAtext}</strong> — SteamCharts, from its all-time peak box, read 3 October 2026. Its monthly table puts the record in September 2024.</li>
<li><strong>${V.peakBtext}</strong> — steamplayercount.com, from its all-time peak box, read 3 October 2026, in the same month.</li>
</ul>

<p>${V.peakGap} players apart. A match here holds 100, so the gap is smaller than one full server. Steam publishes no concurrency history of its own: <code>GetNumberOfCurrentPlayers</code> answers "how many right now" and stops. Every peak on the internet is the highest number one sampler happened to catch, and the sampling interval is the whole story. SteamCharts says so in its own words on its about page: "The collector queries the number of concurrent players on an hourly interval for every single game in the Steam catalog, and has been collecting data since July of 2012." (steamcharts.com/about, read 3 October 2026)</p>

<p>An eleven-minute spike can slip between two hourly samples. Nobody is lying; they looked at different minutes. The tracker that would settle it, SteamDB, returned 403 to this machine.</p>

<h2>The record month, and where the game is now</h2>

<p>Both trackers put the record in September 2024 — same month, same ${V.peakGap}-player difference, one sampler each. Taken as a working figure, that peak is worth ${V.perHundred} full 100-player matches (${V.peakAtext} ÷ 100, my division), a number to hold next to today's.</p>

<p>Today the game is running at a fraction of it. ${V.pctOfRecord} = ${V.countText} ÷ ${V.peakAtext}, calculated here and published nowhere. That is a ratio between one live reading and one historical one. It is not a claim about whether Squad is doing well; it is what the two numbers say when you put them next to each other.</p>

<h2>100 is the ceiling, and the studio prints it itself</h2>

<blockquote>"Wage warfare in massive 50 vs 50 battles across expansive maps. With 100 soldiers in every battle, everyone is integral." (<a href="https://www.joinsquad.com/game-features/100-player-battles">joinsquad.com, "100-Player Battles"</a>, read 3 October 2026)</blockquote>

<blockquote>"As part of a 50 person team, join a nine-person squad to face off against opposing factions in intense combat across large real-world environments." (<a href="https://store.steampowered.com/app/393380/Squad/">Steam store page for Squad</a>, read 3 October 2026)</blockquote>

<p>So the shape of a match is published, by the people who make it: 50 people a team, nine people a squad, 100 in a battle, on 24 maps across 13 factions (same store page, same read).</p>

<p>What is not published is how full those hundred seats run. Official material gives the ceiling and never the occupancy. Nothing on any official surface read for this page says how many of the accounts counted above are actually on a map.</p>

<h2>What the studio says about servers and queues</h2>

<p>Offworld does write about queues, in patch notes, without ever putting a number on one:</p>

<blockquote>"An updated map vote config will help server owners prevent repetitive matches from striking your queues." (<a href="https://www.joinsquad.com/updates/squad-10-6-release-notes">Update 10.6 release notes</a>, 1 October 2026)</blockquote>

<blockquote>"Fixed an issue where in-game VoIP would stop transmitting if you queued up for another server while already on a server (while the queue popup was open)." (same notes)</blockquote>

<p>A queue is a logged-in state with the game running. It is not a body on a map. So the number at the top of this page carries people waiting to get into a server, people sitting in the menu, and people in Fireteam — the five-player co-op player-versus-environment mode the store page lists as part of the game (read 3 October 2026). Nobody publishes the split. Inference, mine, from those three official statements.</p>

<h2>What a day looks like</h2>

<p>Read five times across five minutes, Valve's figure did not move once: ${V.countText} at 08:56:13, 08:57:18, 08:58:23, 08:59:28 and 09:00:33 UTC on 3 October 2026. Seven minutes earlier in the same session it read ${V.priorReadText}. The endpoint refreshes, then holds its value between refreshes, so an argument about a few hundred players is usually an argument about two different minutes.</p>

<h2>Checking it yourself</h2>

<ol>
<li>Live and official: <code>https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=393380</code>. One JSON field. No key. Read it twice, a minute apart, before you believe a change.</li>
<li>The count that matters and is missing: open Squad, open the server browser, add up the player column. That is the only place it exists. Screenshot it or you have no source.</li>
<li>A peak: pick one tracker and stay on it. SteamCharts and steamplayercount.com disagree by ${V.peakGap} on the record (both read 3 October 2026).</li>
<li>Anything that will not tell you which minute it read is not a source. On the morning this page was written the three live boxes read 9,857 (SteamCharts, its own stamp of 08:02 UTC), ${V.thirdReadingText} (steamplayercount.com, no stamp) and ${V.countText} (Valve, ${V.timeShort}). Three pages, three numbers, three minutes.</li>
</ol>

<h2>What the number hides</h2>

<p>Steam's figure counts open sessions for one app. It says nothing about what is happening inside them, and for this game the second count is not merely unpublished — the places that used to publish it now serve a parking page, a paywall or a 403.</p>

<p>The one other population number that is genuinely available is bigger. The official Squad Community Discord (vanity address <code>squad</code>, guild 91294111071469568) answered Discord's own invite endpoint on 3 October 2026 at 08:57 UTC with 113,229 members and ${V.discordOnlineText} online. That is ${V.discordGap} more people than Valve's concurrent figure seven minutes earlier — and it answers a different question, because being online in a chat server is not playing the game.</p>

<p>Inference, mine: the concurrent figure understates how many people are around this game, and the Discord figure overstates it, and neither of them measures a battle. The only number that would is the one sitting in the server browser on your own screen.</p>

<h2>Every claim on this page, sorted</h2>

<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="layers-caption">
<table class="matrix">
<caption id="layers-caption">Every claim on this page, sorted. Read 3 October 2026.</caption>
<thead><tr><th scope="col">Layer</th><th scope="col">What is in it</th></tr></thead>
<tbody>
<tr><td>Confirmed officially</td><td class="wrap-cell">${V.countText} concurrent at ${V.timeShort} (Steam Web API, app 393380). 50 against 50, 100 soldiers to a battle, from the studio's own 100-Player Battles page. A 50 person team and a nine-person squad, from the store page. 113,229 members and ${V.discordOnlineText} online (Discord's own invite endpoint, 08:57 UTC). Update 10.6 on 1 October 2026 and two hotfixes on 2 October, from Valve's news feed for the app.</td></tr>
<tr><td>Read off third parties</td><td class="wrap-cell">9,857 playing at 08:02 UTC, ${V.peak24hText} the 24-hour peak, ${V.peakAtext} the all-time peak, ${V.avg30Text} the 30-day average, 20,913 the 30-day peak, 9,462.66 the September 2026 average on −23.39% (SteamCharts). ${V.thirdReadingText} in the live box and ${V.peakBtext} as the all-time peak (steamplayercount.com).</td></tr>
<tr><td>Calculated here, not published anywhere</td><td class="wrap-cell">${V.peakGap} = ${V.peakAtext} − ${V.peakBtext}. ${V.perHundred} = ${V.peakAtext} ÷ 100. ${V.gapToPrior} = ${V.countText} − ${V.priorReadText}. ${V.discordGap} = ${V.discordOnlineText} − ${V.countText}. ${V.gapToThird} = ${V.thirdReadingText} − ${V.countText}. Also the reading that a sampling interval, not a disagreement, separates the two all-time peaks.</td></tr>
<tr><td>Not confirmed</td><td class="wrap-cell">How many of the ${V.countText} are on a map. How many are in Fireteam rather than in a 100-player match. How full the average server runs. Which minute steamplayercount.com's live box was reading, and why its figure sat ${V.gapToThird} above Valve's within the same hour. Why the two trackers' records differ by ${V.peakGap}. Any concurrency target the studio may have set.</td></tr>
</tbody>
</table>
</div>

<figure class="pagefig"><picture><source media="(prefers-color-scheme: light)" srcset="/assets/img/squad-player-count-light.png"><img src="/assets/img/squad-player-count.png" width="1200" height="630" alt="Card for the Squad player count: ${V.countText} accounts on Steam, ${V.peakAtext} at the all-time peak, ${V.pctOfRecord} of the record"></picture><figcaption>Drawn for this page, dark or light to match. Figures as read on 3 October 2026.</figcaption></figure>

${adUnit}

<div class="readnext">
<p><a href="/wardogs-player-count">The same page for WARDOGS: 103,208 on Steam against 83,730 in a match &rarr;</a></p>
<p><a href="/wardogs">Scoring, prices and platform support for WARDOGS &rarr;</a></p>
<p><a href="/wardogs-steam">What the WARDOGS store page states, with a read date on every line &rarr;</a></p>
</div>`,
};
