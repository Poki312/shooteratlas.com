"""Redraw the first video's thumbnail in the site's current palette.

The thumbnail on "WARDOGS by the numbers" was made before the site was
recoloured, so it still wears the old blue-and-white set. This draws the same
card again — same words, same layout, same three chips, same footer — with the
dark-theme tokens from src/layout.mjs. Colours only; nothing about the structure
or the figures moves.

    python tools/make-video-thumbnail.py

Writes ../channel/wardogs-thumbnail-rebranded.png (upload material, so it stays
outside the site repo's assets and can never reach dist/).
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H = 1280, 720
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT.parent / "channel" / "wardogs-thumbnail-rebranded.png"

# src/layout.mjs, dark theme
BG = (10, 14, 19)          # --bg         #0a0e13
BAND = (23, 33, 44)        # --surface-2  #17212c
SURFACE = (18, 26, 35)     # --surface    #121a23
RULE = (38, 49, 61)        # --rule       #26313d
INK = (233, 238, 244)      # --ink        #e9eef4
MUTED = (124, 138, 155)    # --muted      #7c8a9b
ACCENT = (240, 169, 44)    # --accent     #f0a92c
ACCENT_INK = (16, 22, 29)  # --accent-ink #10161d


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


img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)

# brand row, top left — same position and sizes as the original
d.rounded_rectangle([148, 112, 200, 164], radius=12, fill=ACCENT)
crosshair(d, 174, 138, 16, ACCENT_INK, 5)
d.text((216, 116), "Shooter Atlas", font=f(38), fill=INK)
d.text((216, 158), "Numbers for large-scale tactical shooters", font=f(23, False), fill=MUTED)

# eyebrow + headline
d.text((148, 250), "WARDOGS", font=f(23), fill=ACCENT)
d.text((146, 300), "Scoring, prices and platform", font=f(62), fill=INK)
d.text((146, 372), "support", font=f(62), fill=INK)

# three chips, same three figures
chips = [("$10,000", "starting balance", 148, 212), ("100", "players per match", 378, 200), ("3", "factions", 596, 116)]
for value, label, x, w in chips:
    d.rounded_rectangle([x, 448, x + w, 552], radius=12, fill=SURFACE, outline=RULE, width=2)
    d.text((x + 22, 470), value, font=f(38), fill=ACCENT)
    d.text((x + 22, 516), label, font=f(20, False), fill=MUTED)

# footer band with the page address and the read date
d.rectangle([0, 578, W, 646], fill=BAND)
d.text((148, 598), "shooteratlas.com/wardogs", font=f(22, False), fill=MUTED)
right = "28 September 2026"
d.text((W - 150 - d.textlength(right, font=f(22, False)), 598), right, font=f(22, False), fill=MUTED)
d.text((W - 150 - d.textlength("shooteratlas.com", font=f(22, False)), 665), "shooteratlas.com", font=f(22, False), fill=MUTED)

OUT.parent.mkdir(parents=True, exist_ok=True)
img.save(OUT)
print("wrote", OUT.name, img.size)
