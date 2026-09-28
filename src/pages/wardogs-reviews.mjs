// One array drives both the visible questions and the FAQPage JSON-LD.
const faqs = [
  {
    q: "What is the review score for WARDOGS on Steam?",
    a: "On the English store view, 54,566 user reviews at 81% positive, which Steam sums up as Very Positive. The count and the percentage are Valve's; this page only reports them.",
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

const faqHtml = faqs.map((f) => `<h3>${f.q}</h3>\n<p>${f.a}</p>`).join("\n");

import { adUnit } from "../ad.mjs";

export const page = {
  ogImage: "https://shooteratlas.com/assets/img/wardogs-reviews.png",
  source: "src/pages/wardogs-reviews.mjs",
  path: "/wardogs-reviews",
  title: "WARDOGS Steam reviews — 54,566 of them, 81% positive",
  description:
    "On the English Steam store page for WARDOGS (app 1867240), read on 28 September 2026, 54,566 user reviews are 81% positive for a 'Very Positive' summary. None of the three WARDOGS coverage sites track review sentiment — here is the figure and what it means.",
  extraHead:
    "<script type='application/ld+json'>" + JSON.stringify(schema) + "</script>",
  body: `<h1>WARDOGS on Steam: what 54,566 reviews say</h1>
<p class="lede">On the <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>English Steam store page</a> for WARDOGS (app 1867240), read on 28 September 2026, the game carries 54,566 user reviews at 81% positive, which Steam sums up as "Very Positive". That single line is the most complete statement Steam makes about how players feel, and none of the three sites that cover WARDOGS in depth — wardogs.site, wardogs.wiki and wardogshub.gg — reproduces it. This page is that figure, and what it does and does not tell you.</p>

<h2>Where the number comes from</h2>
<p class="src">Source: the <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>English Steam store page for WARDOGS</a>, read on 28 September 2026.</p>
<p>Steam prints the review total and the positive percentage on <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>every store page</a>, visible without owning or signing in to the game. For WARDOGS the English store view reports 54,566 reviews, 81% of them positive. Valve computes the percentage and the summary label; this page only reports them. The count moves every day as new players review, so treat it as a 28 September 2026 snapshot rather than a fixed rating.</p>

<h2>What "Very Positive" means here</h2>
<p>Steam attaches its own summary label to every game's reviews, and for WARDOGS that label is "Very Positive" — the store's second-highest rating, one step below "Overwhelmingly Positive". Eighty-one percent positive is a clear majority: the large majority of the people who wrote a review left a positive one, and roughly one review in five was negative.</p>

<h2>Why this page exists</h2>
<p>The three sites that document WARDOGS in depth cover different ground. wardogs.site is a translated official changelog and FAQ. wardogs.wiki is a database of item stats with no editorial articles. wardogshub.gg tracks concurrent player counts, prices, weapons and progression. All three measure the game's size or its live population; none of them reports the review sentiment Steam itself publishes. That gap is the reason this page exists — it is first-party Steam data that the coverage ecosystem leaves unread.</p>

<h2>Two cautions before you quote it</h2>
<ul>
<li>The 54,566 is the English-store reading on 28 September 2026. The global total across all store languages is at least that, and the positive percentage can shift as the review base grows.</li>
<li>Review scores measure mood, not content. They say how the people who wrote a review felt, not whether the match length, the anti-cheat or the economy work the way you want — those are separate questions this site covers on other pages.</li>
</ul>

<div class="qa">
<h2>Common questions</h2>
${faqHtml}
<p class="src">Every figure on this page comes from the <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>WARDOGS store page</a> on Steam, read on 28 September 2026. Valve computes the review count, the positive percentage and the summary label; this page reports them unchanged.</p>
</div>

<figure class="pagefig"><img src="/assets/img/wardogs-reviews.png" width="1200" height="630" alt="WARDOGS reviews card: 54,566 user reviews, 81% positive, summary Very Positive"><figcaption>Drawn for this page. Figures as read on 28 September 2026.</figcaption></figure>

${adUnit}

<div class="readnext">
<p><a href="/wardogs">Scoring, prices and platform support for WARDOGS &rarr;</a></p>
<p><a href="/wardogs-early-access">What the developers say about Early Access timing and the full game &rarr;</a></p>
<p><a href="/wardogs-achievements">All ten WARDOGS achievements and how rare each one is &rarr;</a></p>
</div>`,
};
