// One array drives both the visible questions and the FAQPage JSON-LD.
const faqs = [
  {
    q: "What is Battalion 1944?",
    a: "It is the Second World War tactical shooter BULKHEAD made before WARDOGS, funded on Kickstarter in 2017 and built around close-quarters infantry combat rather than vehicles. The studio's own pages from 2017 describe its map layout, its stance on unlocks and the changes it made after public playtests, and those pages are gone from the live web &mdash; what survives is the archive copies this page quotes.",
  },
  {
    q: "Who made Battalion 1944?",
    a: "BULKHEAD, the same studio that develops WARDOGS. The design notes quoted on this page are the studio's own: a features page describing how maps were laid out, a post-playtest change list dated 12 May 2017 and an alpha patch note dated 11 July 2017, all captured in the archive on 27 May and 23 July 2017 (read 29 September 2026).",
  },
  {
    q: "How does Battalion 1944 relate to WARDOGS?",
    a: "Same developer, same genre, and several of the same rules. Both are small-team tactical shooters where the studio has argued that skill should come from play rather than from unlocks; in WARDOGS that shows up as weapons gated twice, once by price and once by class level, with the three free rifles deliberately at the bottom of the roster (<a href='/wardogs'>our WARDOGS page</a>, read 28 September 2026).",
  },
  {
    q: "Why did Battalion 1944 slow movement down?",
    a: "To kill drop-shotting and to stop movement from beating aim. The alpha v0.2 notes cut movement speed in every stance by 30% and cut strafe-jump distance by 25%, and they say the prone animation was reworked to sit closer to the older Call of Duty titles for exactly that reason (<a href='https://web.archive.org/web/*/battaliongame.com/news/battalion-1944-alpha-v0-2-huge-update'>archived studio patch note</a>, 11 July 2017, read 29 September 2026).",
  },
  {
    q: "What were the maps like?",
    a: "Figure-eights rather than corridors. The studio's features page says maps were laid out in the Counter-Strike tradition with the verticality of the classic Call of Duty maps, sized for close-quarters infantry fighting instead of long sightlines (<a href='https://web.archive.org/web/*/battaliongame.com/features'>archived studio features page</a>, captured 27 May 2017, read 29 September 2026).",
  },
  {
    q: "Is Battalion 1944 still playable?",
    a: "We cannot confirm that, and this page will not guess. The studio's original site no longer serves its pages, so the only copies we could read are the 2017 archive captures quoted here; nothing in those pages says anything about the game's later service life, and no source we read states its present status.",
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
        { "@type": "ListItem", position: 3, name: "Battalion 1944", item: SITE + "/wardogs-battalion-1944" },
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
      name: "Battalion 1944",
      url: SITE + "/wardogs-battalion-1944",
      applicationCategory: "Game",
      gamePlatform: "PC",
      author: { "@type": "Organization", name: "BULKHEAD" },
      sameAs: ["https://web.archive.org/web/*/battaliongame.com"],
      about: { "@type": "VideoGame", name: "WARDOGS", url: "https://store.steampowered.com/app/1867240/WARDOGS/" },
    },
  ],
};

const faqHtml = faqList(faqs);

import { adUnit } from "../ad.mjs";
import { faqList } from "../faq.mjs";

