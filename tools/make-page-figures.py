"""Draw the in-page figure set: one to two figures for every published page.

Same palette, grid, mark and type as the page cards, so a figure dropped into
an article looks like the rest of the site. Every figure carries its own source
line and read date inside the image, so it stays honest when it is copied out
of the page.

    python tools/make-page-figures.py

Writes assets/img/<name>.png (dark, the default) and <name>-light.png, the pair
the page's <picture> element chooses between.
"""

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1200, 630

THEMES = {
    "dark": {
        "base": (10, 14, 19), "surface": (18, 26, 35), "rule": (38, 49, 61),
        "ink": (233, 238, 244), "muted": (124, 138, 155),
        "accent": (240, 169, 44), "on_accent": (16, 22, 29), "glow": 46,
    },
    "light": {
        "base": (255, 255, 255), "surface": (244, 247, 250), "rule": (221, 229, 238),
        "ink": (14, 22, 32), "muted": (103, 115, 127),
        "accent": (163, 95, 0), "on_accent": (255, 255, 255), "glow": 22,
    },
}

GRID_STEP = 30
OUT = Path(__file__).resolve().parent.parent / "assets" / "img"


def pick(paths):
    for p in paths:
        if Path(p).exists():
            return p
    raise SystemExit("no usable font found")


BOLD = pick([r"C:\Windows\Fonts\segoeuib.ttf", r"C:\Windows\Fonts\arialbd.ttf"])
REG = pick([r"C:\Windows\Fonts\segoeui.ttf", r"C:\Windows\Fonts\arial.ttf"])
MONO = pick([r"C:\Windows\Fonts\consolab.ttf", r"C:\Windows\Fonts\consola.ttf", r"C:\Windows\Fonts\cour.ttf"])


def f(size, bold=True):
    return ImageFont.truetype(BOLD if bold else REG, size)


def mono(size):
    return ImageFont.truetype(MONO, size)


def blend(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def wrap(draw, text, font, max_w):
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if draw.textlength(trial, font=font) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def tracked(draw, x, y, text, font, fill, tracking):
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking
    return x - tracking


def background(t):
    img = Image.new("RGB", (W, H), t["base"])
    d = ImageDraw.Draw(img)
    grid = blend(t["base"], t["ink"], 0.045)
    for x in range(0, W + GRID_STEP, GRID_STEP):
        d.line([(x, 0), (x, H)], fill=grid, width=1)
    for y in range(0, H + GRID_STEP, GRID_STEP):
        d.line([(0, y), (W, y)], fill=grid, width=1)
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([W - 620, -320, W + 260, 200], fill=t["accent"] + (t["glow"],))
    glow = glow.filter(ImageFilter.GaussianBlur(130))
    return Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")


def mark(d, x, y, size, t):
    d.rounded_rectangle([x, y, x + size, y + size], radius=14, fill=t["accent"])
    cx, cy = x + size / 2, y + size / 2
    r = size * 0.21
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=t["on_accent"], width=4)
    for seg in ((cx, y + 7, cx, cy - r - 3), (cx, cy + r + 3, cx, y + size - 7),
                (x + 7, cy, cx - r - 3, cy), (cx + r + 3, cy, x + size - 7, cy)):
        d.line(list(seg), fill=t["on_accent"], width=4)


def chip(d, x, y, value, label, t, vfont=34):
    pad_x, gap = 22, 14
    fv, fl = mono(vfont), f(15, bold=False)
    cw = max(d.textlength(value, font=fv), d.textlength(label, font=fl)) + pad_x * 2
    d.rounded_rectangle([x, y, x + cw, y + 92], radius=12,
                        fill=t["surface"], outline=t["rule"], width=2)
    d.text((x + pad_x, y + 17), value, font=fv, fill=t["accent"])
    d.text((x + pad_x, y + 60), label, font=fl, fill=t["muted"])
    return x + cw + gap


