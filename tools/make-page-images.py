"""Draw the Shooter Atlas page images.

Every image is drawn from primitives here — no stock art, no downloaded
assets, nothing traced from another site. Run it to regenerate the files in
assets/img/:

    python tools/make-page-images.py

One image per page, 1200x630 (the standard social-card size). The same file is
used for the in-page <img> and for og:image.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
INK = (17, 23, 34)
MUTED = (91, 103, 116)
RULE = (227, 231, 237)
SOFT = (246, 248, 251)
ACCENT = (11, 87, 208)
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


def pick(paths):
    for p in paths:
        if Path(p).exists():
            return p
    raise SystemExit("no usable font found")


BOLD = pick(BOLD_CANDIDATES)
REG = pick(REG_CANDIDATES)


def f(size, bold=True):
    return ImageFont.truetype(BOLD if bold else REG, size)


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


def chip(draw, x, y, value, label):
    pad_x, pad_y, gap = 24, 18, 20
    fv, fl = f(42), f(19, bold=False)
    wv = draw.textlength(value, font=fv)
    wl = draw.textlength(label, font=fl)
    cw = max(wv, wl) + pad_x * 2
    ch = 108
    draw.rounded_rectangle([x, y, x + cw, y + ch], radius=12, fill=SOFT, outline=RULE, width=2)
    draw.text((x + pad_x, y + pad_y - 4), value, font=fv, fill=ACCENT)
    draw.text((x + pad_x, y + 70), label, font=fl, fill=MUTED)
    return x + cw + gap


def build(name, eyebrow, headline, stats, path, date):
    img = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(img)

    # soft band across the bottom third so the card reads as one family
    d.rectangle([0, H - 96, W, H], fill=SOFT)
    d.line([0, H - 96, W, H - 96], fill=RULE, width=2)

    # masthead: drawn crosshair mark + wordmark
    mx, my, ms = 72, 64, 52
    d.rounded_rectangle([mx, my, mx + ms, my + ms], radius=12, fill=(11, 87, 208, 255))
    cx, cy = mx + ms / 2, my + ms / 2
    d.ellipse([cx - 11, cy - 11, cx + 11, cy + 11], outline="white", width=4)
    for xy in ((cx, my + 8, cx, cy - 14), (cx, cy + 14, cx, my + ms - 8),
               (mx + 8, cy, cx - 14, cy), (cx + 14, cy, mx + ms - 8, cy)):
        d.line(list(xy), fill="white", width=4)
    d.text((mx + ms + 20, my + 2), "Shooter Atlas", font=f(36, bold=True), fill=INK)
    d.text((mx + ms + 22, my + 40), "Numbers for large-scale tactical shooters",
           font=f(21, bold=False), fill=MUTED)

    # eyebrow + headline
    y = 208
    d.text((72, y), eyebrow, font=f(22, bold=True), fill=ACCENT)
    y += 44
    hl = f(66, bold=True)
    for line in wrap(d, headline, hl, W - 144)[:3]:
        d.text((72, y), line, font=hl, fill=INK)
        y += 78

    # stat chips along the bottom band
    x = 72
    for value, label in stats:
        x = chip(d, x, H - 210, value, label)

    d.text((72, H - 62), "shooteratlas.com" + path, font=f(22, bold=False), fill=MUTED)
    d.text((W - 72 - d.textlength(date, font=f(22, bold=False)), H - 62),
           date, font=f(22, bold=False), fill=MUTED)

    OUT.mkdir(parents=True, exist_ok=True)
    img.save(OUT / f"{name}.png", optimize=True)
    return name


PAGES = [
    ("home", "SHOOTER ATLAS",
     "Numbers for 100-player tactical shooters",
     [("1", "game per page"), ("100", "players per match"), ("3", "teams")], "/",
     "28 September 2026"),
    ("wardogs", "WARDOGS",
     "Scoring, prices and platform support",
     [("$10,000", "starting balance"), ("100", "players per match"), ("3", "factions")], "/wardogs",
     "28 September 2026"),
    ("wardogs-achievements", "WARDOGS ACHIEVEMENTS",
     "All ten, and how rare each one is",
     [("10", "achievements"), ("78.3%", "most common"), ("0.1%", "rarest")], "/wardogs-achievements",
     "28 September 2026"),
    ("wardogs-reviews", "WARDOGS ON STEAM",
     "What 54,566 reviews say",
     [("54,566", "user reviews"), ("81%", "positive"), ("Very Positive", "Steam summary")], "/wardogs-reviews",
     "28 September 2026"),
    ("wardogs-early-access", "WARDOGS EARLY ACCESS",
     "What the developers actually say",
     [("1-2 yrs", "in Early Access"), ("Fighter jets", "planned")], "/wardogs-early-access",
     "28 September 2026"),
    ("wardogs-reddit", "WARDOGS ON REDDIT",
     "What players actually ask for",
     [("10", "threads read"), ("5", "ask buy-or-wait"), ("4", "recurring asks")], "/wardogs-reddit",
     "28 September 2026"),
    ("wardogs-price", "WARDOGS PRICE BY REGION",
     "What Steam charges in eight regions",
     [("$39.99", "US base game"), ("8", "regions read"), ("0%", "discount")], "/wardogs-price",
     "29 September 2026"),
]

for name, eyebrow, headline, stats, path, date in PAGES:
    print("wrote", build(name, eyebrow, headline, stats, path, date))
