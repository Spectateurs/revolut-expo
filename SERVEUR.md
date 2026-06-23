# Faire tourner l'app 24/7 sur le serveur DigitalOcean

But : garder `expo start --tunnel` allumé en permanence sur le serveur (188.166.63.252)
pour charger l'app dans **Expo Go** sans dépendre de ton PC.

> ⚠️ **Rappels honnêtes**
> - L'app s'exécute **sur ton téléphone** (via Expo Go). Si le **tél est éteint**, rien ne tourne — un serveur ne peut pas y changer quoi que ce soit.
> - Ce serveur garde l'app **disponible** : tél allumé + Expo Go → tu charges l'app quand tu veux, sans ton PC.
> - C'est un serveur de **développement** (pas une « prod »). Ça marche, mais c'est moins stable qu'une vraie app installée.

---

## 0. Mettre le code à jour sur GitHub (À FAIRE EN PREMIER, depuis ton PC)

Toutes nos dernières modifs ne sont pas encore en ligne. Le serveur clonera depuis GitHub,
donc il faut d'abord pousser. (Demande-moi « commit + push » et je le fais pour toi.)

---

## 1. Préparer le serveur (une seule fois)

Connecte-toi en SSH :
```bash
ssh root@188.166.63.252
```

### a) RAM / swap (important)
Metro (le bundler Expo) consomme de la RAM. Si ton droplet a **1 Go**, ajoute 2 Go de swap
pour éviter les plantages :
```bash
fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

### b) Node.js 20 (LTS), git, pm2
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs git
npm install -g pm2
```

---

## 2. Récupérer le projet
```bash
cd /root
git clone https://github.com/Spectateurs/revolut-expo.git revolut
cd revolut
npm install
```
> Si le dépôt est **privé**, utilise un token GitHub :
> `git clone https://<TON_TOKEN>@github.com/Spectateurs/revolut-expo.git revolut`

---

## 3. Se connecter à Expo (pour une URL de tunnel STABLE)
```bash
npx expo login
```
Connecté, l'URL du tunnel reste la même à chaque redémarrage (sinon elle change).

---

## 4. Tester une fois à la main
```bash
npx expo start --tunnel
```
Tu dois voir une URL du type `exp://xxxxx.exp.direct`. Ouvre-la dans **Expo Go** sur ton tél.
Si ça marche, fais `Ctrl+C` et passe au mode permanent.

---

## 5. Rendre permanent (pm2)
```bash
pm2 start ecosystem.config.js     # lance le serveur Expo en fond
pm2 logs revolut-expo             # voir l'URL du tunnel (exp://...)
pm2 save                          # mémorise l'app
pm2 startup                       # (copie/colle la commande affichée) -> survit au reboot
```

Commandes utiles :
```bash
pm2 status            # état
pm2 restart revolut-expo
pm2 stop revolut-expo
pm2 logs revolut-expo # logs + URL du tunnel
```

---

## 6. Se connecter depuis le téléphone
1. Installe **Expo Go** (App Store / Play Store).
2. Récupère l'URL `exp://...exp.direct` (via `pm2 logs revolut-expo`).
3. Ouvre cette URL dans Expo Go (ou scanne le QR). Elle reste dans « Récemment ouverts ».

---

## 7. Après chaque modif du code (depuis ton PC)
```bash
# PC : git add/commit/push
# Serveur :
cd /root/revolut && git pull && npm install && pm2 restart revolut-expo
```

---

## Limites à connaître
- **Tél éteint = app éteinte** (l'app tourne sur le tél, pas sur le serveur).
- Le tunnel peut parfois se reconnecter ; `pm2` relance tout seul si ça tombe.
- Mode dev : c'est pour tester/montrer, pas un déploiement « public » grand-public.
  Pour ça → version web hébergée, ou vraie app installée (EAS Build). Dis-moi si tu veux ça plus tard.
