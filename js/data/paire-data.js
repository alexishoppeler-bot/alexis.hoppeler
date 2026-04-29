/* ===== JS/DATA/PAIRE-DATA.JS ===== */
'use strict';

window.PAIRE_DATA = [
  // === VRAIES PAIRES ===
  {
    category: 'Formulaire',
    difficulty: 'easy',
    theme: 'numérique',
    isPair: true,
    card1: { emoji: '👤', text: 'Nom' },
    card2: { emoji: '📝', text: 'Nom de famille' },
    explication: 'Dans un formulaire, le nom correspond au nom de famille.'
  },
  {
    category: 'Formulaire',
    difficulty: 'easy',
    theme: 'numérique',
    isPair: true,
    card1: { emoji: '🧍', text: 'Prénom' },
    card2: { emoji: '🙂', text: 'Nom personnel' },
    explication: 'Le prénom est le nom personnel de la personne.'
  },
  {
    category: 'Adresse',
    difficulty: 'easy',
    theme: 'numérique',
    isPair: true,
    card1: { emoji: '🏠', text: 'Adresse' },
    card2: { emoji: '📍', text: "Lieu où j’habite" },
    explication: "L’adresse indique le lieu où la personne habite."
  },
  {
    category: 'Adresse',
    difficulty: 'easy',
    theme: 'numérique',
    isPair: true,
    card1: { emoji: '📮', text: 'Code postal' },
    card2: { emoji: '🔢', text: 'Numéro de la commune' },
    explication: 'Le code postal est le numéro de la commune ou du quartier.'
  },
  {
    category: 'Contact',
    difficulty: 'easy',
    theme: 'numérique',
    isPair: true,
    card1: { emoji: '📞', text: 'Téléphone' },
    card2: { emoji: '☎️', text: 'Numéro pour appeler' },
    explication: "Le téléphone permet d’appeler une personne."
  },
  {
    category: 'Contact',
    difficulty: 'easy',
    theme: 'numérique',
    isPair: true,
    card1: { emoji: '✉️', text: 'E-mail' },
    card2: { emoji: '📧', text: 'Adresse électronique' },
    explication: "L’e-mail est l’adresse électronique utilisée pour recevoir des messages."
  },
  {
    category: 'Document',
    difficulty: 'easy',
    theme: 'numérique',
    isPair: true,
    card1: { emoji: '✍️', text: 'Signature' },
    card2: { emoji: '✅', text: 'Nom écrit à la main' },
    explication: 'La signature est le nom écrit à la main à la fin du document.'
  },
  {
    category: 'Action',
    difficulty: 'easy',
    theme: 'numérique',
    isPair: true,
    card1: { emoji: '☑️', text: 'Cocher' },
    card2: { emoji: '📦', text: 'Choisir une case' },
    explication: 'Cocher signifie sélectionner une case.'
  },
  {
    category: 'Action',
    difficulty: 'easy',
    theme: 'numérique',
    isPair: true,
    card1: { emoji: '👀', text: 'Vérifier' },
    card2: { emoji: '🔎', text: 'Relire avant envoyer' },
    explication: "Il faut vérifier les informations avant d’envoyer le formulaire."
  },
  {
    category: 'Action',
    difficulty: 'easy',
    theme: 'numérique',
    isPair: true,
    card1: { emoji: '📨', text: 'Envoyer' },
    card2: { emoji: '📤', text: 'Transmettre le document' },
    explication: 'Envoyer signifie transmettre le document.'
  },

  // === FAUSSES PAIRES ===
  {
    category: 'Formulaire',
    difficulty: 'easy',
    theme: 'numérique',
    isPair: false,
    card1: { emoji: '👤', text: 'Nom' },
    card2: { emoji: '📅', text: 'Date' },
    explication: 'Le nom et la date sont deux informations différentes.'
  },
  {
    category: 'Formulaire',
    difficulty: 'easy',
    theme: 'numérique',
    isPair: false,
    card1: { emoji: '🧍', text: 'Prénom' },
    card2: { emoji: '🏙️', text: 'Ville' },
    explication: 'Le prénom est une information personnelle, pas une adresse.'
  },
  {
    category: 'Adresse',
    difficulty: 'easy',
    theme: 'numérique',
    isPair: false,
    card1: { emoji: '🏠', text: 'Adresse' },
    card2: { emoji: '✍️', text: 'Signature' },
    explication: "L’adresse indique où on habite, la signature sert à valider le document."
  },
  {
    category: 'Adresse',
    difficulty: 'easy',
    theme: 'numérique',
    isPair: false,
    card1: { emoji: '📮', text: 'Code postal' },
    card2: { emoji: '📞', text: 'Téléphone' },
    explication: "Le code postal concerne l’adresse, pas le téléphone."
  },
  {
    category: 'Contact',
    difficulty: 'easy',
    theme: 'numérique',
    isPair: false,
    card1: { emoji: '✉️', text: 'E-mail' },
    card2: { emoji: '🛣️', text: 'Rue' },
    explication: "L’e-mail est une adresse électronique, la rue fait partie de l’adresse postale."
  },
  {
    category: 'Document',
    difficulty: 'easy',
    theme: 'numérique',
    isPair: false,
    card1: { emoji: '✍️', text: 'Signature' },
    card2: { emoji: '📞', text: 'Téléphone' },
    explication: 'La signature et le téléphone sont deux champs différents.'
  },
  {
    category: 'Action',
    difficulty: 'easy',
    theme: 'numérique',
    isPair: false,
    card1: { emoji: '☑️', text: 'Cocher' },
    card2: { emoji: '✉️', text: 'E-mail' },
    explication: 'Cocher est une action, e-mail est une information de contact.'
  },
  {
    category: 'Action',
    difficulty: 'easy',
    theme: 'numérique',
    isPair: false,
    card1: { emoji: '📨', text: 'Envoyer' },
    card2: { emoji: '❌', text: 'Formulaire vide' },
    explication: "On n’envoie pas un formulaire vide."
  },
  {
    category: 'Action',
    difficulty: 'easy',
    theme: 'numérique',
    isPair: false,
    card1: { emoji: '👀', text: 'Vérifier' },
    card2: { emoji: '⚡', text: 'Aller vite sans lire' },
    explication: 'Vérifier veut dire relire avec attention.'
  },

  // === VRAIES PAIRES : Emploi / ORP ===
  {
    category: "Recherche d’emploi",
    difficulty: 'medium',
    theme: 'emploi',
    isPair: true,
    card1: { emoji: '🏢', text: 'ORP' },
    card2: { emoji: '💼', text: "Office pour l’emploi" },
    explication: "L’ORP aide les personnes à chercher un emploi."
  },
  {
    category: "Recherche d’emploi",
    difficulty: 'medium',
    theme: 'emploi',
    isPair: true,
    card1: { emoji: '📋', text: 'CV' },
    card2: { emoji: '📄', text: 'Document avec mon expérience' },
    explication: "Le CV présente la formation, l’expérience et les compétences."
  },
  {
    category: "Recherche d’emploi",
    difficulty: 'medium',
    theme: 'emploi',
    isPair: true,
    card1: { emoji: '🤝', text: 'Entretien' },
    card2: { emoji: '🗣️', text: "Rencontre avec l’employeur" },
    explication: "L’entretien est une rencontre avec l’employeur."
  },
  {
    category: 'Transports',
    difficulty: 'easy',
    theme: 'transports',
    isPair: true,
    card1: { emoji: '🚌', text: 'Bus' },
    card2: { emoji: '🛑', text: 'Arrêt' },
    explication: "On attend le bus à l’arrêt."
  },
  {
    category: 'Transports',
    difficulty: 'easy',
    theme: 'transports',
    isPair: true,
    card1: { emoji: '🎫', text: 'Billet' },
    card2: { emoji: '🚍', text: 'Ticket pour voyager' },
    explication: 'Le billet permet de voyager en bus, tram ou train.'
  },

  // === FAUSSES PAIRES : Emploi / ORP ===
  {
    category: "Recherche d’emploi",
    difficulty: 'medium',
    theme: 'emploi',
    isPair: false,
    card1: { emoji: '🏢', text: 'ORP' },
    card2: { emoji: '📮', text: 'Code postal' },
    explication: "L’ORP est un office pour l’emploi, pas une information d’adresse."
  },
  {
    category: "Recherche d’emploi",
    difficulty: 'medium',
    theme: 'emploi',
    isPair: false,
    card1: { emoji: '📋', text: 'CV' },
    card2: { emoji: '🎫', text: 'Billet de train' },
    explication: 'Le CV est un document pour postuler, pas pour voyager.'
  },
  {
    category: 'Transports',
    difficulty: 'easy',
    theme: 'transports',
    isPair: false,
    card1: { emoji: '🚌', text: 'Bus' },
    card2: { emoji: '✍️', text: 'Signature' },
    explication: 'Le bus est un transport, pas un élément de formulaire.'
  },

  // === VRAIES PAIRES : Santé ===
  {
    category: 'Santé',
    difficulty: 'medium',
    theme: 'santé',
    isPair: true,
    card1: { emoji: '🩺', text: 'Médecin de famille' },
    card2: { emoji: '👨‍⚕️', text: 'Médecin principal à consulter en premier' },
    explication: 'Le médecin de famille est le médecin que l’on consulte en premier pour la plupart des problèmes.'
  },
  {
    category: 'Santé',
    difficulty: 'medium',
    theme: 'santé',
    isPair: true,
    card1: { emoji: '💊', text: 'Ordonnance' },
    card2: { emoji: '📋', text: 'Document du médecin pour obtenir des médicaments' },
    explication: 'L’ordonnance est signée par le médecin et permet d’obtenir des médicaments à la pharmacie.'
  },
  {
    category: 'Santé',
    difficulty: 'medium',
    theme: 'santé',
    isPair: true,
    card1: { emoji: '🏥', text: 'Urgences' },
    card2: { emoji: '🚨', text: 'Service pour les cas médicaux graves' },
    explication: 'Les urgences sont ouvertes 24h/24 pour les situations graves.'
  },
  {
    category: 'Santé',
    difficulty: 'medium',
    theme: 'santé',
    isPair: true,
    card1: { emoji: '🛡️', text: 'Assurance maladie (LAMal)' },
    card2: { emoji: '📜', text: 'Couverture obligatoire pour les soins en Suisse' },
    explication: 'En Suisse, toute personne résidant dans le pays doit avoir une assurance maladie de base.'
  },
  {
    category: 'Santé',
    difficulty: 'medium',
    theme: 'santé',
    isPair: true,
    card1: { emoji: '💳', text: 'Carte d’assuré' },
    card2: { emoji: '🪪', text: 'Document à apporter chez le médecin' },
    explication: 'La carte d’assuré permet au médecin de facturer directement l’assurance maladie.'
  },

  // === FAUSSES PAIRES : Santé ===
  {
    category: 'Santé',
    difficulty: 'medium',
    theme: 'santé',
    isPair: false,
    card1: { emoji: '💊', text: 'Ordonnance' },
    card2: { emoji: '📄', text: 'Formulaire de candidature' },
    explication: 'L’ordonnance est un document médical, pas un document d’emploi.'
  },
  {
    category: 'Santé',
    difficulty: 'medium',
    theme: 'santé',
    isPair: false,
    card1: { emoji: '🏥', text: 'Urgences' },
    card2: { emoji: '🏢', text: 'ORP' },
    explication: 'Les urgences sont un service médical. L’ORP est un office pour l’emploi.'
  },

  // === VRAIES PAIRES : Logement ===
  {
    category: 'Logement',
    difficulty: 'medium',
    theme: 'logement',
    isPair: true,
    card1: { emoji: '🏠', text: 'Loyer' },
    card2: { emoji: '💶', text: 'Somme mensuelle payée pour habiter' },
    explication: 'Le loyer est le montant que le locataire paie chaque mois au propriétaire.'
  },
  {
    category: 'Logement',
    difficulty: 'medium',
    theme: 'logement',
    isPair: true,
    card1: { emoji: '📑', text: 'Bail' },
    card2: { emoji: '🤝', text: 'Contrat de location signé entre locataire et propriétaire' },
    explication: 'Le bail fixe les conditions de la location : prix, durée, obligations des deux parties.'
  },
  {
    category: 'Logement',
    difficulty: 'medium',
    theme: 'logement',
    isPair: true,
    card1: { emoji: '🔑', text: 'Caution (garantie de loyer)' },
    card2: { emoji: '🏦', text: 'Dépôt versé à l’entrée dans le logement' },
    explication: 'La caution protège le propriétaire. Elle est restituée à la fin si tout est en ordre.'
  },
  {
    category: 'Logement',
    difficulty: 'medium',
    theme: 'logement',
    isPair: true,
    card1: { emoji: '🏢', text: 'Gérance' },
    card2: { emoji: '📞', text: 'Société qui gère les immeubles en location' },
    explication: 'La gérance s’occupe des contrats, des réparations et du suivi des locataires.'
  },

  // === FAUSSES PAIRES : Logement ===
  {
    category: 'Logement',
    difficulty: 'medium',
    theme: 'logement',
    isPair: false,
    card1: { emoji: '📑', text: 'Bail' },
    card2: { emoji: '🎫', text: 'Billet de train' },
    explication: 'Le bail est un contrat de location, pas un titre de transport.'
  },
  {
    category: 'Logement',
    difficulty: 'medium',
    theme: 'logement',
    isPair: false,
    card1: { emoji: '🏠', text: 'Loyer' },
    card2: { emoji: '💼', text: 'Salaire' },
    explication: 'Le loyer est une dépense (ce que vous payez). Le salaire est un revenu (ce que vous recevez).'
  }
];