def bars(d, x, y, w, rows, t, avail, label_w=300, value_w=150):
    """Horizontal bars. rows = [(label, value_text, share 0..1)].

    Row height is derived from the space actually left on the canvas, so a
    ten-row chart and a two-row chart both fit without cropping.
    """
    max_w = w - label_w - value_w - 24
    n = len(rows)
    row_h = avail / n
    bar_h = int(max(10, min(26, row_h * 0.58)))
    label_font = f(16 if n <= 8 else 14, bold=False)
    value_font = mono(17 if n <= 8 else 15)
    for i, (label, value, share) in enumerate(rows):
        top = int(y + i * row_h + (row_h - bar_h) / 2)
        d.text((x, top + bar_h / 2 - 10), label, font=label_font, fill=t["ink"])
        bx = x + label_w
        d.rounded_rectangle([bx, top, bx + max_w, top + bar_h], radius=6, fill=t["surface"])
        filled = max(6, int(max_w * max(0.0, min(1.0, share))))
        d.rounded_rectangle([bx, top, bx + filled, top + bar_h], radius=6, fill=t["accent"])
        d.text((bx + max_w + 16, top + bar_h / 2 - 10), value, font=value_font, fill=t["accent"])


def timeline(d, x, y, w, events, t, avail):
    """Vertical timeline. events = [(date, text)]."""
    n = len(events)
    row_h = avail / n
    date_font = mono(19 if n <= 4 else 17)
    body_font = f(17 if n <= 4 else 15, bold=False)
    first, last = int(y + 14), int(y + row_h * (n - 1) + 14)
    d.line([(x + 9, first), (x + 9, last)], fill=t["rule"], width=3)
    for i, (date, text) in enumerate(events):
        cy = int(y + i * row_h + 14)
        d.ellipse([x + 2, cy - 7, x + 16, cy + 7], fill=t["accent"])
        d.text((x + 34, cy - 24), date, font=date_font, fill=t["accent"])
        lines = wrap(d, text, body_font, w - 60)
        for j, line in enumerate(lines[:2]):
            d.text((x + 34, cy + j * 21), line, font=body_font, fill=t["ink"])


def grid_matrix(d, x, y, cols, rows, t):
    """rows = [(label, [yes/no, ...])] with a header row of column names."""
    col_w, row_h = 150, 34
    for c, name in enumerate(cols):
        cx = x + 320 + c * col_w
        d.text((cx, y), name, font=f(15, bold=False), fill=t["muted"])
    for i, (label, marks) in enumerate(rows):
        top = y + 34 + i * row_h
        d.text((x, top + 4), label, font=f(16, bold=False), fill=t["ink"])
        for c, ok in enumerate(marks):
            cx = x + 320 + c * col_w
            if ok:
                d.text((cx, top - 2), "✓", font=f(22), fill=t["accent"])


SOURCES = {
    "steamdb": "Source: SteamDB (third-party), read 28 September 2026",
    "official": "Source: official Steam announcements, read 30 September 2026",
    "store": "Source: Steam store page, read 28 September 2026",
    "store30": "Source: Steam store page, read 30 September 2026",
    "achievements": "Source: Steam global achievement rates, read 28 September 2026",
    "ea": "Source: Steam Early Access Q&A, read 30 September 2026",
    "reddit": "Source: r/WarDogs and r/ShouldIbuythisgame, read 28 September 2026",
    "price": "Source: Steam store, eight regions; premium is our arithmetic, read 29 September 2026",
    "queue": "Source: PCGamesN, 12 September 2026, read 30 September 2026",
    "archive17": "Source: archived studio pages, May 2017, read 30 September 2026",
    "archive18": "Source: archived studio roadmap, 20 January 2018, read 30 September 2026",
    "reviewapi": "Source: Steam review API, read 30 September 2026",
}


