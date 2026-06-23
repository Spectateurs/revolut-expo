import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { categories } from '../theme';

// Pastille ronde colorée représentant une catégorie de transaction.
// Affiche l'emoji du marchand si fourni, sinon l'icône de la catégorie.
export default function CategoryIcon({ category = 'general', emoji, size = 46 }) {
  const cat = categories[category] || categories.general;
  return (
    <View
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: cat.color + '22' },
      ]}
    >
      {emoji ? (
        <Text style={{ fontSize: size * 0.46 }}>{emoji}</Text>
      ) : (
        <Ionicons name={cat.icon} size={size * 0.5} color={cat.color} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { alignItems: 'center', justifyContent: 'center' },
});
