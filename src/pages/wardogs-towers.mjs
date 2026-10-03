// Queue gap G15 (towers and scoring). The studio has never printed the word
// tower on either Valve surface; the positions below are cross-checked between
// community projects, with the distance each project sits from the others.
const faqs = [
  {
    q: "What are the towers in WARDOGS?",
    a: "On the map, they are fixed structures with a control panel, and on the scoreboard they are how a team steers where the Hot Zone sits inside the Control Zone. The one description Valve's own news feed carries says they \"act as a focal point for your FOBs and can be a great vantage point, but capturing them also has its advantages\" — that is a PCGamesN line syndicated into the game's feed on 11 September 2026, not a studio statement (<a href='https://store.steampowered.com/news/app/1867240'>official Steam news feed</a>, read 3 October 2026).",
  },
  {
    q: "How many towers are on each WARDOGS map?",
    a: "Five on Bakurani, four on Ozeti and three on Zestafona, which is 12 positions in total across the three maps. Those numbers come from community projects that model the maps, not from the studio: four projects place the Bakurani towers within 0.01 km of each other, three agree on Ozeti, and three agree on Zestafona (<a href='https://github.com/apollyon-sys/wardogs-calculator/blob/HEAD/maps/bakurani.json'>one of the projects</a>, cross-checked on 3 October 2026 on <a href='/wardogs-map'>the map page</a>). The table below lists each position and how far apart the projects are.",
  },
  {
    q: "What does the four-digit code on a tower do?",
    a: "The account you will find is that each captured tower gives your team one digit, that four digits let you pull the double-cash ground towards a tower you already hold, and that the code is how the Hot Zone gets steered. That write-up is labelled by the site that publishes it as reported rather than confirmed, and no studio post we could read mentions digits, codes or panels at all — it is the hub's towers page, at wardogshub.gg/towers/ (read 3 October 2026). We print it because players use it, and we label it the way its own publisher does.",
  },
  {
    q: "Are the tower positions official?",
    a: "No. Valve's store page for the game uses the word tower zero times, and so does the text of its appdetails record — we counted both on 3 October 2026 (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 3 October 2026). The studio has published no map and no point list. Every position in public is a community reading, which is why this page prints the distance between projects instead of a single confident coordinate.",
  },
  {
    q: "How do you capture a tower?",
    a: "The community write-up describes clearing the enemy players off it, waiting out a short lockout, then using the control panel, and it labels that whole sequence as reported rather than confirmed — wardogshub.gg/towers/, read 3 October 2026. The studio's own material explains how the match is scored and what the Hot Zone does, and does not describe a capture sequence (<a href='https://store.steampowered.com/news/app/1867240'>official Steam news post, WARDOGS - TOP QUESTIONS</a>, 18 February 2026, read 3 October 2026).",
  },
  {
    q: "Do towers score points in WARDOGS?",
    a: "Nothing published says they do. The scoring the studio describes is occupancy: three teams fight over a randomised 2 × 2 km Control Zone inside a 256 km² map, the team with the most players in the zone earns points, and the first team to 100 wins (<a href='https://store.steampowered.com/news/app/1867240'>official Steam news post, WARDOGS - TOP QUESTIONS</a>, 18 February 2026, read 3 October 2026). The Hot Zone inside it counts players double and pays double cash, and that part is the studio's own wording.",
  },
  {
    q: "Where can I see the towers on a map?",
    a: "On <a href='/wardogs-map'>the map page</a>, which draws a 16 × 16 km grid with one-kilometre squares and carries the tower layer as data: 12 points, each with the projects that agree on it and the day it was read (<a href='https://shooteratlas.com/assets/data/wardogs-map-points.json'>the same data as JSON</a>, read 3 October 2026). The grid reference for a tower is the column letter and row number of the kilometre square it sits in, and the map page will copy that reference for you.",
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
        { "@type": "ListItem", position: 3, name: "Towers", item: SITE + "/wardogs-towers" },
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
      url: SITE + "/wardogs-towers",
      applicationCategory: "Game",
      gamePlatform: "PC (Windows)",
      operatingSystem: "Windows",
      author: { "@type": "Organization", name: "BULKHEAD" },
      publisher: { "@type": "Organization", name: "Team17" },
      datePublished: "2026-09-10",
      sameAs: ["https://store.steampowered.com/app/1867240/WARDOGS/"],
    },
  ],
};

const faqHtml = faqList(faqs);

import { adUnit } from "../ad.mjs";
import { faqList } from "../faq.mjs";

