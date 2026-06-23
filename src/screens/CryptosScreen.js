import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../components/AppText';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../theme';
import { formatMoney } from '../utils';

const COINS = [
  { id: 'btc', name: 'Bitcoin', sym: 'BTC', icon: 'logo-bitcoin', price: 61250.4, change: +2.4, color: '#F7931A' },
  { id: 'eth', name: 'Ethereum', sym: 'ETH', icon: 'diamond', price: 3380.12, change: -1.1, color: '#627EEA' },
  { id: 'sol', name: 'Solana', sym: 'SOL', icon: 'flash', price: 148.7, change: +5.3, color: '#9B7BFF' },
  { id: 'ada', name: 'Cardano', sym: 'ADA', icon: 'water', price: 0.45, change: -0.7, color: '#16C5C5' },
  { id: 'doge', name: 'Dogecoin', sym: 'DOGE', icon: 'paw', price: 0.16, change: +12.1, color: '#F2994A' },
];

export default function CryptosScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Cryptos</Text>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Solde crypto</Text>
          <Text style={styles.balanceValue}>{formatMoney(842.19)}</Text>
          <View style={styles.changeRow}>
            <Ionicons name="trending-up" size={14} color={colors.green} />
            <Text style={styles.changeText}>+18,40 € (+2,2 %) aujourd'hui</Text>
          </View>
          <Pressable style={styles.buyBtn}>
            <Text style={styles.buyText}>Acheter des cryptos</Text>
          </Pressable>
        </View>

        <Text style={styles.section}>Tendances</Text>
        {COINS.map((c) => {
          const up = c.change >= 0;
          return (
            <Pressable key={c.id} style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
              <View style={[styles.coinIcon, { backgroundColor: c.color + '33' }]}>
                <Ionicons name={c.icon} size={22} color={c.color} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.coinName}>{c.name}</Text>
                <Text style={styles.coinSym}>{c.sym}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.coinPrice}>{formatMoney(c.price)}</Text>
                <Text style={[styles.coinChange, { color: up ? colors.green : colors.red }]}>
                  {up ? '+' : ''}
                  {c.change} %
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
  balanceCard: { backgroundColor: colors.card, margin: 16, borderRadius: radius.lg, padding: 20 },
  balanceLabel: { color: colors.subtext, fontSize: 14 },
  balanceValue: { color: colors.text, fontSize: 34, fontWeight: '800', marginTop: 6 },
  changeRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  changeText: { color: colors.green, fontWeight: '600', fontSize: 14 },
  buyBtn: { backgroundColor: colors.primary, borderRadius: radius.pill, paddingVertical: 13, alignItems: 'center', marginTop: 16 },
  buyText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  section: { fontSize: 18, fontWeight: '800', color: colors.text, paddingHorizontal: 16, marginTop: 8, marginBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 14 },
  rowPressed: { backgroundColor: colors.card },
  coinIcon: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  coinName: { fontSize: 16, fontWeight: '600', color: colors.text },
  coinSym: { fontSize: 13, color: colors.subtext, marginTop: 2 },
  coinPrice: { fontSize: 16, fontWeight: '700', color: colors.text },
  coinChange: { fontSize: 13, fontWeight: '600', marginTop: 2 },
});
