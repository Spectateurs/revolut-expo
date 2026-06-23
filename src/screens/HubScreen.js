import { View, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../components/AppText';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../theme';
import { user } from '../data/accounts';

const SERVICES = [
  { icon: 'shield-checkmark-outline', label: 'Assurances', color: '#16A06A' },
  { icon: 'phone-portrait-outline', label: 'eSIM voyage', color: '#0666EB' },
  { icon: 'trophy-outline', label: 'Cashback', color: '#F2994A' },
  { icon: 'cash-outline', label: 'Prêts', color: '#7C5CFC' },
  { icon: 'paw-outline', label: 'Animaux', color: '#EB57A2' },
  { icon: 'business-outline', label: 'Pro', color: '#16B1B1' },
];

export default function HubScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Hub</Text>

        {/* Profil */}
        <Pressable style={styles.profile}>
          <View style={styles.avatar}>
            <Image source={user.avatar} style={styles.avatarImg} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.profileName}>{user.firstName} {user.lastName}</Text>
            <Text style={styles.profilePlan}>Plan {user.plan}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.subtext} />
        </Pressable>

        <Text style={styles.section}>Services</Text>
        <View style={styles.grid}>
          {SERVICES.map((s) => (
            <Pressable key={s.label} style={styles.tile}>
              <View style={[styles.tileIcon, { backgroundColor: s.color + '22' }]}>
                <Ionicons name={s.icon} size={26} color={s.color} />
              </View>
              <Text style={styles.tileLabel}>{s.label}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.section}>Compte</Text>
        {[
          { icon: 'person-outline', label: 'Profil & sécurité' },
          { icon: 'card-outline', label: 'Mes cartes' },
          { icon: 'document-text-outline', label: 'Relevés' },
          { icon: 'help-buoy-outline', label: 'Aide' },
          { icon: 'log-out-outline', label: 'Se déconnecter' },
        ].map((item) => (
          <Pressable key={item.label} style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
            <View style={styles.rowIcon}>
              <Ionicons name={item.icon} size={20} color={colors.text} />
            </View>
            <Text style={styles.rowLabel}>{item.label}</Text>
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
  profile: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: colors.bgGrey, marginHorizontal: 16, marginTop: 16,
    padding: 16, borderRadius: radius.md,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontWeight: '700', fontSize: 18 },
  avatarImg: { width: 50, height: 50, borderRadius: 25 },
  profileName: { fontSize: 17, fontWeight: '700', color: colors.text },
  profilePlan: { fontSize: 14, color: colors.subtext, marginTop: 2 },
  section: { fontSize: 18, fontWeight: '800', color: colors.text, paddingHorizontal: 16, marginTop: 26, marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 10 },
  tile: { width: '33.33%', alignItems: 'center', marginBottom: 18, gap: 8 },
  tileIcon: { width: 60, height: 60, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  tileLabel: { fontSize: 13, color: colors.text, fontWeight: '600' },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16, gap: 14 },
  pressed: { backgroundColor: colors.bgGrey },
  rowIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.bgGrey, alignItems: 'center', justifyContent: 'center' },
  rowLabel: { flex: 1, fontSize: 16, fontWeight: '600', color: colors.text },
});
