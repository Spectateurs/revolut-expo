// Transactions fictives — chaque opération décrit son ORIGINE
// (type, moyen de paiement, compte, statut, lieu) pour l'écran de détail.
//
// type   : 'card' | 'transfer_in' | 'transfer_out' | 'topup' | 'exchange' | 'subscription'
// amount : négatif = sortie d'argent, positif = entrée
// brand  : clé de logo de marque (voir components/MerchantLogo.js), sinon emoji/catégorie

export const transactions = [
  // ---- Aujourd'hui (2026-06-19) ----
  {
    id: 't1', merchant: 'FTMO TRADER GLOBAL', category: 'transfers', amount: 2738873.0, currency: 'EUR',
    date: '2026-06-19T20:15:00', type: 'transfer_in', method: 'Virement Revolut',
    account: 'Personnel · EUR', status: 'Reçu', location: 'Reçu sur Revolut', note: 'Virement reçu',
    initials: 'F', avatarBg: '#3D7BFF',
  },
  {
    id: 't2', merchant: 'Etsy Ireland', category: 'shopping', amount: -16.0, currency: 'EUR',
    date: '2026-06-19T18:46:00', type: 'card', brand: 'etsy', photo: require('../../assets/etsy.png'),
    method: 'Carte Visa •• 5432',
    account: 'Personnel · EUR', status: 'Terminé', location: 'Etsy.com', note: 'Achat décoration',
  },
  {
    id: 't3', merchant: 'aline jule', category: 'transfers', amount: -80.0, currency: 'EUR',
    date: '2026-06-19T17:34:00', type: 'transfer_out', method: 'Virement Revolut',
    account: 'Personnel · EUR', status: 'Envoyé', location: 'Envoyé depuis Revolut', note: 'Cadeau commun',
  },
  {
    id: 't4', merchant: 'ALINE GROLLEAU', category: 'transfers', amount: -32.0, currency: 'EUR',
    date: '2026-06-19T14:27:00', type: 'transfer_out', photo: require('../../assets/aline.jpg'),
    method: 'Virement Revolut',
    account: 'Personnel · EUR', status: 'Envoyé', location: 'Envoyé depuis Revolut', note: 'Part resto',
  },
  {
    id: 't5', merchant: 'ALINE GROLLEAU', category: 'transfers', amount: +32.0, currency: 'EUR',
    date: '2026-06-19T00:07:00', type: 'transfer_in', photo: require('../../assets/aline.jpg'),
    method: 'Virement Revolut',
    account: 'Personnel · EUR', status: 'Reçu', location: 'Reçu sur Revolut', note: 'Remboursement',
  },

  // ---- Hier (2026-06-18) ----
  {
    id: 't6', merchant: 'Airbnb', category: 'travel', amount: -129.86, currency: 'EUR',
    date: '2026-06-18T22:21:00', type: 'card', brand: 'airbnb', method: 'Carte Visa •• 5432',
    account: 'Personnel · EUR', status: 'Terminé', location: 'Airbnb.com', note: 'Réservation week-end',
  },
  {
    id: 't7', merchant: 'Netflix', category: 'entertainment', amount: -13.49, currency: 'EUR',
    date: '2026-06-18T20:30:00', type: 'subscription', brand: 'netflix', method: 'Abonnement · Carte Visa •• 5432',
    account: 'Personnel · EUR', status: 'Terminé', location: 'Netflix.com', note: 'Abonnement mensuel',
  },
  {
    id: 't8', merchant: 'Amazon', category: 'shopping', amount: -54.99, currency: 'EUR',
    date: '2026-06-18T10:24:00', type: 'card', brand: 'amazon', method: 'Carte Visa •• 5432',
    account: 'Personnel · EUR', status: 'Terminé', location: 'Amazon.fr', note: 'Casque audio',
  },
  {
    id: 't9', merchant: 'Uber', category: 'transport', amount: -11.9, currency: 'EUR',
    date: '2026-06-18T09:12:00', type: 'card', brand: 'uber', method: 'Apple Pay · Carte Visa •• 5432',
    account: 'Personnel · EUR', status: 'Terminé', location: 'Paris, France', note: 'Trajet domicile → bureau',
  },
  {
    id: 't10', merchant: 'Starbucks', category: 'restaurants', amount: -6.2, currency: 'EUR',
    date: '2026-06-18T08:15:00', type: 'card', emoji: '☕', method: 'Apple Pay · Carte Visa •• 5432',
    account: 'Personnel · EUR', status: 'Terminé', location: 'Lyon, France', note: 'Cappuccino',
  },

  // ---- Cette semaine ----
  {
    id: 't11', merchant: 'Salaire — TechCorp', category: 'income', amount: +2450.0, currency: 'EUR',
    date: '2026-06-16T07:00:00', type: 'transfer_in', method: 'Virement SEPA',
    account: 'Personnel · EUR', status: 'Reçu', location: 'TechCorp SAS', note: 'Salaire juin 2026',
  },
  {
    id: 't12', merchant: 'Spotify', category: 'entertainment', amount: -10.99, currency: 'EUR',
    date: '2026-06-15T12:00:00', type: 'subscription', brand: 'spotify', method: 'Abonnement · Carte Visa •• 5432',
    account: 'Personnel · EUR', status: 'Terminé', location: 'Spotify.com', note: 'Premium',
  },
  {
    id: 't13', merchant: 'EDF', category: 'bills', amount: -78.3, currency: 'EUR',
    date: '2026-06-15T08:00:00', type: 'subscription', emoji: '💡', method: 'Prélèvement SEPA',
    account: 'Personnel · EUR', status: 'Terminé', location: 'EDF Énergie', note: 'Facture électricité',
  },
  {
    id: 't14', merchant: 'Carrefour City', category: 'groceries', amount: -23.45, currency: 'EUR',
    date: '2026-06-14T12:40:00', type: 'card', emoji: '🛒', method: 'Carte Visa •• 5432',
    account: 'Personnel · EUR', status: 'Terminé', location: 'Paris, France', note: 'Courses',
  },
  {
    id: 't15', merchant: 'Pharmacie du Centre', category: 'health', amount: -19.9, currency: 'EUR',
    date: '2026-06-14T14:20:00', type: 'card', emoji: '💊', method: 'Carte Visa •• 5432',
    account: 'Personnel · EUR', status: 'Terminé', location: 'Marseille, France', note: 'Pharmacie',
  },
];

// Regroupe les transactions par section de date relative
export function groupTransactions(list) {
  const groups = {};
  const order = [];
  for (const t of list) {
    const day = t.date.slice(0, 10);
    let key = 'Cette semaine';
    if (day === '2026-06-19') key = "Aujourd'hui";
    else if (day === '2026-06-18') key = 'Hier';
    if (!groups[key]) {
      groups[key] = [];
      order.push(key);
    }
    groups[key].push(t);
  }
  return order.map((k) => [k, groups[k]]);
}

export function getTransaction(id) {
  return transactions.find((t) => t.id === id);
}

export function monthlySpent(list) {
  return list.filter((t) => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
}

// Total (signé) d'une liste — pour les en-têtes de jour
export function sumAmount(list) {
  return list.reduce((s, t) => s + t.amount, 0);
}

// Dépenses par catégorie (sorties uniquement) triées décroissant
export function spendingByCategory(list) {
  const map = {};
  for (const t of list) {
    if (t.amount >= 0) continue;
    map[t.category] = (map[t.category] || 0) + Math.abs(t.amount);
  }
  return Object.entries(map)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);
}