export const page = {
  ogImage: "https://shooteratlas.com/assets/img/wardogs-battalion-1944.png",
  source: "src/pages/wardogs-battalion-1944.mjs",
  path: "/wardogs-battalion-1944",
  title: "Battalion 1944 — how BULKHEAD designed the shooter it made before WARDOGS",
  description:
    "Battalion 1944 is the Second World War tactical shooter BULKHEAD made before WARDOGS. The studio's own 2017 notes describe the map formula, the refusal to make unlocks the reward, the post-playtest change list and the alpha v0.2 cuts: movement speed down 30%, strafe-jump distance down 25%.",
  extraHead:
    "<script type='application/ld+json'>" + JSON.stringify(schema) + "</script>",
  body: `<h1>Battalion 1944: how BULKHEAD designed the shooter it made before WARDOGS</h1>
<p class="lede"><strong>Battalion 1944 is the Second World War tactical shooter BULKHEAD made before WARDOGS</strong> &mdash; same studio, same genre, and a design record that survives only in archive captures of the studio's own 2017 pages. Those pages are unusually specific about what the game was for: maps drawn as figure-eights in the Counter-Strike tradition with the verticality of the classic Call of Duty layouts, a stated refusal to make unlocks the reward, a post-playtest change list that put performance ahead of scenery, and an alpha patch that cut movement speed in every stance by 30% and strafe-jump distance by 25%. All of it is the studio's own wording, captured in May and July 2017 and read on 29 September 2026.</p>

<div class="strip">
<div><span class="stat-n">&minus;30%</span><span class="stat-k">movement speed, alpha v0.2</span><span class="stat-src"><span class="src-chip src-official">studio's own</span></span></div>
<div><span class="stat-n">&minus;25%</span><span class="stat-k">strafe-jump distance</span><span class="stat-src"><span class="src-chip src-official">studio's own</span></span></div>
<div><span class="stat-n">144 fps</span><span class="stat-k">on the show build, 300+ unlocked</span><span class="stat-src"><span class="src-chip src-official">studio's own</span></span></div>
<div><span class="stat-n">2017</span><span class="stat-k">when the notes were published</span><span class="stat-src"><span class="src-chip src-official">studio's own</span></span></div>
</div>

<h2>What the studio said the game was for</h2>
<p>The clearest statement of intent is a line on the studio's own features page: maps were built as <strong>figure-eights in the Counter-Strike tradition, with the verticality of the classic Call of Duty maps</strong>, and they were sized around close-quarters infantry fighting rather than long sightlines. The same page takes a position on progression that is worth quoting because of what it refuses: the studio argued that skill should come from how you play rather than from what you have unlocked, which is a direct rejection of the unlock-first ladder that most shooters of that period were built on (<a href='https://web.archive.org/web/*/battaliongame.com/features'>archived studio features page</a>, captured 27 May 2017, read 29 September 2026).</p>
<p>That refusal is the thread running through everything else on this page. When the studio later cut movement speed, it said why. When it rebuilt a map's clutter, it said why. This is a developer that wrote its reasoning down, and the reasoning is the part that does not exist anywhere else &mdash; the pages themselves are gone from the live web and the coverage of the period only ever recorded the conclusions.</p>

<h2>How a playtest turned into a change list</h2>
<p>After a public hands-on show, the studio published a numbered change list rather than a thank-you note, and the first item was a trade-off rather than a feature: <strong>visual fidelity against performance, decided in favour of performance</strong>. The studio kept the player readable, removed scenery clutter that got in the way, and said the machines on the show floor ran the game at 144 frames per second easily and past 300 once the frame limiter was lifted. Nothing in that list is a marketing claim about how good the game looked; it is a list of things that were cut or kept, with the reason attached (<a href='https://web.archive.org/web/*/battaliongame.com/news/post-rezzed-feedback-updates-and-more'>archived studio change list</a>, page dated 12 May 2017, captured 27 May 2017, read 29 September 2026).</p>
<p>It is a small thing, and it is the reason this page exists. A studio that publishes its trade-offs is a studio you can hold to them later &mdash; and the same instinct shows up in WARDOGS, where the Early Access block on the store page explains why the price is lower now and higher at 1.0 instead of quietly raising it (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>WARDOGS store listing</a>, read 30 September 2026).</p>

<h2>The alpha patch, item by item</h2>
<p>The most concrete document is the alpha v0.2 patch note, which is a list of cuts rather than additions. Each line below is the studio's own (<a href='https://web.archive.org/web/*/battaliongame.com/news/battalion-1944-alpha-v0-2-huge-update'>archived studio patch note</a>, page dated 11 July 2017, captured 23 July 2017, read 29 September 2026):</p>
<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="alpha-caption">
<table class="matrix">
<caption id="alpha-caption">Alpha v0.2, in the studio's own words. Archived page dated 11 July 2017, read 29 September 2026.</caption>
<thead><tr><th scope="col">What changed</th><th scope="col">How much</th></tr></thead>
<tbody>
<tr><td>Movement speed, every stance</td><td class="num">&minus;30%</td></tr>
<tr><td>Strafe-jump distance</td><td class="num">&minus;25%</td></tr>
<tr><td class="wrap-cell">Prone animation, reworked to sit closer to the older Call of Duty titles, aimed at suppressing drop-shotting</td><td class="num">animation</td></tr>
<tr><td class="wrap-cell">Pistols at long range, no longer a one-shot headshot</td><td class="num">removed</td></tr>
<tr><td class="wrap-cell">Mouse acceleration, now off by default</td><td class="num">default</td></tr>
<tr><td class="wrap-cell">A shotgun, added to the roster</td><td class="num">added</td></tr>
</tbody>
</table>
</div>
<p>The same note repeats that the test agreement was still in force, which tells you what kind of test it was: an invitation-only alpha whose participants were not free to publish footage or to discuss it outside the studio's own channels. That is a limitation, and it is the reason almost none of the reasoning above survived on the open web. It also sets a useful boundary for reading any of it &mdash; this is what the studio was willing to tell its testers in 2017, not a public balance manifesto.</p>

<figure class="pagefig"><picture><source media="(prefers-color-scheme: light)" srcset="/assets/img/wardogs-battalion-1944-fig-cuts-light.png"><img src="/assets/img/wardogs-battalion-1944-fig-cuts.png" width="1200" height="630" alt="Bar chart of the two alpha v0.2 movement cuts: movement speed down 30%, strafe-jump distance down 25%"></picture><figcaption>The two cuts from the archived alpha v0.2 patch note of 11 July 2017. Read 30 September 2026.</figcaption></figure>

<h2>Why the movement cuts matter more than the rest</h2>
<p>A 30% cut to movement speed and a 25% cut to strafe-jump distance are not tuning tweaks; they change who wins a duel. Taken with the prone animation rework and the removal of the long-range pistol headshot, the alpha v0.2 list is one consistent decision: <strong>take speed out of the fight so that aim and positioning decide it</strong>. The studio had already said it did not want unlocks deciding outcomes, and the same principle applied to movement (<a href='https://web.archive.org/web/*/battaliongame.com/news/battalion-1944-alpha-v0-2-huge-update'>archived studio patch note</a>, read 29 September 2026).</p>
<p>Whether that worked is not something this page can tell you. The notes say what changed and why; they contain no measurements of the result, no retention figure and no win-rate delta, and we found no later document that supplies one. What the notes do give you is a developer's own statement of the problem, which is more than a review can offer.</p>

<h2>How the studio checked whether a map worked</h2>
<p>The studio did not judge its first map by opinion. It published a heat map: every death recorded on every official server across the alpha weekend, on the game's first and smallest map, plotted onto one image, which the build could produce because it tracked the statistics (<a href='https://web.archive.org/web/*/battaliongame.com/news/alpha-0-1-recap'>archived studio alpha recap</a>, page dated 31 May 2017, captured 23 July 2017, read 2 October 2026). Reading it, the team looked for two things &mdash; choke points \"really lighting up\", and how much of the fighting happened inside the manor house itself, because the manor had been built as the close-range focal point of the map in Team Deathmatch. Their conclusion was that the manor was being fought over the way they intended, that the lanes around it still carried traffic, and that the layout was \"headed in the right direction\" with tweaks queued for the next alpha.</p>
<p>Two things make that method worth keeping. It tests a design intent against data rather than against a designer's memory of a playtest, and it names the intent: a manor house deliberately made the place where close-quarters fights would concentrate. Neither the heat map nor the reading of it appears in any write-up of Battalion 1944 outside the studio's own page.</p>

<h2>Why there was no date, and no weekly patch</h2>
<p>Two production decisions were written down in the same recap, and together they explain the holes in this record. The studio said it saw \"little reason to put out minor weekly updates that show minor progress\", and would rather push larger updates over longer periods so that each one was worth coming back for. And it said the Beta and Early Access dates had \"never been officially announced for this reason\" &mdash; the reason being the freedom to polish the game before it shipped on Steam (<a href='https://web.archive.org/web/*/battaliongame.com/news/alpha-0-1-recap'>archived studio alpha recap</a>, page dated 31 May 2017, captured 23 July 2017, read 2 October 2026).</p>
<p>Its justification is a sentence about the rest of the market rather than about itself: \"The Steam release needs to be as polished as possible, evidenced by the numerous rushed Early Access releases right now that never make it to full release.\" That is the only place in the material read for this site where the missing dates are explained rather than simply recorded as missing. The dates themselves, once they were published, are on <a href='/wardogs-battalion-1944-launch'>the launch page</a>.</p>

<h2>The testing mistake the studio wrote down</h2>
<p>After the second alpha weekend the studio published its own post-mortem on networking, and the sentence to keep is the admission rather than the fix: \"A mistake we made this alpha was having too many local/lan tests and not enough online tests\" (<a href='https://web.archive.org/web/*/battaliongame.com/news/alpha-v0-2-recap-and-v0-3-release-date'>archived studio recap</a>, page dated 21 July 2017, captured 19 August 2017, read 2 October 2026). The remedy followed within days of v0.2: the studio's design programmer took on the netcode, and the recap reports that players on higher ping would see the biggest improvement while players on normal ping would find the game felt smoother.</p>
<p>What is unusual is the disclosure. A patch note records what changed; this records what the studio did wrong while testing. It is also the only stated cause behind the netcode work of that period, which otherwise sits in the record as unexplained tuning.</p>

<h2>Why they went to E3 and Cologne</h2>
<p>Two trips in June 2017, both aimed at the game's competitive future. Part of the team spent the week of 9 to 16 June at E3 promoting the game and networking with other studios and publishers, and ESL invited the studio to ESL One Cologne 2017 as VIPs representing Battalion 1944 (<a href='https://web.archive.org/web/*/battaliongame.com/news/alpha-0-1-recap'>archived studio alpha recap</a>, page dated 31 May 2017, captured 23 July 2017, read 2 October 2026). The stated purpose of the second trip was to get in front of professional teams, organisations and players in order to \"help secure Battalion 1944's future as a competitive title\".</p>
<p>That line is the most concrete competitive ambition anywhere in this record, and it is dated to the alpha period &mdash; months before the game had a competitive mode of its own. Nothing read for this page says how the conversations went.</p>

<h2>The wear system, and the engine behind it</h2>
<p>The cosmetic system had a name and a rule set. The studio called it The War Torn System and described it as a live wear system tied to rank: at rank one the uniform, equipment, weapon and character's face are all clean, and as you level up the gear becomes worn, scratched and battered, you earn etchings to carve into your weapon with the rarest reserved for the highest ranks, and war paint used by units such as the D-Day Pathfinders becomes unlockable (<a href='https://web.archive.org/web/*/battaliongame.com/news/weapons-of-battalion-1944-1-m1-garand'>archived studio weapons page</a>, page dated 11 April 2017, captured 20 September 2017, read 2 October 2026).</p>
<p>The design purpose is the part worth quoting, because it is about reading a battlefield rather than about colours: \"at a distance you can visually see a player's ranking or status, without using an icon or number above the players head\". The art rule attached to it is just as blunt &mdash; \"Do not expect to see a pink tiger camo M1 Garand!\", because the team made art only from reliable reference images &mdash; and both lines are attributed in the same piece to Joe Brammer, the studio's executive producer. On the engine, the studio's own development update says a Pathfinders warpaint image was \"Rendered in game engine Unreal Engine 4\" (<a href='https://web.archive.org/web/*/battaliongame.com/news/development-update-sneak-peaks'>archived studio development update</a>, captured 27 May 2017, read 2 October 2026), which is the studio naming its own engine rather than a job advertisement implying it.</p>

<h2>How each claim on this page is labelled</h2>
<p>This site sorts every conclusion into one of three buckets. On this page the buckets matter more than usual, because the underlying pages no longer exist on the live web and a reader ought to know exactly how thin the ground is.</p>
<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="layers-caption">
<table class="matrix">
<caption id="layers-caption">Every claim on this page, sorted. Read 29 September and 2 October 2026.</caption>
<thead><tr><th scope="col">Layer</th><th scope="col">What is in it</th></tr></thead>
<tbody>
<tr><td>Confirmed by the studio</td><td class="wrap-cell">The map formula (figure-eights with Call of Duty-style verticality, sized for close quarters). The refusal to make unlocks the measure of skill. The post-playtest change list, including the performance-first trade-off and the 144 fps / 300+ frame figures for the show build. Every line of the alpha v0.2 table, and the fact that the test agreement was still in force. All of it is the studio's own published text, captured in the archive in 2017. Read on 2 October 2026 and added here: the death heat map and the reading the studio took from it; the decision to skip minor weekly updates and never to announce the Beta or Early Access dates before they were fixed; the admission that the alpha ran too many local and LAN tests and not enough online ones, with the netcode handover that followed; the E3 week and the ESL One Cologne invitation, with the competitive aim in the studio's own words; and The War Torn System, its rank-tied wear, the art rule about reference images and the studio's own \"Rendered in game engine Unreal Engine 4\" line.</td></tr>
<tr><td>Observed, not officially confirmed</td><td class="wrap-cell">That these rules carried over into WARDOGS. The studio has never said so, and the connection is our reading of two sets of its own material placed side by side. The WARDOGS facts used for that comparison are separately sourced: the double gate on weapons, and the three free rifles sitting at the bottom of the roster.</td></tr>
<tr><td>Not yet confirmed</td><td class="wrap-cell">What the shipped version of Battalion 1944 finally played like, and whether the 2017 intent survived to release. The design notes read here stop in July 2017, and the only later document in this record &mdash; the May 2019 pre-release showcase on the launch page &mdash; describes what the build contained rather than how it played.</td></tr>
</tbody>
</table>
</div>

<h2>Still not on any official record</h2>
<p>The gaps are part of the answer here, so they are written down rather than left out:</p>
<ul>
<li><strong>The game's present status.</strong> We could not establish whether Battalion 1944 is still sold or still running, and this page does not guess. The studio's original site no longer serves its pages.</li>
<li><strong>Any measured result of the alpha v0.2 changes.</strong> No retention figure, no duel-win statistic, no before-and-after gameplay measurement appears in the notes.</li>
<li><strong>Whether the 2017 design formula reached the released build.</strong> The notes describe intent during an invitation-only test; no later document we could read says what survived.</li>
<li><strong>A public explanation of the changes.</strong> The alpha note was written for testers under an agreement that barred publishing outside the studio's own channels, so the reasoning above exists only in that captured page.</li>
<li><strong>The publisher and the funding structure.</strong> The design pages read here describe the game rather than the business around it; that half of the record is on <a href='/wardogs-battalion-1944-launch'>the launch page</a>, which carries the Kickstarter totals, the studio's own £100,000 pledge and the Square Enix Collective partnership.</li>
</ul>

<h2>Why this page is not on the three WARDOGS sites</h2>
<p>The three sites that cover WARDOGS in depth all start their coverage with WARDOGS. The field-guide site is an official changelog and FAQ for the current game, the wiki is an item database with several thousand stat pages and no editorial articles, and the community hub tracks weapons, economy, servers and patches. None of the three looks backwards at the studio's previous shooter, which is the ground this page stands on &mdash; and which is only recoverable through archive captures of pages their owner stopped serving (all three read 30 September 2026).</p>

<div class="qa">
<h2>Common questions</h2>
${faqHtml}
<p class="src">Where this comes from: the studio's own pages for the game it made before WARDOGS &mdash; a features page describing the map formula and the stance on unlocks, a post-playtest change list dated 12 May 2017, and an alpha v0.2 patch note dated 11 July 2017, captured in the archive on 27 May and 23 July 2017 and read on 29 September 2026. The WARDOGS figures used for comparison come from this site's own <a href='/wardogs'>WARDOGS page</a> and the <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>store listing</a>, read 28 and 30 September 2026. Nothing here is quoted from a third-party article about Battalion 1944, and nothing is inferred except where the page says so.</p>
</div>

<figure class="pagefig"><picture><source media="(prefers-color-scheme: light)" srcset="/assets/img/wardogs-battalion-1944-light.png"><img src="/assets/img/wardogs-battalion-1944.png" width="1200" height="630" alt="Battalion 1944 card: movement speed down 30%, strafe-jump distance down 25%, from the studio's 2017 design notes"></picture><figcaption>Drawn for this page, dark or light to match. The studio's own figures, published in 2017.</figcaption></figure>

${adUnit}

<div class="readnext">
<p><a href="/wardogs">Scoring, prices and platform support for WARDOGS &rarr;</a></p>
<p><a href="/wardogs-early-access">What the developers say about Early Access timing and the full game &rarr;</a></p>
<p><a href="/wardogs-release-date">When WARDOGS released, and what the date did not settle &rarr;</a></p>
<p><a href="/wardogs-reddit">What WARDOGS players are asking for on Reddit &rarr;</a></p>
<p><a href="/wardogs-battalion-1944-launch">How the closed alpha was run, and what the 2018 plan promised &rarr;</a></p>
</div>`,
};
