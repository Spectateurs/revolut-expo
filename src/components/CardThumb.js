import { View, StyleSheet } from 'react-native';
import Text from './AppText';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme';

// Logo réseau : Mastercard = 2 cercles (couleur, ou blanc sur carte argentée), Visa = texte
function NetworkLogo({ network, mono }) {
  if (network === 'visa') {
    return <Text style={styles.visa}>VISA</Text>;
  }
  return (
    <View style={styles.mc}>
      <View style={[styles.mcCircle, { backgroundColor: mono ? 'rgba(255,255,255,0.9)' : '#EB001B' }]} />
      <View style={[styles.mcCircle, { backgroundColor: mono ? 'rgba(255,255,255,0.55)' : '#F79E1B', marginLeft: -7 }]} />
    </View>
  );
}

// Vignette de carte (section "Cartes")
export default function CardThumb({ card }) {
  const silver = card.tone === 'silver';
  return (
    <View style={styles.wrap}>
      <LinearGradient
        colors={card.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, card.selected && styles.cardSelected]}
      >
        {/* Monogramme R en haut à droite */}
        <Text style={[styles.r, { color: silver ? '#2B2B2E' : '#fff' }]}>R</Text>

        {/* Pastille flocon au centre (cartes "tech") */}
        {card.centerBadge === 'snowflake' && (
          <View style={styles.centerWrap}>
            <View style={styles.snowCircle}>
              <Ionicons name="snow" size={11} color="#fff" />
            </View>
          </View>
        )}

        {/* Logo réseau en bas à droite */}
        <View style={styles.logoSlot}>
          <NetworkLogo network={card.network} mono={silver} />
        </View>
      </LinearGradient>
      <Text style={styles.name} numberOfLines={1}>
        {card.name}
      </Text>
      <Text style={styles.last4}>·· {card.last4}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: 100, alignItems: 'center' },
  card: {
    width: 100,
    height: 64,
    borderRadius: 9,
  },
  cardSelected: { borderWidth: 1.5, borderColor: '#FF453A' },
  r: { position: 'absolute', top: 5, right: 8, fontWeight: '900', fontSize: 15, letterSpacing: -0.5 },
  centerWrap: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  snowCircle: { width: 19, height: 19, borderRadius: 10, backgroundColor: '#FF3B30', alignItems: 'center', justifyContent: 'center' },
  logoSlot: { position: 'absolute', bottom: 6, right: 8 },
  mc: { flexDirection: 'row', alignItems: 'center' },
  mcCircle: { width: 14, height: 14, borderRadius: 7 },
  visa: { color: '#fff', fontWeight: '800', fontStyle: 'italic', fontSize: 13 },
  name: { color: colors.text, fontSize: 15, fontWeight: '600', marginTop: 9 },
  last4: { color: colors.subtext, fontSize: 13, marginTop: 1 },
});
