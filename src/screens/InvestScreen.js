import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../components/AppText';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../theme';
import { formatMoney } from '../utils';

const ASSETS = [
  { id: 'btc', name: 'Bitcoin', sym: 'BTC', emoji: '₿', price: 61250.4, change: +2.4, color: '#F7931A' },
  { id: 'eth', name: 'Ethereum', sym: 'ETH', emoji: 'Ξ', price: 3380.12, change: -1.1, color: '#627EEA' },
  { id: 'aapl', name: 'Apple', sym: 'AAPL', emoji: '', price: 212.5, change: +0.8, color: '#C7C7CC' },
  { id: 'tsla', name: 'Tesla', sym: 'TSLA', emoji: '⚡', price: 178.3, change: -3.2, color: '#E82127' },
  { id: 'gold', name: 'Or', sym: 'XAU', emoji: '🥇', price: 2150.0, change: +0.3, color: '#D4AF37' },
];

export default function InvestScreen() {
  const portfolio = 1284.55;
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Investir</Text>

        <View style={styles.portfolioCard}>
          <Text style={styles.portfolioLabel}>Valeur du portefeuille</Text>
          <Text style={styles.portfolioValue}>{formatMoney(portfolio)}</Text>
          <View style={styles.changeBadge}>
            <Ionicons name="trending-up" size={14} color={colors.green} />
            <Text style={styles.changeBadgeText}>+34,20 € (+2,7 %) aujourd'hui</Text>
          </View>
        </View>

        <Text style={styles.section}>Marchés</Text>
        {ASSETS.map((a) => {
          const up = a.change >= 0;
          return (
            <Pressable key={a.id} style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
              <View style={[styles.assetIcon, { backgroundColor: a.color + '22' }]}>
                <Text style={[styles.assetEmoji, { color: a.color }]}>{a.emoji || a.sym[0]}</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.assetName}>{a.name}</Text>
                <Text style={styles.assetSym}>{a.sym}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.assetPrice}>{formatMoney(a.price)}</Text>
                <Text style={[styles.assetChange, { color: up ? colors.green : colors.red }]}>
                  {up ? '+' : ''}
                  {a.change} %
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  title: { fontSize: 30, fontWeight: '800', color: colors.text, paddingHorizontal: 16, paddingTop: 8 },
  portfolioCard: {
    backgroundColor: colors.bgGrey,
    margin: 16,
    borderRadius: radius.lg,
    padding: 20,
  },
  portfolioLabel: { color: colors.subtext, fontSize: 14 },
  portfolioValue: { color: colors.text, fontSize: 36, fontWeight: '800', marginTop: 6 },
  changeBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10 },
  changeBadgeText: { color: colors.green, fontWeight: '600', fontSize: 14 },
  section: { fontSize: 18, fontWeight: '800', color: colors.text, paddingHorizontal: 16, marginTop: 8, marginBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 14 },
  rowPressed: { backgroundColor: colors.bgGrey },
  assetIcon: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  assetEmoji: { fontSize: 20, fontWeight: '700' },
  assetName: { fontSize: 16, fontWeight: '600', color: colors.text },
  assetSym: { fontSize: 13, color: colors.subtext, marginTop: 2 },
  assetPrice: { fontSize: 16, fontWeight: '700', color: colors.text },
  assetChange: { fontSize: 13, fontWeight: '600', marginTop: 2 },
});
