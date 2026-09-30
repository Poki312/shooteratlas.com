// One array drives both the visible questions and the FAQPage JSON-LD, so the
// structured data can never drift from what a reader can open on the page.
const faqs = [
  {
    q: "When did WARDOGS come out?",
    a: "WARDOGS entered Steam Early Access on 10 September 2026, on Windows. Valve's own store data gives the release date as \"Sep 10, 2026\" and lists no other platform (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store listing</a>, read 30 September 2026). It is still in Early Access: the next dated milestone is Season 2 on 15 October 2026.",
  },
  {
    q: "What time did WARDOGS unlock?",
    a: "16:00 UTC, which is 12:00 on the US east coast, 09:00 on the US west coast and 17:00 in the UK. That hour is the studio's own wording: the launch trailer it publishes carries the line \"Global Early Access Release TODAY | 16:00 UTC / 12:00 EDT\" (<a href='https://wardogs.com/'>wardogs.com</a>, read 30 September 2026). Valve's store listing prints the day only, and the local times in the table above are our arithmetic on the studio's 16:00 UTC.",
  },
  {
    q: "When does WARDOGS leave Early Access?",
    a: "There is no date. The Early Access Q&amp;A block on the <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>store page</a> says the game is expected to remain in Early Access for \"around 1 to 2 years\" and that the exact duration may move (read 30 September 2026). No full-release date appears anywhere in the studio's announcements either, so this page does not print one.",
  },
  {
    q: "Is WARDOGS coming to console?",
    a: "Yes, and only as a year. The studio's own copy on <a href='https://wardogs.com/'>wardogs.com</a> says \"Coming to consoles in 2028\", and the <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam listing</a> carries no console build at all (read 30 September 2026). Which consoles, and which month in 2028, are not stated anywhere we could find.",
  },
  {
    q: "How many copies did WARDOGS sell?",
    a: "The studio posted the milestones itself: 1.25 million copies on 11 September 2026, two million on 15 September and three million on 26 September, described in its own words as \"just over 2 weeks since launching into Early Access\" (<a href='https://steamcommunity.com/app/1867240/announcements/'>official Steam announcements</a>, read 30 September 2026). PCGamesN put the figure at 1.5 million on 12 September, between the first two posts (<a href='https://www.pcgamesn.com/wardogs/sales-player-count-broken-queue'>PCGamesN</a>, 12 September 2026, read 30 September 2026).",
  },
  {
    q: "What happened in the WARDOGS queue on launch day?",
    a: "At one point 45,590 players were in a match and 168,000 were waiting behind them. The studio says the login handoff should have passed 100 players a second and that about ten got through, so roughly 90% were stuck, and the line fed itself; at its worst the queue held around 300,000. The team then let players in by hand, in blocks of 10,000 (<a href='https://www.pcgamesn.com/wardogs/sales-player-count-broken-queue'>PCGamesN</a>, 12 September 2026, read 30 September 2026).",
  },
  {
    q: "What changed between the beta and the release build?",
    a: "The Season 1 changelog posted the day before launch rewrote the levelling curve: reaching level 15 went from 54,750 XP to 110,000 (100.9% slower) and level 20 from 111,500 to 250,000 (124.2% slower), with the curve flattening from level 35 up. It also raised the Forward Operating Base from $2,500 to $7,500 and the Large Hammer from $1,600 to $2,400 (<a href='https://steamcommunity.com/app/1867240/announcements/'>official Steam announcements</a>, 9 September 2026, read 30 September 2026).",
  },
  {
    q: "Is WARDOGS still being updated?",
    a: "Yes. A client hotfix landed on launch day to fix failed joins, mid-match kicks and long queues, and the studio has since shipped a server-browser patch and dated Season 2 to 15 October 2026 (<a href='https://steamcommunity.com/app/1867240/announcements/'>official Steam announcements</a>, read 30 September 2026). Nothing on the store page commits to a date for the end of Early Access.",
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
        { "@type": "ListItem", position: 3, name: "WARDOGS release date", item: SITE + "/wardogs-release-date" },
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
      url: SITE + "/wardogs-release-date",
      applicationCategory: "Game",
      gamePlatform: "PC",
      datePublished: "2026-09-10",
      releaseNotes: "Entered Steam Early Access on 10 September 2026 at 16:00 UTC.",
      offers: {
        "@type": "Offer",
        price: "39.99",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "https://store.steampowered.com/app/1867240/WARDOGS/",
      },
      author: { "@type": "Organization", name: "BULKHEAD" },
      publisher: { "@type": "Organization", name: "Team17" },
      sameAs: ["https://store.steampowered.com/app/1867240/WARDOGS/"],
    },
  ],
};

