// One array drives both the visible questions and the FAQPage JSON-LD.
const faqs = [
  {
    q: "Does WARDOGS run on the Steam Deck?",
    a: "Not now. Valve's own store data for the game returns a compatibility result of \"does not support\" for the Steam Deck, for SteamOS and for Steam Machine &mdash; the payload's only entry for each is the token <code>SteamOSDoesNotSupport</code> (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 1 October 2026). There is no Verified or Playable badge on the page, and no plan or date is attached to the current answer.",
  },
  {
    q: "What does the studio itself say about Linux and Proton?",
    a: "The official thread pinned at the top of the WARDOGS Steam discussions, posted by the studio's KingHoward on 4 September 2026, says: \"We do not officially support Linux and we cannot commit to having support for launch. We are still working on Official Linux Proton compatibility.\" The same post tells anyone who bought expecting Proton to work to refund (<a href='https://steamcommunity.com/app/1867240/discussions/0/588436698284962639/'>pinned Steam thread</a>, read 1 October 2026).",
  },
  {
    q: "Has anything changed since launch?",
    a: "Only in one direction, and it is a holding statement rather than a date. The 25 September 2026 update inside that pinned post says there is \"no additional information to share regarding WARDOGS Linux compatibility or timeline\" beyond repeating that Linux support via Proton is still wanted (<a href='https://steamcommunity.com/app/1867240/discussions/0/588436698284962639/'>pinned Steam thread</a>, read 1 October 2026). Nothing newer exists on Valve's announcement feed either.",
  },
  {
    q: "Is the anti-cheat the reason?",
    a: "It is the reason the studio gives indirectly and the reason the shape of the problem is what it is. The store page's feature block says \"Uses Kernel Level Anti-Cheat\" and names one provider, Elytra (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 1 October 2026); a kernel-level driver is loaded inside Windows, and Proton translates a Windows game without providing a Windows kernel for that driver to load into. Neither Valve nor the studio publishes a statement that names the anti-cheat as the specific blocker, so this page labels that as a reading, not a quotation.",
  },
  {
    q: "Didn't it work on Linux during the beta?",
    a: "That is what got people buying, and the studio's own answer is that those tests worked \"by happen stance\". Press coverage carried on Valve's own announcement feed reported on 13 August 2026 that the game looked set to work on Linux and SteamOS, and followed up on 5 September 2026 that support via Proton may come later (<a href='https://store.steampowered.com/news/app/1867240'>Steam news hub for WARDOGS</a>, read 1 October 2026). The pinned post also says the official stance has not changed since pre-release, and that a community manager's message that circulated on the Linux subreddit was a communication mistake.",
  },
  {
    q: "Can I fix it with a launch option or a different Proton version?",
    a: "Nothing Valve or the studio publishes suggests that, and both of the two published surfaces point the other way: the studio says it does not officially support Linux, and Valve's compatibility payload returns the same \"does not support\" answer for Deck, SteamOS and Steam Machine (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 1 October 2026). This page is not going to invent a workaround it cannot source; if a workaround arrives, it will have to come from the same two places, and neither has published one.",
  },
  {
    q: "Should I buy it now and wait for support?",
    a: "The studio's own advice is the opposite. The pinned post asks Linux buyers to \"refund the game if you mistakenly bought it thinking you would be able to run Linux via Proton on September 10th\", and Valve's refund window for a Steam purchase is normally fourteen days and under two hours of play (<a href='https://store.steampowered.com/steam_refunds/'>Steam refunds page</a>, read 1 October 2026). A game that cannot connect also cannot rack up the play time, but the fourteen days move regardless.",
  },
  {
    q: "Does WARDOGS work on GeForce NOW?",
    a: "Not confirmed anywhere official. The third-party hub reports that NVIDIA announced the game for GeForce NOW on 10 September 2026 and then could not ship it, and it advises treating any listing dated before 11 September 2026 as the announcement rather than the outcome (reported, not confirmed; wardogshub.gg, read 2 October 2026). Neither the studio nor Valve publishes a statement on it, and no new date appears in the material read for this page.",
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
        { "@type": "ListItem", position: 3, name: "Steam Deck and Linux", item: SITE + "/wardogs-steam-deck" },
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
      url: SITE + "/wardogs-steam-deck",
      applicationCategory: "Game",
      gamePlatform: "PC (Windows)",
      publisher: "Team17",
      datePublished: "2026-09-10",
      sameAs: ["https://store.steampowered.com/app/1867240/WARDOGS/"],
    },
  ],
};

