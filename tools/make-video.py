"""Build the first Shooter Atlas video from the five page cards.

No ffmpeg on this machine, so this writes a Motion-JPEG AVI by hand: the
container is RIFF/AVI, every frame is a JPEG produced by Pillow. No external
footage, no stock music, no third-party audio at all — the clip is silent.

    python tools/make-video.py
"""

import struct
import io
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H, FPS = 1280, 720, 25
CARDS = ["home", "wardogs", "wardogs-achievements", "wardogs-reviews", "wardogs-early-access"]
SEG = 5.6                      # seconds per card
XFADE = 0.6                    # crossfade length in seconds
DUR = SEG * len(CARDS)         # 28.0 s
ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / "assets" / "img"
# written outside the site repo on purpose: it is upload material, not a site
# asset, and must never end up in dist/ via the build's assets copy
OUT = ROOT.parent / "channel" / "shooter-atlas-first-look.avi"

FONT = ImageFont.truetype(
    next(p for p in (r"C:\Windows\Fonts\segoeui.ttf", r"C:\Windows\Fonts\arial.ttf") if Path(p).exists()), 22)


def layer(i, zoom):
    """One full frame holding card i, centred, at the given zoom."""
    frame = Image.new("RGB", (W, H), (255, 255, 255))
    card = Image.open(IMG / f"{CARDS[i]}.png").convert("RGB")
    target_w = int(W * 0.86 * zoom)
    target_h = int(card.height * target_w / card.width)
    card = card.resize((target_w, target_h), Image.LANCZOS)
    frame.paste(card, ((W - target_w) // 2, (H - target_h) // 2 - 10))
    d = ImageDraw.Draw(frame)
    label = "shooteratlas.com"
    d.text((W - 34 - d.textlength(label, font=FONT), H - 40), label, font=FONT, fill=(145, 155, 168))
    return frame


def frame_at(t):
    zoom = 1.0 + 0.035 * (t / DUR)
    seg = t / SEG
    i = min(int(seg), len(CARDS) - 1)
    base = layer(i, zoom)
    into = seg - i
    fade_start = 1 - XFADE / SEG
    if into > fade_start and i + 1 < len(CARDS):
        alpha = (into - fade_start) / (XFADE / SEG)
        nxt = layer(i + 1, 1.0 + 0.035 * ((i + 1) * SEG / DUR))
        return Image.blend(base, nxt, min(max(alpha, 0.0), 1.0))
    return base


def jpeg(img):
    buf = io.BytesIO()
    img.save(buf, "JPEG", quality=82, optimize=True)
    return buf.getvalue()


def fourcc(s):
    return s.encode("ascii")


def chunk(fcc, data):
    pad = b"\x00" if len(data) % 2 else b""
    return fourcc(fcc) + struct.pack("<I", len(data)) + data + pad


def build():
    n = int(round(DUR * FPS))
    frames = [jpeg(frame_at(i / FPS)) for i in range(n)]

    avih = struct.pack("<IIIIIIIIII", int(1_000_000 / FPS), 0, 0, 0x10, n, 0, 1, 0, W, H) + b"\x00" * 16
    strh = (fourcc("vids") + fourcc("MJPG") + struct.pack("<IHHIIIIIIi", 0, 0, 0, 0, 1, FPS, 0, n, 0, -1)
            + struct.pack("<I", 0) + struct.pack("<hhhh", 0, 0, W, H))
    strf = struct.pack("<IiiHH4sIiiII", 40, W, H, 1, 24, fourcc("MJPG"), W * H * 3, 0, 0, 0, 0)
    hdrl = chunk("LIST", fourcc("hdrl") + chunk("avih", avih)
                 + chunk("LIST", fourcc("strl") + chunk("strh", strh) + chunk("strf", strf)))

    movi_data = b"".join(chunk("00dc", fr) for fr in frames)
    movi = chunk("LIST", fourcc("movi") + movi_data)

    # idx1 offsets are relative to the 'movi' fourcc, per the usual AVI layout
    movi_tag_pos = len(b"RIFF") + 4 + len(hdrl) + 8
    entries, pos = [], 8
    for fr in frames:
        size = len(fr) + (1 if len(fr) % 2 else 0)
        # offset of the chunk's fourcc, measured from the 'movi' fourcc itself
        entries.append(fourcc("00dc") + struct.pack("<III", 0x10, 4 + pos, len(fr)))
        pos += 8 + size
    idx1 = chunk("idx1", b"".join(entries))

    body = fourcc("AVI ") + hdrl + movi + idx1
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_bytes(fourcc("RIFF") + struct.pack("<I", len(body)) + body)
    return n, OUT.stat().st_size


n, size = build()
print(f"wrote {OUT.name}: {n} frames, {DUR:.1f}s, {size/1e6:.1f} MB")
