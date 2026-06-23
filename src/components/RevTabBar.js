// Barre d'onglets flottante, façon Revolut : barre arrondie sombre, onglet actif
// surligné par une pastille plus claire. Icônes = vrais glyphes Revolut détourés
// (assets/tab-*.png), teintés dynamiquement (blanc = actif, gris = inactif).
import { View, Pressable, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Text from './AppText';
import { colors } from '../theme';

const ICONS = {
  Accueil: require('../../assets/tab-accueil.png'),
  Investir: require('../../assets/tab-investir.png'),
  Virements: require('../../assets/tab-virements.png'),
  Cryptos: require('../../assets/tab-cryptos.png'),
  RevPoints: require('../../assets/tab-revpoints.png'),
};

export default function RevTabBar({ state, navigation }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom - 10, 8) }]}>
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const color = focused ? colors.text : colors.subtext;

          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
          };

          return (
            <Pressable key={route.key} style={styles.item} onPress={onPress}>
              <View style={[styles.pill, focused && styles.pillActive]}>
                <View style={styles.iconBox}>
                  <Image
                    source={ICONS[route.name]}
                    style={{ width: 26, height: 20, tintColor: color }}
                    resizeMode="contain"
                  />
                </View>
                <Text style={[styles.label, { color }]} numberOfLines={1}>
                  {route.name}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { backgroundColor: 'transparent', paddingHorizontal: 10 },
  bar: {
    flexDirection: 'row',
    backgroundColor: '#18181B',
    borderRadius: 28,
    paddingHorizontal: 6,
    paddingVertical: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  item: { flex: 1, alignItems: 'center' },
  pill: { alignSelf: 'stretch', alignItems: 'center', gap: 2, paddingVertical: 4, borderRadius: 16 },
  pillActive: { backgroundColor: 'rgba(120,120,128,0.26)' },
  iconBox: { height: 21, justifyContent: 'center', alignItems: 'center' },
  label: { fontSize: 10, fontWeight: '600' },
});
