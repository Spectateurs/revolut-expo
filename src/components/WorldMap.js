import Svg, { Path, Circle } from 'react-native-svg';

// Carte du monde stylisée (silhouettes des continents) pour la carte
// « Vos voyages » de l'analyse, avec la France surlignée en bleu.
const LAND = '#34343B';
const FR = '#5B8DEF';

export default function WorldMap({ height = 180 }) {
  return (
    <Svg width="100%" height={height} viewBox="0 0 1000 480" preserveAspectRatio="xMidYMid meet">
      {/* Amérique du Nord */}
      <Path
        fill={LAND}
        d="M175 70 Q230 58 295 70 L330 95 Q340 115 320 130 L305 150 Q312 165 298 178 L270 205 Q258 235 240 255 Q232 230 240 205 L232 175 Q180 168 150 150 Q130 120 145 95 Z"
      />
      {/* Groenland */}
      <Path fill={LAND} d="M372 48 Q410 46 426 62 Q430 88 408 102 L378 104 Q360 82 366 62 Z" />
      {/* Amérique du Sud */}
      <Path
        fill={LAND}
        d="M300 250 Q345 245 372 262 Q388 285 378 312 L360 350 Q345 400 322 432 Q308 400 300 360 Q290 315 292 285 Z"
      />
      {/* Europe */}
      <Path
        fill={LAND}
        d="M468 92 Q510 86 548 92 L560 108 Q548 120 560 130 L535 138 Q512 150 498 158 Q482 148 476 132 Q466 112 468 92 Z"
      />
      {/* Afrique */}
      <Path
        fill={LAND}
        d="M472 182 Q540 176 595 188 Q618 220 602 262 Q588 312 552 372 Q528 408 508 372 Q492 330 484 285 Q472 232 472 182 Z"
      />
      {/* Asie */}
      <Path
        fill={LAND}
        d="M562 84 Q700 66 858 78 Q888 100 872 138 Q840 162 792 162 L740 158 Q712 178 690 200 L668 186 Q628 188 596 172 Q566 156 560 124 Q556 100 562 84 Z"
      />
      {/* Inde */}
      <Path fill={LAND} d="M690 200 Q712 210 706 240 Q698 220 686 206 Z" />
      {/* Australie */}
      <Path fill={LAND} d="M792 332 Q852 322 902 336 Q916 366 888 392 Q845 414 808 396 Q786 372 792 332 Z" />

      {/* Halo + France surlignée */}
      <Circle cx="503" cy="138" r="26" fill={FR} opacity={0.18} />
      <Path
        fill={FR}
        d="M496 122 Q506 120 512 126 L522 130 Q520 140 512 146 L506 156 Q498 154 494 146 L488 138 Q488 128 496 122 Z"
      />
    </Svg>
  );
}
