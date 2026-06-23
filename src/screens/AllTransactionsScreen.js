import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../components/AppText';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../theme';
import { accounts } from '../data/accounts';
import { transactions, groupTransactions, sumAmount } from '../data/transactions';
import { formatMoney, formatAmountSigned } from '../utils';
import TransactionRow from '../components/TransactionRow';

export default function AllTransactionsScreen({ navigation }) {
  const main = accounts[0];
  const grouped = groupTransactions(transactions);
  const full = formatMoney(main.balance, main.currency);
  const [intPart, rest] = full.split(',');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Retour + solde */}
        <Pressable style={styles.back} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </Pressable>
        <View style={styles.head}>
          <Text style={styles.balance}>
            {intPart}
            <Text style={styles.cents}>,{rest}</Text>
          </Text>
          <Text style={styles.balanceLabel}>Solde actuel</Text>
        </View>

        {/* Recherche + filtre */}
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color={colors.subtext} />
            <Text style={styles.searchText}>Rechercher</Text>
          </View>
          <Pressable style={styles.filterBtn}>
            <Ionicons name="options-outline" size={20} color={colors.text} />
          </Pressable>
        </View>

        {/* Groupes par jour */}
        {grouped.map(([section, items]) => (
          <View key={section} style={{ marginTop: 18 }}>
            <View style={styles.dayHead}>
              <Text style={styles.dayTitle}>{section.toLowerCase()}</Text>
              <Text style={styles.dayTotal}>{formatAmountSigned(sumAmount(items))}</Text>
            </View>
            <View style={styles.group}>
              {items.map((tx) => (
                <TransactionRow key={tx.id} tx={tx} onPress={() => navigation.navigate('TransactionDetail', { id: tx.id })} />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  back: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.card,
    alignItems: 'center', justifyContent: 'center', marginLeft: 12, marginTop: 4,
  },
  head: { paddingHorizontal: 20, marginTop: 12 },
  balance: { color: colors.text, fontSize: 38, fontWeight: '800', letterSpacing: -1 },
  cents: { fontSize: 24, fontWeight: '800', color: colors.subtext },
  balanceLabel: { color: colors.subtext, fontSize: 15, marginTop: 2 },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, marginTop: 18 },
  searchBar: {
    flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card,
    borderRadius: radius.pill, paddingHorizontal: 14, height: 44, gap: 8,
  },
  searchText: { color: colors.subtext, fontSize: 15 },
  filterBtn: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: colors.card,
    alignItems: 'center', justifyContent: 'center',
  },
  dayHead: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 8 },
  dayTitle: { color: colors.text, fontSize: 17, fontWeight: '700' },
  dayTotal: { color: colors.subtext, fontSize: 15, fontWeight: '600' },
  group: { backgroundColor: colors.card, marginHorizontal: 12, borderRadius: radius.lg, paddingVertical: 4 },
});
