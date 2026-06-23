import { View, StyleSheet } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

// Logos de marques réels (police FontAwesome 5 "brands" + MaterialCommunityIcons),
// avec la couleur de fond officielle de chaque marque.
export const BRANDS = {
  etsy: { lib: 'fa', name: 'etsy', color: '#FFFFFF', bg: '#F1641E' },
  airbnb: { lib: 'fa', name: 'airbnb', color: '#FFFFFF', bg: '#FF385C' },
  amazon: { lib: 'fa', name: 'amazon', color: '#FFFFFF', bg: '#232F3E' },
  uber: { lib: 'fa', name: 'uber', color: '#FFFFFF', bg: '#000000' },
  netflix: { lib: 'mci', name: 'netflix', color: '#E50914', bg: '#000000' },
  spotify: { lib: 'mci', name: 'spotify', color: '#FFFFFF', bg: '#1DB954' },
  apple: { lib: 'fa', name: 'apple', color: '#FFFFFF', bg: '#000000' },
  google: { lib: 'fa', name: 'google', color: '#FFFFFF', bg: '#4285F4' },
  paypal: { lib: 'fa', name: 'paypal', color: '#FFFFFF', bg: '#003087' },
};

export function hasBrand(key) {
  return !!BRANDS[key];
}

export default function MerchantLogo({ brand, size = 46 }) {
  const b = BRANDS[brand];
  if (!b) return null;
  const icon = size * 0.5;
  return (
    <View
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: b.bg },
      ]}
    >
      {b.lib === 'fa' ? (
        <FontAwesome5 name={b.name} brand size={icon} color={b.color} />
      ) : (
        <MaterialCommunityIcons name={b.name} size={icon} color={b.color} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { alignItems: 'center', justifyContent: 'center' },
});
