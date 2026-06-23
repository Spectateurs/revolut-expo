# Detoure + ameliore la carte du bandeau de parrainage.
# Pipeline en 3x (LANCZOS) pour un rendu net sur ecran retina, detourage du fond
# sombre (flood-fill depuis les bords), effacement de la croix, puis renforcement
# de la nettete (UnsharpMask) -- l'equivalent d'une passe d'amelioration.
from PIL import Image, ImageDraw, ImageFilter

SRC = 'assets/parrainage-src.png'
OUT = 'assets/parrainage.png'
SCALE = 3

# 1) Source agrandie x3 (interpolation de haute qualite) + debruitage doux
im = Image.open(SRC).convert('RGBA')
im = im.resize((im.width * SCALE, im.height * SCALE), Image.LANCZOS)
im = im.filter(ImageFilter.MedianFilter(size=3))  # lisse le bruit JPEG des aplats

# 2) Recadrage sur la zone carte (coords d'origine x SCALE)
CROP = tuple(v * SCALE for v in (58, 26, 196, 147))
im = im.crop(CROP)
w, h = im.size

# 3) Flood-fill du fond sombre depuis une couronne de points sur les bords
THRESH = 34
step = 4 * SCALE
seeds = []
for x in range(0, w, step):
    seeds.append((x, 0)); seeds.append((x, h - 1))
for y in range(0, h, step):
    seeds.append((0, y)); seeds.append((w - 1, y))

px = im.load()
for (sx, sy) in seeds:
    r, g, b, a = px[sx, sy]
    if a == 0:
        continue
    if (r + g + b) / 3 < 75:
        ImageDraw.floodfill(im, (sx, sy), (0, 0, 0, 0), thresh=THRESH)

# 4) Recadrage sur le contenu visible
bbox = im.getbbox()
if bbox:
    im = im.crop(bbox)

# 5) Efface la petite croix (X) en haut (l'app a deja sa propre croix)
draw = ImageDraw.Draw(im)
draw.rectangle([100 * SCALE, 0, 116 * SCALE, 12 * SCALE], fill=(0, 0, 0, 0))

# 6) Re-recadrage pour retirer les rangees du haut devenues vides
bbox = im.getbbox()
if bbox:
    im = im.crop(bbox)

# 7) Renforcement de la nettete (doux pour ne pas raviver le bruit)
im = im.filter(ImageFilter.UnsharpMask(radius=2.0, percent=85, threshold=3))

im.save(OUT)
print('OK ->', OUT, im.size)
