// One array drives both the visible questions and the FAQPage JSON-LD.
const faqs = [
  {
    q: "What genre is WARDOGS?",
    a: "Valve's store API files it under five: Action, Indie, Massively Multiplayer, Simulation and Early Access. That is the whole list, in the order the API returns it (<a href='https://store.steampowered.com/api/appdetails?appids=1867240&cc=us&l=english'>Steam appdetails API</a>, read 30 September 2026). Early Access is a release status rather than a genre, but Valve stores it in the same array, so this page prints it in the same place.",
  },
  {
    q: "Does WARDOGS support VR?",
    a: "No. Valve's store page for the game carries no VR block at all: the strings \"VR Supported\", \"VR Only\" and \"VR Support\" appear zero times in the page we read, and the store API returns no VR category (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 30 September 2026). Absence of a VR block is the only reading available; nothing in either surface promises it later.",
  },
  {
    q: "Does WARDOGS support controllers?",
    a: "Steam does not say so anywhere. The store page carries no controller category, not \"Full Controller Support\" and not \"Partial Controller Support\"; both strings appear zero times in the page we read, and the eight categories the API returns contain no controller entry (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 30 September 2026). The store page's own hidden hardware block says something narrower: a controller-configuration wizard was completed, but no controller family is claimed and Steam Input API support is marked false. If you are deciding whether to buy a pad for this game, treat Steam as silent and read the studio's own statements instead.",
  },
  {
    q: "What are the eight store categories?",
    a: "Multi-player, PvP, Online PvP, Steam Achievements, Camera Comfort, Custom Volume Controls, Stereo Sound and Surround Sound (<a href='https://store.steampowered.com/api/appdetails?appids=1867240&cc=us&l=english'>Steam appdetails API</a>, read 30 September 2026). Note what is missing next to that list: no Single-player, no Co-op, no controller category, no VR category, no Steam Workshop.",
  },
  {
    q: "Which platforms does the store listing carry?",
    a: "Windows, and only Windows. The API's platform block reads windows true, mac false, linux false (<a href='https://store.steampowered.com/api/appdetails?appids=1867240&cc=us&l=english'>Steam appdetails API</a>, read 30 September 2026). The console release window the studio has mentioned is 2028, with no platform named and no date set; the running side of that is on our <a href='/wardogs'>WARDOGS page</a>.",
  },
  {
    q: "Do the other WARDOGS sites publish a spec sheet like this?",
    a: "No. wardogs.site's six content pages contain the words genre, controller, gamepad and VR zero times between them; wardogs.wiki's search API returns zero results for genre, controller, VR and platform across the whole wiki (<a href='https://wardogs.wiki/'>wardogs.wiki</a> API, read 30 September 2026). wardogshub.gg is the exception in one direction only: it has a controller explainer of its own, and this page does not repeat its contents.",
  },
  {
    q: "Why does this page correct its own headline?",
    a: "Because the note this page was written from said the game \"has controller support but is not gamepad-preferred\". Valve's two surfaces support the second half and not the first: the hidden hardware block does read bGamepadPreferred false, but the same block leaves every controller family null and marks Steam Input API support false, and the store page prints no controller category at all. The corrected reading is stated in full in the section below rather than quietly edited.",
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
        { "@type": "ListItem", position: 3, name: "Genres and platform specs", item: SITE + "/wardogs-genres" },
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
      url: SITE + "/wardogs-genres",
      applicationCategory: "Game",
      gamePlatform: "PC",
      genre: ["Action", "Indie", "Massively Multiplayer", "Simulation", "Early Access"],
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
  source: "src/pages/wardogs-genres.mjs",
  path: "/wardogs-genres",
  title: "WARDOGS genres and platform specs — five genres, eight categories, Windows only",
  description:
    "What kind of game WARDOGS is, read straight off Valve's store API on 30 September 2026: five genres, eight store categories, Windows only, no VR entry, and no controller category on the store page.",
  extraHead:
    "<style>" +
    "table.spec{width:100%;border-collapse:collapse;margin:0 0 1.4rem}" +
    "table.spec th,table.spec td{text-align:left;padding:.45rem .6rem;border-bottom:1px solid var(--rule)}" +
    "table.spec th{font-size:.78rem;letter-spacing:.04em;text-transform:uppercase;color:var(--muted)}" +
    "table.spec td:first-child{white-space:nowrap;color:var(--muted)}" +
    "blockquote{margin:0 0 1.2rem;padding:.7rem 1rem;border-left:3px solid var(--rule);color:var(--muted);font-style:italic;font-size:.98rem}" +
    "</style>" +
    "<script type='application/ld+json'>" + JSON.stringify(schema) + "</script>",
  body: `<h1>WARDOGS genres and platform specs</h1>
<p class="lede">Five genres, eight store categories, Windows only, and no VR entry anywhere. Valve's store API files WARDOGS as Action, Indie, Massively Multiplayer, Simulation and Early Access (<a href='https://store.steampowered.com/api/appdetails?appids=1867240&cc=us&l=english'>Steam appdetails API</a>, read 30 September 2026). The same payload carries eight feature categories and a platform block reading windows true, mac false, linux false. It carries nothing about VR, and nothing about controllers.</p>

<div class="strip">
<div><span class="stat-n">5</span><span class="stat-k">genres in Valve's array</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">8</span><span class="stat-k">store categories, none for controllers</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">0</span><span class="stat-k">VR entries on either surface</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
<div><span class="stat-n">Windows</span><span class="stat-k">only platform carried</span><span class="stat-src"><span class="src-chip src-official">official</span></span></div>
</div>

<h2>The five genres, in Valve's own order</h2>
<table class="spec">
<tr><th>Value</th><th>Genre as stored</th></tr>
<tr><td>1</td><td>Action</td></tr>
<tr><td>23</td><td>Indie</td></tr>
<tr><td>29</td><td>Massively Multiplayer</td></tr>
<tr><td>28</td><td>Simulation</td></tr>
<tr><td>70</td><td>Early Access</td></tr>
</table>
<p>That is the entire array, not a selection. Early Access is a release status rather than a genre, but Valve stores it in the same list, so it is printed in the same list here. The store listing also carries the publisher as Team17 and the release date as 10 September 2026 (<a href='https://store.steampowered.com/api/appdetails?appids=1867240&cc=us&l=english'>Steam appdetails API</a>, read 30 September 2026).</p>

<h2>The eight categories</h2>
<table class="spec">
<tr><th>Value</th><th>Category as stored</th></tr>
<tr><td>1</td><td>Multi-player</td></tr>
<tr><td>49</td><td>PvP</td></tr>
<tr><td>36</td><td>Online PvP</td></tr>
<tr><td>22</td><td>Steam Achievements</td></tr>
<tr><td>67</td><td>Camera Comfort</td></tr>
<tr><td>68</td><td>Custom Volume Controls</td></tr>
<tr><td>69</td><td>Stereo Sound</td></tr>
<tr><td>70</td><td>Surround Sound</td></tr>
</table>
<p>Read the gaps rather than the list. There is no Single-player category, no Co-op, no Steam Workshop, no VR category, and no controller category of any kind. Three of the eight are accessibility and audio options, which is unusual to see filed as features rather than buried in a settings menu.</p>

<h2>Controllers: what Steam says, which is nothing</h2>
<p>The store page carries no controller category. Both strings that Valve uses for this, "Full Controller Support" and "Partial Controller Support", appear <strong>zero times</strong> in the page we read, and no entry in the eight categories above is a controller entry (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 30 September 2026).</p>
<p>The page's hidden hardware block, which is not rendered to readers, says something narrower than either support label:</p>
<blockquote>bSteamInputAPISupport: false, bNoKeyboardSupport: false, bGamepadPreferred: false, bControllerSupportWizardComplete: true, bHasXbox: null, bHasPS4: null, bHasPS5: null, bHasOther: false</blockquote>
<p>Decoded: a controller-configuration wizard was completed, the game is not marked as gamepad-preferred, no controller family is claimed, and Steam Input API support is off. A completed wizard is not the same claim as "the game supports a pad", and Steam never prints one here. Whether a pad works in practice is a question Valve's surfaces do not answer; the studio's own statements are the place to look, and <a href='https://wardogshub.gg/blog/wardogs-controller-support/'>wardogshub.gg has an explainer</a> that collects them (page dated 5 August 2026, updated 23 September 2026, read 30 September 2026). This page does not repeat that site's contents.</p>

<h2>No VR, on either surface</h2>
<p>"VR Supported", "VR Only" and "VR Support" each appear zero times in the store page we read, and the API returns no VR category (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 30 September 2026). This page prints that as an absence, not as a promise about the future: nothing in either Valve surface mentions VR work, and nothing in the studio's Steam feed does either.</p>

<h2>Where the spec sheet used to live</h2>
<p>WARDOGS is Bulkhead's second game in this genre, and the first one's site is gone. Its archived pages are the only place the studio's own spec language survives, and two of them are worth putting next to the table above.</p>
<p><strong>The engine was not used as shipped.</strong> The studio's own description of the earlier title's build reads: "reconstructing Unreal Engine 4 to reintroduce classic FPS quirks", and in the same paragraph it calls itself "one of the most experienced UE4 developers in the industry" (battaliongame.com/about, Common Crawl snapshot 26 May 2017; the site is dead, read 30 September 2026). That is a claim about tooling, not marketing copy, and it does not survive anywhere else.</p>
<p><strong>The platforms were not a free choice.</strong> A developer update from the same year records the studio's position on consoles in its own words: Xbox had been talking to them since before the Kickstarter and wanted the game on Xbox One "as soon as possible", while PlayStation "give us their blessing" but showed "considerably less interest currently due to their VR endeavours" (battaliongame.com/news/development-update-sneak-peaks, Common Crawl snapshot 27 May 2017, page dated 11 April 2017; read 30 September 2026). Eight years later the store listing still carries one platform.</p>

<h2>The smallest this game ever was</h2>
<p>Before there was a store page, there was a closed alpha with a published spec sheet of its own. The first weekend tested "6v6 Team Deathmatch on our first (and smallest!) map, Brecourt Manor", with four weapons: M1 Garand, Kar98k, Thompson and MP40. Official servers ran from thirteen cities, named in the same post: Amsterdam, London, Moscow, New York, Washington DC, Dallas, Salt Lake City, San Jose, Sao Paulo, Sydney, Singapore, Hong Kong and Tokyo (battaliongame.com/news/closed-alpha-01-weekend-breakdown, Common Crawl snapshot 23 July 2017, page dated 22 May 2017; read 30 September 2026).</p>
<p>The same studio checked its map design with a backend heat map of every death across every server that weekend, and published the reading: the choke points lit up, and the manor house drew the close-range fights it was built for (battaliongame.com/news/alpha-01-recap-alpha-02-information, Common Crawl snapshot 23 July 2017, page dated 31 May 2017; read 30 September 2026). None of that is in the current game's store listing, and none of the three sites that cover WARDOGS carries it.</p>

<h2>A correction to our own note</h2>
<p>This page was written from a queue note that read: "controller support exists but is not gamepad-preferred". Valve's surfaces support the second half of that sentence and not the first. The reading is <code>bGamepadPreferred: false</code> and <code>bControllerSupportWizardComplete: true</code>, which is where the note came from, but the same block returns null for Xbox, PlayStation 4 and PlayStation 5 pad support, false for other pads, and false for Steam Input API support, and the store page prints no controller category at all (<a href='https://store.steampowered.com/app/1867240/WARDOGS/'>Steam store page</a>, read 30 September 2026). Corrected: <strong>Steam lists no controller support for this game, partial or full; the only controller-shaped fact Valve publishes is that a configuration wizard was completed.</strong> Anything stronger than that is the studio's statement, not Steam's.</p>

<div class="qa">
<h2>Common questions</h2>
${faqHtml}
<p class="src">Sources: the <a href='https://store.steampowered.com/api/appdetails?appids=1867240&cc=us&l=english'>Steam appdetails API</a> and the <a href='https://store.steampowered.com/app/1867240/WARDOGS/'>WARDOGS store page</a>, both read 30 September 2026; archived pages of the studio's previous site, as dated above. Every figure on this page carries the surface it was read from and the day it was read.</p>
</div>

${adUnit}

<div class="readnext">
<p><a href="/wardogs">Scoring, prices and platform support for WARDOGS &rarr;</a></p>
<p><a href="/wardogs-languages">The fourteen languages WARDOGS ships, and which have audio &rarr;</a></p>
<p><a href="/wardogs-price">What WARDOGS costs in eight regions &rarr;</a></p>
</div>`,
};
