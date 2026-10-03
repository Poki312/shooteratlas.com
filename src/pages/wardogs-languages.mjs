// One array drives both the visible questions and the FAQPage JSON-LD, so the
// structured data can never drift from what a reader can open on the page.
const faqs = [
  {
    q: "How many languages does WARDOGS support?",
    a: "Fourteen. Valve's store page lists English, French, Italian, German, Spanish - Spain, Japanese, Korean, Portuguese - Brazil, Russian, Simplified Chinese, Traditional Chinese, Polish, Turkish and Ukrainian, and its collapsed label for the block reads \"English and 13 more\" (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 30 September 2026).",
  },
  {
    q: "Does WARDOGS have full audio in every language?",
    a: "No. Of the store table's three columns, the Full Audio column carries a tick for English and for nobody else, and Valve's own store API says the same thing in words: the language string marks English with an asterisk, and the note under it reads \"*languages with full audio support\" (<a href='https://store.steampowered.com/api/appdetails?appids=1867240&cc=us&l=english'>Steam appdetails API</a>, read 30 September 2026).",
  },
  {
    q: "Does WARDOGS have subtitles?",
    a: "Valve's store table does not say so: in the copy this page read, the Subtitles column is empty for all fourteen languages, including English, while the Interface column is ticked for all fourteen (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 30 September 2026). Under Steam's usual convention an unmarked language in the API field would imply interface plus subtitles, so the two Valve surfaces do not agree. This page prints both and does not pick one, because neither states what the build actually contains.",
  },
  {
    q: "Which languages are WARDOGS players actually playing in?",
    a: "Valve's public review API answers that by language. Asked for all purchase types on 30 September 2026 it returns 62,512 reviews written in English, 8,020 in Simplified Chinese, 5,722 in Russian, 5,483 in German and 2,374 in French, with the other nine listed languages smaller still; together the fourteen account for 91,773 of the 97,424 reviews the API reports (<a href='https://store.steampowered.com/appreviews/1867240?json=1&language=all&purchase_type=all&num_per_page=0'>Steam review API</a>, read 30 September 2026).",
  },
  {
    q: "Why do the reviews differ so much between languages?",
    a: "They do, and this page will not guess at the reason. Steam's own summary label is Very Positive for English (80.5% of 62,512), German (80.4%), Spanish - Spain (82.4%), Italian (80.4%) and Portuguese - Brazil (87.9%), while it reads Mostly Negative for Simplified Chinese (39.5% of 8,020) and Mixed for Traditional Chinese (45.8%), Japanese (55.6%), Korean (60.1%) and Russian (65.6%) (<a href='https://store.steampowered.com/appreviews/1867240?json=1&language=all&purchase_type=all&num_per_page=0'>Steam review API</a>, read 30 September 2026). The pattern is worth knowing; the cause is not in the data, and no review-level study of it exists in anything we could read.",
  },
  {
    q: "Why does this page say 62,512 English reviews when the reviews page says 51,079?",
    a: "Different days and different surfaces. Our <a href='/wardogs-reviews'>reviews page</a> took its English figure from the store page's own block on 28 September 2026; this page reads Valve's review API on 30 September 2026 and labels the filter it used (all purchase types). Numbers on both surfaces move every day, and Valve publishes no document describing exactly which reviews each surface counts, so this site prints the date and the filter next to every figure instead of reconciling them by guesswork.",
  },
  {
    q: "Are more languages coming?",
    a: "Nothing in the material we could read says so. The store's language block lists what is there now, the language field in Valve's API carries no pending list, and no announcement in the studio's Steam feed mentions language work. This page therefore prints no date and no count for future languages.",
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
        { "@type": "ListItem", position: 3, name: "Languages", item: SITE + "/wardogs-languages" },
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
      url: SITE + "/wardogs-languages",
      applicationCategory: "Game",
      gamePlatform: "PC",
      inLanguage: ["en", "fr", "it", "de", "es", "ja", "ko", "pt-BR", "ru", "zh-Hans", "zh-Hant", "pl", "tr", "uk"],
      sameAs: ["https://store.steampowered.com/app/1867240/WARDOGS/"],
    },
  ],
};

