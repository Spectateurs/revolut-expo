import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../components/AppText';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../theme';

const REWARDS = [
  { id: 'r1', brand: 'Uber', offer: '15 % de RevPoints', icon: 'car', color: '#000' },
  { id: 'r2', brand: 'Booking.com', offer: '8 % de RevPoints', icon: 'bed', color: '#3D7BFF' },
  { id: 'r3', brand: 'Nike', offer: '5 % de RevPoints', icon: 'walk', color: '#F2994A' },
  { id: 'r4', brand: 'Spotify', offer: '3 mois offerts', icon: 'musical-notes', color: '#2FD25B' },
];

export default function RevPointsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>RevPoints</Text>

        <View style={styles.pointsCard}>
          <Ionicons name="diamond" size={30} color="#fff" />
          <Text style={styles.points}>2 480</Text>
          <Text style={styles.pointsLabel}>points cumulés</Text>
          <Pressable style={styles.redeemBtn}>
            <Text style={styles.redeemText}>Échanger mes points</Text>
          </Pressable>
        </View>

        <Text style={styles.section}>Gagnez plus de points</Text>
        {REWARDS.map((r) => (
          <Pressable key={r.id} style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
            <View style={[styles.brandIcon, { backgroundColor: r.color }]}>
              <Ionicons name={r.icon} size={20} color="#fff" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.brand}>{r.brand}</Text>
              <Text style={styles.offer}>{r.offer}</Text>
            </View>
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
  pointsCard: { backgroundColor: colors.primary, margin: 16, borderRadius: radius.lg, padding: 24, alignItems: 'center' },
  points: { color: '#fff', fontSize: 46, fontWeight: '800', marginTop: 10 },
  pointsLabel: { color: 'rgba(255,255,255,0.85)', fontSize: 14 },
  redeemBtn: { backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: radius.pill, paddingVertical: 12, paddingHorizontal: 24, marginTop: 18 },
  redeemText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  section: { fontSize: 18, fontWeight: '800', color: colors.text, paddingHorizontal: 16, marginTop: 8, marginBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 14 },
  rowPressed: { backgroundColor: colors.card },
  brandIcon: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  brand: { fontSize: 16, fontWeight: '600', color: colors.text },
  offer: { fontSize: 13, color: colors.subtext, marginTop: 2 },
});
