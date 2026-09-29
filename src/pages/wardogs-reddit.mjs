// One array drives both the visible questions and the FAQPage JSON-LD.
const faqs = [
  {
    q: "What is r/WarDogs?",
    a: "It is the subreddit the game's players use to post feedback, complaints and questions, and it is where most of the community discussion about WARDOGS happens. The threads collected on this page come from it and from r/ShouldIbuythisgame, a separate subreddit where strangers answer purchase questions.",
  },
  {
    q: "What are WARDOGS players complaining about?",
    a: "Four things come up again and again: mortars being cheap, easy and tedious to fight; vehicles misbehaving on collisions, with the Ural named most often; being looted by your own team without agreeing to it; and whether a sniper headshot should always be lethal. The first three are requests in the players' own words; the fourth is an argument with two sides, not a demand.",
  },
  {
    q: "Is WARDOGS worth buying according to Reddit?",
    a: "The most-upvoted verdict is that the game shows a lot of potential provided the studio does not misstep, and that it could be a great game by the time it leaves Early Access. Five of the ten threads in the game's first Early Access month are variations on the same buy-or-wait question, which tells you the community has not settled on an answer either.",
  },
  {
    q: "Are these complaints official?",
    a: "No. Every quote on this page is a player reply, and the players are not speaking for BULKHEAD or Team17. The studio's own position lives in the Early Access Q&A block on the <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 29 September 2026, and that block does not discuss mortars, vehicle collisions or looting at all.",
  },
  {
    q: "Do the developers answer these threads?",
    a: "We did not find a studio reply in the threads read for this page, so treat them as player-to-player. The store page's Q&amp;A block states that the studio gathers feedback through Steam, social channels and playtests, and that development updates are shared openly — that is the studio's own description of its process, read 29 September 2026, not a promise about any one thread.",
  },
  {
    q: "Why is none of this on the other WARDOGS sites?",
    a: "The three sites that document WARDOGS in depth cover other ground: wardogs.site is an official changelog and FAQ, wardogs.wiki is a database of item stats, and wardogshub.gg tracks weapons, economy, servers and patch notes. None of them reproduces what players are asking for, which is the gap this page fills.",
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
        { "@type": "ListItem", position: 3, name: "WARDOGS on Reddit", item: SITE + "/wardogs-reddit" },
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
      url: SITE + "/wardogs-reddit",
      applicationCategory: "Game",
      gamePlatform: "PC",
      author: { "@type": "Organization", name: "BULKHEAD" },
      publisher: { "@type": "Organization", name: "Team17" },
      sameAs: ["https://store.steampowered.com/app/1867240/WARDOGS/"],
    },
  ],
};

const faqHtml = faqs.map((f) => `<h3>${f.q}</h3>\n<p>${f.a}</p>`).join("\n");

import { adUnit } from "../ad.mjs";