const faqHtml = faqList(faqs);

import { adUnit } from "../ad.mjs";
import { faqList } from "../faq.mjs";

export const page = {
  ogImage: "https://shooteratlas.com/assets/img/wardogs-languages.png",
  source: "src/pages/wardogs-languages.mjs",
  path: "/wardogs-languages",
  title: "WARDOGS language support — 14 languages, one with full audio",
  description:
    "Valve's store table for WARDOGS ticks Interface for fourteen languages and Full Audio for English alone, and leaves the Subtitles column empty for all of them. This page prints the table column by column, quotes Valve's own language field, and adds a per-language reading of the review API so you can see where the players are.",
  extraHead:
    "<script type='application/ld+json'>" + JSON.stringify(schema) + "</script>",
  body: `<h1>WARDOGS language support: 14 languages, one with full audio</h1>
<p class="lede"><strong>Valve's store page for WARDOGS lists fourteen languages, ticks the Interface column for all of them, ticks Full Audio for English alone, and leaves the Subtitles column empty for every one of them.</strong> Valve's own store API names the same fourteen and marks English as the language with full audio support. The two surfaces do not say the same thing, so this page prints both instead of picking one &mdash; and then adds a language-by-language reading of Valve's public review API, which shows how many players in each of those fourteen languages are actually writing about the game.</p>

<div class="strip">
<div><span class="stat-n">14</span><span class="stat-k">languages on the store's list</span><span class="stat-src"><span class="src-chip src-official">Valve</span></span></div>
<div><span class="stat-n">1</span><span class="stat-k">with full audio: English</span><span class="stat-src"><span class="src-chip src-official">Valve</span></span></div>
<div><span class="stat-n">0</span><span class="stat-k">subtitles ticks in the table</span><span class="stat-src"><span class="src-chip src-official">Valve</span></span></div>
<div><span class="stat-n">97,424</span><span class="stat-k">reviews, all languages</span><span class="stat-src"><span class="src-chip src-official">Valve's API</span></span></div>
</div>

<h2>The fourteen languages, as the store table serves them</h2>
<p>The language block on the store page is a table with three columns, and the difference between them is the whole answer to "what languages does this game have?". Read row by row on 30 September 2026 it looks like this (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 30 September 2026):</p>
<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="lang-caption">
<table class="matrix">
<caption id="lang-caption">The store's language table, reproduced column by column. Read 30 September 2026.</caption>
<thead><tr><th scope="col">Language</th><th scope="col">Interface</th><th scope="col">Full Audio</th><th scope="col">Subtitles</th></tr></thead>
<tbody>
<tr><td>English</td><td class="num">yes</td><td class="num">yes</td><td class="num">&mdash;</td></tr>
<tr><td>French</td><td class="num">yes</td><td class="num">&mdash;</td><td class="num">&mdash;</td></tr>
<tr><td>Italian</td><td class="num">yes</td><td class="num">&mdash;</td><td class="num">&mdash;</td></tr>
<tr><td>German</td><td class="num">yes</td><td class="num">&mdash;</td><td class="num">&mdash;</td></tr>
<tr><td>Spanish - Spain</td><td class="num">yes</td><td class="num">&mdash;</td><td class="num">&mdash;</td></tr>
<tr><td>Japanese</td><td class="num">yes</td><td class="num">&mdash;</td><td class="num">&mdash;</td></tr>
<tr><td>Korean</td><td class="num">yes</td><td class="num">&mdash;</td><td class="num">&mdash;</td></tr>
<tr><td>Portuguese - Brazil</td><td class="num">yes</td><td class="num">&mdash;</td><td class="num">&mdash;</td></tr>
<tr><td>Russian</td><td class="num">yes</td><td class="num">&mdash;</td><td class="num">&mdash;</td></tr>
<tr><td>Simplified Chinese</td><td class="num">yes</td><td class="num">&mdash;</td><td class="num">&mdash;</td></tr>
<tr><td>Traditional Chinese</td><td class="num">yes</td><td class="num">&mdash;</td><td class="num">&mdash;</td></tr>
<tr><td>Polish</td><td class="num">yes</td><td class="num">&mdash;</td><td class="num">&mdash;</td></tr>
<tr><td>Turkish</td><td class="num">yes</td><td class="num">&mdash;</td><td class="num">&mdash;</td></tr>
<tr><td>Ukrainian</td><td class="num">yes</td><td class="num">&mdash;</td><td class="num">&mdash;</td></tr>
</tbody>
</table>
</div>
<p>Collapsed on a narrow screen, the same block is labelled "English and 13 more", which is how most visitors will meet it. Expanded, it contains fifteen ticks in total: fourteen in the Interface column, one in Full Audio, and none in Subtitles. That last count is the finding, not a typo in this table &mdash; the columns here are reproduced from Valve's markup, where English's row carries ticks in Interface and Full Audio, every other row carries a single tick in Interface, and every Subtitles cell in the table is empty (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, tick count read twice from two fetches on 30 September 2026).</p>

<figure class="pagefig"><picture><source media="(prefers-color-scheme: light)" srcset="/assets/img/wardogs-languages-fig-ticks-light.png"><img src="/assets/img/wardogs-languages-fig-ticks.png" width="1200" height="630" alt="Three panels counting Valve's language ticks for WARDOGS: 14 for Interface, 1 for Full Audio, 0 for Subtitles"></picture><figcaption>Valve's own table, counted column by column: fourteen interface ticks, one full-audio tick, no subtitle ticks. Read 30 September 2026.</figcaption></figure>

<h2>The same fourteen, as Valve's API writes them</h2>
<p>The store's API carries its own language field, and it is the string most third-party trackers quote. For this app it reads, verbatim (<a href='https://store.steampowered.com/api/appdetails?appids=1867240&cc=us&l=english'>Steam appdetails API</a>, read 30 September 2026):</p>
<blockquote><p>"English*, French, Italian, German, Spanish - Spain, Japanese, Korean, Portuguese - Brazil, Russian, Simplified Chinese, Traditional Chinese, Polish, Turkish, Ukrainian<br>*languages with full audio support"</p></blockquote>
<p>Three things are worth noticing about that string. It names exactly the same fourteen languages as the table. It has no Subtitles concept at all &mdash; the field is a single list with one annotation. And its one annotation is the asterisk, which the second line defines as full audio support; this app's response carries no separate full-audio field at all, so the asterisk is the only full-audio signal Valve sends here.</p>

<h2>Where the two surfaces disagree</h2>
<p>Under Steam's long-standing convention, a language named in that API field is supported for interface and subtitles, and a starred language adds full audio. If you read the field that way, WARDOGS has fourteen languages with subtitles and one with full audio &mdash; and that is the reading most coverage of this game has used.</p>
<p>The table Valve serves does not support the second half of that reading. Its Subtitles column is ticked for nobody, including English, which carries full audio. Both surfaces are Valve's, both were read on the same day, and they cannot both be describing the same support matrix in the usual way. This page is not going to resolve it by choosing the friendlier version: what it can say is that one surface names fourteen languages, the other ticks interface for fourteen, full audio for one, and subtitles for none.</p>
<p>What would settle it is a statement from the studio or Valve about how complete each language is inside the build. Neither publishes one, and the game's own announcement feed does not mention language work at all. Until something does, treat "fourteen languages" as a fact about the store listing and "fourteen languages of subtitles" as an assumption.</p>

<h2>Where the players are, language by language</h2>
<p>The store's language table says nothing about how many people are on the other end of each translation. Valve's public review API does, because every review carries the language it was written in. Asked for all purchase types on 30 September 2026, it returns this (<a href='https://store.steampowered.com/appreviews/1867240?json=1&language=all&purchase_type=all&num_per_page=0'>Steam review API</a>, read 30 September 2026):</p>
<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="rev-caption">
<table class="matrix">
<caption id="rev-caption">Reviews by the language they were written in, all purchase types. Read 30 September 2026.</caption>
<thead><tr><th scope="col">Language</th><th scope="col">Reviews</th><th scope="col">Positive</th><th scope="col">Steam's own label</th></tr></thead>
<tbody>
<tr><td>English</td><td class="num">62,512</td><td class="num">80.5%</td><td>Very Positive</td></tr>
<tr><td>Simplified Chinese</td><td class="num">8,020</td><td class="num">39.5%</td><td>Mostly Negative</td></tr>
<tr><td>Russian</td><td class="num">5,722</td><td class="num">65.6%</td><td>Mixed</td></tr>
<tr><td>German</td><td class="num">5,483</td><td class="num">80.4%</td><td>Very Positive</td></tr>
<tr><td>French</td><td class="num">2,374</td><td class="num">77.8%</td><td>Mostly Positive</td></tr>
<tr><td>Spanish - Spain</td><td class="num">1,526</td><td class="num">82.4%</td><td>Very Positive</td></tr>
<tr><td>Polish</td><td class="num">1,267</td><td class="num">80.0%</td><td>Mostly Positive</td></tr>
<tr><td>Turkish</td><td class="num">1,212</td><td class="num">74.7%</td><td>Mostly Positive</td></tr>
<tr><td>Korean</td><td class="num">925</td><td class="num">60.1%</td><td>Mixed</td></tr>
<tr><td>Traditional Chinese</td><td class="num">791</td><td class="num">45.8%</td><td>Mixed</td></tr>
<tr><td>Japanese</td><td class="num">667</td><td class="num">55.6%</td><td>Mixed</td></tr>
<tr><td>Ukrainian</td><td class="num">643</td><td class="num">70.1%</td><td>Mostly Positive</td></tr>
<tr><td>Italian</td><td class="num">424</td><td class="num">80.4%</td><td>Very Positive</td></tr>
<tr><td>Portuguese - Brazil</td><td class="num">207</td><td class="num">87.9%</td><td>Very Positive</td></tr>
<tr><td>All languages</td><td class="num">97,424</td><td class="num">75.7%</td><td>Mostly Positive</td></tr>
</tbody>
</table>
</div>
<p>Two observations fall out of that table, and both are labelled as observations because the API records what people wrote, not why they wrote it. The first is arithmetic: the fourteen listed languages account for 91,773 of the 97,424 reviews, so 5,651 reviews &mdash; 5.8% of the total &mdash; were written in languages the store does not list at all. The second is a pattern: the five Very Positive labels sit in English, Spanish - Spain, German, Italian and Portuguese - Brazil, while Simplified Chinese is the only language Steam labels Mostly Negative and holds the second-largest review count on the page (both read from <a href='https://store.steampowered.com/appreviews/1867240?json=1&language=all&purchase_type=all&num_per_page=0'>Valve's review API</a> on 30 September 2026; the shares are our arithmetic on its counts).</p>
<p>Neither observation is a verdict on the localisation, and this page will not write one. A review written in Russian is not necessarily about the Russian text; it is a review by a Russian-speaking player about the game. The honest use of this table is to show where the audience is &mdash; which is the question the store's language block leaves open.</p>

<figure class="pagefig"><picture><source media="(prefers-color-scheme: light)" srcset="/assets/img/wardogs-languages-fig-reviews-light.png"><img src="/assets/img/wardogs-languages-fig-reviews.png" width="1200" height="630" alt="Bar chart of WARDOGS reviews by language, from English at 62,512 down to Portuguese - Brazil at 207, with bar length on a logarithmic scale"></picture><figcaption>Reviews by the language they were written in, from Valve's review API, one request per language. Bar length is logarithmic so the smaller languages stay visible; every printed count is exact. Read 30 September 2026.</figcaption></figure>

<h3>The languages the store does not list at all</h3>
<p>Those 5,651 unlisted reviews are worth naming, because they are the clearest evidence that the store's language block understates the audience rather than overstating it. Asking the same API for the language codes that are not on Valve's fourteen turns up this tail &mdash; each figure a count of reviews written in that language, all purchase types (<a href='https://store.steampowered.com/appreviews/1867240?json=1&language=all&purchase_type=all&num_per_page=0'>Steam review API</a>, read 30 September 2026):</p>
<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="unlisted-caption">
<table class="matrix">
<caption id="unlisted-caption">The largest languages not on the store's list, by review count. Read 30 September 2026.</caption>
<thead><tr><th scope="col">Language</th><th scope="col">Reviews</th><th scope="col">Steam's own label</th></tr></thead>
<tbody>
<tr><td>Czech</td><td class="num">611</td><td>Very Positive</td></tr>
<tr><td>Dutch</td><td class="num">331</td><td>Very Positive</td></tr>
<tr><td>Swedish</td><td class="num">328</td><td>Very Positive</td></tr>
<tr><td>Spanish - Latin America</td><td class="num">313</td><td>Very Positive</td></tr>
<tr><td>Thai</td><td class="num">287</td><td>Mostly Positive</td></tr>
<tr><td>Hungarian</td><td class="num">206</td><td>Very Positive</td></tr>
<tr><td>Norwegian</td><td class="num">204</td><td>Very Positive</td></tr>
<tr><td>Finnish</td><td class="num">186</td><td>Very Positive</td></tr>
<tr><td>Danish</td><td class="num">183</td><td>Very Positive</td></tr>
<tr><td>Greek</td><td class="num">31</td><td>Positive</td></tr>
</tbody>
</table>
</div>
<figure class="pagefig"><picture><source media="(prefers-color-scheme: light)" srcset="/assets/img/wardogs-languages-fig-unlisted-light.png"><img src="/assets/img/wardogs-languages-fig-unlisted.png" width="1200" height="630" alt="Bar chart of reviews in languages the store does not list: Czech 611, Dutch 331, Swedish 328, Spanish - Latin America 313, Thai 287, and five more down to Greek at 31"></picture><figcaption>Reviews in the ten largest languages that are not on Valve's fourteen-language list, from the review API. Read 30 September 2026.</figcaption></figure>

<p>Those ten account for 2,650 of the 5,651 unlisted reviews, and all of it is Valve's own count (<a href='https://store.steampowered.com/appreviews/1867240?json=1&language=all&purchase_type=all&num_per_page=0'>Steam review API</a>, read 30 September 2026). A review written in Czech is a review by a Czech-speaking player, and the API says nothing about which language the game's own text was in for them &mdash; this page is not going to infer it. What the table does establish is the direction of the gap: the store lists fourteen languages, and the largest audience it does not list is Czech on 611 reviews with a Very Positive label, ahead of Dutch, Swedish and Latin American Spanish. The audience this game has is wider than the language list on its store page.</p>

<h2>What the three WARDOGS sites have, and what this page adds</h2>
<p>All three were swept end to end on 30 September 2026 &mdash; every URL in each site's own sitemap, fetched and searched for language, subtitle and audio coverage:</p>
<ul>
<li><strong>wardogs.site</strong> lists 27 pages and not one of them mentions language support, subtitles or audio for the game. The site itself is published in three languages &mdash; its menu carries EN / DE / FR chips and it serves German and French copies of its pages &mdash; but that is the site's own translation work, not a record of the game's (wardogs.site, read 30 September 2026).</li>
<li><strong>wardogshub.gg</strong> lists 861 pages. None contains the word subtitle. Its audio mentions are troubleshooting pages &mdash; no audio, audio selection, key bindings &mdash; and server listings that note a community's spoken language, which is a fact about that server and not about the game (wardogshub.gg, read 30 September 2026).</li>
<li><strong>wardogs.wiki</strong> lists 486 pages. None contains subtitle or localisation, and the pages naming languages are about translating the wiki itself rather than the game (wardogs.wiki, read 30 September 2026).</li>
</ul>
<p>What this page adds is therefore small in shape and large in consequence: Valve's table read column by column rather than collapsed, Valve's API string quoted verbatim beside it, the disagreement between the two written down instead of papered over, and a per-language review reading that shows where the fourteen audiences actually are. None of the three sites carries any of it, and the store page itself carries only the first part.</p>

<h2>How each claim on this page is labelled</h2>
<p>This site sorts every conclusion into one of three buckets. On this page the split matters more than usual, because most of what is missing here is missing from Valve's own data rather than from this page.</p>
<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="layers-caption">
<table class="matrix">
<caption id="layers-caption">Every claim on this page, sorted. Read 30 September 2026.</caption>
<thead><tr><th scope="col">Layer</th><th scope="col">What is in it</th></tr></thead>
<tbody>
<tr><td>Confirmed by Valve</td><td class="wrap-cell">The fourteen languages and their order. The Interface tick on all fourteen, the single Full Audio tick on English, and the empty Subtitles column. The "English and 13 more" label. The API language string, quoted verbatim, including its asterisk note. Every review count, percentage and summary label in the by-language table, which is the API's own output.</td></tr>
<tr><td>Observed, not officially confirmed</td><td class="wrap-cell">The two readings this page puts on Valve's numbers: that the fourteen listed languages cover 91,773 of 97,424 reviews and 5,651 come from languages not on the list, and that the weakest summary labels sit among the languages without full audio. Both are arithmetic and pattern-matching on Valve's data; Valve states neither, and neither is a statement about why players wrote what they wrote.</td></tr>
<tr><td>Not yet confirmed</td><td class="wrap-cell">How complete each of the fourteen languages is inside the build. Whether subtitles exist at all, given that the store's subtitles column is empty while the API field implies them. Whether audio will ever be localised beyond English. Whether any language arrived after launch. None of it is stated by Valve or the studio in anything read here.</td></tr>
</tbody>
</table>
</div>

<h2>Still not on any official record</h2>
<p>The gaps are part of the answer here, so they are written down rather than left out:</p>
<ul>
<li><strong>A per-language completeness statement.</strong> Nothing Valve or the studio publishes says how much of the interface, the item text or the voice lines each of the fourteen languages covers.</li>
<li><strong>An explanation of the empty Subtitles column.</strong> It could mean the game ships without subtitles, or that the field was simply never filled in. Valve documents neither case, and this page does not guess.</li>
<li><strong>Player counts by language.</strong> Valve publishes a live total and review counts; it publishes no per-language player figure. Review volume is the closest public proxy and it is a writing habit, not a headcount.</li>
<li><strong>Localisation credits or patch notes.</strong> No announcement in the studio's Steam feed covers language work, before or after launch.</li>
<li><strong>Which languages might follow.</strong> No pending list appears in the store data, and no statement exists to quote.</li>
</ul>

<div class="qa">
<h2>Common questions</h2>
${faqHtml}
<p class="src">Where this comes from: Valve's own surfaces for WARDOGS, all read on 30 September 2026 &mdash; the <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>store page</a> for the language table, with its ticks counted twice from two separate fetches on the same day; the <a href='https://store.steampowered.com/api/appdetails?appids=1867240&cc=us&l=english'>appdetails API</a> for the language string and the full-audio note; and the <a href='https://store.steampowered.com/appreviews/1867240?json=1&language=all&purchase_type=all&num_per_page=0'>review API</a> for every count and percentage in the by-language table, requested once per language with the purchase filter named in the caption. The coverage claims about the three other WARDOGS sites come from fetching every URL each site lists in its sitemap on the same day. Nothing on this page is quoted from a third-party tracker, and nothing is inferred except where the page says it is.</p>
</div>

<figure class="pagefig"><picture><source media="(prefers-color-scheme: light)" srcset="/assets/img/wardogs-languages-light.png"><img src="/assets/img/wardogs-languages.png" width="1200" height="630" alt="WARDOGS language card: 14 languages listed, 1 with full audio, 0 subtitles ticks in Valve's table"></picture><figcaption>Drawn for this page, dark or light to match. Valve's own counts, read 30 September 2026.</figcaption></figure>

${adUnit}

<div class="readnext">
<p><a href="/wardogs-reviews">What 51,079 English Steam reviews say about WARDOGS &rarr;</a></p>
<p><a href="/wardogs">Scoring, prices and platform support for WARDOGS &rarr;</a></p>
<p><a href="/wardogs-price">What WARDOGS costs in eight Steam regions &rarr;</a></p>
<p><a href="/wardogs-release-date">When WARDOGS released, and what the date did not settle &rarr;</a></p>
</div>`,
};
