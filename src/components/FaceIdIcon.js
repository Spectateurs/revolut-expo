import Svg, { Path } from 'react-native-svg';

// Glyphe Face ID iOS : cadre à coins arrondis + visage (yeux, nez, sourire).
export default function FaceIdIcon({ size = 34, color = '#fff' }) {
  const sw = 1.7;
  const p = { stroke: color, strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' };
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {/* 4 coins du cadre */}
      <Path d="M3 8.5 V6.2 A3.2 3.2 0 0 1 6.2 3 H8.5" {...p} />
      <Path d="M15.5 3 H17.8 A3.2 3.2 0 0 1 21 6.2 V8.5" {...p} />
      <Path d="M21 15.5 V17.8 A3.2 3.2 0 0 1 17.8 21 H15.5" {...p} />
      <Path d="M8.5 21 H6.2 A3.2 3.2 0 0 1 3 17.8 V15.5" {...p} />
      {/* yeux */}
      <Path d="M8.8 9.3 V11.3" {...p} />
      <Path d="M15.2 9.3 V11.3" {...p} />
      {/* nez */}
      <Path d="M12 9.5 V12.6 H13.4" {...p} />
      {/* sourire */}
      <Path d="M9 14.9 Q12 17 15 14.9" {...p} />
    </Svg>
  );
}
