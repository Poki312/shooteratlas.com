"""Build the first narrated Shooter Atlas video, from the language page's figure set.

Five scenes, in the order the page argues them: the fourteen languages, the tick
count, where the players are, the languages the store does not list, and where to
read the rest. The visuals are the page's own figures; the narration was written
from the same sentences and the same numbers, and every figure carries its source
and read date inside the image already.

    python tools/make-video-languages.py

Needs ffmpeg on PATH (or at the WinGet link) and the narration WAVs in
../channel/audio/ (see the tts-scenes script). Writes the MP4 to ../channel/,
never into the site's assets, so it can never reach dist/.
"""

import shutil
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1280, 720
ROOT = Path(__file__).resolve().parent.parent
IMG = ROOT / "assets" / "img"
CHANNEL = ROOT.parent / "channel"
FRAMES = CHANNEL / "frames"
BUILD = CHANNEL / "build"
OUT = CHANNEL / "shooter-atlas-languages.mp4"

FFMPEG = shutil.which("ffmpeg") or r"C:\Users\Administrator\AppData\Local\Microsoft\WinGet\Links\ffmpeg.exe"
FFPROBE = shutil.which("ffprobe") or r"C:\Users\Administrator\AppData\Local\Microsoft\WinGet\Links\ffprobe.exe"

BASE = (10, 14, 19)
SURFACE = (18, 26, 35)
RULE = (38, 49, 61)
INK = (233, 238, 244)
MUTED = (124, 138, 155)
ACCENT = (240, 169, 44)
ON_ACCENT = (16, 22, 29)
GRID_STEP = 30


def pick(paths):
    for p in paths:
        if Path(p).exists():
            return p
    raise SystemExit("no usable font found")


BOLD = pick([r"C:\Windows\Fonts\segoeuib.ttf", r"C:\Windows\Fonts\arialbd.ttf"])
REG = pick([r"C:\Windows\Fonts\segoeui.ttf", r"C:\Windows\Fonts\arial.ttf"])
MONO = pick([r"C:\Windows\Fonts\consolab.ttf", r"C:\Windows\Fonts\consola.ttf"])


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


def background():
    img = Image.new("RGB", (W, H), BASE)
    d = ImageDraw.Draw(img)
    grid = blend(BASE, INK, 0.045)
    for x in range(0, W + GRID_STEP, GRID_STEP):
        d.line([(x, 0), (x, H)], fill=grid, width=1)
    for y in range(0, H + GRID_STEP, GRID_STEP):
        d.line([(0, y), (W, y)], fill=grid, width=1)
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([W - 660, -340, W + 280, 220], fill=ACCENT + (52,))
    glow = glow.filter(ImageFilter.GaussianBlur(140))
    return Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")


def mark(d, x, y, size):
    d.rounded_rectangle([x, y, x + size, y + size], radius=15, fill=ACCENT)
    cx, cy = x + size / 2, y + size / 2
    r = size * 0.21
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=ON_ACCENT, width=4)
    for seg in ((cx, y + 8, cx, cy - r - 3), (cx, cy + r + 3, cx, y + size - 8),
                (x + 8, cy, cx - r - 3, cy), (cx + r + 3, cy, x + size - 8, cy)):
        d.line(list(seg), fill=ON_ACCENT, width=4)


def title_card():
    img = background()
    d = ImageDraw.Draw(img)
    mark(d, 84, 92, 54)
    d.text((156, 98), "Shooter Atlas", font=f(30), fill=INK)
    d.text((156, 136), "Numbers for large-scale tactical shooters", font=f(17, bold=False), fill=MUTED)
    d.text((86, 268), "W A R D O G S   ·   L A N G U A G E S", font=f(18), fill=ACCENT)
    for i, line in enumerate(wrap(d, "Fourteen languages, and what Valve's table actually ticks", f(58), W - 180)[:3]):
        d.text((84, 320 + i * 72), line, font=f(58), fill=INK)
    d.text((86, H - 108), "Sources: Valve's store page, its store API and its review API, read 30 September 2026",
           font=mono(17), fill=MUTED)
    d.text((86, H - 74), "shooteratlas.com/wardogs-languages", font=mono(19), fill=ACCENT)
    out = FRAMES / "title.png"
    img.save(out)
    return out


def end_card():
    img = background()
    d = ImageDraw.Draw(img)
    mark(d, 84, 92, 54)
    d.text((156, 98), "Shooter Atlas", font=f(30), fill=INK)
    for i, line in enumerate(wrap(d, "Every figure carries its source and the date it was read.", f(52), W - 180)[:3]):
        d.text((84, 300 + i * 66), line, font=f(52), fill=INK)
    d.text((86, H - 150), "The full page, with every source and read date:", font=f(20, bold=False), fill=MUTED)
    d.text((86, H - 116), "shooteratlas.com/wardogs-languages", font=mono(24), fill=ACCENT)
    out = FRAMES / "end.png"
    img.save(out)
    return out


SCENES = [
    ("title", "s1"),
    ("wardogs-languages-fig-ticks", "s2"),
    ("wardogs-languages-fig-reviews", "s3"),
    ("wardogs-languages-fig-unlisted", "s4"),
    ("end", "s5"),
]


def audio_len(path):
    out = subprocess.run([FFPROBE, "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
                         capture_output=True, text=True, check=True)
    return float(out.stdout.strip())


def run(args):
    subprocess.run(args, check=True, capture_output=True)


def main():
    FRAMES.mkdir(parents=True, exist_ok=True)
    BUILD.mkdir(parents=True, exist_ok=True)
    cards = {"title": title_card(), "end": end_card()}

    clips = []
    for i, (name, audio) in enumerate(SCENES, start=1):
        image = cards.get(name) or (IMG / f"{name}.png")
        wav = CHANNEL / "audio" / f"{audio}.wav"
        dur = audio_len(wav) + 1.2            # 0.6 s of air at each end
        clip = BUILD / f"scene{i}.mp4"
        vf = (f"[0:v]scale={W}:{H}:force_original_aspect_ratio=decrease,"
              f"pad={W}:{H}:(ow-iw)/2:(oh-ih)/2:color=0x0a0e13,"
              f"fade=t=in:st=0:d=0.35,fade=t=out:st={dur - 0.35:.2f}:d=0.35,format=yuv420p[v];"
              f"[1:a]adelay=600|600,apad[a]")
        run([FFMPEG, "-y", "-loop", "1", "-i", str(image), "-i", str(wav),
             "-filter_complex", vf, "-map", "[v]", "-map", "[a]",
             "-t", f"{dur:.2f}", "-r", "30", "-c:v", "libx264", "-crf", "20",
             "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "160k", str(clip)])
        clips.append(clip)
        print(f"scene {i}: {name} + {audio} = {dur:.1f}s")

    listing = BUILD / "list.txt"
    listing.write_text("".join(f"file '{c.as_posix()}'\n" for c in clips), encoding="utf-8")
    run([FFMPEG, "-y", "-f", "concat", "-safe", "0", "-i", str(listing), "-c", "copy", str(OUT)])
    total = audio_len(OUT)
    print(f"wrote {OUT.name}: {total:.1f}s, {OUT.stat().st_size / 1e6:.1f} MB")


main()
