"""Draw the Shooter Atlas page images.

Every image is drawn from primitives here — no stock art, no downloaded
assets, nothing traced from another site. Run it to regenerate the files in
assets/img/:

    python tools/make-page-images.py

One image per page per theme, 1200x630 (the standard social-card size).

* `<name>.png` — the dark card. This is the og:image, because a card scraped by
  a social platform has no theme to follow.
* `<name>-light.png` — the same card on white.

The page ships both and lets the reader's theme choose, so a card never sits
drawn one way on a page rendered the other. The tokens below are the two sets
from src/layout.mjs; if they change there, change them here too, because this
is the only place they are written down a second time.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1200, 630

# src/layout.mjs, the same two token sets the stylesheet defines.
THEMES = {
    "dark": {
        "base": (10, 14, 19),      # --bg      #0a0e13
        "surface": (18, 26, 35),   # --surface #121a23
        "rule": (38, 49, 61),      # --rule    #26313d
        "ink": (233, 238, 244),    # --ink     #e9eef4
        "muted": (124, 138, 155),  # --muted   #7c8a9b
        "accent": (240, 169, 44),  # --accent  #f0a92c
        "on_accent": (16, 22, 29),
        "glow": 46,
    },
    "light": {
        "base": (255, 255, 255),
        "surface": (244, 247, 250),  # --surface-2 #f4f7fa
        "rule": (221, 229, 238),     # --rule      #dde5ee
        "ink": (14, 22, 32),         # --ink       #0e1620
        "muted": (103, 115, 127),    # --muted     #67737f
        "accent": (163, 95, 0),      # --accent    #a35f00
        "on_accent": (255, 255, 255),
        "glow": 22,
    },
}

GRID_STEP = 30

OUT = Path(__file__).resolve().parent.parent / "assets" / "img"

BOLD_CANDIDATES = [
    r"C:\Windows\Fonts\segoeuib.ttf",
    r"C:\Windows\Fonts\arialbd.ttf",
    r"C:\Windows\Fonts\calibrib.ttf",
]
REG_CANDIDATES = [
    r"C:\Windows\Fonts\segoeui.ttf",
    r"C:\Windows\Fonts\arial.ttf",
    r"C:\Windows\Fonts\calibri.ttf",
]
# Figures are set in a monospace on the site, so the cards use one too.
MONO_CANDIDATES = [
    r"C:\Windows\Fonts\consolab.ttf",
    r"C:\Windows\Fonts\consola.ttf",
    r"C:\Windows\Fonts\cour.ttf",
]


def pick(paths):
    for p in paths:
        if Path(p).exists():
            return p
    raise SystemExit("no usable font found")


BOLD = pick(BOLD_CANDIDATES)
REG = pick(REG_CANDIDATES)
MONO = pick(MONO_CANDIDATES)


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
    """Draw text with letter-spacing; PIL has no tracking of its own."""
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking
    return x - tracking


def background(t):
    """Base colour, the blueprint grid, and the accent glow in the top corner."""
    img = Image.new("RGB", (W, H), t["base"])
    d = ImageDraw.Draw(img)
    grid = blend(t["base"], t["ink"], 0.045)
    for x in range(0, W + GRID_STEP, GRID_STEP):
        d.line([(x, 0), (x, H)], fill=grid, width=1)
    for y in range(0, H + GRID_STEP, GRID_STEP):
        d.line([(0, y), (W, y)], fill=grid, width=1)

    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([W - 620, -300, W + 260, 240], fill=t["accent"] + (t["glow"],))
    glow = glow.filter(ImageFilter.GaussianBlur(130))
    return Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")


def mark(d, x, y, size, t):
    d.rounded_rectangle([x, y, x + size, y + size], radius=16, fill=t["accent"])
    cx, cy = x + size / 2, y + size / 2
    r = size * 0.21
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=t["on_accent"], width=4)
    for seg in ((cx, y + 8, cx, cy - r - 3), (cx, cy + r + 3, cx, y + size - 8),
                (x + 8, cy, cx - r - 3, cy), (cx + r + 3, cy, x + size - 8, cy)):
        d.line(list(seg), fill=t["on_accent"], width=4)


def chip(d, x, y, value, label, t):
    pad_x, gap = 24, 14
    fv, fl = mono(34), f(15, bold=False)
    wv = d.textlength(value, font=fv)
    wl = d.textlength(label, font=fl)
    cw = max(wv, wl) + pad_x * 2
    ch = 92
    d.rounded_rectangle([x, y, x + cw, y + ch], radius=12,
                        fill=t["surface"], outline=t["rule"], width=2)
    d.text((x + pad_x, y + 17), value, font=fv, fill=t["accent"])
    d.text((x + pad_x, y + 60), label, font=fl, fill=t["muted"])
    return x + cw + gap


def build(name, eyebrow, headline, stats, path, date, theme):
    t = THEMES[theme]
    img = background(t)
    d = ImageDraw.Draw(img)

    # wordmark: the crosshair mark plus the site name and its tagline
    mx, my, ms = 72, 52, 34
    mark(d, mx, my, ms, t)
    d.text((mx + ms + 12, my - 4), "Shooter Atlas", font=f(21, bold=True), fill=t["ink"])
    d.text((mx + ms + 12, my + 20), "Numbers for large-scale tactical shooters",
           font=f(15, bold=False), fill=t["muted"])

    # eyebrow, with the same rule the pages put in front of it
    y = 178
    d.line([(72, y + 11), (98, y + 11)], fill=t["accent"], width=2)
    tracked(d, 112, y, eyebrow.upper(), f(15, bold=True), t["accent"], 2.4)

    # headline
    y += 40
    hl = f(58, bold=True)
    for line in wrap(d, headline, hl, W - 144)[:3]:
        d.text((72, y), line, font=hl, fill=t["ink"])
        y += 68

    # figures along the bottom, then the rule and the footer line
    x = 72
    for value, label in stats:
        x = chip(d, x, H - 214, value, label, t)

    d.line([(72, H - 92), (W - 72, H - 92)], fill=t["rule"], width=1)
    d.text((72, H - 66), "shooteratlas.com" + path, font=mono(19), fill=t["muted"])
    d.text((W - 72 - d.textlength(date, font=f(19, bold=False)), H - 66),
           date, font=f(19, bold=False), fill=t["muted"])

    OUT.mkdir(parents=True, exist_ok=True)
    suffix = "" if theme == "dark" else "-" + theme
    img.save(OUT / f"{name}{suffix}.png", optimize=True)
    return f"{name}{suffix}.png"


# One row per page. The figures here are the same ones the page leads with, so
# a shared link and the page it opens agree.
PAGES = [
    ("home", "Shooter Atlas",
     "Numbers for 100-player tactical shooters",
     [("1", "game per page"), ("100", "players per match"), ("3", "teams")], "/",
     "28 September 2026"),
    ("wardogs", "WARDOGS",
     "Scoring, prices and platform support",
     [("$10,000", "starting balance"), ("100", "players per match"), ("3", "factions")], "/wardogs",
     "28 September 2026"),
    ("wardogs-achievements", "WARDOGS · Achievements",
     "Ten achievements, from universal to almost unheld",
     [("78.3%", "finish the tutorial"), ("0.1%", "Big Spender"), ("45×", "drop to the last one")],
     "/wardogs-achievements", "28 September 2026"),
    ("wardogs-reviews", "WARDOGS · Steam reviews",
     "What the English store view shows",
     [("51,079", "English reviews"), ("81%", "of them positive"), ("Very Positive", "Steam's summary")],
     "/wardogs-reviews", "28 September 2026"),
    ("wardogs-early-access", "WARDOGS · Early Access",
     "What the developers say, quoted in full",
     [("1-2 yrs", "planned in Early Access"), ("10 Sep 2026", "Early Access start"), ("Rises", "price at 1.0")],
     "/wardogs-early-access", "28 September 2026"),
    ("wardogs-reddit", "WARDOGS · Community",
     "What players are actually asking for",
     [("10", "threads in month one"), ("5", "are buy-or-wait"), ("4", "recurring asks")], "/wardogs-reddit",
     "28 September 2026"),
    ("wardogs-price", "WARDOGS · Price",
     "Eight Steam regions, one table",
     [("$39.99", "United States"), ("¥4,980", "Japan"), ("0%", "discount, that day")], "/wardogs-price",
     "29 September 2026"),
    ("wardogs-release-date", "WARDOGS · Release date",
     "10 September 2026, 16:00 UTC",
     [("10 Sep", "2026, Early Access"), ("3M", "copies by 26 Sept"), ("2 yrs", "EA window, at most")],
     "/wardogs-release-date", "30 September 2026"),
    ("wardogs-battalion-1944", "WARDOGS · The studio's first shooter",
     "Bulkhead's 2017 design notes, item by item",
     [("-30%", "movement, alpha v0.2"), ("-25%", "strafe jump"), ("2017", "when it was written")],
     "/wardogs-battalion-1944", "29 September 2026"),
    ("wardogs-battalion-1944-launch", "WARDOGS · The studio's first launch",
     "Closed alpha rules, dates and the 2018 plan",
     [("26 May 2017", "first closed alpha"), ("No streams", "under the agreement"), ("Free DLC", "promised in 2018")],
     "/wardogs-battalion-1944-launch", "30 September 2026"),
    ("wardogs-languages", "WARDOGS · Languages",
     "Fourteen languages, one with full audio",
     [("14", "languages listed"), ("1", "with full audio"), ("0", "subtitles ticks")],
     "/wardogs-languages", "30 September 2026"),
    ("wardogs-genres", "WARDOGS · Genres and specs",
     "Five genres, eight categories, Windows only",
     [("5", "genres, Valve's own list"), ("8", "store categories"), ("0", "VR entries")],
     "/wardogs-genres", "30 September 2026"),
    ("wardogs-gameplay", "WARDOGS · Gameplay",
     "One mode, 100 points, two server types",
     [("1", "game mode"), ("3", "teams, up to 100"), ("100", "points to win")],
     "/wardogs-gameplay", "1 October 2026"),
    ("wardogs-steam-deck", "WARDOGS · Steam Deck",
     "Valve's own check says it does not support",
     [("DoesNotSupport", "Deck, SteamOS, Machine"), ("Windows", "only platform listed"), ("4 Sep 2026", "studio's post")],
     "/wardogs-steam-deck", "1 October 2026"),
]

for row in PAGES:
    for theme in ("dark", "light"):
        print("wrote", build(*row, theme))