export const page = {
  source: "src/pages/wardogs-towers.mjs",
  path: "/wardogs-towers",
  title: "WARDOGS towers: 12 positions across three maps, cross-checked",
  description:
    "WARDOGS towers: 12 positions across Bakurani, Ozeti and Zestafona, each cross-checked between three or four community projects and read on 3 October 2026. Valve's own store page uses the word tower zero times, which is why every position here is labelled.",
  extraHead: "<script type='application/ld+json'>" + JSON.stringify(schema) + "</script>",
  body: `<h1>WARDOGS towers: 12 positions across three maps, cross-checked</h1>

<p class="lede">There are <strong>12 tower positions</strong> in public across the three maps — <strong>five</strong> on Bakurani, <strong>four</strong> on Ozeti and <strong>three</strong> on Zestafona — and not one of them comes from the studio. Valve's own store page for the game uses the word "tower" <strong>zero times</strong>, and so does the text of its appdetails record, both counted on 3 October 2026 (<a href="https://store.steampowered.com/app/1867240/WARDOGS/">Steam store page</a>, read 3 October 2026). That is the whole problem with this subject in one line: the objective players fight over every match is the part of the game the official paperwork never describes.</p>

<p>How to read this page. The mode and the scoring are the studio's, quoted from the post that describes them. The positions are community readings, so each one is printed with how closely three or four independent projects agree on it, and the day it was read. Anything nobody has published is listed as a gap at the bottom instead of being smoothed into a confident answer.</p>

<div class="strip">
<div><span class="stat-n">12</span><span class="stat-k">tower positions in public across three maps, read 3 October 2026</span><span class="stat-src"><span class="src-chip src-third">community</span></span></div>
<div><span class="stat-n">0.01 km</span><span class="stat-k">spread between the four projects that agree on the Bakurani towers, read 3 October 2026</span><span class="stat-src"><span class="src-chip src-calc">our reading</span></span></div>
<div><span class="stat-n">0</span><span class="stat-k">uses of the word tower on Valve's store page, counted 3 October 2026</span><span class="stat-src"><span class="src-chip src-calc">our count</span></span></div>
<div><span class="stat-n">1</span><span class="stat-k">tower mention in Valve's own news feed, and it is a third-party guide, read 3 October 2026</span><span class="stat-src"><span class="src-chip src-third">feed</span></span></div>
<div><span class="stat-n">100</span><span class="stat-k">points that win a match, per the studio, read 3 October 2026</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">2×</span><span class="stat-k">effect of the Hot Zone on players counted and cash paid, per the studio, read 3 October 2026</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
</div>

<h2>What the official surfaces do say</h2>

<p>The studio explains its match in detail and never gets to the towers. In its own words, from the question-and-answer post of 18 February 2026 (<a href="https://store.steampowered.com/news/app/1867240">official Steam news post, WARDOGS - TOP QUESTIONS</a>, read 3 October 2026):</p>

<ul>
<li>"Three teams fight to seize a randomised 2x2km 'Control Zone' within a large-scale 256km² map."</li>
<li>"The team with the most players in the zone earns points; first team to reach 100 points win the match."</li>
<li>On the Hot Zone: "a shifting sub-zone within the larger 'Control Zone'. Players count as double towards their player count" and it "also yields DOUBLE CASH".</li>
</ul>

<p>Those are the pieces of the match the studio has published. The towers, the panels, the digits and the capture are not among them — and the counting is not a matter of opinion. The store page's own HTML for app 1867240 contains the string "tower" zero times, and so does the appdetails text for the same app, which runs to 18,469 characters including its description and its system requirements (<a href="https://store.steampowered.com/api/appdetails?appids=1867240&amp;cc=us&amp;l=english">appdetails API</a>, read 3 October 2026).</p>

<p>Valve's news feed for the game does carry the word once. That item is dated 11 September 2026 and its body is a third-party guide, syndicated into the feed, whose own summary reads: the towers "act as a focal point for your FOBs and can be a great vantage point, but capturing them also has its advantages" (<a href="https://store.steampowered.com/news/app/1867240">official Steam news feed</a>, read 3 October 2026). It is on an official surface, and it is not an official statement — both halves of that sentence matter, so this page keeps them together.</p>

<h2>The 12 positions, and how far apart the projects are</h2>

<p>Three community projects model these maps independently, and on Bakurani a fourth joins them. The table below is the reading taken on 3 October 2026 for <a href='/wardogs-map'>the map page</a>, where the same points are drawn on a grid (<a href="https://shooteratlas.com/assets/data/wardogs-map-points.json">map data, as JSON</a>, read 3 October 2026):</p>

<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="map-caption">
<table class="matrix">
<caption id="map-caption">Tower positions per map, with the agreement between the community projects that publish them. Read 3 October 2026.</caption>
<thead><tr><th scope="col">Map</th><th scope="col">Towers</th><th scope="col">Projects agreeing</th><th scope="col">Largest gap between them</th><th scope="col" class="num">Read on</th></tr></thead>
<tbody>
<tr><td>Bakurani</td><td class="wrap-cell">5</td><td class="wrap-cell">4</td><td class="wrap-cell">Within 0.01 km of each other on every tower</td><td class="num">3 Oct 2026</td></tr>
<tr><td>Ozeti</td><td class="wrap-cell">4</td><td class="wrap-cell">3 agree, a fourth differs</td><td class="wrap-cell">Within 0.02 km between the three; the fourth sits about 0.22 km away</td><td class="num">3 Oct 2026</td></tr>
<tr><td>Zestafona</td><td class="wrap-cell">3</td><td class="wrap-cell">3</td><td class="wrap-cell">Within 0.03 km of each other</td><td class="num">3 Oct 2026</td></tr>
</tbody>
</table>
</div>

<p>And the same 12 points one by one. The coordinates are kilometres from the map's west edge and north edge, on the 16 × 16 kilometre grid <a href='/wardogs-map'>the map page</a> draws, so a point at 7.9 and 9.2 sits 7.9 km east and 9.2 km south of the north-west corner. Every row was read on 3 October 2026:</p>

<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="points-caption">
<table class="matrix">
<caption id="points-caption">The 12 tower positions in public, with the agreement recorded against each one. Read 3 October 2026.</caption>
<thead><tr><th scope="col">Map</th><th scope="col">Tower</th><th scope="col" class="num">East, km</th><th scope="col" class="num">South, km</th><th scope="col">Agreement</th></tr></thead>
<tbody>
<tr><td>Bakurani</td><td class="wrap-cell">Tower 1</td><td class="num">7.9</td><td class="num">9.2</td><td class="wrap-cell">Four projects within 0.01 km</td></tr>
<tr><td>Bakurani</td><td class="wrap-cell">Tower 2</td><td class="num">7.5</td><td class="num">9.2</td><td class="wrap-cell">Four projects within 0.01 km</td></tr>
<tr><td>Bakurani</td><td class="wrap-cell">Tower 3</td><td class="num">7.5</td><td class="num">8.8</td><td class="wrap-cell">Four projects within 0.01 km</td></tr>
<tr><td>Bakurani</td><td class="wrap-cell">Tower 4</td><td class="num">8.2</td><td class="num">8.9</td><td class="wrap-cell">Four projects within 0.01 km</td></tr>
<tr><td>Bakurani</td><td class="wrap-cell">Tower 5</td><td class="num">8.0</td><td class="num">9.3</td><td class="wrap-cell">Four projects within 0.01 km; one of them also lists a second reading nearby</td></tr>
<tr><td>Ozeti</td><td class="wrap-cell">Tower 1</td><td class="num">9.4</td><td class="num">9.9</td><td class="wrap-cell">Three projects within 0.02 km</td></tr>
<tr><td>Ozeti</td><td class="wrap-cell">Tower 2</td><td class="num">9.8</td><td class="num">10.2</td><td class="wrap-cell">Three projects within 0.01 km</td></tr>
<tr><td>Ozeti</td><td class="wrap-cell">Tower 3</td><td class="num">10.2</td><td class="num">9.8</td><td class="wrap-cell">Three projects within 0.01 km</td></tr>
<tr><td>Ozeti</td><td class="wrap-cell">Tower 4</td><td class="num">9.8</td><td class="num">9.4</td><td class="wrap-cell">Three projects within 0.02 km</td></tr>
<tr><td>Zestafona</td><td class="wrap-cell">Tower 1</td><td class="num">6.7</td><td class="num">5.8</td><td class="wrap-cell">Three projects within 0.03 km</td></tr>
<tr><td>Zestafona</td><td class="wrap-cell">Tower 2</td><td class="num">7.1</td><td class="num">5.7</td><td class="wrap-cell">Three projects within 0.02 km</td></tr>
<tr><td>Zestafona</td><td class="wrap-cell">Tower 3</td><td class="num">6.8</td><td class="num">6.2</td><td class="wrap-cell">Three projects within 0.02 km</td></tr>
</tbody>
</table>
</div>

<p class="src">The projects behind those numbers, as recorded on the map page: wardogs.tools, the wardogs-calculator project published under an MIT licence, wardogslabs.com and wardogshub.gg (<a href="https://github.com/apollyon-sys/wardogs-calculator/blob/HEAD/maps/bakurani.json">one of them is readable on GitHub</a>, read 3 October 2026). None of them is the studio, and the agreement between them is not confirmation — it is four people reading the same game files and landing within ten metres of each other, which is a much better reason to believe a coordinate than one site's confidence.</p>

<h2>What the community adds, and what it labels itself</h2>

<p>The hub runs the fullest tower write-up in public, at wardogshub.gg/towers/ — published on 5 September 2026 with its data stamped as Season 1, and careful about the difference the studio never made: its Control Zone and Hot Zone lines carry a confirmed tag, and its tower lines carry a reported tag, because the tower mechanics have no official source to lean on (read 3 October 2026).</p>

<p>Two of its claims are the ones players repeat most, and both stay in the reported column on this page: that a captured tower gives a team a digit and four digits let you pull the double-cash ground towards a tower you already hold; and that capturing means clearing the area, waiting out a cooldown and then using the control panel (same page, read 3 October 2026). We are not going to launder those into facts by repeating them without the label, and the studio gave no statement of its own to compare them against.</p>

<p class="src">One thing the hub's page does that this one will not: it lists named positions across its three maps. The distance-and-agreement table above comes from the cross-check recorded on <a href='/wardogs-map'>the map page</a>, and we have not copied any site's list wholesale to build it.</p>

<h2>Every claim on this page, sorted</h2>

<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="layers-caption">
<table class="matrix">
<caption id="layers-caption">Every claim on this page, sorted. Read 3 October 2026.</caption>
<thead><tr><th scope="col">Layer</th><th scope="col">What is in it</th></tr></thead>
<tbody>
<tr><td>Confirmed officially</td><td class="wrap-cell">Three teams, up to 100 players, a randomised 2 × 2 km Control Zone inside a 256 km² map, points for the players you keep inside it, first team to 100 wins. The Hot Zone counts players double and pays double cash. All of it in the studio's post of 18 February 2026 (read 3 October 2026).</td></tr>
<tr><td>Reported, not confirmed</td><td class="wrap-cell">Everything specific to towers: that a tower gives a digit, that four digits steer the Hot Zone, and the clear-wait-use-the-panel capture sequence — published by the hub and labelled reported by the hub itself. Also the description of towers as FOB focal points and vantage points, which reaches an official surface as a syndicated third-party item.</td></tr>
<tr><td>Counted here, not published anywhere</td><td class="wrap-cell">That the word tower appears 0 times on the store page and 0 times in the appdetails text, counted on 3 October 2026; that the news feed mentions towers exactly once and that the mention is third-party; and the 12-position total with its per-map split.</td></tr>
<tr><td>Cross-checked between projects</td><td class="wrap-cell">The individual coordinates, each with the number of projects that agree and the largest disagreement between them, read 3 October 2026. Four projects on Bakurani, three on Ozeti and Zestafona, with one project placing the Ozeti towers about 0.22 km from the other three.</td></tr>
<tr><td>Not confirmed</td><td class="wrap-cell">Whether the studio calls these structures towers at all. How many towers each map holds, officially. Whether towers score anything themselves, what happens to a captured tower afterwards, and how long a recapture takes.</td></tr>
</tbody>
</table>
</div>

<p>And the list this site exists to keep — what nobody has recorded at all, checked on 3 October 2026 and written down rather than guessed at:</p>

<ul>
<li><strong>An official map page.</strong> No point of interest list, no spawn list and no objective list is published by the studio on either Valve surface.</li>
<li><strong>An official sentence about towers.</strong> The mechanic that decides where the double-cash ground goes has no first-party description we could find.</li>
<li><strong>A code table or a capture timer.</strong> No published digits, no published cooldown, no published capture time.</li>
<li><strong>An official count of objectives per map.</strong> Every number in the tables above rests on community projects, and that stays true until the studio prints one.</li>
<li><strong>Our own in-game verification.</strong> The positions were cross-checked between projects on 3 October 2026, not read off a live server by this site, and that limit is part of the record here.</li>
</ul>

<div class="qa">
<h2>Common questions</h2>
${faqHtml}
<p class="src">Where these figures come from: the studio's <a href="https://store.steampowered.com/news/app/1867240">official Steam news posts</a> of 18 February 2026 for the mode and scoring, read 3 October 2026; the game's <a href="https://store.steampowered.com/app/1867240/WARDOGS/">store page</a> and its <a href="https://store.steampowered.com/api/appdetails?appids=1867240&amp;cc=us&amp;l=english">appdetails record</a> for the count of the word tower, read 3 October 2026; the hub's towers page at wardogshub.gg/towers/ for the capture sequence and the digits, quoted as reported, read 3 October 2026; and the cross-check recorded on <a href='/wardogs-map'>the map page</a>, whose data is also served as <a href="https://shooteratlas.com/assets/data/wardogs-map-points.json">JSON</a>, read 3 October 2026.</p>
</div>

${adUnit}

<div class="readnext">
<p><a href="/wardogs-map">The map: a 16 × 16 km grid, a Control Zone in scale, and the tower layer &rarr;</a></p>
<p><a href="/wardogs-gameplay">One mode, 100 points, and two server names that are not modes &rarr;</a></p>
<p><a href="/wardogs-player-count">How many people play WARDOGS, and how many are in a match &rarr;</a></p>
<p><a href="/wardogs-steam">The live Steam reading and the whole store listing &rarr;</a></p>
</div>`,
};
