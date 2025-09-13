
```
# 📈 **Neumorphic Trading Simulator**  

> _Une application de simulation de trading immersive et réaliste construite avec **React + TailwindCSS**_  

---

## ✨ **Fonctionnalités principales**  

### 💼 **Gestion du portefeuille**  
- Portefeuille initial : **10 000€ en cash** 🪙  
- Suivi en temps réel de :  
  - 💰 Liquidités disponibles  
  - 📊 Nombre de positions actives  
  - 📈 Valeur totale du portefeuille  
  - 📉 Gains/pertes cumulés (en **€** et en **%**)  

---

### 🔍 **Recherche & Navigation**  
- **Onglet Accueil 🏠** : aperçu du portefeuille + tendances du marché.  
- **Onglet Recherche 🔎** : moteur de recherche + filtres par catégories :  
  - 🏦 Actions  
  - 🪙 Cryptos  
  - 📑 ETF  
  - 🏅 Matières premières  
  - 📊 Indices  
  - 💱 Forex  
- **Onglet Portfolio 📂** : statistiques détaillées + historique.  
- **Onglet Stats 📈** : (espace prévu pour extensions futures).  

---

### 📊 **Instruments financiers disponibles**  
✅ **Actions US & EU** : `AAPL`, `GOOGL`, `MSFT`, `TSLA`, `AMZN`, `NVDA`, `META`, `NFLX`, `ASML`, `SAP`, `LVMH`  
✅ **Cryptos** : `BTC`, `ETH`, `ADA`, `SOL`, `DOT`  
✅ **ETF** : `VOO`, `QQQ`, `VTI`, `VXUS`  
✅ **Matières premières** : `Gold`, `Silver`, `Oil`, `Copper`  
✅ **Indices** : `S&P 500`, `NASDAQ`, `DAX`, `CAC 40`  
✅ **Forex** : `EUR/USD`, `GBP/USD`, `USD/JPY`, `USD/CHF`  

---

### 🎲 **Simulation réaliste**  
- Les prix **se mettent à jour toutes les 3 secondes** ⏳  
- Volatilité adaptée :  
  - ⚡ Crypto : ±3%  
  - 🛢️ Matières : ±2%  
  - 💱 Forex : ±0.5%  
  - 📑 ETF & Actions : ±1.5%  
  - 📊 Indices : ±0.8%  

---

### 💶 **Système de frais réalistes**  
Chaque transaction intègre des frais selon l’actif :  
- 📈 **Actions** : courtage (0,50€ min + 0,25% plafonné à 15€) + spread + frais de change 🌍  
- 🪙 **Crypto** : ~1% + spreads élevés  
- 📑 **ETF** : TER journalier simulé + faible spread  
- 💱 **Forex** : spreads + frais overnight  
- 🏅 **Matières premières** : 1-2% + spreads  
- 📊 **Indices** : spreads + frais de financement  

👉 **Tous les frais sont affichés en détail avant chaque ordre** !  

---

### 🛒 **Trading : Acheter / Vendre**  
- 2 modes d’achat :  
  - `Par quantité` 🔢  
  - `Par montant` 💵  
- Vérifications automatiques ✅ :  
  - ❌ Fonds insuffisants  
  - ❌ Quantité trop faible (0 après frais)  
  - ❌ Vente sans assez d’unités détenues  

---

### 🧾 **Historique des transactions**  
Chaque transaction affiche :  
- Type : **Achat** ✅ / **Vente** ❌  
- Symbole et nom de l’actif  
- Quantité et prix  
- Frais détaillés (courtage, spread, change, gestion)  
- Montant net et brut  
- Date et heure 🕒  

---

### 🎨 **UI Neumorphique**  
- Design **moderne et épuré** 🌟  
- Effets **ombre/relief** sur boutons et cartes  
- Couleurs **dégradées par type d’actif**  
- Navigation fluide avec **bottom bar** 📱  

---

## 🛠️ **Stack technique**  
- ⚛️ **React** (Hooks & State)  
- 🎨 **TailwindCSS**  
- 🖼️ **lucide-react** (icônes modernes)  
- 📜 **JavaScript ES6+**  

---

## ⚡ **Installation & exécution**  

```bash
# Cloner le dépôt
git clone https://github.com/ton-compte/stock-trading-simulator.git
cd stock-trading-simulator

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
````

Accéder à l’app : **[http://localhost:5173](http://localhost:5173)** 🌍

---

## 🚧 **Idées d’améliorations futures**

* 🔐 Authentification & sauvegarde du portefeuille
* 📉 Graphiques dynamiques (courbes de prix)
* 🏆 Classement entre utilisateurs (mode multi)
* 🎯 Défis financiers (objectifs de trading)

---

## ⚠️ **Disclaimer**

> Cette application est **uniquement une simulation éducative** 🎓
> Elle **ne constitue pas un outil de trading réel** et ne doit pas être utilisée pour des décisions financières.

```

