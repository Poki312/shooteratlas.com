// One array drives both the visible questions and the FAQPage JSON-LD.
const faqs = [
  {
    q: "What is the review score for WARDOGS on Steam?",
    a: "On the English store view, 51,079 user reviews at 81% positive, which Steam sums up as Very Positive. Across all languages the same reading totals 76,407, which grades Mostly Positive. Both counts and both labels are Valve's; this page only reports them.",
  },
  {
    q: "What does the Very Positive summary mean?",
    a: "It is Steam's second-highest rating, one step below Overwhelmingly Positive, and the label is Valve's own. Eighty-one percent positive means roughly one review in five was negative.",
  },
  {
    q: "Do the reviews change?",
    a: "Yes. New reviews land every day and the positive percentage moves with them, so treat the figure on this page as a 28 September 2026 snapshot rather than a fixed rating.",
  },
  {
    q: "Do the reviews tell me whether the game is good?",
    a: "They measure mood, not content. They say how the people who wrote a review felt, not whether the match length, the anti-cheat or the economy work the way you want.",
  },
  {
    q: "Why is this figure missing from the other WARDOGS sites?",
    a: "The three sites that document the game in depth track its size, its live population or its item stats. None of them reports the review sentiment Steam itself publishes.",
  },
  {
    q: "Where can I read the reviews myself?",
    a: "On the <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>English Steam store page</a>, without owning the game or signing in (read 28 September 2026).",
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
        { "@type": "ListItem", position: 2, name: "WARDOGS Steam reviews", item: SITE + "/wardogs-reviews" },
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
  ],
};

const faqHtml = faqList(faqs);

import { adUnit } from "../ad.mjs";
import { faqList } from "../faq.mjs";

