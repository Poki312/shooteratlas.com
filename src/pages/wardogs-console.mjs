// The console page. One question — is WARDOGS on a console — and the whole of
// the answer as of 4 October 2026: the year the studio put on it, the two
// console listings that are already up, and the fields those listings carry
// that no other page on this site prints.
//
// Three things this page will not do.
//
// 1. It will not turn "consoles in 2028" into a date. Neither console listing
//    carries a month or a day, and one of them carries no release field at all.
//
// 2. It will not read the store tags as promises. Microsoft's listing carries
//    the tag "Xbox cross-platform multiplayer"; that is a store's taxonomy,
//    and the studio has published nothing about crossplay either way.
//
// 3. It will not repeat the PS5 page. The PS5 side — the Sony concept page and
//    the route some players are using on an Xbox in the meantime — has its own
//    page, and this one links to it rather than rewriting it.
//
// Every figure carries the day it was read. The live one comes from
// src/data/live.mjs, the one file on this site where a reading like that is
// written down.
import { adUnit } from "../ad.mjs";
import { faqList } from "../faq.mjs";
import { live } from "../data/live.mjs";

const READ_DAY = "4 October 2026";
const READ = "read " + READ_DAY;
const READ_WINDOW = "between 00:04 and 00:07 UTC on 4 October 2026";
const FAQ_POSTED = "9 February 2026";
const FAQ_EDITED = "10 September 2026";
const LAUNCH_POST = "10 September 2026";

const P = live.wardogsPlayerCount;
const S = live.wardogsStoreSurface;

const FAQ_URL =
  "https://steamcommunity.com/app/1867240/discussions/0/762932533852726673/";
const NEWS_URL = "https://store.steampowered.com/news/app/1867240";
const APP_URL = "https://store.steampowered.com/app/1867240/WARDOGS/";
const APP_API =
  "https://store.steampowered.com/api/appdetails?appids=1867240&amp;cc=us&amp;l=english";
const PS_URL = "https://store.playstation.com/en-us/concept/10020847";
const XBOX_URL = "https://www.xbox.com/en-US/games/store/wardogs/9p55z0jjgvwn";
const LIVE_URL =
  "https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=1867240";

