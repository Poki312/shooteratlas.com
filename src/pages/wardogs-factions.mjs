// Queue gap G11. The three factions as the studio defines them, the three
// starter rifles that already carry their names, and the blanks nobody has
// filled. Same discipline as the rest of the site: source link, read date, and
// a layer for every claim.
const faqs = [
  {
    q: "What are the three WARDOGS factions called?",
    a: "LONESTAR, VALKYRA and MANTICORE. The studio named all three on 18 February 2026 and gave each one a line: LONESTAR are \"the heavy-hitters in the Western paramilitary world\", VALKYRA \"aims to return the Soviet People's Republic to greatness\", and MANTICORE are \"the Kingdom of Persia, Tehran's shadow army\" (<a href='https://store.steampowered.com/news/app/1867240'>official Steam news post, WARDOGS - TOP QUESTIONS</a>, 18 February 2026, read 2 October 2026). The same post sets them out with a blue, a red and a green square, in that order.",
  },
  {
    q: "Do the three factions have different weapons, vehicles or abilities?",
    a: "Nobody has said so. Every weapon, vehicle and attachment figure published for this game is shared across all three, and the studio's own material describes roles as \"totally player-defined\" rather than tied to a faction (<a href='https://store.steampowered.com/news/app/1867240'>official Steam news post</a>, 18 February 2026, read 2 October 2026). It has also never been ruled out, so the honest reading is that faction differences are unannounced rather than absent, and this page lists that as a blank rather than filling it.",
  },
  {
    q: "Which WARDOGS faction wins most often?",
    a: "No per-faction win rate has been published anywhere, by the studio or by Valve. The one public statement we can point at is second-hand: the community hub attributes a 17 September 2026 remark to the studio's chief executive giving the order green, then red, then blue, with blue's problem described as having \"mixed reasons\" (hub factions page, read 2 October 2026). We could not re-read the original today, because Reddit refused this machine on 2 October 2026, so treat the order as reported rather than confirmed.",
  },
  {
    q: "What are the faction skins on the starter rifles?",
    a: "Three of them, and they map one faction to one rifle: a Valkyra-branded A-91, a Lonestar-branded Bushmaster, and a Manticore-branded KH-2002 (<a href='https://store.steampowered.com/news/app/1867240'>official Steam news post</a>, 11 August 2026, read 2 October 2026). All three are granted rather than sold, and they are the only place the studio has put a faction's name on a specific weapon. The studio's own line on cosmetics is that it \"will NEVER allow you to directly purchase camos\" (same post, read 2 October 2026).",
  },
  {
    q: "Which faction should a new player pick?",
    a: "Nothing official ranks them for a new player, and this page will not invent a tier list. The three are introduced as identities rather than as loadouts, and the studio's own answers to the most-asked questions cover the mode, the cash system, squad sizes and the setting without once saying that picking one faction changes what you can buy (<a href='https://store.steampowered.com/news/app/1867240'>official Steam news post, WARDOGS - TOP QUESTIONS</a>, 18 February 2026, read 2 October 2026). If a page tells you one faction is stronger, ask it for the source.",
  },
  {
    q: "Where is WARDOGS set, and does the setting decide the factions?",
    a: "The setting is stated, and it does not. The game is set in war-torn Kolchia, built around the fight for PV-1, \"a rare resource fuelling decades of Eurasian conflict\", with the faction names drawn from a different map of the world entirely — a Western paramilitary outfit, a restorationist Soviet republic and the Kingdom of Persia (<a href='https://store.steampowered.com/news/app/1867240'>official Steam news post, WARDOGS - TOP QUESTIONS</a>, 18 February 2026, read 2 October 2026). That mismatch is the studio's own, not ours.",
  },
  {
    q: "How do you get weapon skins in WARDOGS?",
    a: "By playing, according to the studio's own policy: cosmetics are earned, in-game cash and gold bars will never be sold, and camos cannot be bought directly because they are meant to show work rather than spending (<a href='https://store.steampowered.com/news/app/1867240'>official Steam news post</a>, 11 August 2026, read 2 October 2026). The exception in the same post is the Supporter Edition's camo set, which carries the three faction-branded starter-rifle camos above and is priced on <a href='/wardogs-price'>the price page</a>.",
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
        { "@type": "ListItem", position: 3, name: "Factions", item: SITE + "/wardogs-factions" },
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
      url: SITE + "/wardogs-factions",
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
  source: "src/pages/wardogs-factions.mjs",
  path: "/wardogs-factions",
  title: "WARDOGS factions: LONESTAR, VALKYRA and MANTICORE, and who they fight for",
  description:
    "WARDOGS fields 3 factions — LONESTAR, VALKYRA and MANTICORE — and the studio named all three on 18 February 2026. What each one is, which starter rifle already carries its flag, and the questions nobody has answered.",
  extraHead: "<script type='application/ld+json'>" + JSON.stringify(schema) + "</script>",
  body: `<h1>WARDOGS factions: LONESTAR, VALKYRA and MANTICORE, and who they fight for</h1>

<p class="lede">WARDOGS puts up to 100 players on one map, split across <strong>three teams</strong>, and the studio named all three on 18 February 2026: LONESTAR, VALKYRA and MANTICORE (<a href="https://store.steampowered.com/news/app/1867240">official Steam news post, WARDOGS - TOP QUESTIONS</a>, read 2 October 2026). Each one comes with a line of who it is and what it wants. What does <em>not</em> come with it is any statement that the three differ in what they can buy, drive or do — and that absence is the whole reason this page exists.</p>

<p>How to read this page. The faction names and their one-line identities are the studio's, quoted from the post that introduced them and dated to the day it was read. The three rifles that carry faction names are the studio's too, from its own Supporter Edition announcement. The gap — everything about factions that has never been published — is listed as a blank at the bottom instead of being papered over with a plausible answer.</p>

<div class="strip">
<div><span class="stat-n">3</span><span class="stat-k">factions, named by the studio on 18 February 2026, read 2 October 2026</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">100</span><span class="stat-k">players per match, split across those three, read 2 October 2026</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">3</span><span class="stat-k">faction-branded rifle skins, one per faction, read 2 October 2026</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">0</span><span class="stat-k">official statements that the factions differ in gear, read 2 October 2026</span><span class="stat-src"><span class="src-chip src-reported">not published</span></span></div>
</div>

<h2>The three factions, in the studio's own words</h2>

<p>The post that introduced them is the same one that answers the rest of the game's early questions, published on 18 February 2026, and it is the only place the three are described in full (<a href="https://store.steampowered.com/news/app/1867240">official Steam news post, WARDOGS - TOP QUESTIONS</a>, read 2 October 2026). Verbatim, with the colours the post itself uses:</p>

<ul>
<li><strong>LONESTAR</strong> (blue) — "The heavy-hitters in the Western paramilitary world." Of the three, this is the only one framed as an outfit rather than a state.</li>
<li><strong>VALKYRA</strong> (red) — "Aims to return the Soviet People's Republic to greatness." "Return" is the load-bearing word: in this setting the republic is a restoration project, not a going concern.</li>
<li><strong>MANTICORE</strong> (green) — "The Kingdom of Persia, Tehran's shadow army." A kingdom and a shadow army, so a timeline where neither the monarchy nor the revolution went the way ours did.</li>
</ul>

<p>The same post fixes the shape of the match around them: three teams seize a randomised 2 × 2 km Control Zone inside a 256 km² map, the team with the most players inside earns points, and the first to 100 wins. Squad sizes, asked directly, are answered in one word — "Unlimited!" — and squadding up adds interface tools, communication and vehicle locking (read 2 October 2026).</p>

<h2>Three rifles already carry the faction names</h2>

<p>There is exactly one place where the studio has printed a faction's name on a specific weapon, and it is the Supporter Edition announcement of 11 August 2026. Verbatim from that post (<a href="https://store.steampowered.com/news/app/1867240">official Steam news post</a>, read 2 October 2026):</p>

<ul>
<li>"Valkyra Branded A-91 Rifle Camo"</li>
<li>"Lonestar Branded Bushmaster Camo"</li>
<li>"Manticore Branded KH-2002 Camo"</li>
</ul>

<p>Those three rifles are the ones every player starts with for nothing, which makes the pairing the closest thing to a faction identity the game ships: LONESTAR on the Bushmaster, VALKYRA on the A-91, MANTICORE on the KH-2002. The same announcement lists the skins as granted content rather than priced content, alongside a helicopter livery, a scoreboard icon and two bobbleheads, and states the studio's position in its own words: "We will NEVER allow you to directly purchase camos" (read 2 October 2026).</p>

<p class="src">One correction to how this is usually catalogued. The community hub lists all three as "Faction Logo" skins — the name it reads from the item itself — without naming which faction's logo belongs to which rifle (hub skins page, read 2 October 2026). The mapping above is the studio's own wording from the announcement, not our reading of an emblem.</p>

<h2>What the game does not say about factions</h2>

<p>Four things are worth stating plainly, because the questions around them are common and the answers are all the same shape — nobody has published one.</p>

<ul>
<li><strong>No faction-specific gear.</strong> Weapons, vehicles and attachments are gated by price and by class level, not by faction, and the published price lists do not differ by faction (<a href="/wardogs">the hub page</a>, read 2 October 2026). The studio has not said the three factions are mechanically identical either. It has simply never addressed it.</li>
<li><strong>No per-faction population or win rate.</strong> No source publishes how many players sit in each faction, or how often each one wins. The one statement that exists is attributed, not published by anyone we can re-read today (see the sorted list below).</li>
<li><strong>No description of how you are assigned to a faction.</strong> The studio's own materials describe the match, the cash economy, the roles and the setting, and never describe a faction selection step or an assignment rule (read 2 October 2026).</li>
<li><strong>No faction content roadmap.</strong> Update 0.1.2 of 30 September 2026 and the Season 02 teaser for 15 October 2026 mention equipment and balance reworks; neither mentions the factions (<a href="https://store.steampowered.com/news/app/1867240">official Steam news post</a>, read 2 October 2026).</li>
</ul>

<h2>Who else covers the three factions</h2>

<ul>
<li><strong>wardogs.site</strong> — nothing. The field guide runs nine pages in each of three languages, covering gameplay, classes, system requirements, release date, price and the September beta, and none of them models the factions (site map, read 2 October 2026).</li>
<li><strong>wardogs.wiki</strong> — nothing. Searching it for "faction" returns zero results and its factions category holds no entries at all (MediaWiki API, read 2 October 2026). Of everything on this site's list, this is the purest blank: the category exists and is empty.</li>
<li><strong>wardogshub.gg</strong> — the deepest coverage, and worth crediting. It carries a full factions page with the same three names, the studio's identities paraphrased, an attribution of the 17 September win-rate remark to the studio's chief executive, and a set of players' explanations for one team losing so often, marked as unconfirmed on the page itself. It is also honest about the one thing that matters: that no mechanical difference between the factions has ever been announced (hub factions page, read 2 October 2026). The one thing it does not carry is the mapping from each faction to the starter rifle that already wears its name.</li>
<li><strong>Reddit</strong> — where the faction arguments actually happen, and unreadable from this machine on 2 October 2026 (HTTP 403). The faction threads quoted on this site are the ones read on 28 September 2026 and dated that way where they appear.</li>
</ul>

<h2>Every claim on this page, sorted</h2>

<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="layers-caption">
<table class="matrix">
<caption id="layers-caption">Every claim on this page, sorted. Read 2 October 2026.</caption>
<thead><tr><th scope="col">Layer</th><th scope="col">What is in it</th></tr></thead>
<tbody>
<tr><td>Confirmed officially</td><td class="wrap-cell">Three factions, named LONESTAR, VALKYRA and MANTICORE on 18 February 2026, each with a one-line identity and a colour. 100 players per match across three teams. A randomised 2 × 2 km Control Zone inside a 256 km² map, first to 100 points. Squad sizes unlimited. The setting: Kolchia, fought over for the resource PV-1. The three faction-branded rifle skins — Valkyra on the A-91, Lonestar on the Bushmaster, Manticore on the KH-2002 — granted rather than sold, from the announcement of 11 August 2026.</td></tr>
<tr><td>Reported, not confirmed</td><td class="wrap-cell">The win order green, then red, then blue, with "mixed reasons" for blue's record — attributed by the community hub to the studio's chief executive on 17 September 2026. Every explanation for why one team loses: spawn positions and ground height, experienced players picking the other two sides, and uniform visibility. Those are the players' and the press's, not the studio's.</td></tr>
<tr><td>Calculated here, not published anywhere</td><td class="wrap-cell">The faction-to-rifle mapping itself. The studio printed three product names; nothing published elsewhere joins "Valkyra Branded A-91" back to the starter rifle roster, which is the pairing this page supplies. Read 2 October 2026.</td></tr>
<tr><td>Not confirmed</td><td class="wrap-cell">Whether the factions differ mechanically in any way, now or later. How players are assigned to one. Whether squadding with friends affects which side you end up on.</td></tr>
</tbody>
</table>
</div>

<p>And the list this site exists to keep — what nobody has recorded at all, checked on 2 October 2026 and written down rather than guessed at:</p>

<ul>
<li><strong>Per-faction player counts.</strong> No source publishes how many people are playing each faction, and Valve's live endpoint reports one number for the game, not three (<a href="https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=1867240">Steam Web API</a>, read 2 October 2026).</li>
<li><strong>Per-faction win rates.</strong> Not published by the studio, not published by Valve, not published by any tracker.</li>
<li><strong>Faction-specific unlocks.</strong> Nothing states that any weapon, vehicle or attachment is restricted to one faction, and nothing states that they are not.</li>
<li><strong>A faction roadmap.</strong> Neither the 0.1.2 patch notes nor the Season 02 announcement says anything about the three factions (<a href="https://store.steampowered.com/news/app/1867240">official Steam news post</a>, read 2 October 2026).</li>
<li><strong>Original text of the 17 September remark.</strong> The quote circulates second-hand. Reddit, where it was made, returned HTTP 403 to this machine on 2 October 2026, so it could not be re-read at the source today.</li>
</ul>

<div class="qa">
<h2>Common questions</h2>
${faqHtml}
<p class="src">Where these figures come from: the studio's own Steam news posts of <a href="https://store.steampowered.com/news/app/1867240">18 February 2026 and 11 August 2026</a> for the faction names, identities, match shape, squad sizes and branded skins, all read on 2 October 2026; the wardogs.wiki API and the wardogs.site map for what the two other reference sites hold, read 2 October 2026; and the wardogshub.gg factions page for the second-hand win-rate remark and the players' explanations, read 2 October 2026 and labelled as reported wherever it appears.</p>
</div>

${adUnit}

<div class="readnext">
<p><a href="/wardogs-price">What the Supporter Edition costs, and what is inside it &rarr;</a></p>
<p><a href="/wardogs">The hub: how a match is scored and what kit costs &rarr;</a></p>
<p><a href="/wardogs-gameplay">The one mode, and the two names that are not modes &rarr;</a></p>
<p><a href="/wardogs-player-count">How many people play WARDOGS, and how many are in a match &rarr;</a></p>
<p><a href="/wardogs-reddit">What the community asks for, thread by thread &rarr;</a></p>
<p><a href="/wardogs-steam">The live Steam reading and the whole listing &rarr;</a></p>
</div>`,
};
