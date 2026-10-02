// The Steam-side status page. Every figure carries the link it came from and
// the date it was read; the live one carries the endpoint and the minute.
// The foot-of-page questions and the FAQPage JSON-LD render from one array, so
// the structured data cannot drift from what a reader can open.
const faqs = [
  {
    q: "Is WARDOGS worth buying on Steam right now?",
    a: "It is a Windows-only Early Access game in its first month, and the store listing grades it Very Positive across 88,035 reviews (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 2 October 2026). Buy it if you play on Windows and want a shooter that gets rebuilt under you for two years; wait if you need Linux, Proton or a Steam Deck, because the listing returns a does-not-support result for all three, or if you want it on console, which the studio's own launch post dates to 2028 (<a href='https://store.steampowered.com/news/app/1867240'>official Steam news post</a>, 10 September 2026, read 2 October 2026). The developers also state that the price rises toward the full release (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Early Access notes</a>, read 2 October 2026).",
  },
  {
    q: "How many people are playing WARDOGS on Steam right now?",
    a: "Valve answers that one live and for free: <a href='https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=1867240'>GetNumberOfCurrentPlayers for app 1867240</a> returns a single number, no key, no sign-in. The reading taken for this page was 160,481 accounts at 00:03 UTC on 2 October 2026 (read 2 October 2026). It counts accounts with the game open, so the menu, the trader and the login queue are inside it, and it is a snapshot rather than a trend.",
  },
  {
    q: "I stopped playing for a week. What did I come back to?",
    a: "One patch and one countdown. Update 0.1.2 landed on 30 September 2026 with cash and XP exploit fixes, a fix for the Windows 11 WD-L020 crash, and a new deployment screen that asks you to choose Official, Community, Infantry Mode or Low-Level servers (<a href='https://store.steampowered.com/news/app/1867240'>official Steam news post</a>, read 2 October 2026). Season 02 is dated 15 October 2026 (<a href='https://store.steampowered.com/news/app/1867240'>official Steam news post</a>, read 2 October 2026).",
  },
  {
    q: "Is WARDOGS worth it if you do not play often?",
    a: "The part that matters for an occasional player is that your balance carries: cash earned in one match stays in the account for the next one, and the save-or-spend decision is the game's central one (<a href='https://store.steampowered.com/news/app/1867240'>official Steam news post, WARDOGS - TOP QUESTIONS</a>, 18 February 2026, read 2 October 2026). Whether that adds up to a good buy for you is a judgement, and no official figure settles it. This page will not invent one.",
  },
  {
    q: "Do I have to join a Discord to play WARDOGS?",
    a: "No. Steam is where the game is bought, launched and listed, and the servers are picked inside it. Discord is where the community organises around it, which is why the studio's own posts tell players to read its Discord announcements carefully (<a href='https://store.steampowered.com/news/app/1867240'>official Steam news post</a>, 11 August 2026, read 2 October 2026).",
  },
  {
    q: "Does WARDOGS work on the Steam Deck?",
    a: "Valve's own answer is on the listing and it is not a rating: the store page carries the does-not-support result for the Deck, for SteamOS and for Steam Machine (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 2 October 2026). The developer's own pinned answer is that Linux and Proton are not officially supported while Proton work continues, and both readings are collected on <a href='/wardogs-steam-deck'>the Steam Deck page</a> (read 1 October 2026).",
  },
  {
    q: "Will WARDOGS get more expensive on Steam?",
    a: "Yes, by the developers' own account: the Early Access notes say the price is lower during Early Access and rises toward the full release (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 2 October 2026). No 1.0 price has been published anywhere, so nobody can tell you what it becomes, and this page will not quote a number the studio has not printed. Today the listing reads $39.99 with a 0% discount (read 2 October 2026).",
  },
  {
    q: "Where do the WARDOGS patch notes live?",
    a: "On the game's own Steam news feed, which is what this page reads. The two newest entries as read on 2 October 2026 are Update 0.1.2, posted 30 September with a maintenance window at 08:00 UTC, and a Security &amp; Stability Hotfix post that the feed dates 2 October and that announces a hotfix at 08:00 UTC on Friday 2 October with an expected downtime of one hour (<a href='https://store.steampowered.com/news/app/1867240'>official Steam news</a>, read 2 October 2026). Dated milestones are collected on <a href='/wardogs-release-date'>the release date page</a>.",
  },
  {
    q: "What is error WD-L020?",
    a: "It is the one error code the studio has published: the notes for update 0.1.2 say the patch fixes a Windows 11 crash caused by update KB5124010, reported as WD-L020 (<a href='https://store.steampowered.com/news/app/1867240'>official Steam news</a>, 30 September 2026, read 2 October 2026). No index of WARDOGS error codes exists on either official surface, so any other code you see has no published meaning yet.",
  },
  {
    q: "Which anti-cheat does the WARDOGS listing name?",
    a: "One: the store page's feature block reads \"Uses Kernel Level Anti-Cheat\" and names Elytra, and no other provider appears anywhere on that page, which also requires agreement to a third-party EULA (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 2 October 2026). What a kernel-level driver means for Linux and Proton is the subject of <a href='/wardogs-steam-deck'>the Steam Deck page</a>, and the studio's own ban policy is written up on <a href='/wardogs'>the hub page</a>.",
  },
  {
    q: "Is there a WARDOGS wiki?",
    a: "Yes, and it is a database rather than a guide site: wardogs.wiki describes itself as documenting 400 items in the fourteen languages the game ships, and its pages are item cards carrying prices, unlock levels and statistics (<a href='https://wardogs.wiki/'>wardogs.wiki</a>, read 2 October 2026). It publishes no editorial pages, and nothing on this site is taken from it.",
  },
  {
    q: "Does the WARDOGS wiki have guides or maps?",
    a: "No. Asked for its category contents on 2 October 2026, wardogs.wiki reports zero members for Guides, Maps, Mechanics, Game modes and Factions — the subject areas a guide site would start from — while Weapons holds 44 entries (<a href='https://wardogs.wiki/api.php?action=query&amp;prop=categoryinfo&amp;titles=Category:Guides%7CCategory:Maps%7CCategory:Mechanics%7CCategory:Game%20modes%7CCategory:Factions%7CCategory:Weapons&amp;format=json'>MediaWiki API</a>, read 2 October 2026). Guides and tools for this game exist on the third-party hub instead, and this page does not copy them.",
  },
  {
    q: "Does WARDOGS stream on Twitch?",
    a: "The studio has streamed: its feed carries a livestream announcement on 17 July 2026 and a first-livestream post on 22 July, both pointing at the studio's own Twitch channel for a stream on 23 July at 18:00 UTC (<a href='https://store.steampowered.com/news/app/1867240'>official Steam news</a>, read 2 October 2026). No schedule and no viewing figures are published in the official material read for this site, so this page prints none.",
  },
];