const faqHtml = faqList(faqs);

import { adUnit } from "../ad.mjs";
import { faqList } from "../faq.mjs";

export const page = {
  ogImage: "https://shooteratlas.com/assets/img/wardogs-release-date.png",
  source: "src/pages/wardogs-release-date.mjs",
  path: "/wardogs-release-date",
  title: "WARDOGS release date — 10 September 2026, 16:00 UTC",
  description:
    "WARDOGS went on sale in Steam Early Access on 10 September 2026 at 16:00 UTC, which is 12:00 US Eastern and 09:00 US Pacific. The dates around it, the hour in fourteen time zones, the launch-day queue figures and the Season 1 levelling changes, each with its source and read date.",
  extraHead:
    "<script type='application/ld+json'>" + JSON.stringify(schema) + "</script>",
  body: `<h1>WARDOGS release date: 10 September 2026, 16:00 UTC</h1>
<p class="lede">WARDOGS went on sale in Steam Early Access on <strong>10 September 2026 at 16:00 UTC</strong>, on Windows. The hour is the studio's own wording rather than ours: the launch trailer it publishes on its own site carries the line &ldquo;Global Early Access Release TODAY | 16:00 UTC / 12:00 EDT&rdquo; (<a href='https://wardogs.com/'>wardogs.com</a>, read 30 September 2026). Valve's listing prints the day and nothing finer &mdash; &ldquo;Sep 10, 2026&rdquo; (<a href='https://store.steampowered.com/api/appdetails?appids=1867240&amp;cc=us&amp;l=english'>Steam appdetails API</a>, read 30 September 2026). Because Steam unlocks on one global timestamp rather than a rolling midnight, 16:00 UTC lands on the evening of the 10th for Europe and after midnight on the 11th for Japan and Australia. What the date does not settle is the full-release date, the price at 1.0, and which consoles.</p>

<div class="strip">
<div><span class="stat-n">10 Sep 2026</span><span class="stat-k">Early Access, Windows</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">16:00 UTC</span><span class="stat-k">the hour it unlocked</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">3 million</span><span class="stat-k">copies sold by 26 September</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">2028</span><span class="stat-k">consoles, year only</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
</div>

<h2>The hour, in your own clock</h2>
<p>One global unlock time means one moment everywhere, which is why launch-day threads get this wrong. The anchor is the studio's 16:00 UTC; every figure below is our arithmetic on that anchor and is not a set of times the studio published.</p>
<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="tz-caption">
<table class="matrix">
<caption id="tz-caption">16:00 UTC on 10 September 2026, converted. All of it is our arithmetic on the studio's own unlock hour; the studio has published only &ldquo;16:00 UTC / 12:00 EDT&rdquo; (<a href='https://wardogs.com/'>wardogs.com</a>, read 30 September 2026).</caption>
<thead><tr><th scope="col">Region</th><th scope="col" class="num">Local time</th><th scope="col">Date</th></tr></thead>
<tbody>
<tr><td>US Pacific (PDT)</td><td class="num">09:00</td><td>10 September</td></tr>
<tr><td>Mexico City</td><td class="num">10:00</td><td>10 September</td></tr>
<tr><td>US Central (CDT)</td><td class="num">11:00</td><td>10 September</td></tr>
<tr><td>US Eastern (EDT)</td><td class="num">12:00</td><td>10 September</td></tr>
<tr><td>Brazil (Bras&iacute;lia)</td><td class="num">13:00</td><td>10 September</td></tr>
<tr><td>UTC</td><td class="num">16:00</td><td>10 September</td></tr>
<tr><td>UK, Portugal</td><td class="num">17:00</td><td>10 September</td></tr>
<tr><td>Central Europe (CEST)</td><td class="num">18:00</td><td>10 September</td></tr>
<tr><td>Eastern Europe, T&uuml;rkiye, Moscow</td><td class="num">19:00</td><td>10 September</td></tr>
<tr><td>Thailand, Vietnam, Indonesia</td><td class="num">23:00</td><td>10 September</td></tr>
<tr><td>China</td><td class="num">00:00</td><td>11 September</td></tr>
<tr><td>Korea, Japan</td><td class="num">01:00</td><td>11 September</td></tr>
<tr><td>Eastern Australia (AEST)</td><td class="num">02:00</td><td>11 September</td></tr>
<tr><td>New Zealand (NZST)</td><td class="num">04:00</td><td>11 September</td></tr>
</tbody>
</table>
</div>
<p class="src">The single sourced value in that table is the first column of the legend, 16:00 UTC, taken from the studio's own trailer copy on <a href='https://wardogs.com/'>wardogs.com</a>; the second published value, 12:00 EDT, is the US Eastern row. Every other row is our addition or subtraction, read back on 30 September 2026, and should be treated as arithmetic rather than as a published schedule.</p>

<h2>What the release date was, in the studio's own sequence</h2>
<p>WARDOGS is a Windows game, sold through Steam, and its store data says so plainly: release date &ldquo;Sep 10, 2026&rdquo;, developer BULKHEAD, publisher Team17, no console platform listed, priced at $39.99 with a 0% discount (<a href='https://store.steampowered.com/api/appdetails?appids=1867240&amp;cc=us&amp;l=english'>Steam appdetails API</a>, read 30 September 2026). The steps that led to that day are all dated, and every one of them is in the studio's own announcement feed:</p>
<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="steps-caption">
<table class="matrix">
<caption id="steps-caption">The run-up to 10 September 2026, from the studio's own Steam announcements (<a href='https://steamcommunity.com/app/1867240/announcements/'>announcement feed</a>, read 30 September 2026).</caption>
<thead><tr><th scope="col">Date</th><th scope="col">What the studio posted</th></tr></thead>
<tbody>
<tr><td>14 Aug 2026</td><td class="wrap-cell">&ldquo;1 MILLION WISHLISTS ON STEAM&rdquo; &mdash; six months after the game was revealed.</td></tr>
<tr><td>1 Sep 2026</td><td class="wrap-cell">Closed Beta 02 announced, tied to The FPS Games Show on 3 September, 18:00 UTC. The post explains why it stayed closed: invitees were added &ldquo;in waves rather than opening the beta completely&rdquo;, to exercise the parts that &ldquo;only break at scale&rdquo;, the login queue among them.</td></tr>
<tr><td>5 Sep 2026</td><td class="wrap-cell">The closed beta became an open one: &ldquo;Come break our servers&rdquo;, until Sunday 08:00 UTC.</td></tr>
<tr><td>6 Sep 2026</td><td class="wrap-cell">The test closed at 08:00 UTC.</td></tr>
<tr><td>9 Sep 2026</td><td class="wrap-cell">Pre-load live, alongside the Season 1 changelog &mdash; the build anyone arriving on the 10th inherited.</td></tr>
<tr><td>10 Sep 2026</td><td class="wrap-cell">Early Access opened at 16:00 UTC. A client hotfix followed the same day.</td></tr>
</tbody>
</table>
</div>
<p class="src">Every date in that table, and both quoted phrases, come from the <a href='https://steamcommunity.com/app/1867240/announcements/'>official Steam announcement feed</a>, read 30 September 2026; the 16:00 UTC row is the studio's trailer copy on <a href='https://wardogs.com/'>wardogs.com</a>, read the same day. The four-day reversal &mdash; a closed test defended on 1 September, opened on the 5th &mdash; is in those two posts and nowhere else.</p>

<h2>The first hours, in the studio's own numbers</h2>
<p>The launch-day figures come from a studio retrospective in which the team shares its own screen: at one point <strong>45,590 players were in a match and 168,000 were waiting behind them</strong>. The login handoff was supposed to pass 100 players a second; about ten got through, so roughly 90% were stuck, and each stuck player left behind a queue ticket that made the line longer. At its worst the queue held around <strong>300,000</strong>. The team then admitted players by hand, in blocks of 10,000, and the executive producer confirmed that about 11 people were given a queue jump, calling his own decision &ldquo;a bit unfair&rdquo; (<a href='https://www.pcgamesn.com/wardogs/sales-player-count-broken-queue'>PCGamesN</a>, 12 September 2026, read 30 September 2026).</p>
<p>The studio's own hotfix post the same day describes the same mechanism from the inside: everyone already logged in was pushed back to the login queue, and players were let in &ldquo;in controlled batches&rdquo; while the team watched server population (<a href='https://steamcommunity.com/app/1867240/announcements/'>official Steam announcements</a>, 10 September 2026, read 30 September 2026). The same retrospective reports that the anti-cheat banned legitimate testers in that window, two well-known first-person-shooter broadcasters among them.</p>

<h2>The counter, from the same week</h2>
<p>Copies moved faster than the queue drained. The studio's own posts put it at <strong>1.25 million on 11 September</strong>, <strong>two million on 15 September</strong> and <strong>three million on 26 September</strong>, the last of them described as &ldquo;3 million copies sold in just over 2 weeks since launching into Early Access&rdquo; (<a href='https://steamcommunity.com/app/1867240/announcements/'>official Steam announcements</a>, read 30 September 2026). PCGamesN reported 1.5 million on 12 September, between the first two milestones (<a href='https://www.pcgamesn.com/wardogs/sales-player-count-broken-queue'>PCGamesN</a>, 12 September 2026, read 30 September 2026).</p>
<p>Concurrency crossed 428,000 the same week. That figure is third-party, recorded by a community database that mirrors what Steam exposes and syndicated into the announcement feed, so it is labelled here as reported rather than official; Valve publishes a live count but no per-game history (<a href='https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=1867240'>Steam current-players API</a>, read 30 September 2026). The studio's nearest official statement is the 400,000 peak-concurrent claim in its own maintenance post.</p>

<h2>Which build you get if you start now</h2>
<p>Buy after the release date and you get the post-changelog build, not the beta build. The Season 1 changelog posted on 9 September 2026 slowed the early levelling curve and widened the late one, and the numbers are unusually explicit &mdash; each row below is the studio's own before-and-after (<a href='https://steamcommunity.com/app/1867240/announcements/'>official Steam announcements</a>, 9 September 2026, read 30 September 2026):</p>
<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="xp-caption">
<table class="matrix">
<caption id="xp-caption">XP required to reach each level, before and after the Season 1 changelog of 9 September 2026, in the studio's own words and percentages.</caption>
<thead><tr><th scope="col">Level</th><th scope="col" class="num">Beta</th><th scope="col" class="num">Season 1</th><th scope="col">Change</th></tr></thead>
<tbody>
<tr><td>Level 6</td><td class="num">8,750</td><td class="num">9,250</td><td><span class="bar"><span class="bar-track"><span class="bar-fill" style="width:5.7%"></span></span><span class="bar-val">+5.7%</span></span></td></tr>
<tr><td>Level 10</td><td class="num">25,000</td><td class="num">35,000</td><td><span class="bar"><span class="bar-track"><span class="bar-fill" style="width:40%"></span></span><span class="bar-val">+40.0%</span></span></td></tr>
<tr><td>Level 15</td><td class="num">54,750</td><td class="num">110,000</td><td><span class="bar"><span class="bar-track"><span class="bar-fill" style="width:100%"></span></span><span class="bar-val">+100.9%</span></span></td></tr>
<tr><td>Level 20</td><td class="num">111,500</td><td class="num">250,000</td><td><span class="bar"><span class="bar-track"><span class="bar-fill" style="width:100%"></span></span><span class="bar-val">+124.2%</span></span></td></tr>
<tr><td>Level 25</td><td class="num">192,000</td><td class="num">325,000</td><td><span class="bar"><span class="bar-track"><span class="bar-fill" style="width:69.3%"></span></span><span class="bar-val">+69.3%</span></span></td></tr>
<tr><td>Level 30</td><td class="num">293,750</td><td class="num">400,000</td><td><span class="bar"><span class="bar-track"><span class="bar-fill" style="width:36.2%"></span></span><span class="bar-val">+36.2%</span></span></td></tr>
<tr><td>Level 35</td><td class="num">416,500</td><td class="num">500,000</td><td><span class="bar"><span class="bar-track"><span class="bar-fill" style="width:20%"></span></span><span class="bar-val">+20.0%</span></span></td></tr>
<tr><td>Level 40</td><td class="num">551,250</td><td class="num">650,000</td><td><span class="bar"><span class="bar-track"><span class="bar-fill" style="width:17.9%"></span></span><span class="bar-val">+17.9%</span></span></td></tr>
<tr><td>Level 45</td><td class="num">689,500</td><td class="num">800,000</td><td><span class="bar"><span class="bar-track"><span class="bar-fill" style="width:16%"></span></span><span class="bar-val">+16.0%</span></span></td></tr>
<tr><td>Level 50</td><td class="num">838,000</td><td class="num">1,000,000</td><td><span class="bar"><span class="bar-track"><span class="bar-fill" style="width:19.3%"></span></span><span class="bar-val">+19.3%</span></span></td></tr>
</tbody>
</table>
</div>
<p>Two more changes move money rather than time, and both are in the same post: the Forward Operating Base went from <strong>$2,500 to $7,500</strong> and the Large Hammer from <strong>$1,600 to $2,400</strong>, while the Support-track Large Hammer unlock went from $25,000 to $75,000. Two XP payouts moved the other way: a player kill in an air vehicle now pays 250 XP instead of 300, and a supply-crate item sold below $75 pays 1 XP instead of 25. Unlocks were rearranged at the same time &mdash; Artillery moved to Career 90 and the Heavy Tank to Driver 35 &mdash; which is why any unlock table dated before 9 September 2026 is now wrong (<a href='https://steamcommunity.com/app/1867240/announcements/'>official Steam announcements</a>, 9 September 2026, read 30 September 2026).</p>

<h2>How each claim on this page is labelled</h2>
<p>This site sorts every conclusion into one of three buckets, and this page is no exception. The buckets are the point: a reader deciding whether to buy should be able to tell a studio statement from our arithmetic.</p>
<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="layers-caption">
<table class="matrix">
<caption id="layers-caption">Every claim on this page, sorted. Read 30 September 2026.</caption>
<thead><tr><th scope="col">Layer</th><th scope="col">What is in it</th></tr></thead>
<tbody>
<tr><td>Confirmed by Valve or the studio</td><td class="wrap-cell">The release date 10 September 2026 and the Windows-only platform (Steam store data). The $39.99 price with a 0% discount. The &ldquo;around 1 to 2 years&rdquo; Early Access window and the statement that the price rises at full release (store Q&amp;A). The console year 2028 and the 16:00 UTC hour (studio's own copy on wardogs.com). The wishlist, beta, pre-load and hotfix posts, the 1.25 / 2 / 3 million sales posts, the Season 2 date of 15 October 2026, and every figure in the Season 1 changelog table.</td></tr>
<tr><td>Observed, not officially confirmed</td><td class="wrap-cell">The first-hours login-queue numbers: 45,590 in a match, 168,000 waiting, about ten of a hundred per second, around 300,000 at the worst point, manual admission in blocks of 10,000 and roughly 11 queue jumps. These are the studio's own figures as reported by a third party on 12 September 2026, not an official post. Also the 1.5 million sales figure, which is PCGamesN's number rather than a milestone the studio posted, and the 428,000-concurrency record, which comes from a community database.</td></tr>
<tr><td>Not yet confirmed</td><td class="wrap-cell">The full-release date, the full-release price, which consoles arrive in 2028 and when in that year, and whether any beta runs again before 1.0.</td></tr>
</tbody>
</table>
</div>

<h2>Still not on any official record</h2>
<p>Some things this page would like to print do not exist in an official source, and leaving them out would hide the shape of the answer. They are listed here instead:</p>
<ul>
<li><strong>A full-release date.</strong> Not on the store listing, not in the announcement feed, not on the game's own site. The only forward markers are Season 2 on 15 October 2026 and the &ldquo;around 1 to 2 years&rdquo; range.</li>
<li><strong>A full-release price.</strong> The store Q&amp;A says the price will be higher at 1.0 and publishes no figure, so this page prints none. Any number you see for the 1.0 price is unsourced.</li>
<li><strong>Which consoles, and which month in 2028.</strong> The year is stated; the platforms are not.</li>
<li><strong>The local times in the table above as published times.</strong> The studio printed the hour once, as 16:00 UTC and 12:00 EDT. The other twelve rows are our arithmetic and are labelled as such.</li>
<li><strong>An official length for the launch queue.</strong> The &ldquo;around 300,000&rdquo; figure is a studio remark reported by a third party; no official post states a peak queue length.</li>
<li><strong>An unlock hour in Valve's own channels.</strong> Steam's listing gives the day; the hour is the studio's, published on its own site.</li>
</ul>

<h2>Where the other WARDOGS sites stop</h2>
<p>The three sites that cover WARDOGS in depth now all have a release-date page, and this is what each one leaves out. The field-guide site gives the date, the console year and the fact that the full release is unannounced, and tells readers not to wait for an unlock time; it prints no hour (<a href='https://wardogs.site/release-date/'>wardogs.site</a>, read 30 September 2026). The community hub prints the hour and the full dated timeline, and stops there: no launch-day queue numbers, no sales curve (<a href='https://wardogshub.gg/release-date/'>wardogshub.gg</a>, read 30 September 2026). The wiki is an item database and has no release-date page at all. What is left over &mdash; what happened in the login queue in the first hours, and what the 10th of September actually changed in the build &mdash; is what this page carries.</p>

<h2>Before you buy on the strength of a date</h2>
<ul>
<li><strong>Check which build you are reading about.</strong> The 9 September changelog rewrote the levelling curve, so a guide written from the beta describes a different game.</li>
<li><strong>Check the price on your own store, signed in.</strong> The $39.99 here is Valve's United States figure with no discount (<a href='https://store.steampowered.com/api/appdetails?appids=1867240&amp;cc=us&amp;l=english'>Steam appdetails API</a>, read 30 September 2026); regional pricing differs and is listed on <a href='/wardogs-price'>our price page</a>.</li>
<li><strong>Do not wait for a full-release date to decide.</strong> There is none, and the studio's own plan is a one-to-two-year Early Access window.</li>
<li><strong>Expect the price to move up, not down.</strong> The store Q&amp;A says the 1.0 price will be higher; there is no figure and no sale has run.</li>
</ul>

<div class="qa">
<h2>Common questions</h2>
${faqHtml}
<p class="src">Where every figure on this page comes from, all read on 30 September 2026: the <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>WARDOGS store listing</a> and Valve's <a href='https://store.steampowered.com/api/appdetails?appids=1867240&amp;cc=us&amp;l=english'>appdetails API</a> for the release date, the platform, the price and the Early Access Q&amp;A; the <a href='https://steamcommunity.com/app/1867240/announcements/'>official Steam announcement feed</a> for the wishlist milestone, both beta posts, the pre-load and Season 1 changelog, the launch-day hotfix and the 1.25 / 2 / 3 million sales posts; <a href='https://wardogs.com/'>wardogs.com</a> for the 16:00 UTC unlock hour and the 2028 console year, both of which appear in the studio's own launch-trailer copy; and <a href='https://www.pcgamesn.com/wardogs/sales-player-count-broken-queue'>PCGamesN</a> for the launch-day queue figures and the 1.5 million figure, dated 12 September 2026 and labelled as reported rather than official wherever it appears. Times in the conversion table are our arithmetic on the studio's 16:00 UTC, and the concurrency record is third-party. Nothing on this page is a live value.</p>
</div>

<figure class="pagefig"><picture><source media="(prefers-color-scheme: light)" srcset="/assets/img/wardogs-release-date-light.png"><img src="/assets/img/wardogs-release-date.png" width="1200" height="630" alt="WARDOGS release date card: 10 September 2026, 16:00 UTC, three million copies by 26 September"></picture><figcaption>Drawn for this page, dark or light to match. Dates and figures as read on 30 September 2026.</figcaption></figure>

${adUnit}

<div class="readnext">
<p><a href="/wardogs">Scoring, prices and platform support for WARDOGS &rarr;</a></p>
<p><a href="/wardogs-early-access">What the developers say about Early Access timing and the full game &rarr;</a></p>
<p><a href="/wardogs-price">What WARDOGS costs in eight Steam regions &rarr;</a></p>
<p><a href="/wardogs-achievements">All ten WARDOGS achievements and how rare each one is &rarr;</a></p>
</div>`,
};
