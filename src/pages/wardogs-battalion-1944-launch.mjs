// One array drives both the visible questions and the FAQPage JSON-LD, so the
// structured data can never drift from what a reader can open on the page.
const faqs = [
  {
    q: "When was the Battalion 1944 closed alpha?",
    a: "The first Closed Alpha weekend was 26 May 2017. The studio's own announcement sets the \"Official Closed Alpha Release Date\" as May 26th, with Kickstarter backer surveys out on 28 April and Steam codes sent on 24 May that activated on the 26th (<a href='https://web.archive.org/web/*/battaliongame.com/news/closed-alpha-date-announcement-ks-update-nikkyyhd-trailer-reveal'>archived studio announcement</a>, page dated 2 May 2017, captured 27 May 2017, read 30 September 2026).",
  },
  {
    q: "Could you stream the Battalion 1944 alpha?",
    a: "No. The FAQ answer reads: \"We will not be allowing players to stream the Battalion 1944 closed alpha in May 2017.\" The same answer allows streaming of the Closed Beta and Early Access builds on two conditions &mdash; creators link viewers to the studio's site, and tell them the game is in an early pre-release state where bugs and balance problems are expected (<a href='https://web.archive.org/web/*/battaliongame.com/faq'>archived studio FAQ</a>, captured 26 May 2017, read 30 September 2026).",
  },
  {
    q: "Was the closed alpha under an NDA?",
    a: "Yes, and the terms are on the FAQ page: downloading the Closed Alpha meant agreeing to the rules, under which \"nobody is allowed to share videos/pictures/media or discuss the game outside of our official closed channels (Closed Alpha Forum &amp; Closed Alpha Discord)\" (<a href='https://web.archive.org/web/*/battaliongame.com/faq'>archived studio FAQ</a>, captured 26 May 2017, read 30 September 2026). The alpha v0.2 patch note of 11 July 2017 still repeats that the agreement was in force &mdash; \"NDA is still in place so please stick to it\" &mdash; which is why almost none of this material was discussed in public while it was current.",
  },
  {
    q: "What did the 2018 roadmap promise?",
    a: "Four quarters, on the studio's own roadmap page. Q1: Early Access release, a stability update, a new map in both rotations, offline LAN support, and the line \"ALL future DLC will be free\". Q2: the first official LAN tournament, an arcade map, large map support and two undisclosed weapons. Q3: a second LAN tournament, a spectator overhaul for esports, and 'Clanwars' on \"high tick servers\". Q4: the full Steam release, a new HUD/UI and Theatre Mode, with the price going up at that point (<a href='https://web.archive.org/web/*/battaliongame.com/'>archived studio roadmap</a>, captured 20 January 2018, read 30 September 2026).",
  },
  {
    q: "Was Battalion 1944's DLC free?",
    a: "The studio promised it would be. The roadmap page opens with \"ALL future DLC will be free\", and its 2019 block repeats \"Unannounced Free DLC\" (<a href='https://web.archive.org/web/*/battaliongame.com/'>archived studio roadmap</a>, captured 20 January 2018, read 30 September 2026). Whether that held for the game's whole life is something this page cannot confirm: the material we could read stops in January 2018, and no later document we could find states what was released or what it cost.",
  },
  {
    q: "Who published Battalion 1944?",
    a: "By January 2018 the roadmap page carried \"PUBLISHED BY SQUARE ENIX COLLECTIVE\" in its footer, alongside a credit to Bulkhead Interactive. The 2017 pages read here name no publisher at all. That is the whole of the publisher record in this material &mdash; no deal date, no territories and no terms (<a href='https://web.archive.org/web/*/battaliongame.com/'>archived studio roadmap</a>, captured 20 January 2018, read 30 September 2026).",
  },
  {
    q: "Is the original Battalion 1944 site still up?",
    a: "No. battaliongame.com no longer serves these pages, so every quote here comes from an archive record of the page as it stood in 2017 or 2018: a 26 May 2017 capture of the <a href='https://web.archive.org/web/*/battaliongame.com/faq'>FAQ</a>, a 27 May 2017 capture of the <a href='https://web.archive.org/web/*/battaliongame.com/news/closed-alpha-date-announcement-ks-update-nikkyyhd-trailer-reveal'>alpha announcement</a>, and a 20 January 2018 capture of the <a href='https://web.archive.org/web/*/battaliongame.com/'>roadmap</a>. The copies read for this page were pulled from Common Crawl's WARC records of those crawls on 30 September 2026.",
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
        { "@type": "ListItem", position: 3, name: "Battalion 1944", item: SITE + "/wardogs-battalion-1944" },
        { "@type": "ListItem", position: 4, name: "Launch", item: SITE + "/wardogs-battalion-1944-launch" },
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
      name: "Battalion 1944",
      url: SITE + "/wardogs-battalion-1944-launch",
      applicationCategory: "Game",
      gamePlatform: "PC",
      author: { "@type": "Organization", name: "Bulkhead Interactive" },
      publisher: { "@type": "Organization", name: "Square Enix Collective" },
      sameAs: ["https://web.archive.org/web/*/battaliongame.com"],
      about: { "@type": "VideoGame", name: "WARDOGS", url: "https://store.steampowered.com/app/1867240/WARDOGS/" },
    },
  ],
};

