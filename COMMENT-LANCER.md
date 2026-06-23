# 📱 Clone Revolut — Comment lancer l'app

Prototype d'interface (UI cliquable) inspiré de Revolut. Données 100 % fictives.

## Lancer sur ton téléphone (recommandé, le plus réaliste)

1. Installe l'app **Expo Go** sur ton téléphone :
   - Android → Play Store : « Expo Go »
   - iPhone → App Store : « Expo Go »
2. Sur le PC, ouvre un terminal **dans le dossier `revolut`** et lance :
   ```
   npm start
   ```
3. Un **QR code** s'affiche dans le terminal.
   - Android : ouvre Expo Go → « Scan QR code ».
   - iPhone : ouvre l'appareil photo → vise le QR code.
4. ⚠️ Le téléphone et le PC doivent être sur le **même réseau Wi-Fi**.
   - Si ça ne charge pas (Wi-Fi d'entreprise/public), lance plutôt :
     ```
     npm start -- --tunnel
     ```

## Tester sans téléphone (émulateur Android)

Si tu as Android Studio installé :
```
npm run android
```

## Le parcours à filmer

1. **Écran de démarrage** (style iOS, fond noir) → saisis le code **123456** → déverrouille.
   (l'icône Face ID 🆔 déverrouille aussi ; un mauvais code fait vibrer l'écran)
2. **Accueil** (thème sombre) : solde 2 722,81 €, boutons d'action, liste de produits
   (Espèces, Épargne, Prêt, Cryptos, Lié), graphique des dépenses, transactions.
3. Touche une **transaction** (ex. « romain gonnet ») → écran de détail : tu vois
   **d'où vient** l'opération (type, moyen de paiement, compte, statut, lieu, date).
4. Navigue dans les onglets du bas : **Investir, Virements, Cryptos, RevPoints** — tout est cliquable.

## Modifier l'app

- Données (transactions, comptes) : `src/data/`
- Écrans : `src/screens/`
- Couleurs & catégories : `src/theme.js`
