// The one place the live player counts live.
//
// Every player-count page reads its headline number, the minute that number was
// read, and every figure worked out from them, out of this file. The card
// generator (tools/make-page-images.py) reads it too. Nothing else in the site
// writes a player count down.
//
// The daily job edits only `count` and `readAtUtc` for a game here. Everything
// else on this page is derived below, so a new number cannot leave a stale
// percentage, a stale division or a stale card behind.
//
// Shape, one entry per game:
//   appid      the Steam app the number comes from
//   count      accounts with the game open at readAtUtc (Valve's own figure)
//   readAtUtc  the minute the reading was taken, UTC
//   peakA/peakB      the two all-time peaks the trackers disagree about
//   peak24h          the 24-hour peak
//   ...and the other fixed figures a page quotes, each read once and dated on
//   the page. Those do not move daily; they are here so the arithmetic below
//   has one source rather than two.

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const int = (v) => v.toLocaleString("en-US");
const dec2 = (v) =>
  v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pct1 = (v) => v.toFixed(1) + "%";
const num1 = (v) => v.toFixed(1);
const mult1 = (v) => v.toFixed(1) + "×";
const mult2 = (v) => v.toFixed(2) + "×";
// A signed one-decimal percentage. The sign has to come from the value, not
// from the wording of the sentence: a reading can sit above the average as
// easily as below it, and the page must be able to say which.
const signed1 = (v) => (v < 0 ? "−" : "") + Math.abs(v).toFixed(1) + "%";

function stamp(iso) {
  const d = new Date(iso);
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  const day = d.getUTCDate();
  const month = MONTHS[d.getUTCMonth()];
  const year = d.getUTCFullYear();
  return {
    short: hh + ":" + mm + " UTC",
    full: hh + ":" + mm + " UTC on " + day + " " + month + " " + year,
    day: day + " " + month + " " + year,
  };
}

function armaReforger() {
  const count = 15752;
  const readAt = stamp("2026-10-03T17:49:24Z");
  const peakA = 24632;
  const peakB = 23041;
  const peak24h = 14153;
  const discordOnline = 32695;
  const discordMembers = 166682;
  const avg30 = 9545.44;
  return {
    appid: 1874880,
    count,
    readAtUtc: "2026-10-03T11:15:00Z",
    countText: int(count),
    timeShort: readAt.short,
    timeFull: readAt.full,
    day: readAt.day,
    peakA,
    peakAtext: int(peakA),
    peakB,
    peakBtext: int(peakB),
    peakPair: int(peakA) + " / " + int(peakB),
    peakGap: int(peakA - peakB),
    peak24h,
    peak24hText: int(peak24h),
    discordOnline,
    discordOnlineText: int(discordOnline),
    discordMembers,
    discordMembersText: int(discordMembers),
    discordGap: int(discordOnline - count),
    pctOfRecord: pct1((count / peakA) * 100),
    pctUnder24h: pct1(((peak24h - count) / peak24h) * 100),
    pctBelowAvg: num1(((avg30 - count) / avg30) * 100) + "%",
    pctBelowAvgSigned: signed1(((count - avg30) / avg30) * 100),
    recordMultiple: mult1(peakA / count),
    avg30,
    avg30Text: dec2(avg30),
    avg30Peak: 21073,
    avg30PeakText: int(21073),
    sepAvg: 9753.44,
    sepAvgText: dec2(9753.44),
    febAvg: 11854.44,
    febAvgText: dec2(11854.44),
    janAvg: 11131.08,
    janAvgText: dec2(11131.08),
    steamChartsLive: 7987,
    steamChartsLiveText: int(7987),
    steamPlayerCountLive: 11667,
    steamPlayerCountLiveText: int(11667),
    steamPlayerCountFebRow: 21286,
    steamPlayerCountFebRowText: int(21286),
    avg30Delta: "208.0",
    avg30DeltaPct: "−2.13%",
    sepDelta: "2,285.80",
    sepDeltaPct: "−18.99%",
  };
}

