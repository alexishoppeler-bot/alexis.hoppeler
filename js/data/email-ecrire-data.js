'use strict';

window.EMAIL_ECRIRE_DATA = [

  // ── Scénario 1 — Candidature (answer=0) ───────────────────────────────
  {
    category: 'Candidature',
    situation: 'Vous postulez pour un poste de vendeuse. Vous devez envoyer votre CV et votre lettre de motivation.',
    choices: [
      {
        subject: 'Candidature au poste de vendeuse - Sara Martin',
        body: 'Bonjour Madame,\n\nJe vous envoie ma candidature pour le poste de vendeuse. Vous trouverez mon CV et ma lettre de motivation en pièces jointes.\n\nJe vous remercie pour votre retour.\n\nCordialement,\nSara Martin',
        attachment: 'CV + Lettre',
        signature: 'Signature complète',
        reasonIfWrong: ''
      },
      {
        subject: 'Candidature',
        body: 'Bonjour Madame,\n\nJe vous transmets ma candidature pour le poste de vendeuse. Mon CV est joint à ce message.\n\nJe vous remercie pour votre retour.\n\nCordialement,\nSara Martin',
        attachment: 'CV uniquement',
        signature: 'Signature complète',
        reasonIfWrong: 'Il manque la lettre de motivation demandée.'
      },
      {
        subject: 'Poste de vendeuse',
        body: 'Bonjour,\n\nJe vous adresse ma candidature pour le poste de vendeuse. Vous trouverez mon CV et ma lettre de motivation en pièces jointes.\n\nSara Martin',
        attachment: 'CV + Lettre',
        signature: 'Nom seul',
        reasonIfWrong: 'Il manque une formule de politesse à la fin, et l\u2019objet est moins précis.'
      },
      {
        subject: 'Demande de travail - Sara Martin',
        body: 'Bonjour Madame,\n\nJe vous envoie mon CV et ma lettre de motivation pour le poste de vendeuse.\n\nMerci de me répondre.\n\nCordialement,\nSara Martin',
        attachment: 'CV + Lettre',
        signature: 'Signature complète',
        reasonIfWrong: 'L\u2019objet et la formule "Merci de me répondre" sont moins professionnels.'
      }
    ],
    answer: 0,
    correctFeedback: 'Très bien : l\u2019objet est précis, les pièces jointes sont annoncées, et le message est poli.'
  },

  // ── Scénario 2 — ORP justificatif (answer=2) ──────────────────────────
  {
    category: 'ORP',
    situation: 'Votre conseiller ORP demande un justificatif de recherche d\u2019emploi. Vous répondez par e-mail.',
    choices: [
      {
        subject: 'Justificatif ORP',
        body: 'Bonjour Madame Dupont,\n\nComme convenu, vous trouverez en pièce jointe mon justificatif de recherche d\u2019emploi.\n\nCordialement,\nMalik Ben Ali',
        attachment: 'Justificatif joint',
        signature: 'Signature complète',
        reasonIfWrong: 'L\u2019objet est moins précis et le mois concerné n\u2019est pas indiqué dans le message.'
      },
      {
        subject: 'Transmission du justificatif - Malik Ben Ali',
        body: 'Bonjour Madame Dupont,\n\nJe vous transmets mon justificatif de recherche d\u2019emploi pour ce mois.\n\nJe reste à votre disposition.\n\nCordialement,\nMalik Ben Ali',
        attachment: 'Pièce jointe non mentionnée',
        signature: 'Signature complète',
        reasonIfWrong: 'Le message ne précise pas clairement qu\u2019une pièce jointe est envoyée.'
      },
      {
        subject: 'Envoi du justificatif de recherche d\u2019emploi - Malik Ben Ali',
        body: 'Bonjour Madame Dupont,\n\nSuite à votre demande, je vous transmets en pièce jointe mon justificatif de recherche d\u2019emploi pour ce mois.\n\nJe reste à votre disposition.\n\nCordialement,\nMalik Ben Ali',
        attachment: 'Justificatif joint',
        signature: 'Signature complète',
        reasonIfWrong: ''
      },
      {
        subject: 'Envoi justificatif ORP - Malik Ben Ali',
        body: 'Bonjour Madame Dupont,\n\nJe vous envoie mon justificatif.\n\nSalutations,\nMalik Ben Ali',
        attachment: 'Justificatif joint',
        signature: 'Signature complète',
        reasonIfWrong: 'Le message est trop court et manque de précision.'
      }
    ],
    answer: 2,
    correctFeedback: 'Bonne réponse : le message est clair, poli et la pièce jointe est bien annoncée.'
  },

  // ── Scénario 3 — Attestation commune (answer=1) ───────────────────────
  {
    category: 'Administratif',
    situation: 'Vous devez envoyer votre attestation de domicile à la commune.',
    choices: [
      {
        subject: 'Attestation de domicile',
        body: 'Bonjour,\n\nVeuillez trouver en pièce jointe mon attestation de domicile.\n\nMerci de confirmer la réception.\n\nMeilleures salutations,\nLea Dubois',
        attachment: 'Attestation jointe',
        signature: 'Signature complète',
        reasonIfWrong: 'Le message est correct, mais l\u2019objet est moins précis et la formulation est un peu plus directe.'
      },
      {
        subject: 'Attestation de domicile - Lea Dubois',
        body: 'Bonjour,\n\nVeuillez trouver en pièce jointe mon attestation de domicile.\n\nJe vous remercie pour votre confirmation de réception.\n\nMeilleures salutations,\nLea Dubois',
        attachment: 'Attestation jointe',
        signature: 'Signature complète',
        reasonIfWrong: ''
      },
      {
        subject: 'Envoi attestation de domicile - Lea Dubois',
        body: 'Bonjour,\n\nJe vous transmets mon attestation de domicile en pièce jointe.\n\nJe vous remercie pour votre confirmation de réception.\n\nCordialement,\nLea Dubois',
        attachment: 'Attestation jointe',
        signature: 'Signature complète',
        reasonIfWrong: '"Meilleures salutations" convient mieux que "Cordialement" dans ce contexte administratif.'
      },
      {
        subject: 'Attestation de domicile - Lea Dubois',
        body: 'Bonjour,\n\nVeuillez trouver en pièce jointe mon attestation de domicile.\n\nJe vous remercie pour votre retour.\n\nMeilleures salutations,\nLea',
        attachment: 'Attestation jointe',
        signature: 'Prénom uniquement',
        reasonIfWrong: 'La signature est incomplète pour un envoi administratif.'
      }
    ],
    answer: 1,
    correctFeedback: 'Exact : objet clair, ton professionnel, pièce jointe annoncée et signature complète.'
  },

  // ── Scénario 4 — Confirmation entretien (answer=3) ────────────────────
  {
    category: 'Entretien',
    situation: 'Une entreprise vous propose un entretien mardi à 14h00. Vous devez confirmer votre présence.',
    choices: [
      {
        subject: 'Disponibilité entretien',
        body: 'Bonjour Madame,\n\nJe confirme ma disponibilité pour mardi à 14h00.\n\nCordialement,\nNadia Lopes',
        attachment: 'Aucune pièce jointe nécessaire',
        signature: 'Signature complète',
        reasonIfWrong: 'L\u2019objet est moins précis et il manque un remerciement pour le message reçu.'
      },
      {
        subject: 'Confirmation entretien - Nadia Lopes',
        body: 'Bonjour Madame,\n\nMerci pour votre message. Je confirme ma disponibilité pour mardi.\n\nMeilleures salutations,\nNadia Lopes',
        attachment: 'Aucune pièce jointe nécessaire',
        signature: 'Signature complète',
        reasonIfWrong: 'La réponse ne reprend pas l\u2019heure de 14h00.'
      },
      {
        subject: 'Re: entretien',
        body: 'Bonjour,\n\nJe serai là.\n\nNadia',
        attachment: 'Aucune pièce jointe nécessaire',
        signature: 'Prénom uniquement',
        reasonIfWrong: 'La réponse est trop courte, peu professionnelle et la signature est incomplète.'
      },
      {
        subject: 'Confirmation de disponibilité pour l\u2019entretien - Nadia Lopes',
        body: 'Bonjour Madame,\n\nMerci pour votre message. Je confirme ma disponibilité pour l\u2019entretien du mardi à 14h00.\n\nMeilleures salutations,\nNadia Lopes',
        attachment: 'Aucune pièce jointe nécessaire',
        signature: 'Signature complète',
        reasonIfWrong: ''
      }
    ],
    answer: 3,
    correctFeedback: 'Très bien : la réponse remercie, confirme clairement la date et l\u2019heure, et reste professionnelle.'
  },

  // ── Scénario 5 — Assurance formulaire (answer=0) ──────────────────────
  {
    category: 'Assurance',
    situation: 'Votre assurance demande le formulaire signé en PDF. Vous devez l\u2019envoyer par e-mail.',
    choices: [
      {
        subject: 'Envoi du formulaire signé en PDF - Karim Haddad',
        body: 'Bonjour,\n\nVeuillez trouver en pièce jointe mon formulaire signé au format PDF.\n\nJe vous remercie pour votre confirmation de réception.\n\nCordialement,\nKarim Haddad',
        attachment: 'Formulaire signé PDF',
        signature: 'Signature complète',
        reasonIfWrong: ''
      },
      {
        subject: 'Formulaire signé',
        body: 'Bonjour,\n\nJe vous transmets mon formulaire signé.\n\nCordialement,\nKarim Haddad',
        attachment: 'Format PDF non mentionné',
        signature: 'Signature complète',
        reasonIfWrong: 'Le message ne précise pas que le document est envoyé en PDF.'
      },
      {
        subject: 'Envoi du formulaire - Karim Haddad',
        body: 'Bonjour,\n\nVeuillez trouver en pièce jointe mon formulaire signé au format PDF.\n\nMerci.\n\nKarim Haddad',
        attachment: 'Formulaire signé PDF',
        signature: 'Signature simple',
        reasonIfWrong: 'La formule de politesse et la signature sont plus faibles.'
      },
      {
        subject: 'Document',
        body: 'Bonjour,\n\nJe vous envoie le document demandé.\n\nCordialement,\nKarim Haddad',
        attachment: 'Document trop vague',
        signature: 'Signature complète',
        reasonIfWrong: 'Le message est trop vague et ne précise ni le formulaire signé ni le format PDF.'
      }
    ],
    answer: 0,
    correctFeedback: 'Bonne réponse : le document demandé est clairement annoncé, avec le format PDF et une formule polie.'
  },

  // ── Scénario 6 — Logement permis + fiches de salaire (answer=2) ───────
  {
    category: 'Logement',
    situation: 'La gérance vous demande votre copie de permis et vos trois dernières fiches de salaire pour compléter votre dossier.',
    choices: [
      {
        subject: 'Documents pour le dossier',
        body: 'Bonjour,\n\nJe vous transmets une copie de mon permis en pièce jointe.\n\nMeilleures salutations,\nSofia Mendes',
        attachment: 'Permis uniquement',
        signature: 'Signature complète',
        reasonIfWrong: 'Il manque les trois fiches de salaire demandées.'
      },
      {
        subject: 'Envoi de documents - Sofia Mendes',
        body: 'Bonjour,\n\nJe vous transmets les documents demandés pour mon dossier.\n\nCordialement,\nSofia Mendes',
        attachment: 'Documents non détaillés',
        signature: 'Signature complète',
        reasonIfWrong: 'Le message est trop vague et ne détaille pas les pièces jointes.'
      },
      {
        subject: 'Envoi des documents demandés - Sofia Mendes',
        body: 'Bonjour,\n\nSuite à votre demande, je vous transmets en pièces jointes une copie de mon permis ainsi que mes trois dernières fiches de salaire.\n\nJe reste à votre disposition pour tout complément.\n\nMeilleures salutations,\nSofia Mendes',
        attachment: 'Permis + 3 fiches de salaire',
        signature: 'Signature complète',
        reasonIfWrong: ''
      },
      {
        subject: 'Dossier location',
        body: 'Bonjour,\n\nVous trouverez mes documents en pièce jointe.\n\nSofia',
        attachment: 'Documents non détaillés',
        signature: 'Prénom uniquement',
        reasonIfWrong: 'La signature est incomplète et les documents ne sont pas précisés.'
      }
    ],
    answer: 2,
    correctFeedback: 'Exact : l\u2019e-mail annonce clairement les deux types de documents et garde un ton professionnel.'
  },

  // ── Scénario 7 — Annulation RDV médecin (answer=1) ────────────────────
  {
    category: 'Santé',
    situation: 'Vous avez un rendez-vous chez le médecin ce vendredi à 14h00. Vous ne pouvez pas vous y rendre. Vous devez annuler et demander un nouveau rendez-vous.',
    choices: [
      {
        subject: 'Annulation',
        body: 'Bonjour,\n\nJe ne peux pas venir vendredi.\n\nMohamed',
        attachment: 'Aucune pièce jointe nécessaire',
        signature: 'Prénom uniquement',
        reasonIfWrong: 'Le message est trop court, l\u2019objet manque de précision et la signature est incomplète.'
      },
      {
        subject: 'Annulation de mon rendez-vous du vendredi à 14h00 - Mohamed Kacem',
        body: 'Bonjour,\n\nJe me permets de vous contacter pour annuler mon rendez-vous prévu ce vendredi 21 mars à 14h00.\n\nJe m\u2019en excuse et souhaiterais fixer un nouveau rendez-vous dès que possible.\n\nMeilleures salutations,\nMohamed Kacem',
        attachment: 'Aucune pièce jointe nécessaire',
        signature: 'Signature complète',
        reasonIfWrong: ''
      },
      {
        subject: 'Annulation de mon rendez-vous - Mohamed Kacem',
        body: 'Bonjour,\n\nJe dois annuler mon rendez-vous de vendredi à 14h00.\n\nMeilleures salutations,\nMohamed Kacem',
        attachment: 'Aucune pièce jointe nécessaire',
        signature: 'Signature complète',
        reasonIfWrong: 'Le message est poli, mais il oublie de demander un nouveau rendez-vous.'
      },
      {
        subject: 'Annulation rendez-vous - Mohamed Kacem',
        body: 'Bonjour,\n\nJe dois annuler mon rendez-vous.\n\nPuis-je en reprendre un autre ?\n\nMohamed Kacem',
        attachment: 'Aucune pièce jointe nécessaire',
        signature: 'Signature complète',
        reasonIfWrong: 'Le message ne précise ni la date ni l\u2019heure du rendez-vous annulé.'
      }
    ],
    answer: 1,
    correctFeedback: 'Très bien : l\u2019annulation est claire, la date est précisée, et vous proposez de fixer un nouveau rendez-vous.'
  },

  // ── Scénario 8 — Signalement panne chauffage gérance (answer=3) ────────
  {
    category: 'Logement',
    situation: 'Le chauffage de votre appartement est en panne depuis deux jours. Vous signalez le problème à la gérance par e-mail.',
    choices: [
      {
        subject: 'Problème appartement',
        body: 'Bonjour,\n\nIl y a un problème chez moi.\n\nMerci.\n\nYasmine Bouali',
        attachment: 'Aucune pièce jointe nécessaire',
        signature: 'Signature complète',
        reasonIfWrong: 'Le message ne décrit pas le problème ni depuis combien de temps il dure.'
      },
      {
        subject: 'Panne chauffage',
        body: 'Bonjour,\n\nMon chauffage ne fonctionne plus. Merci de régler ça.\n\nYasmine Bouali',
        attachment: 'Aucune pièce jointe nécessaire',
        signature: 'Signature complète',
        reasonIfWrong: 'Le message décrit le problème, mais ne précise pas la durée ni l\u2019adresse, et le ton est trop direct.'
      },
      {
        subject: 'Panne de chauffage - Appartement 3B - Yasmine Bouali',
        body: 'Bonjour,\n\nJe vous signale que le chauffage de mon appartement ne fonctionne plus depuis deux jours.\n\nPourriez-vous envoyer un technicien rapidement ?\n\nYasmine Bouali',
        attachment: 'Aucune pièce jointe nécessaire',
        signature: 'Signature simple',
        reasonIfWrong: 'Le contenu est bon, mais il manque une formule de politesse et une signature complète avec le numéro d\u2019appartement.'
      },
      {
        subject: 'Panne de chauffage - Appartement 3B - Yasmine Bouali',
        body: 'Bonjour,\n\nJe me permets de vous signaler que le chauffage de mon appartement (3B, 2e étage) est en panne depuis le lundi 18 mars.\n\nJe vous serais reconnaissante de bien vouloir envoyer un technicien dans les meilleurs délais.\n\nMeilleures salutations,\nYasmine Bouali',
        attachment: 'Aucune pièce jointe nécessaire',
        signature: 'Signature complète',
        reasonIfWrong: ''
      }
    ],
    answer: 3,
    correctFeedback: 'Excellent : le problème est décrit avec précision (lieu, date), la demande est polie et la signature est complète.'
  },

  // ── Scénario 9 — Question sur facture assurance (answer=2) ────────────
  {
    category: 'Santé',
    situation: 'Votre assurance maladie vous a envoyé une facture avec un montant que vous ne comprenez pas. Vous demandez des explications par e-mail.',
    choices: [
      {
        subject: 'Votre facture',
        body: 'Bonjour,\n\nVotre facture est incompréhensible. Je veux des explications.\n\nRodrigo Fonseca',
        attachment: 'Aucune pièce jointe nécessaire',
        signature: 'Signature simple',
        reasonIfWrong: 'Le ton est trop agressif et la signature est incomplète pour une demande administrative.'
      },
      {
        subject: 'Question facture assurance - Rodrigo Fonseca',
        body: 'Bonjour,\n\nJ\u2019ai reçu une facture de votre part et je ne comprends pas le montant indiqué.\n\nPourriez-vous m\u2019expliquer ce montant ?\n\nRodrigo',
        attachment: 'Aucune pièce jointe nécessaire',
        signature: 'Prénom uniquement',
        reasonIfWrong: 'La demande est polie, mais la signature est incomplète et la référence de la facture n\u2019est pas mentionnée.'
      },
      {
        subject: 'Question concernant ma facture du 15 mars - Rodrigo Fonseca',
        body: 'Bonjour,\n\nJ\u2019ai bien reçu votre facture du 15 mars, mais le montant indiqué me pose question.\n\nPourriez-vous m\u2019expliquer comment ce montant a été calculé ?\n\nJe vous remercie d\u2019avance pour votre réponse.\n\nCordialement,\nRodrigo Fonseca',
        attachment: 'Aucune pièce jointe nécessaire',
        signature: 'Signature complète',
        reasonIfWrong: ''
      },
      {
        subject: 'Question - Rodrigo Fonseca',
        body: 'Bonjour,\n\nJe ne comprends pas ma facture. Pouvez-vous m\u2019aider ?\n\nCordialement,\nRodrigo Fonseca',
        attachment: 'Aucune pièce jointe nécessaire',
        signature: 'Signature complète',
        reasonIfWrong: 'Le message ne fait pas référence à la facture reçue, ce qui rend la demande trop vague.'
      }
    ],
    answer: 2,
    correctFeedback: 'Très bien : vous faites référence à la facture reçue, posez la question clairement et restez poli.'
  },

  // ── Scénario 10 — Absence au travail (answer=0) ───────────────────────
  {
    category: 'Emploi',
    situation: 'Vous êtes malade et ne pouvez pas aller travailler aujourd\u2019hui. Vous prévenez votre responsable par e-mail.',
    choices: [
      {
        subject: 'Absence pour maladie – Amara Diallo',
        body: 'Bonjour Madame Bernard,\n\nJe vous informe que je ne pourrai pas venir travailler aujourd\u2019hui, lundi 24 mars, en raison d\u2019une maladie.\n\nJe vous transmettrai un certificat médical dès que possible.\n\nCordialement,\nAmara Diallo',
        attachment: 'Aucune pièce jointe nécessaire',
        signature: 'Signature complète',
        reasonIfWrong: ''
      },
      {
        subject: 'Absence – Amara Diallo',
        body: 'Bonjour Madame Bernard,\n\nJe suis malade et ne peux pas venir.\n\nCordialement,\nAmara Diallo',
        attachment: 'Aucune pièce jointe nécessaire',
        signature: 'Signature complète',
        reasonIfWrong: 'Le message est trop court : il ne précise pas la date d\u2019absence ni la mention du certificat médical.'
      },
      {
        subject: 'Absence maladie',
        body: 'Bonjour,\n\nJe suis malade aujourd\u2019hui. Je ne viendrai pas.\n\nAmara',
        attachment: 'Aucune pièce jointe nécessaire',
        signature: 'Prénom uniquement',
        reasonIfWrong: 'L\u2019objet est trop vague, la signature est incomplète et la formule de politesse manque.'
      },
      {
        subject: 'Absence pour maladie – Amara Diallo',
        body: 'Bonjour Madame Bernard,\n\nJe suis malade aujourd\u2019hui lundi 24 mars.\n\nAmara Diallo',
        attachment: 'Aucune pièce jointe nécessaire',
        signature: 'Signature complète',
        reasonIfWrong: 'Le message ne mentionne pas la transmission d\u2019un certificat médical et il manque une formule de politesse finale.'
      }
    ],
    answer: 0,
    correctFeedback: 'Parfait : la date est précisée, vous mentionnez le certificat médical et le ton est professionnel.'
  }

];
