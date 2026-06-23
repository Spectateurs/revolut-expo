import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../components/AppText';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius } from '../theme';
import SpendingChart from '../components/SpendingChart';
import WorldMap from '../components/WorldMap';

const TOOLS = [
  { id: 'budget', label: 'Définissez un budget', lib: 'ion', icon: 'pie-chart-outline' },
  { id: 'split', label: 'Répartissez vos revenus automatiquement', lib: 'mci', icon: 'call-split' },
];

// Barres verticales blanches néon (carte "Entrées d'argent")
function IncomeBars() {
  const heights = [40, 46, 24, 10, 28];
  return (
    <View style={styles.barsRow}>
      {heights.map((h, i) => (
        <View key={i} style={[styles.barV, { height: h }]} />
      ))}
    </View>
  );
}

// Deux barres horizontales néon vert/rouge (carte "Opérations nettes")
function NetBars() {
  return (
    <View style={{ marginTop: 14, gap: 10 }}>
      <View style={[styles.netBar, { width: '88%', backgroundColor: colors.green, shadowColor: colors.green }]} />
      <View style={[styles.netBar, { width: '62%', backgroundColor: '#FF4D5E', shadowColor: '#FF4D5E' }]} />
    </View>
  );
}

function ToolIcon({ t }) {
  return t.lib === 'mci' ? (
    <MaterialCommunityIcons name={t.icon} size={20} color="#fff" />
  ) : (
    <Ionicons name={t.icon} size={20} color="#fff" />
  );
}

