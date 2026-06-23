import { Text as RNText, StyleSheet } from 'react-native';

// Mappe fontWeight -> la bonne graisse Aeonik (Light / Regular / Bold).
// Pas de graisse Medium dispo (Light/Regular/Bold seulement) -> on réserve le
// Bold aux vrais titres (700+), le reste reste en Regular pour éviter le "trop gras".
const FAMILY = {
  '100': 'Aeonik-Light',
  '200': 'Aeonik-Light',
  '300': 'Aeonik-Light',
  '400': 'Aeonik',
  normal: 'Aeonik',
  '500': 'Aeonik',
  '600': 'Aeonik',
  '700': 'Aeonik-Bold',
  bold: 'Aeonik-Bold',
  '800': 'Aeonik-Bold',
  '900': 'Aeonik-Bold',
};

export default function Text({ style, ...rest }) {
  const flat = StyleSheet.flatten(style) || {};
  const weight = flat.fontWeight != null ? String(flat.fontWeight) : '400';
  const { fontWeight, ...clean } = flat;
  // Une fontFamily explicite (ex. NimbusSans-Bold pour le solde) prime sur le
  // mapping de graisse Aeonik.
  const family = clean.fontFamily || FAMILY[weight] || 'Aeonik';
  return <RNText {...rest} style={[clean, { fontFamily: family }]} />;
}
