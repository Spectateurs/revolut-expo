import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Fond chaud (faisceau lumineux venant du coin haut-droit) sur noir.
// Partagé entre l'accueil et l'écran de code d'accès pour que l'effet de flou
// des bulles soit « en raccord avec le fond ».
export default function WarmBackground({ style }) {
  return (
    <View pointerEvents="none" style={style}>
      <LinearGradient
        colors={['rgba(228,214,188,0.55)', 'rgba(120,108,86,0.10)', 'transparent']}
        locations={[0, 0.34, 0.66]}
        start={{ x: 1, y: -0.05 }}
        end={{ x: 0.12, y: 0.85 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={['transparent', 'rgba(205,188,156,0.15)', 'transparent']}
        locations={[0, 0.5, 1]}
        start={{ x: 0.96, y: 0.1 }}
        end={{ x: 0.5, y: 0.72 }}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}
