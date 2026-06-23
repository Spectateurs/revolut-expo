// Palette & styles globaux — thème SOMBRE inspiré de l'app Revolut
export const colors = {
  // Fonds
  bg: '#000000',
  bgElev: '#0C0C0E', // sections légèrement relevées
  bgGrey: '#1C1C1E', // surfaces / cartes (alias historique)
  card: '#1E1E22', // cartes/widgets — légèrement relevé du noir pour mieux les définir
  card2: '#2C2C2E',
  bgDark: '#000000',
  cardDark: '#16161C',

  // Texte
  text: '#FFFFFF',
  subtext: '#9A9AA0',
  textOnDark: '#FFFFFF',
  subtextOnDark: '#9A9AA0',

  // Accents
  primary: '#3D7BFF', // bleu Revolut (version lisible sur fond noir)
  primaryDark: '#0A3FB0',
  purple: '#9B7BFF',
  green: '#43BC99', // vert "reçu" Revolut — émeraude/teal (valeur fournie)
  red: '#FF453A',
  orange: '#F2994A',
  pink: '#EB57A2',
  teal: '#16C5C5',

  border: '#2A2A2C',
  white: '#FFFFFF',
};

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };

export const radius = { sm: 10, md: 16, lg: 24, pill: 999 };

// Catégories de dépenses, avec couleur + icône (Ionicons)
export const categories = {
  shopping: { label: 'Shopping', color: '#9B7BFF', icon: 'bag-handle' },
  groceries: { label: 'Courses', color: '#2FD25B', icon: 'cart' },
  restaurants: { label: 'Restaurants', color: '#F2994A', icon: 'restaurant' },
  transport: { label: 'Transport', color: '#3D7BFF', icon: 'car-sport' },
  entertainment: { label: 'Loisirs', color: '#EB57A2', icon: 'game-controller' },
  bills: { label: 'Factures', color: '#16C5C5', icon: 'receipt' },
  transfers: { label: 'Virements', color: '#8E8E93', icon: 'swap-horizontal' },
  income: { label: 'Revenus', color: '#2FD25B', icon: 'arrow-down' },
  topup: { label: 'Rechargement', color: '#3D7BFF', icon: 'add-circle' },
  health: { label: 'Santé', color: '#FF453A', icon: 'medkit' },
  travel: { label: 'Voyage', color: '#16C5C5', icon: 'airplane' },
  general: { label: 'Général', color: '#8E8E93', icon: 'ellipsis-horizontal' },
};
