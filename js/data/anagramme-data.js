/* ===== JS/DATA/ANAGRAMME-DATA.JS ===== */
'use strict';

window.ANAGRAMME_DATA = [
  // Identité
  { word: 'NOM',          hint: 'Nom de famille',                               category: 'Identité',      difficulty: 'easy',   theme: 'numérique' },
  { word: 'PRENOM',       hint: 'Nom personnel',                                category: 'Identité',      difficulty: 'easy',   theme: 'numérique' },
  { word: 'GENRE',        hint: 'Case du formulaire : homme ou femme',          category: 'Identité',      difficulty: 'easy',   theme: 'numérique' },

  // Localisation
  { word: 'ADRESSE',      hint: "L’endroit où vous habitez",                    category: 'Localisation',  difficulty: 'medium', theme: 'numérique' },
  { word: 'VILLE',        hint: 'La commune où vous habitez',                   category: 'Localisation',  difficulty: 'easy',   theme: 'numérique' },
  { word: 'RUE',          hint: "Nom de la rue dans l’adresse",                 category: 'Localisation',  difficulty: 'easy',   theme: 'numérique' },
  { word: 'NUMERO',       hint: 'Chiffre de la maison ou du bâtiment',          category: 'Localisation',  difficulty: 'easy',   theme: 'numérique' },
  { word: 'NPA',          hint: 'Code postal en Suisse',                        category: 'Localisation',  difficulty: 'easy',   theme: 'numérique' },
  { word: 'PAYS',         hint: 'Exemple : Suisse, France, Portugal',           category: 'Localisation',  difficulty: 'easy',   theme: 'numérique' },

  // Contact
  { word: 'EMAIL',        hint: 'Adresse électronique',                         category: 'Contact',       difficulty: 'easy',   theme: 'numérique' },
  { word: 'TELEPHONE',    hint: 'Numéro pour appeler une personne',             category: 'Contact',       difficulty: 'medium', theme: 'numérique' },

  // Dates et état civil
  { word: 'DATE',         hint: 'Jour, mois et année',                          category: 'Dates',         difficulty: 'easy',   theme: 'numérique' },
  { word: 'NAISSANCE',    hint: 'Mot dans : date de ...',                       category: 'Dates',         difficulty: 'medium', theme: 'numérique' },
  { word: 'MARIE',        hint: 'Quand on a un mari ou une femme',              category: 'État civil',    difficulty: 'easy',   theme: 'numérique' },
  { word: 'CELIBATAIRE',  hint: "Quand on n’est pas marié",                     category: 'État civil',    difficulty: 'hard',   theme: 'numérique' },
  { word: 'DIVORCE',      hint: 'Quand le mariage est terminé',                 category: 'État civil',    difficulty: 'medium', theme: 'numérique' },

  // Nationalité et documents
  { word: 'NATIONALITE',  hint: 'Pays auquel vous appartenez',                  category: 'Nationalité',   difficulty: 'hard',   theme: 'numérique' },
  { word: 'SIGNATURE',    hint: 'Nom écrit à la main',                          category: 'Documents',     difficulty: 'medium', theme: 'numérique' },
  { word: 'DOCUMENT',     hint: 'Papier demandé avec le formulaire',            category: 'Documents',     difficulty: 'easy',   theme: 'numérique' },
  { word: 'FORMULAIRE',   hint: 'Document avec des cases à remplir',            category: 'Documents',     difficulty: 'hard',   theme: 'numérique' },
  { word: 'PERMIS',       hint: 'Document officiel en Suisse',                  category: 'Documents',     difficulty: 'medium', theme: 'orp' },
  { word: 'ATTESTATION',  hint: 'Document officiel qui prouve quelque chose',   category: 'Documents',     difficulty: 'hard',   theme: 'orp' },
  { word: 'DIPLOME',      hint: 'Document de fin de formation',                 category: 'Documents',     difficulty: 'medium', theme: 'emploi' },
  { word: 'DOSSIER',      hint: 'Ensemble de documents pour une démarche',      category: 'Documents',     difficulty: 'medium', theme: 'numérique' },
  { word: 'GUICHET',      hint: "Endroit où l’on est accueilli dans un service",category: 'Vie quotidienne',difficulty: 'medium', theme: 'numérique' },

  // Emploi
  { word: 'EMPLOI',       hint: "Travail que l’on cherche",                     category: 'Emploi',        difficulty: 'easy',   theme: 'emploi' },
  { word: 'TRAVAIL',      hint: 'Activité professionnelle',                     category: 'Emploi',        difficulty: 'easy',   theme: 'emploi' },
  { word: 'METIER',       hint: 'Profession : cuisinier, nettoyeur...',         category: 'Emploi',        difficulty: 'medium', theme: 'emploi' },
  { word: 'SALAIRE',      hint: 'Argent reçu pour le travail',                  category: 'Emploi',        difficulty: 'medium', theme: 'emploi' },
  { word: 'CONTRAT',      hint: 'Document signé pour le travail',               category: 'Emploi',        difficulty: 'medium', theme: 'emploi' },
  { word: 'CANDIDATURE',  hint: 'Demande pour obtenir un poste',                category: 'Emploi',        difficulty: 'hard',   theme: 'emploi' },
  { word: 'FORMATION',    hint: 'Études ou apprentissage suivis',               category: 'Emploi',        difficulty: 'hard',   theme: 'emploi' },
  { word: 'EXPERIENCE',   hint: 'Temps déjà travaillé dans un métier',          category: 'Emploi',        difficulty: 'hard',   theme: 'emploi' },
  { word: 'DISPONIBLE',   hint: 'Libre pour commencer un travail',              category: 'Emploi',        difficulty: 'hard',   theme: 'emploi' },
  { word: 'ENTREPRISE',   hint: "Lieu où l’on travaille",                       category: 'Emploi',        difficulty: 'hard',   theme: 'emploi' },
  { word: 'QUALITE',      hint: 'Exemple : sérieux, ponctualité, écoute',       category: 'Entretien',     difficulty: 'medium', theme: 'emploi' },

  // Entretien
  { word: 'ENTRETIEN',    hint: "Rencontre avec l’employeur",                   category: 'Entretien',     difficulty: 'hard',   theme: 'emploi' },

  // Transports
  { word: 'GARE',         hint: 'Lieu où on prend le train',                    category: 'Transports',    difficulty: 'easy',   theme: 'transports' },
  { word: 'TRAM',         hint: 'Transport public en ville',                    category: 'Transports',    difficulty: 'easy',   theme: 'transports' },
  { word: 'HORAIRE',      hint: 'Heures de départ du bus ou du train',          category: 'Transports',    difficulty: 'medium', theme: 'transports' },
  { word: 'BILLET',       hint: 'Ticket pour voyager',                          category: 'Transports',    difficulty: 'easy',   theme: 'transports' },
  { word: 'LAUSANNE',     hint: 'Grande ville de Suisse romande',               category: 'Villes',        difficulty: 'medium', theme: 'transports' },

  // Vie quotidienne
  { word: 'COMMUNE',      hint: 'Administration locale',                        category: 'Vie quotidienne',difficulty: 'medium', theme: 'numérique' },
  { word: 'LIVRAISON',    hint: "Action d’apporter une commande",               category: 'Logistique',    difficulty: 'hard',   theme: 'emploi' },

  // Santé
  { word: 'MEDECIN',      hint: 'Professionnel de la santé',                    category: 'Santé',         difficulty: 'medium', theme: 'santé' },
  { word: 'SANTE',        hint: 'Bien-être physique et mental',                 category: 'Santé',         difficulty: 'easy',   theme: 'santé' },
  { word: 'ORDONNANCE',   hint: 'Document du médecin pour obtenir des médicaments', category: 'Santé',     difficulty: 'hard',   theme: 'santé' },
  { word: 'PHARMACIE',    hint: 'Lieu où l’on achète des médicaments',          category: 'Santé',         difficulty: 'hard',   theme: 'santé' },
  { word: 'ASSURANCE',    hint: 'Couverture obligatoire pour les soins en Suisse', category: 'Santé',      difficulty: 'medium', theme: 'santé' },
  { word: 'URGENCES',     hint: 'Service hospitalier pour les cas graves',      category: 'Santé',         difficulty: 'hard',   theme: 'santé' },
  { word: 'VACCIN',       hint: 'Protection contre certaines maladies',         category: 'Santé',         difficulty: 'medium', theme: 'santé' },
  { word: 'HOPITAL',      hint: 'Grand établissement de soins médicaux',        category: 'Santé',         difficulty: 'medium', theme: 'santé' },

  // Logement
  { word: 'LOYER',        hint: 'Somme payée chaque mois pour habiter',         category: 'Logement',      difficulty: 'easy',   theme: 'logement' },
  { word: 'BAIL',         hint: 'Contrat de location',                          category: 'Logement',      difficulty: 'easy',   theme: 'logement' },
  { word: 'LOCATAIRE',    hint: 'Personne qui loue un logement',                category: 'Logement',      difficulty: 'hard',   theme: 'logement' },
  { word: 'CAUTION',      hint: 'Garantie déposée à l’entrée dans un logement', category: 'Logement',      difficulty: 'medium', theme: 'logement' },
  { word: 'GERANCE',      hint: 'Société qui gère des immeubles en location',   category: 'Logement',      difficulty: 'medium', theme: 'logement' },
  { word: 'CHARGES',      hint: 'Frais supplémentaires liés au logement',       category: 'Logement',      difficulty: 'medium', theme: 'logement' },
  { word: 'IMMEUBLE',     hint: 'Bâtiment avec plusieurs appartements',         category: 'Logement',      difficulty: 'hard',   theme: 'logement' },

  // Banque
  { word: 'BANQUE',       hint: 'Établissement financier',                      category: 'Banque',        difficulty: 'easy',   theme: 'numérique' },
  { word: 'COMPTE',       hint: 'Ce qu’on ouvre à la banque pour son argent',   category: 'Banque',        difficulty: 'easy',   theme: 'numérique' },
  { word: 'VIREMENT',     hint: 'Transfert d’argent d’un compte à un autre',    category: 'Banque',        difficulty: 'hard',   theme: 'numérique' },
  { word: 'IBAN',         hint: 'Numéro de compte international',               category: 'Banque',        difficulty: 'easy',   theme: 'numérique' },
  { word: 'FACTURE',    hint: 'Document indiquant une somme à payer',          category: 'Banque',        difficulty: 'medium', theme: 'numérique' },
];
