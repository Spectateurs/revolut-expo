import Svg, { Path, Circle } from 'react-native-svg';

// Courbe des dépenses cumulées, style Revolut :
// trait BLANC avec un halo néon rouge (#8d333d) tout autour, prolongé par une
// projection grise, et un point rouge au jour courant.
const W = 320;
const H = 110;
const PAD = 8;

// Valeurs cumulées jour 1..30 : montée en dents de scie (réel) puis plateau (projection)
const VALUES = [
  2, 3, 4.5, 5, 5.2, 8, 8.4, 9, 11, 11.4, 12, 15, 15.4, 16, 18, 18.4, 19, 21, 22.6, 24, 25.6,
  25.8, 25.95, 26.05, 26.15, 26.22, 26.3, 26.36, 26.42, 26.48,
];
const SPLIT = 20; // dernier point "réel" (jour 21), le reste = projection grise

export default function SpendingChart({ height = H }) {
  const max = Math.max(...VALUES);
  const n = VALUES.length;
  const xy = VALUES.map((v, i) => {
    const x = PAD + (i / (n - 1)) * (W - PAD * 2);
    const y = H - PAD - (v / max) * (H - PAD * 2);
    return [x, y];
  });

  const lineTo = (pts) => pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');

  const redPts = xy.slice(0, SPLIT + 1);
  const greyPts = xy.slice(SPLIT);
  const redLine = lineTo(redPts);
  const greyLine = lineTo(greyPts);
  const [ex, ey] = redPts[redPts.length - 1];

  return (
    <Svg width="100%" height={height} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      {/* projection grise */}
      <Path d={greyLine} stroke="#54545A" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* halo néon rouge (#8d333d) : couches de plus en plus larges et transparentes */}
      <Path d={redLine} stroke="#8d333d" strokeWidth={14} opacity={0.14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Path d={redLine} stroke="#8d333d" strokeWidth={9} opacity={0.28} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Path d={redLine} stroke="#b23a47" strokeWidth={5} opacity={0.55} fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* cœur blanc net */}
      <Path d={redLine} stroke="#FFFFFF" strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* point courant : halo + pastille rouge */}
      <Circle cx={ex} cy={ey} r={9} fill="#8d333d" opacity={0.5} />
      <Circle cx={ex} cy={ey} r={4.6} fill="#e0455a" />
    </Svg>
  );
}