export const page = {
  ogImage: "https://shooteratlas.com/assets/img/wardogs-reviews.png",
  source: "src/pages/wardogs-reviews.mjs",
  path: "/wardogs-reviews",
  title: "WARDOGS Steam reviews — 51,079 English, 81% positive",
  description:
    "On the English Steam store view for WARDOGS (app 1867240), read on 28 September 2026, 51,079 user reviews are 81% positive for a 'Very Positive' summary, inside 76,407 across all languages, which grades 'Mostly Positive'. Two counts from one store page, and why both are correct.",
  extraHead:
    "<script type='application/ld+json'>" + JSON.stringify(schema) + "</script>",
  body: `<h1>WARDOGS on Steam: what 51,079 reviews say</h1>
<p class="lede">On the <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>English Steam store view</a> for WARDOGS (app 1867240), read on 28 September 2026, the game carries 51,079 English reviews at 81% positive, which Steam sums up as "Very Positive" — inside 76,407 reviews across all languages, which grades "Mostly Positive". That single line is the most complete statement Steam makes about how players feel, and none of the three sites that cover WARDOGS in depth — wardogs.site, wardogs.wiki and wardogshub.gg — reproduces it. This page is both figures, and what they do and do not tell you.</p>

<div class="strip">
<div><span class="stat-n">51,079</span><span class="stat-k">English reviews</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">81%</span><span class="stat-k">of them positive</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">Very Positive</span><span class="stat-k">Steam's summary, English view</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">76,407</span><span class="stat-k">all languages: Mostly Positive</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
</div>

<h2>Where the number comes from</h2>
<p class="src">Source: the <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>English Steam store page for WARDOGS</a>, read on 28 September 2026.</p>
<p>Steam prints the review total and the positive percentage on <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>every store page</a>, visible without owning or signing in to the game. For WARDOGS the English store view reports 51,079 reviews, 81% of them positive. Valve computes the percentage and the summary label; this page only reports them. The count moves every day as new players review, so treat it as a 28 September 2026 snapshot rather than a fixed rating.</p>

<h2>Why Steam shows two different totals</h2>
<p>Steam counts reviews through two filters at once: the language the reader is viewing in, and whether the review was written by someone who owns the game through Steam. Change either one and the total changes, with nothing about the game changing. The English figure and the all-language figure are therefore both correct at the same moment, and neither is a correction of the other. This page prints both, from the same reading on 28 September 2026:</p>
<div class="data-block">
<div class="data-head">
<h3>The same store page, two counts</h3>
<span class="data-note"><span class="src-chip src-official">official</span> read 28 Sep 2026</span>
</div>
<div class="matrix-scroll" role="region" tabindex="0" aria-label="The same store page, two counts">
<table class="matrix">
<thead><tr><th scope="col">View</th><th scope="col" class="num">Reviews</th><th scope="col">Steam's summary</th></tr></thead>
<tbody>
<tr><td>English</td><td class="num">51,079</td><td><span class="pill pill--live">Very Positive</span></td></tr>
<tr><td>All languages</td><td class="num">76,407</td><td><span class="pill pill--ea">Mostly Positive</span></td></tr>
</tbody>
</table>
</div>
<p class="data-foot">Steam computes the count, the percentage and the summary label; this table reproduces what the store page returned on 28 September 2026. The 81% quoted on this page is the English view's percentage — the all-language reading gives the summary label, so no percentage is printed for it rather than one being estimated.</p>
</div>
<p>If you have seen a third number for WARDOGS elsewhere, it is almost certainly one of these two filters read differently rather than a contradiction. Mixing them — a count from one filter beside a percentage from the other — produces a rating the store page itself does not show, which is why this page keeps them apart.</p>

<figure class="pagefig"><picture><source media="(prefers-color-scheme: light)" srcset="/assets/img/wardogs-reviews-fig-totals-light.png"><img src="/assets/img/wardogs-reviews-fig-totals.png" width="1200" height="630" alt="Bar chart of the two WARDOGS review totals on the same store page: 51,079 English reviews and 76,407 across all languages"></picture><figcaption>The two totals the same store page returns, drawn to the same scale. Read 28 September 2026.</figcaption></figure>

<h2>What "Very Positive" means here</h2>
<p>Steam attaches its own summary label to every game's reviews, and for WARDOGS that label is "Very Positive" — the store's second-highest rating, one step below "Overwhelmingly Positive". Eighty-one percent positive is a clear majority: the large majority of the people who wrote a review left a positive one, and roughly one review in five was negative.</p>

<figure class="pagefig"><picture><source media="(prefers-color-scheme: light)" srcset="/assets/img/wardogs-reviews-fig-share-light.png"><img src="/assets/img/wardogs-reviews-fig-share.png" width="1200" height="630" alt="Three figures from the English store view: 66.9% is the English share of all 76,407 reviews, 81% is the positive rate, and the summary reads Very Positive"></picture><figcaption>English share and rating, from the store page's own figures; the share is our arithmetic on them. Read 28 September 2026.</figcaption></figure>

<h2>Why this page exists</h2>
<p>The three sites that document WARDOGS in depth cover different ground. wardogs.site is a translated official changelog and FAQ. wardogs.wiki is a database of item stats with no editorial articles. wardogshub.gg tracks concurrent player counts, prices, weapons and progression. All three measure the game's size or its live population; none of them reports the review sentiment Steam itself publishes. That gap is the reason this page exists — it is first-party Steam data that the coverage ecosystem leaves unread.</p>

<h2>Two cautions before you quote it</h2>
<ul>
<li>The 51,079 is the English reading on 28 September 2026; the all-language total from the same reading is 76,407, which grades Mostly Positive. Both move every day, and the positive percentage moves with them.</li>
<li>Review scores measure mood, not content. They say how the people who wrote a review felt, not whether the match length, the anti-cheat or the economy work the way you want — those are separate questions this site covers on other pages.</li>
</ul>

<div class="qa">
<h2>Common questions</h2>
${faqHtml}
<p class="src">Every figure on this page comes from the <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>WARDOGS store page</a> on Steam, read on 28 September 2026. Valve computes the review count, the positive percentage and the summary label; this page reports them unchanged.</p>
</div>

<figure class="pagefig"><picture><source media="(prefers-color-scheme: light)" srcset="/assets/img/wardogs-reviews-light.png"><img src="/assets/img/wardogs-reviews.png" width="1200" height="630" alt="WARDOGS reviews card: 51,079 English reviews, 81% positive, summary Very Positive"></picture><figcaption>Drawn for this page, dark or light to match. Figures as read on 28 September 2026.</figcaption></figure>

${adUnit}

<div class="readnext">
<p><a href="/wardogs">Scoring, prices and platform support for WARDOGS &rarr;</a></p>
<p><a href="/wardogs-early-access">What the developers say about Early Access timing and the full game &rarr;</a></p>
<p><a href="/wardogs-achievements">All ten WARDOGS achievements and how rare each one is &rarr;</a></p>
<p><a href="/wardogs-languages">Which languages those reviews were written in, and what the store lists &rarr;</a></p>
</div>`,
};
