// Icônes des 4 actions de l'accueil, reproduites au plus près des fichiers de
// référence fournis (plus.jpg, entremescomptes.jpg, bank.jpg, ....jpg).
// Redessinées en vecteur (net, couleur exacte, sans artefacts JPEG ni fond
// incrusté) plutôt que d'incruster les captures.
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

// « Ajouter de l'argent » : un + à bouts arrondis (cf. plus.jpg)
export function IconAddMoney({ size = 26, color = '#fff' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M12 4.5 V19.5" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
      <Path d="M4.5 12 H19.5" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
    </Svg>
  );
}

// « Entre mes comptes » : icône shuffle (deux flèches entrelacées, cf.
// entremescomptes.jpg). Ionicons "shuffle" reproduit exactement ce glyphe.
export function IconExchange({ size = 26, color = '#fff' }) {
  return <Ionicons name="shuffle" size={size} color={color} />;
}

// « Informations » : banque classique, fronton + 2 colonnes + socle (cf. bank.jpg)
export function IconBank({ size = 26, color = '#fff' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M12 3 L19.6 8.4 H4.4 Z" fill={color} />
      <Rect x="7" y="9.4" width="3.1" height="6.4" fill={color} />
      <Rect x="13.9" y="9.4" width="3.1" height="6.4" fill={color} />
      <Rect x="4.6" y="16" width="14.8" height="2.4" rx="0.6" fill={color} />
    </Svg>
  );
}

// « Plus » : trois points (cf. ....jpg)
export function IconMore({ size = 26, color = '#fff' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="6.8" cy="12" r="1.9" fill={color} />
      <Circle cx="12" cy="12" r="1.9" fill={color} />
      <Circle cx="17.2" cy="12" r="1.9" fill={color} />
    </Svg>
  );
}
