'use strict';

window.FORMULAIRE_DATA = [
  {
    id: 'form-1',
    tag: 'Nettoyage',
    profile: {
      firstName: 'Ali',
      lastName: 'Rahimi',
      birthDate: '1990-03-15',
      maritalStatus: 'Marié',
      email: 'ali.rahimi@email.com',
      phone: '+41 79 111 22 33',
      address: 'Rue de Lausanne 12',
      npa: '1800',
      city: 'Vevey',
      education: 'École obligatoire',
      experienceYears: '3',
      experienceText: '3 ans dans le nettoyage',
      drivingLicense: 'Oui',
      residencePermit: 'Permis C',
      availability: 'Immédiate',
      qualities: ['Ponctualité', 'Fiabilité', 'Travail en équipe'],
      skills: ['Nettoyage de surfaces', 'Nettoyage des sols', 'Utilisation de produits de nettoyage']
    },
    form: {
      fields: [
        { name: 'firstName', label: 'Prénom', expected: 'Ali', type: 'text' },
        { name: 'lastName', label: 'Nom', expected: 'Rahimi', type: 'text' },
        { name: 'birthDate', label: 'Date de naissance', expected: '15.03.1990', type: 'text' },
        { name: 'maritalStatus', label: 'État civil', expected: 'Marié', type: 'text' },
        { name: 'email', label: 'E-mail', expected: 'ali.rahimi@email.com', type: 'email' },
        { name: 'phone', label: 'Téléphone', expected: '+41 79 111 22 33', type: 'tel' },
        { name: 'address', label: 'Adresse', expected: 'Rue de Lausanne 12', type: 'text' },
        { name: 'npa', label: 'NPA', expected: '1800', type: 'text' },
        { name: 'city', label: 'Ville', expected: 'Vevey', type: 'text' },
        { name: 'drivingLicense', label: 'Permis de conduire', expected: 'Oui', type: 'text' },
        { name: 'residencePermit', label: 'Permis de séjour', expected: 'Permis C', type: 'text' },
        { name: 'availability', label: 'Disponibilité', expected: 'Immédiate', type: 'text' },
        { name: 'experienceYears', label: "Années d'expérience", expected: '3', type: 'number' },
        { name: 'qualities', label: 'Qualités personnelles', expected: 'Ponctualité, Fiabilité, Travail en équipe', type: 'text' },
        { name: 'skills', label: 'Compétences professionnelles', expected: 'Nettoyage de surfaces, Nettoyage des sols, Utilisation de produits de nettoyage', type: 'text' }
      ]
    },
    requiredFiles: [
      { type: 'cv', label: 'CV', formats: ['pdf', 'doc', 'docx'], required: true },
      { type: 'photo', label: "Photo d'identité", formats: ['jpg', 'jpeg', 'png'], required: true }
    ]
  },
  {
    id: 'form-2',
    tag: 'Cuisine',
    profile: {
      firstName: 'Fatima',
      lastName: 'El Idrissi',
      birthDate: '1995-07-22',
      maritalStatus: 'Célibataire',
      email: 'fatima.elidrissi@email.com',
      phone: '+41 78 222 33 44',
      address: 'Avenue Général-Guisan 8',
      npa: '1009',
      city: 'Pully',
      education: 'Formation de base',
      experienceYears: '2',
      experienceText: '2 ans comme aide de cuisine',
      drivingLicense: 'Non',
      residencePermit: 'Permis L',
      availability: '1 mois de préavis',
      qualities: ['Hygiène', 'Rapidité', 'Apprentissage rapide'],
      skills: ['Préparation simple des aliments', 'Mise en place', 'Respect des règles d’hygiène']
    },
    form: {
      fields: [
        { name: 'firstName', label: 'Prénom', expected: 'Fatima', type: 'text' },
        { name: 'lastName', label: 'Nom', expected: 'El Idrissi', type: 'text' },
        { name: 'birthDate', label: 'Date de naissance', expected: '22.07.1995', type: 'text' },
        { name: 'maritalStatus', label: 'État civil', expected: 'Célibataire', type: 'text' },
        { name: 'email', label: 'E-mail', expected: 'fatima.elidrissi@email.com', type: 'email' },
        { name: 'phone', label: 'Téléphone', expected: '+41 78 222 33 44', type: 'tel' },
        { name: 'address', label: 'Adresse', expected: 'Avenue Général-Guisan 8', type: 'text' },
        { name: 'npa', label: 'NPA', expected: '1009', type: 'text' },
        { name: 'city', label: 'Ville', expected: 'Pully', type: 'text' },
        { name: 'drivingLicense', label: 'Permis de conduire', expected: 'Non', type: 'text' },
        { name: 'residencePermit', label: 'Permis de séjour', expected: 'Permis L', type: 'text' },
        { name: 'availability', label: 'Disponibilité', expected: '1 mois de préavis', type: 'text' },
        { name: 'experienceYears', label: "Années d'expérience", expected: '2', type: 'number' },
        { name: 'qualities', label: 'Qualités personnelles', expected: 'Hygiène, Rapidité, Apprentissage rapide', type: 'text' },
        { name: 'skills', label: 'Compétences professionnelles', expected: 'Préparation simple des aliments, Mise en place, Respect des règles d’hygiène', type: 'text' }
      ]
    },
    requiredFiles: [
      { type: 'cv', label: 'CV', formats: ['pdf', 'doc', 'docx'], required: true },
      { type: 'photo', label: "Photo d'identité", formats: ['jpg', 'jpeg', 'png'], required: true },
      { type: 'letter', label: 'Lettre de motivation', formats: ['pdf', 'doc', 'docx'], required: false }
    ]
  },
  {
    id: 'form-3',
    tag: 'Construction',
    profile: {
      firstName: 'João',
      lastName: 'Silva',
      birthDate: '1983-11-08',
      maritalStatus: 'Marié',
      email: 'joao.silva@email.com',
      phone: '+41 77 333 44 55',
      address: 'Chemin du Midi 5',
      npa: '1020',
      city: 'Renens',
      education: 'École obligatoire',
      experienceYears: '5',
      experienceText: '5 ans sur chantier',
      drivingLicense: 'Oui',
      residencePermit: 'Permis C',
      availability: 'Immédiate',
      qualities: ['Sécurité', 'Responsabilité', 'Rigueur'],
      skills: ['Manutention', 'Aide sur chantier', 'Travaux de coffrage']
    },
    form: {
      fields: [
        { name: 'firstName', label: 'Prénom', expected: 'João', type: 'text' },
        { name: 'lastName', label: 'Nom', expected: 'Silva', type: 'text' },
        { name: 'birthDate', label: 'Date de naissance', expected: '08.11.1983', type: 'text' },
        { name: 'maritalStatus', label: 'État civil', expected: 'Marié', type: 'text' },
        { name: 'email', label: 'E-mail', expected: 'joao.silva@email.com', type: 'email' },
        { name: 'phone', label: 'Téléphone', expected: '+41 77 333 44 55', type: 'tel' },
        { name: 'address', label: 'Adresse', expected: 'Chemin du Midi 5', type: 'text' },
        { name: 'npa', label: 'NPA', expected: '1020', type: 'text' },
        { name: 'city', label: 'Ville', expected: 'Renens', type: 'text' },
        { name: 'drivingLicense', label: 'Permis de conduire', expected: 'Oui', type: 'text' },
        { name: 'residencePermit', label: 'Permis de séjour', expected: 'Permis C', type: 'text' },
        { name: 'availability', label: 'Disponibilité', expected: 'Immédiate', type: 'text' },
        { name: 'experienceYears', label: "Années d'expérience", expected: '5', type: 'number' },
        { name: 'qualities', label: 'Qualités personnelles', expected: 'Sécurité, Responsabilité, Rigueur', type: 'text' },
        { name: 'skills', label: 'Compétences professionnelles', expected: 'Manutention, Aide sur chantier, Travaux de coffrage', type: 'text' }
      ]
    },
    requiredFiles: [
      { type: 'cv', label: 'CV', formats: ['pdf', 'doc', 'docx'], required: true },
      { type: 'certif', label: 'Certificat de sécurité', formats: ['pdf'], required: true }
    ]
  },
  {
    id: 'form-4',
    tag: 'Vente',
    profile: {
      firstName: 'Sara',
      lastName: 'Costa',
      birthDate: '1998-05-10',
      maritalStatus: 'Célibataire',
      email: 'sara.costa@email.com',
      phone: '+41 76 444 55 66',
      address: 'Rue Centrale 20',
      npa: '1400',
      city: 'Yverdon-les-Bains',
      education: 'CFC non terminé',
      experienceYears: '1',
      experienceText: '1 an dans un magasin',
      drivingLicense: 'Oui',
      residencePermit: 'Permis C',
      availability: 'Immédiate',
      qualities: ['Accueil', 'Sourire', 'Écoute client'],
      skills: ['Encaissement', 'Conseil à la clientèle', 'Mise en rayon']
    },
    form: {
      fields: [
        { name: 'firstName', label: 'Prénom', expected: 'Sara', type: 'text' },
        { name: 'lastName', label: 'Nom', expected: 'Costa', type: 'text' },
        { name: 'birthDate', label: 'Date de naissance', expected: '10.05.1998', type: 'text' },
        { name: 'maritalStatus', label: 'État civil', expected: 'Célibataire', type: 'text' },
        { name: 'email', label: 'E-mail', expected: 'sara.costa@email.com', type: 'email' },
        { name: 'phone', label: 'Téléphone', expected: '+41 76 444 55 66', type: 'tel' },
        { name: 'address', label: 'Adresse', expected: 'Rue Centrale 20', type: 'text' },
        { name: 'npa', label: 'NPA', expected: '1400', type: 'text' },
        { name: 'city', label: 'Ville', expected: 'Yverdon-les-Bains', type: 'text' },
        { name: 'drivingLicense', label: 'Permis de conduire', expected: 'Oui', type: 'text' },
        { name: 'residencePermit', label: 'Permis de séjour', expected: 'Permis C', type: 'text' },
        { name: 'availability', label: 'Disponibilité', expected: 'Immédiate', type: 'text' },
        { name: 'experienceYears', label: "Années d'expérience", expected: '1', type: 'number' },
        { name: 'qualities', label: 'Qualités personnelles', expected: 'Accueil, Sourire, Écoute client', type: 'text' },
        { name: 'skills', label: 'Compétences professionnelles', expected: 'Encaissement, Conseil à la clientèle, Mise en rayon', type: 'text' }
      ]
    },
    requiredFiles: [
      { type: 'cv', label: 'CV', formats: ['pdf', 'doc', 'docx'], required: true },
      { type: 'photo', label: "Photo d'identité", formats: ['jpg', 'jpeg', 'png'], required: true }
    ]
  },
  {
    id: 'form-5',
    tag: 'Logistique',
    profile: {
      firstName: 'Mamadou',
      lastName: 'Diallo',
      birthDate: '1986-09-20',
      maritalStatus: 'Marié',
      email: 'mamadou.diallo@email.com',
      phone: '+41 79 555 66 77',
      address: 'Route de Genève 14',
      npa: '1004',
      city: 'Lausanne',
      education: 'Formation de base',
      experienceYears: '4',
      experienceText: '4 ans en logistique',
      drivingLicense: 'Oui',
      residencePermit: 'Permis C',
      availability: 'Immédiate',
      qualities: ['Organisation', 'Ponctualité', 'Rigueur'],
      skills: ['Préparation de commandes', 'Gestion de stock', 'Manutention']
    },
    form: {
      fields: [
        { name: 'firstName', label: 'Prénom', expected: 'Mamadou', type: 'text' },
        { name: 'lastName', label: 'Nom', expected: 'Diallo', type: 'text' },
        { name: 'birthDate', label: 'Date de naissance', expected: '20.09.1986', type: 'text' },
        { name: 'maritalStatus', label: 'État civil', expected: 'Marié', type: 'text' },
        { name: 'email', label: 'E-mail', expected: 'mamadou.diallo@email.com', type: 'email' },
        { name: 'phone', label: 'Téléphone', expected: '+41 79 555 66 77', type: 'tel' },
        { name: 'address', label: 'Adresse', expected: 'Route de Genève 14', type: 'text' },
        { name: 'npa', label: 'NPA', expected: '1004', type: 'text' },
        { name: 'city', label: 'Ville', expected: 'Lausanne', type: 'text' },
        { name: 'drivingLicense', label: 'Permis de conduire', expected: 'Oui', type: 'text' },
        { name: 'residencePermit', label: 'Permis de séjour', expected: 'Permis C', type: 'text' },
        { name: 'availability', label: 'Disponibilité', expected: 'Immédiate', type: 'text' },
        { name: 'experienceYears', label: "Années d'expérience", expected: '4', type: 'number' },
        { name: 'qualities', label: 'Qualités personnelles', expected: 'Organisation, Ponctualité, Rigueur', type: 'text' },
        { name: 'skills', label: 'Compétences professionnelles', expected: 'Préparation de commandes, Gestion de stock, Manutention', type: 'text' }
      ]
    },
    requiredFiles: [
      { type: 'cv', label: 'CV', formats: ['pdf', 'doc', 'docx'], required: true }
    ]
  },
  {
    id: 'form-6',
    tag: 'Hôtellerie',
    profile: {
      firstName: 'Ana',
      lastName: 'Ferreira',
      birthDate: '1992-01-29',
      maritalStatus: 'Mariée',
      email: 'ana.ferreira@email.com',
      phone: '+41 78 666 77 88',
      address: 'Rue du Lac 7',
      npa: '1110',
      city: 'Morges',
      education: 'Formation de base',
      experienceYears: '3',
      experienceText: '3 ans comme employée d’étage',
      drivingLicense: 'Non',
      residencePermit: 'Permis B',
      availability: 'Immédiate',
      qualities: ['Discrétion', 'Soin', 'Organisation'],
      skills: ['Nettoyage de chambres', 'Préparation du linge', 'Respect des standards hôteliers']
    },
    form: {
      fields: [
        { name: 'firstName', label: 'Prénom', expected: 'Ana', type: 'text' },
        { name: 'lastName', label: 'Nom', expected: 'Ferreira', type: 'text' },
        { name: 'birthDate', label: 'Date de naissance', expected: '29.01.1992', type: 'text' },
        { name: 'maritalStatus', label: 'État civil', expected: 'Mariée', type: 'text' },
        { name: 'email', label: 'E-mail', expected: 'ana.ferreira@email.com', type: 'email' },
        { name: 'phone', label: 'Téléphone', expected: '+41 78 666 77 88', type: 'tel' },
        { name: 'address', label: 'Adresse', expected: 'Rue du Lac 7', type: 'text' },
        { name: 'npa', label: 'NPA', expected: '1110', type: 'text' },
        { name: 'city', label: 'Ville', expected: 'Morges', type: 'text' },
        { name: 'drivingLicense', label: 'Permis de conduire', expected: 'Non', type: 'text' },
        { name: 'residencePermit', label: 'Permis de séjour', expected: 'Permis B', type: 'text' },
        { name: 'availability', label: 'Disponibilité', expected: 'Immédiate', type: 'text' },
        { name: 'experienceYears', label: "Années d'expérience", expected: '3', type: 'number' },
        { name: 'qualities', label: 'Qualités personnelles', expected: 'Discrétion, Soin, Organisation', type: 'text' },
        { name: 'skills', label: 'Compétences professionnelles', expected: 'Nettoyage de chambres, Préparation du linge, Respect des standards hôteliers', type: 'text' }
      ]
    },
    requiredFiles: [
      { type: 'cv', label: 'CV', formats: ['pdf', 'doc', 'docx'], required: true },
      { type: 'photo', label: "Photo d'identité", formats: ['jpg', 'jpeg', 'png'], required: true }
    ]
  },
  {
    id: 'form-7',
    tag: 'Aide à domicile',
    profile: {
      firstName: 'Khadija',
      lastName: 'Bensaid',
      birthDate: '1989-12-03',
      maritalStatus: 'Célibataire',
      email: 'khadija.bensaid@email.com',
      phone: '+41 77 777 88 99',
      address: 'Avenue de la Gare 15',
      npa: '1023',
      city: 'Crissier',
      education: 'Formation de base',
      experienceYears: '6',
      experienceText: '6 ans dans l’aide à domicile',
      drivingLicense: 'Oui',
      residencePermit: 'Permis C',
      availability: '2 semaines',
      qualities: ['Patience', 'Écoute', 'Fiabilité'],
      skills: ['Aide aux repas', 'Accompagnement quotidien', 'Entretien du logement']
    },
    form: {
      fields: [
        { name: 'firstName', label: 'Prénom', expected: 'Khadija', type: 'text' },
        { name: 'lastName', label: 'Nom', expected: 'Bensaid', type: 'text' },
        { name: 'birthDate', label: 'Date de naissance', expected: '03.12.1989', type: 'text' },
        { name: 'maritalStatus', label: 'État civil', expected: 'Célibataire', type: 'text' },
        { name: 'email', label: 'E-mail', expected: 'khadija.bensaid@email.com', type: 'email' },
        { name: 'phone', label: 'Téléphone', expected: '+41 77 777 88 99', type: 'tel' },
        { name: 'address', label: 'Adresse', expected: 'Avenue de la Gare 15', type: 'text' },
        { name: 'npa', label: 'NPA', expected: '1023', type: 'text' },
        { name: 'city', label: 'Ville', expected: 'Crissier', type: 'text' },
        { name: 'drivingLicense', label: 'Permis de conduire', expected: 'Oui', type: 'text' },
        { name: 'residencePermit', label: 'Permis de séjour', expected: 'Permis C', type: 'text' },
        { name: 'availability', label: 'Disponibilité', expected: '2 semaines', type: 'text' },
        { name: 'experienceYears', label: "Années d'expérience", expected: '6', type: 'number' },
        { name: 'qualities', label: 'Qualités personnelles', expected: 'Patience, Écoute, Fiabilité', type: 'text' },
        { name: 'skills', label: 'Compétences professionnelles', expected: 'Aide aux repas, Accompagnement quotidien, Entretien du logement', type: 'text' }
      ]
    },
    requiredFiles: [
      { type: 'cv', label: 'CV', formats: ['pdf', 'doc', 'docx'], required: true },
      { type: 'letter', label: 'Lettre de motivation', formats: ['pdf', 'doc', 'docx'], required: false }
    ]
  },
  {
    id: 'form-8',
    tag: 'Espaces verts',
    profile: {
      firstName: 'Luis',
      lastName: 'Moreno',
      birthDate: '1987-04-17',
      maritalStatus: 'Marié',
      email: 'luis.moreno@email.com',
      phone: '+41 76 888 99 00',
      address: 'Chemin des Fleurs 9',
      npa: '1260',
      city: 'Nyon',
      education: 'École obligatoire',
      experienceYears: '4',
      experienceText: '4 ans en entretien d’espaces verts',
      drivingLicense: 'Oui',
      residencePermit: 'Permis B',
      availability: 'Immédiate',
      qualities: ['Ponctualité', 'Endurance', 'Précision'],
      skills: ['Tonte', 'Taille de haies', 'Entretien extérieur']
    },
    form: {
      fields: [
        { name: 'firstName', label: 'Prénom', expected: 'Luis', type: 'text' },
        { name: 'lastName', label: 'Nom', expected: 'Moreno', type: 'text' },
        { name: 'birthDate', label: 'Date de naissance', expected: '17.04.1987', type: 'text' },
        { name: 'maritalStatus', label: 'État civil', expected: 'Marié', type: 'text' },
        { name: 'email', label: 'E-mail', expected: 'luis.moreno@email.com', type: 'email' },
        { name: 'phone', label: 'Téléphone', expected: '+41 76 888 99 00', type: 'tel' },
        { name: 'address', label: 'Adresse', expected: 'Chemin des Fleurs 9', type: 'text' },
        { name: 'npa', label: 'NPA', expected: '1260', type: 'text' },
        { name: 'city', label: 'Ville', expected: 'Nyon', type: 'text' },
        { name: 'drivingLicense', label: 'Permis de conduire', expected: 'Oui', type: 'text' },
        { name: 'residencePermit', label: 'Permis de séjour', expected: 'Permis B', type: 'text' },
        { name: 'availability', label: 'Disponibilité', expected: 'Immédiate', type: 'text' },
        { name: 'experienceYears', label: "Années d'expérience", expected: '4', type: 'number' },
        { name: 'qualities', label: 'Qualités personnelles', expected: 'Ponctualité, Endurance, Précision', type: 'text' },
        { name: 'skills', label: 'Compétences professionnelles', expected: 'Tonte, Taille de haies, Entretien extérieur', type: 'text' }
      ]
    },
    requiredFiles: [
      { type: 'cv', label: 'CV', formats: ['pdf', 'doc', 'docx'], required: true },
      { type: 'certif', label: 'Certificat de travail', formats: ['pdf'], required: false }
    ]
  }
];