def build(name, eyebrow, headline, kind, payload, source, theme):
    t = THEMES[theme]
    img = background(t)
    d = ImageDraw.Draw(img)

    mark(d, 64, 52, 46, t)
    d.text((126, 56), "Shooter Atlas", font=f(26), fill=t["ink"])
    d.text((126, 88), "Numbers for large-scale tactical shooters", font=f(15, bold=False), fill=t["muted"])

    tracked(d, 66, 148, eyebrow.upper(), f(16), t["accent"], 2.6)
    lines = wrap(d, headline, f(34), W - 140)[:2]
    for i, line in enumerate(lines):
        d.text((64, 186 + i * 44), line, font=f(34), fill=t["ink"])

    y = 186 + len(lines) * 44 + 34
    avail = (H - 74) - y          # keep the footer band clear
    if kind == "bars":
        bars(d, 64, y, W - 128, payload, t, avail)
    elif kind == "barslog":
        # A 300x range swallows everything but the leader on a linear axis, so
        # bar length is logarithmic and the printed value stays exact.
        vals = [int("".join(ch for ch in value if ch.isdigit()) or 0) for _, value, _ in payload]
        top = max(vals) or 1
        rows = [(label, value, math.log10(v) / math.log10(top) if v > 0 else 0.0)
                for (label, value, _), v in zip(payload, vals)]
        bars(d, 64, y, W - 128, rows, t, avail)
        d.text((64, H - 46 - 24), "Bar length is logarithmic; the printed count is exact.", font=mono(14), fill=t["muted"])
    elif kind == "timeline":
        timeline(d, 64, y, W - 128, payload, t, avail)
    elif kind == "numbers":
        x = 64
        for value, label in payload:
            x = chip(d, x, y, value, label, t)
    elif kind == "matrix":
        grid_matrix(d, 64, y, payload[0], payload[1], t)

    d.text((64, H - 46), SOURCES[source], font=mono(15), fill=t["muted"])
    right = "shooteratlas.com"
    d.text((W - 64 - d.textlength(right, font=mono(15)), H - 46), right, font=mono(15), fill=t["muted"])

    out = OUT / (f"{name}.png" if theme == "dark" else f"{name}-light.png")
    img.save(out)
    return out.name


