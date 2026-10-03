// The PS5 page, built from the three-step sheet at
// outputs/drafts/wardogs-game-ps5-开工三步-20261004.md and the thread digest at
// outputs/drafts/wardogs-xbox-geforcenow-原话-20261004.md. Both were read and
// agreed before this file existed; the shape is the shape of an existing page,
// not a new one.
//
// Two things this page will not do.
//
// 1. It will not turn "consoles in 2028" into a PS5 date. The studio's own
//    pinned Q&A gives a year for consoles and no day, and Sony's listing
//    carries the year with the field type that means year-and-nothing-finer.
//    Neither one names a month, so this page prints no month.
//
// 2. It will not quote the Xbox thread, or any other site. The route below is
//    described in our words and attributed: a player's report, dated, not a
//    studio statement and not something this site has run itself.
//
// Every figure comes from src/data/live.mjs (the store surfaces read on
// 3 October 2026) or from a dated reading named next to it on the page.
import { adUnit } from "../ad.mjs";
import { faqList } from "../faq.mjs";
import { live } from "../data/live.mjs";

const S = live.wardogsStoreSurface;
const READ = "19:26 UTC on 3 October 2026";
const READ_DAY = "3 October 2026";
const FAQ_POSTED = "9 February 2026";
const FAQ_EDITED = "10 September 2026";
const THREAD_DAY = "11 September 2026";

const categoriesInProse = S.categories.join(", ");

const faqs = [
  {
    q: "What platforms will WARDOGS be available on?",
    a: `The studio answers this in its own pinned Q&amp;A: &ldquo;The game is currently being developed for PC. Launching on consoles in 2028. Controller support is limited in the current version.&rdquo; That thread was posted on ${FAQ_POSTED} and last edited on ${FAQ_EDITED}; it was read on ${READ_DAY}. Sony&rsquo;s PlayStation listing exists, in the state it prints as Announced, and carries the year ${S.psStoreYear} with no month and no day. Valve&rsquo;s listing for the same game sets Windows true and macOS and Linux false, and carries no console platform at all (read ${READ}).`,
  },
  {
    q: "Does Wardogs have a release date?",
    a: `Not one finer than a year, for consoles. Sony&rsquo;s listing holds ${S.psStoreYear} in the field its own data marks as a year, and the studio&rsquo;s Q&amp;A says the same year and nothing narrower. No month, no day and no pre-order date appears on either (read ${READ}). The day that is firmly dated is the PC one: Valve&rsquo;s listing gives the Steam release date as 10 September 2026, which is already past (read ${READ}).`,
  },
  {
    q: "Where can I play Wardogs game?",
    a: `On a Windows PC, from Steam, today. A player posting to r/xbox on ${THREAD_DAY} described a second route on a console: running GeForce NOW inside the Xbox&rsquo;s Edge browser, with a controller. Three limits sit in the same thread, and all come from the people in it rather than from the studio: the game still has to be owned on Steam, the cloud service is paid or needs a day pass, and one reply reports latency. That is a player&rsquo;s account, dated, and this site has not run it.`,
  },
  {
    q: "War dogs game ps5 crossplay",
    a: `Valve&rsquo;s listing returns ${S.categoryCount} category rows &mdash; ${categoriesInProse} &mdash; and not one of them is a cross-platform row (read ${READ}). That is what we did not read, not a statement that crossplay is absent: the studio has published no crossplay answer on the console question. Microsoft&rsquo;s listing for the same game does carry a store tag reading Xbox cross-platform multiplayer (read ${READ}); it is a store tag and this page does not read a promise out of it.`,
  },
  {
    q: "Wardogs game XBOX",
    a: `Microsoft&rsquo;s store has a listing for WARDOGS, published by Team17 Digital Ltd and credited to BULKHEAD, carrying the label Optimized for ${S.xboxStoreOptimised} (read ${READ}). Like Sony&rsquo;s, it is a page you can wishlist rather than buy from; the console version itself is dated no finer than 2028 in either company&rsquo;s own data.`,
  },
  {
    q: "War dogs game ps5 price",
    a: `Sony&rsquo;s listing shows no price. It prints the state Announced, a release of ${S.psStoreYear}, and a button to add the game to a wishlist instead of a buy button (read ${READ}). The PC price is a separate figure on a store that is already selling the game, and it is not the console price; it is tracked by region on <a href='/wardogs-price'>the price page</a> rather than copied here.`,
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
        { "@type": "ListItem", position: 3, name: "WARDOGS on PS5", item: SITE + "/wardogs-game-ps5" },
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
      url: SITE + "/wardogs-game-ps5",
      applicationCategory: "Game",
      gamePlatform: "PC",
      author: { "@type": "Organization", name: "BULKHEAD" },
      publisher: { "@type": "Organization", name: "Team17" },
      sameAs: ["https://store.steampowered.com/app/1867240/WARDOGS/"],
    },
  ],
};

