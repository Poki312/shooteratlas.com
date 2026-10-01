// The visible foot-of-page questions and the FAQPage JSON-LD are rendered from
// this one array, so the structured data can never drift from what a reader
// sees. Answers may carry links; the schema gets the text with tags stripped.
const faqs = [
  {
    q: "Is WARDOGS worth buying right now?",
    a: "Buy it if you play on Windows, you will live with a kernel-level anti-cheat, and you want a shooter that gets rebuilt under you for two years. Wait if you need Linux or Proton, if you are waiting for a console version dated to 2028, or if you expect the free starter kit to be usable — it is not, and that is deliberate.",
  },
  {
    q: "Does WARDOGS run on Linux, on the Steam Deck, or on console?",
    a: "Current Early Access is Windows PC via Steam only. Linux and Proton are not supported at launch, and the Steam Deck runs Windows games through that same Proton layer, so it is ruled out the same way — there is no Deck rating on the store page. Console versions are dated to 2028.",
  },
  {
    q: "Is WARDOGS pay to win?",
    a: "No. Weapons are gated twice, once by price and once by class level, so cash alone will not buy you out of the early game, and the three rifles you get for nothing sit at the bottom of the roster by design.",
  },
  {
    q: "Do I have to buy a loadout every time I die?",
    a: "You buy a loadout on every life, but you spawn with $10,000 once rather than per life, and the balance carries between matches. Spending less in one round leaves more for the next.",
  },
  {
    q: "How many people are playing WARDOGS?",
    a: "Four days after release the game set an all-time peak of 428,666 concurrent players, and by the final week of September it was running near 132,000, and both of those come from SteamDB, a third-party database rather than from Valve. That number moves every day, so check the official live figure on the day you pay instead of buying on the record — <a href='https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=1867240'>Steam's current-players API</a> returns it without signing in (read 28 September 2026).",
  },
  {
    q: "Is there a respawn timer?",
    a: "There is no arcade respawn counter. You come back in the safe zone and the clock is however long it takes you to reach the fight, which is why vehicles, transport and helicopter roles are paid work and why killing the enemy's spawn vehicle costs them more than killing the player beside it.",
  },
  {
    q: "Will the price go up?",
    a: "Yes — the studio's Early Access notes say the price is lower during Early Access and rises toward the full release.",
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
      url: SITE + "/wardogs",
      applicationCategory: "Game",
      gamePlatform: "PC",
      author: { "@type": "Organization", name: "BULKHEAD" },
      publisher: { "@type": "Organization", name: "Team17" },
      sameAs: ["https://store.steampowered.com/app/1867240/WARDOGS/"],
    },
  ],
};

const faqHtml = faqList(faqs);

import { adUnit } from "../ad.mjs";
import { faqList } from "../faq.mjs";

