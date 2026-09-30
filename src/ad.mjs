// The site's advertising units.
//
// Every unit below is a real affiliate link supplied by the advertiser through
// CJ Affiliate, and every href is CJ's click URL attributed to this account
// (publisher 8083808, `?PID=8083808` on the landing page). Nothing is ever
// published here before a live link is in hand.
//
// Rules for changing this: swap the href when the programme changes, keep the
// "Advertisement" label above the creative, and keep rel="sponsored nofollow"
// on the link so the affiliate relationship stays machine-readable. A new unit
// is a copy of this shape with its own href and its own disclosure line — the
// markup around the link does not change from unit to unit.
//
// 1. Surfshark — advertiser 6282055, link 15438547. Unchanged since it went
//    live: same href, same label, same disclosure.
const surfsharkUnit = `<aside class="ad" aria-label="Advertisement">
<p class="ad-label">Advertisement</p>
<p class="ad-body"><a href="https://www.anrdoezrs.net/click-8083808-15438547" rel="sponsored nofollow noopener" target="_blank">All features for &euro;2.29/mo. Get Surfshark</a></p>
<p class="ad-note">Affiliate link: Surfshark, served through CJ Affiliate. Shooter Atlas is paid if you take out a subscription.</p>
</aside>`;

// 2. GearUP — advertiser 7804601, link 17235975. Approved in the CJ account on
//    29 September 2026; the click URL below was verified end to end on
//    30 September 2026 (302 through CJ, landing on the GearUP game-booster
//    page). Same markup shape as the Surfshark unit.
const gearUpUnit = `<aside class="ad" aria-label="Advertisement">
<p class="ad-label">Advertisement</p>
<p class="ad-body"><a href="https://www.anrdoezrs.net/click-8083808-17235975" rel="sponsored nofollow noopener" target="_blank">GearUP &mdash; the game booster: lower ping, packet loss &amp; lag</a></p>
<p class="ad-note">Affiliate link: GearUP, served through CJ Affiliate. Shooter Atlas is paid if you take out a subscription.</p>
</aside>`;

export const adUnit = surfsharkUnit + "\n" + gearUpUnit;
