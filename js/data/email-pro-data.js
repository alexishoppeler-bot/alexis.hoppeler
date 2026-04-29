'use strict';

window.EMAIL_PRO_DATA = [
  {
    category: 'ORP',
    received: {
      from: 'De\u00a0: Mme Dupont (Conseilli\u00e8re ORP)',
      subject: 'Demande de preuves de recherches',
      body: 'Bonjour Monsieur,\n\nMerci de m\u2019envoyer vos preuves de recherches d\u2019emploi pour le mois de f\u00e9vrier avant vendredi 17h.\n\nSalutations,\nMme Dupont',
      request: 'Action attendue\u00a0: r\u00e9pondre poliment et indiquer la pi\u00e8ce jointe demand\u00e9e.'
    },
    responses: [
      {
        subject: 'Re\u00a0: Demande de preuves de recherches',
        body: 'Bonjour Madame Dupont,\n\nJe vous envoie en pi\u00e8ce jointe mes preuves de recherches d\u2019emploi pour le mois de f\u00e9vrier.\n\nJe vous remercie et reste \u00e0 votre disposition.\n\nCordialement,\nYacine Ben Saad',
        attachment: 'Preuves jointes',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: ''
      },
      {
        subject: 'Re\u00a0: Demande de preuves de recherches',
        body: 'Bonjour Madame Dupont,\n\nJe vous transmets mes preuves de recherches d\u2019emploi pour le mois de f\u00e9vrier.\n\nCordialement,\nYacine Ben Saad',
        attachment: 'Pi\u00e8ce jointe non annonc\u00e9e clairement',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: 'Le message est correct, mais il ne dit pas clairement qu\u2019une pi\u00e8ce jointe est envoy\u00e9e.'
      },
      {
        subject: 'Preuves de recherches - f\u00e9vrier',
        body: 'Bonjour Madame Dupont,\n\nVeuillez trouver en pi\u00e8ce jointe mes preuves de recherches d\u2019emploi.\n\nMeilleures salutations,\nYacine Ben Saad',
        attachment: 'Preuves jointes',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: 'Cette r\u00e9ponse est bonne, mais elle reprend moins bien le message re\u00e7u et ne pr\u00e9cise pas clairement \u00abde f\u00e9vrier\u00bb dans le texte.'
      },
      {
        subject: 'Re\u00a0: Demande de preuves de recherches',
        body: 'Bonjour Madame Dupont,\n\nJe vous envoie mes documents.\n\nCordialement,\nYacine Ben Saad',
        attachment: 'Documents trop vagues',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: 'Le message est trop vague\u00a0: il ne pr\u00e9cise pas qu\u2019il s\u2019agit des preuves de recherches d\u2019emploi.'
      }
    ],
    answer: 0,
    correctFeedback: 'Bonne r\u00e9ponse\u00a0: le message est poli, pr\u00e9cis, et la pi\u00e8ce jointe est clairement annonc\u00e9e.'
  },

  {
    category: 'Emploi',
    received: {
      from: 'De\u00a0: RH Garage Martin',
      subject: 'Disponibilit\u00e9 pour entretien',
      body: 'Bonjour,\n\nNous vous proposons un entretien mardi \u00e0 10h. Merci de confirmer votre disponibilit\u00e9.\n\nCordialement,\nService RH',
      request: 'Action attendue\u00a0: confirmer clairement la disponibilit\u00e9.'
    },
    responses: [
      {
        subject: 'Re\u00a0: Disponibilit\u00e9 pour entretien',
        body: 'Bonjour,\n\nJe confirme que je suis disponible mardi \u00e0 10h pour l\u2019entretien.\n\nCordialement,\nInes Carvalho',
        attachment: 'Aucune pi\u00e8ce jointe n\u00e9cessaire',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: 'Cette r\u00e9ponse est correcte, mais la meilleure remercie aussi pour le message re\u00e7u.'
      },
      {
        subject: 'Re\u00a0: Disponibilit\u00e9 pour entretien',
        body: 'Bonjour,\n\nMerci pour votre message. Je confirme ma disponibilit\u00e9 mardi \u00e0 10h pour l\u2019entretien.\n\nMeilleures salutations,\nInes Carvalho',
        attachment: 'Aucune pi\u00e8ce jointe n\u00e9cessaire',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: ''
      },
      {
        subject: 'Disponibilit\u00e9 entretien mardi',
        body: 'Bonjour,\n\nMerci pour votre message. Je serai disponible mardi \u00e0 10h.\n\nMeilleures salutations,\nInes',
        attachment: 'Aucune pi\u00e8ce jointe n\u00e9cessaire',
        signature: 'Pr\u00e9nom uniquement',
        reasonIfWrong: 'La signature est incompl\u00e8te.'
      },
      {
        subject: 'Re\u00a0: Disponibilit\u00e9 pour entretien',
        body: 'Bonjour,\n\nMerci pour votre message. Je confirme ma disponibilit\u00e9 pour mardi.\n\nMeilleures salutations,\nInes Carvalho',
        attachment: 'Aucune pi\u00e8ce jointe n\u00e9cessaire',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: 'La r\u00e9ponse oublie l\u2019heure pr\u00e9cise de 10h.'
      }
    ],
    answer: 1,
    correctFeedback: 'Correct\u00a0: la disponibilit\u00e9 est confirm\u00e9e clairement avec la date, l\u2019heure et un ton professionnel.'
  },

  {
    category: 'Administratif',
    received: {
      from: 'De\u00a0: Commune de Nyon',
      subject: 'Attestation demand\u00e9e',
      body: 'Bonjour Madame,\n\nMerci de nous transmettre votre attestation de domicile en PDF.\n\nCordialement,\nGuichet population',
      request: 'Action attendue\u00a0: annoncer la pi\u00e8ce jointe PDF dans la r\u00e9ponse.'
    },
    responses: [
      {
        subject: 'Re\u00a0: Attestation demand\u00e9e',
        body: 'Bonjour,\n\nVeuillez trouver en pi\u00e8ce jointe mon attestation de domicile.\n\nJe vous remercie pour votre confirmation de r\u00e9ception.\n\nMeilleures salutations,\nLina Messaoudi',
        attachment: 'Attestation jointe',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: 'La r\u00e9ponse ne pr\u00e9cise pas que le document est envoy\u00e9 au format PDF.'
      },
      {
        subject: 'Re\u00a0: Attestation demand\u00e9e',
        body: 'Bonjour,\n\nJe vous envoie mon document.\n\nMeilleures salutations,\nLina Messaoudi',
        attachment: 'Document trop vague',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: 'Le message est trop vague et ne pr\u00e9cise ni le type de document ni le format PDF.'
      },
      {
        subject: 'Re\u00a0: Attestation demand\u00e9e',
        body: 'Bonjour,\n\nVeuillez trouver en pi\u00e8ce jointe mon attestation de domicile au format PDF.\n\nJe vous remercie pour votre confirmation de r\u00e9ception.\n\nMeilleures salutations,\nLina Messaoudi',
        attachment: 'Attestation PDF jointe',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: ''
      },
      {
        subject: 'Attestation de domicile - Lina Messaoudi',
        body: 'Bonjour,\n\nVeuillez trouver en pi\u00e8ce jointe mon attestation de domicile au format PDF.\n\nCordialement,\nLina Messaoudi',
        attachment: 'Attestation PDF jointe',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: 'Cette r\u00e9ponse fonctionne, mais la meilleure garde l\u2019objet du message re\u00e7u et demande une confirmation de r\u00e9ception.'
      }
    ],
    answer: 2,
    correctFeedback: 'Exact\u00a0: le message est clair, poli, et annonce bien la pi\u00e8ce jointe PDF.'
  },

  {
    category: 'Emploi',
    received: {
      from: 'De\u00a0: Mme Renaud, Entreprise CleanPlus',
      subject: 'Merci d\u2019envoyer votre CV mis \u00e0 jour',
      body: 'Bonjour,\n\nAfin de finaliser votre dossier, merci de r\u00e9pondre \u00e0 ce message avec votre CV mis \u00e0 jour en pi\u00e8ce jointe.\n\nCordialement,\nMme Renaud',
      request: 'Action attendue\u00a0: r\u00e9ponse compl\u00e8te avec mention du CV joint.'
    },
    responses: [
      {
        subject: 'Re\u00a0: Merci d\u2019envoyer votre CV mis \u00e0 jour',
        body: 'Bonjour Madame Renaud,\n\nJe vous transmets mon CV mis \u00e0 jour.\n\nCordialement,\nJoao Pereira',
        attachment: 'Pi\u00e8ce jointe non annonc\u00e9e clairement',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: 'Le message ne pr\u00e9cise pas clairement qu\u2019une pi\u00e8ce jointe accompagne la r\u00e9ponse.'
      },
      {
        subject: 'CV mis \u00e0 jour - Joao Pereira',
        body: 'Bonjour Madame Renaud,\n\nMerci pour votre message. Vous trouverez mon CV mis \u00e0 jour en pi\u00e8ce jointe.\n\nMeilleures salutations,\nJoao Pereira',
        attachment: 'CV joint',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: 'Cette r\u00e9ponse est bonne, mais la meilleure reprend directement l\u2019objet du message re\u00e7u.'
      },
      {
        subject: 'Re\u00a0: Merci d\u2019envoyer votre CV mis \u00e0 jour',
        body: 'Bonjour Madame Renaud,\n\nMerci pour votre message. Je vous transmets mon CV en pi\u00e8ce jointe.\n\nCordialement,\nJoao Pereira',
        attachment: 'CV joint',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: 'La r\u00e9ponse ne pr\u00e9cise pas que le CV est bien mis \u00e0 jour.'
      },
      {
        subject: 'Re\u00a0: Merci d\u2019envoyer votre CV mis \u00e0 jour',
        body: 'Bonjour Madame Renaud,\n\nMerci pour votre message. Je vous transmets mon CV mis \u00e0 jour en pi\u00e8ce jointe.\n\nCordialement,\nJoao Pereira',
        attachment: 'CV joint',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: ''
      }
    ],
    answer: 3,
    correctFeedback: 'Bonne pratique\u00a0: r\u00e9ponse professionnelle, pr\u00e9cise, avec pi\u00e8ce jointe clairement annonc\u00e9e.'
  },

  {
    category: 'ORP',
    received: {
      from: 'De\u00a0: ORP Lausanne',
      subject: 'Convocation entretien ORP',
      body: 'Bonjour,\n\nVous \u00eates convoqu\u00e9 le jeudi 14 mars \u00e0 09h00. Merci de confirmer votre pr\u00e9sence.\n\nSalutations,\nORP Lausanne',
      request: 'Action attendue\u00a0: confirmer sa pr\u00e9sence.'
    },
    responses: [
      {
        subject: 'Re\u00a0: Convocation entretien ORP',
        body: 'Bonjour,\n\nJe confirme ma pr\u00e9sence \u00e0 l\u2019entretien ORP du jeudi 14 mars \u00e0 09h00.\n\nMeilleures salutations,\nFatima El Idrissi',
        attachment: 'Aucune pi\u00e8ce jointe n\u00e9cessaire',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: ''
      },
      {
        subject: 'Re\u00a0: Convocation entretien ORP',
        body: 'Bonjour,\n\nJe confirme ma pr\u00e9sence \u00e0 l\u2019entretien ORP du jeudi 14 mars.\n\nMeilleures salutations,\nFatima El Idrissi',
        attachment: 'Aucune pi\u00e8ce jointe n\u00e9cessaire',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: 'La r\u00e9ponse oublie l\u2019heure pr\u00e9cise de 09h00.'
      },
      {
        subject: 'Confirmation pr\u00e9sence ORP',
        body: 'Bonjour,\n\nJe confirme ma pr\u00e9sence le jeudi 14 mars \u00e0 09h00.\n\nCordialement,\nFatima El Idrissi',
        attachment: 'Aucune pi\u00e8ce jointe n\u00e9cessaire',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: 'Cette r\u00e9ponse est correcte, mais la meilleure reprend plus pr\u00e9cis\u00e9ment le contexte de l\u2019entretien ORP.'
      },
      {
        subject: 'Re\u00a0: Convocation entretien ORP',
        body: 'Bonjour,\n\nJe serai l\u00e0.\n\nMeilleures salutations,\nFatima El Idrissi',
        attachment: 'Aucune pi\u00e8ce jointe n\u00e9cessaire',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: 'La r\u00e9ponse est trop courte et ne reprend ni la date ni l\u2019heure.'
      }
    ],
    answer: 0,
    correctFeedback: 'Correct\u00a0: confirmation claire, compl\u00e8te et professionnelle.'
  },

  {
    category: 'Administratif',
    received: {
      from: 'De\u00a0: Assurance Sant\u00e9 Helvia',
      subject: 'Formulaire \u00e0 signer',
      body: 'Bonjour,\n\nMerci de nous retourner le formulaire sign\u00e9 en pi\u00e8ce jointe.\n\nCordialement,\nService clients',
      request: 'Action attendue\u00a0: envoyer le formulaire sign\u00e9 et le mentionner.'
    },
    responses: [
      {
        subject: 'Re\u00a0: Formulaire \u00e0 signer',
        body: 'Bonjour,\n\nVeuillez trouver en pi\u00e8ce jointe le formulaire demand\u00e9.\n\nJe vous remercie de votre confirmation de r\u00e9ception.\n\nCordialement,\nNora Ait Ali',
        attachment: 'Formulaire joint',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: 'La r\u00e9ponse ne pr\u00e9cise pas que le formulaire est bien sign\u00e9.'
      },
      {
        subject: 'Re\u00a0: Formulaire \u00e0 signer',
        body: 'Bonjour,\n\nVeuillez trouver en pi\u00e8ce jointe le formulaire sign\u00e9 demand\u00e9.\n\nJe vous remercie de votre confirmation de r\u00e9ception.\n\nCordialement,\nNora Ait Ali',
        attachment: 'Formulaire sign\u00e9 joint',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: ''
      },
      {
        subject: 'Formulaire sign\u00e9 - Nora Ait Ali',
        body: 'Bonjour,\n\nVeuillez trouver en pi\u00e8ce jointe le formulaire sign\u00e9 demand\u00e9.\n\nMeilleures salutations,\nNora Ait Ali',
        attachment: 'Formulaire sign\u00e9 joint',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: 'Cette r\u00e9ponse fonctionne, mais la meilleure garde l\u2019objet re\u00e7u et demande une confirmation de r\u00e9ception.'
      },
      {
        subject: 'Re\u00a0: Formulaire \u00e0 signer',
        body: 'Bonjour,\n\nJe vous envoie le formulaire.\n\nCordialement,\nNora Ait Ali',
        attachment: 'Document trop vague',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: 'Le message est trop vague et ne dit pas clairement que le formulaire est sign\u00e9.'
      }
    ],
    answer: 1,
    correctFeedback: 'Exact\u00a0: la r\u00e9ponse est claire, polie, et la pi\u00e8ce jointe est correctement annonc\u00e9e.'
  },

  {
    category: 'Logement',
    received: {
      from: 'De\u00a0: G\u00e9rance du Lac',
      subject: 'Merci de transmettre une copie de votre permis',
      body: 'Bonjour Madame,\n\nAfin de compl\u00e9ter votre dossier, merci de nous envoyer une copie de votre permis de s\u00e9jour en pi\u00e8ce jointe.\n\nMeilleures salutations,\nG\u00e9rance du Lac',
      request: 'Action attendue\u00a0: r\u00e9pondre poliment et annoncer la copie du permis jointe.'
    },
    responses: [
      {
        subject: 'Copie du permis',
        body: 'Bonjour,\n\nJe vous transmets mon permis en pi\u00e8ce jointe.\n\nCordialement,\nSamira Azzouz',
        attachment: 'Permis joint',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: 'La r\u00e9ponse est correcte, mais la meilleure garde l\u2019objet re\u00e7u et ajoute une formule finale plus compl\u00e8te.'
      },
      {
        subject: 'Re\u00a0: Merci de transmettre une copie de votre permis',
        body: 'Bonjour,\n\nJe vous envoie mon permis.\n\nSamira',
        attachment: 'Permis joint',
        signature: 'Pr\u00e9nom uniquement',
        reasonIfWrong: 'La signature est incompl\u00e8te et le message reste trop court.'
      },
      {
        subject: 'Re\u00a0: Merci de transmettre une copie de votre permis',
        body: 'Bonjour,\n\nVeuillez trouver en pi\u00e8ce jointe une copie de mon permis de s\u00e9jour.\n\nJe reste \u00e0 votre disposition pour toute information compl\u00e9mentaire.\n\nMeilleures salutations,\nSamira Azzouz',
        attachment: 'Copie du permis jointe',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: ''
      },
      {
        subject: 'Re\u00a0: Merci de transmettre une copie de votre permis',
        body: 'Bonjour,\n\nJe vous transmets mon document demand\u00e9.\n\nMeilleures salutations,\nSamira Azzouz',
        attachment: 'Document trop vague',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: 'Le message ne pr\u00e9cise pas clairement qu\u2019il s\u2019agit du permis de s\u00e9jour.'
      }
    ],
    answer: 2,
    correctFeedback: 'Bonne r\u00e9ponse\u00a0: la copie du permis est clairement annonc\u00e9e et le ton reste professionnel.'
  },

  {
    category: 'Rendez-vous',
    received: {
      from: 'De\u00a0: Commune de Prilly',
      subject: 'Confirmation de rendez-vous',
      body: 'Bonjour,\n\nNous vous proposons un rendez-vous mercredi 8h30 au guichet population. Merci de confirmer votre pr\u00e9sence.\n\nCordialement,\nCommune de Prilly',
      request: 'Action attendue\u00a0: confirmer clairement sa pr\u00e9sence avec le jour et l\u2019heure.'
    },
    responses: [
      {
        subject: 'Confirmation rendez-vous mercredi',
        body: 'Bonjour,\n\nJe confirme ma pr\u00e9sence mercredi \u00e0 8h30.\n\nCordialement,\nMourad Benali',
        attachment: 'Aucune pi\u00e8ce jointe n\u00e9cessaire',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: 'La r\u00e9ponse est correcte, mais la meilleure reprend plus pr\u00e9cis\u00e9ment le contexte du rendez-vous.'
      },
      {
        subject: 'Re\u00a0: Confirmation de rendez-vous',
        body: 'Bonjour,\n\nJe confirme ma pr\u00e9sence mercredi.\n\nMeilleures salutations,\nMourad Benali',
        attachment: 'Aucune pi\u00e8ce jointe n\u00e9cessaire',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: 'La r\u00e9ponse oublie l\u2019heure de 8h30.'
      },
      {
        subject: 'Re\u00a0: Confirmation de rendez-vous',
        body: 'Bonjour,\n\nJe serai l\u00e0.\n\nMourad Benali',
        attachment: 'Aucune pi\u00e8ce jointe n\u00e9cessaire',
        signature: 'Signature simple',
        reasonIfWrong: 'Le message est trop court et ne reprend ni le jour ni l\u2019heure.'
      },
      {
        subject: 'Re\u00a0: Confirmation de rendez-vous',
        body: 'Bonjour,\n\nJe vous confirme ma pr\u00e9sence au rendez-vous du mercredi \u00e0 8h30 au guichet population.\n\nMeilleures salutations,\nMourad Benali',
        attachment: 'Aucune pi\u00e8ce jointe n\u00e9cessaire',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: ''
      }
    ],
    answer: 3,
    correctFeedback: 'Correct\u00a0: la confirmation est compl\u00e8te, claire et reprend bien le rendez-vous propos\u00e9.'
  },

  {
    category: 'Emploi',
    received: {
      from: 'De\u00a0: Agence FlexiJob',
      subject: 'Merci d\u2019indiquer vos disponibilit\u00e9s',
      body: 'Bonjour,\n\nPour la suite de votre dossier, merci de nous indiquer vos disponibilit\u00e9s pour travailler cette semaine.\n\nCordialement,\nAgence FlexiJob',
      request: 'Action attendue\u00a0: r\u00e9pondre avec des disponibilit\u00e9s claires.'
    },
    responses: [
      {
        subject: 'Re\u00a0: Merci d\u2019indiquer vos disponibilit\u00e9s',
        body: 'Bonjour,\n\nMerci pour votre message. Je suis disponible cette semaine du lundi au vendredi, le matin et l\u2019apr\u00e8s-midi.\n\nCordialement,\nPaulo Ferreira',
        attachment: 'Aucune pi\u00e8ce jointe n\u00e9cessaire',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: ''
      },
      {
        subject: 'Disponibilit\u00e9s semaine',
        body: 'Bonjour,\n\nJe suis disponible cette semaine du lundi au vendredi.\n\nMeilleures salutations,\nPaulo Ferreira',
        attachment: 'Aucune pi\u00e8ce jointe n\u00e9cessaire',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: 'La r\u00e9ponse est correcte, mais la meilleure pr\u00e9cise aussi les moments de la journ\u00e9e.'
      },
      {
        subject: 'Re\u00a0: Merci d\u2019indiquer vos disponibilit\u00e9s',
        body: 'Bonjour,\n\nJe suis disponible cette semaine.\n\nCordialement,\nPaulo Ferreira',
        attachment: 'Aucune pi\u00e8ce jointe n\u00e9cessaire',
        signature: 'Signature compl\u00e8te',
        reasonIfWrong: 'La r\u00e9ponse reste trop vague et ne donne pas de d\u00e9tails utiles.'
      },
      {
        subject: 'Re\u00a0: Merci d\u2019indiquer vos disponibilit\u00e9s',
        body: 'Bonjour,\n\nJe peux travailler.\n\nPaulo',
        attachment: 'Aucune pi\u00e8ce jointe n\u00e9cessaire',
        signature: 'Pr\u00e9nom uniquement',
        reasonIfWrong: 'Le message est trop vague et la signature est incompl\u00e8te.'
      }
    ],
    answer: 0,
    correctFeedback: 'Bonne pratique\u00a0: la disponibilit\u00e9 est formul\u00e9e clairement et avec un ton professionnel.'
  }
];
