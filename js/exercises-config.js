'use strict';

(function initExerciseConfig() {
  const nonOrderedPages = ['accueil', 'evaluations', 'regles', 'donnees', 'autoevaluation'];

  /*
   * themes : thèmes de vie couverts par l'exercice
   * section : regroupement d'affichage sur l'accueil
   */
  const entries = [
    { page: 'accueil',     name: 'Accueil',                  icon: '🏠', cat: 'Navigation',   section: null,                 themes: [] },
    { page: 'formulaire',  name: 'Formulaire',                icon: '📝', cat: 'Candidature',  section: 'Emploi & ORP',       themes: ['numérique', 'emploi', 'orp'] },
    { page: 'email-ecrire',name: 'Ecrire un e-mail',          icon: '✉️', cat: 'Communication',section: 'Emploi & ORP',       themes: ['numérique', 'emploi'] },
    { page: 'email-pro',   name: 'E-mails professionnels',    icon: '📧', cat: 'Communication',section: 'Emploi & ORP',       themes: ['numérique', 'emploi', 'orp'] },
    { page: 'retaper',     name: 'Retaper',                   icon: '✍️', cat: 'Communication',section: 'Emploi & ORP',       themes: ['numérique', 'emploi'] },
    { page: 'alphabet',    name: 'Alphabet',                  icon: '🔤', cat: 'Langue',        section: 'Français',           themes: ['numérique', 'emploi', 'transports', 'orp', 'logement'] },
    { page: 'clavier',     name: 'Clavier',                   icon: '⌨️', cat: 'Langue',        section: 'Numérique',          themes: ['numérique', 'emploi', 'transports', 'orp'] },
    { page: 'ecouter',     name: 'Ecouter',                   icon: '🎧', cat: 'Langue',        section: 'Français',           themes: ['numérique', 'orp', 'transports'] },
    { page: 'cliquer',     name: 'Cliquer',                   icon: '🖱️', cat: 'Competences',   section: 'Numérique',          themes: ['numérique', 'emploi', 'transports'] },
    { page: 'cherche-clique',name:'Cherche & clique',          icon: '🔎', cat: 'Competences',   section: 'Numérique',          themes: ['numérique', 'emploi', 'transports', 'orp'] },
    { page: 'completer',   name: 'Completer',                 icon: '🧩', cat: 'Competences',   section: 'Numérique',          themes: ['numérique', 'emploi', 'orp', 'transports', 'santé', 'logement'] },
    { page: 'orientation', name: 'Orientation',               icon: '🗺️', cat: 'Jeu',           section: 'Numérique',          themes: ['numérique', 'transports'] },
    { page: 'maths-pratiques', name: 'Maths pratiques',       icon: '🧮', cat: 'Competences',   section: 'Numérique',          themes: ['numérique', 'emploi', 'transports', 'orp'] },
    { page: 'mini-word-trainer', name: 'Mini Word Trainer',   icon: '📄', cat: 'Competences',   section: 'Numérique',          themes: ['numérique', 'emploi'] },
    { page: 'mini-excel-trainer', name: 'Mini Excel Trainer', icon: '📊', cat: 'Competences',   section: 'Numérique',          themes: ['numérique', 'emploi'] },
    { page: 'anagramme',   name: 'Anagramme',                 icon: '🔀', cat: 'Jeu',           section: 'Français',           themes: ['numérique', 'emploi', 'orp', 'transports'] },
    { page: 'apparier',    name: 'Apparier',                  icon: '🔗', cat: 'Jeu',           section: 'Français',           themes: ['numérique', 'emploi', 'orp', 'transports'] },
    { page: 'pendu',       name: 'Pendu',                     icon: '🪢', cat: 'Jeu',           section: 'Français',           themes: ['numérique', 'emploi', 'orp', 'transports', 'santé'] },
    { page: 'vrai-faux',   name: 'Vrai / Faux',               icon: '✅', cat: 'Jeu',           section: 'Emploi & ORP',       themes: ['emploi', 'orp', 'numérique', 'transports'] },
    { page: 'classement',  name: 'Classement',                icon: '📊', cat: 'Jeu',           section: 'Français',           themes: ['numérique', 'emploi', 'orp', 'transports', 'santé', 'logement'] },
    { page: 'mots-croises',name: 'Mots croises',              icon: '🧱', cat: 'Jeu',           section: 'Français',           themes: ['numérique', 'emploi', 'transports'] },
    { page: 'mots-meles',  name: 'Mots meles',                icon: '🔠', cat: 'Jeu',           section: 'Français',           themes: ['numérique', 'emploi', 'transports'] },
    { page: 'demeler',     name: 'Demeler',                   icon: '🧶', cat: 'Jeu',           section: 'Français',           themes: ['numérique', 'emploi', 'orp', 'transports'] },
    { page: 'quiz',        name: 'Quiz',                      icon: '❓', cat: 'Jeu',           section: 'Emploi & ORP',       themes: ['emploi', 'orp', 'numérique', 'transports'] },
    { page: 'trier',       name: 'Trier',                     icon: '🗂️', cat: 'Jeu',           section: 'Emploi & ORP',       themes: ['emploi', 'numérique', 'transports'] },
    { page: 'paire',       name: 'Paires',                    icon: '🃏', cat: 'Jeu',           section: 'Français',           themes: ['numérique', 'emploi', 'transports'] },
    { page: 'evaluations', name: 'Evaluations',               icon: '📈', cat: 'Suivi',         section: null,                 themes: [] },
    { page: 'regles',      name: 'Regles XP',                 icon: '📏', cat: 'Suivi',         section: null,                 themes: [] },
    { page: 'donnees',     name: 'Donnees',                   icon: '💾', cat: 'Suivi',         section: null,                 themes: [] },
    { page: 'autoevaluation',name:'Autoévaluation',            icon: '🧭', cat: 'Suivi',         section: null,                 themes: [] }
  ];

  const XP_RULES_BY_PAGE = {
    'alphabet':        '+5 XP par bonne reponse.',
    'clavier':         '+1 XP par bonne touche.',
    'cherche-clique':  '+3 XP par clic correct.',
    'apparier':        '+2 XP par paire trouvee.',
    'anagramme':       '+3 XP sans indice, +1 XP avec indice.',
    'completer':       '+3 XP sans indice, +1 XP avec indice.',
    'demeler':         '+5 XP sans indice, +3 XP avec indice.',
    'ecouter':         '+4 XP (1re ecoute), +3 XP (2e ecoute+).',
    'pendu':           '+5 XP sans indice, +3 XP avec indice.',
    'cliquer':         '+2-3 XP par action correcte.',
    'classement':      '+5 XP par classement parfait.',
    'quiz':            '+3 XP par bonne reponse + bonus de serie.',
    'vrai-faux':       '+2 XP par bonne reponse + bonus de serie.',
    'mots-croises':    '+5 XP par mot trouve.',
    'mots-meles':      '+3 XP par mot trouve.',
    'paire':           '+2 XP par paire memorisee.',
    'trier':           '+2 XP par element correct (reduit par les erreurs).',
    'formulaire':      '+6-9 XP par formulaire reussi (bonus si sans indice).',
    'email-ecrire':    '+3 XP par bonne reponse.',
    'email-pro':       '+3 XP par bonne reponse.',
    'retaper':         '+7 XP parfait, +5 XP (>=90%), +3 XP (>=70%), +1 XP sinon. -1 XP si indice.',
    'simulations-dialogues': '+3 XP (bonne reponse), +1 XP (reponse moyenne).',
    'orientation':     '+3 XP arrivee a destination, +2 XP chemin parfait.'
    ,
    'maths-pratiques': '+3 XP par bonne reponse, +1 XP par exercice tente.',
    'mini-word-trainer': '+5 XP par mission reussie.',
    'mini-excel-trainer': '+5 XP par mission reussie.'
  };

  const CATEGORY_CONTENT_BY_CATEGORY = {
    Candidature: {
      title: 'Formulaire et papiers',
      desc: 'Ecrire les bonnes informations et choisir les bons documents.'
    },
    Communication: {
      title: 'E-mails simples',
      desc: 'Lire une situation et choisir ou ecrire la bonne reponse.'
    },
    Navigation: {
      title: 'Ordinateur et internet',
      desc: 'Utiliser les fenetres, les dossiers et les pages internet.'
    },
    Langue: {
      title: 'Lire, ecouter, ecrire',
      desc: 'Travailler les mots, les lettres, l ecoute et le clavier.'
    },
    Competences: {
      title: 'Petites actions utiles',
      desc: 'Observer, cliquer, completer et faire une action simple.'
    },
    Jeu: {
      title: 'Apprendre avec le jeu',
      desc: 'Memoriser, trier, apparier et repondre en jouant.'
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
        name: 'Competences CV',
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