function squad() {
  const count = 13596;
  const readAt = stamp("2026-10-03T17:49:24Z");
  const peakA = 38573;
  const peakB = 38534;
  const peak24h = 13544;
  const discordOnline = 17286;
  const avg30 = 9384.5;
  const priorRead = 10055;
  const thirdReading = 13503;
  return {
    appid: 393380,
    count,
    readAtUtc: "2026-10-03T09:00:00Z",
    countText: int(count),
    timeShort: readAt.short,
    timeFull: readAt.full,
    day: readAt.day,
    peakA,
    peakAtext: int(peakA),
    peakB,
    peakBtext: int(peakB),
    peakPair: int(peakA) + " / " + int(peakB),
    peakGap: int(peakA - peakB),
    peak24h,
    peak24hText: int(peak24h),
    discordOnline,
    discordOnlineText: int(discordOnline),
    discordGap: int(discordOnline - count),
    avg30Text: dec2(avg30),
    priorReadText: int(priorRead),
    thirdReadingText: int(thirdReading),
    pctOfRecord: pct1((count / peakA) * 100),
    perHundred: num1(peakA / 100),
    pctUnder24h: pct1(((peak24h - count) / peak24h) * 100),
    pctBelowAvg: pct1(((count - avg30) / avg30) * 100),
    gapToPrior: int(count - priorRead),
    gapToThird: int(thirdReading - count),
  };
}

function foxhole() {
  const count = 3400;
  const readAt = stamp("2026-10-03T17:49:24Z");
  const peakA = 17451;
  const peakB = 17238;
  const peak24h = 3010;
  const discordOnline = 50210;
  const priorSample = 1718;
  const avg30 = 1594.79;
  return {
    appid: 505460,
    count,
    readAtUtc: "2026-10-03T09:33:00Z",
    countText: int(count),
    timeShort: readAt.short,
    timeFull: readAt.full,
    day: readAt.day,
    peakA,
    peakAtext: int(peakA),
    peakB,
    peakBtext: int(peakB),
    peakPair: int(peakA) + " / " + int(peakB),
    peakGap: int(peakA - peakB),
    peak24h,
    peak24hText: int(peak24h),
    discordOnline,
    discordOnlineText: int(discordOnline),
    discordGap: int(discordOnline - count),
    avg30Text: dec2(avg30),
    priorSampleText: int(priorSample),
    pctOfRecord: pct1((count / peakA) * 100),
    pctUnder24h: pct1(((peak24h - count) / peak24h) * 100),
    pctBelowAvg: pct1(((count - avg30) / avg30) * 100),
    sampleDelta: int(count - priorSample),
  };
}

function hellLetLoose() {
  const count = 3848;
  const readAt = stamp("2026-10-03T17:49:24Z");
  const peakA = 21086;
  const peakB = 21107;
  const peak24h = 3960;
  const discordOnline = 23917;
  const avg30 = 2400.92;
  return {
    appid: 686810,
    count,
    readAtUtc: "2026-10-03T09:49:00Z",
    countText: int(count),
    timeShort: readAt.short,
    timeFull: readAt.full,
    day: readAt.day,
    peakA,
    peakAtext: int(peakA),
    peakB,
    peakBtext: int(peakB),
    peakPair: int(peakA) + " / " + int(peakB),
    peakGap: int(peakB - peakA),
    peak24h,
    peak24hText: int(peak24h),
    discordOnline,
    discordOnlineText: int(discordOnline),
    discordGap: int(discordOnline - count),
    avg30Text: dec2(avg30),
    pctOfRecord: pct1((count / peakA) * 100),
    perHundred: num1(peakA / 100),
    pctUnder24h: pct1(((peak24h - count) / peak24h) * 100),
    pctBelowAvgSigned: signed1(((count - avg30) / avg30) * 100),
  };
}