const faqHtml = faqList(faqs);

import { adUnit } from "../ad.mjs";
import { faqList } from "../faq.mjs";

export const page = {
  ogImage: "https://shooteratlas.com/assets/img/wardogs-steam-deck.png",
  source: "src/pages/wardogs-steam-deck.mjs",
  path: "/wardogs-steam-deck",
  title: "WARDOGS on the Steam Deck — Valve's own compatibility check says no",
  description:
    "Steam's store data for WARDOGS returns a \"does not support\" result for the Steam Deck, SteamOS and Steam Machine, the store lists Windows only, and the studio has told Linux buyers to refund. Read 1 October 2026.",
  extraHead:
    "<style>" +
    "blockquote{margin:0 0 1.2rem;padding:.7rem 1rem;border-left:3px solid var(--rule);color:var(--muted);font-style:italic;font-size:.98rem}" +
    "blockquote code,code{font-size:.92em}" +
    "</style>" +
    "<script type='application/ld+json'>" + JSON.stringify(schema) + "</script>",
  body: `<h1>WARDOGS on the Steam Deck: Valve's own check says no</h1>
<p class="lede">No. Steam's store data for WARDOGS carries a hardware-compatibility payload, and every entry in it &mdash; Steam Deck, SteamOS and Steam Machine &mdash; returns the same result token, <code>SteamOSDoesNotSupport</code> (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 1 October 2026). The store lists Windows 10 and Windows 11 as the only supported systems, and the studio's own pinned post in the Steam discussions says it does not officially support Linux and has told Linux buyers to refund.</p>

<div class="strip">
<div><span class="stat-n">DoesNotSupport</span><span class="stat-k">Valve's result for Deck, SteamOS and Machine</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">Windows</span><span class="stat-k">only platform in the store's own list</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">0</span><span class="stat-k">Verified or Playable badges on the page</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">4 Sep 2026</span><span class="stat-k">studio post behind the ruling</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">2,522</span><span class="stat-k">replies on that thread</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
</div>

<h2>Valve's answer, printed rather than described</h2>
<p>Steam's store page does not print a badge for this game. It does carry the compatibility result in the page's own data, one block for each device Valve tests for, and the tokens are readable without signing in. Copied out of the page exactly as they appear (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 1 October 2026):</p>
<blockquote>data-hardwarecompatibility: resolved_items <code>#SteamDeckVerified_TestResult_SteamOSDoesNotSupport</code><br />steamos_resolved_items <code>#SteamOS_TestResult_SteamOSDoesNotSupport</code><br />machine_resolved_items <code>#SteamMachine_TestResult_SteamOSDoesNotSupport</code></blockquote>
<p>Three device families, one verdict each, and all three verdicts are the same word. That is a stronger statement than the absence of a badge usually gets read as: Valve's compatibility system has an answer for WARDOGS, and the answer is not "Playable" and not "Verified".</p>
<p>The same two surfaces agree on the platform. The store page's System Requirements block lists Windows 10 for minimum and Windows 11 for recommended, with no Linux line (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 1 October 2026), and the store API's platform object reads windows true, mac false, linux false (<a href='https://store.steampowered.com/api/appdetails?appids=1867240&cc=us&l=english'>Steam appdetails API</a>, read 1 October 2026).</p>

<h2>The studio's position, in the words it pinned</h2>
<p>The statement that decides most of this is a Steam discussion post, written by an account marked as a developer under the name KingHoward, pinned to the top of the WARDOGS forum and dated 4 September 2026. It has 2,522 replies at the time of reading (<a href='https://steamcommunity.com/app/1867240/discussions/0/588436698284962639/'>pinned Steam thread</a>, read 1 October 2026):</p>
<blockquote>"We do not officially support Linux and we cannot commit to having support for launch. We are still working on Official Linux Proton compatibility. This official stance has not changed since pre-release. We admit there was a mistake in communication by our CM which was unfortunetly screenshotted in our Discord and then posted on the linux Reddit, when the official stance has always been 'we are working on proton compatibility'."</blockquote>
<p>Two more sentences in the same post matter more than the tone does. On the beta builds: "Any previous Alpha/Beta test where Linux worked was by happen stance". And on money: "So please, refund the game if you mistakenly bought it thinking you would be able to run Linux via Proton on September 10th."</p>
<p>The post carries one update, dated 25 September 2026, and it is a refusal to speculate rather than news: "We do not have any additional information to share regarding WARDOGS Linux compatibility or timeline, other than reiterating that we hear and acknowledge the demand and it is still our desire to officially support Linux via Proton." That is the newest official word on the subject as of 1 October 2026.</p>

<h2>What the store page says is in the way</h2>
<p>The two deployed surfaces point at one component. The store page's feature block reads "Uses Kernel Level Anti-Cheat", and the only anti-cheat provider named anywhere on the page is Elytra (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 1 October 2026). Kernel-level means a driver is loaded inside the operating system, and Proton's job is to translate a Windows game onto a Linux system that has no Windows kernel for a Windows driver to load into.</p>
<p><strong>What is official here and what is not:</strong> the "Uses Kernel Level Anti-Cheat" line and the provider name are Valve's own page text. The link between that anti-cheat and the Deck verdict is this page's reading of how the two facts fit together. Neither Valve's store page nor the studio's pinned post says in a sentence that the anti-cheat is what blocks the Deck, and this page will not put words in either mouth. What can be said without reading anything into it is that the studio is asking for official Proton compatibility from the anti-cheat's side, and that it has not announced receiving it.</p>

<h2>Where the expectation came from</h2>
<p>People did not invent the idea that this game ran on Linux. Valve's own news hub for WARDOGS carries press coverage of exactly that, and the two items that set the expectation are both August and September 2026 (<a href='https://store.steampowered.com/news/app/1867240'>Steam news hub for WARDOGS</a>, read 1 October 2026): a 13 August 2026 report that the game looked set to work on Linux and SteamOS with the developers working on Proton support, and a 5 September 2026 follow-up that they had clarified support via Proton may come later. The studio's pinned post answers the same question from its side, calling the working test builds happenstance.</p>
<p>Those reports are press items, not Valve statements and not studio statements, which is why they sit in their own paragraph here instead of being quoted as fact. What they establish is the timeline: expectation in August, clarification in early September, refunds advised in the first week after the 10 September launch.</p>

<h2>What the three WARDOGS sites carry, and what this page adds</h2>
<p>All three were swept page by page on 1 October 2026, every URL each site lists in its own sitemap, fetched and searched:</p>
<ul>
<li><strong>wardogshub.gg</strong> is the only one of the three with a real article on this, published 26 September 2026 and updated the next day; its answer matches ours &mdash; no, and refund if you bought for Linux. Where it stops is the badge: it says the store "shows no Deck rating that we can see". Valve does return a result, and the three tokens are printed above (wardogshub.gg, read 1 October 2026).</li>
<li><strong>wardogs.site</strong> covers it in one place: its system requirements page says Linux and the Steam Deck are not supported at launch. Three of the site's 27 pages mention Steam Deck, and none of them carries Valve's compatibility result or the studio's pinned statement (wardogs.site, read 1 October 2026).</li>
<li><strong>wardogs.wiki</strong> has nothing to carry it with: it is an item database whose search API returns zero results for Linux, Proton and Steam Deck (wardogs.wiki API, read 1 October 2026).</li>
</ul>
<p>What this page adds is small and checkable: Valve's three compatibility tokens quoted from the page rather than summarised, the studio's pinned post read and dated first-hand instead of second-hand, and the separation of what is official from what is this page's reading.</p>

<h2>How each claim here is labelled</h2>
<p>Every conclusion on this site sits in one of three buckets. This page is unusually dependent on the first one, because almost everything above is a quotation.</p>
<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="layers-caption">
<table class="matrix">
<caption id="layers-caption">Every claim on this page, sorted. Read 1 October 2026.</caption>
<thead><tr><th scope="col">Layer</th><th scope="col">What is in it</th></tr></thead>
<tbody>
<tr><td>Confirmed officially</td><td class="wrap-cell">Valve's three compatibility tokens and the absence of a Verified or Playable badge. The Windows-only requirements block and the API's platform flags. The "Uses Kernel Level Anti-Cheat" line and the Elytra attribution, both on the store page. The studio's pinned post in full, including the 4 September date, the refund advice, the "happen stance" sentence and the 25 September update.</td></tr>
<tr><td>Observed, not officially confirmed</td><td class="wrap-cell">This page's reading that the kernel-level anti-cheat is what stands between the game and the Deck, and its reading that a "does not support" token is a firmer statement than a missing badge. Both connect official facts; neither is stated by Valve or the studio in those words.</td></tr>
<tr><td>Not yet confirmed</td><td class="wrap-cell">Whether the anti-cheat has a Proton build at all, and whether the studio would turn it on if it did. What the August beta's anti-cheat was, given that the store page names only the current one. Any date for Linux support. Whether the Deck result will ever be re-tested by Valve.</td></tr>
</tbody>
</table>
</div>

<h2>Still not on any official record</h2>
<p>The gaps are part of the answer here, so they are written down rather than left out:</p>
<ul>
<li><strong>A date, or a no.</strong> The studio says support is being worked on and that there is no timeline. There is no published target, and no published statement that it has been given up.</li>
<li><strong>A named blocker from the studio.</strong> The anti-cheat is named on the store page as a feature. No official sentence says it is the obstacle, and no official sentence says it is not.</li>
<li><strong>An explanation of the beta.</strong> "Happen stance" is the studio's own account and it is not a technical one; nothing official describes which build ran, or under what.</li>
<li><strong>Whether Proton would be enough.</strong> Valve's token describes compatibility, not what the studio would have to ship. Nothing published says that a Proton-compatible anti-cheat alone would flip the result.</li>
<li><strong>A statement about the Steam Machine result.</strong> Valve's payload returns the same "does not support" token for it, and no page anywhere &mdash; Valve, studio or press &mdash; addresses that device for this game.</li>
</ul>

<div class="qa">
<h2>Common questions</h2>
${faqHtml}
<p class="src">Where this comes from, all read on 1 October 2026: the <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>WARDOGS store page</a> for the compatibility payload, the system requirements and the feature block; the <a href='https://store.steampowered.com/api/appdetails?appids=1867240&cc=us&l=english'>Steam appdetails API</a> for the platform flags; the <a href='https://steamcommunity.com/app/1867240/discussions/0/588436698284962639/'>pinned Linux compatibility thread</a> for the studio's own words and the 25 September update; the <a href='https://store.steampowered.com/news/app/1867240'>Steam news hub for WARDOGS</a> for the press items in the August and September timeline; and <a href='https://store.steampowered.com/steam_refunds/'>Steam's refunds page</a> for the window. The coverage claims about the three other WARDOGS sites come from fetching every URL each site lists in its sitemap on the same day.</p>
</div>

<figure class="pagefig"><picture><source media="(prefers-color-scheme: light)" srcset="/assets/img/wardogs-steam-deck-light.png"><img src="/assets/img/wardogs-steam-deck.png" width="1200" height="630" alt="Card for WARDOGS on the Steam Deck: Valve's result reads DoesNotSupport for Deck, SteamOS and Steam Machine, and the store lists Windows only"></picture><figcaption>Drawn for this page, dark or light to match. Figures as read on 1 October 2026.</figcaption></figure>

${adUnit}

<div class="readnext">
<p><a href="/wardogs-steam">What the store listing itself says, line by line &rarr;</a></p>
<p><a href="/wardogs-gameplay">The one mode, and the two names that are not modes &rarr;</a></p>
<p><a href="/wardogs-genres">Five genres, eight categories, Windows only &rarr;</a></p>
<p><a href="/wardogs">Scoring, prices and platform support for WARDOGS &rarr;</a></p>
<p><a href="/wardogs-languages">The fourteen languages WARDOGS ships, and which have audio &rarr;</a></p>
</div>`,
};
