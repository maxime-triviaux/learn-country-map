# 🌍 Géographie Interactive - Apprendre les Pays et Capitales

Une webapp éducative responsive inspirée du design de Duolingo pour apprendre les pays et leurs capitales de manière interactive et ludique.

## ✨ Fonctionnalités

- **🗺️ Vraie carte du monde** : Carte interactive avec les vraies formes géographiques des pays (données GeoJSON)
- **🎮 Jeu interactif** : Cliquez sur les pays sur la carte puis devinez leur capitale
- **🎨 Design Duolingo** : Interface utilisateur moderne avec les couleurs et le style caractéristiques de Duolingo
- **📱 Responsive** : Fonctionne parfaitement sur desktop, tablette et mobile
- **🏆 Système de score** : Points et progression avec statistiques sauvegardées
- **🌍 50+ pays** : Base de données avec les pays et capitales traduits en français
- **💡 Indices** : Système d'aide pour les capitales difficiles
- **✨ Feedback visuel** : Animations et couleurs pour indiquer les bonnes/mauvaises réponses
- **🔍 Tooltip interactif** : Survol pour voir le nom des pays
- **🎯 Légende intégrée** : Instructions visuelles directement sur la carte

## 🚀 Technologies Utilisées

- **Frontend** : TypeScript + Vite.js
- **Cartographie** : D3.js (d3-geo, d3-geo-projection) avec données GeoJSON réelles
- **Styling** : CSS3 avec variables CSS et design system Duolingo
- **Données géographiques** : World Atlas (Natural Earth) + API REST Countries
- **Build** : Vite avec support TypeScript complet

## 📦 Installation et Lancement

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone <url-du-repo>
cd learn-country-map

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Build pour production
```bash
npm run build
npm run preview
```

## 🎮 Comment Jouer

1. **Démarrer** : Cliquez sur "Commencer le jeu"
2. **Sélectionner** : Un pays vous est donné, trouvez-le sur la carte en cliquant dessus
3. **Deviner** : Une fois le pays sélectionné, tapez le nom de sa capitale
4. **Progresser** : Recevez des points et passez à la question suivante
5. **Terminer** : Consultez votre score final et vos statistiques

### Fonctionnalités Bonus
- **💡 Indice** : Cliquez sur le bouton indice pour révéler des lettres de la capitale
- **📊 Statistiques** : Vos scores sont sauvegardés localement
- **⚙️ Difficulté** : Changez le nombre de questions (5-20)

## 🎨 Design System

L'application utilise un système de design inspiré de Duolingo avec :

### Couleurs Principales
- **Vert Duolingo** : `#58CC02` (boutons principaux, succès)
- **Bleu Duolingo** : `#1CB0F6` (boutons secondaires, hover)
- **Rouge** : `#FF4B4B` (erreurs, feedback négatif)
- **Jaune/Orange** : `#FFD700`, `#FF9600` (accents)

### Typographie
- **Police** : Nunito (Google Fonts)
- **Poids** : 400 (normal), 600 (medium), 700 (bold), 800 (black)

### Composants
- Boutons avec effet 3D (border-bottom)
- Cards avec ombres et bordures arrondies
- Animations fluides et micro-interactions
- Système de grille responsive

## 📱 Responsive Design

L'application s'adapte automatiquement à tous les types d'écrans :

- **Desktop** (>768px) : Interface complète avec carte grande
- **Tablette** (768px-480px) : Layout adapté avec éléments redimensionnés
- **Mobile** (<480px) : Interface optimisée pour le tactile

## 🗺️ Données Géographiques

### Sources
- **API REST Countries** : Données officielles des pays et capitales
- **Données Statiques** : 50+ pays les plus connus pour des performances optimales

### Pays Inclus (en français)
Sélection des pays les plus reconnaissables mondialement avec noms français :
- **Europe** : France, Allemagne, Italie, Espagne, Royaume-Uni, Suède, Norvège, etc.
- **Amériques** : États-Unis, Canada, Brésil, Argentine, Mexique, Pérou, Chili, etc.
- **Asie** : Chine, Inde, Japon, Corée du Sud, Thaïlande, Vietnam, Indonésie, etc.
- **Afrique** : Égypte, Afrique du Sud, Nigeria, Kenya, etc.
- **Océanie** : Australie, Nouvelle-Zélande

### Capitales en Français
Toutes les capitales sont traduites et acceptent plusieurs variantes :
- **Londres** ou **London** pour le Royaume-Uni
- **Pékin** ou **Beijing** pour la Chine
- **Le Caire** ou **Cairo** pour l'Égypte
- **Moscou** ou **Moscow** pour la Russie
- Et bien d'autres variantes françaises/anglaises !

## 🔧 Architecture Technique

```
src/
├── components/          # Composants réutilisables
│   └── WorldMap.ts     # Carte interactive D3.js
├── data/               # Données statiques
│   ├── countries.json  # Données complètes API REST Countries
│   └── staticCountries.ts # Données optimisées pour le jeu
├── game/               # Logique de jeu
│   └── GameManager.ts  # Gestionnaire d'état du jeu
├── styles/             # Styles et design system
│   └── duolingo.css    # Système de design complet
├── types/              # Types TypeScript
│   └── index.ts        # Interfaces et types
├── utils/              # Utilitaires
│   └── countries.ts    # Fonctions pour manipuler les données
└── main.ts             # Point d'entrée de l'application
```

### Patterns Utilisés
- **State Management** : Pattern Observer avec GameManager
- **Component Architecture** : Classes TypeScript avec encapsulation
- **CSS Architecture** : Variables CSS + BEM-like methodology
- **Type Safety** : TypeScript strict avec interfaces complètes

## 🎯 Fonctionnalités Avancées

### Système de Score
- **Points de base** : 10 points par bonne réponse
- **Bonus progression** : Points supplémentaires pour les premières questions
- **Sauvegarde locale** : Historique des 10 derniers scores

### Validation Intelligente
- **Normalisation** : Suppression des accents et caractères spéciaux
- **Tolérance** : Accepte différentes variantes d'écriture
- **Feedback** : Messages personnalisés selon le type d'erreur

### Performance
- **Données statiques** : Chargement instantané
- **Lazy loading** : Chargement à la demande des composants
- **Optimisations CSS** : Animations GPU-accelerated

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

### Idées d'Améliorations
- [ ] Mode multijoueur
- [ ] Cartes par région (Europe, Asie, etc.)
- [ ] Mode chronométré
- [ ] Système de achievements/badges
- [ ] Support des drapeaux
- [ ] Mode "capitales vers pays"
- [ ] Intégration de vraies données TopoJSON
- [ ] Mode hors-ligne (PWA)

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- **REST Countries API** pour les données géographiques
- **D3.js** pour les outils de cartographie
- **Duolingo** pour l'inspiration du design
- **Google Fonts** pour la police Nunito
- **Vite.js** pour l'excellent tooling de développement

---

Fait avec ❤️ pour l'apprentissage de la géographie
