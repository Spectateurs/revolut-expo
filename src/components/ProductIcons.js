// Icônes des sections « En savoir plus » et « Patrimoine total », reproduites
// au plus près des fichiers de référence. Vecteur net, fond négatif = couleur
// du cercle/squircle.
import Svg, { Rect, Circle, Path, Ellipse } from 'react-native-svg';
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';

// « Épargne et fonds » : coffre-fort (cadran + petits pieds)
export function IconSafe({ size = 24, color = '#fff', bg = '#2C2C2E' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x="4.2" y="5" width="15.6" height="12.2" rx="2.8" fill={color} />
      <Rect x="6.5" y="16.4" width="1.7" height="2.4" rx="0.5" fill={color} />
      <Rect x="15.8" y="16.4" width="1.7" height="2.4" rx="0.5" fill={color} />
      <Circle cx="12" cy="11.1" r="3.1" fill={bg} />
      <Circle cx="12" cy="11.1" r="1.15" fill={color} />
    </Svg>
  );
}

// « Pocket » : portefeuille (corps arrondi + fermoir rond à droite)
export function IconWallet({ size = 24, color = '#fff', bg = '#2C2C2E' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect x="3.5" y="7" width="17" height="10" rx="2.7" fill={color} />
      <Circle cx="17.4" cy="12" r="1.4" fill={bg} />
    </Svg>
  );
}

// « Prêt personnel » (En savoir plus) : sac de billets simple
export function IconMoneyBag({ size = 24, color = '#fff' }) {
  return <MaterialCommunityIcons name="sack" size={size} color={color} />;
}

// « Espèces » : pile de pièces
export function IconCoins({ size = 18, color = '#fff' }) {
  return <FontAwesome5 name="coins" size={size} color={color} solid />;
}

// « Cryptos » : bitcoin
export function IconBitcoin({ size = 22, color = '#fff' }) {
  return <Ionicons name="logo-bitcoin" size={size} color={color} />;
}

// « Lié(s) » : maillons de chaîne
export function IconLink({ size = 20, color = '#fff' }) {
  return <Ionicons name="link" size={size} color={color} />;
}

// « Prêt » (Patrimoine) : sac de billets + pile de pièces à droite
export function IconLoan({ size = 22, color = '#fff', bg = '#C3D94B' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {/* nœud du sac */}
      <Path fill={color} d="M6.6 9.2 Q7 7.4 8.1 7.4 Q9.2 7.4 9.6 9.2 Z" />
      {/* corps du sac */}
      <Path
        fill={color}
        d="M5 13.2 Q4.6 10.4 7 9.5 L9.2 9.5 Q11.6 10.4 11.2 13.2 Q11.8 15.2 11.1 16.8 Q10.2 18.6 8.1 18.6 Q6 18.6 5.1 16.8 Q4.4 15.2 5 13.2 Z"
      />
      {/* pile de pièces (cylindre + traits de séparation) */}
      <Ellipse cx="16.3" cy="13.8" rx="2.8" ry="1.15" fill={color} />
      <Rect x="13.5" y="13.8" width="5.6" height="3.4" fill={color} />
      <Ellipse cx="16.3" cy="17.2" rx="2.8" ry="1.15" fill={color} />
      <Rect x="13.5" y="14.95" width="5.6" height="0.5" fill={bg} />
      <Rect x="13.5" y="16.1" width="5.6" height="0.5" fill={bg} />
    </Svg>
  );
}
