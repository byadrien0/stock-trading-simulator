📈 Neumorphic Trading Simulator

Une application de simulation de trading immersive construite avec React + TailwindCSS + lucide-react.
Elle permet de gérer un portefeuille fictif de 10 000€, d’investir dans différents instruments financiers (actions, cryptos, ETF, indices, matières premières, devises), et de suivre ses performances en temps réel avec des frais réalistes intégrés.

🚀 Fonctionnalités principales
💼 Gestion du portefeuille

Portefeuille de départ : 10 000€ en cash.

Suivi en temps réel de :

La valeur totale du portefeuille.

Le cash disponible.

Le nombre de positions actives.

Les gains/pertes cumulés (en € et en %).

🔍 Recherche & navigation

Onglet Accueil : aperçu du portefeuille, tendances du marché, accès rapide aux positions.

Onglet Recherche : moteur de recherche par symbole ou nom + filtres par catégories :

Tout, Actions, Crypto, ETF, Matières, Indices, Devises.

Onglet Portfolio : vue détaillée des positions, statistiques et dernières transactions.

Onglet Stats (placeholder pour extensions futures).

📊 Instruments financiers simulés

Inclut un large éventail d’actifs :

Actions US & EU : AAPL, GOOGL, MSFT, TSLA, AMZN, NVDA, META, NFLX, ASML, SAP, LVMH.

Cryptomonnaies : BTC, ETH, ADA, SOL, DOT.

ETF : VOO, QQQ, VTI, VXUS.

Matières premières : Or, Argent, Pétrole, Cuivre.

Indices : S&P 500, NASDAQ, DAX 40, CAC 40.

Devises (Forex) : EUR/USD, GBP/USD, USD/JPY, USD/CHF.

📈 Simulation réaliste

Les prix fluctuent automatiquement toutes les 3 secondes avec une volatilité spécifique à chaque type d’actif :

Crypto : très volatile (±3%).

Matières premières : modérément volatiles (±2%).

Forex : faiblement volatile (±0.5%).

Actions/ETF : moyennement volatiles (±1.5%).

Indices : volatiles (±0.8%).

💶 Frais réalistes

Chaque transaction intègre différents frais selon l’actif :

Actions : courtage (0,50€ min + 0,25% plafonné à 15€) + spread 0,05-0,15% + frais de change si hors EUR.

Crypto : frais ~1% + spreads élevés.

ETF : frais réduits (TER simulé au prorata journalier).

Forex : uniquement spreads + frais overnight sur achats.

Matières premières : frais 1-2% + spreads.

Indices : spread + financement.

Tous les frais sont détaillés avant validation d’un ordre.

🛒 Système d’ordres

Possibilité d’acheter ou vendre des instruments financiers.

Deux modes d’achat :

Par quantité : choisir le nombre d’unités/actions.

Par montant : investir un montant fixe en euros (conversion automatique en quantités nettes après frais).

Vérifications automatiques :

Fonds insuffisants.

Quantité trop faible (0 après frais).

Tentative de vente sans assez de positions.

🧾 Transactions

Historique des transactions avec détails :

Type (achat/vente).

Quantité et prix.

Montant brut et net.

Frais détaillés (courtage, spread, change, gestion).

Date et heure.

🎨 UI Neumorphique

Design moderne avec neumorphisme et dégradés colorés par type d’actif.

Navigation fluide via bottom navigation bar.

Boutons et cartes interactifs avec effets d’ombre et de surbrillance.

🛠️ Stack technique

React (hooks & state management).

TailwindCSS (responsive & design).

lucide-react (icônes modernes).

JavaScript ES6+.

📂 Installation & exécution
# Cloner le dépôt
git clone https://github.com/ton-compte/stock-trading-simulator.git
cd stock-trading-simulator

# Installer les dépendances
npm install

# Lancer le serveur de dev
npm run dev


Accéder à l’application sur : http://localhost:5173 (si Vite est utilisé).

✅ Fonctionnalités futures possibles

Authentification & sauvegarde du portefeuille.

Graphiques avancés (courbes des prix & performances).

Classements entre utilisateurs (simulation multi-joueurs).

Mode “challenge” avec objectifs financiers.

👉 Ce projet est une simulation éducative et ne constitue pas un outil de trading réel.
