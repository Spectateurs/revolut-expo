import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, StatusBar } from 'react-native';

// Écran de démarrage : le mot-symbole "Revolut" sur fond noir,
// comme à l'ouverture de la vraie app, puis bascule vers le code d'accès.
export default function SplashScreen({ navigation }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 7, useNativeDriver: true }),
    ]).start();

    const t = setTimeout(() => navigation.replace('Passcode'), 1700);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Animated.Text style={[styles.logo, { opacity, transform: [{ scale }] }]}>
        Revolut
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' },
  logo: {
    color: '#fff',
    fontSize: 46,
    fontFamily: 'Aeonik-Bold',
    letterSpacing: -1.5,
  },
});
