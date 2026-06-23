// Formatage monétaire à la française : 1 234,56 €
export function formatMoney(amount, currency = 'EUR') {
  const symbols = { EUR: '€', USD: '$', GBP: '£' };
  const sym = symbols[currency] || '';
  const abs = Math.abs(amount).toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const sign = amount < 0 ? '-' : '';
  // EUR/GBP : symbole après ; USD : avant
  if (currency === 'USD') return `${sign}${sym}${abs}`;
  return `${sign}${abs} ${sym}`;
}

// "+1 234,56 €" avec le + pour les entrées
export function formatSigned(amount, currency = 'EUR') {
  const base = formatMoney(amount, currency);
  return amount > 0 ? `+${base}` : base;
}

// Montant style Revolut pour les transactions : pas de séparateur de milliers,
// décimales seulement s'il y a des centimes -> "-1300 €", "-129,86 €", "+32 €"
export function formatAmount(amount, currency = 'EUR') {
  const symbols = { EUR: '€', USD: '$', GBP: '£' };
  const sym = symbols[currency] || '';
  const abs = Math.abs(amount);
  const isWhole = Math.abs(abs - Math.round(abs)) < 0.005;
  // séparateur de milliers à la française, décimales seulement s'il y a des centimes
  const num = isWhole
    ? Math.round(abs).toLocaleString('fr-FR')
    : abs.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const sign = amount < 0 ? '-' : '';
  if (currency === 'USD') return `${sign}${sym}${num}`;
  return `${sign}${num} ${sym}`;
}

export function formatAmountSigned(amount, currency = 'EUR') {
  const base = formatAmount(amount, currency);
  return amount > 0 ? `+${base}` : base;
}

const MONTHS = [
  'janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin',
  'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.',
];

export function formatTime(iso) {
  const d = new Date(iso);
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

// "Aujourd'hui" / "Hier" / "14 juin" (date de référence = 19/06/2026 dans la démo)
export function formatRelativeDay(iso) {
  const day = iso.slice(0, 10);
  if (day === '2026-06-19') return "Aujourd'hui";
  if (day === '2026-06-18') return 'Hier';
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

export function formatLongDate(iso) {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()} à ${formatTime(iso)}`;
}
