// Batch word wardogs discord. The server's own numbers come from Discord's
// invite endpoint, the ban policy from the studio's own post, and the regional
// servers from the community lists — each line with the day it was read.
const faqs = [
  {
    q: "What is the official WARDOGS Discord?",
    a: "It is the server Discord itself names <strong>WARDOGS</strong>, with the vanity address <code>discord.gg/playwardogs</code> and the guild id <code>1464219389913071646</code> (<a href='https://discord.com/api/v10/invites/playwardogs?with_counts=true'>Discord invite endpoint</a>, read 3 October 2026). A second public code, <code>discord.com/invite/TxKKdspkCp</code>, resolves to the same guild id, which is why both are quoted as the same server (<a href='https://discord.com/api/v10/invites/TxKKdspkCp?with_counts=true'>Discord invite endpoint</a>, read 3 October 2026).",
  },
  {
    q: "How many people are in the WARDOGS Discord?",
    a: "Discord returned <strong>466,250 members</strong> and <strong>183,346 online</strong> at 00:09 UTC on 3 October 2026 (<a href='https://discord.com/api/v10/invites/playwardogs?with_counts=true'>Discord invite endpoint</a>, read 3 October 2026). Discord labels those two figures approximate, and they move all day, so treat the number above as a reading with a timestamp rather than a value. For scale on the same morning, Valve reported <strong>181,288</strong> accounts with the game open (<a href='https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=1867240'>Steam Web API, app 1867240</a>, read 3 October 2026).",
  },
  {
    q: "Do you have to own WARDOGS to join the Discord?",
    a: "No official page we could read asks for a purchase. The studio's own playtest page asks players to wishlist the game on Steam and to join its Discord server, and hands them Discord and Steam sign-in buttons rather than a key (<a href='https://community.wardogs.com/signup/community'>community.wardogs.com playtest sign-up</a>, read 3 October 2026). What we cannot tell you is what the server does with new accounts inside, because the invite endpoint only returns the guild's public fields, its member count and its rules channel name.",
  },
  {
    q: "Is there an Australian or Oceania WARDOGS Discord?",
    a: "Regional groups exist and they are community-run. The server list we read carries 179 dedicated server pages and 49 distinct Discord invite codes, including one ending in <code>wardogsau</code> — the list is the hub's community server list, at wardogshub.gg/servers/ (read 3 October 2026). Players were asking for exactly that on 9 September 2026, when someone opened a thread on r/WarDogs titled \"Australian discord?\" (<a href='https://www.reddit.com/r/WarDogs/comments/1wbbrfp/'>r/WarDogs</a>, read 2 October 2026).",
  },
  {
    q: "Can you get banned from the WARDOGS Discord?",
    a: "The studio has published its policy on one specific case, in the patch post of 12 September 2026: content that teaches other players how to abuse the game's economy \"will result in a permanent ban\", and the post draws its own line — \"We are not saying do not post on social media or Discord. We are saying there is a difference between promoting and alerting\" (<a href='https://store.steampowered.com/news/app/1867240'>official Steam news post</a>, read 3 October 2026). The same post says abusing cash exploits brings a timed ban and a balance reset to 0, and XP farming a permanent ban.",
  },
  {
    q: "How do you appeal a WARDOGS ban?",
    a: "No appeal route is published on any surface we could read on 3 October 2026: not on the Steam news feed, not on the playtest site, and the community server list does not carry one either. The clearest player-side account is a thread from 11 August 2026 whose author says there \"doesn't seem to be any appeal process\" anywhere, with the replies voted highest reading the ban as an automatic filter rather than a person's decision (<a href='https://www.reddit.com/r/WarDogs/comments/1vlp8jg/'>r/WarDogs</a>, read 2 October 2026). Treat that as a player report, not a policy.",
  },
  {
    q: "Is the WARDOGS Wiki Discord the same server?",
    a: "No. The invite the wiki publishes resolves to a different guild, named <strong>WARDOGS Wiki</strong>, which Discord reported at 48 members and 9 online at 00:09 UTC on 3 October 2026 (<a href='https://discord.com/api/v10/invites/FebbhMS7X?with_counts=true'>Discord invite endpoint</a>, read 3 October 2026). The wiki's own front page invites readers to join it (wardogs.wiki, read 3 October 2026), and it is run by that site, not by the studio.",
  },
  {
    q: "Where are WARDOGS announcements posted?",
    a: "Two places, for two different jobs. Everything dated and public goes to the game's Steam news feed, which is where the patches, the sales milestones and the Season 02 date appear (<a href='https://store.steampowered.com/news/app/1867240'>official Steam news</a>, read 3 October 2026). The Discord is where the studio sends playtest matters, including its own instruction that playtests stay under NDA and that players should \"read all discord announcements carefully\" (<a href='https://store.steampowered.com/news/app/1867240'>official Steam news post, PRE-ORDER NOW!</a>, 11 August 2026, read 3 October 2026).",
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
        { "@type": "ListItem", position: 3, name: "Discord", item: SITE + "/wardogs-discord" },
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
      url: SITE + "/wardogs-discord",
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

// 2026-10-04: one "Quick answers" entry added straight after the first screen, on
// the owner's order. Content addition only — title, h1, url and the existing
// sections are untouched. Source: the studio's own server hub page (read 3
// October 2026), whose second invite points at a server-admins server.
const quickAnswers = [
  {
    q: "Is there a second official WARDOGS Discord?",
    a: "Yes. The studio's own server hub page carries a second invite, <code>discord.com/invite/wardogsadminhub</code>, under the heading \"JOIN THE SERVER ADMIN HUB DISCORD\" — that one is for the people running servers, and it is a separate server from the community one this page measures (<a href=\"https://www.wardogs.com/serverhub\">studio server hub page</a>, read 3 October 2026).",
  },
];

const quickHtml = faqList(quickAnswers);

import { adUnit } from "../ad.mjs";
import { faqList } from "../faq.mjs";

export const page = {
  source: "src/pages/wardogs-discord.mjs",
  path: "/wardogs-discord",
  title: "WARDOGS Discord: 466,250 members, and the servers that are not the official one",
  description:
    "466,250 accounts were in the WARDOGS Discord and 183,346 were online when Discord's own invite endpoint was read at 00:09 UTC on 3 October 2026. The official address, the two codes that lead to it, the ban policy in the studio's words, and the regional servers that are not it.",
  extraHead: "<script type='application/ld+json'>" + JSON.stringify(schema) + "</script>",
  body: `<h1>WARDOGS Discord: 466,250 members, and the servers that are not the official one</h1>

<p class="lede"><strong>466,250 accounts</strong> were in the WARDOGS Discord, and <strong>183,346</strong> of them were online, when Discord's own invite endpoint was read at 00:09 UTC on 3 October 2026 (<a href="https://discord.com/api/v10/invites/playwardogs?with_counts=true">Discord invite endpoint, playwardogs</a>, read 3 October 2026). The same morning Valve reported <strong>181,288</strong> accounts with the game open (<a href="https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=1867240">Steam Web API, app 1867240</a>, read 3 October 2026) — which is the first thing worth knowing about this page: the Discord is not a room next to the game, it is larger than the number of people playing it.</p>

<p>How to read this page. The server's fields and counts are Discord's own, printed with the minute they were read, because Discord calls them approximate and they change on their own. The policy lines are the studio's, quoted from the day they were posted. Where nothing is published — who moderates, how to appeal — that is written down as a gap rather than guessed at. Whether a second official server exists is no longer a blank; the Quick answers block below points to the studio's own answer.</p>

<div class="strip">
<div><span class="stat-n">466,250</span><span class="stat-k">members in the official server, read 3 October 2026</span><span class="stat-src"><span class="src-chip src-third">Discord</span></span></div>
<div><span class="stat-n">183,346</span><span class="stat-k">online at the same second, read 3 October 2026</span><span class="stat-src"><span class="src-chip src-third">Discord</span></span></div>
<div><span class="stat-n">2</span><span class="stat-k">public invite codes that resolve to the same server, read 3 October 2026</span><span class="stat-src"><span class="src-chip src-calc">our reading</span></span></div>
<div><span class="stat-n">181,288</span><span class="stat-k">accounts with the game open on Steam at 00:09 UTC, read 3 October 2026</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">49</span><span class="stat-k">distinct Discord invites on the community server list, read 3 October 2026</span><span class="stat-src"><span class="src-chip src-third">hub</span></span></div>
<div><span class="stat-n">48</span><span class="stat-k">members in the wiki's own server, read 3 October 2026</span><span class="stat-src"><span class="src-chip src-third">Discord</span></span></div>
</div>

<h2>Quick answers</h2>

${quickHtml}

<h2>The official server, in Discord's own fields</h2>

<p>Everything below was returned by one request, on 3 October 2026 at 00:09 UTC. The endpoint is public, needs no token, and answers with the server's public profile plus two approximate counts (<a href="https://discord.com/api/v10/invites/playwardogs?with_counts=true">Discord invite endpoint</a>, read 3 October 2026):</p>

<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="guild-caption">
<table class="matrix">
<caption id="guild-caption">The official WARDOGS server, read from Discord's own invite endpoint on 3 October 2026.</caption>
<thead><tr><th scope="col">Field</th><th scope="col">What Discord returned</th><th scope="col" class="num">Read on</th></tr></thead>
<tbody>
<tr><td>Guild id</td><td class="wrap-cell"><code>1464219389913071646</code></td><td class="num">3 Oct 2026</td></tr>
<tr><td>Name</td><td class="wrap-cell">WARDOGS</td><td class="num">3 Oct 2026</td></tr>
<tr><td>Vanity address</td><td class="wrap-cell"><code>discord.gg/playwardogs</code></td><td class="num">3 Oct 2026</td></tr>
<tr><td>Description</td><td class="wrap-cell">"In-Development 'Tactical All-Out Warfare' FPS. Cash is King."</td><td class="num">3 Oct 2026</td></tr>
<tr><td>Server tag</td><td class="wrap-cell"><code>//WD</code></td><td class="num">3 Oct 2026</td></tr>
<tr><td>Members</td><td class="wrap-cell">466,250, marked approximate</td><td class="num">3 Oct 2026</td></tr>
<tr><td>Online</td><td class="wrap-cell">183,346, marked approximate</td><td class="num">3 Oct 2026</td></tr>
<tr><td>Boosts</td><td class="wrap-cell">1,088, at Discord's top boost tier</td><td class="num">3 Oct 2026</td></tr>
<tr><td>Verification level</td><td class="wrap-cell">2, one of Discord's own account-age gates</td><td class="num">3 Oct 2026</td></tr>
<tr><td>Listed for discovery</td><td class="wrap-cell">Yes — the server carries Discord's discoverable flag</td><td class="num">3 Oct 2026</td></tr>
<tr><td>Landing channel</td><td class="wrap-cell">A channel whose name is the word "welcome"</td><td class="num">3 Oct 2026</td></tr>
</tbody>
</table>
</div>

<p class="src">One caution that applies to the whole table: these are Discord's numbers about itself, not the studio's numbers about the game. They are returned as approximations, Discord publishes no history for them, and a count read ten minutes apart will differ. This page prints the reading and the minute, and nothing else.</p>

<h2>Two public codes, one server — and what the studio itself prints</h2>

<p>The official address is the vanity one: <code>discord.gg/playwardogs</code>. A second code circulates as well, <code>discord.com/invite/TxKKdspkCp</code>, and the two are the same server — both resolve to guild <code>1464219389913071646</code> (<a href="https://discord.com/api/v10/invites/TxKKdspkCp?with_counts=true">Discord invite endpoint</a>, read 3 October 2026). That second code is the one the guide site prints in its footer under "Official channels", labelled "Official Discord" (wardogs.site, read 3 October 2026).</p>

<p>Then there is the studio's own surface, and it is more cautious than the fan sites. The playtest sign-up page says, in its own words, to wishlist the game on Steam and "join our Community Discord Server", and it offers Discord and Steam sign-in buttons rather than an invite code (<a href="https://community.wardogs.com/signup/community">community.wardogs.com playtest sign-up</a>, read 3 October 2026). The Steam news feed goes further in the other direction: its pre-order post of 11 August 2026 tells players that playtests stay under NDA and to "read all discord announcements carefully" (<a href="https://store.steampowered.com/news/app/1867240">official Steam news post</a>, read 3 October 2026). So the studio treats the server as an official channel without printing its address where we could read it today — the address is confirmed by Discord's endpoint and by two independent sites, not by an official page.</p>

<p class="src">One detail we are leaving as an observation rather than a claim: Discord's answer to the second invite also names the account that created it — a handle called KingHoward (read 3 October 2026). We are not asserting who that account belongs to. The guild id is the evidence that the two codes are one server; the creator's handle is not evidence of anything by itself.</p>

<h2>What the studio says the Discord is for</h2>

<p>Two official posts describe the job the server does, and neither is marketing copy about community spirit. The first is the pre-order announcement of 11 August 2026, which routes playtest logistics and NDA instructions through Discord (<a href="https://store.steampowered.com/news/app/1867240">official Steam news post</a>, read 3 October 2026).</p>

<p>The second is the economy-abuse stance the studio published on 12 September 2026, which is the closest thing to published rules that exists. Verbatim, from that post (<a href="https://store.steampowered.com/news/app/1867240">official Steam news post, SCHEDULED MAINTENANCE &amp; PATCH 0.11</a>, read 3 October 2026):</p>

<ul>
<li>On abusing cash exploits and bugs: "We will respond with a timed ban, the length of which will be determined based on any previously applied bans. We will reset your cash and XP to 0."</li>
<li>On content that teaches the exploit: "We will treat creating content that tutorialises how to abuse systems, with no regard for reporting the issue, as advertising cheats. This will result in a permanent ban."</li>
<li>On where you may talk about it: "We are not saying do not post on social media or Discord. We are saying there is a difference between promoting and alerting."</li>
<li>On XP farming: "If your account is tracked as joining one of these servers for more than a few minutes, we will ban your account permanently."</li>
</ul>

<p>Two smaller lines in the same post matter for anyone joining a room about this game: the studio increased server capacity for Asia, and it apologised for under-serving community servers, calling them "the lifeblood of FPS games like ours" (<a href="https://store.steampowered.com/news/app/1867240">official Steam news post</a>, 12 September 2026, read 3 October 2026).</p>

<h2>The servers that are not the official one</h2>

<ul>
<li><strong>The wiki's own server.</strong> wardogs.wiki runs a separate Discord, named <strong>WARDOGS Wiki</strong>, which Discord reported at 48 members and 9 online at 00:09 UTC on 3 October 2026 (<a href="https://discord.com/api/v10/invites/FebbhMS7X?with_counts=true">Discord invite endpoint</a>, read 3 October 2026). Searching the wiki itself for "discord" returns zero articles — the invite lives on the front page, not in an entry (MediaWiki API, read 3 October 2026).</li>
<li><strong>Regional and community groups.</strong> The hub keeps the list that matters here: 179 dedicated server pages in its sitemap, carrying 49 distinct Discord invite codes when read on 3 October 2026, sorted by region and hosting. That list lives at wardogshub.gg/servers/ (read 3 October 2026). On that reading it held Latin American, Turkish, German, French, South African and Polish groups, an 18-and-over English group, and one code ending <code>wardogsau</code>.</li>
<li><strong>Reddit, where the questions actually appear.</strong> Someone asked on 9 September 2026 whether an Australian Discord existed; a UK server aimed at players aged 30 and over advertised itself on 16 September 2026; on 1 October 2026 a player who has been on community servers since the Counter-Strike mod era introduced his group (<a href="https://www.reddit.com/r/WarDogs/comments/1wbbrfp/">r/WarDogs</a>, read 2 October 2026). Reddit refused this machine on 3 October 2026 with HTTP 403, so every thread quoted on this page carries its 2 October reading date instead of today's.</li>
</ul>

<p>One pattern is worth naming because it is the opposite of what the size of the server suggests. The official room is enormous and impersonal; the questions people actually ask — a regional server, a group for older players, someone to squad with — get answered in the small community servers and on Reddit, not in the main hall.</p>

<h2>Bans, and the missing half of the policy</h2>

<p>The studio published what happens if you abuse the economy. It has not published what happens if you disagree with a ban: there is no appeals page on the Steam feed, none on the playtest site, and the community server list does not carry one either, as read on 3 October 2026 (<a href="https://store.steampowered.com/news/app/1867240">official Steam news</a>, read 3 October 2026). The player-side account that matches that gap is a thread from 11 August 2026, whose author says there does not seem to be an appeal process anywhere, and whose highest-voted replies read the ban as an automatic filter rather than a human decision — no vote counts are printed here, only the direction of the room (<a href="https://www.reddit.com/r/WarDogs/comments/1vlp8jg/">r/WarDogs</a>, read 2 October 2026).</p>

<h2>This week</h2>

<ul>
<li><strong>3 October 2026</strong> — the reading this page is built on: 466,250 members, 183,346 online, and a Steam count of 181,288 at 00:09 UTC (<a href="https://discord.com/api/v10/invites/playwardogs?with_counts=true">Discord invite endpoint</a> and <a href="https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=1867240">Steam Web API</a>, read 3 October 2026).</li>
<li><strong>2 October 2026</strong> — two hotfixes in one day: a Security &amp; Stability hotfix timestamped 00:13 UTC and an "IR Goggles &amp; CWIS Balance Hotfix" timestamped 15:39 UTC (<a href="https://store.steampowered.com/news/app/1867240">official Steam news</a>, read 3 October 2026).</li>
<li><strong>30 September 2026</strong> — Update 0.1.2, the one that fixed cash and XP exploits and reshaped the deployment screen into Official, Community, Infantry Mode and Low-Level servers (<a href="https://store.steampowered.com/news/app/1867240">official Steam news</a>, read 3 October 2026). That split is written up on <a href='/wardogs-gameplay'>the gameplay page</a>.</li>
<li><strong>26 September 2026</strong> — three million copies sold and a Golden Joystick nomination, in the studio's own post (<a href="https://store.steampowered.com/news/app/1867240">official Steam news</a>, read 3 October 2026).</li>
<li><strong>15 October 2026</strong> — Season 02, dated in the teaser of 22 September 2026 (<a href="https://store.steampowered.com/news/app/1867240">official Steam news</a>, read 3 October 2026).</li>
</ul>

<h2>Who else covers this, and what they have</h2>

<ul>
<li><strong>wardogs.site</strong> — prints the invite in its footer's official channels block and stops there. Its own 27 URLs across three languages contain no page about the Discord, and their list is the game, classes, price, release date, system requirements and the September beta (wardogs.site, read 3 October 2026). Credit where it is due: that footer is the clearest public pointer to the server we found on any fan site.</li>
<li><strong>wardogs.wiki</strong> — nothing to read. A search of the wiki for "discord" returns zero results (MediaWiki API, read 3 October 2026). It does run its own 48-member server, which is a different thing with a similar name.</li>
<li><strong>wardogshub.gg</strong> — the deepest on community infrastructure and silent on this question. Its sitemap holds 909 URLs and 179 server pages, but the FAQ path for a Discord question returns HTTP 404, and the official server appears on its site as a source link rather than a page (wardogshub.gg/servers/, read 3 October 2026). Its member-facing work is real, and this page is not going to pretend otherwise.</li>
<li><strong>SteamDB</strong> — the feed carries its weekly top-seller posts and its peak-player post; nothing about the Discord (<a href="https://store.steampowered.com/news/app/1867240">official Steam news feed</a>, read 3 October 2026). Its own chart pages were not readable from this machine, and this page does not guess at what they show.</li>
<li><strong>Reddit</strong> — where the regional and appeal questions live, and unreadable from this machine on 3 October 2026 (HTTP 403, read 3 October 2026).</li>
</ul>

<h2>Every claim on this page, sorted</h2>

<div class="matrix-scroll" role="region" tabindex="0" aria-labelledby="layers-caption">
<table class="matrix">
<caption id="layers-caption">Every claim on this page, sorted. Read 3 October 2026.</caption>
<thead><tr><th scope="col">Layer</th><th scope="col">What is in it</th></tr></thead>
<tbody>
<tr><td>Confirmed by the studio</td><td class="wrap-cell">Playtest logistics and NDA notices go through the studio's Discord, and players are told to read the Discord announcements (Steam news, 11 August 2026). The ban policy for cash exploits, tutorialising content and XP farming (Steam news, 12 September 2026). That community servers are supported, and were under-served until the 0.11 patch (same post).</td></tr>
<tr><td>Reported by a service about itself</td><td class="wrap-cell">466,250 members, 183,346 online, 1,088 boosts, verification level 2, the guild tag <code>//WD</code> and the discoverable listing — all from Discord's invite endpoint at 00:09 UTC on 3 October 2026, all marked approximate by Discord.</td></tr>
<tr><td>Printed by third parties, not by the studio</td><td class="wrap-cell">The invite code itself. It reaches the server, and two independent sites print it, but no official page we could read carries it.</td></tr>
<tr><td>Our reading, not published anywhere</td><td class="wrap-cell">That <code>playwardogs</code> and <code>TxKKdspkCp</code> are one server, which Discord's own guild id settles; and the comparison between the Discord's member count and Valve's live account count, which are two different measurements of two different rooms.</td></tr>
<tr><td>Not confirmed</td><td class="wrap-cell">Whether the studio runs any second or regional server of its own. Who moderates the official server, and how many people do. Whether the server will change when Season 02 arrives on 15 October 2026.</td></tr>
</tbody>
</table>
</div>

<p>And the list this site exists to keep — what nobody has recorded at all, checked on 3 October 2026 and written down rather than guessed at:</p>

<ul>
<li><strong>An official page carrying the invite.</strong> The studio's playtest page asks players to join the server and prints no address; the steam listing does not link it either.</li>
<li><strong>A written code of conduct.</strong> There is a ban policy for economy abuse and nothing else we could find in the official material.</li>
<li><strong>An appeals route.</strong> Nothing published, and one player thread saying the same in August 2026.</li>
<li><strong>Member-count history.</strong> Discord returns a snapshot and keeps no public series, so no growth chart for this server can be drawn from official figures.</li>
<li><strong>A moderator roster or a stated team size.</strong> Not published anywhere we could read.</li>
</ul>

<div class="qa">
<h2>Common questions</h2>
${faqHtml}
<p class="src">Where these figures come from: <a href="https://discord.com/api/v10/invites/playwardogs?with_counts=true">Discord's invite endpoint</a> for the server's public fields and both counts, read 3 October 2026; <a href="https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=1867240">Valve's GetNumberOfCurrentPlayers endpoint</a> for the live account count, read 3 October 2026; the game's <a href="https://store.steampowered.com/news/app/1867240">official Steam news feed</a> for the ban policy, the playtest notices and this week's posts, read 3 October 2026; the studio's <a href="https://community.wardogs.com/signup/community">playtest sign-up page</a>, read 3 October 2026; and the hub's community server list at wardogshub.gg/servers/ for the regional servers, read 3 October 2026. The Reddit threads quoted here were read on 2 October 2026, because the site returned HTTP 403 to this machine on 3 October 2026.</p>
</div>

${adUnit}

<div class="readnext">
<p><a href="/wardogs-reddit">What players ask for, thread by thread &rarr;</a></p>
<p><a href="/wardogs-steam">The live Steam reading and the whole store listing &rarr;</a></p>
<p><a href="/wardogs-player-count">How many people play WARDOGS, and how many are in a match &rarr;</a></p>
<p><a href="/wardogs">The hub: how a match is scored and what kit costs &rarr;</a></p>
</div>`,
};
