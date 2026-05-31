# Entretien d'Embauche IA 🎯

Application HTML/CSS/JavaScript hors ligne pour s'entraîner aux entretiens d'embauche.

## Comment utiliser

### Lancement
1. Ouvrez le fichier `index.html` dans Chrome ou Edge
2. Aucune connexion internet nécessaire
3. Aucune installation nécessaire

### Étapes de l'entraînement

**1. Accueil**
Cliquez sur "Commencer l'entraînement"

**2. Configuration**
- Choisissez un métier (10 métiers disponibles)
- Choisissez votre niveau de français : A1, A2 ou B1
- Choisissez le type de recruteur :
  - 😊 Sympathique : accueillant et patient
  - ⏱️ Pressé : direct, peu de temps
  - 🎯 Exigeant : rigoureux et précis

**3. Entretien**
- La question s'affiche et se lit à voix haute automatiquement
- Écrivez votre réponse dans la zone de texte
- Cliquez sur "Soumettre ma réponse"
- Recevez votre score et vos conseils

**4. Rapport final**
- Visualisez votre score moyen sur 100
- Relisez toutes vos réponses avec les feedbacks
- Imprimez le rapport (bouton "Imprimer")

---

## Métiers disponibles

| Métier | Emoji |
|--------|-------|
| Employé de nettoyage | 🧹 |
| Aide de cuisine | 🍳 |
| Employé de vente | 🛍️ |
| Employé de rayon | 🏪 |
| Chauffeur-livreur | 🚚 |
| Employé en logistique | 📦 |
| Aide à domicile | 🏠 |
| Réceptionniste | 🏨 |
| Agent de sécurité | 🔐 |
| Ouvrier du bâtiment | 🏗️ |

---

## Critères d'évaluation

Chaque réponse est évaluée sur **100 points** :

| Critère | Points |
|---------|--------|
| 📏 Longueur de la réponse | 15 pts |
| 💡 Exemple concret | 25 pts |
| 📚 Vocabulaire du métier | 20 pts |
| 🤝 Politesse et respect | 15 pts |
| 🏗️ Structure de la réponse | 15 pts |
| 🎯 Adaptation à l'offre | 10 pts |

### Conseils pour un bon score
- **Donnez des exemples** : "Par exemple, quand j'ai travaillé à..."
- **Utilisez des mots du métier** : Chaque métier a son vocabulaire
- **Structurez votre réponse** : D'abord... Ensuite... Enfin...
- **Soyez poli** : "Bonjour", "Je vous remercie", "Avec plaisir"
- **Parlez assez longtemps** : Au moins 50 mots par réponse

---

## Fonctionnalités techniques

- ✅ Fonctionne sans internet (hors ligne)
- ✅ Voix du navigateur (SpeechSynthesis)
- ✅ Sauvegarde automatique (localStorage)
- ✅ Rapport imprimable
- ✅ Compatible Chrome et Edge
- ✅ Pas de framework, pas de serveur

## Structure des fichiers

```
entretien-embauche-ia/
├── index.html              — Interface principale
├── README.md               — Ce fichier
├── assets/
│   ├── css/
│   │   └── style.css       — Styles de l'interface
│   └── js/
│       ├── app.js          — Logique principale
│       ├── data.js         — Chargement des données
│       ├── voice.js        — Synthèse vocale
│       ├── evaluation.js   — Évaluation des réponses
│       └── storage.js      — Sauvegarde localStorage
└── data/
    ├── metiers.json                — Questions par métier
    ├── questions-generales.json    — 20 questions générales
    ├── questions-difficiles.json   — 20 questions difficiles
    └── criteres-evaluation.json    — Critères et feedbacks
```

---

## Utilisation en classe

Ce jeu est conçu pour être **projeté en classe** :
- Grande police lisible à distance
- Gros boutons faciles à utiliser
- Français simple niveau A1-B1
- Possibilité d'imprimer le rapport pour chaque participant

**Déroulement suggéré :**
1. Le formateur projette l'application
2. Un participant choisit son métier et son niveau
3. Le participant répond aux questions à l'oral ou à l'écrit
4. La classe discute du score et des conseils
5. On imprime le rapport pour le participant

---

*Application créée pour l'entraînement à l'entretien d'embauche en français — Public A1-B1*