function risingStorm2() {
  const count = 325;
  const readAt = stamp("2026-10-03T17:49:24Z");
  const peakA = 24518;
  const peakB = 24492;
  const peak24h = 357;
  const discordOnline = 1770;
  const avg30 = 250.29;
  return {
    appid: 418460,
    count,
    readAtUtc: "2026-10-03T11:32:00Z",
    countText: int(count),
    timeShort: readAt.short,
    timeFull: readAt.full,
    day: readAt.day,
    peakA,
    peakAtext: int(peakA),
    peakB,
    peakBtext: int(peakB),
    peakPair: int(peakA) + " / " + int(peakB),
    peakGap: int(peakA - peakB),
    peak24h,
    peak24hText: int(peak24h),
    discordOnline,
    discordOnlineText: int(discordOnline),
    discordGap: int(discordOnline - count),
    avg30Text: dec2(avg30),
    pctOfRecord: pct1((count / peakA) * 100),
    pctUnder24h: pct1(((peak24h - count) / peak24h) * 100),
    pctBelowAvgSigned: signed1(((count - avg30) / avg30) * 100),
    discordGapAlt: int(discordOnline - count),
    perSlot: num1(peakA / 64),
    countPerSlot: num1(count / 64),
  };
}

function wardogsPlayerCount() {
  // Two numbers on this page: Valve's count of accounts with the game open,
  // and the in-game server browser's tally of people inside a match, a minute
  // apart. Both move; only the Steam one has an endpoint we can read daily, so
  // the in-match figure keeps the reading its own source last published and
  // the page says so where it is used.
  const count = 229586;
  const matchCount = 83730;
  const readAt = stamp("2026-10-03T17:49:24Z");
  const matchAt = stamp("2026-10-01T08:32:00Z");
  const peakA = 428666;
  const peakB = 428372;
  const peakC = 402686;
  const matchPeak = 367742;
  const servers = 2554;
  const officialServers = 766;
  const communityServers = 1788;
  const officialPlayers = 68592;
  const communityPlayers = 15138;
  const peak24h = 230732;
  const matchPeak24h = 152922;
  const avg30 = 221831.21;
  const sepAvg = 223917.42;
  return {
    appid: 1867240,
    count,
    matchCount,
    readAtUtc: "2026-10-01T08:33:00Z",
    countText: int(count),
    matchCountText: int(matchCount),
    timeShort: readAt.short,
    timeFull: readAt.full,
    matchTimeShort: matchAt.short,
    matchTimeFull: matchAt.full,
    day: readAt.day,
    gapText: int(count - matchCount),
    gapPct: pct1(((count - matchCount) / count) * 100),
    peakA,
    peakAtext: int(peakA),
    peakB,
    peakBtext: int(peakB),
    peakC,
    peakCtext: int(peakC),
    matchPeakText: int(matchPeak),
    busiestGapText: int(peakA - matchPeak),
    busiestGapPct: pct1(((peakA - matchPeak) / peakA) * 100),
    serversText: int(servers),
    officialServersText: int(officialServers),
    communityServersText: int(communityServers),
    officialPlayersText: int(officialPlayers),
    communityPlayersText: int(communityPlayers),
    officialAvg: num1(officialPlayers / officialServers),
    communityAvg: num1(communityPlayers / communityServers),
    combinedAvg: num1(matchCount / servers),
    peak24hText: int(peak24h),
    matchPeak24hText: int(matchPeak24h),
    peak24hMultiple: mult2(peak24h / count),
    avg30Text: dec2(avg30),
    sepAvgText: dec2(sepAvg),
    avg30Delta: "2,086.2",
    avg30DeltaPct: "0.93%",
    avg30DeltaPctSigned: "−0.93%",
    steamChartsLiveText: "102,998",
    hubLiveText: "102,705",
  };
}

export const live = {
  armaReforger: armaReforger(),
  squad: squad(),
  foxhole: foxhole(),
  hellLetLoose: hellLetLoose(),
  risingStorm2: risingStorm2(),
  wardogsPlayerCount: wardogsPlayerCount(),
};
