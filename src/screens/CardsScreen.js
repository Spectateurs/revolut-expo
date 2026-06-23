import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius } from '../theme';
import { user } from '../data/accounts';

export default function CardsScreen() {
  const [frozen, setFrozen] = useState(false);
  const [online, setOnline] = useState(true);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Cartes</Text>

        {/* Visuel de la carte */}
        <LinearGradient
          colors={frozen ? ['#5B6573', '#2A2A33'] : ['#7C5CFC', '#0666EB']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.cardTop}>
            <Text style={styles.cardPlan}>{user.plan}</Text>
            {frozen && (
              <View style={styles.frozenBadge}>
                <Ionicons name="snow" size={14} color="#fff" />
                <Text style={styles.frozenText}>Gelée</Text>
              </View>
            )}
          </View>
          <Text style={styles.cardNumber}>•••• •••• •••• 5432</Text>
          <View style={styles.cardBottom}>
            <View>
              <Text style={styles.cardName}>{user.firstName} {user.lastName}</Text>
              <Text style={styles.cardExp}>08/29</Text>
            </View>
            <Text style={styles.cardBrand}>VISA</Text>
          </View>
        </LinearGradient>

        {/* Actions rapides carte */}
        <View style={styles.quickRow}>
          <Pressable style={styles.quick} onPress={() => setFrozen((f) => !f)}>
            <View style={[styles.quickCircle, frozen && { backgroundColor: colors.primary + '22' }]}>
              <Ionicons name={frozen ? 'sunny-outline' : 'snow-outline'} size={22} color={colors.primary} />
            </View>
            <Text style={styles.quickLabel}>{frozen ? 'Dégeler' : 'Geler'}</Text>
          </Pressable>
          <Pressable style={styles.quick}>
            <View style={styles.quickCircle}>
              <Ionicons name="eye-outline" size={22} color={colors.primary} />
            </View>
            <Text style={styles.quickLabel}>Détails</Text>
          </Pressable>
          <Pressable style={styles.quick}>
            <View style={styles.quickCircle}>
              <Ionicons name="settings-outline" size={22} color={colors.primary} />
            </View>
            <Text style={styles.quickLabel}>Réglages</Text>
          </Pressable>
          <Pressable style={styles.quick}>
            <View style={styles.quickCircle}>
              <Ionicons name="add" size={22} color={colors.primary} />
            </View>
            <Text style={styles.quickLabel}>Nouvelle</Text>
          </Pressable>
        </View>

        {/* Réglages */}
        <View style={styles.settingsCard}>
          <View style={styles.settingRow}>
            <Ionicons name="globe-outline" size={20} color={colors.text} />
            <Text style={styles.settingLabel}>Paiements en ligne</Text>
            <Switch value={online} onValueChange={setOnline} trackColor={{ true: colors.primary }} />
          </View>
          <View style={[styles.settingRow, styles.settingBorder]}>
            <Ionicons name="snow-outline" size={20} color={colors.text} />
            <Text style={styles.settingLabel}>Carte gelée</Text>
            <Switch value={frozen} onValueChange={setFrozen} trackColor={{ true: colors.primary }} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  title: { fontSize: 30, fontWeight: '800', color: colors.text, paddingHorizontal: 16, paddingTop: 8 },
  card: {
    height: 210,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: radius.lg,
    padding: 22,
    justifyContent: 'space-between',
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardPlan: { color: 'rgba(255,255,255,0.9)', fontWeight: '700', fontSize: 15 },
  frozenBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(0,0,0,0.25)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  frozenText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  cardNumber: { color: '#fff', fontSize: 22, fontWeight: '600', letterSpacing: 2 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  cardName: { color: '#fff', fontSize: 15, fontWeight: '600' },
  cardExp: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 4 },
  cardBrand: { color: '#fff', fontSize: 22, fontWeight: '800', fontStyle: 'italic' },
  quickRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 22, paddingHorizontal: 8 },
  quick: { alignItems: 'center', gap: 8 },
  quickCircle: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.bgGrey, alignItems: 'center', justifyContent: 'center' },
  quickLabel: { fontSize: 13, color: colors.text, fontWeight: '600' },
  settingsCard: { backgroundColor: colors.bgGrey, marginHorizontal: 16, marginTop: 26, borderRadius: radius.md, paddingHorizontal: 16 },
  settingRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14 },
  settingBorder: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
  settingLabel: { flex: 1, fontSize: 16, fontWeight: '600', color: colors.text },
});