const faqHtml = faqList(faqs);

import { adUnit } from "../ad.mjs";
import { faqList } from "../faq.mjs";

export const page = {
  ogImage: "https://shooteratlas.com/assets/img/wardogs-battalion-1944-launch.png",
  source: "src/pages/wardogs-battalion-1944-launch.mjs",
  path: "/wardogs-battalion-1944-launch",
  title: "Battalion 1944 launch — closed alpha rules, the dates and the 2018 roadmap",
  description:
    "Battalion 1944 spent its first month in a closed alpha whose testers were barred from streaming it or discussing it in public, then went into Steam Early Access under a four-quarter plan that promised free DLC, offline LAN, a clan system on high tick servers and a price rise at full release. All of it in the studio's own words, from captures of pages it no longer serves.",
  extraHead:
    "<script type='application/ld+json'>" + JSON.stringify(schema) + "</script>",
  body: `<h1>Battalion 1944 launch: closed alpha rules, the dates and the 2018 roadmap</h1>
<p class="lede"><strong>Battalion 1944 spent its first month in a closed alpha that testers were barred from streaming or discussing in public, and it went into Steam Early Access the next year under a four-quarter plan that promised offline LAN, a clan system on high tick servers, free DLC for the game's whole life, and a price rise at full release.</strong> Every one of those commitments is the studio's own wording, published on pages battaliongame.com no longer serves. The copies read here are archive records of three captures &mdash; the FAQ on 26 May 2017, the alpha announcement on 27 May 2017 and the roadmap on 20 January 2018 &mdash; re-read on 30 September 2026.</p>

<div class="strip">
<div><span class="stat-n">26 May 2017</span><span class="stat-k">first closed alpha weekend</span><span class="stat-src"><span class="src-chip src-official">studio's own</span></span></div>
<div><span class="stat-n">No streams</span><span class="stat-k">and no public talk, under the test agreement</span><span class="stat-src"><span class="src-chip src-official">studio's own</span></span></div>
<div><span class="stat-n">4 quarters</span><span class="stat-k">the 2018 plan, in full</span><span class="stat-src"><span class="src-chip src-official">studio's own</span></span></div>
<div><span class="stat-n">Free DLC</span><span class="stat-k">promised for the game's whole life</span><span class="stat-src"><span class="src-chip src-official">studio's own</span></span></div>
</div>

<h2>The test agreement, in the studio's own words</h2>
<p>Two answers on the studio's FAQ page carry the rules the alpha ran under, and both are worth quoting rather than summarising, because the wording is the most restrictive part of the whole record (<a href='https://web.archive.org/web/*/battaliongame.com/faq'>archived studio FAQ</a>, captured 26 May 2017, read 30 September 2026). The first is the agreement itself:</p>
<blockquote><p>"Yes, by downloading the Battalion 1944 Closed Alpha, you're agreeing to adhere to our NDA rules. This means nobody is allowed to share videos/pictures/media or discuss the game outside of our official closed channels (Closed Alpha Forum &amp; Closed Alpha Discord)"</p></blockquote>
<p>The second answer covers streaming, and it draws a line between the alpha and everything that came after it (<a href='https://web.archive.org/web/*/battaliongame.com/faq'>same archived FAQ page</a>, read 30 September 2026). No streams in May 2017; from the Closed Beta and Early Access onward, streaming was allowed on two conditions attached to the creator rather than to the game:</p>
<blockquote><p>"The closed alpha/beta sessions aren't glorified marketing tools for us, they'll be used exactly as intended; for bug testing and balancing the game. There will be unresolved issues/bugs to be fixed before release. We will not be allowing players to stream the Battalion 1944 closed alpha in May 2017. However, we're totally cool with the community streaming the Closed Beta/Early Access versions, as long as content creators link viewers directly to our site and strictly inform their viewers that the game is in an early pre-release state and that bugs/balancing issues are to be expected."</p></blockquote>
<p>Read together, the two answers describe a test that was run as a test: no footage, no public threads, no streams during the alpha weekends, and a later phase where a creator could stream the game only while telling the audience what they were watching. The FAQ page itself carries no publication date; the capture read here is dated 26 May 2017, and at that point the same page already answered "access to the Alpha / Beta testing is now closed" (<a href='https://web.archive.org/web/*/battaliongame.com/faq'>archived studio FAQ</a>, captured 26 May 2017, read 30 September 2026).</p>

<h2>The alpha calendar: three dates and a trailer</h2>
<p>Three weeks before the first playtest, the studio published the calendar in a single recap, which is the only place the dates appear in that granularity. Every line below is the studio's own (<a href='https://web.archive.org/web/*/battaliongame.com/news/closed-alpha-date-announcement-ks-update-nikkyyhd-trailer-reveal'>archived studio announcement</a>, page dated 2 May 2017, captured 27 May 2017, read 30 September 2026):</p>
<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="alpha-dates-caption">
<table class="matrix">
<caption id="alpha-dates-caption">The closed alpha calendar as the studio recapped it, page dated 2 May 2017, captured 27 May 2017, read 30 September 2026.</caption>
<thead><tr><th scope="col">Date</th><th scope="col">What the studio said happens</th></tr></thead>
<tbody>
<tr><td class="num">28 April 2017</td><td class="wrap-cell">Kickstarter backer surveys get sent out</td></tr>
<tr><td class="num">24 May 2017</td><td class="wrap-cell">Closed Alpha Steam codes get sent &mdash; they activate on the 26th</td></tr>
<tr><td class="num">26 May 2017</td><td class="wrap-cell">First closed alpha weekend, set as the "Official Closed Alpha Release Date"</td></tr>
</tbody>
</table>
</div>
<p>Two more facts sit in the same post. The announcement trailer was made by NikkyyHD, credited there as the creator of the frag movies 'Clockwork 4' and 'sViix'. And the studio said a full development roadmap plus an alpha weekend schedule would follow "within the coming weeks" &mdash; which is the January 2018 roadmap further down this page (<a href='https://web.archive.org/web/*/battaliongame.com/news/closed-alpha-date-announcement-ks-update-nikkyyhd-trailer-reveal'>same archived post</a>, read 30 September 2026).</p>
<p>The FAQ, captured three weeks later, independently confirms one of the three dates, in an answer about survey delivery: "All Kickstarter Surveys have been sent as of 28th April 2017" (<a href='https://web.archive.org/web/*/battaliongame.com/faq'>archived studio FAQ</a>, captured 26 May 2017, read 30 September 2026). That is a small thing and it is worth noting as method: the calendar is not one page's claim, it is two of the studio's own pages agreeing.</p>

<figure class="pagefig"><picture><source media="(prefers-color-scheme: light)" srcset="/assets/img/wardogs-battalion-1944-launch-fig-calendar-light.png"><img src="/assets/img/wardogs-battalion-1944-launch-fig-calendar.png" width="1200" height="630" alt="Timeline of the closed alpha calendar: surveys on 28 April 2017, Steam codes on 24 May, first alpha weekend on 26 May"></picture><figcaption>The closed alpha calendar from the archived studio announcement of 2 May 2017. Read 30 September 2026.</figcaption></figure>

<p>That calendar sat under a plan the studio had already written down. A development update published the previous winter, and captured on 27 May 2017, set out four stages and the month each was expected in: an alpha in May 2017, run as planned playtest weekends where each weekend tested a different part of the game rather than one long test; a beta estimated for July 2017, aimed at matchmaking, competitive play and a ranked five-versus-five Search and Destroy mode; Steam Early Access, which the studio said it was aiming to reach in August 2017 while refusing to commit to a date, because it wanted the game in the best state it could manage before going public; and a full launch, left entirely undated and described only as the Steam release and the console versions arriving together. The same update put a number on one part of the wait: the first competitive season was planned to open about a week after Early Access went live (<a href='https://web.archive.org/web/*/battaliongame.com/news/winter-development-update'>archived studio development update</a>, captured 27 May 2017, read 3 October 2026).</p>
<p>One part of that plan was already being wound back before the alpha started. The studio closed its Humble Store pre-order page on 31 March 2017 and said it would not reopen, giving one reason: it wanted to control how many people were in the alpha so the right number of servers would be available. Until the game reached Steam Early Access there would be no way to buy a copy at all (<a href='https://web.archive.org/web/*/battaliongame.com/news/final-humble-pre-orders-closing-soon'>archived studio announcement</a>, page dated 11 April 2017, captured 27 May 2017, read 3 October 2026).</p>

<h2>How the first alpha weekend was built</h2>
<p>The first weekend was deliberately small, and the studio itemised it in advance: 6v6 Team Deathmatch on Brecourt Manor, the first and smallest map, on official servers only, with four weapons in the build &mdash; the M1 Garand, the Kar98k, the Thompson and the MP40 (<a href='https://web.archive.org/web/*/battaliongame.com/news/closed-alpha-0-1-weekend-breakdown'>archived studio weekend breakdown</a>, page dated 22 May 2017, captured 23 July 2017, read 2 October 2026). The servers opened on Friday 26 May at 18:00 BST and closed at 02:00 BST, and the same window repeated on Saturday 27 May: 19:00 in central Europe, 13:00 on the US east coast, 03:00 in eastern Australia.</p>
<p>The same page lists where the servers actually stood, region by region: Amsterdam and London; Moscow; New York and Washington DC; Dallas; Salt Lake City and San Jose; Sao Paulo; Sydney; Singapore; Hong Kong; and Tokyo &mdash; thirteen cities in all.</p>
<p>It also says what the player pool was meant to be, and the answer is not a growth target. The studio had \"purposefully aimed\" for a pool of around a few thousand players, and added that this did not mean concurrent counts would reach it &mdash; \"in fact we expect concurrent player counts to be much lower\" &mdash; because a smaller group that came back every weekend produced better feedback than a crowd passing through once.</p>

<p>The server list changed by the third alpha weekend. Where the first weekend ran on thirteen named cities, the announcement for v0.3 gave five regions instead &mdash; Europe, US East, US Central, US West and Australia. The two lists are worth keeping side by side rather than treating the later one as a correction of the earlier, because nothing read here says which one was in force at any given time (<a href='https://web.archive.org/web/*/battaliongame.com/news/alpha-v0-3-extra-info-giveaways'>archived studio announcement</a>, page dated 17 August 2017, captured 20 September 2017, read 3 October 2026).</p>

<h2>What the first alpha weekend produced</h2>
<p>196,467 kills. That is the studio's own total for every player on every server across the first alpha weekend, published next to the weekend's top ten (<a href='https://web.archive.org/web/*/battaliongame.com/news/alpha-0-1-recap'>archived studio recap</a>, page dated 31 May 2017, captured 23 July 2017, read 2 October 2026).</p>
<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="alpha01-top10-caption">
<table class="matrix">
<caption id="alpha01-top10-caption">The top ten fraggers of the first alpha weekend, as the studio published them. Page dated 31 May 2017, captured 23 July 2017, read 2 October 2026.</caption>
<thead><tr><th scope="col" class="num">Kills</th><th scope="col">Player</th></tr></thead>
<tbody>
<tr><td class="num">2,466</td><td>Bot Alien</td></tr>
<tr><td class="num">1,852</td><td>ddnp</td></tr>
<tr><td class="num">1,651</td><td>Davsa</td></tr>
<tr><td class="num">1,612</td><td>dL Spirks</td></tr>
<tr><td class="num">1,601</td><td>Ryzn &gt;&lt;&gt;</td></tr>
<tr><td class="num">1,464</td><td>seekax</td></tr>
<tr><td class="num">1,414</td><td>stani</td></tr>
<tr><td class="num">1,392</td><td>&#10026;Mikoelele</td></tr>
<tr><td class="num">1,348</td><td>solaze</td></tr>
<tr><td class="num">1,274</td><td>FRESHY</td></tr>
</tbody>
</table>
</div>
<p>The studio's own reading of its own leaderboard is worth keeping: \"a lot of players were simply testing and not actually playing seriously to win\", which makes the table a record of a test rather than a ranking of players. The top name is a case in point &mdash; the weekend's most prolific fragger went by Bot Alien, a handle the studio felt obliged to point out belonged to neither a bot nor an alien.</p>

<p>The third weekend produced another leaderboard with a familiar name at the top. Bot Alien finished it on 2,768 kills, having led the first and second weekends as well. The same recap records that the alpha was still running on a single map and that the studio rated this the least buggy of the three builds (<a href='https://web.archive.org/web/*/battaliongame.com/news/alpha-v0-3-recap-2'>archived studio recap</a>, page dated 31 August 2017, captured 20 September 2017, read 3 October 2026).</p>

<h2>How testers were asked to report what they found</h2>
<p>The second alpha weekend came with hardware prizes attached to three behaviours, and the categories read like a testing checklist: most frags across the weekend, first person to knife the executive producer, and the best post-weekend feedback. The studio named the winners afterwards &mdash; Vaposki was first to knife Joe Brammertron, Bot Alien returned with 3,750 kills after topping the previous weekend, and Dark took the feedback prize (<a href='https://web.archive.org/web/*/battaliongame.com/news/alpha-v0-2-recap-and-v0-3-release-date'>archived studio recap</a>, page dated 21 July 2017, captured 19 August 2017, read 2 October 2026).</p>
<p>What Dark won it for is the reusable part, and it is a reporting standard rather than a bug: he \"correlated multiple excellent bug reports, without telling us how we should have fixed it\", describing the problem and how to reproduce it instead. The studio's line about the weekend is just as direct &mdash; it wanted to hear \"both what we're doing wrong and what we're doing right\", clearly and concisely.</p>

<p>Away from the test weekends, the studio ran a standing community event of a different kind. Roughly once a month it hosted a server in an older first-person shooter and played with its own backers, the captures naming Battlefield 1942, Red Orchestra 2 and Battlefield 2, and it gave the evenings a second purpose in writing: they were a chance to look at how those games were designed and to hear what players made of the design, with a Discord channel carrying the conversation between events (<a href='https://web.archive.org/web/*/battaliongame.com/news/community-classic-play-night-1'>archived studio community night</a>, captured 27 May 2017, and the two follow-ups captured 20 September 2017, read 3 October 2026).</p>

<h2>The week the office flooded</h2>
<p>A week before the first alpha weekend, heavy rain sent water through a leaking balcony above the studio and flooded the floor of the art room, with the water making its way toward the studio's internal servers (<a href='https://web.archive.org/web/*/battaliongame.com/news/closed-alpha-0-1-weekend-breakdown'>archived studio weekend breakdown</a>, page dated 22 May 2017, captured 23 July 2017, read 2 October 2026). The team salvaged the equipment, reconfigured security and the server setup that same evening, and the art team was back at work by 9am the next morning in a temporary room. Backups were held in several locations, so nothing was lost &mdash; and the studio told testers the whole story in a short note rather than sitting on it.</p>

<h2>What the 2017 FAQ committed the game to</h2>
<p>The FAQ is the long document in this record: 18 answers, written while the alpha was running. A handful of them set expectations specific enough to be checked against the game later, and this page prints those as the studio wrote them (<a href='https://web.archive.org/web/*/battaliongame.com/faq'>archived studio FAQ</a>, captured 26 May 2017, read 30 September 2026):</p>
<ul>
<li><strong>No killstreaks, no deathstreaks.</strong> "Absolutely not. No killstreaks/deathstreaks, just you and your skill as a player."</li>
<li><strong>One server browser, and it is in the game.</strong> "We'll have an ingame server browser exactly like classic shooters, but no external server browser", with official servers run in partnership with Multiplay and player-hosted servers able to switch between ranked, unranked and private rule sets.</li>
<li><strong>No single-player campaign.</strong> "We currently have no plans for a single player campaign."</li>
<li><strong>Mapping and modding support</strong> planned "throughout Battalion 1944's lifespan".</li>
<li><strong>Anti-cheat beyond Valve's.</strong> "We aren't just relying on VAC, we aim to keep the game as cheat free as possible with extra persistent anti-cheat systems".</li>
<li><strong>Refunds on store and Kickstarter purchases:</strong> "As a rule of thumb I'm afraid we do not support refunds for digital items purchased via our Storefront / Kickstarter."</li>
<li><strong>Platforms and the release window:</strong> PC first, with Xbox One and PlayStation 4 to follow, and "The game will be available to the public when the game releases on Steam early access, late 2017."</li>
</ul>
<p>That last line is the one the January 2018 roadmap quietly corrects, because it lists Early Access release inside Q1 2018 (<a href='https://web.archive.org/web/*/battaliongame.com/'>archived studio roadmap</a>, captured 20 January 2018, read 30 September 2026). Both statements are the studio's own, and the slip from "late 2017" to a 2018 quarter is only visible by putting the two pages side by side &mdash; which is what this page does, and it is a comparison rather than anything the studio ever admitted.</p>

<h2>The 2018 roadmap, quarter by quarter</h2>
<p>The roadmap page is the most specific document in the record, and it opens with a promise that applies to the whole plan rather than to one quarter: <strong>"ALL future DLC will be free"</strong>. The four quarters that follow are reproduced below, item for item, in the studio's own phrasing (<a href='https://web.archive.org/web/*/battaliongame.com/'>archived studio roadmap</a>, captured 20 January 2018, read 30 September 2026):</p>
<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="roadmap-caption">
<table class="matrix">
<caption id="roadmap-caption">The 2018 development plan, as published. Captured 20 January 2018, read 30 September 2026.</caption>
<thead><tr><th scope="col">Quarter</th><th scope="col">What the studio planned</th></tr></thead>
<tbody>
<tr><td class="num">Q1 2018</td><td class="wrap-cell"><strong>Early Access release, and the stability update.</strong> Fix what the community finds and make sure "EVERYONE can play our existing content, before we move on to the new content". A new map into both the casual and the competitive rotation. <strong>Offline LAN support across all modes.</strong> A Twitch AMA with Brammertron &amp; KingHoward on the future of the game.</td></tr>
<tr><td class="num">Q2 2018</td><td class="wrap-cell"><strong>The content update.</strong> The first official LAN tournament. An arcade map built around Capture the Flag and Domination. A competitive map, still unannounced. <strong>Large map support</strong> for bigger player counts. Two new undisclosed weapons.</td></tr>
<tr><td class="num">Q3 2018</td><td class="wrap-cell"><strong>The competition update.</strong> A second official LAN tournament. <strong>Spectator mode overhaul for esports.</strong> 'Clanwars' launches &mdash; an in-game clan system for scrims, ladders and competitions, described as running on <strong>high tick servers</strong>.</td></tr>
<tr><td class="num">Q4 2018</td><td class="wrap-cell"><strong>The winter update, called "The Beginning".</strong> The game hits Steam "as a fully released title", and in the studio's words: "At this point, the price of the game will increase." Theatre Mode. A new HUD and UI. A casual map, still unannounced.</td></tr>
<tr><td class="num">2019</td><td class="wrap-cell">Listed under future plans: <strong>FULL RELEASE TO STEAM</strong> and <strong>Unannounced Free DLC</strong>.</td></tr>
</tbody>
</table>
</div>
<p>Two details in that table deserve to be pulled out. The first is the ordering inside Q1: bug-fixing is placed ahead of new content, in writing, which is unusual for a roadmap page whose job is to promise things. The second is that the price decision was taken in advance and printed: the increase is announced in a plan published months before it was due, not in a store-page footnote afterwards (<a href='https://web.archive.org/web/*/battaliongame.com/'>same archived plan</a>, read 30 September 2026).</p>
<p>There is also an inconsistency inside the studio's own plan, and this page prints it rather than smoothing it over: the Q4 2018 block describes the game reaching Steam "as a fully released title", while the 2019 block repeats "FULL RELEASE TO STEAM" as something still to come. Both lines are on the same captured page, and nothing in the material read here resolves which one was current. For anyone reading the plan as a promise, that matters: the full release is dated twice (<a href='https://web.archive.org/web/*/battaliongame.com/'>archived studio roadmap</a>, captured 20 January 2018, read 30 September 2026).</p>

<figure class="pagefig"><picture><source media="(prefers-color-scheme: light)" srcset="/assets/img/wardogs-battalion-1944-launch-fig-roadmap-light.png"><img src="/assets/img/wardogs-battalion-1944-launch-fig-roadmap.png" width="1200" height="630" alt="Timeline of the 2018 plan, quarter by quarter, ending with the full Steam release and a price increase in Q4"></picture><figcaption>The 2018 plan, quarter by quarter, from the archived roadmap captured 20 January 2018. Read 30 September 2026.</figcaption></figure>

<p>Pricing had been decided in the same winter update, and the reasoning is the part worth keeping. After players told the studio the price was too high, it decided to bring the retail price down and make up the difference with a loot crate and weapon case system, on the argument that a multiplayer shooter lives or dies on the size of its player base. The cases were to hold cosmetic items only &mdash; the studio stressed that loadouts would not change &mdash; with two to four drops each time a player levelled up, optional payment framed as support for post-launch content rather than an advantage, and everything in them reachable without paying. The same note promised the free content would keep coming, including the British and Russian updates backers had asked for (<a href='https://web.archive.org/web/*/battaliongame.com/news/winter-development-update'>archived studio development update</a>, captured 27 May 2017, read 3 October 2026).</p>

<h2>Who was publishing it</h2>
<p>The roadmap page carries something the 2017 pages do not: a footer reading <strong>"PUBLISHED BY SQUARE ENIX COLLECTIVE"</strong>, next to a credit to Bulkhead Interactive, and a copyright line dated 2018 (<a href='https://web.archive.org/web/*/battaliongame.com/'>archived studio roadmap</a>, captured 20 January 2018, read 30 September 2026). The 2017 FAQ and announcement name no publisher at all, and the footer itself carries no deal date, no territories and no terms. What the record does carry about the arrangement is on the studio's own about page a year earlier &mdash; the same partner, named with a purpose, marketing and development funds &mdash; which the next section sets out.</p>

<p>The about page is not the only place the partnership is described, and the other description adds a name. Announcing the deal, the studio said the Square Enix Collective had a partnership with an advertising agency, Petrol Advertising, that runs the marketing campaigns for the Call of Duty and Battlefield franchises, and that the same agency was now working on this game's campaign. The same post says the studio had spoken to almost every major publisher before choosing, and that the deciding factor was keeping full creative control (<a href='https://web.archive.org/web/*/battaliongame.com/news/battalion-1944-published-by-square-enix-collective-teaser-coming-soon'>archived studio announcement</a>, page dated 11 April 2017, captured 27 May 2017, read 3 October 2026).</p>

<h2>The money behind the game</h2>
<p>The Kickstarter campaign opened on 2 February 2016, passed its funding goal within three days with 27 days still to run, and closed at £317,281 from 10,096 backers against an initial goal of £100,000 (<a href='https://web.archive.org/web/*/battaliongame.com/about'>archived studio about page</a>, captured 26 May 2017, read 2 October 2026). The same page records two more contributions: the studio pledged £100,000 of its own money on reaching that goal, and all profits from its August 2016 game The Turing Test went into Battalion 1944. In 2017 the studio announced a partnership with the publisher Square Enix Collective, which the page says has been assisting with marketing and development funds &mdash; a statement about what the arrangement covered that the 2018 roadmap footer does not carry.</p>
<p>The money is also the one unresolved discrepancy in this record, and this page prints both readings rather than choosing between them. A separate Kickstarter financial report published by the studio gives the \"Public Kickstarter Figure\" as £317,241.67 (<a href='https://web.archive.org/web/*/battaliongame.com/news/battalion-1944-kickstarter-financial-report'>archived studio financial report</a>, page dated 11 April 2017, captured 20 September 2017, read 2 October 2026). The two pages are £39.33 apart &mdash; our subtraction, on the studio's two figures. Both were the studio's own, both are now unreachable, and nothing read for this page explains the difference.</p>

<h2>How the studio warmed the game up for release</h2>
<p>The last document in this record carries the date the roadmap never gave: a full release on 23 May 2019, and a developer showmatch to lead into it. The event was Team Howard against Team Brammer, streamed on Monday 20 May 2019 from 19:00 BST and expected to run about three hours, on the two partner channels the studio named (<a href='https://web.archive.org/web/*/bulkheadinteractive.com/*'>archived studio showcase page</a>, captured 16 June 2019, read 2 October 2026). The page also lists local start times for seven cities, from Berlin at 20:00 to Canberra at 04:30 the following morning. This is the full release rather than the Early Access launch, which nothing read for this page dates.</p>
<p>Two sentences on that page matter beyond the schedule. The studio dated its own work &mdash; \"it's time for us to show what we've been doing for the last 14 months\" &mdash; and it named the lineage outright: the game's roots are \"grounded in classic shooters such as COD2, COD4 and Enemy Territory\". The showcase list reads as a contents page for the release build: new weapons, a new economy, spectator improvements, movement improvements, map design changes and new maps including Vanguard.</p>

<h2>How each claim on this page is labelled</h2>
<p>This site sorts every conclusion into one of three buckets. On this page the buckets carry more weight than usual, because the underlying pages no longer exist on the live web and a reader ought to see exactly how thin the ground is.</p>
<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="layers-caption">
<table class="matrix">
<caption id="layers-caption">Every claim on this page, sorted. Read 30 September and 2 October 2026, and again on 3 October 2026.</caption>
<thead><tr><th scope="col">Layer</th><th scope="col">What is in it</th></tr></thead>
<tbody>
<tr><td>Confirmed by the studio</td><td class="wrap-cell">The NDA terms and the streaming answer, in the studio's own words. The three alpha dates and the trailer credit to NikkyyHD. Every line of the 2018 plan, including the free-DLC promise, offline LAN support, the two LAN tournaments, Clanwars on high tick servers, the Q4 price increase, Theatre Mode and the new HUD/UI. The Square Enix Collective credit in the 2018 footer. All of it is the studio's own published text, captured in the archive in May 2017 and January 2018. Read on 2 October 2026 and added here: the first alpha weekend's total of 196,467 kills and its top ten; the weekend's structure (6v6 Team Deathmatch on Brecourt Manor, four weapons, two evening windows) and the thirteen server cities; the studio's statement that it aimed for a pool of around a few thousand players and expected lower concurrency; the v0.2 giveaway categories and winners, with the bug-report standard that won one of them; the office flood a week before the alpha; the Kickstarter figures, the studio's own £100,000 pledge, The Turing Test profits and the Square Enix Collective partnership; and the studio's own showcase page of May 2019, with the 23 May 2019 full release date, the 14-month development figure and the release contents list. Added on 3 October 2026: the four-stage plan and its expected months, with the first competitive season set for about a week after Early Access and August 2017 named as the month Early Access was being aimed at; the closure of the Humble Store pre-orders on 31 March 2017 to hold the size of the alpha and keep enough servers; the five-region server list of the third alpha weekend; the third weekend's leaderboard, led by 2,768 kills on the same single map; the monthly classic-shooter nights and the design-reading purpose the studio gave them; the decision to lower the retail price and cover the difference with a cosmetic-only case system; and Petrol Advertising, the agency behind the Call of Duty and Battlefield campaigns, being put on this game's campaign.</td></tr>
<tr><td>Observed, not officially confirmed</td><td class="wrap-cell">That the alpha calendar slipped: the May 2017 FAQ promised Early Access for "late 2017" and the January 2018 plan lists it in Q1 2018. Both statements are the studio's; the comparison between them is ours, and no captured page admits the change. The same goes for the contradiction between the Q4 2018 full-release block and the 2019 full-release line &mdash; and, read on 2 October 2026, for two more comparisons: the full release the plan put in Q4 2018 actually landed on 23 May 2019, and the two Kickstarter totals differ by £39.33. Both of those are our reading of the studio's own figures, not the studio's own statement.</td></tr>
<tr><td>Not yet confirmed</td><td class="wrap-cell">Whether the rest of the 2018 plan was delivered. The record gives one outcome &mdash; the full release on 23 May 2019 &mdash; and nothing else: no word on offline LAN, the two LAN tournaments, large map support, the two undisclosed weapons, the spectator overhaul, Clanwars, Theatre Mode or the HUD/UI rebuild. The game's sales, its player numbers and its final state are outside this record too.</td></tr>
</tbody>
</table>
</div>

<h2>Still not on any official record</h2>
<p>The gaps are part of the answer here, so they are written down rather than left out:</p>
<ul>
<li><strong>The actual Early Access release date.</strong> The plan says Q1 2018 and prints no day. No dated announcement in the material read here gives one.</li>
<li><strong>Whether the roadmap was delivered.</strong> Offline LAN, the two LAN tournaments, large map support, the two undisclosed weapons, the spectator overhaul, Clanwars, Theatre Mode and the HUD/UI rebuild are all promises in this record and none of them has an outcome in it.</li>
<li><strong>What the price rose to.</strong> The plan says the price increases at full release and prints no figure, and no later price list could be read.</li>
<li><strong>Whether the NDA was ever formally lifted.</strong> The FAQ distinguishes alpha from beta and Early Access for streaming only; it says nothing about when the agreement ended or what replaced it.</li>
<li><strong>Sales and player numbers.</strong> The studio's own pages read here carry none for Battalion 1944, and this page does not import any from elsewhere.</li>
<li><strong>Anything after the May 2019 release.</strong> The last capture read for this page is the June 2019 snapshot of the studio's own site, and nothing in the record covers the game's life after that release. The digging rules behind this site take archive snapshots dated before 1 January 2023, and no later capture of these pages could be read.</li>
</ul>

<h2>What the three WARDOGS sites have, and what this page adds</h2>
<p>All three sites were swept end to end on 30 September 2026 &mdash; every URL each one lists in its own sitemap, fetched and read, not just the pages that look relevant:</p>
<ul>
<li><strong>wardogs.site</strong> lists 27 pages and the word Battalion does not appear in any of them. Its coverage starts with the current game (wardogs.site, read 30 September 2026).</li>
<li><strong>wardogshub.gg</strong> lists 861 pages. Four mention Battalion 1944, in two blog posts published in English and in Spanish: a comparison piece against Arma 3 and a recap of the studio's own "ten reasons not to buy" devlog. Both use the previous game as a trust question &mdash; that it did not work out, that Kickstarter backers were refunded, and that the studio's own advice is not to rush a purchase if that history still bothers you. Neither carries the test agreement, the alpha calendar, or any part of the plan (wardogshub.gg, read 30 September 2026).</li>
<li><strong>wardogs.wiki</strong> lists 486 pages in its MediaWiki sitemap. One of them mentions the game: the studio's own entry, which lists Battalion 1944 among the titles shipped and gives the year as 2018 (wardogs.wiki, read 30 September 2026).</li>
</ul>
<p>What none of the three has is the primary record &mdash; the NDA and streaming answers verbatim, the three dates with the trailer credit, and the quarter-by-quarter plan with its free-DLC promise and its scheduled price rise. That is what this page adds, and it can only be added from captures of pages the studio stopped serving.</p>

<div class="qa">
<h2>Common questions</h2>
${faqHtml}
<p class="src">Where this comes from: the studio's own pages for Battalion 1944, captured before its site was withdrawn &mdash; the FAQ and the closed alpha announcement, pages dated May 2017 in captures of 26 and 27 May 2017, and the 2018 development plan, captured on 20 January 2018. The copies read for this page were taken from Common Crawl's WARC records of those captures (crawls CC-MAIN-2017-22 and CC-MAIN-2018-05) on 30 September 2026. Every quote in this page is the studio's own text; the only comparisons drawn, and the only arithmetic, are the two places where this page says so. Nothing here is taken from a third-party article about the game, and the coverage of the three WARDOGS sites was read on the same day.</p>
</div>

<figure class="pagefig"><picture><source media="(prefers-color-scheme: light)" srcset="/assets/img/wardogs-battalion-1944-launch-light.png"><img src="/assets/img/wardogs-battalion-1944-launch.png" width="1200" height="630" alt="Battalion 1944 launch card: closed alpha on 26 May 2017, no streaming under the test agreement, and a 2018 plan promising free DLC"></picture><figcaption>Drawn for this page, dark or light to match. The studio's own rules and dates, published in 2017 and 2018.</figcaption></figure>

${adUnit}

<div class="readnext">
<p><a href="/wardogs-battalion-1944">Battalion 1944 — how BULKHEAD designed the shooter it made before WARDOGS &rarr;</a></p>
<p><a href="/wardogs">Scoring, prices and platform support for WARDOGS &rarr;</a></p>
<p><a href="/wardogs-release-date">When WARDOGS released, and what the date did not settle &rarr;</a></p>
<p><a href="/wardogs-early-access">What the developers say about Early Access timing and the full game &rarr;</a></p>
</div>`,
};
