// Nettoie les logos : détecte le contenu (le cercle du logo) par sa différence
// avec la couleur des coins, recadre en carré centré, masque circulaire ->
// PNG propre à coins transparents qui se fond sur n'importe quel fond.
const fs = require('fs');
const Jimp = require('jimp-compact');

const DIR = 'D:/projet revo/revolut/assets/';
// seuil = écart de couleur min vs coins pour considérer un pixel comme "contenu"
const CFG = [
  { f: 'etsy', th: 34 },
  { f: 'nvidia', th: 13 },
  { f: 'ishares', th: 26 },
];

(async () => {
  for (const { f, th } of CFG) {
    const img = await Jimp.read(DIR + f + '.jpg');
    const W = img.bitmap.width, H = img.bitmap.height, d = img.bitmap.data;

    // couleur de fond = moyenne des 4 coins (6x6)
    let sr = 0, sg = 0, sb = 0, n = 0;
    for (const [cx, cy] of [[0, 0], [W - 6, 0], [0, H - 6], [W - 6, H - 6]]) {
      for (let y = cy; y < cy + 6; y++) for (let x = cx; x < cx + 6; x++) {
        const i = (y * W + x) * 4; sr += d[i]; sg += d[i + 1]; sb += d[i + 2]; n++;
      }
    }
    const bg = [sr / n, sg / n, sb / n];

    // bbox des pixels qui diffèrent du fond
    let minX = W, minY = H, maxX = 0, maxY = 0, found = false;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      const cdiff = Math.max(Math.abs(d[i] - bg[0]), Math.abs(d[i + 1] - bg[1]), Math.abs(d[i + 2] - bg[2]));
      if (cdiff > th) {
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y; found = true;
      }
    }
    if (!found) { minX = 0; minY = 0; maxX = W - 1; maxY = H - 1; }

    // carré centré sur le centre de la bbox (+2% de marge)
    const bw = maxX - minX + 1, bh = maxY - minY + 1;
    const ccx = (minX + maxX) / 2, ccy = (minY + maxY) / 2;
    let s = Math.round(Math.max(bw, bh) * 1.02);
    let x0 = Math.round(ccx - s / 2), y0 = Math.round(ccy - s / 2);
    if (x0 < 0) x0 = 0; if (y0 < 0) y0 = 0;
    s = Math.min(s, W - x0, H - y0);
    img.crop(x0, y0, s, s);

    const SIZE = 200;
    img.resize(SIZE, SIZE);

    // masque circulaire (fondu de bord 1.5px)
    const r = SIZE / 2, cx = SIZE / 2, cy = SIZE / 2, dd = img.bitmap.data;
    for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) {
      const i = (y * SIZE + x) * 4;
      const ex = x + 0.5 - cx, ey = y + 0.5 - cy;
      const dist = Math.sqrt(ex * ex + ey * ey);
      if (dist > r) dd[i + 3] = 0;
      else if (dist > r - 1.5) dd[i + 3] = Math.round(255 * (r - dist) / 1.5);
    }

    fs.writeFileSync(DIR + f + '.png', await img.getBufferAsync(Jimp.MIME_PNG));
    console.log(`${f}: bg=${bg.map((v) => Math.round(v))} bbox=${bw}x${bh} crop=${s}`);
  }
  console.log('OK');
})().catch((e) => { console.error(e); process.exit(1); });
