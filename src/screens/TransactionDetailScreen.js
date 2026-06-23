import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../components/AppText';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, categories } from '../theme';
import { getTransaction } from '../data/transactions';
import { formatAmountSigned, formatLongDate } from '../utils';
import CategoryIcon from '../components/CategoryIcon';

// Libellé lisible pour le type d'opération (= "d'où vient" la transaction)
const TYPE_LABEL = {
  card: 'Paiement par carte',
  transfer_in: 'Virement reçu',
  transfer_out: 'Virement envoyé',
  topup: "Ajout d'argent",
  exchange: 'Conversion de devise',
  subscription: 'Abonnement / prélèvement',
};

function InfoRow({ icon, label, value, color }) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>
        <Ionicons name={icon} size={18} color={colors.subtext} />
      </View>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, color && { color }]} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

export default function TransactionDetailScreen({ route, navigation }) {
  const tx = getTransaction(route.params.id);
  if (!tx) return null;

  const cat = categories[tx.category] || categories.general;
  const isIncome = tx.amount > 0;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Barre du haut */}
      <View style={styles.topBar}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-down" size={26} color={colors.text} />
        </Pressable>
        <Pressable style={styles.backBtn}>
          <Ionicons name="ellipsis-horizontal" size={22} color={colors.text} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Bloc principal */}
        <View style={styles.hero}>
          <CategoryIcon category={tx.category} emoji={tx.emoji} size={72} />
          <Text style={styles.merchant}>{tx.merchant}</Text>
          <Text style={[styles.amount, isIncome && { color: colors.green }]}>
            {formatAmountSigned(tx.amount, tx.currency)}
          </Text>
          <View style={[styles.catPill, { backgroundColor: cat.color + '22' }]}>
            <Ionicons name={cat.icon} size={14} color={cat.color} />
            <Text style={[styles.catPillText, { color: cat.color }]}>{cat.label}</Text>
          </View>
        </View>

        {/* Origine de l'opération */}
        <Text style={styles.blockTitle}>D'où vient cette transaction</Text>
        <View style={styles.card}>
          <InfoRow
            icon="git-branch-outline"
            label="Type"
            value={TYPE_LABEL[tx.type] || 'Opération'}
          />
          <InfoRow
            icon="checkmark-circle-outline"
            label="Statut"
            value={tx.status}
            color={colors.green}
          />
          <InfoRow icon="card-outline" label="Moyen" value={tx.method} />
          <InfoRow icon="wallet-outline" label="Compte" value={tx.account} />
          <InfoRow icon="location-outline" label="Lieu" value={tx.location} />
          <InfoRow icon="calendar-outline" label="Date" value={formatLongDate(tx.date)} />
        </View>

        {/* Note */}
        {tx.note ? (
          <>
            <Text style={styles.blockTitle}>Note</Text>
            <View style={styles.card}>
              <View style={styles.noteRow}>
                <Ionicons name="document-text-outline" size={18} color={colors.subtext} />
                <Text style={styles.noteText}>{tx.note}</Text>
              </View>
            </View>
          </>
        ) : null}

        {/* Actions */}
        <View style={styles.actionsRow}>
          <Pressable style={styles.actionBtn}>
            <Ionicons name="pie-chart-outline" size={20} color={colors.primary} />
            <Text style={styles.actionBtnText}>Diviser</Text>
          </Pressable>
          <Pressable style={styles.actionBtn}>
            <Ionicons name="repeat-outline" size={20} color={colors.primary} />
            <Text style={styles.actionBtnText}>Récurrent</Text>
          </Pressable>
          <Pressable style={styles.actionBtn}>
            <Ionicons name="help-circle-outline" size={20} color={colors.primary} />
            <Text style={styles.actionBtnText}>Aide</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 4,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.bgGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: { alignItems: 'center', marginTop: 12, paddingHorizontal: 16 },
  merchant: { fontSize: 22, fontWeight: '800', color: colors.text, marginTop: 16 },
  amount: { fontSize: 38, fontWeight: '800', color: colors.text, marginTop: 8, letterSpacing: -1 },
  catPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
    marginTop: 14,
  },
  catPillText: { fontWeight: '700', fontSize: 13 },
  blockTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.subtext,
    paddingHorizontal: 20,
    marginTop: 28,
    marginBottom: 10,
  },
  card: {
    backgroundColor: colors.bgGrey,
    marginHorizontal: 16,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  infoIcon: { width: 28 },
  infoLabel: { color: colors.subtext, fontSize: 15, width: 80 },
  infoValue: { flex: 1, textAlign: 'right', color: colors.text, fontSize: 15, fontWeight: '600' },
  noteRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 14 },
  noteText: { color: colors.text, fontSize: 15 },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 28,
    paddingHorizontal: 16,
  },
  actionBtn: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: colors.bgGrey,
    borderRadius: radius.md,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 6,
  },
  actionBtnText: { color: colors.primary, fontWeight: '600', fontSize: 13 },
});