export const page = {
  ogImage: "https://shooteratlas.com/assets/img/wardogs.png",
  source: "src/pages/wardogs.mjs",
  path: "/wardogs",
  title: "WARDOGS — how a match is scored, what kit costs, what gates it and what runs it",
  description:
    "Wardogs is a 100-player, three-team tactical FPS from BULKHEAD, published by Team17, and it has been in Steam Early Access since 10 September 2026.",
  extraHead:
    "<script type='application/ld+json'>" + JSON.stringify(schema) + "</script>",
  body: `<h1>WARDOGS: how a match is scored, what kit costs, what gates it and what runs it</h1>
<p>Wardogs is a 100-player, three-team tactical FPS from BULKHEAD, published by Team17, and it has been in Steam Early Access since 10 September 2026 (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 28 September 2026). Every match drops three factions onto one large map and asks them to hold a randomised 2 × 2 km Control Zone; the side with the most bodies inside scores, and the first to 100 points wins. That is the game. The rest of the store page is bullet points, so here is the part they compress.</p>

<div class="strip">
<div><span class="stat-n">428,666</span><span class="stat-k">all-time peak concurrent</span><span class="stat-src"><span class="src-chip src-third">third&#8209;party</span></span></div>
<div><span class="stat-n">$39.99</span><span class="stat-k">US Steam price</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">81%</span><span class="stat-k">of 51,079 English reviews</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">2028</span><span class="stat-k">console release window</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
</div>

<div class="verdict">
<div class="verdict-col verdict-yes">
<h3>Buy it if</h3>
<p>You play on Windows, you will live with a kernel-level anti-cheat, and you want a shooter that gets rebuilt under you for two years.</p>
</div>
<div class="verdict-col verdict-no">
<h3>Wait if</h3>
<p>You need Linux or Proton, you are on console — Steam's own <a href='https://steamcommunity.com/app/1867240/announcements/'>launch post</a> dates consoles to 2028 — or you expect the free starter kit to be usable. It is not, and that is deliberate.</p>
</div>
</div>

<h2>Where the player base actually sits</h2>
<p>Three numbers describe this launch better than any review score does, and all three come from a third-party database rather than from Valve. The closed beta peaked at 244,926 concurrent players on 5 September 2026. Four days after release, on 13 September, the game set an all-time peak of 428,666. By the final week of September it was running near 132,000 concurrent.</p>

<p class="src">Those three figures are third-party, not official. They are recorded by <a href='https://steamdb.info/app/1867240/charts/'>SteamDB</a>, a community-run database that mirrors the player counts Steam exposes through its API; the Closed Beta peak sits on a separate app chart (<a href='https://steamdb.info/app/4809930/charts/'>app 4809930</a>). Read 28 September 2026. Valve publishes a live player count but no per-game concurrency history, so no official source exists for the Closed Beta peak, the 13 September peak or the late-September figure, and none of the three should be quoted as an official number. The nearest official statement is the launch-week maintenance post, which claims the game passed 400,000 peak concurrent users.</p>

<p>Copies moved fast in between: 1.25 million by 11 September, two million by 15 September (<a href='https://steamcommunity.com/app/1867240/announcements/'>Steam announcements</a>, read 30 September 2026). The store page now carries 51,079 English reviews — Very Positive — inside 76,407 across all languages, which grades Mostly Positive (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 28 September 2026).</p>

<p>The spike is not the community, and the community is not the spike. If queue health is what you are buying, check the live concurrent number on the day you pay, not the record.</p>

<figure class="pagefig"><picture><source media="(prefers-color-scheme: light)" srcset="/assets/img/wardogs-fig-players-light.png"><img src="/assets/img/wardogs-fig-players.png" width="1200" height="630" alt="Bar chart of three WARDOGS concurrency readings: closed beta peak 244,926, all-time peak 428,666, final week of September about 132,000"></picture><figcaption>Concurrency, as recorded by <a href='https://steamdb.info/app/1867240/charts/'>SteamDB</a>, a third-party database rather than Valve. Read 28 September 2026.</figcaption></figure>

<figure class="pagefig"><picture><source media="(prefers-color-scheme: light)" srcset="/assets/img/wardogs-fig-copies-light.png"><img src="/assets/img/wardogs-fig-copies.png" width="1200" height="630" alt="Timeline of WARDOGS sales posts: 1.25 million copies on 11 September 2026, two million on 15 September, three million on 26 September"></picture><figcaption>The studio's own sales posts on the <a href='https://steamcommunity.com/app/1867240/announcements/'>official Steam announcement feed</a>. Read 30 September 2026.</figcaption></figure>

<h2>Scoring, including the part almost nobody explains</h2>
<p>Points come from occupancy, not kills. You stand in the Control Zone, you score; your team reaches 100, you win. Inside that zone sits a smaller Hot Zone that pays double cash and counts each player twice toward the score, which is why the last two minutes of a close match turn violent.</p>

<p>Towers are how you steer it. Each map has fixed towers with a control panel, and each tower your faction captures reveals one digit of a four-digit code. Hold all four digits, enter the code at the terminal on the tower where your team has built its base, and the Hot Zone starts drifting toward ground you already fortified. The code is regenerated every match, and because the zone travels rather than teleports, the other two factions get a warning and a direction.</p>

<p>Taking a tower is a procedure, not a capture circle:</p>
<ol>
<li>Clear it. Enemy players must be dead or gone before the panel responds.</li>
<li>Wait out the short lockout once the area is clear. Standing on the panel early does nothing.</li>
<li>Press the panel to interact — there is no timer for standing in a ring.</li>
<li>Hold it. A single surviving defender inside can stop the whole capture.</li>
</ol>

<h2>The economy, with real prices</h2>
<p>You spawn with $10,000 and buy a loadout every life; the balance in your account persists between matches. Weapons are gated twice, once by price and once by class level, so cash alone will not buy you out of the early game. These are Season 1 vendor figures, read off the in-game vendor screen on 28 September 2026 — prices that exist only inside the game have no public page to cite, so the patch and the read date are the provenance:</p>
<ul>
<li>AK74 — $1,600, unlock $10,000 at Assault level 3</li>
<li>Galil — $2,200, unlock $35,000 at Assault level 10</li>
<li>SKS — $2,400, unlock $25,000 at Recon level 5</li>
<li>Mosin Nagant — $4,500, unlock $50,000 at Recon level 10</li>
<li>SV98 — $5,200, unlock $100,000 at Recon level 19</li>
<li>AMR 50 — $8,800, unlock $200,000 at Recon level 35</li>
<li>M249 SAW — $3,200, unlock $100,000 at Support level 15</li>
<li>AH-6M (miniguns) — $7,000, unlock $50,000 at Pilot level 4</li>
<li>L2A6 tank — $14,000, unlock $500,000 at Driver level 35</li>
<li>SPH-2 artillery — $8,000, unlock $500,000 at Wardog level 90</li>
</ul>

<p>The three rifles you get for nothing — Bushmaster M17S, A-91, KH-2002 — sit at the bottom of that roster with a $0 sticker, and they behave like it. That is the real difficulty curve of Wardogs: not aim, but surviving the distance between a free rifle and a Recon level 10 unlock.</p>

<p>Two economy rules change how you should spend. Vendor prices are halved below level 9, which means the cheapest shopping window in the game is also the window in which nothing worth buying is unlocked yet. And Season 1 raised vendor and unlock prices while rebalancing the XP curve from level 10 upward, so any price list you find dated before 10 September 2026 is wrong now.</p>

<p>Cash is also the social layer. You can tip the player who revives or drives you — $500 for a revive is common enough that people warn each other not to tip while enemies are watching — and you can put a bounty on your own head while you wait to be picked up. Anyone can revive anyone, including the enemy. Expect to be hauled back to your feet by the same person you were shooting thirty seconds earlier.</p>

<h2>Where the advice conflicts</h2>
<p>Anti-cheat appears once on the <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>store page</a>, in its feature block, and the line reads: "Uses Kernel Level Anti-Cheat" — one name attached, Elytra. No other provider is named anywhere on that page. The same block also carries a third-party EULA you have to agree to. If anti-cheat is part of your buying decision, that block is the only anti-cheat statement the store itself makes (read 28 September 2026).</p>

<p>Roster counts disagree, and the page doing the counting says why: its 33-weapon, 20-vehicle list is taken from the vendor captures it made during the Closed Alpha, and the same page notes the studio has since confirmed 37 weapons for the Early Access launch while warning that its stock may be faction-gated because only one faction was playable. Nobody is lying; the marketing number and the countable number are simply different numbers.</p>

<p>Performance is a matter of expectations. Minimum spec, off the <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>store page's</a> System Requirements block (read 28 September 2026): Windows 10, Intel Core i5 8600, 16 GB of RAM, an Nvidia GTX 1660, 50 GB, "1080p Low @ 60fps (Upscaled)". The recommended column asks for Windows 11, an i7 12700k, 16 GB of RAM and an RTX 3070, and its own stated ceiling is "1440p Medium @ 70fps+ (Native) or 4k Medium @ 60fps+ (Upscaled)". It runs. It does not run like a 5v5 competitive shooter.</p>

<h2>The three details that decide it for most people</h2>
<p><strong>Consoles are 2028.</strong> PC-first was stated before launch and the launch post repeats it: consoles in 2028.</p>

<p><strong>Linux and Proton are out.</strong> The tracker that follows the game records the studio's 4 September position as "Linux and Proton are not supported at launch", with refunds for anyone who bought for Linux — and that answer carries straight over to the Steam Deck, which runs Windows games through the same Proton layer. There is no Deck rating on the store page.</p>

<p><strong>The commute is the respawn timer.</strong> There is no arcade respawn counter. Getting from your base back to the Control Zone — buying a vehicle, catching a lift, trusting a pilot — is the penalty for dying, which is why logistics, transport and helicopters are paid roles. It also reframes the fight: killing the enemy's spawn vehicle costs them more than killing the player standing next to it.</p>

<p>The studio's Early Access notes say the price is lower during Early Access and rises toward the full release (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 28 September 2026). Season 2 is dated 15 October 2026 (<a href='https://steamcommunity.com/app/1867240/announcements/'>Steam announcements</a>, read 28 September 2026). Before you pay, check the current patch number, check the anti-cheat line in the store page's feature block, and check the live player count. Those three checks tell you more than any launch-week review.</p>

<div class="qa">
<h2>Common questions</h2>
${faqHtml}
<p class="src">Where these figures come from: the <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>WARDOGS store page</a> and the <a href='https://steamcommunity.com/app/1867240/announcements/'>official Steam announcements</a> for the price, dates, specifications and sales milestones; <a href='https://steamdb.info/app/1867240/charts/'>SteamDB</a>, a third-party community database, for the three concurrent-player figures, which are marked as third-party wherever they appear on this page; <a href='https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=1867240'>Steam's current-players API</a> for the live count. All read on 28 September 2026. The vendor price list is the exception: those figures were recorded from the in-game vendor screen in Season 1, and no public page carries them.</p>
</div>

<figure class="pagefig"><picture><source media="(prefers-color-scheme: light)" srcset="/assets/img/wardogs-light.png"><img src="/assets/img/wardogs.png" width="1200" height="630" alt="WARDOGS page card: starting balance, players per match and factions"></picture><figcaption>Drawn for this page, dark or light to match. Figures as read on 28 September 2026.</figcaption></figure>

${adUnit}

<div class="readnext">
<p><a href="/wardogs-reddit">What WARDOGS players are asking for on Reddit &rarr;</a></p>
<p><a href="/wardogs-price">What WARDOGS costs in eight Steam regions &rarr;</a></p>
<p><a href="/wardogs-achievements">WARDOGS achievements, all ten and how rare each one is &rarr;</a></p>
<p><a href="/wardogs-reviews">What 51,079 English Steam reviews say about WARDOGS &rarr;</a></p>
<p><a href="/wardogs-early-access">What the developers say about Early Access timing and the full game &rarr;</a></p>
<p><a href="/wardogs-release-date">When WARDOGS released, and what the date did not settle &rarr;</a></p>
<p><a href="/wardogs-gameplay">The one game mode, and the two names that are not modes &rarr;</a></p>
<p><a href="/wardogs-steam-deck">Does WARDOGS run on the Steam Deck? Valve's own answer &rarr;</a></p>
</div>`,
};
