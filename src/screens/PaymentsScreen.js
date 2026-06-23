import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../components/AppText';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../theme';

const CONTACTS = [
  { id: 'c1', name: 'Jean Dupont', initials: 'JD', color: '#0666EB' },
  { id: 'c2', name: 'Marie Leroy', initials: 'ML', color: '#EB57A2' },
  { id: 'c3', name: 'Sofia R.', initials: 'SR', color: '#16A06A' },
  { id: 'c4', name: 'Lucas B.', initials: 'LB', color: '#F2994A' },
  { id: 'c5', name: 'Emma D.', initials: 'ED', color: '#7C5CFC' },
];

const ACTIONS = [
  { key: 'send', label: 'Envoyer', icon: 'arrow-up' },
  { key: 'request', label: 'Demander', icon: 'arrow-down' },
  { key: 'split', label: 'Diviser', icon: 'pie-chart' },
  { key: 'bank', label: 'Virement', icon: 'business' },
];

export default function PaymentsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Paiements</Text>

        <View style={styles.actions}>
          {ACTIONS.map((a) => (
            <Pressable key={a.key} style={styles.action}>
              <View style={styles.actionCircle}>
                <Ionicons name={a.icon} size={24} color={colors.primary} />
              </View>
              <Text style={styles.actionLabel}>{a.label}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.section}>Contacts</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contactsRow}>
          {CONTACTS.map((c) => (
            <Pressable key={c.id} style={styles.contact}>
              <View style={[styles.contactAvatar, { backgroundColor: c.color }]}>
                <Text style={styles.contactInitials}>{c.initials}</Text>
              </View>
              <Text style={styles.contactName} numberOfLines={1}>
                {c.name.split(' ')[0]}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={styles.section}>Plus d'options</Text>
        {[
          { icon: 'qr-code-outline', label: 'Payer par QR code' },
          { icon: 'phone-portrait-outline', label: 'Recharge mobile' },
          { icon: 'gift-outline', label: 'Envoyer un cadeau' },
          { icon: 'people-outline', label: 'Groupes & dépenses partagées' },
        ].map((item) => (
          <Pressable key={item.label} style={({ pressed }) => [styles.listRow, pressed && styles.pressed]}>
            <View style={styles.listIcon}>
              <Ionicons name={item.icon} size={20} color={colors.text} />
            </View>
            <Text style={styles.listLabel}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.subtext} />
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  title: { fontSize: 30, fontWeight: '800', color: colors.text, paddingHorizontal: 16, paddingTop: 8 },
  actions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, paddingHorizontal: 8 },
  action: { alignItems: 'center', gap: 8 },
  actionCircle: {
    width: 58, height: 58, borderRadius: 29, backgroundColor: colors.bgGrey,
    alignItems: 'center', justifyContent: 'center',
  },
  actionLabel: { fontSize: 13, color: colors.text, fontWeight: '600' },
  section: { fontSize: 18, fontWeight: '800', color: colors.text, paddingHorizontal: 16, marginTop: 28, marginBottom: 10 },
  contactsRow: { paddingHorizontal: 16, gap: 18 },
  contact: { alignItems: 'center', width: 64 },
  contactAvatar: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  contactInitials: { color: '#fff', fontWeight: '700', fontSize: 18 },
  contactName: { fontSize: 13, color: colors.text, marginTop: 6 },
  listRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16, gap: 14 },
  pressed: { backgroundColor: colors.bgGrey },
  listIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.bgGrey, alignItems: 'center', justifyContent: 'center' },
  listLabel: { flex: 1, fontSize: 16, fontWeight: '600', color: colors.text },
});
