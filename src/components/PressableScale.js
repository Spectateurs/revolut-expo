import { useRef } from 'react';
import { Animated, Pressable } from 'react-native';

// Bouton qui se rétracte légèrement à l'appui (animation Revolut).
export default function PressableScale({ children, style, onPress, scaleTo = 0.95, ...rest }) {
  const scale = useRef(new Animated.Value(1)).current;

  const animate = (to) =>
    Animated.spring(scale, { toValue: to, useNativeDriver: true, speed: 40, bounciness: 6 }).start();

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => animate(scaleTo)}
      onPressOut={() => animate(1)}
      {...rest}
    >
      <Animated.View style={[style, { transform: [{ scale }] }]}>{children}</Animated.View>
    </Pressable>
  );
}
