/* ===== JS/DATA/TRIER-DATA.JS ===== */
'use strict';

window.TRIER_DATA = [
  {
    theme: "Entretien d’embauche",
    difficulty: 'medium',
    topic: 'emploi',
    groups: [
      { label: "Avant l’entretien", emoji: '📚', items: ['Se préparer', 'Relire son CV', "Connaître l’entreprise", "Vérifier l’adresse"] },
      { label: "Documents à apporter", emoji: '📄', items: ['CV', 'Lettre de motivation', 'Diplôme', "Pièce d’identité"] },
      { label: "Pendant l’entretien", emoji: '🗣️', items: ['Se présenter', 'Répondre aux questions', 'Parler clairement', 'Rester poli'] },
      { label: "Fin de l’entretien", emoji: '🤝', items: ['Remercier', 'Dire au revoir', 'Poser une question', 'Quitter calmement'] },
    ],
  },

  {
    theme: 'Se présenter',
    difficulty: 'easy',
    topic: 'emploi',
    groups: [
      { label: 'Identité', emoji: '👤', items: ['Nom', 'Prénom', 'Âge', 'Ville'] },
      { label: 'Travail', emoji: '💼', items: ['Métier', 'Expérience', 'Compétences', 'Disponibilité'] },
      { label: 'Qualités', emoji: '⭐', items: ['Ponctuel', 'Sérieux', 'Motivé', 'Organisé'] },
      { label: 'Contact', emoji: '📞', items: ['Téléphone', 'E-mail', 'Adresse', 'Portable'] },
    ],
  },

  {
    theme: "Questions de l’employeur",
    difficulty: 'hard',
    topic: 'emploi',
    groups: [
      { label: 'Expérience', emoji: '🛠️', items: ['Où avez-vous travaillé', 'Quelle expérience avez-vous', 'Quel est votre métier', 'Que savez-vous faire'] },
      { label: 'Motivation', emoji: '🔥', items: ['Pourquoi ce poste', 'Pourquoi cette entreprise', 'Pourquoi voulez-vous travailler ici', "Qu’est-ce qui vous intéresse"] },
      { label: 'Disponibilité', emoji: '📅', items: ['Êtes-vous disponible', 'Quand pouvez-vous commencer', 'Travaillez-vous le week-end', 'Êtes-vous libre rapidement'] },
      { label: 'Personnalité', emoji: '🙂', items: ['Quelles sont vos qualités', 'Comment êtes-vous', 'Travaillez-vous en équipe', 'Êtes-vous ponctuel'] },
    ],
  },

  {
    theme: 'Réponses utiles',
    difficulty: 'medium',
    topic: 'emploi',
    groups: [
      { label: 'Parler de soi', emoji: '🧍', items: ['Je suis motivé', 'Je suis sérieux', 'Je suis ponctuel', "J’aime travailler en équipe"] },
      { label: 'Parler de son expérience', emoji: '📋', items: ["J’ai travaillé dans le nettoyage", "J’ai de l’expérience en cuisine", "J’ai travaillé en logistique", "J’ai travaillé dans la vente"] },
      { label: 'Parler de ses compétences', emoji: '🔧', items: ['Je sais utiliser des outils', 'Je sais servir les clients', 'Je sais préparer des commandes', 'Je sais nettoyer des locaux'] },
      { label: 'Parler de sa disponibilité', emoji: '⏰', items: ['Je suis disponible immédiatement', 'Je peux commencer lundi', 'Je suis libre à temps partiel', 'Je suis disponible le matin'] },
    ],
  },

  {
    theme: 'Comportement en entretien',
    difficulty: 'medium',
    topic: 'emploi',
    groups: [
      { label: 'Bon comportement', emoji: '✅', items: ['Écouter', 'Regarder la personne', 'Répondre calmement', "Arriver à l’heure"] },
      { label: 'À éviter', emoji: '❌', items: ['Couper la parole', 'Regarder le téléphone', 'Arriver en retard', 'Parler trop vite'] },
      { label: 'Politesse', emoji: '🙏', items: ['Bonjour', 'Merci', 'Au revoir', 'Enchanté'] },
      { label: 'Attitude', emoji: '🙂', items: ['Sourire', 'Rester calme', 'Être respectueux', 'Montrer sa motivation'] },
    ],
  },

  {
    theme: 'Préparer le trajet',
    difficulty: 'easy',
    topic: 'transports',
    groups: [
      { label: 'Avant de partir', emoji: '🗺️', items: ["Regarder l’adresse", "Vérifier l’heure", 'Préparer le trajet', 'Prendre les documents'] },
      { label: 'Transports', emoji: '🚌', items: ['Bus', 'Train', 'Tram', 'Métro'] },
      { label: 'Lieux', emoji: '📍', items: ['Gare', 'Arrêt', 'Entreprise', 'Bâtiment'] },
      { label: 'En cas de problème', emoji: '📞', items: ['Téléphoner', 'Prévenir', 'Demander son chemin', 'Regarder le plan'] },
    ],
  },

  {
    theme: 'Documents pour postuler',
    difficulty: 'medium',
    topic: 'emploi',
    groups: [
      { label: 'Documents principaux', emoji: '📄', items: ['CV', 'Lettre de motivation', 'Certificat', 'Diplôme'] },
      { label: 'Documents personnels', emoji: '🪪', items: ["Pièce d’identité", 'Permis de séjour', 'Permis de conduire', 'Photo'] },
      { label: 'Documents utiles', emoji: '📁', items: ['Références', 'Attestation', 'Certificat de travail', 'Copie de diplôme'] },
      { label: 'Actions', emoji: '📨', items: ['Imprimer', 'Envoyer', 'Joindre', 'Préparer'] },
    ],
  },

  {
    theme: "Vocabulaire de l’entretien",
    difficulty: 'hard',
    topic: 'emploi',
    groups: [
      { label: 'Personnes', emoji: '👥', items: ['Employeur', 'Candidat', 'Responsable RH', 'Conseiller ORP'] },
      { label: 'Moments', emoji: '🕒', items: ['Rendez-vous', 'Entretien', 'Début', 'Fin'] },
      { label: 'Travail', emoji: '🏢', items: ['Poste', 'Entreprise', 'Équipe', 'Horaire'] },
      { label: 'Contrat', emoji: '📑', items: ['Salaire', 'Temps plein', 'Temps partiel', 'Disponibilité'] },
    ],
  },

  {
    theme: 'Formulaire administratif',
    difficulty: 'easy',
    topic: 'numérique',
    groups: [
      { label: 'Identité', emoji: '🪪', items: ['Nom', 'Prénom', 'Date de naissance', 'État civil'] },
      { label: 'Coordonnées', emoji: '📍', items: ['Adresse', 'NPA', 'Ville', 'Téléphone'] },
      { label: 'Documents', emoji: '📄', items: ['CV', 'Permis', 'Attestation', 'Photo'] },
      { label: 'Actions', emoji: '✍️', items: ['Écrire', 'Cocher', 'Relire', 'Signer'] },
    ],
  },

  {
    theme: 'Envoyer un e-mail professionnel',
    difficulty: 'medium',
    topic: 'numérique',
    groups: [
      { label: 'Début du message', emoji: '📨', items: ['Destinataire', 'Objet', 'Salutation', 'Présentation courte'] },
      { label: 'Corps du message', emoji: '📝', items: ['Expliquer la demande', 'Préciser le document', 'Rester poli', 'Être clair'] },
      { label: 'Pièces jointes', emoji: '📎', items: ['CV', 'Lettre', 'Attestation', 'Formulaire signé'] },
      { label: 'Fin du message', emoji: '🤝', items: ['Remercier', 'Rester disponible', 'Signature complète', 'Envoyer'] },
    ],
  },

  {
    theme: 'Vie quotidienne',
    difficulty: 'easy',
    topic: 'numérique',
    groups: [
      { label: 'Logement', emoji: '🏠', items: ['Gérance', 'Loyer', 'Appartement', 'État des lieux'] },
      { label: 'Santé', emoji: '🩺', items: ['Médecin', 'Assurance', 'Ordonnance', 'Rendez-vous'] },
      { label: 'Administration', emoji: '🏢', items: ['Commune', 'Guichet', 'Attestation', 'Formulaire'] },
      { label: 'Déplacements', emoji: '🚌', items: ['Bus', 'Tram', 'Train', 'Quai'] },
    ],
  },

  {
    theme: 'Aller chez le médecin',
    difficulty: 'medium',
    topic: 'santé',
    groups: [
      { label: 'Avant le rendez-vous', emoji: '📅', items: ['Prendre rendez-vous', 'Préparer sa carte d’assuré', 'Préparer ses médicaments', 'Vérifier l’adresse'] },
      { label: 'Personnes', emoji: '👤', items: ['Médecin', 'Infirmière', 'Pharmacien', 'Spécialiste'] },
      { label: 'Documents utiles', emoji: '📄', items: ['Carte d’assuré', 'Ordonnance', 'Résultat d’analyse', 'Certificat médical'] },
      { label: 'Lieux', emoji: '📍', items: ['Cabinet médical', 'Hôpital', 'Pharmacie', 'Urgences'] },
    ],
  },

  {
    theme: 'Assurance maladie en Suisse',
    difficulty: 'hard',
    topic: 'santé',
    groups: [
      { label: 'Documents', emoji: '📋', items: ['Carte d’assuré', 'Police d’assurance', 'Facture médicale', 'Décompte de prestations'] },
      { label: 'Termes financiers', emoji: '💶', items: ['Prime', 'Franchise', 'Quote-part', 'Remboursement'] },
      { label: 'Actions', emoji: '✅', items: ['Choisir une caisse', 'Payer la prime', 'Envoyer la facture', 'Changer d’assurance'] },
      { label: 'Types de soins', emoji: '🏥', items: ['Médecin de famille', 'Urgences', 'Hospitalisation', 'Spécialiste'] },
    ],
  },

  {
    theme: 'Louer un appartement',
    difficulty: 'medium',
    topic: 'logement',
    groups: [
      { label: 'Avant la location', emoji: '🔍', items: ['Chercher une annonce', 'Visiter l’appartement', 'Préparer le dossier', 'Signer le bail'] },
      { label: 'Documents à fournir', emoji: '📁', items: ['Pièce d’identité', 'Permis de séjour', 'Dernier bulletin de salaire', 'Extrait de casier judiciaire'] },
      { label: 'Coûts', emoji: '💰', items: ['Loyer', 'Charges', 'Caution', 'Frais de gérance'] },
      { label: 'Personnes', emoji: '👥', items: ['Locataire', 'Propriétaire', 'Gérant', 'Concierge'] },
    ],
  },

  {
    theme: 'Quitter un logement',
    difficulty: 'hard',
    topic: 'logement',
    groups: [
      { label: 'Actions à faire', emoji: '📋', items: ['Envoyer la résiliation', 'Faire l’état des lieux de sortie', 'Rendre les clés', 'Recevoir la caution'] },
      { label: 'Documents', emoji: '📄', items: ['Lettre de résiliation', 'Protocole d’état des lieux', 'Quittance de loyer', 'Adresse de renvoi'] },
      { label: 'Délais', emoji: '⏰', items: ['Respecter le préavis', 'Informer la gérance', 'Résilier avant la date limite', 'Nettoyer le logement'] },
      { label: 'Coûts éventuels', emoji: '💶', items: ['Frais de remise en état', 'Loyer impayé', 'Réparations', 'Frais de nettoyage'] },
    ],
  },

  {
    theme: 'Gérer son argent',
    difficulty: 'medium',
    topic: 'numérique',
    groups: [
      { label: 'Documents financiers', emoji: '📑', items: ['Bulletin de salaire', 'Facture', 'Relevé de compte', 'Avis de virement'] },
      { label: 'Actions bancaires', emoji: '🏦', items: ['Faire un virement', 'Payer une facture', 'Consulter son solde', 'Retirer de l’argent'] },
      { label: 'Dépenses courantes', emoji: '💸', items: ['Loyer', 'Assurance maladie', 'Transports', 'Courses'] },
      { label: 'Sécurité', emoji: '🔒', items: ['Ne pas partager son PIN', 'Vérifier ses relevés', 'Signaler un e-mail suspect', 'Utiliser un mot de passe fort'] },
    ],
  },
];
