// One array drives both the visible questions and the FAQPage JSON-LD.
const faqs = [
  {
    q: "How much does WARDOGS cost?",
    a: "In the United States the base game is $39.99 and the Supporter Edition is $49.99 (<a href='https://store.steampowered.com/app/1867240/WARDOGS/?cc=us'>Steam store page, US region</a>, read 29 September 2026). Valve prices each store region in its own currency, and the same day's readings for the United Kingdom, Germany, Japan, Korea, Brazil, Australia and Canada are in the table above.",
  },
  {
    q: "Which region is the cheapest for WARDOGS?",
    a: "This page does not rank the regions, because converting one region's price into another currency does not produce a price anyone can pay. Valve sets the number in each region's own currency, and the only figure that applies to you is the one your own Steam store shows when you are signed in (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 29 September 2026).",
  },
  {
    q: "How much more is the Supporter Edition?",
    a: "Between 22.5% and 26.0% more than the base game, in every one of the eight regions read on 29 September 2026 — that percentage is our arithmetic on Valve's two prices for each region, not a figure Valve publishes.",
  },
  {
    q: "Is WARDOGS on sale?",
    a: "No. On 29 September 2026 every one of the eight regions returned a discount of 0% on both editions, which means the figure you see is the full listed price (<a href='https://store.steampowered.com/app/1867240/WARDOGS/?cc=us'>Steam store page</a>, read 29 September 2026).",
  },
  {
    q: "Will the price go up?",
    a: "Yes, by design. The Early Access Q&amp;A block on the <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a> says the game is planned to be priced lower during Early Access, with a higher price at full release, and it publishes no figure for that future price (read 29 September 2026).",
  },
  {
    q: "Why is there no price for Russia?",
    a: "Because Steam returns none. Asked for the Russian region, Valve's store API answers with no price data at all for this app rather than a rouble figure, and this page prints what the API returns instead of estimating one (<a href='https://store.steampowered.com/api/appdetails?appids=1867240&amp;cc=ru&amp;l=english'>Steam appdetails API, cc=ru</a>, read 29 September 2026).",
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
        { "@type": "ListItem", position: 3, name: "WARDOGS price by region", item: SITE + "/wardogs-price" },
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
      url: SITE + "/wardogs-price",
      applicationCategory: "Game",
      gamePlatform: "PC",
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

const faqHtml = faqs.map((f) => `<h3>${f.q}</h3>\n<p>${f.a}</p>`).join("\n");

import { adUnit } from "../ad.mjs";

export const page = {
  ogImage: "https://shooteratlas.com/assets/img/wardogs-price.png",
  source: "src/pages/wardogs-price.mjs",
  path: "/wardogs-price",
  title: "WARDOGS price by region — what Steam charges in eight countries",
  description:
    "WARDOGS is $39.99 in the US, £36.99 in the UK, €39.99 in Germany, ¥4,980 in Japan, ₩47,270 in Korea, R$119.99 in Brazil, A$54.95 in Australia and CDN$49.99 in Canada, read from Valve's store API on 29 September 2026. Supporter Edition prices, the premium in each region, and the region Valve returns nothing for.",
  extraHead:
    "<script type='application/ld+json'>" + JSON.stringify(schema) + "</script>",
  body: `<h1>WARDOGS price by region: eight Steam regions, read today</h1>
<p class="lede">WARDOGS costs $39.99 in the United States, £36.99 in the United Kingdom, €39.99 in Germany, ¥4,980 in Japan, ₩47,270 in Korea, R$119.99 in Brazil, A$54.95 in Australia and CDN$49.99 in Canada, with the Supporter Edition running between 22.5% and 26.0% above the base game in every one of those regions. All of it was read from Valve's own store API on 29 September 2026, and none of it is a currency conversion — these are the numbers Valve returns for each region, at a 0% discount. One region returns no price at all, and that is printed below rather than guessed. The three WARDOGS coverage sites do not have this matrix: wardogs.site states that it verifies United States pricing only.</p>

<h2>The full matrix</h2>
<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="price-matrix-caption">
<table class="matrix">
<caption id="price-matrix-caption">WARDOGS, base game and Supporter Edition, by Steam region. Read 29 September 2026.</caption>
<thead><tr><th scope="col">Region</th><th scope="col">Base game</th><th scope="col">Supporter Edition</th><th scope="col">Read from</th></tr></thead>
<tbody>
<tr><td>United States</td><td>$39.99</td><td>$49.99</td><td><a href='https://store.steampowered.com/app/1867240/WARDOGS/?cc=us'>Steam store, US</a></td></tr>
<tr><td>United Kingdom</td><td>£36.99</td><td>£45.99</td><td><a href='https://store.steampowered.com/app/1867240/WARDOGS/?cc=gb'>Steam store, UK</a></td></tr>
<tr><td>Germany</td><td>€39.99</td><td>€49.99</td><td><a href='https://store.steampowered.com/app/1867240/WARDOGS/?cc=de'>Steam store, DE</a></td></tr>
<tr><td>Japan</td><td>¥4,980</td><td>¥6,200</td><td><a href='https://store.steampowered.com/app/1867240/WARDOGS/?cc=jp'>Steam store, JP</a></td></tr>
<tr><td>Korea</td><td>₩47,270</td><td>₩58,000</td><td><a href='https://store.steampowered.com/app/1867240/WARDOGS/?cc=kr'>Steam store, KR</a></td></tr>
<tr><td>Brazil</td><td>R$119.99</td><td>R$146.99</td><td><a href='https://store.steampowered.com/app/1867240/WARDOGS/?cc=br'>Steam store, BR</a></td></tr>
<tr><td>Australia</td><td>A$54.95</td><td>A$67.95</td><td><a href='https://store.steampowered.com/app/1867240/WARDOGS/?cc=au'>Steam store, AU</a></td></tr>
<tr><td>Canada</td><td>CDN$49.99</td><td>CDN$62.99</td><td><a href='https://store.steampowered.com/app/1867240/WARDOGS/?cc=ca'>Steam store, CA</a></td></tr>
<tr><td>Russia</td><td>no price returned</td><td>no price returned</td><td><a href='https://store.steampowered.com/api/appdetails?appids=1867240&amp;cc=ru&amp;l=english'>Steam API, cc=ru</a></td></tr>
</tbody>
</table>
</div>
<p class="src">Every figure in that table, including the empty Russian row, was read on 29 September 2026 from the region-specific Steam store view linked in the last column. The machine-readable source is Valve's own appdetails endpoint, <a href='https://store.steampowered.com/api/appdetails?appids=1867240&amp;cc=us&amp;l=english'>store.steampowered.com/api/appdetails?appids=1867240</a> with a <code>cc</code> parameter per region; the same call with <code>cc=ru</code> returns no price data for this app. The dollar, pound, euro, yen, won, real, Australian dollar and Canadian dollar figures are not conversions of one another — they are the prices Valve sets for those regions.</p>

<h2>What the Supporter Edition actually adds</h2>
<p>The Supporter Edition is the base game plus a cosmetic Supporter Pack, so the step up in price is not a step up in gameplay. Across the eight regions read on 29 September 2026 that step is between 22.5% (Brazil, R$119.99 to R$146.99) and 26.0% (Canada, CDN$49.99 to CDN$62.99); that range is our arithmetic on Valve's two prices, not a figure Valve publishes.</p>
<p>The itemised cosmetics are listed by the field-guide site <a href='https://wardogs.site/price/'>wardogs.site</a> (read 29 September 2026) as four vehicle and weapon camos, a Supporter scoreboard icon and two vehicle bobbleheads. Nothing in that list is described as a gameplay advantage, and the store page presents the pack as a supporter purchase rather than a content expansion.</p>

<h2>No discount, anywhere, on the day this was read</h2>
<p>All eight regions returned a discount of 0% on both editions on 29 September 2026 (<a href='https://store.steampowered.com/api/appdetails?appids=1867240&amp;cc=us&amp;l=english'>Steam appdetails API</a>, read 29 September 2026). WARDOGS entered Early Access on 10 September 2026, so this is a launch-price window rather than a discounted one; if you are waiting for a sale, nothing in Valve's data for the regions above says one has started.</p>

<h2>The price is planned to rise</h2>
<p>Early Access pricing is deliberately the low point. The Q&amp;A block on the <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>store page</a> states that the studio plans for WARDOGS to be priced lower during Early Access, with a higher price at full release to reflect the more complete experience, and that the game is expected to remain in Early Access for around one to two years (read 29 September 2026). No number is attached to the future price anywhere on that page — so any figure you see quoted for the 1.0 price, including on this site, should be treated as unsourced. There is not one here.</p>

<h2>Why this page exists</h2>
<p>The pricing picture across the three WARDOGS coverage sites stops at one country. <a href='https://wardogs.site/price/'>wardogs.site</a> gives the two United States figures and answers "do prices vary by country?" by saying it verifies United States pricing only and telling readers to check their own Steam region (read 29 September 2026). <a href='https://wardogs.wiki/'>wardogs.wiki</a> holds in-game cash prices for items, which are money you spend inside a match, not money you spend on Steam. <a href='https://wardogshub.gg/'>wardogshub.gg</a> tracks the in-game economy, including how a match pays out. None of the three publishes what a storefront charges per region, which is the gap this table fills.</p>

<h2>Before you pay</h2>
<ul>
<li><strong>Read the price in your own store, signed in.</strong> Regional prices are set per Steam region, so the number that applies to you is the one your account's store shows, not the number another player quotes.</li>
<li><strong>Do not convert — compare.</strong> Turning ¥4,980 into dollars produces a figure no shop will charge you. The comparable facts are the two prices Valve returns for your own region and the 0% discount on both.</li>
<li><strong>Decide which edition you need.</strong> The Supporter pack is cosmetics; the base game is the same game, and the base game is what the 22.5–26.0% premium is measured against.</li>
<li><strong>Check the date.</strong> These are 29 September 2026 readings for a game in Early Access whose price is planned to change, so re-read your own store page before you buy.</li>
</ul>

<div class="qa">
<h2>Common questions</h2>
${faqHtml}
<p class="src">Every figure on this page comes from Valve's own region-specific store data, read on 29 September 2026: the base and Supporter prices for the United States, United Kingdom, Germany, Japan, Korea, Brazil, Australia and Canada, the 0% discount in each, and the missing Russian price. The Early Access pricing policy is quoted from the Q&amp;A block on the <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>WARDOGS store page</a>, read the same day. The Supporter Edition's cosmetic contents are taken from <a href='https://wardogs.site/price/'>wardogs.site</a> and labelled as that site's list. The 22.5–26.0% premium range is our own arithmetic on Valve's two prices per region, and is marked as such wherever it appears.</p>
</div>

<figure class="pagefig"><img src="/assets/img/wardogs-price.png" width="1200" height="630" alt="WARDOGS price by region card: $39.99 in the US, ¥4,980 in Japan, eight regions read 29 September 2026"><figcaption>Drawn for this page. Prices as read on 29 September 2026.</figcaption></figure>

${adUnit}

<div class="readnext">
<p><a href="/wardogs">Scoring, prices and platform support for WARDOGS &rarr;</a></p>
<p><a href="/wardogs-reddit">What WARDOGS players are asking for on Reddit &rarr;</a></p>
<p><a href="/wardogs-early-access">What the developers say about Early Access timing and the full game &rarr;</a></p>
<p><a href="/wardogs-reviews">What 54,566 Steam reviews say about WARDOGS &rarr;</a></p>
</div>`,
};
