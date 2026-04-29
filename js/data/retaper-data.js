/* ===== JS/DATA/RETAPER-DATA.JS ===== */
'use strict';

window.RETAPER_DATA = [
  {
    category: 'Candidature spontanée',
    difficulty: 'easy',
    theme: 'emploi',
    contexte: 'Vous cherchez du travail dans un restaurant. Vous écrivez un e-mail spontané.',
    sujet: 'Candidature spontanée – Aide en cuisine',
    corps: 'Bonjour,\n\nJe vous contacte pour vous proposer ma candidature.\nJe cherche un travail d\'aide en cuisine.\nJe suis disponible immédiatement et motivé.\n\nCordialement,\nAli Hassan',
    profileVariants: {
      homme: { signature: 'Ali Hassan' },
      femme: { signature: 'Sara Müller', replacements: [['motivé', 'motivée']] }
    },
    hint: 'Commencez par "Bonjour," avec une virgule, puis sautez une ligne avant le texte.'
  },
  {
    category: 'Rendez-vous',
    difficulty: 'easy',
    theme: 'emploi',
    contexte: 'Vous avez un rendez-vous. Vous envoyez un e-mail pour confirmer.',
    sujet: 'Confirmation de rendez-vous',
    corps: 'Bonjour,\n\nJe vous confirme mon rendez-vous du mardi 15 janvier à 10h.\nJe serai présent à l\'heure.\n\nMerci et à bientôt,\nSara Müller',
    profileVariants: {
      homme: { signature: 'Ali Hassan', replacements: [['présente', 'présent']] },
      femme: { signature: 'Sara Müller', replacements: [['présent', 'présente']] }
    },
    hint: 'Faites attention à la virgule après "Bonjour" et à l\'accent sur "présent".'
  },
  {
    category: 'Demande de renseignements',
    difficulty: 'easy',
    theme: 'numérique',
    contexte: 'Vous voulez vous inscrire à des cours de français. Vous demandez des informations.',
    sujet: 'Demande de renseignements – Cours de français',
    corps: 'Bonjour,\n\nJe souhaite m\'inscrire à vos cours de français.\nPourriez-vous m\'envoyer les horaires et le prix ?\n\nMerci d\'avance,\nPedro Silva',
    profileVariants: {
      homme: { signature: 'Pedro Silva' },
      femme: { signature: 'Fatima El Amrani' }
    },
    hint: 'Le point d\'interrogation vient juste après la phrase question.'
  },
  {
    category: 'Candidature spontanée',
    difficulty: 'medium',
    theme: 'emploi',
    contexte: 'Vous cherchez un travail en magasin. Vous écrivez une candidature spontanée.',
    sujet: 'Candidature spontanée – Aide en magasin',
    corps: 'Bonjour,\n\nJe me permets de vous contacter pour vous proposer ma candidature.\nJe cherche un poste de vendeur ou d\'aide en magasin.\nJ\'ai de l\'expérience dans la vente et je parle français et anglais.\nJe suis disponible rapidement.\n\nCordialement,\nFatima El Amrani',
    profileVariants: {
      homme: { signature: 'Ivan Petrov', replacements: [['un poste de vendeur', 'un poste de vendeur']] },
      femme: { signature: 'Fatima El Amrani', replacements: [['un poste de vendeur', 'un poste de vendeuse']] }
    },
    hint: 'La formule "Je me permets de vous contacter" est une phrase clé à apprendre par cœur.'
  },
  {
    category: 'Email ciblé',
    difficulty: 'medium',
    theme: 'emploi',
    contexte: 'Vous avez vu une annonce pour un poste d\'agent de nettoyage. Vous répondez à cette annonce.',
    sujet: 'Réponse à votre annonce – Agent de nettoyage',
    corps: 'Madame, Monsieur,\n\nJ\'ai vu votre annonce pour un poste d\'agent de nettoyage.\nJe suis intéressé et je pense avoir le profil que vous recherchez.\nJ\'ai travaillé deux ans dans une entreprise de nettoyage.\nJe suis rigoureux et ponctuel.\n\nCordialement,\nIvan Petrov',
    profileVariants: {
      homme: { signature: 'Ivan Petrov' },
      femme: { signature: 'Nadia Bouzid', replacements: [['intéressé', 'intéressée'], ['rigoureux', 'rigoureuse'], ['ponctuel', 'ponctuelle']] }
    },
    hint: 'Quand on ne connaît pas le nom, on écrit "Madame, Monsieur," avec une virgule.'
  },
  {
    category: 'Email ciblé',
    difficulty: 'medium',
    theme: 'emploi',
    contexte: 'Vous répondez à une annonce pour un poste de maçon dans une entreprise de construction.',
    sujet: 'Candidature – Poste de maçon',
    corps: 'Madame, Monsieur,\n\nSuite à votre annonce, je vous soumets ma candidature pour le poste de maçon.\nJ\'ai cinq ans d\'expérience dans le bâtiment.\nJe suis disponible immédiatement et prêt à travailler en équipe.\nJe reste à votre disposition pour un entretien.\n\nCordialement,\nDragos Ionescu',
    profileVariants: {
      homme: { signature: 'Dragos Ionescu' },
      femme: { signature: 'Elena Sousa', replacements: [['prêt', 'prête']] }
    },
    hint: '"Suite à votre annonce" est une formule courante pour répondre à une offre d\'emploi.'
  },
  {
    category: 'Relance',
    difficulty: 'medium',
    theme: 'emploi',
    contexte: 'Vous avez envoyé une candidature il y a deux semaines. Vous relancez l\'employeur.',
    sujet: 'Relance de ma candidature',
    corps: 'Bonjour,\n\nJe me permets de vous relancer suite à mon e-mail du 5 janvier.\nJe vous avais envoyé ma candidature pour un poste en cuisine.\nJe suis toujours intéressé et disponible.\nAvez-vous eu le temps d\'étudier les candidatures ?\n\nCordialement,\nAli Hassan',
    profileVariants: {
      homme: { signature: 'Ali Hassan' },
      femme: { signature: 'Sara Müller', replacements: [['intéressé', 'intéressée']] }
    },
    hint: '"Je me permets de vous relancer" est la formule pour rappeler sans être impoli.'
  },
  {
    category: 'Email ciblé',
    difficulty: 'hard',
    theme: 'emploi',
    contexte: 'Vous répondez à une annonce pour un poste de garde d\'enfants dans une famille.',
    sujet: 'Candidature – Garde d\'enfants',
    corps: 'Madame, Monsieur,\n\nJ\'ai lu votre annonce pour un poste de garde d\'enfants et je suis très intéressée.\nJ\'ai quatre ans d\'expérience avec des enfants de 2 à 10 ans.\nJe suis patiente, dynamique et j\'aime travailler avec les enfants.\nJe suis disponible les matins et les après-midis en semaine.\nJe serai heureuse de vous rencontrer pour un entretien.\n\nCordialement,\nNadia Bouzid',
    profileVariants: {
      homme: { signature: 'Pedro Silva', replacements: [['intéressée', 'intéressé'], ['patiente', 'patient'], ['heureuse', 'heureux']] },
      femme: { signature: 'Nadia Bouzid' }
    },
    hint: 'Faites attention aux accents : "intéressée", "patiente", "après-midis".'
  },
  {
    category: 'Email ciblé',
    difficulty: 'hard',
    theme: 'emploi',
    contexte: 'Vous répondez à une offre d\'emploi de secrétaire dans une PME.',
    sujet: 'Candidature – Poste de secrétaire',
    corps: 'Madame, Monsieur,\n\nJe vous contacte suite à votre offre d\'emploi pour un poste de secrétaire.\nJe possède trois ans d\'expérience en secrétariat et maîtrise les outils informatiques.\nJe suis organisée, discrète et à l\'aise au téléphone.\nMon CV et ma lettre de motivation sont joints à ce message.\nJe reste disponible pour tout complément d\'information.\n\nCordialement,\nElena Sousa',
    profileVariants: {
      homme: { signature: 'Ivan Petrov', replacements: [['organisée', 'organisé'], ['discrète', 'discret']] },
      femme: { signature: 'Elena Sousa' }
    },
    hint: '"Je possède" et "je maîtrise" sont des formules fortes pour montrer vos compétences.'
  },
  {
    category: 'Remerciement',
    difficulty: 'hard',
    theme: 'emploi',
    contexte: 'Vous venez de passer un entretien d\'embauche. Vous envoyez un e-mail de remerciement.',
    sujet: 'Remerciement suite à notre entretien',
    corps: 'Bonjour,\n\nJe vous remercie pour l\'entretien que vous m\'avez accordé aujourd\'hui.\nJ\'ai été très intéressée par le poste et par votre entreprise.\nNotre échange m\'a encore plus motivée à rejoindre votre équipe.\nJe reste à votre disposition et dans l\'attente de votre réponse.\n\nCordialement,\nSara Müller',
    profileVariants: {
      homme: { signature: 'Ali Hassan', replacements: [['intéressée', 'intéressé'], ['motivée', 'motivé']] },
      femme: { signature: 'Sara Müller' }
    },
    hint: 'Envoyer un remerciement après un entretien montre votre sérieux et votre motivation.'
  },

  {
    category: 'Sant\u00e9',
    difficulty: 'easy',
    theme: 'sant\u00e9',
    contexte: 'Vous avez un rendez-vous chez le m\u00e9decin. Vous envoyez un e-mail pour confirmer votre pr\u00e9sence.',
    sujet: 'Confirmation de rendez-vous m\u00e9dical',
    corps: 'Bonjour,\n\nJe vous confirme mon rendez-vous du mercredi 20 mai \u00e0 14h30.\nJe serai pr\u00e9sent \u00e0 l\'heure.\n\nMerci et \u00e0 bient\u00f4t,\nKarim Belhadj',
    profileVariants: {
      homme: { signature: 'Karim Belhadj' },
      femme: { signature: 'Leila Ouali', replacements: [['pr\u00e9sent', 'pr\u00e9sente']] }
    },
    hint: 'N\u2019oubliez pas de mentionner le jour, l\u2019heure et la date du rendez-vous.'
  },

  {
    category: 'Logement',
    difficulty: 'medium',
    theme: 'logement',
    contexte: 'Votre chauffage ne fonctionne pas. Vous \u00e9crivez un e-mail \u00e0 la g\u00e9rance pour signaler le probl\u00e8me.',
    sujet: 'Signalement d\'un probl\u00e8me de chauffage',
    corps: 'Madame, Monsieur,\n\nJe vous contacte car le chauffage de mon appartement ne fonctionne pas depuis lundi.\nJ\'habite au 3e \u00e9tage, appartement 12, au chemin des C\u00e8dres 5 \u00e0 Lausanne.\nPourriez-vous envoyer quelqu\'un pour r\u00e9parer le probl\u00e8me ?\n\nCordialement,\nSofia Nguyen',
    profileVariants: {
      homme: { signature: 'Omar Ciss\u00e9' },
      femme: { signature: 'Sofia Nguyen' }
    },
    hint: 'Donnez votre adresse compl\u00e8te et d\u00e9crivez clairement le probl\u00e8me.'
  },

  {
    category: 'Banque',
    difficulty: 'medium',
    theme: 'num\u00e9rique',
    contexte: 'Vous voulez ouvrir un compte bancaire. Vous envoyez un e-mail pour demander des informations.',
    sujet: 'Demande d\'informations \u2013 Ouverture de compte',
    corps: 'Bonjour,\n\nJe souhaite ouvrir un compte bancaire en Suisse.\nPourriez-vous m\'indiquer les documents n\u00e9cessaires et les horaires de votre agence ?\n\nMerci d\'avance,\nEmilio Santos',
    profileVariants: {
      homme: { signature: 'Emilio Santos' },
      femme: { signature: 'Yasmine Tabet' }
    },
    hint: '"Pourriez-vous" est une formule polie pour demander des informations.'
  },

  {
    category: 'Absence',
    difficulty: 'easy',
    theme: 'emploi',
    contexte: 'Vous \u00eates malade et ne pouvez pas venir travailler. Vous \u00e9crivez un e-mail \u00e0 votre employeur.',
    sujet: 'Absence pour maladie',
    corps: 'Bonjour,\n\nJe vous informe que je suis malade aujourd\'hui et ne peux pas venir travailler.\nJe vais consulter un m\u00e9decin et vous enverrai un certificat m\u00e9dical.\n\nCordialement,\nJose Ferreira',
    profileVariants: {
      homme: { signature: 'Jose Ferreira' },
      femme: { signature: 'Amira Benali' }
    },
    hint: '"Je vous informe que" est une formule utile pour annoncer une situation importante.'
  }
];
