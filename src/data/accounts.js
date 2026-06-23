// Comptes fictifs (multi-devises, comme Revolut)
export const accounts = [
  // Solde = somme nette des transactions (reçues − envoyées) -> cohérent avec la liste
  { id: 'eur', label: 'Personnel', currency: 'EUR', symbol: '€', flag: '🇪🇺', balance: 2740877.92, iban: 'FR76 2823 3000 0169 9640 0195 726' },
  { id: 'usd', label: 'Dollar US', currency: 'USD', symbol: '$', flag: '🇺🇸', balance: 540.12 },
  { id: 'gbp', label: 'Livre Sterling', currency: 'GBP', symbol: '£', flag: '🇬🇧', balance: 120.0 },
];

export const user = {
  firstName: 'Agathe',
  lastName: 'Martin',
  initials: 'AM',
  plan: 'Premium',
  // Photo de profil : fichier local (ta photo dans assets/avatar.png).
  avatar: require('../../assets/avatar.png'),
};

// Petits "pots" / coffres comme sur Revolut
export const pockets = [
  { id: 'p1', label: 'Vacances 2026', emoji: '🏝️', saved: 820, goal: 2000 },
  { id: 'p2', label: 'Nouveau vélo', emoji: '🚲', saved: 240, goal: 600 },
];

// Section "En savoir plus"
export const learnMore = [
  { id: 'l1', icon: 'safe', title: 'Épargne et fonds', sub: 'Gagnez du rendement sur votre argent.', action: 'Ouvrir' },
  { id: 'l2', icon: 'wallet', title: 'Pocket', sub: "Mettez de l'argent de côté.", action: 'Ouvrir' },
  { id: 'l3', icon: 'account-cash', title: 'Prêt personnel', sub: 'Obtenez une estimation en quelques minutes.', action: 'Demander' },
];

// Section "Cartes" (ordre & styles calqués sur l'app : Argentée, badies A3E, sixt tech)
export const cards = [
  { id: 'c2', name: 'Argentée', last4: '3777', network: 'mc', tone: 'silver', colors: ['#E9E9ED', '#B4B4BC'] },
  { id: 'c1', name: 'badies A3E', last4: '6737', network: 'mc', colors: ['#2563FF', '#1A40C8'] },
  { id: 'c3', name: 'sixt tech', last4: '6487', network: 'visa', colors: ['#5E1A1E', '#360D0F'], centerBadge: 'snowflake', selected: true },
];

// Section "Liste de surveillance" (vrais logos)
export const watchlist = [
  { id: 'w1', name: 'NVIDIA', sym: 'NVDA', price: '202,08 $', change: -4.09, logo: require('../../assets/nvidia.png') },
  { id: 'w2', name: 'iShares Dow Jones Global Titans 50 ETF', sym: 'EXI2', price: '107,8 €', change: -1.65, logo: require('../../assets/ishares.png') },
];

// Section "Défis"
export const challenges = [
  { id: 'd1', image: require('../../assets/defi.jpg'), title: '700 points bonus', sub: '0 réservations sur 1', days: '10 jours', progress: 0.0 },
];