const faqs = [
  {
    q: "Is WARDOGS on console?",
    a: `Not yet. There is no console build on sale, and the only console date that exists is a year: the studio&rsquo;s pinned Q&amp;A says &ldquo;The game is currently being developed for PC. Launching on consoles in 2028&rdquo;, and the launch-day post on the game&rsquo;s Steam feed carries the line &ldquo;COMING TO CONSOLES IN 2028&rdquo; (<a href='${FAQ_URL}'>official pinned Q&amp;A</a>, posted ${FAQ_POSTED}, last edited ${FAQ_EDITED}; <a href='${NEWS_URL}'>official Steam news</a>, ${LAUNCH_POST}) &mdash; read ${READ_DAY}. Both console stores have listings up, and neither one sells anything.`,
  },
  {
    q: "When is the WARDOGS console release date?",
    a: `No month and no day exist. Sony&rsquo;s listing holds the release in a field its own data types as a year, valued ${S.psStoreYear}, and prints the state ${S.psStoreState} with a wishlist button instead of a buy button (<a href='${PS_URL}'>PlayStation Store listing</a>, ${READ}). Microsoft&rsquo;s listing carries no release-date field at all (<a href='${XBOX_URL}'>Xbox store listing</a>, ${READ}). The date that is fixed belongs to the PC build and has already passed: 10 September 2026 (<a href='${APP_API}'>Steam appdetails API</a>, ${READ}).`,
  },
  {
    q: "Will WARDOGS be on Xbox?",
    a: `Microsoft has a page for it. The listing is titled &ldquo;Buy WARDOGS&rdquo;, credited to BULKHEAD and published by Team17 Digital Ltd, filed under ${S.xboxStoreOptimised}, rated ESRB MATURE 17+, and carries a player count of 2 to 100 (<a href='${XBOX_URL}'>Xbox store listing</a>, ${READ}). Its own availability field reads Out of Stock, it shows no price, and it carries no release date &mdash; so it is a page you can look at rather than a version you can buy.`,
  },
  {
    q: "Is WARDOGS crossplay?",
    a: `There is no crossplay answer from the studio, and this page will not turn a store tag into one. Valve&rsquo;s listing returns ${S.categoryCount} category rows &mdash; ${S.categories.join(", ")} &mdash; and not one of them is a cross-platform row (${READ}), while Microsoft&rsquo;s listing carries the feature line &ldquo;Xbox cross-platform multiplayer&rdquo; (${READ}). That is Microsoft&rsquo;s own store taxonomy, not a studio statement, and it does not say which two platforms would meet.`,
  },
  {
    q: "Can you play WARDOGS on a console right now?",
    a: `Not with anything Sony or Microsoft sells. No console build is for sale, and the studio&rsquo;s own playtest route is a PC one: the pinned Q&amp;A sends players to FirstLook for a signup and then to the game&rsquo;s Discord for a waiting list (<a href='${FAQ_URL}'>official pinned Q&amp;A</a>, ${READ}). Players have reported a way to run the PC build on an Xbox through a cloud service in the console&rsquo;s browser; that route, its three limits and the day they were read are set out on <a href='/wardogs-game-ps5'>the PS5 page</a> rather than repeated here.`,
  },
  {
    q: "Is there a WARDOGS console beta?",
    a: `None has been announced. Every beta the studio has posted about runs on the Steam build: the feed carries the Pre-Alpha Announcement of 7 June 2026, the Closed Beta Schedule of 20 August, Beta Recap &amp; Next Steps on 24 August, Closed Beta 02 on 1 September and &ldquo;THE CLOSED BETA IS NOW AN OPEN BETA!&rdquo; on 5 September (<a href='${NEWS_URL}'>official Steam news</a>, ${READ}). No console store page carries a beta or demo button (<a href='${PS_URL}'>PlayStation Store listing</a> and <a href='${XBOX_URL}'>Xbox store listing</a>, ${READ}).`,
  },
  {
    q: "How many players will a console match hold?",
    a: `The three sources disagree, and where they disagree this page prints both figures rather than picking one. Sony&rsquo;s listing says &ldquo;Supports up to 99 online players with PS Plus&rdquo; and separately &ldquo;99 network players&rdquo; (<a href='${PS_URL}'>PlayStation Store listing</a>, ${READ}); Microsoft&rsquo;s says &ldquo;Online multiplayer (2-100)&rdquo; (<a href='${XBOX_URL}'>Xbox store listing</a>, ${READ}); the studio&rsquo;s own pinned Q&amp;A and Valve&rsquo;s listing both work from 100 (<a href='${FAQ_URL}'>official pinned Q&amp;A</a>, ${READ}). Nothing official explains the difference of one.`,
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
        { "@type": "ListItem", position: 3, name: "Console", item: SITE + "/wardogs-console" },
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
      url: SITE + "/wardogs-console",
      applicationCategory: "Game",
      gamePlatform: "PC (Windows); consoles announced for 2028, no build on sale",
      author: { "@type": "Organization", name: "BULKHEAD" },
      publisher: { "@type": "Organization", name: "Team17" },
      sameAs: [
        "https://store.steampowered.com/app/1867240/WARDOGS/",
        PS_URL,
        XBOX_URL,
      ],
    },
  ],
};

const faqHtml = faqList(faqs);

