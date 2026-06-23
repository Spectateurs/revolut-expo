import { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Animated,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../components/AppText';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme';
import { user } from '../data/accounts';

const PIN_LENGTH = 6;
const CORRECT_PIN = '123456';

export default function PasscodeScreen({ navigation }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const shake = useRef(new Animated.Value(0)).current;

  function unlock() {
    navigation.replace('Main');
  }

  function triggerShake() {
    setError(true);
    Animated.sequence([
      Animated.timing(shake, { toValue: 12, duration: 55, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -12, duration: 55, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 8, duration: 55, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 0, duration: 55, useNativeDriver: true }),
    ]).start(() => {
      setPin('');
      setError(false);
    });
  }

  function press(digit) {
    if (pin.length >= PIN_LENGTH) return;
    const next = pin + digit;
    setPin(next);
    if (next.length === PIN_LENGTH) {
      setTimeout(() => {
        if (next === CORRECT_PIN) unlock();
        else triggerShake();
      }, 130);
    }
  }

  function backspace() {
    setPin((p) => p.slice(0, -1));
  }

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'face', '0', 'del'];

  return (
    <View style={styles.root}>
      {/* Fond noir + reflet chaud (style iOS/Revolut) */}
      <LinearGradient
        colors={['#1a1410', '#050505', '#000000', '#241a0f']}
        locations={[0, 0.32, 0.68, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {/* Halo chaud sur le bord droit */}
      <LinearGradient
        colors={['transparent', 'rgba(150,100,45,0.18)']}
        start={{ x: 0, y: 0.4 }}
        end={{ x: 1, y: 0.9 }}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" />

        <View style={styles.top}>
          <View style={styles.avatar}>
            <Image source={user.avatar} style={styles.avatarImg} />
          </View>
          <Text style={styles.hello}>Bonjour, {user.firstName}</Text>

          <Animated.View style={[styles.dots, { transform: [{ translateX: shake }] }]}>
            {Array.from({ length: PIN_LENGTH }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i < pin.length && styles.dotFilled,
                  error && styles.dotError,
                ]}
              />
            ))}
          </Animated.View>
        </View>

        <View style={styles.keypad}>
          {keys.map((k) => {
            if (k === 'face') {
              return (
                <View key={k} style={styles.keyWrap}>
                  <Pressable
                    style={({ pressed }) => [styles.key, styles.keyGhost, pressed && styles.keyPressed]}
                    onPress={unlock}
                  >
                    <MaterialCommunityIcons name="face-recognition" size={34} color="#fff" />
                  </Pressable>
                </View>
              );
            }
            if (k === 'del') {
              // Affiché uniquement quand on a commencé à taper (comme iOS)
              return (
                <View key={k} style={styles.keyWrap}>
                  {pin.length > 0 ? (
                    <Pressable
                      style={({ pressed }) => [styles.key, styles.keyGhost, pressed && styles.keyPressed]}
                      onPress={backspace}
                    >
                      <Ionicons name="backspace-outline" size={30} color="#fff" />
                    </Pressable>
                  ) : (
                    <View style={styles.key} />
                  )}
                </View>
              );
            }
            return (
              <View key={k} style={styles.keyWrap}>
                <Pressable
                  style={({ pressed }) => [styles.key, styles.keyGhost, pressed && styles.keyPressed]}
                  onPress={() => press(k)}
                >
                  <Text style={styles.keyText}>{k}</Text>
                </Pressable>
              </View>
            );
          })}
        </View>

        <Pressable style={styles.forgot}>
          <Text style={styles.forgotText}>Code d'accès oublié ?</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const KEY = 78;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  safe: { flex: 1, justifyContent: 'space-between' },
  top: { alignItems: 'center', marginTop: 70 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#171717',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
  },
  avatarImg: { width: 72, height: 72, borderRadius: 36 },
  hello: { color: '#fff', fontSize: 26, fontWeight: '700', marginTop: 22 },
  dots: { flexDirection: 'row', marginTop: 46 },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.32)',
    marginHorizontal: 11,
  },
  dotFilled: { backgroundColor: '#fff' },
  dotError: { backgroundColor: colors.red },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignSelf: 'center',
    width: KEY * 3 + 60,
  },
  keyWrap: {
    width: '33.33%',
    alignItems: 'center',
    marginVertical: 9,
  },
  key: {
    width: KEY,
    height: KEY,
    borderRadius: KEY / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyGhost: { backgroundColor: 'rgba(255,255,255,0.06)' },
  keyPressed: { backgroundColor: 'rgba(255,255,255,0.18)' },
  keyText: { color: '#fff', fontSize: 34, fontWeight: '400' },
  forgot: { alignItems: 'center', paddingBottom: 26, paddingTop: 8 },
  forgotText: { color: 'rgba(255,255,255,0.85)', fontSize: 16, fontWeight: '600' },
});
