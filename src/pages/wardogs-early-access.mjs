// One array drives both the visible questions and the FAQPage JSON-LD.
const faqs = [
  {
    q: "How long will WARDOGS be in Early Access?",
    a: "Around 1 to 2 years, in the studio's own words, and it says explicitly that it does not want to be in Early Access for a long time. The exact duration may still change with development and community feedback.",
  },
  {
    q: "Will the price go up?",
    a: "Yes. The stated plan is a lower price during Early Access and a higher price at full release, to reflect the more complete experience. Players who buy now are paying the lower tier.",
  },
  {
    q: "What is planned for the full version?",
    a: "New vehicle types including fighter jets, expanded weapon categories and additional objective variations, plus deeper progression systems and a stronger seasonal metagame. Balance, performance and stability are named as the ongoing priority.",
  },
  {
    q: "Is the game finished now?",
    a: "The Early Access build is fully playable and represents the core vision, with online multiplayer, large-scale maps, vehicles, logistics and proximity voice chat in place. Ongoing balance changes, feature expansion and polish should be expected.",
  },
  {
    q: "When exactly does Early Access end?",
    a: "No date is published. The studio gives a range rather than a date and says the exact duration may change.",
  },
  {
    q: "Where does this text come from?",
    a: "The Early Access question-and-answer block on the <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read on 28 September 2026. Every quotation above is the developer's own wording from that block.",
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
        { "@type": "ListItem", position: 2, name: "WARDOGS Early Access", item: SITE + "/wardogs-early-access" },
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
  ogImage: "https://shooteratlas.com/assets/img/wardogs-early-access.png",
  source: "src/pages/wardogs-early-access.mjs",
  path: "/wardogs-early-access",
  title: "WARDOGS Early Access — what the developers say about the timeline, the price and the full game",
  description:
    "The official Steam Early Access Q&A for WARDOGS (read 28 September 2026): around 1–2 years in Early Access, a lower price now that rises at full release, and planned additions including fighter jets, expanded weapon categories and more objective variations.",
  extraHead:
    "<style>" +
    "blockquote{margin:0 0 1.2rem;padding:.7rem 1rem;border-left:3px solid var(--rule);color:var(--muted);font-style:italic;font-size:.98rem}" +
    "</style>" +
    "<script type='application/ld+json'>" + JSON.stringify(schema) + "</script>",
  body: `<h1>WARDOGS Early Access: what the developers actually say</h1>
<p class="lede">WARDOGS entered Steam Early Access on 10 September 2026. The <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a> carries the developer's own Early Access Q&amp;A — six questions, answered in their words. The short version: roughly 1–2 years in Early Access, a lower price now that rises toward full release, and a full version planned to add fighter jets, more weapon categories and more objective variations. The full text, quoted from Steam, is below (read 28 September 2026).</p>

<h2>Why Early Access?</h2>
<blockquote>"Early Access lets us put a fully playable FPS in players' hands early, gather meaningful feedback, and iterate alongside the community. We want players to help shape balance, pacing, progression, and features as the game grows, while also being transparent about the development. Players will be able to engage with developers via Discord, X, and YouTube."</blockquote>

<h2>Approximately how long will this game be in Early Access?</h2>
<blockquote>"We expect WARDOGS to remain in Early Access for around 1 to 2 years. We are adamant that we do not want to be in Early Access for a long time. That time is planned for expanding content, improving systems, refining balance, and responding to player feedback. The exact duration may change depending on how development and community feedback evolves."</blockquote>

<h2>How is the full version planned to differ from the Early Access version?</h2>
<blockquote>"The full version of WARDOGS is planned to be broader and more polished than the Early Access release. As a result, we plan for WARDOGS to be priced lower during Early Access, with a higher price at full release to reflect the more complete experience. Early Access players benefit from getting in at a lower price and helping shape the game as it develops. We plan to expand WARDOGS in several key areas. Of course this includes more maps, weapons, vehicles, and gameplay variety but our primary focus is on building deeper reasons to play beyond individual matches. We plan to develop more in depth progression systems, a stronger seasonal meta game, and additional systems that reward players for the time and impact they bring to a match, whether through combat, support, or logistics. Alongside this, we plan broader gameplay additions such as new vehicle types including fighter jets, expanded weapon categories, additional objective variations, and continued improvements to the core WARDOGS experience. Throughout Early Access and beyond, our ongoing priority will always be improving balance, performance, and stability."</blockquote>

<h2>What is the current state of the Early Access version?</h2>
<blockquote>"The Early Access version of WARDOGS is fully playable and represents the core vision of the game. Players can currently expect: a 100-player, three-team WARDOGS experience; large-scale maps with dynamic objective zones; cash &amp; XP-based progression where every action earns rewards; realistic gunplay balanced for gameplay rather than simulation; vehicles, logistics systems, and support-focused gameplay; online multiplayer with proximity voice chat. While the core experience is in place, WARDOGS is still actively evolving. Players should expect ongoing balance changes, feature expansion, and polish as development continues."</blockquote>

<h2>Will the game be priced differently during and after Early Access?</h2>
<blockquote>"Yes, we plan for WARDOGS to be priced lower during Early Access. As new content, systems, and polish are added, we may raise the price closer to full release. Early Access players benefit from entering at a lower price while helping shape the game during its most formative stage."</blockquote>

<h2>How are you planning on involving the Community in your development process?</h2>
<blockquote>"Community involvement is central to how WARDOGS is being built. We plan to: actively gather feedback through Steam, social channels, and playtests; monitor gameplay data to inform balance and economy changes; run seasonal updates that respond directly to player behaviour; share development updates and design decisions openly. WARDOGS is designed to evolve alongside its community, with player feedback helping guide both short term improvements and long term direction."</blockquote>

<h2>What the answers tell you</h2>
<p>Three takeaways survive the marketing language. First, the timeline is bounded: "around 1 to 2 years", with the studio explicitly saying it does not want a long Early Access. Second, the price is a ramp: cheaper now, higher at 1.0 — which is why the store lists $39.99 for Early Access against higher planned tiers. Third, the content plan is concrete in places (fighter jets, expanded weapon categories, additional objective variations, deeper progression and a seasonal meta game) and vague in others (exact maps, exact dates). Treat the concrete list as the promise and the vague parts as undecided.</p>

<p>None of the three sites that cover WARDOGS in depth compiles this Q&amp;A. wardogs.site mentions the 1–2 year window once in passing; wardogshub.gg tracks live data but does not quote the developer's Early Access statements. This page exists to put the official text in one place.</p>

<div class="qa">
<h2>Common questions</h2>
${faqHtml}
<p class="src">Source: the Early Access block on the <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>WARDOGS store page</a>, read on 28 September 2026. The quotations on this page are reproduced from that block; the commentary around them is ours.</p>
</div>

<figure class="pagefig"><img src="/assets/img/wardogs-early-access.png" width="1200" height="630" alt="WARDOGS Early Access card: 1-2 years in Early Access, $39.99 now, fighter jets planned"><figcaption>Drawn for this page. Figures as read on 28 September 2026.</figcaption></figure>

${adUnit}

<div class="readnext">
<p><a href="/wardogs">Scoring, prices and platform support for WARDOGS &rarr;</a></p>
<p><a href="/wardogs-reviews">What 54,566 Steam reviews say about WARDOGS &rarr;</a></p>
<p><a href="/wardogs-achievements">All ten WARDOGS achievements and how rare each one is &rarr;</a></p>
</div>`,
};
