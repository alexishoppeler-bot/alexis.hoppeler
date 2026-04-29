/* ===== JS/DATA/COMPLETER-DATA.JS ===== */
'use strict';

window.COMPLETER_DATA = [
  {
    category: 'Formulaire',
    difficulty: 'easy',
    theme: 'numérique',
    text: "J'écris mon ___ de famille dans la première case.",
    answer: 'nom',
    choices: ['nom', 'pays', 'mail', 'document'],
    hint: 'Exemple : Dupont.'
  },
  {
    category: 'Formulaire',
    difficulty: 'easy',
    theme: 'numérique',
    text: "J'écris mon ___ après le nom.",
    answer: 'prénom',
    choices: ['prénom', 'âge', 'numéro', 'titre'],
    hint: 'Exemple : Nadia.'
  },
  {
    category: 'Adresse',
    difficulty: 'easy',
    theme: 'numérique',
    text: "J'écris mon ___ complète avec la rue et le numéro.",
    answer: 'adresse',
    choices: ['adresse', 'signature', 'photo', 'question'],
    hint: "C'est l'endroit où vous habitez."
  },
  {
    category: 'Contact',
    difficulty: 'easy',
    theme: 'numérique',
    text: "J'écris mon numéro de ___ pour être contacté.",
    answer: 'téléphone',
    choices: ['téléphone', 'passeport', 'clavier', 'papier'],
    hint: 'En Suisse, il commence souvent par 07.'
  },
  {
    category: 'Contact',
    difficulty: 'easy',
    theme: 'numérique',
    text: "J'écris mon ___ pour recevoir un message électronique.",
    answer: 'e-mail',
    choices: ['e-mail', 'nom', 'pays', 'stylo'],
    hint: 'Exemple : nom@email.ch'
  },
  {
    category: 'Identité',
    difficulty: 'easy',
    theme: 'numérique',
    text: "J'écris ma date de ___ : jour, mois, année.",
    answer: 'naissance',
    choices: ['naissance', 'ville', 'réponse', 'case'],
    hint: 'Exemple : 12.05.1990'
  },
  {
    category: 'Adresse',
    difficulty: 'easy',
    theme: 'numérique',
    text: "J'écris le code ___ de ma commune.",
    answer: 'postal',
    choices: ['postal', 'civil', 'numérique', 'simple'],
    hint: 'Exemple : 1003.'
  },
  {
    category: 'Adresse',
    difficulty: 'easy',
    theme: 'numérique',
    text: "J'écris le nom de ma ___ après le code postal.",
    answer: 'ville',
    choices: ['ville', 'date', 'ligne', 'page'],
    hint: 'Exemple : Lausanne.'
  },
  {
    category: 'Document',
    difficulty: 'easy',
    theme: 'numérique',
    text: 'À la fin du formulaire, je mets ma ___.',
    answer: 'signature',
    choices: ['signature', 'photo', 'copie', 'fenêtre'],
    hint: 'Je signe avec mon nom.'
  },
  {
    category: 'Action',
    difficulty: 'easy',
    theme: 'numérique',
    text: 'Je ___ la case correcte si la réponse est oui.',
    answer: 'coche',
    choices: ['coche', 'range', 'ferme', 'charge'],
    hint: 'Action avec une case ☑'
  },
  {
    category: 'Action',
    difficulty: 'easy',
    theme: 'numérique',
    text: "Je ___ le formulaire avant de l'envoyer.",
    answer: 'vérifie',
    choices: ['vérifie', 'dessine', 'coupe', 'branche'],
    hint: 'Je contrôle les informations.'
  },
  {
    category: 'Action',
    difficulty: 'easy',
    theme: 'numérique',
    text: 'Quand tout est fini, je clique sur ___.',
    answer: 'envoyer',
    choices: ['envoyer', 'effacer', 'imprimer', 'ouvrir'],
    hint: 'Bouton final du formulaire.'
  },

  // ORP / Emploi
  {
    category: 'ORP',
    difficulty: 'medium',
    theme: 'orp',
    text: "Je vais à l'___ pour parler avec mon conseiller et chercher un emploi.",
    answer: 'ORP',
    choices: ['ORP', 'gare', 'pharmacie', 'banque'],
    hint: 'Office Régional de Placement.'
  },
  {
    category: 'Emploi',
    difficulty: 'medium',
    theme: 'emploi',
    text: "J'envoie mon ___ pour montrer mon expérience professionnelle.",
    answer: 'CV',
    choices: ['CV', 'billet', 'formulaire', 'horaire'],
    hint: "Document avec la formation et l'expérience."
  },
  {
    category: 'Emploi',
    difficulty: 'medium',
    theme: 'emploi',
    text: 'Je pose ma ___ pour un poste de cuisinier à Lausanne.',
    answer: 'candidature',
    choices: ['candidature', 'signature', 'adresse', 'date'],
    hint: 'Demande officielle pour obtenir un emploi.'
  },
  {
    category: 'Entretien',
    difficulty: 'medium',
    theme: 'emploi',
    text: "Je dois arriver à ___ pour mon entretien d'embauche à 9h00.",
    answer: "l'heure",
    choices: ["l'heure", 'la gare', 'en retard', 'la maison'],
    hint: 'La ponctualité est importante.'
  },
  {
    category: 'Entretien',
    difficulty: 'hard',
    theme: 'emploi',
    text: "Pendant l'entretien, je parle de mes ___ pour ce poste.",
    answer: 'compétences',
    choices: ['compétences', 'vacances', 'voisins', 'formulaires'],
    hint: 'Ce que je sais faire pour le travail.'
  },

  // Transports
  {
    category: 'Transports',
    difficulty: 'easy',
    theme: 'transports',
    text: "Je regarde l'___ pour connaître l'heure du prochain bus.",
    answer: 'horaire',
    choices: ['horaire', 'adresse', 'prénom', 'code postal'],
    hint: 'Tableau avec les heures de départ.'
  },
  {
    category: 'Transports',
    difficulty: 'easy',
    theme: 'transports',
    text: "J'achète mon ___ avant de monter dans le tram.",
    answer: 'billet',
    choices: ['billet', 'stylo', 'formulaire', 'document'],
    hint: 'Ticket pour voyager.'
  },
  {
    category: 'Transports',
    difficulty: 'easy',
    theme: 'transports',
    text: 'Je descends à la prochaine ___ pour aller à la commune.',
    answer: 'station',
    choices: ['station', 'page', 'case', 'signature'],
    hint: 'Arrêt de bus ou de tram.'
  },

  // Vie quotidienne
  {
    category: 'Vie quotidienne',
    difficulty: 'medium',
    theme: 'numérique',
    text: 'Je vais à la ___ pour envoyer mon dossier par courrier.',
    answer: 'poste',
    choices: ['poste', 'piscine', 'école', 'bibliothèque'],
    hint: 'Lieu où on envoie des lettres et des colis.'
  },
  {
    category: 'Vie quotidienne',
    difficulty: 'medium',
    theme: 'numérique',
    text: 'Je demande une ___ de domicile à la commune.',
    answer: 'attestation',
    choices: ['attestation', 'billet', 'mot de passe', 'stylo'],
    hint: 'Document officiel qui prouve mon adresse.'
  },
  {
    category: 'Numérique',
    difficulty: 'easy',
    theme: 'numérique',
    text: 'Je clique sur ___ pour lire le message reçu.',
    answer: 'ouvrir',
    choices: ['ouvrir', 'effacer', 'copier', 'signer'],
    hint: 'Action pour afficher le contenu.'
  },
  {
    category: 'E-mail',
    difficulty: 'medium',
    theme: 'numérique',
    text: "J'écris l'___ du message avant le texte.",
    answer: 'objet',
    choices: ['objet', 'horaire', 'billet', 'prénom'],
    hint: 'Petite ligne qui résume le message.'
  },
  {
    category: 'E-mail',
    difficulty: 'medium',
    theme: 'emploi',
    text: "Je joins mon ___ à l'e-mail de candidature.",
    answer: 'CV',
    choices: ['CV', 'quai', 'ticket', 'stylo'],
    hint: "Document avec l'expérience et la formation."
  },
  {
    category: 'ORP',
    difficulty: 'hard',
    theme: 'orp',
    text: "Mon conseiller ORP m'envoie une ___ pour un rendez-vous.",
    answer: 'convocation',
    choices: ['convocation', 'photo', 'adresse', 'fenêtre'],
    hint: 'Message officiel qui demande de venir.'
  },
  {
    category: 'Administratif',
    difficulty: 'medium',
    theme: 'numérique',
    text: "Je prends un ___ à l'entrée pour attendre au guichet.",
    answer: 'ticket',
    choices: ['ticket', 'métier', 'quartier', 'contrat'],
    hint: 'Petit papier avec un numéro.'
  },
  {
    category: 'Santé',
    difficulty: 'medium',
    theme: 'santé',
    text: "Je montre ma carte d'___ à la réception du cabinet.",
    answer: 'assurance',
    choices: ['assurance', 'emploi', 'station', 'signature'],
    hint: 'Elle sert pour les soins médicaux.'
  },
  {
    category: 'Numérique',
    difficulty: 'medium',
    theme: 'numérique',
    text: 'Je tape mon mot de ___ pour ouvrir mon compte.',
    answer: 'passe',
    choices: ['passe', 'travail', 'ville', 'route'],
    hint: 'Code secret de connexion.'
  },
  {
    category: 'Transports',
    difficulty: 'medium',
    theme: 'transports',
    text: 'Je regarde sur quel ___ arrive le train.',
    answer: 'quai',
    choices: ['quai', 'bureau', 'papier', 'prénom'],
    hint: "Lieu où j'attends le train."
  },
  {
    category: 'Vie quotidienne',
    difficulty: 'easy',
    theme: 'numérique',
    text: "Je garde mon ___ de caisse après avoir payé.",
    answer: 'reçu',
    choices: ['reçu', 'salon', 'guichet', 'métro'],
    hint: 'Petit document donné après le paiement.'
  },
  {
    category: 'Logement',
    difficulty: 'hard',
    theme: 'logement',
    text: "Je contacte la ___ si j'ai un probl\u00e8me dans mon appartement.",
    answer: 'g\u00e9rance',
    choices: ['g\u00e9rance', 'gare', 'poste', 'cuisine'],
    hint: "Service qui g\u00e8re l\u2019immeuble."
  },

  // Sant\u00e9
  {
    category: 'Sant\u00e9',
    difficulty: 'easy',
    theme: 'sant\u00e9',
    text: 'Je vais \u00e0 la ___ pour chercher mes m\u00e9dicaments avec mon ordonnance.',
    answer: 'pharmacie',
    choices: ['pharmacie', 'gare', 'commune', 'piscine'],
    hint: 'Lieu o\u00f9 on ach\u00e8te des m\u00e9dicaments.'
  },
  {
    category: 'Sant\u00e9',
    difficulty: 'easy',
    theme: 'sant\u00e9',
    text: 'Le m\u00e9decin me donne une ___ pour ach\u00e9ter des m\u00e9dicaments.',
    answer: 'ordonnance',
    choices: ['ordonnance', 'facture', 'cl\u00e9', 'carte'],
    hint: 'Document sign\u00e9 par le m\u00e9decin.'
  },
  {
    category: 'Sant\u00e9',
    difficulty: 'medium',
    theme: 'sant\u00e9',
    text: 'Je paie ma ___ d\u2019assurance maladie chaque mois.',
    answer: 'prime',
    choices: ['prime', 'caution', 'loyer', 'facture'],
    hint: 'Montant mensuel pay\u00e9 \u00e0 la caisse-maladie.'
  },

  // Logement
  {
    category: 'Logement',
    difficulty: 'easy',
    theme: 'logement',
    text: 'Je paie mon ___ chaque mois \u00e0 la g\u00e9rance.',
    answer: 'loyer',
    choices: ['loyer', 'salaire', 'billet', 'permis'],
    hint: 'Montant pay\u00e9 pour habiter dans l\u2019appartement.'
  },
  {
    category: 'Logement',
    difficulty: 'medium',
    theme: 'logement',
    text: 'Je signe le ___ avant d\u2019entrer dans mon appartement.',
    answer: 'bail',
    choices: ['bail', 'billet', 'formulaire', 'livret'],
    hint: 'Contrat de location entre locataire et propri\u00e9taire.'
  },
  {
    category: 'Logement',
    difficulty: 'medium',
    theme: 'logement',
    text: 'Je verse la ___ sur un compte bloqu\u00e9 \u00e0 la banque.',
    answer: 'caution',
    choices: ['caution', 'prime', 'attestation', 'ordonnance'],
    hint: 'D\u00e9p\u00f4t de garantie remis \u00e0 la fin du bail.'
  },

  // Banque
  {
    category: 'Banque',
    difficulty: 'easy',
    theme: 'num\u00e9rique',
    text: 'Je fais un ___ pour payer ma facture depuis mon e-banking.',
    answer: 'virement',
    choices: ['virement', 'trajet', 'rendez-vous', 'formulaire'],
    hint: 'Transfert d\u2019argent d\u2019un compte \u00e0 un autre.'
  },
  {
    category: 'Banque',
    difficulty: 'medium',
    theme: 'num\u00e9rique',
    text: 'Je v\u00e9rifie mon ___ de compte chaque mois pour contr\u00f4ler mes d\u00e9penses.',
    answer: 'relev\u00e9',
    choices: ['relev\u00e9', 'bail', 'permis', 'horaire'],
    hint: 'Document qui liste toutes les op\u00e9rations bancaires.'
  },
];
