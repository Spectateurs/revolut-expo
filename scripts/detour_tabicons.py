# Extrait le glyphe de chaque crop d'onglet (1..5.jpg) en masque blanc transparent
# (teintable via tintColor dans l'app). On retire le label texte et le fond sombre.
from PIL import Image

NAMES = {1: 'accueil', 2: 'investir', 3: 'virements', 4: 'cryptos', 5: 'revpoints'}

for n, label in NAMES.items():
    im = Image.open(f'assets/{n}.jpg').convert('RGB')
    g = im.convert('L')
    w, h = im.size
    px = g.load()
    prof = [sum(1 for x in range(w) if px[x, y] > 90) for y in range(h)]
    bright = [y for y in range(h) if prof[y] > 3]

    # Regroupe les lignes claires (fusionne les petits trous <=10px : ex. les 2 fleches)
    groups = []
    for y in bright:
        if groups and y - groups[-1][-1] <= 10:
            groups[-1].append(y)
        else:
            groups.append([y])

    # Le glyphe = 1er groupe (haut) ; le label = dernier groupe (bas) -> ignore
    gy0, gy1 = groups[0][0], groups[0][-1]
    top, bot = max(0, gy0 - 4), min(h, gy1 + 5)
    crop = im.crop((0, top, w, bot)).convert('L')
    cw, ch = crop.size
    cpx = crop.load()

    out = Image.new('RGBA', (cw, ch), (255, 255, 255, 0))
    opx = out.load()
    low, high = 70.0, 170.0
    for y in range(ch):
        for x in range(cw):
            L = cpx[x, y]
            a = int(max(0, min(255, (L - low) / (high - low) * 255)))
            if a < 25:  # supprime le bruit JPEG des aplats sombres
                a = 0
            opx[x, y] = (255, 255, 255, a)

    bbox = out.getbbox()
    if bbox:
        out = out.crop(bbox)
    out.save(f'assets/tab-{label}.png')
    print(f'tab-{label}.png', out.size)