const stripTags = (s) => s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
const SITE = "https://shooteratlas.com";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: "Wardogs", item: SITE + "/wardogs" },
        { "@type": "ListItem", position: 3, name: "Steam", item: SITE + "/wardogs-steam" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: stripTags(f.a) },
      })),
    },
    {
      "@type": "VideoGame",
      name: "WARDOGS",
      url: SITE + "/wardogs-steam",
      applicationCategory: "Game",
      gamePlatform: "PC (Windows)",
      operatingSystem: "Windows",
      author: { "@type": "Organization", name: "BULKHEAD" },
      publisher: { "@type": "Organization", name: "Team17" },
      datePublished: "2026-09-10",
      sameAs: ["https://store.steampowered.com/app/1867240/WARDOGS/"],
    },
  ],
};

const faqHtml = faqList(faqs);

import { adUnit } from "../ad.mjs";
import { faqList } from "../faq.mjs";

export const page = {
  source: "src/pages/wardogs-steam.mjs",
  path: "/wardogs-steam",
  title: "WARDOGS Steam: 160,481 players at once, and what the store page states",
  description:
    "160,481 accounts had WARDOGS open on Steam at 00:03 UTC on 2 October 2026. The live reading, the 88,035 reviews behind the Very Positive grade, the $39.99 price and every other figure on the listing, each with the day it was read.",
  extraHead: "<script type='application/ld+json'>" + JSON.stringify(schema) + "</script>",
  body: `<h1>WARDOGS Steam: 160,481 players at once, and what the store page states</h1>

<p class="lede">160,481 accounts had WARDOGS open on Steam at 00:03 UTC on 2 October 2026. That is Valve's own number, out of the Steam Web API for app 1867240 (<a href="https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=1867240">GetNumberOfCurrentPlayers</a>, read 2 October 2026). Two minutes later a third-party tracker reading the same endpoint printed 160,133 (<a href="https://wardogshub.gg/player-count/">wardogshub.gg</a>, read 2 October 2026). Both are snapshots of a number that moves all day.</p>

<p>How to read this page. Where a figure is live, the line under it names the interface it came from and the minute it was read. Where it comes out of Valve's own listing, it says so. Nothing here is averaged, nothing is rounded to a friendlier figure, and where nobody has published something, the page says that instead of filling the hole. The live number is a reading, not a live value: it was true at 00:03 UTC and it is history by the time you read this.</p>

<div class="strip">
<div><span class="stat-n">160,481</span><span class="stat-k">accounts with the game open at 00:03 UTC, read 2 October 2026</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">88,035</span><span class="stat-k">reviews counted on the listing, read 2 October 2026</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">80%</span><span class="stat-k">of 58,484 English-language reviews positive, read 2 October 2026</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">$39.99</span><span class="stat-k">US price, 0% discount, read 2 October 2026</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">14</span><span class="stat-k">languages listed, English the only one with full audio, read 2 October 2026</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">10</span><span class="stat-k">achievements on the app, read 2 October 2026</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
</div>

<h2>The live reading, and the endpoint behind it</h2>

<p>WARDOGS is Steam app <strong>1867240</strong>, and Valve exposes exactly one live figure for it to anyone with a browser: how many people have it running. The endpoint is <code>api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=1867240</code>, the response is one JSON field, and it needs no key and no sign-in (<a href="https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=1867240">Steam Web API</a>, read 2 October 2026). At 00:03 UTC on 2 October 2026 it returned <strong>160,481</strong> (read 2 October 2026).</p>

<p>What that counts is accounts, not bodies on a map. The menu, the trader, the deployment screen and the login queue are all inside the figure, and the response tells you nothing about which of those an account is sitting in. For the size of that gap, and for the three competing peak figures that get quoted as if they were one number, <a href="/wardogs-player-count">the player count page</a> has the readings; this page stays on the Steam side of it.</p>

<p class="src">One live figure, read once. Everything else on this page is a reading of a page that changes on its own schedule, and every line carries the day it was read. Valve publishes no history for this endpoint, so there is no official peak and no official chart to compare a reading against — that gap is listed under what is still not recorded, at the bottom.</p>

<h2>What the Steam page states today</h2>

<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="listing-caption">
<table class="matrix">
<caption id="listing-caption">Read from Valve's own two surfaces on 2 October 2026: the <a href="https://store.steampowered.com/api/appdetails?appids=1867240&amp;cc=us&amp;l=english">appdetails API for app 1867240</a> and the <a href="https://store.steampowered.com/app/1867240/WARDOGS/">store page</a> itself.</caption>
<thead><tr><th scope="col">Field</th><th scope="col">What the listing states</th><th scope="col" class="num">Read on</th></tr></thead>
<tbody>
<tr><td>App id</td><td class="wrap-cell">1867240</td><td class="num">2 Oct 2026</td></tr>
<tr><td>Release</td><td class="wrap-cell">10 September 2026, into Steam Early Access</td><td class="num">2 Oct 2026</td></tr>
<tr><td>Developer</td><td class="wrap-cell">BULKHEAD</td><td class="num">2 Oct 2026</td></tr>
<tr><td>Publisher</td><td class="wrap-cell">Team17</td><td class="num">2 Oct 2026</td></tr>
<tr><td>Genres</td><td class="wrap-cell">Five, in Valve's own order: Action, Indie, Massively Multiplayer, Simulation, Early Access</td><td class="num">2 Oct 2026</td></tr>
<tr><td>Categories</td><td class="wrap-cell">Eight: Multi-player, PvP, Online PvP, Steam Achievements, Camera Comfort, Custom Volume Controls, Stereo Sound, Surround Sound</td><td class="num">2 Oct 2026</td></tr>
<tr><td>Platforms</td><td class="wrap-cell">Windows. The macOS and Linux flags both read false, and there is no controller-support category on the listing.</td><td class="num">2 Oct 2026</td></tr>
<tr><td>Price</td><td class="wrap-cell">$39.99 in the US, discount 0%</td><td class="num">2 Oct 2026</td></tr>
<tr><td>Reviews</td><td class="wrap-cell">88,035 on the listing, graded Very Positive overall, with 80% of the 58,484 English-language reviews positive</td><td class="num">2 Oct 2026</td></tr>
<tr><td>Languages</td><td class="wrap-cell">14 listed, English the only one carrying full audio</td><td class="num">2 Oct 2026</td></tr>
<tr><td>Achievements</td><td class="wrap-cell">10</td><td class="num">2 Oct 2026</td></tr>
<tr><td>Anti-cheat and DRM</td><td class="wrap-cell">The feature block reads "Uses Kernel Level Anti-Cheat" and names Elytra; the page also requires agreement to a third-party EULA</td><td class="num">2 Oct 2026</td></tr>
<tr><td>Deck compatibility</td><td class="wrap-cell">The embedded hardware-compatibility payload returns the does-not-support token for the Deck, for SteamOS and for Steam Machine; no Verified or Playable badge appears</td><td class="num">2 Oct 2026</td></tr>
<tr><td>Age</td><td class="wrap-cell">No required age</td><td class="num">2 Oct 2026</td></tr>
</tbody>
</table>
</div>

<p>Two of those rows move on their own. The review count is worth watching against the reading taken for the reviews page on 28 September 2026, which was 51,079 English reviews inside 76,407 across all languages (<a href="/wardogs-reviews">the reviews page</a>, read 28 September 2026). Four days later the English count is 58,484 and the listing total is 88,035 (read 2 October 2026). The price row has not moved at all: still $39.99, still no discount, four days after the 3-million-copies post.</p>

<p class="src">One caveat on the review line, because it decides which number you get. The store page prints a count "in your language" for whoever is asking, so this figure is the English-language review set, and this machine resolves to the Japanese storefront with English as the chosen language (read 2 October 2026). A reader on another storefront will see a different subset. The 88,035 total is what the listing itself counts across every language.</p>

<h2>What changed on Steam this week</h2>

<p>Every timestamp below is taken from the game's own news feed on Steam and read on 2 October 2026 (<a href="https://store.steampowered.com/news/app/1867240">official Steam news</a>, read 2 October 2026). The feed carries 61 posts in total.</p>

<ul>
<li><strong>30 September — Update 0.1.2.</strong> A maintenance window opened at 08:00 UTC to deploy it. The patch goes after cash and XP exploits, fixes the Windows 11 WD-L020 crash caused by update KB5124010, and rebuilds the way you pick a server: "Hit deploy and choose Official, Community, Infantry Mode or Low-Level servers", in the studio's words. Enforcement is stated in the same post — leniency for first-time offenders "is now over", and repeat abuse "risks being permanently banned without warning". The post closes by saying Season 02 is planned as a larger content update and that more information was dropping "next week".</li>
<li><strong>26 September — 3 million copies.</strong> "3 million copies sold in just over 2 weeks since launching into Early Access", alongside a Golden Joystick Awards nomination for Best Early Access Game 2026, which is community-voted.</li>
<li><strong>22 September — Season 02 gets a date.</strong> A teaser post puts Season 02 on 15 October 2026. No content list accompanies it.</li>
<li><strong>19 September — Steam Family Sharing switched off.</strong> This one is a report rather than a studio post: the entry on the game's Steam feed is syndicated from PCGamesN, which says the studio turned Family Sharing off and quotes its chief executive calling the $40 price tag "the best anti-cheat". Nothing in the studio's own posts confirms or reverses it.</li>
<li><strong>Every week — a top-sellers post.</strong> The feed carries a weekly Steam Global Top Sellers entry built on SteamDB's charts. The newest covers the week of 22–29 September 2026.</li>
</ul>

<h2>Who else publishes WARDOGS Steam numbers</h2>

<p>Five places show up when you go looking for these figures, and they are not interchangeable.</p>

<ul>
<li><strong>wardogs.site</strong> — the field guide. Twenty-seven URLs, which is nine pages in each of three languages, and the pages are the game at a system level: gameplay, classes, system requirements, release date, price, the September beta (<a href="https://wardogs.site/">site map</a>, read 2 October 2026). There is no player-count page and nothing that follows the listing.</li>
<li><strong>wardogs.wiki</strong> — the item database. Searching it for "steam", "players" and "concurrent" returns zero results, and the factions category holds no entries (<a href="https://wardogs.wiki/api.php?action=query&amp;list=search&amp;srsearch=steam&amp;format=json">MediaWiki API</a>, read 2 October 2026). A live figure has nowhere to live in a catalogue of items.</li>
<li><strong>wardogshub.gg</strong> — the one that reads the number for itself and keeps a record. Its player-count page hits Valve's endpoint on every load and files the results: an Early Access peak of 428,666 at 19:44 UTC on 13 September 2026, plus two beta peaks on a separate app. It labels each figure and dates it. Its 00:05 UTC reading on 2 October was 160,133, two minutes after ours (<a href="https://wardogshub.gg/player-count/">hub player count</a>, read 2 October 2026).</li>
<li><strong>SteamDB</strong> — third-party charts, and the origin of the 428,666 peak that most coverage quotes. Its chart pages could not be read from this machine on 2 October 2026: the site requires a sign-in and returns an access restriction for this network. What can be read is that Valve's own feed for this game republishes it — 8 of the 61 posts are SteamDB posts, including the 13 September one announcing the peak (<a href="https://store.steampowered.com/news/app/1867240">official Steam news</a>, read 2 October 2026).</li>
<li><strong>Reddit</strong> — where the players are and where none of the numbers are. r/WarDogs answered this machine with HTTP 403 on 2 October 2026, so the threads quoted on this site are the ones read on 28 September 2026 and are dated that way where they appear. The sentiment can only be quoted in words: under the returning-player thread of 30 September 2026, the most-upvoted reply treats the coming wave of teardown videos as a genre rather than a forecast (read 28 September 2026).</li>
</ul>

<p class="src">What the five have in common is what this page is for. None of them prints a figure next to the day it was read and the interface it came from, sorts the facts into confirmed and unconfirmed, and then writes down what nobody has published. That last part is the one that costs something: a blank space is harder to ship than a guess.</p>

<h2>Every claim on this page, sorted</h2>

<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="layers-caption">
<table class="matrix">
<caption id="layers-caption">Every claim on this page, sorted. Read 2 October 2026.</caption>
<thead><tr><th scope="col">Layer</th><th scope="col">What is in it</th></tr></thead>
<tbody>
<tr><td>Confirmed officially</td><td class="wrap-cell">160,481 accounts at 00:03 UTC on 2 October 2026 (Steam Web API, app 1867240). 88,035 reviews and a Very Positive grade; 80% of 58,484 English-language reviews positive. $39.99 with a 0% discount. Windows the only platform. 14 languages, English the only one with full audio. 10 achievements. Release on 10 September 2026, from BULKHEAD, published by Team17. Update 0.1.2 and its 08:00 UTC maintenance window. Season 02 dated 15 October 2026. 3 million copies, in the studio's own post of 26 September 2026. Valve's does-not-support token for the Deck, SteamOS and Steam Machine, and the store's own "Uses Kernel Level Anti-Cheat" line.</td></tr>
<tr><td>Read off third parties</td><td class="wrap-cell">160,133 at 00:05 UTC on 2 October 2026, and the 428,666 peak of 13 September 2026 (wardogshub.gg). 428,666 in SteamDB's own post on the game's Steam feed. The removal of Steam Family Sharing and the "best anti-cheat" line (PCGamesN, carried on the same feed). The 28 September 2026 review readings, 51,079 English inside 76,407 overall, and the Reddit sentiment quoted above.</td></tr>
<tr><td>Calculated here, not published anywhere</td><td class="wrap-cell">348 = 160,481 − 160,133, the distance between two readings two minutes apart. 31 of 61 posts on the game's Steam feed are third-party, made up of SteamDB 8, PCGamesN 14, PlayGround.ru 6, GamingOnLinux 2 and Rock, Paper Shotgun 1, leaving 30 that are the studio's own. Both are our arithmetic on figures read on 2 October 2026.</td></tr>
<tr><td>Not confirmed</td><td class="wrap-cell">How many of the 160,481 accounts were inside a match. Whether Steam Family Sharing will come back, or whether the change was permanent. What Season 02 contains beyond its date. Whether any further price change is planned before 1.0.</td></tr>
</tbody>
</table>
</div>

<p>The other list is the one that is usually left out — the things nobody has published at all, checked on 2 October 2026 and written down as blanks rather than guesses:</p>

<ul>
<li><strong>Concurrency history from Valve.</strong> The endpoint says how many are playing now and nothing else. There is no official peak, no official chart and no official series, and the nearest thing to an official peak statement is the studio's own maintenance post of 12 September 2026 thanking players for helping it pass "400,000 Peak Concurrent Users" — a round figure for the launch week, not a measurement anyone can re-read (<a href="https://store.steampowered.com/news/app/1867240">official Steam news</a>, read 2 October 2026).</li>
<li><strong>A review total broken out by language.</strong> The listing prints the overall total and the "in your language" subset, and nothing in Valve's API gives you the third column — how many reviews sit in each of the other 13 languages.</li>
<li><strong>A 1.0 price.</strong> The Early Access notes say the price rises toward release. No figure has been printed, so any page quoting one is quoting something that does not exist yet.</li>
<li><strong>Linux, Proton and Deck support.</strong> The listing returns does-not-support and the developer says Proton work continues. Where that work stands is not published.</li>
<li><strong>A complete Season 02 contents list.</strong> The teaser gives a date. Update 0.1.2 says the following week would carry more. As of 2 October 2026 nothing further had been posted.</li>
</ul>

<div class="qa">
<h2>Common questions</h2>
${faqHtml}
<p class="src">Where these figures come from: the <a href="https://store.steampowered.com/app/1867240/WARDOGS/">WARDOGS store page</a> and the <a href="https://store.steampowered.com/api/appdetails?appids=1867240&amp;cc=us&amp;l=english">appdetails API</a> for the listing, price, review counts, platform flags, languages, achievements and compatibility tokens; the <a href="https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=1867240">Steam Web API</a> for the live count; the <a href="https://store.steampowered.com/news/app/1867240">official Steam news feed</a> for the patch, the dates and the sales posts. All read on 2 October 2026. The 28 September 2026 readings are the ones carried over from <a href="/wardogs-reviews">the reviews page</a>, and r/WarDogs was unreadable from this machine on 2 October 2026.</p>
</div>

${adUnit}

<div class="readnext">
<p><a href="/wardogs-release-date">When WARDOGS released, and every date since &rarr;</a></p>
<p><a href="/wardogs-player-count">How many people play WARDOGS, and how many are actually in a match &rarr;</a></p>
<p><a href="/wardogs">The hub: scoring, kit prices and what runs the game &rarr;</a></p>
<p><a href="/wardogs-reviews">What the Steam reviews say, and why the all-language grade is lower &rarr;</a></p>
<p><a href="/wardogs-steam-deck">Does WARDOGS run on the Steam Deck? Valve's own answer &rarr;</a></p>
<p><a href="/wardogs-price">What Steam charges in eight countries &rarr;</a></p>
</div>`,
};