export default function AnalyticsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* En-tête */}
        <Pressable style={styles.back} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </Pressable>
        <Text style={styles.bigTitle}>Outils d'analyse</Text>
        <Pressable style={styles.accountsPill}>
          <Text style={styles.accountsText}>Tous vos comptes</Text>
          <Ionicons name="chevron-down" size={18} color={colors.text} />
        </Pressable>

        {/* Dépenses (pleine largeur, courbe néon) */}
        <View style={styles.depCard}>
          <Text style={styles.cardLabel}>Dépenses</Text>
          <View style={styles.cardValueRow}>
            <Text style={styles.cardValue}>139 938 €</Text>
            <Ionicons name="caret-up" size={13} color={colors.red} />
            <Text style={[styles.cardDelta, { color: colors.red }]}>139 927 €</Text>
          </View>
          <View style={{ marginTop: 12 }}>
            <SpendingChart />
          </View>
          <View style={styles.days}>
            {['1', '6', '11', '16', '21', '30'].map((d) => (
              <Text key={d} style={styles.day}>{d}</Text>
            ))}
          </View>
        </View>

        {/* Entrées d'argent + Opérations nettes (2 colonnes) */}
        <View style={styles.twoUp}>
          <View style={styles.halfCard}>
            <Text style={styles.cardLabel}>Entrées d'argent</Text>
            <Text style={styles.cardValueSm}>2 594 223 €</Text>
            <View style={styles.deltaRow}>
              <Ionicons name="caret-up" size={12} color={colors.green} />
              <Text style={[styles.cardDeltaSm, { color: colors.green }]}>2 594 217 €</Text>
            </View>
            <IncomeBars />
          </View>

          <View style={styles.halfCard}>
            <Text style={styles.cardLabel}>Opérations nettes</Text>
            <Text style={styles.cardValueSm}>2 454 285 €</Text>
            <View style={styles.deltaRow}>
              <Ionicons name="add-circle" size={14} color={colors.green} />
              <Text style={[styles.cardDeltaSm, { color: colors.green }]}>Positif</Text>
            </View>
            <NetBars />
          </View>
        </View>

        <View style={styles.dots}>
          {[0, 1, 2, 3].map((i) => (
            <View key={i} style={[styles.dot, i === 0 && styles.dotActive]} />
          ))}
        </View>

        {/* Vue d'ensemble */}
        <Text style={styles.sectionTitle}>Vue d'ensemble</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Total des actifs</Text>
          <Text style={styles.total}>4 150 €</Text>
          <View style={styles.allocTrack}>
            <View style={styles.allocFill} />
          </View>
          <View style={styles.legendRow}>
            <View style={styles.legendDot} />
            <Text style={styles.legendText}>Espèces</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.travelTitle}>Vos voyages</Text>
          <Text style={styles.travelSub}>Spend abroad with Revolut</Text>
          <View style={styles.map}>
            <WorldMap height={190} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Outils</Text>
        <View style={styles.toolsCard}>
          {TOOLS.map((t, i) => (
            <Pressable key={t.id} style={({ pressed }) => [styles.toolRow, i > 0 && styles.border, pressed && { backgroundColor: colors.card2 }]}>
              <View style={styles.toolIcon}>
                <ToolIcon t={t} />
              </View>
              <Text style={styles.toolLabel}>{t.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.subtext} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  back: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center', marginLeft: 12, marginTop: 4 },
  bigTitle: { color: colors.text, fontSize: 30, fontWeight: '800', paddingHorizontal: 16, marginTop: 14 },
  accountsPill: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 16, marginTop: 12, marginBottom: 6 },
  accountsText: { color: colors.text, fontSize: 18, fontWeight: '700' },

  depCard: { backgroundColor: colors.card, marginHorizontal: 16, borderRadius: radius.lg, padding: 16, marginTop: 10 },
  twoUp: { flexDirection: 'row', gap: 12, marginHorizontal: 16, marginTop: 12 },
  halfCard: { flex: 1, backgroundColor: colors.card, borderRadius: radius.lg, padding: 14, minHeight: 150 },

  cardLabel: { color: colors.subtext, fontSize: 15 },
  cardValueRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  cardValue: { color: colors.text, fontSize: 26, fontWeight: '800' },
  cardValueSm: { color: colors.text, fontSize: 21, fontWeight: '800', marginTop: 4 },
  cardDelta: { fontSize: 15, fontWeight: '700' },
  deltaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  cardDeltaSm: { fontSize: 14, fontWeight: '700' },

  days: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  day: { color: colors.subtext, fontSize: 11 },

  // barres verticales blanches néon
  barsRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 9, height: 50, marginTop: 18, paddingLeft: 2 },
  barV: {
    width: 7, borderRadius: 4, backgroundColor: '#FFFFFF',
    shadowColor: '#FFFFFF', shadowOpacity: 0.7, shadowRadius: 5, shadowOffset: { width: 0, height: 0 },
  },
  // barres horizontales néon
  netBar: {
    height: 9, borderRadius: 5,
    shadowOpacity: 0.85, shadowRadius: 6, shadowOffset: { width: 0, height: 0 },
  },

  dots: { flexDirection: 'row', justifyContent: 'center', gap: 5, marginTop: 14 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#3A3A3E' },
  dotActive: { backgroundColor: '#9A9AA0' },

  sectionTitle: { color: colors.text, fontSize: 22, fontWeight: '800', paddingHorizontal: 16, marginTop: 22, marginBottom: 8 },
  card: { backgroundColor: colors.card, marginHorizontal: 16, marginTop: 12, borderRadius: radius.lg, padding: 18 },
  label: { color: colors.subtext, fontSize: 15 },
  total: { color: colors.text, fontSize: 30, fontWeight: '800', marginTop: 4 },
  allocTrack: { height: 8, borderRadius: 4, backgroundColor: '#2C2C2E', marginTop: 26, overflow: 'hidden' },
  allocFill: { height: 8, borderRadius: 4, width: '100%', backgroundColor: colors.primary },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12 },
  legendDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.primary },
  legendText: { color: colors.text, fontSize: 14 },
  travelTitle: { color: colors.text, fontSize: 17, fontWeight: '700' },
  travelSub: { color: colors.subtext, fontSize: 14, marginTop: 3 },
  map: { height: 190, justifyContent: 'center', marginTop: 10 },
  toolsCard: { backgroundColor: colors.card, marginHorizontal: 16, borderRadius: radius.lg, overflow: 'hidden' },
  toolRow: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16 },
  border: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
  toolIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#2C2C2E', alignItems: 'center', justifyContent: 'center' },
  toolLabel: { flex: 1, color: colors.text, fontSize: 16, fontWeight: '600' },
});
