'use strict';

(function initExerciseConfig() {
  const nonOrderedPages = ['accueil', 'évaluations', 'regles', 'données', 'autoévaluation'];

  /*
   * themes : thèmes de vie couverts par l'exercice
   * section : regroupement d'affichage sur l'accueil
   */
  const entries = [
    { page: 'accueil',     name: 'Accueil',                  icon: '🏠', cat: 'Navigation',   section: null,                 themes: [] },
    { page: 'formulaire',  name: 'Formulaire',                icon: '📝', cat: 'Candidature',  section: 'Emploi & ORP',       themes: ['numérique', 'emploi', 'orp'] },
    { page: 'email-ecrire',name: 'Écrire un e-mail',          icon: '✉️', cat: 'Communication',section: 'Emploi & ORP',       themes: ['numérique', 'emploi'] },
    { page: 'mise-en-forme', name: 'Mise en forme',            icon: '🧾', cat: 'Communication',section: 'Emploi & ORP',       themes: ['numérique', 'emploi', 'français'] },
    { page: 'email-pro',   name: 'E-mails professionnels',    icon: '📧', cat: 'Communication',section: 'Emploi & ORP',       themes: ['numérique', 'emploi', 'orp'] },
    { page: 'retaper',     name: 'Retaper',                   icon: '✍️', cat: 'Communication',section: 'Emploi & ORP',       themes: ['numérique', 'emploi'] },
    { page: 'alphabet',    name: 'Alphabet',                  icon: '🔤', cat: 'Langue',        section: 'Français',           themes: ['numérique', 'emploi', 'transports', 'orp', 'logement'] },
    { page: 'vocabulaire-metier', name: 'Vocabulaire métier',  icon: '💬', cat: 'Langue',        section: 'Français',           themes: ['emploi', 'français', 'métiers'] },
    { page: 'compréhension', name: 'Écouter 2',                icon: '🎧', cat: 'Langue',        section: 'Français',           themes: ['français', 'emploi', 'orp', 'écoute'] },
    { page: 'clavier',     name: 'Clavier',                   icon: '⌨️', cat: 'Langue',        section: 'Numérique',          themes: ['numérique', 'emploi', 'transports', 'orp'] },
    { page: 'ecouter',     name: 'Écouter',                   icon: '🎧', cat: 'Langue',        section: 'Français',           themes: ['numérique', 'orp', 'transports'] },
    { page: 'cliquer',     name: 'Cliquer',                   icon: '🖱️', cat: 'Compétences',   section: 'Numérique',          themes: ['numérique', 'emploi', 'transports'] },
    { page: 'cherche-clique',name:'Cherche & clique',          icon: '🔎', cat: 'Compétences',   section: 'Numérique',          themes: ['numérique', 'emploi', 'transports', 'orp'] },
    { page: 'completer',   name: 'Compléter',                 icon: '🧩', cat: 'Compétences',   section: 'Numérique',          themes: ['numérique', 'emploi', 'orp', 'transports', 'santé', 'logement'] },
    { page: 'orientation', name: 'Orientation',               icon: '🗺️', cat: 'Jeu',           section: 'Numérique',          themes: ['numérique', 'transports'] },
    { page: 'vaud-express', name: 'Vaud Express',              icon: '🚆', cat: 'Jeu',           section: 'Numérique',          themes: ['numérique', 'transports', 'géographie'] },
    { page: 'maths-pratiques', name: 'Maths pratiques',       icon: '🧮', cat: 'Compétences',   section: 'Numérique',          themes: ['numérique', 'emploi', 'transports', 'orp'] },
    { page: 'mini-word-trainer', name: 'Mini Word Trainer',   icon: '📄', cat: 'Compétences',   section: 'Numérique',          themes: ['numérique', 'emploi'] },
    { page: 'mini-excel-trainer', name: 'Mini Excel Trainer', icon: '📊', cat: 'Compétences',   section: 'Numérique',          themes: ['numérique', 'emploi'] },
    { page: 'excel-progressif', name: 'Excel progressif',     icon: '📈', cat: 'Compétences',   section: 'Numérique',          themes: ['numérique', 'emploi', 'budget', 'tableur'] },
    { page: 'anagramme',   name: 'Anagramme',                 icon: '🔀', cat: 'Jeu',           section: 'Français',           themes: ['numérique', 'emploi', 'orp', 'transports'] },
    { page: 'apparier',    name: 'Apparier',                  icon: '🔗', cat: 'Jeu',           section: 'Français',           themes: ['numérique', 'emploi', 'orp', 'transports'] },
    { page: 'pendu',       name: 'Pendu',                     icon: '🪢', cat: 'Jeu',           section: 'Français',           themes: ['numérique', 'emploi', 'orp', 'transports', 'santé'] },
    { page: 'vrai-faux',   name: 'Vrai / Faux',               icon: '✅', cat: 'Jeu',           section: 'Emploi & ORP',       themes: ['emploi', 'orp', 'numérique', 'transports'] },
    { page: 'classement',  name: 'Classement',                icon: '📊', cat: 'Jeu',           section: 'Français',           themes: ['numérique', 'emploi', 'orp', 'transports', 'santé', 'logement'] },
    { page: 'mots-croises',name: 'Mots croisés',              icon: '🧱', cat: 'Jeu',           section: 'Français',           themes: ['numérique', 'emploi', 'transports'] },
    { page: 'mots-meles',  name: 'Mots mêlés',                icon: '🔠', cat: 'Jeu',           section: 'Français',           themes: ['numérique', 'emploi', 'transports'] },
    { page: 'demeler',     name: 'Démêler',                   icon: '🧶', cat: 'Jeu',           section: 'Français',           themes: ['numérique', 'emploi', 'orp', 'transports'] },
    { page: 'traces-voleur', name: 'Traces du voleur',         icon: '🕵️', cat: 'Jeu',           section: 'Français',           themes: ['français', 'géographie', 'compréhension', 'monde'] },
    { page: 'quiz',        name: 'Quiz',                      icon: '❓', cat: 'Jeu',           section: 'Emploi & ORP',       themes: ['emploi', 'orp', 'numérique', 'transports'] },
    { page: 'trier',           name: 'Trier',                icon: '🗂️', cat: 'Jeu',           section: 'Emploi & ORP',       themes: ['emploi', 'numérique', 'transports'] },
    { page: 'securite-travail', name: 'Sécurité au travail', icon: '🦺', cat: 'Jeu',           section: 'Emploi & ORP',       themes: ['emploi', 'sécurité', 'orp'] },
    { page: 'simulations-dialogues', name: 'Simulation d’entretien', icon: '💬', cat: 'Communication', section: 'Emploi & ORP', themes: ['emploi', 'orp', 'communication'] },
    { page: 'paire',       name: 'Paires',                    icon: '🃏', cat: 'Jeu',           section: 'Français',           themes: ['numérique', 'emploi', 'transports'] },
    { page: 'evaluations', name: 'Évaluations',               icon: '📈', cat: 'Suivi',         section: null,                 themes: [] },
    { page: 'regles',      name: 'Règles XP',                 icon: '📏', cat: 'Suivi',         section: null,                 themes: [] },
    { page: 'donnees',     name: 'Données',                   icon: '💾', cat: 'Suivi',         section: null,                 themes: [] },
    { page: 'autoevaluation',name:'Autoévaluation',            icon: '🧭', cat: 'Suivi',         section: null,                 themes: [] }
  ];

  const XP_RULES_BY_PAGE = {
    'alphabet':        '+5 XP par bonne réponse.',
    'vocabulaire-metier': '+3 XP par bon verbe choisi.',
    'compréhension':   '+3 XP par texte travaillé.',
    'clavier':         '+1 XP par bonne touche.',
    'cherche-clique':  '+3 XP par clic correct.',
    'apparier':        '+2 XP par paire trouvée.',
    'anagramme':       '+3 XP sans indice, +1 XP avec indice.',
    'completer':       '+3 XP sans indice, +1 XP avec indice.',
    'demeler':         '+5 XP sans indice, +3 XP avec indice.',
    'ecouter':         '+4 XP (1re écoute), +3 XP (2e écoute+).',
    'pendu':           '+5 XP sans indice, +3 XP avec indice.',
    'cliquer':         '+2-3 XP par action correcte.',
    'classement':      '+5 XP par classement parfait.',
    'quiz':            '+3 XP par bonne réponse + bonus de serie.',
    'vrai-faux':       '+2 XP par bonne réponse + bonus de serie.',
    'mots-croises':    '+5 XP par mot trouvé.',
    'mots-meles':      '+3 XP par mot trouvé.',
    'traces-voleur':   '+1 à +3 XP par ville trouvée selon la difficulté, +5 XP pour la mémoire finale.',
    'paire':              '+2 XP par paire mémorisée.',
    'securite-travail':   '+3 XP par phrase correcte.',
    'trier':           '+2 XP par élément correct (reduit par les erreurs).',
    'formulaire':      '+6-9 XP par formulaire réussi (bonus si sans indice).',
    'email-ecrire':    '+3 XP par bonne réponse.',
    'mise-en-forme':   '+3 XP par e-mail bien mis en forme.',
    'email-pro':       '+3 XP par bonne réponse.',
    'retaper':         '+7 XP parfait, +5 XP (>=90%), +3 XP (>=70%), +1 XP sinon. -1 XP si indice.',
    'simulations-dialogues': '+3 XP (bonne réponse), +1 XP (réponse moyenne).',
    'orientation':     '+3 XP arrivée à destination, +2 XP chemin parfait.'
    ,
    'vaud-express':    '+3 XP par ville trouvée, +5 XP par défi mémoire réussi.',
    'maths-pratiques': '+3 XP par bonne réponse, +1 XP par exercice tenté.',
    'mini-word-trainer': '+5 XP par mission réussie.',
    'mini-excel-trainer': '+5 XP par mission réussie.',
    'excel-progressif': '+2 XP par consigne cochée.'
  };

  const EXERCISE_DETAILS_BY_PAGE = {
    'formulaire': {
      summary: 'Remplir des champs avec les bonnes informations, comme dans une candidature ou une inscription.',
      objective: 'Gagner en aisance avec les formulaires administratifs et professionnels.',
      practice: 'Identité, coordonnées, choix de documents, vérification avant envoi.',
      useWhen: 'Avant une démarche ORP, une inscription ou une postulation.'
    },
    'email-ecrire': {
      summary: 'Choisir l’e-mail adapté à une situation simple et comprendre le ton attendu.',
      objective: 'Reconnaître une reponse claire, polie et utile.',
      practice: 'Objet, formule de politesse, message court, demande précise.',
      useWhen: 'Pour préparer les premiers e-mails de candidature.'
    },
    'mise-en-forme': {
      summary: 'Transformer un e-mail brut en message clair avec objet, lignes et ponctuation.',
      objective: 'Apprendre à rendre un message professionnel plus lisible.',
      practice: 'Objet, salutation, paragraphes, ponctuation, formule finale.',
      useWhen: 'Avant d’écrire ou relire un e-mail important.'
    },
    'email-pro': {
      summary: 'Lire un e-mail professionnel et choisir une reponse correcte.',
      objective: 'Répondre avec calme, précision et respect du contexte.',
      practice: 'Compréhension, priorités, ton professionnel, informations importantes.',
      useWhen: 'Pour s’entraîner aux messages ORP, employeur ou formation.'
    },
    'retaper': {
      summary: 'Recopier un message avec attention pour travailler la saisie et la précision.',
      objective: 'Améliorer la frappe et réduire les oublis dans un texte court.',
      practice: 'Orthographe, ponctuation, accents, lecture ligne par ligne.',
      useWhen: 'Quand la personne veut gagner en confiance au clavier.'
    },
    'alphabet': {
      summary: 'Remettre des mots dans l’ordre alphabétique.',
      objective: 'Se repérer dans une liste, un classement ou un répertoire.',
      practice: 'Lettres, ordre, comparaison de mots, lecture attentive.',
      useWhen: 'Avant les activités de recherche, classement ou vocabulaire.'
    },
    'vocabulaire-metier': {
      summary: 'Choisir le bon verbe conjugué dans des phrases liées aux métiers.',
      objective: 'Renforcer le vocabulaire professionnel et les temps de base.',
      practice: 'Présent, imparfait, passé composé, passé récent, futur proche et futur simple.',
      useWhen: 'Pour préparer une séquence sur les métiers, les stages ou l’emploi.'
    },
    'compréhension': {
      summary: 'Écouter un texte A2, répondre aux questions, puis afficher le texte avec le code formateur.',
      objective: 'Développer la compréhension écrite et orale à partir de situations simples du quotidien.',
      practice: 'Écoute, lecture, repérage d’informations, réponses courtes, correction guidée.',
      useWhen: 'Pour travailler le français en groupe, avec lecture cachée puis vérification.'
    },
    'clavier': {
      summary: 'S’entraîner a trouver les touches et a taper plus régulièrement.',
      objective: 'Construire des automatismes simples sur le clavier.',
      practice: 'Lettres, chiffres, touches utiles, rythme de frappe.',
      useWhen: 'En début de parcours numérique ou avant les e-mails.'
    },
    'ecouter': {
      summary: 'Écouter une consigne ou une phrase, puis choisir la bonne réponse.',
      objective: 'Renforcer la compréhension orale dans des situations courtes.',
      practice: 'Attention auditive, mots-clés, consignes, reformulation.',
      useWhen: 'Pour préparer un appel, un accueil ou un rendez-vous.'
    },
    'cliquer': {
      summary: 'Pointer, cliquer et valider des éléments visibles à l’écran.',
      objective: 'Rendre le geste de la souris plus fluide et plus sûr.',
      practice: 'Clic simple, observation, précision, sélection.',
      useWhen: 'Comme échauffement numérique ou avec les débutants.'
    },
    'cherche-clique': {
      summary: 'Trouver une information demandée puis cliquer au bon endroit.',
      objective: 'Apprendre a chercher visuellement sans se précipiter.',
      practice: 'Observation, mots repères, navigation, vérification.',
      useWhen: 'Avant des recherches web ou des formulaires longs.'
    },
    'completer': {
      summary: 'Compléter une phrase ou une information manquante.',
      objective: 'Relier le sens d une phrase avec le mot ou l information correcte.',
      practice: 'Contexte, vocabulaire, grammaire simple, logique de phrase.',
      useWhen: 'Pour consolider la lecture fonctionnelle.'
    },
    'orientation': {
      summary: 'Se déplacer dans une grille et rejoindre une destination.',
      objective: 'Travailler les repères spatiaux et les consignes de direction.',
      practice: 'Haut, bas, gauche, droite, anticipation, chemin court.',
      useWhen: 'Pour préparer l orientation sur plan ou dans une interface.'
    },
    'vaud-express': {
      summary: 'Lire une étape de voyage, retrouver une ville vaudoise sur une vraie carte, puis mémoriser le parcours.',
      objective: 'Renforcer le repérage sur plan, la précision de la souris et la mémoire de séquence.',
      practice: 'Zoom, déplacement de carte, clic précis, lecture de noms de villes, ordre d’un trajet.',
      useWhen: 'Pour travailler les transports, les rendez-vous et l’orientation dans le canton de Vaud.'
    },
    'maths-pratiques': {
      summary: 'Résoudre de petits calculs lies au travail et au quotidien.',
      objective: 'Rendre les nombres utiles et moins intimidants.',
      practice: 'Quantités, prix, horaires, comparaisons, calcul mental simple.',
      useWhen: 'Pour vente, logistique, horaires ou budget.'
    },
    'mini-word-trainer': {
      summary: 'Réaliser de petites missions dans un environnement type traitement de texte.',
      objective: 'Découvrir les gestes de base pour mettre un document en forme.',
      practice: 'Saisie, sélection, gras, titres, alignement, étapes.',
      useWhen: 'Avant un CV, une lettre ou un document administratif.'
    },
    'mini-excel-trainer': {
      summary: 'Manipuler des données simples dans une feuille de calcul.',
      objective: 'Comprendre les bases d un tableau sans surcharge technique.',
      practice: 'Cellules, lignes, colonnes, calculs simples, lecture de tableau.',
      useWhen: 'Pour un emploi avec listes, stocks ou horaires.'
    },
    'excel-progressif': {
      summary: 'Suivre 24 fiches Excel graduées, du clic dans une cellule aux formules et graphiques simples.',
      objective: 'Construire les automatismes du tableur une compétence à la fois.',
      practice: 'Saisie, sélection, mise en forme, bordures, tri, filtre, SOMME, SI, NB.SI et graphique.',
      useWhen: 'Pour préparer un atelier bureautique, un emploi administratif ou un suivi de candidatures.'
    },
    'anagramme': {
      summary: 'Remettre les lettres dans le bon ordre pour retrouver un mot.',
      objective: 'Renforcer le vocabulaire par manipulation active.',
      practice: 'Lettres, sons, mémoire visuelle, essai-erreur.',
      useWhen: 'Pour travailler les mots utiles de façon ludique.'
    },
    'apparier': {
      summary: 'Associer deux éléments qui vont ensemble.',
      objective: 'Construire des liens entre mots, images, définitions ou situations.',
      practice: 'Association, catégorisation, compréhension, vocabulaire.',
      useWhen: 'Pour introduire ou réviser un theme.'
    },
    'pendu': {
      summary: 'Deviner un mot lettre par lettre avec un nombre limité d erreurs.',
      objective: 'Stimuler la mémoire des mots et l’attention aux lettres.',
      practice: 'Orthographe, vocabulaire, hypothèses, persévérance.',
      useWhen: 'En consolidation, quand le vocabulaire est déjà rencontre.'
    },
    'vrai-faux': {
      summary: 'Dire si une affirmation est correcte ou non.',
      objective: 'Développer le jugement rapide sans perdre la compréhension.',
      practice: 'Lecture, vérification, consignes, réflexes professionnels.',
      useWhen: 'Pour vérifier des acquis après une explication.'
    },
    'classement': {
      summary: 'Ranger des éléments dans la bonne catégorie.',
      objective: 'Structurer les informations pour mieux les retenir.',
      practice: 'Tri mental, catégories, vocabulaire, logique.',
      useWhen: 'Quand plusieurs notions se ressemblent.'
    },
    'mots-croises': {
      summary: 'Trouver des mots à partir d indices et les placer dans une grille.',
      objective: 'Travailler le vocabulaire avec indices et orthographe.',
      practice: 'Définition, déduction, lettres croisées, attention.',
      useWhen: 'Pour une révision calme et approfondie.'
    },
    'mots-meles': {
      summary: 'Repérer des mots cachés dans une grille de lettres.',
      objective: 'Améliorer le balayage visuel et la reconnaissance des mots.',
      practice: 'Lecture globale, attention, orientation, vocabulaire.',
      useWhen: 'Pour échauffer la lecture ou réviser une liste de mots.'
    },
    'demeler': {
      summary: 'Remettre des lettres mélangées dans l ordre.',
      objective: 'Renforcer la construction des mots et l orthographe.',
      practice: 'Observation des lettres, syllabes, indices, correction.',
      useWhen: 'Entre lecture et écriture pour consolider un mot.'
    },
    'traces-voleur': {
      summary: 'Lire des énigmes, retrouver des villes du monde sur une carte, puis reconstruire le trajet.',
      objective: 'Travailler la compréhension écrite, les indices culturels et le repérage géographique.',
      practice: 'Lecture d’indices, déduction, clic sur carte, continents, capitales et mémoire chronologique.',
      useWhen: 'Pour une activité de français orientée monde, voyage, discussion et culture générale.'
    },
    'quiz': {
      summary: 'Répondre a des questions simples sur des situations concrètes.',
      objective: 'Vérifier la compréhension et faire ressortir les points a revoir.',
      practice: 'Choix, lecture de question, raisonnement, connaissances pratiques.',
      useWhen: 'En fin de séquence ou avant une évaluation.'
    },
    'trier': {
      summary: 'Placer rapidement des éléments dans la bonne colonne.',
      objective: 'Automatiser des distinctions utiles dans l emploi et le quotidien.',
      practice: 'Decision, catégories, rapidité calme, correction.',
      useWhen: 'Pour passer de la compréhension a l action.'
    },
    'simulations-dialogues': {
      summary: 'S’entraîner a choisir une reponse dans un dialogue d entretien.',
      objective: 'Preparer les reactions professionnelles dans un echange oral.',
      practice: 'Posture, formulation, ecoute, priorités, entretien.',
      useWhen: 'Avant un entretien, un rendez-vous ORP ou une simulation en groupe.'
    },
    'paire': {
      summary: 'Retourner des cartes et retrouver les paires correspondantes.',
      objective: 'Mémoriser du vocabulaire en mobilisant l’attention visuelle.',
      practice: 'Memoire, association, concentration, vocabulaire.',
      useWhen: 'Pour finir une séquence sur une note active.'
    },
    'securite-travail': {
      summary: 'Remettre les mots dans le bon ordre pour former une règle de sécurité au travail.',
      objective: 'Mémoriser les consignes essentielles en milieu professionnel.',
      practice: 'Ordre des mots, vocabulaire sécurité, consignes, EPI, gestes corrects.',
      useWhen: 'En préparation d’un stage, d’un job ou d’une formation pratique.'
    }
  };

  const CATEGORY_CONTENT_BY_CATEGORY = {
    Candidature: {
      title: 'Formulaire et papiers',
      desc: 'Écrire les bonnes informations et choisir les bons documents.'
    },
    Communication: {
      title: 'E-mails simples',
      desc: 'Lire une situation et choisir ou écrire la bonne réponse.'
    },
    Navigation: {
      title: 'Ordinateur et internet',
      desc: 'Utiliser les fenêtres, les dossiers et les pages internet.'
    },
    Langue: {
      title: 'Lire, écouter, écrire',
      desc: 'Travailler les mots, les lettres, l ecoute et le clavier.'
    },
    Compétences: {
      title: 'Petites actions utiles',
      desc: 'Observer, cliquer, compléter et faire une action simple.'
    },
    Jeu: {
      title: 'Apprendre avec le jeu',
      desc: 'Mémoriser, trier, apparier et répondre en jouant.'
    }
  };

  const meta = {};
  const orderedPages = [];
  const xpByPage = {};
  for (const e of entries) {
    meta[e.page] = {
      name: e.name,
      icon: e.icon,
      cat: e.cat,
      section: e.section || null,
      themes: e.themes || [],
      details: EXERCISE_DETAILS_BY_PAGE[e.page] || null,
      href: e.page + '.html'
    };
    if (!nonOrderedPages.includes(e.page)) {
      orderedPages.push(e.page);
      xpByPage[e.page] = XP_RULES_BY_PAGE[e.page] || { perCorrect: 1, perAttempt: 0, completionBonus: 3 };
    }
  }

  window.EXERCISE_CONFIG = {
    meta,
    orderedPages,
    nonOrderedPages,
    bonusExercises: [],
    categoryContentByCategory: CATEGORY_CONTENT_BY_CATEGORY,
    xpRules: { byPage: xpByPage },
    apps: [
      {
        name: 'Generateur de CV',
        icon: '📄',
        desc: 'Creez votre CV et votre lettre de motivation etape par etape. Export Word, sans internet.',
        href: 'generateur-cv/generateur-cv.html'
      },
      {
        name: 'Compétences CV',
        icon: 'CV',
        desc: 'Choisissez un metier et copiez des competences simples a coller dans Word.',
        href: 'cv-competences.html'
      },
      {
        name: 'Simulateur d\'e-mails professionnels',
        icon: '📧',
        desc: 'Choisissez un sujet, completez les champs, puis copiez et envoyez votre e-mail.',
        href: 'simulateur-email/simulateur-email.html'
      }
    ]
  };
})();
