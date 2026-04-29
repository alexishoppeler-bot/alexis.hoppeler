/* ===== JS/DATA/APPARIER-DATA.JS ===== */
'use strict';

window.APPARIER_DATA = [
  {
    category: 'Identité',
    difficulty: 'easy',
    theme: 'numérique',
    pairs: [
      { term: 'Nom', def: 'Nom de famille' },
      { term: 'Prénom', def: 'Nom personnel' },
      { term: 'Date de naissance', def: 'Jour, mois et année où la personne est née' },
      { term: 'Nationalité', def: 'Pays de la personne' },
      { term: 'État civil', def: 'Situation : célibataire, marié, divorcé' },
    ]
  },
  {
    category: 'Coordonnées',
    difficulty: 'easy',
    theme: 'numérique',
    pairs: [
      { term: 'Adresse', def: 'Lieu où la personne habite' },
      { term: 'Code postal', def: 'Numéro de la commune' },
      { term: 'Ville', def: 'Nom de la commune' },
      { term: 'Téléphone', def: 'Numéro pour appeler' },
      { term: 'E-mail', def: 'Adresse électronique' },
    ]
  },
  {
    category: 'Formulaire et documents',
    difficulty: 'easy',
    theme: 'numérique',
    pairs: [
      { term: 'Formulaire', def: 'Document à remplir' },
      { term: 'Case', def: 'Petit espace à remplir ou à cocher' },
      { term: 'Signature', def: 'Nom écrit à la main à la fin' },
      { term: 'Document', def: 'Papier demandé' },
      { term: 'Date', def: 'Jour, mois et année' },
    ]
  },
  {
    category: "Recherche d’emploi",
    difficulty: 'medium',
    theme: 'emploi',
    pairs: [
      { term: 'ORP', def: 'Office qui aide à chercher un emploi' },
      { term: 'CV', def: "Document avec la formation et l’expérience" },
      { term: 'Entretien', def: "Rencontre avec l’employeur" },
      { term: 'Candidature', def: 'Demande pour obtenir un poste' },
      { term: 'Employeur', def: 'Personne ou entreprise qui donne du travail' },
    ]
  },
  {
    category: 'Transports publics',
    difficulty: 'easy',
    theme: 'transports',
    pairs: [
      { term: 'Arrêt', def: "Endroit où le bus ou le tram s’arrête" },
      { term: 'Horaire', def: "Heures de départ et d’arrivée" },
      { term: 'Billet', def: 'Ticket pour voyager' },
      { term: 'Quai', def: 'Endroit où attendre le train' },
      { term: 'Correspondance', def: 'Changement de bus ou de train' },
    ]
  },
  {
    category: "Entretien d’embauche",
    difficulty: 'medium',
    theme: 'emploi',
    pairs: [
      { term: 'Poste', def: 'Travail proposé' },
      { term: 'Compétence', def: 'Ce que je sais faire' },
      { term: 'Disponible', def: 'Prêt à commencer' },
      { term: 'Salaire', def: 'Argent reçu pour le travail' },
      { term: 'Contrat', def: 'Document signé pour le travail' },
    ]
  },
  {
    category: 'Documents officiels',
    difficulty: 'hard',
    theme: 'orp',
    pairs: [
      { term: 'Attestation', def: 'Document qui prouve une information' },
      { term: 'Permis de séjour', def: 'Document autorisant à vivre en Suisse' },
      { term: 'Certificat de travail', def: 'Document remis par un ancien employeur' },
      { term: 'Convocation', def: 'Message qui demande de venir à un rendez-vous' },
      { term: 'Justificatif', def: 'Document demandé comme preuve' },
    ]
  },
  {
    category: 'Outils numériques',
    difficulty: 'medium',
    theme: 'numérique',
    pairs: [
      { term: 'Mot de passe', def: 'Code secret pour se connecter' },
      { term: 'Identifiant', def: 'Nom ou numéro utilisé pour ouvrir un compte' },
      { term: 'Pièce jointe', def: 'Fichier envoyé avec un e-mail' },
      { term: 'Bouton envoyer', def: 'Commande pour transmettre un message' },
      { term: 'Champ obligatoire', def: 'Case qui doit être remplie' },
    ]
  },
  {
    category: 'Vie quotidienne',
    difficulty: 'easy',
    theme: 'numérique',
    pairs: [
      { term: 'Poste', def: 'Lieu où on envoie du courrier' },
      { term: 'Commune', def: 'Administration locale' },
      { term: 'Assurance', def: 'Service qui couvre certains frais' },
      { term: 'Facture', def: 'Document qui demande un paiement' },
      { term: 'Rendez-vous', def: "Moment prévu pour rencontrer quelqu’un" },
    ]
  },
  {
    category: 'Santé',
    difficulty: 'medium',
    theme: 'santé',
    pairs: [
      { term: 'Médecin de famille', def: 'Médecin principal à consulter en premier' },
      { term: 'Ordonnance', def: 'Document signé par le médecin pour obtenir des médicaments' },
      { term: 'Pharmacie', def: 'Lieu où l’on achète les médicaments' },
      { term: 'Urgences', def: 'Service hospitalier pour les cas graves' },
      { term: 'Carte d’assuré', def: 'Document à apporter à chaque rendez-vous médical' },
    ]
  },
  {
    category: 'Assurance maladie',
    difficulty: 'hard',
    theme: 'santé',
    pairs: [
      { term: 'LAMal', def: 'Assurance maladie obligatoire en Suisse' },
      { term: 'Franchise', def: 'Montant payé par vous-même avant que l’assurance intervienne' },
      { term: 'Prime', def: 'Montant mensuel versé à l’assurance maladie' },
      { term: 'Remboursement', def: 'Argent rendu par l’assurance après un soin' },
      { term: 'Caisse-maladie', def: 'Compagnie qui gère l’assurance maladie' },
    ]
  },
  {
    category: 'Logement',
    difficulty: 'medium',
    theme: 'logement',
    pairs: [
      { term: 'Loyer', def: 'Somme mensuelle payée pour habiter un logement' },
      { term: 'Bail', def: 'Contrat de location signé entre locataire et propriétaire' },
      { term: 'Caution', def: 'Garantie versée à l’entrée dans le logement' },
      { term: 'Gérance', def: 'Société qui gère les immeubles en location' },
      { term: 'Locataire', def: 'Personne qui loue un logement' },
    ]
  },
  {
    category: 'Banque',
    difficulty: 'medium',
    theme: 'numérique',
    pairs: [
      { term: 'IBAN', def: 'Numéro de compte bancaire international' },
      { term: 'Virement', def: 'Transfert d’argent d’un compte à un autre' },
      { term: 'Bulletin de salaire', def: 'Document mensuel qui détaille le salaire reçu' },
      { term: 'Phishing', def: 'Tentative d’arnaque par e-mail pour voler des données' },
      { term: 'Code PIN', def: 'Code secret personnel pour utiliser une carte bancaire' },
    ]
  },
];