const faqHtml = faqList(faqs);

export const page = {
  ogImage: "https://shooteratlas.com/assets/img/wardogs-game-ps5.png",
  source: "src/pages/wardogs-game-ps5.mjs",
  path: "/wardogs-game-ps5",
  title: "WARDOGS on PS5 — announced for 2028, no date and no price",
  description:
    "The studio's own pinned Q&A says consoles in 2028; Sony's listing holds a page in the Announced state with a year, a wishlist button and no price. What is confirmed, what is not, the route players are using on an Xbox in the meantime, and the four sources to check yourself.",
  extraHead:
    "<script type='application/ld+json'>" + JSON.stringify(schema) + "</script>",
  body: `<h1>WARDOGS on PS5: announced for 2028, no date and no price</h1>
<p class="lede">There are two layers to this, and they point in opposite directions. <strong>The official position is a year and nothing finer:</strong> the studio's own pinned Q&amp;A says &ldquo;The game is currently being developed for PC. Launching on consoles in 2028&rdquo;, and Sony's PlayStation listing holds ${S.psStoreYear} in the field its own data types as a year (<a href='https://store.playstation.com/en-us/concept/10020847'>PlayStation Store listing</a>, read ${READ}). <strong>Meanwhile players are already on a console:</strong> a thread on r/xbox dated ${THREAD_DAY} describes running the PC build through a cloud service inside the Xbox's own browser, and that route, its three limits and the date it was read are set out below.</p>

<div class="strip">
<div><span class="stat-n">${S.psStoreYear}</span><span class="stat-k">consoles, official year</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">${S.psStoreState}</span><span class="stat-k">the state Sony prints</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">No price</span><span class="stat-k">on the PS Store listing</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">${S.windowsText} only</span><span class="stat-k">the one platform Valve lists</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
</div>

<h2>What platforms will WARDOGS be available on?</h2>
<p>This question is the studio's own, and so is the answer. The pinned thread on the game's Steam forum, posted by a Team17 account on ${FAQ_POSTED} and last edited on ${FAQ_EDITED}, runs through the game's basics in that question-and-answer form, and the platforms entry reads: <strong>&ldquo;The game is currently being developed for PC. Launching on consoles in 2028. Controller support is limited in the current version.&rdquo;</strong> (<a href='https://steamcommunity.com/app/1867240/discussions/0/762932533852726673/'>official pinned Q&amp;A</a>, read ${READ}).</p>
<p>That is the whole of the official answer. It names no console, no month and no price, and the same post's release-date entry says only &ldquo;WARDOGS is NOW LIVE in Early Access&rdquo; &mdash; the year 2028 belongs to consoles, and it is not attached to anything narrower than a year.</p>
<p>What Sony holds is a listing rather than a release. The page exists, it is filed under WARDOGS and published by Team17 Software Ltd., and it prints the state <strong>${S.psStoreState}</strong> with a release of <strong>${S.psStoreYear}</strong> and a wishlist button in place of a buy button (<a href='https://store.playstation.com/en-us/concept/10020847'>PlayStation Store listing</a>, read ${READ}). Valve's side of the same question is simpler: the game's own listing sets ${S.windowsText} true and ${S.macText} and ${S.linuxText} false, and carries no console platform at all (<a href='https://store.steampowered.com/api/appdetails?appids=1867240&amp;cc=us&amp;l=english'>Steam appdetails API</a>, read ${READ}).</p>
<p class="src">Sources for this section: the studio's pinned Q&amp;A thread on Steam (posted ${FAQ_POSTED}, last edited ${FAQ_EDITED}), Sony's PlayStation Store listing for concept 10020847, and Valve's appdetails for app 1867240. All three were read at ${READ}.</p>

<h2>Does Wardogs have a release date?</h2>
<p>For consoles, no &mdash; only a year, and the year is written in a way that says so. Sony's listing stores the release in a typed field whose value is ${S.psStoreYear} and whose type is the one meaning a year with nothing finer attached (<a href='https://store.playstation.com/en-us/concept/10020847'>PlayStation Store listing</a>, read ${READ}). The studio's Q&amp;A gives the same year in words. Neither one names a month, a day or an unlock hour, and neither one is taking pre-orders.</p>
<p>The date that is firmly fixed belongs to the PC build and has already passed: Valve's own store data gives the release as &ldquo;Sep 10, 2026&rdquo; (<a href='https://store.steampowered.com/api/appdetails?appids=1867240&amp;cc=us&amp;l=english'>Steam appdetails API</a>, read ${READ}). That day and its 16:00 UTC unlock hour are on <a href='/wardogs-release-date'>the release date page</a>, with the sources that carry them.</p>
<p>There is no month to print here, so this page prints none. Anything that puts a month on the console release &mdash; or a season, or a window inside 2028 &mdash; is not in either company's own data as read on ${READ_DAY}.</p>

<h2>Where can I play Wardogs game?</h2>
<p>On a Windows PC, from Steam, today. Valve's listing has been selling the game since 10 September 2026 and its platform flags say the PC build is the Windows one (read ${READ}).</p>
<p>A second route on a console was posted to r/xbox on ${THREAD_DAY}, by a player rather than by the studio. In that account the game runs on an Xbox through <strong>GeForce NOW inside the console's Edge browser</strong>, with a controller, and it says the game's own options menu takes controller sensitivity once you are in. It also gives the sequence that makes the menus usable: switch Controller Mode off in Edge first, so the cursor works, then join a server, at which point the browser hands control back to the controller (<a href='https://www.reddit.com/comments/1wduxdv'>r/xbox thread, posted ${THREAD_DAY}</a>, read ${READ_DAY}).</p>
<p>Three limits sit in the same thread, and every one of them is a participant's statement rather than a company's:</p>
<ul>
<li><strong>The game still has to be owned on Steam.</strong> A reply in the thread reports paying for the cloud service and then being stopped by a licence check pointing back at Steam, and another reply answers that the game has to be bought on Steam to stream it (r/xbox, replies dated 17 and 20 September 2026, read ${READ_DAY}).</li>
<li><strong>The cloud service is paid, or needs a pass.</strong> Asked what it costs, the poster answers that a day pass can be bought to try it before committing to a subscription (r/xbox, replies of ${THREAD_DAY}, read ${READ_DAY}).</li>
<li><strong>Latency is reported as a problem.</strong> One reply in the thread says the latency of playing this way would be bad for some people even on a fast connection, and that they would rather wait for 2028 (r/xbox, reply dated 18 September 2026, read ${READ_DAY}).</li>
</ul>
<p class="src">As of ${READ_DAY} that thread is the account this page can point at, and it is a player's, not the studio's: this site has not run the route itself, GeForce NOW and Edge are not ours, and the thread also carries a separate report of an Xbox controller behaving oddly once in a match. Two things are checkable at the source instead &mdash; whether you own the game on Steam, and whether the cloud service is offering the game where you are.</p>

<h2>War dogs game ps5 crossplay</h2>
<p>Searches put crossplay next to the console question, so here is exactly what can be read and what cannot. Valve returns ${S.categoryCount} category rows for the game &mdash; <strong>${categoriesInProse}</strong> &mdash; and no cross-platform row among them (<a href='https://store.steampowered.com/api/appdetails?appids=1867240&amp;cc=us&amp;l=english'>Steam appdetails API</a>, read ${READ}).</p>
<p>Say that carefully: this is a row we did not read on the PC listing, not a statement that crossplay is absent. The studio's own console announcement and its pinned Q&amp;A say nothing about crossplay either way, so there is no official answer to quote in place of the missing row.</p>
<p>One more label is worth printing next to it, with its limits attached. Microsoft's listing for the same game carries a feature tag reading <strong>&ldquo;Xbox cross-platform multiplayer&rdquo;</strong> (<a href='https://www.xbox.com/en-US/games/store/wardogs/9p55z0jjgvwn'>Xbox store listing</a>, read ${READ}). That is a store's own taxonomy tag rather than a studio statement, and this page reports the tag without reading a promise out of it: it is a tag about Microsoft&rsquo;s own ecosystem, and it is not a claim about PS5 players meeting anyone.</p>

<h2>Wardogs game XBOX</h2>
<p>The other console has a listing too, and it is at the same stage. Microsoft publishes a page titled <em>Buy WARDOGS</em>, credited to BULKHEAD and published by Team17 Digital Ltd, carrying the label <strong>Optimized for ${S.xboxStoreOptimised}</strong> (<a href='https://www.xbox.com/en-US/games/store/wardogs/9p55z0jjgvwn'>Xbox store listing</a>, read ${READ}).</p>
<p>What neither listing carries is a date on which anything can be bought. Sony's prints the state ${S.psStoreState} and a year; Microsoft's is a page you can wishlist. The console launch is dated no finer than 2028 in the two companies' own data and in the studio's own words.</p>
<p class="src">Source: the two console listings named above, and the studio's pinned Q&amp;A, all read at ${READ}. Nothing in this section comes from a news article about the announcement; it is the listings themselves.</p>

<h2>War dogs game ps5 price</h2>
<p>There is no PS5 price, because there is nothing on the PS5 side to price yet. Sony's listing prints no figure at all &mdash; no price, no pre-order, no edition, just the year ${S.psStoreYear} and a button to add the game to a wishlist (<a href='https://store.playstation.com/en-us/concept/10020847'>PlayStation Store listing</a>, read ${READ}).</p>
<p>The figure the search results tend to show next to this question is the PC price, and it belongs to a different store: Valve has been selling the game on Steam since 10 September 2026, at a United States price of $39.99 with a 0% discount (<a href='https://store.steampowered.com/api/appdetails?appids=1867240&amp;cc=us&amp;l=english'>Steam appdetails API</a>, read ${READ}). That is a Steam price on a Steam listing, and this page does not carry it over to a console that has not opened for sale. The eight regional Steam prices, each with its own read date, are on <a href='/wardogs-price'>the price page</a>.</p>

<h2>Checking it yourself</h2>
<p>Four pages hold everything above, and none of them needs an account:</p>
<ul>
<li><strong>Valve's own endpoint</strong> for the game's platform flags and category rows: <code>https://store.steampowered.com/api/appdetails?appids=1867240</code> &mdash; read ${READ}.</li>
<li><strong>Sony's PlayStation listing</strong> at <code>https://store.playstation.com/en-us/concept/10020847</code> &mdash; the state, the year and the wishlist button &mdash; read ${READ}.</li>
<li><strong>Microsoft's Xbox listing</strong> at <code>https://www.xbox.com/en-US/games/store/wardogs/9p55z0jjgvwn</code> &mdash; read ${READ}.</li>
<li><strong>The studio's pinned Q&amp;A</strong> on the game's Steam forum, the thread that carries the platforms answer in its own words &mdash; posted ${FAQ_POSTED}, last edited ${FAQ_EDITED}, read ${READ}.</li>
</ul>
<p class="src">Every figure on this page was read at ${READ}. Nothing here is a live value that changes on its own: the platform flags and category rows come out of src/data/live.mjs, which is the one file on this site where a reading like that is written down, and the rest is dated beside the claim it supports.</p>

<div class="qa">
<h2>Common questions</h2>
${faqHtml}
<p class="src">Answers here repeat what the sections above establish, with the same read dates. Where a question asks for a month, a price or a crossplay promise, the answer is that no source this site could read on ${READ_DAY} supplies one.</p>
</div>

<figure class="pagefig"><picture><source media="(prefers-color-scheme: light)" srcset="/assets/img/wardogs-game-ps5-light.png"><img src="/assets/img/wardogs-game-ps5.png" width="1200" height="630" alt="WARDOGS on PS5 card: consoles dated 2028, Sony's listing in the Announced state, and Windows as the one platform Valve lists"></picture><figcaption>Drawn for this page, dark or light to match. Figures as read on ${READ_DAY}.</figcaption></figure>

${adUnit}

<div class="readnext">
<p><a href="/wardogs-release-date">The PC release date, the 16:00 UTC unlock hour and the launch-day queue figures &rarr;</a></p>
<p><a href="/wardogs-steam">The Steam listing read field by field, with the date each line was read &rarr;</a></p>
<p><a href="/wardogs-steam-deck">Valve's own compatibility check for the Deck, SteamOS and Steam Machine &rarr;</a></p>
<p><a href="/wardogs-price">What WARDOGS costs in eight Steam regions &rarr;</a></p>
<p><a href="/wardogs-player-count">Who is playing on Steam right now, and how to read the number yourself &rarr;</a></p>
</div>`,
};