export const page = {
  ogImage: "https://shooteratlas.com/assets/img/wardogs-console.png",
  source: "src/pages/wardogs-console.mjs",
  path: "/wardogs-console",
  title: "WARDOGS console — two store pages up, 2028 and no price",
  description:
    "2028 is the only console date either store prints for WARDOGS. Sony's listing is Announced, with a year field and no price; Microsoft's reads Out of Stock with no release date at all. Both listings read field by field on 4 October 2026, plus the live number that only exists for the PC build.",
  extraHead:
    "<script type='application/ld+json'>" + JSON.stringify(schema) + "</script>",
  body: `<h1>WARDOGS console — two store pages up, 2028 and no price</h1>

<p class="lede">Nothing here is on sale on a console, and no source prints a console day, a console month or a console price. <strong>2028 is the whole of the date,</strong> and it comes from the studio: the pinned Q&amp;A on the game's Steam forum reads &ldquo;The game is currently being developed for PC. Launching on consoles in 2028. Controller support is limited in the current version&rdquo; (<a href='${FAQ_URL}'>official pinned Q&amp;A</a>, posted ${FAQ_POSTED}, last edited ${FAQ_EDITED}, read ${READ_DAY}), and the launch-day post on the same feed carries the line &ldquo;COMING TO CONSOLES IN 2028&rdquo; (<a href='${NEWS_URL}'>official Steam news</a>, ${LAUNCH_POST}, read ${READ_DAY}). Two console stores already have pages up: Sony's prints the state <strong>${S.psStoreState}</strong> with a wishlist button and a year field holding ${S.psStoreYear}, and Microsoft's is filed under <strong>${S.xboxStoreOptimised}</strong> with an availability field reading <strong>Out of Stock</strong> (both read ${READ_DAY}).</p>

<p>How to read this page. Every figure carries the day it was read, and the two console listings are read here field by field rather than summarised, because the fields are the part nobody else prints. Where two sources disagree &mdash; they do, on the player count &mdash; both are printed. Where no source states something, this page writes that down as a blank instead of filling it. The readings below were taken ${READ_WINDOW}.</p>

<div class="strip">
<div><span class="stat-n">${S.psStoreYear}</span><span class="stat-k">consoles, the studio's own year, ${READ_DAY}</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">${S.psStoreState}</span><span class="stat-k">the state Sony's listing prints, ${READ_DAY}</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">Out of Stock</span><span class="stat-k">Microsoft's own availability field, ${READ_DAY}</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">${P.countText}</span><span class="stat-k">accounts with WARDOGS open on Steam, ${P.timeShort}, ${READ_DAY}</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
</div>

<h2>The one live number, and why there is no console version of it</h2>

<p>Valve publishes exactly one live figure for this game: how many accounts have it open. The endpoint is <code>api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=1867240</code>, it needs no key and no sign-in, and at ${P.timeFull} it returned <strong>${P.countText}</strong> (<a href='${LIVE_URL}'>Steam Web API</a>, read ${READ_DAY}).</p>

<p>That is the only live reading that exists for WARDOGS, and it is a PC reading by construction: the endpoint is keyed to a Steam app id, and Steam is where the PC build lives. Neither console store publishes an equivalent field, and neither one could &mdash; Sony's listing has not opened for sale and Microsoft's availability field reads Out of Stock (<a href='${PS_URL}'>PlayStation Store listing</a> and <a href='${XBOX_URL}'>Xbox store listing</a>, read ${READ_DAY}). So there is no console number to put beside this one, and this page does not invent a way to estimate one. How the Steam figure relates to who is actually inside a match is worked through on <a href='/wardogs-player-count'>the player count page</a>.</p>

<p class="src">One live figure, read once, on the day the page was written. It is a snapshot, not a trend, and it is history by the time you read it.</p>

<h2>What platforms will WARDOGS be available on?</h2>

<p>The studio's own answer is three sentences long and this is all of it: &ldquo;The game is currently being developed for PC. Launching on consoles in 2028. Controller support is limited in the current version.&rdquo; It sits in a pinned question-and-answer thread on the game's Steam forum, posted ${FAQ_POSTED} and last edited on launch day, ${FAQ_EDITED} (<a href='${FAQ_URL}'>official pinned Q&amp;A</a>, read ${READ_DAY}).</p>

<p>Read off the two console stores, the same answer becomes two pages and no dates. Sony's listing for the game exists as a PlayStation <strong>PS5 Version</strong>, filed under the state ${S.psStoreState}, with a wishlist button where a buy button would be, a release field holding ${S.psStoreYear}, and a compatibility block reading &ldquo;PS Plus required for online play&rdquo; and &ldquo;Supports up to 99 online players with PS Plus&rdquo; (<a href='${PS_URL}'>PlayStation Store listing</a>, read ${READ_DAY}). Microsoft's listing is filed under ${S.xboxStoreOptimised}, rated ESRB MATURE 17+, and carries the feature line &ldquo;Online multiplayer (2-100)&rdquo; (<a href='${XBOX_URL}'>Xbox store listing</a>, read ${READ_DAY}).</p>

<p>On Valve's side the platform block names one system and no console: <code>windows true</code>, <code>mac false</code>, <code>linux false</code> (<a href='${APP_API}'>Steam appdetails API</a>, read ${READ_DAY}). The store page behind it also carries three console fields of its own, and all three are unset:</p>

<blockquote>bHasXbox: null, bHasPS4: null, bHasPS5: null, bHasOther: false</blockquote>

<p>Decoded, that is Valve's listing declining to name any console at all &mdash; not a denial that console versions are planned, and not evidence that they are. The console timetable belongs to the studio's own sentence and to the two store pages, and none of those three names a quarter.</p>

<p>One more field is worth printing next to the platform question, because it is what a future console player will actually touch. Valve's store page carries a controller-support payload, and every controller value in it is false:</p>

<blockquote>bFullXboxControllerSupport: false, bPartialXboxControllerSupport: false, bPS4ControllerSupport: false, bPS5ControllerSupport: false, bSteamInputAPISupport: false, bNoKeyboardSupport: false, bGamepadPreferred: false, bControllerSupportWizardComplete: true</blockquote>

<p>That is the PC listing's own record, read ${READ_DAY}, and it lines up with the studio's sentence: controller support in the current version is limited. What Steam does and does not say about pads, and how the studio's own statements read beside it, is written up on <a href='/wardogs-genres'>the genres and specs page</a>; this page prints the payload only because the console question is where it becomes relevant.</p>

<h2>wardogs console release date</h2>

<p>There is a year, and the way it is stored is the evidence that there is nothing finer. Sony's listing keeps the release in a typed field: its type is <code>YEAR</code> and its value is <code>2028-12-31T00:00:00Z</code> (<a href='${PS_URL}'>PlayStation Store listing</a>, read ${READ_DAY}). That date is a placeholder for a year, not a New Year's Eve release, and the same listing prints it to a reader as a year and nothing else. There is no month, no quarter, no window inside 2028 and no pre-order.</p>

<p>Microsoft's listing is further from a date still: it carries no release-date field at all, its pre-order flag reads false and its availability reads Out of Stock (<a href='${XBOX_URL}'>Xbox store listing</a>, read ${READ_DAY}). The studio's own lines give the year and stop there (<a href='${FAQ_URL}'>official pinned Q&amp;A</a> and <a href='${NEWS_URL}'>official Steam news</a>, read ${READ_DAY}).</p>

<p>The date that is genuinely fixed belongs to the PC build and it has passed: Valve's store data gives the release as 10 September 2026 (<a href='${APP_API}'>Steam appdetails API</a>, read ${READ_DAY}). The unlock hour, the launch-day queue figures and the milestones since are collected on <a href='/wardogs-release-date'>the release date page</a>.</p>

<p class="src">A page that puts a month on the console release is putting it there itself. Nothing read for this page on ${READ_DAY} carries one.</p>

<h2>Wardogs game XBOX</h2>

<p>The Xbox page is the more complete of the two, and it is worth printing whole rather than in summary, because what it lacks is as informative as what it holds.</p>

<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="xbox-caption">
<table class="matrix">
<caption id="xbox-caption">Microsoft's own listing for WARDOGS, field by field, read on ${READ_DAY} (<a href='${XBOX_URL}'>Xbox store listing</a>).</caption>
<thead><tr><th scope="col">Field</th><th scope="col">What Microsoft's listing states</th><th scope="col" class="num">Read on</th></tr></thead>
<tbody>
<tr><td>Title</td><td class="wrap-cell">Buy WARDOGS</td><td class="num">4 Oct 2026</td></tr>
<tr><td>Publisher</td><td class="wrap-cell">Team17 Digital Ltd</td><td class="num">4 Oct 2026</td></tr>
<tr><td>Developer credited</td><td class="wrap-cell">BULKHEAD</td><td class="num">4 Oct 2026</td></tr>
<tr><td>Platform</td><td class="wrap-cell">${S.xboxStoreOptimised}, tagged Optimized for Xbox Series X|S</td><td class="num">4 Oct 2026</td></tr>
<tr><td>Age rating</td><td class="wrap-cell">ESRB MATURE 17+</td><td class="num">4 Oct 2026</td></tr>
<tr><td>Players</td><td class="wrap-cell">Online multiplayer (2-100); the player field runs from 2 to 100</td><td class="num">4 Oct 2026</td></tr>
<tr><td>Feature tags</td><td class="wrap-cell">Xbox cross-platform multiplayer, 4K Ultra HD, Optimized for Xbox Series X|S, Xbox achievements</td><td class="num">4 Oct 2026</td></tr>
<tr><td>Availability</td><td class="wrap-cell">Out of Stock; pre-order flag false</td><td class="num">4 Oct 2026</td></tr>
<tr><td>Price</td><td class="wrap-cell">No price shown</td><td class="num">4 Oct 2026</td></tr>
<tr><td>Release date</td><td class="wrap-cell">No release-date field on the page</td><td class="num">4 Oct 2026</td></tr>
</tbody>
</table>
</div>

<p>Two lines in that table are read differently by different readers, so both readings are named here. The cross-platform tag is the store's own label and not a studio statement &mdash; it appears in the same list as 4K Ultra HD and Xbox achievements, which is the list a store fills in. And the 2-to-100 player field is Microsoft's figure for the product; Sony's page for the same game says 99, and the studio's own material works from 100 (<a href='${PS_URL}'>PlayStation Store listing</a>, <a href='${FAQ_URL}'>official pinned Q&amp;A</a>, read ${READ_DAY}). One of the three is a rounding of another, and no source says which.</p>

<h2>wardogs console crossplay</h2>

<p>Crossplay is a blank, and it is worth separating the blank from the labels that sit near it. Valve's listing returns ${S.categoryCount} category rows and none is a cross-platform row (${READ}), which records what we did not read on the PC listing rather than a statement from anyone. The studio's console announcement and its pinned Q&amp;A say nothing about crossplay in either direction (<a href='${FAQ_URL}'>official pinned Q&amp;A</a>, read ${READ_DAY}), and Sony's listing says nothing about it either (read ${READ_DAY}).</p>

<p>Microsoft's listing does carry a line, and it is the only one: &ldquo;Xbox cross-platform multiplayer&rdquo; (<a href='${XBOX_URL}'>Xbox store listing</a>, read ${READ_DAY}). Printed carefully, that is a tag about Microsoft's own ecosystem rather than a promise about this game's servers, and it does not say whether it means Xbox and Steam, Xbox and the Xbox PC app, or Xbox and PlayStation. There is also no cross-progression answer anywhere: whether the cash balance that persists between PC matches follows a player to a console has not been stated by the studio, which is a different question from shared servers and is recorded here as a second blank (<a href='${FAQ_URL}'>official pinned Q&amp;A</a>, read ${READ_DAY}).</p>

<h2>wardogs console beta</h2>

<p>Google suggests this phrase, so its answer is worth stating: no console beta has been announced, and every test the studio has run so far ran on the Steam build. The feed carries five posts in that chain, each with its own date: the Pre-Alpha Announcement of 7 June 2026, the Closed Beta Schedule of 20 August, Beta Recap &amp; Next Steps on 24 August, Closed Beta 02 on 1 September, and the open-beta post of 5 September (<a href='${NEWS_URL}'>official Steam news</a>, read ${READ_DAY}).</p>

<p>The studio's own instructions for getting into a test also point at the PC: the pinned Q&amp;A names FirstLook as the signup service and, on completion, puts the player on a waiting list and into the game's Discord (<a href='${FAQ_URL}'>official pinned Q&amp;A</a>, read ${READ_DAY}). Neither console listing carries a beta or demo button; Sony's is a wishlist page and Microsoft's reads Out of Stock (read ${READ_DAY}). The playtest's own history and the Windows-side badges are a different page's subject, and <a href='/wardogs-steam'>the Steam page</a> holds that reading.</p>

<h2>wardogs console reddit</h2>

<p>The question people ask in their own words, rather than in search syntax, is the one the community keeps posting: whether a console version is coming and when. Three phrasings were read from the game's own subreddit on 3 October 2026 &mdash; &ldquo;Console release?&rdquo;, &ldquo;Console in the future?&rdquo; and &ldquo;Will WARDOGS come to console?&rdquo; The most that can be said about them is that they keep being asked: the studio's own two lines, the year and the PC-only state of the build, are the whole of what any of them can be answered with.</p>

<p>This machine could not re-read Reddit on ${READ_DAY}: old.reddit.com answered the request with HTTP 403, and the same block hit the site when this project tried it on 2 and 3 October 2026. The thread phrasings above therefore carry the 3 October reading rather than today's. That is also why no reply is quoted here and no vote count appears: on threads like these the reply worth reading is the one that was voted to the top, and a vote total is a number that has moved by the time anyone reads it.</p>

<h2>What happened this week</h2>

<p>None of it is console news, and the reason to print it is that console players asking &ldquo;is this game alive&rdquo; are really asking whether the PC build is being maintained while they wait. Every timestamp is from the game's own Steam feed, read ${READ_DAY} (<a href='${NEWS_URL}'>official Steam news</a>).</p>

<ul>
<li><strong>2 October &mdash; two hotfixes in one day.</strong> A security and stability hotfix was announced for 08:00 UTC with an hour of expected downtime, and an IR Goggles &amp; CIWS balance hotfix followed at 15:39 UTC. The later post says the IR Rangefinders are being disabled in the vendor until Season 02, when they will need batteries, and that the CIWS now destroys the Havoc in about six seconds instead of twelve. No client download or downtime was needed for the second one (<a href='${NEWS_URL}'>official Steam news</a>, read ${READ_DAY}).</li>
<li><strong>30 September &mdash; update 0.1.2.</strong> A maintenance window at 08:00 UTC deployed fixes for cash and XP exploits, a fix for the Windows 11 crash the studio files as WD-L020, and UI changes the studio says are aimed at pushing traffic towards Infantry Mode and Low-Level servers (<a href='${NEWS_URL}'>official Steam news</a>, read ${READ_DAY}).</li>
<li><strong>26 September &mdash; three million copies and an award nomination.</strong> &ldquo;3 million copies sold in just over 2 weeks since launching into Early Access&rdquo;, alongside a Golden Joystick Awards nomination for Best Early Access Game 2026, which is community-voted (<a href='${NEWS_URL}'>official Steam news</a>, read ${READ_DAY}).</li>
<li><strong>22 September &mdash; Season 02 gets a date.</strong> The teaser post puts Season 02 on 15 October 2026 and carries no content list (<a href='${NEWS_URL}'>official Steam news</a>, read ${READ_DAY}).</li>
<li><strong>Every week &mdash; a top-sellers post.</strong> The feed carries a weekly Steam Global Top Sellers entry built on SteamDB's charts; the newest covers the week of 22&ndash;29 September 2026 (<a href='${NEWS_URL}'>official Steam news</a>, read ${READ_DAY}).</li>
</ul>

<h2>Who else answers the WARDOGS console question</h2>

<p>Five places show up when you go looking, and what each one holds is different enough to be worth naming before the blank list at the bottom.</p>

<ul>
<li><strong>wardogs.site</strong> &mdash; twenty-seven URLs, which is nine pages in each of three languages, and not one of them is a console page: the set covers release date, beta and playtest, price, classes, gameplay and system requirements (wardogs.site sitemap, read ${READ_DAY}). Its release-date page carries the PC date; the console question has no home there.</li>
<li><strong>wardogs.wiki</strong> &mdash; asked for console, Xbox, PlayStation, platform and PS5, the wiki's search API returns zero results for every one of the five terms (wardogs.wiki search API, read ${READ_DAY}). It is an item database, and a console release is not an item.</li>
<li><strong>wardogshub.gg</strong> &mdash; the only one of the three that has written this up, and it has done it four times over: a consoles page it dates to 5 August 2026 and last updated 23 September 2026, a crossplay page, and two console news posts. Its consoles page cites the Xbox listing and dates the console year to the studio's own launch-day line. What it does not carry is Sony's PlayStation listing: no reading of that page appears on its consoles or crossplay pages (wardogshub.gg consoles page and crossplay page, read ${READ_DAY}), which is why the Sony fields above are printed field by field here.</li>
<li><strong>SteamDB</strong> &mdash; no help on the console question at all, and not readable from this machine either: its chart pages answered with HTTP 403 on ${READ_DAY}, the same block it has returned all week. Anything quoted from it here would be quoted from a page we could not open.</li>
<li><strong>Reddit</strong> &mdash; where the questions are and where the answers are not, and unreadable from this machine today: HTTP 403 on ${READ_DAY}. The thread phrasings on this page are dated 3 October 2026 for that reason.</li>
</ul>

<p class="src">What the five have in common is the gap this page is for. None of them prints both console listings field by field beside the day each field was read, and none of them separates what the studio confirmed from what a store's own taxonomy says. The 99-versus-100 player line is the clearest example: all three sources are plain on their own pages and nobody puts them side by side.</p>

<h2>Every claim on this page, sorted</h2>

<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="layers-caption">
<table class="matrix">
<caption id="layers-caption">Every claim on this page, sorted. Read ${READ_DAY}.</caption>
<thead><tr><th scope="col">Layer</th><th scope="col">What is in it</th></tr></thead>
<tbody>
<tr><td>Confirmed officially</td><td class="wrap-cell">Consoles are dated 2028 and no finer, in the studio's pinned Q&amp;A and in its launch-day post (posted ${FAQ_POSTED}, edited ${FAQ_EDITED}; post of ${LAUNCH_POST}). Sony's listing exists in the state ${S.psStoreState}, holds ${S.psStoreYear} in a field typed as a year, is wishlistable, and shows no price. Microsoft's listing exists under ${S.xboxStoreOptimised}, is rated ESRB MATURE 17+, carries a 2&ndash;100 player field and an Out of Stock availability field, and shows no price and no release date. Valve's platform block reads Windows true and macOS and Linux false, and the store page's three console fields are all unset. Valve's controller payload returns false for full and partial Xbox support, for PS4 and PS5 pads, for Steam Input API support and for gamepad-preferred, with the configuration wizard complete. The Steam live reading of ${P.countText} at ${P.timeFull}. The dates of the two 2 October hotfixes, update 0.1.2 on 30 September, three million copies and the nomination on 26 September, and Season 02 on 15 October 2026.</td></tr>
<tr><td>Read off third parties or store labels</td><td class="wrap-cell">Microsoft's &ldquo;Xbox cross-platform multiplayer&rdquo; tag, which is the store's taxonomy rather than a studio statement. Sony's &ldquo;Supports up to 99 online players with PS Plus&rdquo; line, which is Sony's own printing of the product and disagrees with Microsoft's 2&ndash;100 and with the studio's 100. The community's three console questions, read from the game's subreddit on 3 October 2026. SteamDB and Reddit themselves were unreadable from this machine on ${READ_DAY} and are recorded as unread rather than paraphrased.</td></tr>
<tr><td>Calculated here, not published anywhere</td><td class="wrap-cell">The count of console platforms named on Valve's listing: zero, from three fields that return null and a fourth that returns false. The count of cross-platform rows in Valve's category list: zero, out of ${S.categoryCount}. The difference between the player figures: one, between Sony's 99 and the 100 the studio and Valve work from. All three are our arithmetic on tables read on ${READ_DAY}.</td></tr>
<tr><td>Not confirmed</td><td class="wrap-cell">Whether the PlayStation and Xbox versions arrive together or one before the other. Whether either carries the same content as the PC build at launch. Whether crossplay or cross-progression will exist, in any direction. What a console version will cost. Which of the three player counts is the game's own.</td></tr>
</tbody>
</table>
</div>

<p>The list that usually gets left out, checked on ${READ_DAY} and written down as blanks rather than guesses:</p>

<ul>
<li><strong>A console date finer than a year.</strong> No month, no quarter, no window and no pre-order date on any surface read for this page. Sony's listing stores the release as a year and the studio's own words are &ldquo;in 2028&rdquo;.</li>
<li><strong>A console price.</strong> Sony's listing shows no figure and no edition; Microsoft's shows no price and reads Out of Stock. The $39.99 on the PC listing belongs to a different store and is not carried across here.</li>
<li><strong>A console system requirement.</strong> Valve publishes minimum and recommended PC specifications. No console store page for this game publishes anything equivalent, because there is no console build to specify.</li>
<li><strong>An answer on crossplay, cross-progression or input-based matchmaking.</strong> The studio has said nothing in either direction, and the one store label that exists is Microsoft's own taxonomy.</li>
<li><strong>A console beta, demo or test of any kind.</strong> Every test to date ran on the Steam build, and neither console listing carries a test button.</li>
<li><strong>An explanation of the 99-versus-100 difference.</strong> Three official sources, two numbers, and nothing published that reconciles them.</li>
</ul>

<div class="qa">
<h2>Common questions</h2>
${faqHtml}
<p class="src">Sources for every figure above: the studio's <a href='${FAQ_URL}'>pinned Q&amp;A thread</a> on the game's Steam forum (posted ${FAQ_POSTED}, last edited ${FAQ_EDITED}); the <a href='${NEWS_URL}'>official Steam news feed</a>; <a href='${APP_URL}'>Valve's store page</a> and its <a href='${APP_API}'>appdetails API</a> for app 1867240; the <a href='${LIVE_URL}'>Steam Web API</a> for the live count; and the two console listings themselves, <a href='${PS_URL}'>Sony's</a> and <a href='${XBOX_URL}'>Microsoft's</a>. All read on ${READ_DAY}.</p>
</div>

<figure class="pagefig"><picture><source media="(prefers-color-scheme: light)" srcset="/assets/img/wardogs-console-light.png"><img src="/assets/img/wardogs-console.png" width="1200" height="630" alt="WARDOGS console card: 2028 as the only console date, two store listings up, and no price on either"></picture><figcaption>Drawn for this page, dark or light to match. Figures as read on ${READ_DAY}.</figcaption></figure>

${adUnit}

<div class="readnext">
<p><a href="/wardogs-game-ps5">The PS5 side of it: Sony's listing, and the route players are using on an Xbox &rarr;</a></p>
<p><a href="/wardogs-steam">The Steam listing read field by field, with the date each line was read &rarr;</a></p>
<p><a href="/wardogs-player-count">The live Steam count, and how many of those accounts are in a match &rarr;</a></p>
<p><a href="/wardogs-release-date">The PC release date, the 16:00 UTC unlock hour and the launch queue &rarr;</a></p>
<p><a href="/wardogs-genres">Five genres, eight categories, Windows only, and what Steam says about controllers &rarr;</a></p>
<p><a href="/wardogs-price">What WARDOGS costs in eight Steam regions &rarr;</a></p>
</div>`,
};
