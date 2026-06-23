import { View, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../components/AppText';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius } from '../theme';
import { accounts, user, learnMore, cards, watchlist, challenges } from '../data/accounts';
import { transactions } from '../data/transactions';
import { formatMoney } from '../utils';
import TransactionRow from '../components/TransactionRow';
import CardThumb from '../components/CardThumb';
import SpendingChart from '../components/SpendingChart';
import PressableScale from '../components/PressableScale';
import { IconAddMoney, IconExchange, IconBank, IconMore } from '../components/ActionIcons';
import { IconSafe, IconWallet, IconMoneyBag, IconCoins, IconBitcoin, IconLink, IconLoan } from '../components/ProductIcons';

const ACTIONS = [
  { key: 'add', label: "Ajouter de\nl'argent", Icon: IconAddMoney },
  { key: 'between', label: 'Entre mes\ncomptes', Icon: IconExchange },
  { key: 'info', label: 'Informations', Icon: IconBank },
  { key: 'more', label: 'Plus', Icon: IconMore },
];

const PRODUCTS = [
  { id: 'cash', label: 'Espèces', sub: null, amount: '2 740 878 €', Icon: IconCoins, size: 18, color: '#6C78F0' },
  { id: 'savings', label: 'Épargne et fonds', sub: 'Gagnez du rendement sur v...', Icon: IconSafe, size: 22, color: '#E0814E' },
  { id: 'loan', label: 'Prêt', sub: 'Obtenez un prêt allant jusqu...', Icon: IconLoan, size: 22, color: '#C3D94B' },
  { id: 'crypto', label: 'Cryptos', sub: 'Investir dès 1 € seulement', Icon: IconBitcoin, size: 22, color: '#B45AE6' },
  { id: 'linked', label: 'Lié(s)', sub: 'Liez des comptes externes.', Icon: IconLink, size: 20, color: '#59D0DC' },
];

const LEARN_ICONS = { l1: IconSafe, l2: IconWallet, l3: IconMoneyBag };

function SectionHeader({ title }) {
  return (
    <Pressable style={styles.secHead}>
      <Text style={styles.secTitle}>{title}</Text>
      <Ionicons name="chevron-forward" size={16} color={colors.subtext} />
    </Pressable>
  );
}

export default function HomeScreen({ navigation }) {
  const main = accounts[0];
  const homeTx = transactions.slice(0, 4);

  // Solde affiché directement (pas d'animation de décompte, comme la vraie app)
  const full = formatMoney(main.balance, main.currency);
  const [intPart, rest] = full.split(',');

  function openTx(tx) {
    navigation.navigate('TransactionDetail', { id: tx.id });
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View pointerEvents="none" style={styles.bg}>
        {/* faisceau chaud venant du coin haut-droit (lumière naturelle), le reste noir */}
        <LinearGradient
          colors={['rgba(228,214,188,0.55)', 'rgba(120,108,86,0.10)', 'transparent']}
          locations={[0, 0.34, 0.66]}
          start={{ x: 1, y: -0.05 }}
          end={{ x: 0.12, y: 0.85 }}
          style={StyleSheet.absoluteFill}
        />
        {/* prolongement chaud très doux sur le bord droit */}
        <LinearGradient
          colors={['transparent', 'rgba(205,188,156,0.15)', 'transparent']}
          locations={[0, 0.5, 1]}
          start={{ x: 0.96, y: 0.1 }}
          end={{ x: 0.5, y: 0.72 }}
          style={StyleSheet.absoluteFill}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        {/* En-tête */}
        <View style={styles.header}>
          <Pressable style={styles.avatar}>
            <Image source={user.avatar} style={styles.avatarImg} />
            <View style={styles.redDot} />
          </Pressable>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color={colors.subtext} />
            <Text style={styles.searchText}>Rechercher</Text>
          </View>
          <Pressable style={styles.iconBtn}>
            <Ionicons name="stats-chart" size={19} color={colors.text} />
          </Pressable>
          <Pressable style={styles.iconBtn}>
            <Ionicons name="card" size={19} color={colors.text} />
          </Pressable>
        </View>

        {/* Solde */}
        <View style={styles.balanceBlock}>
          <Text style={styles.balanceLabel}>Personnel · {main.currency}</Text>
          <Text style={styles.balance} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.6}>
            {intPart}
            <Text style={styles.balanceCents}>,{rest}</Text>
          </Text>
          <View style={styles.ibanRow}>
            <IconBank size={16} color={colors.subtext} />
            <Text style={styles.ibanText}>{main.iban}</Text>
          </View>
          <Pressable style={styles.accountPill}>
            <Text style={styles.accountPillText}>Comptes et Portefeuilles</Text>
          </Pressable>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          {ACTIONS.map((a) => (
            <PressableScale key={a.key} style={styles.action} scaleTo={0.9}>
              <View style={styles.actionCircle}>
                <a.Icon size={26} color={colors.text} />
              </View>
              <Text
                style={styles.actionLabel}
                numberOfLines={a.label.includes('\n') ? 2 : 1}
                adjustsFontSizeToFit
                minimumFontScale={0.85}
              >
                {a.label}
              </Text>
            </PressableScale>
          ))}
        </View>

        {/* Parrainage */}
        <View style={styles.promo}>
          <Pressable style={styles.promoClose} hitSlop={10}>
            <Ionicons name="close" size={16} color={colors.subtext} />
          </Pressable>
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text style={styles.promoTitle} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.9}>
              Invitez des amis et gagnez
            </Text>
            <Text style={styles.promoSub} numberOfLines={2}>
              60 € à la clé par parrainage d'ici au 23 juin. Voir CG.
            </Text>
          </View>
          <View style={styles.cardsArt}>
            {/* Pochette du portefeuille (claire, comme la photo réelle) */}
            <View style={[styles.walletSleeve, { transform: [{ rotate: '9deg' }] }]} />
            {/* Carte Revolut qui dépasse, dégradé bleu→violet→rose→orange */}
            <LinearGradient
              colors={['#1F6FEB', '#7C4DFF', '#E0398A', '#F6A04D']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.walletCard, { transform: [{ rotate: '-7deg' }] }]}
            >
              <Text style={styles.walletBrand}>Revolut</Text>
            </LinearGradient>
          </View>
        </View>
        <View style={styles.carouselDots}>
          {[0, 1, 2, 3, 4].map((i) => (
            <View key={i} style={[styles.cDot, i === 0 && styles.cDotActive]} />
          ))}
        </View>

        {/* Transactions (widget groupé) */}
        <View style={styles.txCard}>
          {homeTx.map((tx) => (
            <TransactionRow key={tx.id} tx={tx} onPress={() => openTx(tx)} />
          ))}
          <Pressable style={styles.seeAllBtn} onPress={() => navigation.navigate('AllTransactions')}>
            <Text style={styles.seeAllText}>Tout afficher</Text>
          </Pressable>
        </View>

        {/* En savoir plus */}
        <View style={styles.card}>
          <SectionHeader title="En savoir plus" />
          {learnMore.map((item, i) => {
            const LearnIcon = LEARN_ICONS[item.id];
            return (
            <View key={item.id} style={[styles.learnRow, i > 0 && styles.rowBorder]}>
              <View style={styles.squircle}>
                <LearnIcon size={24} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.learnTitle}>{item.title}</Text>
                <Text style={styles.learnSub}>{item.sub}</Text>
              </View>
              <Pressable style={styles.pillBtn}>
                <Text style={styles.pillBtnText}>{item.action}</Text>
              </Pressable>
            </View>
            );
          })}
          <Pressable style={styles.whiteBtn}>
            <Text style={styles.whiteBtnText}>Tous les produits et comptes</Text>
          </Pressable>
        </View>

        {/* Cartes */}
        <View style={styles.card}>
          <SectionHeader title="Cartes" />
          <View style={styles.cardsRow}>
            {cards.map((c) => (
              <CardThumb key={c.id} card={c} />
            ))}
          </View>
          <View style={styles.carouselDots}>
            {[0, 1, 2].map((i) => (
              <View key={i} style={[styles.cDot, i === 0 && styles.cDotActive]} />
            ))}
          </View>
        </View>

        {/* Patrimoine total */}
        <View style={styles.card}>
          <SectionHeader title="Patrimoine total" />
          <Text style={styles.wealth}>2 740 878 €</Text>
          {PRODUCTS.map((p, i) => (
            <Pressable key={p.id} style={[styles.productRow, i > 0 && styles.rowBorder]}>
              <View style={[styles.productIcon, { backgroundColor: p.color }]}>
                <p.Icon size={p.size} color="#fff" bg={p.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.productLabel}>{p.label}</Text>
                {p.sub && <Text style={styles.productSub} numberOfLines={1}>{p.sub}</Text>}
              </View>
              {p.amount ? (
                <Text style={styles.productAmount}>{p.amount}</Text>
              ) : (
                <Ionicons name="chevron-forward" size={18} color={colors.subtext} />
              )}
            </Pressable>
          ))}
        </View>

        {/* Dépenses du mois (cliquable → analyse) */}
        <Pressable style={styles.card} onPress={() => navigation.navigate('Analytics')}>
          <View style={styles.spendTop}>
            <View style={styles.spendLabelRow}>
              <Text style={styles.spendLabel}>Dépenses du mois</Text>
              <Ionicons name="chevron-forward" size={15} color={colors.subtext} />
            </View>
            <Text style={styles.spendAxis}>10,07k €</Text>
          </View>
          <View style={styles.spendRow}>
            <Text style={styles.spendValue}>10 065 €</Text>
            <Ionicons name="caret-up" size={13} color={colors.red} />
            <Text style={styles.spendDelta}>10 054 €</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <SpendingChart />
          </View>
          <View style={styles.spendDays}>
            {['1', '6', '11', '16', '21', '26', '30'].map((d) => (
              <Text key={d} style={styles.spendDay}>{d}</Text>
            ))}
          </View>
        </Pressable>

        {/* Liste de surveillance */}
        <View style={styles.card}>
          <SectionHeader title="Liste de surveillance" />
          {watchlist.map((w, i) => {
            const up = w.change >= 0;
            return (
              <View key={w.id} style={[styles.watchRow, i > 0 && styles.rowBorder]}>
                <Image source={w.logo} style={styles.watchBadge} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.watchName} numberOfLines={2}>{w.name}</Text>
                  <Text style={styles.watchSym}>{w.sym}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.watchPrice}>{w.price}</Text>
                  <Text style={[styles.watchChange, { color: up ? colors.green : colors.red }]}>
                    {up ? '▲' : '▼'} {Math.abs(w.change)} %
                  </Text>
                </View>
              </View>
            );
          })}
          <Pressable style={styles.seeAllBtn}>
            <Text style={styles.seeAllText}>Tout afficher</Text>
          </Pressable>
        </View>

        {/* Défis */}
        <View style={styles.card}>
          <SectionHeader title="Défis" />
          {challenges.map((c) => (
            <View key={c.id} style={styles.challengeRow}>
              <Image source={c.image} style={styles.challengeIcon} />
              <View style={{ flex: 1 }}>
                <Text style={styles.learnTitle}>{c.title}</Text>
                <Text style={styles.learnSub}>{c.sub}</Text>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${c.progress * 100}%` }]} />
                </View>
              </View>
              <View style={styles.daysPill}>
                <Text style={styles.daysPillText}>{c.days}</Text>
              </View>
            </View>
          ))}
          <Pressable style={styles.seeAllBtn}>
            <Text style={styles.seeAllText}>Afficher tout</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  bg: { position: 'absolute', top: 0, left: 0, right: 0, height: 800 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 8, gap: 10 },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.card2, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  avatarImg: { width: 42, height: 42, borderRadius: 21 },
  redDot: { position: 'absolute', top: -1, right: -1, width: 11, height: 11, borderRadius: 6, backgroundColor: colors.red, borderWidth: 2, borderColor: colors.bg },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#1C1C1EDD', borderRadius: radius.pill, paddingHorizontal: 14, height: 42, gap: 8 },
  searchText: { color: colors.subtext, fontSize: 15 },
  iconBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#1C1C1EDD', alignItems: 'center', justifyContent: 'center' },
  balanceBlock: { alignItems: 'center', marginTop: 36 },
  balanceLabel: { color: '#D5D5DA', fontSize: 15, fontWeight: '500' },
  // Même police que le montant "Patrimoine total" : Aeonik-Bold (graisse 800)
  balance: { color: colors.text, fontSize: 44, fontWeight: '800', marginTop: 8, letterSpacing: -1 },
  balanceCents: { fontSize: 28, fontWeight: '800' },
  ibanRow: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 8 },
  ibanText: { color: colors.subtext, fontSize: 15, letterSpacing: 0.2 },
  accountPill: { backgroundColor: '#1C1C1EE6', borderRadius: radius.pill, paddingHorizontal: 18, paddingVertical: 10, marginTop: 22 },
  accountPillText: { color: colors.text, fontWeight: '600', fontSize: 15 },
  actions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 26, paddingHorizontal: 6 },
  action: { alignItems: 'center', gap: 8, width: 84 },
  actionCircle: { width: 62, height: 62, borderRadius: 31, backgroundColor: '#1C1C1ECC', alignItems: 'center', justifyContent: 'center' },
  actionLabel: { fontSize: 12.5, color: colors.text, fontWeight: '500', textAlign: 'center', lineHeight: 16 },
  promo: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, marginHorizontal: 16, marginTop: 26, borderRadius: radius.lg, paddingVertical: 16, paddingHorizontal: 18, minHeight: 94, overflow: 'hidden' },
  promoClose: { position: 'absolute', top: 12, right: 12, zIndex: 2 },
  promoTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  promoSub: { color: colors.subtext, fontSize: 13.5, marginTop: 6, lineHeight: 18 },
  cardsArt: { width: 92, height: 72, justifyContent: 'center', alignItems: 'center' },
  walletSleeve: { position: 'absolute', width: 58, height: 66, borderRadius: 9, backgroundColor: '#E7E4DD', right: 18, top: 4 },
  walletCard: { position: 'absolute', width: 42, height: 62, borderRadius: 7, right: 30, top: -2, padding: 5, justifyContent: 'flex-end' },
  walletBrand: { color: '#fff', fontSize: 8, fontWeight: '700' },
  carouselDots: { flexDirection: 'row', justifyContent: 'center', gap: 5, marginTop: 12 },
  cDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: '#3A3A3E' },
  cDotActive: { backgroundColor: '#9A9AA0', width: 6, height: 6, borderRadius: 3 },
  txCard: { backgroundColor: colors.card, marginHorizontal: 16, marginTop: 16, borderRadius: radius.lg, paddingVertical: 6, overflow: 'hidden' },
  seeAllBtn: { alignItems: 'center', paddingVertical: 14 },
  seeAllText: { color: colors.text, fontSize: 16, fontWeight: '700' },
  card: { backgroundColor: colors.card, marginHorizontal: 16, marginTop: 16, borderRadius: radius.lg, paddingHorizontal: 14, paddingVertical: 6, overflow: 'hidden' },
  secHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
  secTitle: { color: colors.text, fontSize: 17, fontWeight: '700' },
  rowBorder: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
  learnRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14 },
  squircle: { width: 42, height: 42, borderRadius: 13, backgroundColor: '#2C2C2E', alignItems: 'center', justifyContent: 'center' },
  learnTitle: { color: colors.text, fontSize: 16, fontWeight: '600' },
  learnSub: { color: colors.subtext, fontSize: 13, marginTop: 2 },
  pillBtn: { backgroundColor: '#3A3A3E', borderRadius: radius.pill, paddingHorizontal: 18, paddingVertical: 9 },
  pillBtnText: { color: colors.text, fontWeight: '600', fontSize: 14 },
  whiteBtn: { backgroundColor: '#fff', borderRadius: radius.pill, paddingVertical: 14, alignItems: 'center', marginVertical: 12, marginHorizontal: 2 },
  whiteBtnText: { color: '#000', fontWeight: '700', fontSize: 15 },
  cardsRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 2 },
  wealth: { color: colors.text, fontSize: 30, fontWeight: '800', marginBottom: 8, marginTop: 2 },
  productRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 13 },
  productIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  productLabel: { color: colors.text, fontSize: 16, fontWeight: '600' },
  productSub: { color: colors.subtext, fontSize: 13, marginTop: 2 },
  productAmount: { color: colors.text, fontSize: 15, fontWeight: '600' },
  spendTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12 },
  spendLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  spendLabel: { color: colors.subtext, fontSize: 14 },
  spendAxis: { color: colors.subtext, fontSize: 12 },
  spendRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 4 },
  spendValue: { color: colors.text, fontSize: 26, fontWeight: '800' },
  spendDelta: { color: colors.red, fontSize: 15, fontWeight: '600' },
  spendDays: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6, paddingBottom: 10 },
  spendDay: { color: colors.subtext, fontSize: 11 },
  watchRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14 },
  watchBadge: { width: 42, height: 42, borderRadius: 21 },
  // Prix/nom : pas de gras ici (police régulière), conformément à la vraie app
  watchName: { color: colors.text, fontSize: 16.5, fontWeight: '400' },
  watchSym: { color: colors.subtext, fontSize: 13.5, marginTop: 2 },
  watchPrice: { color: colors.text, fontSize: 16.5, fontWeight: '400' },
  watchChange: { fontSize: 14, fontWeight: '400', marginTop: 2 },
  challengeRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14 },
  challengeIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  progressTrack: { height: 4, borderRadius: 2, backgroundColor: '#3A3A3E', marginTop: 10, overflow: 'hidden' },
  progressFill: { height: 4, borderRadius: 2, backgroundColor: colors.purple },
  daysPill: { backgroundColor: '#3A3A3E', borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 6, alignSelf: 'flex-start' },
  daysPillText: { color: colors.text, fontSize: 13, fontWeight: '600' },
});
