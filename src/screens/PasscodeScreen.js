import { useState, useRef } from 'react';
import { View, StyleSheet, Pressable, Animated, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import Text from '../components/AppText';
import { Ionicons } from '@expo/vector-icons';
import WarmBackground from '../components/WarmBackground';
import FaceIdIcon from '../components/FaceIdIcon';
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
      {/* Même fond chaud que l'accueil → l'effet de flou des bulles est "en raccord" */}
      <WarmBackground style={StyleSheet.absoluteFill} />

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
                style={[styles.dot, i < pin.length && styles.dotFilled, error && styles.dotError]}
              />
            ))}
          </Animated.View>
        </View>

        <View style={styles.keypad}>
          {keys.map((k) => {
            // Face ID : icône nue (sans bulle), comme iOS
            if (k === 'face') {
              return (
                <View key={k} style={styles.keyWrap}>
                  <Pressable
                    style={({ pressed }) => [styles.bare, pressed && styles.barePressed]}
                    onPress={unlock}
                    hitSlop={8}
                  >
                    <FaceIdIcon size={36} color="#fff" />
                  </Pressable>
                </View>
              );
            }
            // Effacer : icône nue, affichée seulement quand on a commencé à taper
            if (k === 'del') {
              return (
                <View key={k} style={styles.keyWrap}>
                  {pin.length > 0 ? (
                    <Pressable
                      style={({ pressed }) => [styles.bare, pressed && styles.barePressed]}
                      onPress={backspace}
                      hitSlop={8}
                    >
                      <Ionicons name="backspace-outline" size={29} color="#fff" />
                    </Pressable>
                  ) : (
                    <View style={styles.bare} />
                  )}
                </View>
              );
            }
            // Chiffres : bulle en verre dépoli (flou)
            return (
              <View key={k} style={styles.keyWrap}>
                <Pressable onPress={() => press(k)}>
                  {({ pressed }) => (
                    <BlurView intensity={24} tint="dark" style={[styles.key, pressed && styles.keyPressed]}>
                      <Text style={styles.keyText}>{k}</Text>
                    </BlurView>
                  )}
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

const KEY = 70;

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
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'rgba(255,255,255,0.32)',
    marginHorizontal: 10,
  },
  dotFilled: { backgroundColor: '#fff' },
  dotError: { backgroundColor: colors.red },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignSelf: 'center',
    width: KEY * 3 + 56,
  },
  keyWrap: { width: '33.33%', alignItems: 'center', marginVertical: 9 },
  key: {
    width: KEY,
    height: KEY,
    borderRadius: KEY / 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  keyPressed: { backgroundColor: 'rgba(255,255,255,0.16)' },
  keyText: { color: '#fff', fontSize: 31, fontWeight: '400' },
  bare: { width: KEY, height: KEY, borderRadius: KEY / 2, alignItems: 'center', justifyContent: 'center' },
  barePressed: { backgroundColor: 'rgba(255,255,255,0.08)' },
  forgot: { alignItems: 'center', paddingBottom: 26, paddingTop: 8 },
  forgotText: { color: 'rgba(255,255,255,0.85)', fontSize: 16, fontWeight: '600' },
});
