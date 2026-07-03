import { useRef } from 'react';
import { View, StyleSheet, Pressable, Animated, Image } from 'react-native';
import Text from './AppText';
import { Ionicons } from '@expo/vector-icons';
import CategoryIcon from './CategoryIcon';
import MerchantLogo, { hasBrand } from './MerchantLogo';
import { colors, categories } from '../theme';
import { formatAmountSigned, formatTime, formatRelativeDay } from '../utils';

const CONTACT_COLORS = ['#2FD25B', '#3D7BFF', '#9B7BFF', '#EB57A2', '#F2994A', '#16C5C5'];

function initialsOf(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');
}
function colorFor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return CONTACT_COLORS[Math.abs(h) % CONTACT_COLORS.length];
}

// Avatar de contact : photo OU cercle coloré + initiales, + pastille flèche (envoyé/reçu)
function ContactAvatar({ name, incoming, photo, initials, bg }) {
  return (
    <View style={styles.avatarWrap}>
      {photo ? (
        <Image source={photo} style={styles.contactCircle} />
      ) : (
        <View style={[styles.contactCircle, { backgroundColor: bg || colorFor(name) }]}>
          <Text style={styles.contactInitials}>{initials || initialsOf(name)}</Text>
        </View>
      )}
      <View style={styles.badge}>
        <Ionicons name={incoming ? 'arrow-back' : 'arrow-forward'} size={12} color="#111" />
      </View>
    </View>
  );
}

function Leading({ tx }) {
  if (tx.type === 'transfer_in' || tx.type === 'transfer_out') {
    return <ContactAvatar name={tx.merchant} incoming={tx.type === 'transfer_in'} photo={tx.photo} initials={tx.initials} bg={tx.avatarBg} />;
  }
  if (tx.photo) return <Image source={tx.photo} style={styles.logoImg} />;
  if (tx.brand && hasBrand(tx.brand)) return <MerchantLogo brand={tx.brand} size={46} />;
  return <CategoryIcon category={tx.category} emoji={tx.emoji} size={46} />;
}

export default function TransactionRow({ tx, onPress }) {
  const isIncome = tx.amount > 0;
  const scale = useRef(new Animated.Value(1)).current;
  const animate = (to) =>
    Animated.spring(scale, { toValue: to, useNativeDriver: true, speed: 50, bounciness: 4 }).start();

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => animate(0.97)}
      onPressOut={() => animate(1)}
    >
      <Animated.View style={[styles.row, { transform: [{ scale }] }]}>
        <Leading tx={tx} />
        <View style={styles.middle}>
          <Text style={styles.merchant} numberOfLines={1}>
            {tx.merchant}
          </Text>
          <Text style={styles.sub} numberOfLines={1}>
            {formatRelativeDay(tx.date)}, {formatTime(tx.date)}
          </Text>
        </View>
        <Text style={[styles.amount, isIncome && { color: colors.green }]}>
          {formatAmountSigned(tx.amount, tx.currency)}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 11, paddingHorizontal: 16, borderRadius: 14 },
  middle: { flex: 1, marginLeft: 12 },
  merchant: { fontSize: 16, fontWeight: '500', color: colors.text },
  // Date / heure sous chaque transaction : gris clair demandé (#e1e0de)
  sub: { fontSize: 13.5, color: '#E1E0DE', marginTop: 2 },
  sub2: { fontSize: 13.5, color: colors.subtext, marginTop: 1 },
  amount: { fontSize: 16, fontWeight: '500', color: colors.text, marginLeft: 8 },
  avatarWrap: { width: 46, height: 46 },
  contactCircle: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  logoImg: { width: 46, height: 46, borderRadius: 23 },
  contactInitials: { color: '#fff', fontWeight: '700', fontSize: 16 },
  badge: {
    position: 'absolute', right: -1, bottom: -1, width: 20, height: 20, borderRadius: 10,
    backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: colors.bg,
  },
});