export const page = {
  ogImage: "https://shooteratlas.com/assets/img/wardogs-reddit.png",
  source: "src/pages/wardogs-reddit.mjs",
  path: "/wardogs-reddit",
  title: "WARDOGS on Reddit — what players are actually asking for",
  description:
    "Ten r/WarDogs and r/ShouldIbuythisgame threads posted between 4 and 26 September 2026: five are the same buy-or-wait question, and the recurring asks are mortars, vehicle collisions, ally looting and the one-shot sniper rule.",
  extraHead:
    "<script type='application/ld+json'>" + JSON.stringify(schema) + "</script>",
  body: `<h1>WARDOGS on Reddit: what players are actually asking for</h1>
<p class="lede">In the first month of Early Access — 4 to 26 September 2026 — the WARDOGS subreddit and r/ShouldIbuythisgame produced ten threads that between them cover almost everything a new buyer asks. Five of the ten are the same question dressed differently: is this worth buying. The most-upvoted verdict says the game shows a lot of potential provided the studio does not misstep, and the four things players keep asking to be changed are mortars, vehicle collision physics, being looted by your own team, and whether a sniper headshot should always be lethal. All ten threads are listed below with their dates, and none of the three WARDOGS coverage sites — wardogs.site, wardogs.wiki, wardogshub.gg — collects any of this.</p>

<h2>The ten threads, in date order</h2>
<p class="src">Sources: <a href='https://www.reddit.com/r/WarDogs/'>r/WarDogs</a> and <a href='https://www.reddit.com/r/ShouldIbuythisgame/'>r/ShouldIbuythisgame</a>. Thread titles and dates are reproduced as posted; each was checked on 28 September 2026. The count of ten, and the count of five purchase questions inside it, are ours.</p>
<ul>
<li>4 September 2026 — "Wardogs is not bad, but it is struggling to hold my attention" — <a href='https://www.reddit.com/r/WarDogs/comments/1w6u9bs/wardogs_is_not_bad_but_it_is_struggling_to_hold/'>r/WarDogs</a>. Posted during the pre-release test period, not after Early Access.</li>
<li>8 September 2026 — "The 11th Reason NOT to Buy WARDOGS." — <a href='https://www.reddit.com/r/WarDogs/comments/1waug2t/the_11th_reason_not_to_buy_wardogs/'>r/WarDogs</a></li>
<li>10 September 2026 — "Is Wardogs worth if you don't play often?" — <a href='https://www.reddit.com/r/WarDogs/comments/1wc9nna/is_wardogs_worth_if_you_dont_play_often/'>r/WarDogs</a></li>
<li>14 September 2026 — "Is Wardogs worth it" — <a href='https://www.reddit.com/r/ShouldIbuythisgame/comments/1wfzkjg/is_wardogs_worth_it/'>r/ShouldIbuythisgame</a></li>
<li>17 September 2026 — "should i get wardogs?" — <a href='https://www.reddit.com/r/ShouldIbuythisgame/comments/1wiovii/should_i_get_wardogs/'>r/ShouldIbuythisgame</a></li>
<li>20 September 2026 — "I'm quitting WarDogs" — <a href='https://www.reddit.com/r/WarDogs/comments/1wlgme2/im_quitting_wardogs/'>r/WarDogs</a></li>
<li>21 September 2026 — "Is wardogs worth it ? As a solo player" — <a href='https://www.reddit.com/r/ShouldIbuythisgame/comments/1wma5yb/is_wardogs_worth_it_as_a_solo_player/'>r/ShouldIbuythisgame</a></li>
<li>21 September 2026 — "is it worth buying right now at 'full' price?" — <a href='https://www.reddit.com/r/WarDogs/comments/1wmc2ts/is_it_worth_buying_right_now_at_full_price/'>r/WarDogs</a></li>
<li>23 September 2026 — "WarDogs is great... but it has a toxic problem." — <a href='https://www.reddit.com/r/WarDogs/comments/1wnziyq/wardogs_is_great_but_it_has_a_toxic_problem/'>r/WarDogs</a></li>
<li>26 September 2026 — "My feedback after 100+ hours of WARDOGS" — <a href='https://www.reddit.com/r/WarDogs/comments/1wqr8ks/my_feedback_after_100_hours_of_wardogs/'>r/WarDogs</a></li>
</ul>

<h2>What the most-upvoted replies say</h2>
<p>The single sentence the community keeps agreeing with shows up in the older of the two general-verdict threads, titled "Be honest, WARDOGS good or bad?" and posted on 22 August 2026 — before Early Access, on the strength of the beta. Its top reply reads: "It shows a lot of potential ... provided they don't misstep ... could be a great game when eventually out of Early Access" (<a href='https://www.reddit.com/r/WarDogs/comments/1vuz1ch/'>r/WarDogs, thread 1vuz1ch</a>, read 28 September 2026).</p>
<p>That is the shape of the whole subreddit in one line: the people who like it are buying a direction of travel rather than a finished game.</p>

<h2>The four asks, in the players' own words</h2>
<p>These four kept surfacing across the month. Each is a reply other players pushed to the top of its thread, which is the only ranking signal used here — vote counts are deliberately not printed, because they move every day.</p>

<h3>1. Mortars</h3>
<p>A top reply in the 100+ hours thread argues the counterplay is missing rather than the damage: "mortars need a better counter, its just not fun when the game becomes about building and mortaring. its inexpensive, easy, high rewarding, but boring" (<a href='https://www.reddit.com/r/WarDogs/comments/1wqr8ks/'>r/WarDogs, 26 September 2026</a>, read 28 September 2026). The same reply goes on to ask for vehicle inventories to be lockable, because other players take rockets out of a parked vehicle.</p>

<h3>2. Vehicle physics</h3>
<p>From the same thread: "VEHICLE PHYSICS IS A BIG ONE ... they just bug out on collisions and stuff, especially the Ural" (<a href='https://www.reddit.com/r/WarDogs/comments/1wqr8ks/'>r/WarDogs, 26 September 2026</a>, read 28 September 2026). This is a handling complaint about a specific vehicle, not a claim that vehicles cannot be used.</p>

<h3>3. Being looted by your own team</h3>
<p>The third request in that thread is a rule change, not a bug fix: "You also shouldn't be able to be looted by allies without your consent" (<a href='https://www.reddit.com/r/WarDogs/comments/1wqr8ks/'>r/WarDogs, 26 September 2026</a>, read 28 September 2026). Anyone can revive anyone in WARDOGS, which is why the same player hands you back your kit — and why players want a say in it.</p>

<h3>4. The sniper headshot argument</h3>
<p>This one has two sides and no consensus. In the August verdict thread, one reply holds that "they should always be one shot to the head", and another argues the opposite: "One shot snipers would actually ruin the game lol. It's already so easy to sit in a bush and kill people" (<a href='https://www.reddit.com/r/WarDogs/comments/1vuz1ch/'>r/WarDogs, 22 August 2026</a>, read 28 September 2026). Nothing in the threads we read settles it.</p>

<h2>Why "is it worth it" is the thread that keeps coming back</h2>
<p>Five of the ten threads are purchase questions, and they split by play pattern: one asks about playing alone, one about playing rarely, one about paying full price today. That pattern says less about the game than about what the store page leaves open. The store page is clear on what the game is — three teams, a randomised 2 × 2 km Control Zone, first to 100 points — and quiet on the two things a hesitant buyer actually needs: how a solo player fares when the match is built around logistics and transport, and whether a few hours a week is enough to hold a position in a 100-player fight.</p>
<p>The replies that answer those questions are the useful ones in the list, because they name a play pattern. The replies that just score the game are the ones to skip.</p>

<h2>How to weigh a WARDOGS thread</h2>
<ul>
<li><strong>Date it against the patch cycle.</strong> A 4 September 2026 thread is pre-release test sentiment; 8 September is launch week; 26 September is one patch later. None of them describe the same build.</li>
<li><strong>Read one person as one person.</strong> The "I'm quitting" thread and the "struggling to hold my attention" thread are both individual reports, not a trend line.</li>
<li><strong>Separate a request from a bug.</strong> Mortar counters and ally consent are design requests. Vehicle collision bugs are reports about behaviour that the players say is wrong.</li>
<li><strong>Check the present before you trust the past.</strong> Match populations move daily, so the mood in a two-week-old thread is not a statement about the game you would install today.</li>
</ul>

<h2>What Reddit is not</h2>
<p>These threads are not the studio's position, and the studio's answers are not hidden — they are in the Early Access Q&A block on the <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a> (read 29 September 2026), which states that WARDOGS is expected to stay in Early Access for around one to two years and that Early Access pricing is deliberately lower than the full-release price. Nothing in that block addresses mortars, vehicle collisions or looting, which is exactly why players keep raising them.</p>
<p>Nor is a thread a measurement. If you want a number rather than a mood, take the live concurrent player count from <a href='https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=1867240'>Steam's own current-players API</a> (read 29 September 2026) instead of whatever a poster remembered.</p>

<div class="qa">
<h2>Common questions</h2>
${faqHtml}
<p class="src">Where this comes from: the ten threads listed above, all on <a href='https://www.reddit.com/r/WarDogs/'>r/WarDogs</a> or <a href='https://www.reddit.com/r/ShouldIbuythisgame/'>r/ShouldIbuythisgame</a> and all read on 28 September 2026, plus the <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>WARDOGS store page</a> and <a href='https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=1867240'>Steam's current-players API</a>, read 29 September 2026. Quotes are player replies reproduced as written, including their typos, and are attributed to the thread they came from; nothing here is the studio's words. Vote counts are not printed because they change daily.</p>
</div>

<figure class="pagefig"><img src="/assets/img/wardogs-reddit.png" width="1200" height="630" alt="WARDOGS on Reddit card: ten threads in the first Early Access month, five of them purchase questions"><figcaption>Drawn for this page. Thread counts as read on 28 September 2026.</figcaption></figure>

${adUnit}

<div class="readnext">
<p><a href="/wardogs">Scoring, prices and platform support for WARDOGS &rarr;</a></p>
<p><a href="/wardogs-price">What WARDOGS costs in eight Steam regions &rarr;</a></p>
<p><a href="/wardogs-reviews">What 54,566 Steam reviews say about WARDOGS &rarr;</a></p>
<p><a href="/wardogs-achievements">All ten WARDOGS achievements and how rare each one is &rarr;</a></p>
</div>`,
};