FIGURES = [
    # /wardogs
    ("wardogs-fig-players", "Wardogs · player base", "Three concurrency readings, all third-party", "bars",
     [("Closed beta peak, 5 Sep 2026", "244,926", 244926 / 428666),
      ("All-time peak, 13 Sep 2026", "428,666", 1.0),
      ("Final week of September", "~132,000", 132000 / 428666)], "steamdb"),
    ("wardogs-fig-copies", "Wardogs · sales", "Three million copies inside three weeks", "timeline",
     [("11 Sep 2026", "1.25 million copies, in the studio's own post"),
      ("15 Sep 2026", "2 million copies"),
      ("26 Sep 2026", "3 million copies — \"just over 2 weeks since launching into Early Access\"")], "official"),

    # /wardogs-achievements
    ("wardogs-achievements-fig-rarity", "Wardogs · achievements", "Global unlock rate, all ten", "bars",
     [("This is WARDOGS", "78.3%", 0.783), ("Ricochet", "23.1%", 0.231), ("Fat Stacks", "19.3%", 0.193),
      ("That was rude", "13.3%", 0.133), ("Long Shot", "10.1%", 0.101), ("Top Dog", "8.5%", 0.085),
      ("Do Not Resuscitate", "6.2%", 0.062), ("CZ Survivor", "6.0%", 0.060), ("Clean Sweep", "4.5%", 0.045),
      ("Big Spender", "0.1%", 0.001)], "achievements"),

    # /wardogs-reviews
    ("wardogs-reviews-fig-totals", "Wardogs · reviews", "Two totals that are both correct", "bars",
     [("English reviews", "51,079", 1.0), ("All languages", "76,407", 76407 / 51079)], "store"),
    ("wardogs-reviews-fig-share", "Wardogs · reviews", "English is two thirds of every review", "numbers",
     [("66.9%", "English share of 76,407"), ("81%", "positive, English view"), ("Very Positive", "English summary")], "store"),

    # /wardogs-early-access
    ("wardogs-early-access-fig-window", "Wardogs · Early Access", "The window the studio states", "numbers",
     [("1-2 yrs", "planned in Early Access"), ("10 Sep 2026", "Early Access start"), ("Rises", "price at 1.0"), ("No date", "for 1.0 itself")], "ea"),

    # /wardogs-reddit
    ("wardogs-reddit-fig-threads", "Wardogs · community", "Ten threads, one repeated question", "numbers",
     [("10", "threads in month one"), ("5", "are buy-or-wait"), ("4", "recurring asks"), ("1", "verdict: has potential")], "reddit"),

    # /wardogs-price
    ("wardogs-price-fig-premium", "Wardogs · price", "Supporter Edition premium, eight regions", "bars",
     [("Canada", "26.0%", 0.26), ("United States", "25.0%", 0.25), ("Germany", "25.0%", 0.25),
      ("Japan", "24.5%", 0.245), ("United Kingdom", "24.3%", 0.243), ("Australia", "23.7%", 0.237),
      ("Korea", "22.7%", 0.227), ("Brazil", "22.5%", 0.225)], "price"),

    # /wardogs-release-date
    ("wardogs-release-date-fig-week", "Wardogs · release date", "Launch week, as the studio dated it", "timeline",
     [("14 Aug 2026", "\"1 MILLION WISHLISTS ON STEAM\""),
      ("1 Sep 2026", "Closed Beta 02 announced, invitees added in waves"),
      ("5 Sep 2026", "The closed beta becomes an open one"),
      ("9 Sep 2026", "Pre-load live with the Season 1 changelog"),
      ("10 Sep 2026", "Early Access opens at 16:00 UTC")], "official"),
    ("wardogs-release-date-fig-queue", "Wardogs · launch day", "The first hours, in the studio's own numbers", "numbers",
     [("45,590", "players in a match"), ("168,000", "waiting behind them"), ("~300,000", "queue at its worst"), ("10,000", "admitted per hand")], "queue"),

    # /wardogs-battalion-1944
    ("wardogs-battalion-1944-fig-cuts", "Battalion 1944 · alpha v0.2", "Two cuts that changed every duel", "bars",
     [("Movement speed, every stance", "−30%", 0.30), ("Strafe-jump distance", "−25%", 0.25)], "archive17"),

    # /wardogs-battalion-1944-launch
    ("wardogs-battalion-1944-launch-fig-calendar", "Battalion 1944 · closed alpha", "The calendar behind the test", "timeline",
     [("28 Apr 2017", "Kickstarter backer surveys sent out"),
      ("24 May 2017", "Closed Alpha Steam codes sent; they activate on the 26th"),
      ("26 May 2017", "First closed alpha weekend, the official release date")], "archive17"),
    ("wardogs-battalion-1944-launch-fig-roadmap", "Battalion 1944 · 2018 plan", "Four quarters, promised in writing", "timeline",
     [("Q1 2018", "Early Access release, stability first, offline LAN, \"ALL future DLC will be free\""),
      ("Q2 2018", "First official LAN tournament, arcade map, two undisclosed weapons"),
      ("Q3 2018", "Spectator overhaul for esports, 'Clanwars' on high tick servers"),
      ("Q4 2018", "Full Steam release — \"the price of the game will increase\"")], "archive18"),

    # /wardogs-languages
    ("wardogs-languages-fig-reviews", "Wardogs · languages", "Reviews by the language they were written in", "barslog",
     [("English", "62,512", 1.0), ("Simplified Chinese", "8,020", 8020 / 62512), ("Russian", "5,722", 5722 / 62512),
      ("German", "5,483", 5483 / 62512), ("French", "2,374", 2374 / 62512), ("Spanish - Spain", "1,526", 1526 / 62512),
      ("Polish", "1,267", 1267 / 62512), ("Turkish", "1,212", 1212 / 62512), ("Korean", "925", 925 / 62512),
      ("Traditional Chinese", "791", 791 / 62512), ("Japanese", "667", 667 / 62512),
      ("Ukrainian", "643", 643 / 62512), ("Italian", "424", 424 / 62512),
      ("Portuguese - Brazil", "207", 207 / 62512)], "reviewapi"),
    ("wardogs-languages-fig-ticks", "Wardogs · languages", "What Valve's own table ticks", "numbers",
     [("14", "Interface"), ("1", "Full audio, English"), ("0", "Subtitles")], "store30"),
]


for row in FIGURES:
    for theme in ("dark", "light"):
        print("wrote", build(*row, theme))
