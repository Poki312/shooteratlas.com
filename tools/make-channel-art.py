"""Draw the Shooter Atlas channel art: avatar and banner.

Same palette, same mark and same type as the page cards, so the channel does
not look like a second brand. Everything is drawn here from primitives.

The colours below are the site's dark-theme tokens, copied from
src/layout.mjs (the `:root` block, lines 37-40) — the site is the standard, this
file follows it. Geometry is unchanged from the first version: only the colours
moved, so the channel still wears the same mark, type and layout.

    python tools/make-channel-art.py
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

# src/layout.mjs, dark theme
INK = (233, 238, 244)      # --ink        #e9eef4
MUTED = (124, 138, 155)    # --muted      #7c8a9b
RULE = (38, 49, 61)        # --rule       #26313d
SOFT = (10, 14, 19)        # --bg         #0a0e13
ACCENT = (240, 169, 44)    # --accent     #f0a92c
ACCENT_INK = (16, 22, 29)  # --accent-ink #10161d
OUT = Path(__file__).resolve().parent.parent / "assets" / "img"


def pick(paths):
    for p in paths:
        if Path(p).exists():
            return p
    raise SystemExit("no usable font found")


BOLD = pick([r"C:\Windows\Fonts\segoeuib.ttf", r"C:\Windows\Fonts\arialbd.ttf"])
REG = pick([r"C:\Windows\Fonts\segoeui.ttf", r"C:\Windows\Fonts\arial.ttf"])


def f(size, bold=True):
    return ImageFont.truetype(BOLD if bold else REG, size)


def crosshair(d, cx, cy, r, colour, weight):
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=colour, width=weight)
    arm = r * 1.35
    for xy in ((cx, cy - arm, cx, cy - r - weight), (cx, cy + r + weight, cx, cy + arm),
               (cx - arm, cy, cx - r - weight, cy), (cx + r + weight, cy, cx + arm, cy)):
        d.line(list(xy), fill=colour, width=weight)


def avatar():
    S = 800
    img = Image.new("RGB", (S, S), ACCENT)
    d = ImageDraw.Draw(img)
    crosshair(d, S // 2, S // 2, 168, ACCENT_INK, 34)
    OUT.mkdir(parents=True, exist_ok=True)
    img.save(OUT / "channel-avatar.png", optimize=True)
    return "channel-avatar.png"


def banner():
    W, H = 2560, 1440
    img = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(img)

    # soft field with a hairline frame, echoing the cards
    d.rectangle([0, 0, W, H], fill=SOFT)
    d.rectangle([80, 80, W - 80, H - 80], outline=RULE, width=3)

    # everything below stays inside the 1546x423 safe area (y 508..931)
    f_word, f_tag, f_line = f(96, True), f(38, False), f(36, True)
    mark, gap = 116, 34
    word_w = d.textlength("Shooter Atlas", font=f_word)
    row_w = mark + gap + word_w
    x = (W - row_w) / 2
    y = 540
    d.rounded_rectangle([x, y, x + mark, y + mark], radius=26, fill=ACCENT)
    crosshair(d, x + mark / 2, y + mark / 2, 26, ACCENT_INK, 7)
    d.text((x + mark + gap, y + 8), "Shooter Atlas", font=f_word, fill=INK)

    tag = "Numbers for large-scale tactical shooters"
    d.text(((W - d.textlength(tag, font=f_tag)) / 2, y + mark + 46), tag, font=f_tag, fill=MUTED)

    line = "1 game per page   |   100 players   |   3 teams   |   every figure sourced"
    d.text(((W - d.textlength(line, font=f_line)) / 2, y + mark + 112), line, font=f_line, fill=ACCENT)

    OUT.mkdir(parents=True, exist_ok=True)
    img.save(OUT / "channel-banner.png", optimize=True)
    return "channel-banner.png"


print("wrote", avatar())
print("wrote", banner())
