// One array drives both the visible questions and the FAQPage JSON-LD.
const faqs = [
  {
    q: "How many achievements does WARDOGS have?",
    a: "Ten, and all ten are listed in the table above with the share of players who have unlocked each one.",
  },
  {
    q: "Which WARDOGS achievement is the rarest?",
    a: "Big Spender, for spending $100,000 on a single loadout, at 0.1% of players.",
  },
  {
    q: "Which achievement do most players have?",
    a: "This is WARDOGS, for finishing the tutorial, at 78.3%. It is the only one of the ten that more than half of all players hold.",
  },
  {
    q: "Why does one achievement have no description?",
    a: "That was rude, at 13.3%, is the single entry Steam prints with a name and a rate but no text. The blank is in Valve's own table, so it stays blank here.",
  },
  {
    q: "Do the percentages change?",
    a: "Yes. They are population percentages rather than rankings of players, and the tutorial figure in particular falls as new owners arrive and rises only slowly again. Re-read the source before repeating any of these numbers.",
  },
  {
    q: "Where do these numbers come from?",
    a: "Steam's global achievement statistics for WARDOGS, app 1867240, <a href='https://steamcommunity.com/stats/1867240/achievements/'>read on 28 September 2026</a>. Valve counts them; this page only reports them.",
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
        { "@type": "ListItem", position: 2, name: "WARDOGS achievements", item: SITE + "/wardogs-achievements" },
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

export const page = {
  source: "src/pages/wardogs-achievements.mjs",
  path: "/wardogs-achievements",
  title: "WARDOGS achievements — all 10, and how rare each one is",
  description:
    "WARDOGS has ten Steam achievements. Read from Steam's global stats on 28 September 2026, the commonest is finishing the tutorial at 78.3% of players and the rarest is Big Spender, spending $100,000 on one loadout, at 0.1%.",
  extraHead:
    "<style>" +
    ".tablewrap{max-width:100%;overflow-x:auto;margin:0 0 1.2rem;-webkit-overflow-scrolling:touch}" +
    "table.ach{border-collapse:collapse;width:100%;min-width:30rem;font-size:.96rem}" +
    "table.ach th,table.ach td{border-bottom:1px solid var(--rule);padding:.55rem .6rem;text-align:left;vertical-align:top}" +
    "table.ach th{font-size:.8rem;text-transform:uppercase;letter-spacing:.03em;color:var(--muted);font-weight:600}" +
    "table.ach td.rate{text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums}" +
    "@media (max-width:430px){table.ach{font-size:.92rem}table.ach th,table.ach td{padding:.5rem .45rem}}" +
    "</style>" +
    "<script type='application/ld+json'>" + JSON.stringify(schema) + "</script>",
  body: `<h1>WARDOGS achievements: all 10, and how rare each one is</h1>
<p class="lede">WARDOGS ships ten Steam achievements, and the list doubles as a difficulty ladder. Globally, 78.3% of players have the first one and 0.1% have the last. Everything below is Valve's own figure for each achievement, read from <a href='https://steamcommunity.com/stats/1867240/achievements/'>Steam's public achievement statistics</a> on 28 September 2026 &mdash; official material, not a measurement of ours.</p>

<h2>The full list, with the global unlock rate</h2>
<p>Steam publishes a worldwide unlock percentage for every achievement, and it is visible without owning the game or signing in. These are the ten figures for WARDOGS (<a href='https://steamcommunity.com/stats/1867240/achievements/'>Steam app 1867240</a>, read 28 September 2026), printed in the order Steam lists them, rarest last. The percentage is the share of all players on record who have unlocked it.</p>

<div class="tablewrap">
<table class="ach">
<thead><tr><th>Achievement</th><th>What it asks you to do</th><th class="rate">Players who have it</th></tr></thead>
<tbody>
<tr><td>This is WARDOGS</td><td>Complete the Tutorial</td><td class="rate">78.3%</td></tr>
<tr><td>Ricochet</td><td>Kill an enemy player with a ricochet bullet</td><td class="rate">23.1%</td></tr>
<tr><td>Fat Stacks</td><td>Reach $100,000 net profit in a single life</td><td class="rate">19.3%</td></tr>
<tr><td>That was rude</td><td>No description published</td><td class="rate">13.3%</td></tr>
<tr><td>Long Shot</td><td>Get a kill from over 950 m away</td><td class="rate">10.1%</td></tr>
<tr><td>Top Dog</td><td>Finish the match as the top cash earner across all teams</td><td class="rate">8.5%</td></tr>
<tr><td>Do Not Resuscitate</td><td>Kill an enemy player using the defibrillator charge</td><td class="rate">6.2%</td></tr>
<tr><td>CZ Survivor</td><td>Spend 60 minutes in the CZ without dying</td><td class="rate">6.0%</td></tr>
<tr><td>Clean Sweep</td><td>Win a match without another team scoring a point</td><td class="rate">4.5%</td></tr>
<tr><td>Big Spender</td><td>Spend $100,000 on a single loadout</td><td class="rate">0.1%</td></tr>
</tbody>
</table>
</div>

<h2>Four numbers that only appear here</h2>
<p>The achievement text is the only place the game puts a figure on some things. Four of the ten carry one:</p>
<ul>
<li><strong>950 m.</strong> Long Shot asks for a kill from over 950 metres &mdash; the longest engagement distance any official text names. Nothing in the store description or the system requirements says what a rifle is expected to reach.</li>
<li><strong>$100,000 net profit, inside one life.</strong> Fat Stacks is not a session total and not a team total; the profit has to be earned before the player dies or the life ends.</li>
<li><strong>$100,000 on one loadout.</strong> Big Spender is the only statement of what a single purchase is allowed to cost. Against a $10,000 starting balance it is a purchase the game expects a player to reach later, not on day one.</li>
<li><strong>60 minutes in the CZ, alive.</strong> CZ Survivor is the only official hint at how long one life can run, and it is measured inside the Control Zone rather than anywhere on the map.</li>
</ul>

<h2>One achievement has no description at all</h2>
<p>That was rude, at 13.3%, is the single entry Steam prints with a name and a rate but no text. Steam hides the description of some achievements, and this is one of the hidden ones. The blank is in Valve's own table, so it stays blank here &mdash; there is no sourced answer to write into it.</p>

<h2>How steeply the list falls off</h2>
<p>Sorted from commonest to rarest, the ten rates run 78.3, 23.1, 19.3, 13.3, 10.1, 8.5, 6.2, 6.0, 4.5 and 0.1 percent. Three things fall out of that sequence:</p>
<ul>
<li>The tutorial is the only achievement more than half of all players have. Finishing it is close to universal; nothing else is.</li>
<li>Nine of the ten are held by fewer than a quarter of players, five are under 10%, and the middle of the list &mdash; between Top Dog and Long Shot &mdash; sits at about 9%.</li>
<li>The last step is the exception. Clean Sweep, ninth on the list, is at 4.5%; Big Spender, tenth, is at 0.1%. That is a 45-fold drop between two neighbouring entries, where every other step is a gentler slide. Winning a match without conceding a point is rare. Buying a $100,000 loadout is 45 times rarer than that.</li>
</ul>

<h2>Two of the ten are about money, not kills</h2>
<p>Seven of the achievements name a kill, a win or a survival feat. Two &mdash; Fat Stacks and Big Spender &mdash; never mention combat at all, and they bracket the economy from both ends: net profit inside one life, and the price of a single purchase. They are also the two that would move fastest if the cash system were rebalanced, which makes them worth re-reading after any patch that touches vendor prices or rewards.</p>

<h2>Where these numbers come from, and what moves them</h2>
<p>The source is <a href='https://steamcommunity.com/stats/1867240/achievements/'>Steam's global achievement statistics</a> for WARDOGS, app 1867240, read on 28 September 2026. Valve counts them; we only report them. Two cautions before quoting any of them elsewhere: they are population percentages rather than rankings of players, and the tutorial figure in particular falls as new owners arrive and rise only slowly again, so every one of the ten drifts. Re-read the same page before you repeat a number from this one.</p>

<div class="qa">
<h2>Common questions</h2>
${faqHtml}
<p class="src">Source: the <a href='https://steamcommunity.com/stats/1867240/achievements/'>Steam Community global achievement statistics for app 1867240</a>, read on 28 September 2026. Every figure on this page is Valve's; none of it is measured by us.</p>
</div>

<div class="readnext">
<p><a href="/wardogs">Scoring, prices and platform support for the same game &rarr;</a></p>
</div>`,
};
