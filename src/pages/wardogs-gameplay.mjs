// One array drives both the visible questions and the FAQPage JSON-LD.
const faqs = [
  {
    q: "How many game modes does WARDOGS have?",
    a: "One. Valve's store copy describes a single mode and does not name a second: three teams fight for control of a randomised 2 × 2 km Control Zone inside a larger map, the team with the most players in the zone scores, and the first team to 100 points wins (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 1 October 2026). The two names that look like extra modes, Infantry Mode and Low Level, are server modifiers, not modes &mdash; that distinction is what the section below is about.",
  },
  {
    q: "How do you win a match in WARDOGS?",
    a: "By occupancy, not by kills: the team with the most players inside the Control Zone earns points, and the first team to 100 points wins (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 1 October 2026). Kills pay cash and shape the fight, but nothing in the mode's own description awards points for them.",
  },
  {
    q: "What is the Hot Zone?",
    a: "A shifting sub-zone inside the Control Zone that pays double cash, and where players count double towards their team's occupancy (WARDOGS FAQ announcement, 18 February 2026, on the <a href='https://steamcommunity.com/app/1867240/announcements/'>official Steam announcement feed</a>, read 1 October 2026). The store page's mode paragraph does not mention it; the studio's own FAQ post does, which is why both are on this page.",
  },
  {
    q: "Is Infantry Mode a separate game mode?",
    a: "No. Valve's own patch notes for update 0.1.2 describe Infantry Mode and Low Level as server modifiers: the new Deploy flow lets you \"choose Official, Community, Infantry Mode or Low-Level servers\", and the notes say the screen was rebuilt to \"signpost players toward servers running these modifiers\" (<a href='https://steamcommunity.com/app/1867240/announcements/'>official Steam announcement feed</a>, 30 September 2026, read 1 October 2026). A modifier changes the rules of the one mode; it is not a second mode with its own scoring.",
  },
  {
    q: "How long is a WARDOGS match?",
    a: "Nobody official says. There is no timer in Valve's store copy, none in the studio's FAQ post, and no match-length figure in any announcement in the studio's Steam feed (<a href='https://steamcommunity.com/app/1867240/announcements/'>Steam announcement feed</a>, read 1 October 2026). This page files it under what is still not on the official record rather than guessing.",
  },
  {
    q: "How many players are on each team?",
    a: "Valve's copy says the game mode has three teams inside a game that takes up to 100 players, and it stops there; no per-team cap is published on the store page, and the studio's FAQ post does not give one either (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 1 October 2026). Read 100 as the size of the match, not the size of a team.",
  },
  {
    q: "Will WARDOGS add more game modes?",
    a: "What is promised is variety, not a mode list: the studio's Early Access notes name \"additional objective variations\" among planned additions (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 1 October 2026). The most recent official word on what is coming is Season 02 on 15 October 2026, described in the update 0.1.2 notes as \"a larger content update, with new map conditions, equipment, balance reworks and additional features\" (<a href='https://steamcommunity.com/app/1867240/announcements/'>official Steam announcement feed</a>, read 1 October 2026).",
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
        { "@type": "ListItem", position: 3, name: "Gameplay and game modes", item: SITE + "/wardogs-gameplay" },
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
      url: SITE + "/wardogs-gameplay",
      applicationCategory: "Game",
      gamePlatform: "PC",
      genre: ["Tactical FPS", "All-out warfare"],
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
  ogImage: "https://shooteratlas.com/assets/img/wardogs-gameplay.png",
  source: "src/pages/wardogs-gameplay.mjs",
  path: "/wardogs-gameplay",
  title: "WARDOGS gameplay — one mode, 100 points, and two server types that are not modes",
  description:
    "The single mode WARDOGS ships with, in the developers' own words: three teams, a randomised 2 × 2 km Control Zone inside a 256 km² map, first to 100 points, and a Hot Zone that pays double. Valve's store copy and the studio's own posts, read 1 October 2026.",
  extraHead:
    "<style>" +
    "blockquote{margin:0 0 1.2rem;padding:.7rem 1rem;border-left:3px solid var(--rule);color:var(--muted);font-style:italic;font-size:.98rem}" +
    "table.spec{width:100%;border-collapse:collapse;margin:0 0 1.4rem}" +
    "table.spec th,table.spec td{text-align:left;padding:.45rem .6rem;border-bottom:1px solid var(--rule)}" +
    "table.spec th{font-size:.78rem;letter-spacing:.04em;text-transform:uppercase;color:var(--muted)}" +
    "table.spec td:first-child{white-space:nowrap;color:var(--muted)}" +
    "</style>" +
    "<script type='application/ld+json'>" + JSON.stringify(schema) + "</script>",
  body: `<h1>WARDOGS gameplay: the one mode, and the two names that are not modes</h1>
<p class="lede">WARDOGS is one game mode, and the developers describe it in a single paragraph: three teams fight for control of a randomised 2 × 2 km Control Zone inside a larger map, the team with the most players in the zone scores, and the first team to 100 points wins (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 1 October 2026). That paragraph settles the scoring and leaves the match length, the tie rule and the team size unstated &mdash; so this page prints what is official, and files the rest where it belongs.</p>

<div class="strip">
<div><span class="stat-n">1</span><span class="stat-k">game mode, as described by Valve</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">3</span><span class="stat-k">teams inside an up-to-100-player match</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">2 &times; 2 km</span><span class="stat-k">Control Zone, randomly placed</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">100</span><span class="stat-k">points to win the match</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">2&times;</span><span class="stat-k">Hot Zone cash and head count</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
</div>

<h2>The rules, in Valve's own sentence</h2>
<p>This is the mode paragraph on the store page, printed whole rather than paraphrased, because every clause in it is doing work:</p>
<blockquote>"The game mode - Inspired by 'King of the Hill' - has three teams fight for control of randomized 2x2km 'Control Zones' within larger maps. The team with the most players within the Control Zone earns points - the first team to reach 100 points wins the match. The variables in zone location and individual player tactics mean no match ever plays out the same." (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 1 October 2026)</blockquote>
<p>Four things are settled by it. There is one objective, and it moves: the zone is randomised per match. Scoring is occupancy, so standing in the right place is the whole game. The finish line is 100 points and it belongs to a team, not a player. And the mode is stated as inspired by King of the Hill, which is how the studio describes the lineage everywhere, including on the announcement feed.</p>
<p>Three things are not settled by it, and no Valve surface settles them later: how long a match runs, what happens if two teams would reach 100 together, and how large a team is. The store page says "up to 100-player" about the game, not about a team.</p>

<h2>What the store page leaves on the cutting-room floor</h2>
<p>The studio published a longer version of the same explanation as a post on Valve's own announcement feed, dated 18 February 2026 and still the fullest official description of the mode (<a href='https://steamcommunity.com/app/1867240/announcements/'>official Steam announcement feed</a>, read 1 October 2026). It adds four things the store paragraph omits:</p>
<ul>
<li><strong>The Hot Zone pays double, twice over.</strong> In the studio's wording: "a shifting sub-zone within the larger 'Control Zone'. Players count as double towards their player count &mdash; leading to match-swinging potential. The 'Hot Zone' also yields DOUBLE CASH!"</li>
<li><strong>The map is 256 km².</strong> The same post sizes the battlefield that the 2 × 2 km zone is cut out of.</li>
<li><strong>The three teams have names and a setting.</strong> LONESTAR, VALKYRA and MANTICORE, fighting over a rare resource called PV-1 in a region the studio calls Kolchia.</li>
<li><strong>Squad size is unlimited.</strong> "Unlimited! No friend is left behind. Squadding up provides additional UI, communication tools, and vehicle locking for better coordination."</li>
</ul>
<p>An announcement is a weaker surface than a store page in one direction and a stronger one in another: it is the studio speaking in its own voice, but it is also dated marketing, written seven months before launch. Anything on this page that comes only from that post is labelled as such below.</p>

<h2>The mode has a parent, and the studio says so out loud</h2>
<p>On 19 February 2026 the same feed carried a short post titled around the King of the Hill mod, and its one factual sentence is the only official account of where this mode comes from: "Our Design Team has spent years collaborating directly with the original ARMA mod creators. Developing a standalone KOTH-inspired FPS that can surpass the original mod's limitations." (<a href='https://steamcommunity.com/app/1867240/announcements/'>official Steam announcement feed</a>, read 1 October 2026)</p>
<p>That is worth more than trivia. It explains why the mode is scored on occupancy in a moving zone instead of on captures or rounds, why three factions fight over one objective rather than two teams over several, and why the studio keeps describing the goal as a sandbox rather than a match format. The lineage itself is well known &mdash; wardogshub.gg states it as a confirmed fact on its "what is WARDOGS" page (<a href='https://wardogshub.gg/what-is-wardogs/'>wardogshub.gg</a>, read 1 October 2026) &mdash; but the sentence, and what is in it, is the studio's own and is not quoted on any of the three sites.</p>

<h2>Infantry Mode and Low Level are modifiers, not modes</h2>
<p>Two names circulate that look like extra modes. Both are server settings, and Valve's own patch notes for update 0.1.2 are where that is written down. The patch rebuilt the deploy screen so that, in the notes' words, you "choose Official, Community, Infantry Mode or Low-Level servers", and it describes the screen as "the first step intended to help signpost players toward servers running these modifiers" (<a href='https://steamcommunity.com/app/1867240/announcements/'>official Steam announcement feed</a>, 30 September 2026, read 1 October 2026).</p>
<p>Read that carefully, because it changes what you can expect. A modifier changes how the one mode plays on that server &mdash; the deploy screen exists to tell you which servers are running one. It does not carry its own scoring rules, its own objective, or its own win condition, and nothing in the notes gives either modifier a points value. If you are searching for "WARDOGS game modes", this is the answer to the confusion: one mode, several server types.</p>

<h2>What the mode is lined up to become</h2>
<p>Two official statements say where this is going, and neither names a new mode:</p>
<ul>
<li>The store page's Early Access notes list what the full version is planned to add &mdash; "new vehicle types including fighter jets, expanded weapon categories, additional objective variations, and continued improvements to the core WARDOGS experience" (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 1 October 2026). "Additional objective variations" is the closest thing to a promise of new mode content that exists, and it is not a mode list.</li>
<li>The update 0.1.2 notes describe the next season: "Season 02 is planned to be a larger content update, with new map conditions, equipment, balance reworks and additional features" (<a href='https://steamcommunity.com/app/1867240/announcements/'>official Steam announcement feed</a>, 30 September 2026, read 1 October 2026). The studio dated Season 02 to 15 October 2026 in a teaser post on 22 September.</li>
</ul>
<p>So the honest reading of the mode's future is: the objective stays, the conditions around it change. "New map conditions" is a change to the mode's ingredients, not a second recipe.</p>

<h2>What the three WARDOGS sites carry, and what this page adds</h2>
<p>All three were swept page by page on 1 October 2026, every URL each site lists in its own sitemap, fetched and searched:</p>
<ul>
<li><strong>wardogshub.gg</strong> lists 874 pages, and it is the strongest of the three here: its "what is WARDOGS" page is a properly sourced explanation of the format, covering three teams, the randomised 2 × 2 km zone, the 256 km² map, the Hot Zone's double payout and the first-to-100 win condition (<a href='https://wardogshub.gg/what-is-wardogs/'>wardogshub.gg</a>, read 1 October 2026). Twenty-seven of its pages contain "King of the Hill" and five mention Infantry Mode, including its patch notes in two languages, its write-up of update 0.1.2 and its server listings. What it does not do is draw the line this page is drawn around: no page there states in one place that Infantry Mode and Low Level are server modifiers rather than modes, and none quotes the studio's own mode sentences rather than describing them.</li>
<li><strong>wardogs.site</strong> lists 27 pages. "King of the Hill" appears zero times across all of them; "Infantry Mode" appears zero times. Its <a href='https://wardogs.site/gameplay/'>gameplay page</a> covers the opening loop, prices and zone scoring, and three of its pages mention the Hot Zone, but the mode's own description is not on the site in any form (<a href='https://wardogs.site/'>wardogs.site</a>, read 1 October 2026).</li>
<li><strong>wardogs.wiki</strong> is an item database with no editorial pages: its search API returns zero results across the whole wiki for "mode", "game modes", "infantry", "King of the Hill" and "Hot Zone" (<a href='https://wardogs.wiki/'>wardogs.wiki</a> API, read 1 October 2026). The category it keeps for exactly this subject, Game modes, reports zero members, zero files and zero subcategories.</li>
</ul>
<p>What this page adds, then, is not a scoop. It is three official paragraphs put next to each other for the first time &mdash; the store copy, the studio's FAQ post and the update notes &mdash; plus the one distinction nobody writes down: what is the mode, and what is a server setting wearing a mode's name. Everything on it is either quoted from Valve or the studio, or labelled as this page's reading.</p>

<h2>How each claim here is labelled</h2>
<p>Every conclusion on this site sits in one of three buckets. On this page the split matters, because most of the mode is documented and the edges are not.</p>
<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="layers-caption">
<table class="matrix">
<caption id="layers-caption">Every claim on this page, sorted. Read 1 October 2026.</caption>
<thead><tr><th scope="col">Layer</th><th scope="col">What is in it</th></tr></thead>
<tbody>
<tr><td>Confirmed officially</td><td class="wrap-cell">The mode and its scoring: three teams, a randomised 2 × 2 km Control Zone, points for occupancy, first team to 100 wins, inspired by King of the Hill. The Hot Zone's double cash and double head count. The three faction names. The 256 km² map. Squad size unlimited. The mode's ARMA mod lineage. Infantry Mode and Low Level as server modifiers, named in Valve's own patch notes. Season 02's date and the phrases the studio uses for it.</td></tr>
<tr><td>Observed, not officially confirmed</td><td class="wrap-cell">The reading this page puts on two things: that the 2 × 2 km zone inside a 256 km² map is what makes the objective feel random, and that "additional objective variations" is the closest thing to a promise of new mode content in anything published. Both are interpretations of the studio's words, not the studio's words.</td></tr>
<tr><td>Not yet confirmed</td><td class="wrap-cell">What Infantry Mode and Low Level actually change about a match: no official description of either modifier's rules exists in any page read here, only their names and their existence as server types. What "new map conditions" means for Season 02. Whether any second mode is in development.</td></tr>
</tbody>
</table>
</div>

<h2>Still not on any official record</h2>
<p>The gaps are part of the answer here, so they are written down rather than left out:</p>
<ul>
<li><strong>A match length.</strong> No timer, no round count and no average duration appears in Valve's copy, the studio's FAQ post, the Early Access notes or the patch notes.</li>
<li><strong>A tie rule.</strong> Nothing official covers what happens if teams reach 100 together, or whether a match can end with the zone uncontested.</li>
<li><strong>A per-team limit.</strong> "Up to 100-player" is a match size, and no surface breaks it into three.</li>
<li><strong>The rules behind the modifiers.</strong> "Infantry Mode" and "Low Level" are named in the deploy screen and in one patch note, and neither is defined anywhere official.</li>
<li><strong>A mode roadmap.</strong> No post promises modes by name, and no date is attached to "additional objective variations".</li>
</ul>

<div class="qa">
<h2>Common questions</h2>
${faqHtml}
<p class="src">Where this comes from: the <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>WARDOGS store page</a> for the mode description, the Early Access notes and the Hot Zone's place in the marketing copy; the <a href='https://steamcommunity.com/app/1867240/announcements/'>official Steam announcement feed</a> for the 18 February 2026 FAQ post, the 19 February 2026 mod post, the 22 September 2026 Season 02 teaser and the 30 September 2026 update 0.1.2 notes. All read on 1 October 2026. The coverage claims about the three other WARDOGS sites come from fetching every URL each site lists in its sitemap and the wiki's own search API on the same day.</p>
</div>

<figure class="pagefig"><picture><source media="(prefers-color-scheme: light)" srcset="/assets/img/wardogs-gameplay-light.png"><img src="/assets/img/wardogs-gameplay.png" width="1200" height="630" alt="Card for the WARDOGS game mode: one mode, three teams, a 2 by 2 kilometre control zone, 100 points to win and a double-paying Hot Zone"></picture><figcaption>Drawn for this page, dark or light to match. Figures as read on 1 October 2026.</figcaption></figure>

${adUnit}

<div class="readnext">
<p><a href="/wardogs">Scoring, prices and platform support for WARDOGS &rarr;</a></p>
<p><a href="/wardogs-genres">Five genres, eight categories, Windows only &rarr;</a></p>
<p><a href="/wardogs-release-date">When WARDOGS released, and what the date did not settle &rarr;</a></p>
<p><a href="/wardogs-steam-deck">Does WARDOGS run on the Steam Deck? Valve's own answer &rarr;</a></p>
</div>`,
};
