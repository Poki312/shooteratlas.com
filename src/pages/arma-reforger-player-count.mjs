// Fifth game on the site, first page of the second batch. Same page type as the
// four player-count pages before it: the answer in the first screen, a source
// and a read date on every number, the four-layer table at the end.
//
// This game's own difference: it is a sandbox with no fixed match size, and the
// studio's own material never prints how many players a server holds — so the
// page says that plainly instead of filling the slot.
import { adUnit } from "../ad.mjs";
import { live } from "../data/live.mjs";

const V = live.armaReforger;

const SITE = "https://shooteratlas.com";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: "Arma Reforger player count", item: SITE + "/arma-reforger-player-count" },
      ],
    },
    {
      "@type": "VideoGame",
      name: "ARMA REFORGER",
      url: SITE + "/arma-reforger-player-count",
      applicationCategory: "Game",
      gamePlatform: "PC (Windows)",
      publisher: "Bohemia Interactive",
      datePublished: "2023-11-16",
      sameAs: ["https://store.steampowered.com/app/1874880/Arma_Reforger/"],
    },
  ],
};

export const page = {
  ogImage: "https://shooteratlas.com/assets/img/arma-reforger-player-count.png",
  source: "src/pages/arma-reforger-player-count.mjs",
  path: "/arma-reforger-player-count",
  title: `ARMA REFORGER player count: ${V.countText} on Steam, ${V.peakAtext} at the all-time peak`,
  description:
    `${V.countText} accounts had Arma Reforger open on Steam at ${V.timeFull} — Valve's own figure, from the Steam Web API for app 1874880. The all-time peak is ${V.peakAtext} or ${V.peakBtext} depending which tracker you read, the studio has never printed a match size, and the Steam number is the PC half of a game that also ships on Xbox and PlayStation.`,
  extraHead:
    "<style>" +
    "blockquote{margin:0 0 1.2rem;padding:.7rem 1rem;border-left:3px solid var(--rule);color:var(--muted);font-style:italic;font-size:.98rem}" +
    "blockquote code,code{font-size:.92em}" +
    "</style>" +
    "<script type='application/ld+json'>" + JSON.stringify(schema) + "</script>",
  body: `<h1>ARMA REFORGER player count: ${V.countText} on Steam, ${V.peakAtext} at the all-time peak</h1>

<p class="lede">${V.countText} accounts had Arma Reforger open on Steam at ${V.timeFull}. Valve's own number, straight out of the Steam Web API for app 1874880, and the only live figure anybody publishes. Five reads across five minutes returned that same ${V.countText}. What nobody publishes is how many of them are on a server, and on this game the studio has never printed how many a server holds.</p>

<div class="strip">
<div><span class="stat-n">${V.countText}</span><span class="stat-k">accounts with the game open, ${V.timeShort}</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">${V.peakAtext} / ${V.peakBtext}</span><span class="stat-k">all-time peak, depends who asked</span><span class="stat-src"><span class="src-chip src-third">third-party</span></span></div>
<div><span class="stat-n">${V.peak24hText}</span><span class="stat-k">24-hour peak</span><span class="stat-src"><span class="src-chip src-third">third-party</span></span></div>
<div><span class="stat-n">${V.discordOnlineText}</span><span class="stat-k">online in the official Discord</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">${V.timeShort}</span><span class="stat-k">the minute this was read</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
</div>

<h2>Two counts, one game</h2>

<p>Steam counts a session. Arma Reforger has no fixed match to count a second time — a server runs a scenario until it ends, and the popular ones run for hours. So the second number is not merely unpublished, it has nothing standard to be.</p>

<ul>
<li>The trackers all publish the same first number. SteamDB and SteamCharts show Valve's figure for app 1874880; Tracker Network's population page shows the same figure and then hedges with its own question, "Is this the entire player base?" — read 3 October 2026.</li>
<li><strong>raijin.gg</strong> could not be read at all: its Arma Reforger page served a Cloudflare block to this machine, including when loaded in a normal browser window, on 3 October 2026.</li>
<li><strong>SteamDB</strong> answered HTTP 403 to this machine, with and without a browser user-agent.</li>
<li><strong>coilr.org</strong>'s Arma 3-versus-Reforger comparison page no longer serves the comparison: it returned a 404 body and a sign-in prompt on 3 October 2026.</li>
</ul>

<p>So every published count for this game is one endpoint's number, copies of it, or an estimate built from it. Print the minute or you are not adding anything.</p>

<h2>The peak depends who you ask</h2>

<p>Two trackers publish an all-time peak for Arma Reforger. They disagree by ${V.peakGap} players.</p>

<ul>
<li><strong>${V.peakAtext}</strong> — SteamCharts, from its all-time peak box, read 3 October 2026. Its monthly table puts the record in February 2026.</li>
<li><strong>${V.peakBtext}</strong> — steamplayercount.com, from its all-time peak box, read 3 October 2026.</li>
</ul>

<p>The second tracker does not reconcile with itself. Its live box says ${V.peakBtext} all-time; its own monthly table's highest row is February 2026 at ${V.steamPlayerCountFebRowText}, and no row on that table reaches ${V.peakBtext}. Both numbers are printed on the same page. This page does not guess which one is right.</p>

<p>Steam publishes no concurrency history of its own: <code>GetNumberOfCurrentPlayers</code> answers "how many right now" and stops. Every peak on the internet is the highest number one sampler happened to catch. SteamCharts says so on its about page: "The collector queries the number of concurrent players on an hourly interval for every single game in the Steam catalog, and has been collecting data since July of 2012." (steamcharts.com/about, read 3 October 2026)</p>

<h2>February 2026, and what this page will not say</h2>

<p>SteamCharts' monthly table puts the record in February 2026: an average of ${V.febAvgText} and a peak of ${V.peakAtext}, against ${V.janAvgText} the month before (SteamCharts, read 3 October 2026).</p>

<p>This page does not say what caused it. The studio's news index, as served to this machine on 3 October 2026, reaches back only as far as 28 May 2026 — there is no January or February 2026 entry in it to read. No cause is printed here because no cause was sourced.</p>

<h2>The studio has never printed a match size</h2>

<p>The page type usually closes its first screen with a hard ceiling. On this game there is none to quote, and that is a fact about the official material rather than a gap in this page. The store description reads:</p>

<blockquote>"Engage in massive combined arms battles, create and curate combat missions in real time, and shape your experience with endless community mods. Deploy into the Cold War and experience the most authentic and immersive military sandbox ever created." (<a href="https://store.steampowered.com/app/1874880/Arma_Reforger/">Steam store page for Arma Reforger</a>, read 3 October 2026)</blockquote>

<p>Read the description, the about text and the feature list, and there is no number of players anywhere in them — a search of that text for any figure followed by "player" or "v" returns nothing. Neither does the game's own site: <a href="https://reforger.armaplatform.com/">reforger.armaplatform.com</a> describes the war and the islands and never states a server size (read 3 October 2026).</p>

<p>So: the studio prints the scale in adjectives and not in digits. Anyone quoting a per-server number for Arma Reforger is quoting a community convention, not the maker. Inference, mine: that is deliberate, because in a sandbox the number is set by whoever runs the server.</p>

<h2>The number is a PC number</h2>

<p>Arma Reforger is on PC, Xbox and PlayStation 5 — the studio's own site says so in as many words: "Experience authentic combat on PC, XBOX, and PlayStation 5 for the first time in the Arma series." (reforger.armaplatform.com, read 3 October 2026). Valve's own store record agrees the game is multi-platform from its side too: its category list carries <strong>Cross-Platform Multiplayer</strong> (appdetails for app 1874880, read 3 October 2026).</p>

<p>Steam's endpoint has no console field. It answers for app 1874880, which is the Windows build. So the ${V.countText} is the PC half of a three-platform game — and Tracker Network's own page asks the question out loud instead of answering it: "Is this the entire player base?" (read 3 October 2026). No source read for this page publishes the console numbers.</p>

<h2>What a day looks like</h2>

<p>Valve's figure read ${V.countText} five times in a row, at 11:11:27, 11:12:35, 11:13:40, 11:14:45 and 11:15:50 UTC on 3 October 2026. Nothing in it moved while this page was being written.</p>

<h2>Checking it yourself</h2>

<ol>
<li>Live and official: <code>https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=1874880</code>. One JSON field. No key. Read it twice, a minute apart, before you believe a change.</li>
<li>What the trackers add, and where they stop: they republish that same field, then add a history chart built from their own sampling. The chart is theirs; the number is Valve's.</li>
<li>What none of them carries: a split by server, a split by platform, or a split between people in a scenario and people in the editor. There is no public source for any of those.</li>
<li>A peak: pick one tracker and stay on it. SteamCharts and steamplayercount.com disagree by ${V.peakGap} on the record, and the second one disagrees with its own monthly table (both read 3 October 2026).</li>
<li>Anything that will not tell you which minute it read is not a source. On the morning this page was written the live boxes read ${V.steamChartsLiveText} (SteamCharts, its own clock), ${V.steamPlayerCountLiveText} (steamplayercount.com, no clock) and ${V.countText} (Valve, ${V.timeShort}). Three pages, three numbers, three minutes.</li>
</ol>

<h2>What the number hides</h2>

<p>Three things, and this game makes each of them bigger than the last two pages in this set did. It hides the console players, because the game is cross-platform and the endpoint is not. It hides what the people counted are doing, and on this game that is not a detail: the studio's own announcement of 7 September 2026 added <em>Arma Reforger - Rally</em> — three rally cars, six stages across three islands, and, in the studio's own words, "nothing at all to shoot at". A player timed on a forest stage is in the same ${V.countText} as one holding a treeline.</p>

<p>And it hides how little of the audience is in the number at all. The official Arma Discord (vanity address <code>arma</code>, guild 105462288051380224) answered Discord's own invite endpoint on 3 October 2026 with ${V.discordMembersText} members and ${V.discordOnlineText} online. That is ${V.discordGap} more people than Valve's concurrent figure for the same morning.</p>

<p>Inference, mine: on a sandbox the concurrent count is a floor, not a total — a floor on one platform, for one activity, at one minute.</p>

<h2>Every claim on this page, sorted</h2>

<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="layers-caption">
<table class="matrix">
<caption id="layers-caption">Every claim on this page, sorted. Read 3 October 2026.</caption>
<thead><tr><th scope="col">Layer</th><th scope="col">What is in it</th></tr></thead>
<tbody>
<tr><td>Confirmed officially</td><td class="wrap-cell">${V.countText} concurrent at ${V.timeShort}, and five identical reads from 11:11:27 (Steam Web API, app 1874880). "Massive combined arms battles", from the store description, with no figure anywhere in the store text or on the game's own site. "Experience authentic combat on PC, XBOX, and PlayStation 5", from reforger.armaplatform.com. Cross-Platform Multiplayer, from Valve's own category list. Update 1.8 on 13 August 2026, 1.8.0.13 on 3 September 2026 and Arma Reforger - Rally on 7 September 2026, from the studio's own news feed. ${V.discordMembersText} members and ${V.discordOnlineText} online (Discord's own invite endpoint).</td></tr>
<tr><td>Read off third parties</td><td class="wrap-cell">${V.steamChartsLiveText} playing and a ${V.peak24hText} 24-hour peak, ${V.peakAtext} all-time peak, ${V.febAvgText} for February 2026 against ${V.janAvgText} in January, ${V.avg30Text} 30-day average, ${V.avg30PeakText} 30-day peak, ${V.sepAvgText} September 2026 average on ${V.sepDeltaPct} (SteamCharts). ${V.steamPlayerCountLiveText} in the live box, ${V.peakBtext} as the all-time peak, and a monthly table whose best row is February 2026 at ${V.steamPlayerCountFebRowText} (steamplayercount.com). Tracker Network's own hedge, "Is this the entire player base?" (tracker.gg).</td></tr>
<tr><td>Calculated here, not published anywhere</td><td class="wrap-cell">${V.peakGap} = ${V.peakAtext} − ${V.peakBtext}. ${V.discordGap} = ${V.discordOnlineText} − ${V.countText}. Also the reading that a sampling interval, not a disagreement, separates the trackers' peaks.</td></tr>
<tr><td>Not confirmed</td><td class="wrap-cell">How many of the ${V.countText} are on a server, and how many are in the editor or a single-player scenario. How many people are playing on Xbox and PlayStation 5, and whether that number is larger or smaller than the Steam one. What a server holds, since the studio has never printed it. What caused the February 2026 peak. Which minute steamplayercount.com's live box was reading, and which of its two all-time figures is the one it means.</td></tr>
</tbody>
</table>
</div>

<figure class="pagefig"><picture><source media="(prefers-color-scheme: light)" srcset="/assets/img/arma-reforger-player-count-light.png"><img src="/assets/img/arma-reforger-player-count.png" width="1200" height="630" alt="Card for the Arma Reforger player count: ${V.countText} accounts on Steam, ${V.peakAtext} at the all-time peak, ${V.pctOfRecord} of the record"></picture><figcaption>Drawn for this page, dark or light to match. Figures as read on 3 October 2026.</figcaption></figure>

${adUnit}

<div class="readnext">
<p><a href="/squad-player-count">The same page for Squad: 10,302 on Steam against a 38,573 record &rarr;</a></p>
<p><a href="/hell-let-loose-player-count">The same page for Hell Let Loose: 2,207 on Steam, and a console half nobody counts &rarr;</a></p>
<p><a href="/foxhole-player-count">The same page for Foxhole: 1,774 on Steam, and the war the game publishes instead &rarr;</a></p>
</div>`,
};
