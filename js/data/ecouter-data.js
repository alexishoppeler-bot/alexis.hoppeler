/* ===== JS/DATA/ECOUTER-DATA.JS — Compréhension orale ===== */
/*
  Pour les 'histoire' : champ `transcript` (texte continu, 1 voix).
  Pour les 'dialogue'  : champ `lines` (tableau de répliques).
    Chaque ligne : { speaker: "Nom", gender: "f"|"m", text: "..." }
    Le transcript est généré automatiquement pour l’affichage.
*/
'use strict';

window.ECOUTER_DATA = [

  {
    id: 'ep01',
    type: 'histoire',
    title: 'Le formulaire de Nadia',
    category: 'Remplir un formulaire',
    difficulty: 'easy',
    theme: 'numérique',
    transcript: `Nadia est dans un centre administratif. Elle doit remplir un formulaire d’inscription. Elle prend un stylo et lit les questions calmement. Dans la première partie, elle écrit son nom, son prénom et sa date de naissance. Ensuite, elle complète son adresse avec la rue, le numéro, le code postal et la ville. Après, elle écrit son numéro de téléphone et son adresse e-mail. Avant de finir, elle relit toutes les informations. Elle voit une erreur dans son numéro de téléphone et elle la corrige. À la fin, elle signe le document et le remet à l’accueil.`,
    questions: [
      {
        question: 'Que fait Nadia au début ?',
        choices: ['Elle téléphone', 'Elle lit les questions', 'Elle ferme le document', 'Elle part du bureau'],
        answer: 1,
        explication: 'Nadia commence par lire les questions avant d’écrire.'
      },
      {
        question: 'Qu’écrit Nadia dans la première partie ?',
        choices: ['Son pays et son travail', 'Son nom, son prénom et sa date de naissance', 'Son mot de passe', 'Le nom du médecin'],
        answer: 1,
        explication: 'Dans la première partie, elle écrit son nom, son prénom et sa date de naissance.'
      },
      {
        question: 'Que fait Nadia avant de signer ?',
        choices: ['Elle part', 'Elle appelle quelqu’un', 'Elle relit et corrige une erreur', 'Elle change de salle'],
        answer: 2,
        explication: 'Elle relit le formulaire et corrige une erreur.'
      },
      {
        question: 'Que fait Nadia à la fin ?',
        choices: ['Elle jette le document', 'Elle signe et remet le document à l’accueil', 'Elle envoie un SMS', 'Elle ouvre son e-mail'],
        answer: 1,
        explication: 'À la fin, elle signe puis remet le document à l’accueil.'
      }
    ]
  },

  {
    id: 'ep02',
    type: 'dialogue',
    title: 'Au guichet',
    category: 'Formulaire papier',
    difficulty: 'easy',
    theme: 'numérique',
    lines: [
      { speaker: 'Agent', gender: 'f', text: 'Bonjour madame, vous avez le formulaire ?' },
      { speaker: 'Amina', gender: 'f', text: 'Bonjour. Oui, mais je ne comprends pas une question.' },
      { speaker: 'Agent', gender: 'f', text: 'Laquelle ?' },
      { speaker: 'Amina', gender: 'f', text: 'Ici, on demande état civil. Qu’est-ce que ça veut dire ?' },
      { speaker: 'Agent', gender: 'f', text: 'Cela veut dire par exemple célibataire, mariée ou divorcée.' },
      { speaker: 'Amina', gender: 'f', text: 'D’accord. Moi, je suis mariée.' },
      { speaker: 'Agent', gender: 'f', text: 'Très bien. Vous pouvez cocher la case mariée.' },
      { speaker: 'Amina', gender: 'f', text: 'Merci. Et ici, je dois écrire mon adresse complète ?' },
      { speaker: 'Agent', gender: 'f', text: 'Oui, la rue, le numéro, le code postal et la ville.' },
      { speaker: 'Amina', gender: 'f', text: 'Très bien, merci beaucoup.' }
    ],
    questions: [
      {
        question: 'Pourquoi Amina parle-t-elle avec l’agent ?',
        choices: ['Elle a perdu son téléphone', 'Elle ne comprend pas une question', 'Elle cherche un emploi', 'Elle veut envoyer un colis'],
        answer: 1,
        explication: 'Amina demande de l’aide parce qu’elle ne comprend pas une question du formulaire.'
      },
      {
        question: 'Quel mot Amina ne comprend-elle pas ?',
        choices: ['Adresse', 'Téléphone', 'État civil', 'Signature'],
        answer: 2,
        explication: 'Le mot qu’elle ne comprend pas est “état civil”.'
      },
      {
        question: 'Quelle est la situation d’Amina ?',
        choices: ['Célibataire', 'Mariée', 'Divorcée', 'Veuve'],
        answer: 1,
        explication: 'Amina dit : “Moi, je suis mariée.”'
      },
      {
        question: 'Que doit-elle écrire dans son adresse complète ?',
        choices: ['Seulement la ville', 'La rue, le numéro, le code postal et la ville', 'Seulement le pays', 'Le nom du bâtiment'],
        answer: 1,
        explication: 'L’agent explique qu’il faut écrire la rue, le numéro, le code postal et la ville.'
      }
    ]
  },

  {
    id: 'ep03',
    type: 'histoire',
    title: 'Le formulaire en ligne',
    category: 'Formulaire numérique',
    difficulty: 'easy',
    theme: 'numérique',
    transcript: `Youssef doit remplir un formulaire en ligne pour une inscription. Il ouvre la page sur l’ordinateur et commence à compléter les champs. Il écrit son nom, son prénom, sa date de naissance et son adresse e-mail. Ensuite, il choisit sa nationalité dans une liste. Puis il coche une case pour confirmer que les informations sont correctes. Quand il clique sur envoyer, un message rouge apparaît : champ obligatoire manquant. Youssef regarde de nouveau le formulaire et voit qu’il a oublié son numéro de téléphone. Il l’ajoute, puis il clique encore une fois sur envoyer. Cette fois, le formulaire est accepté.`,
    questions: [
      {
        question: 'Sur quoi Youssef remplit-il le formulaire ?',
        choices: ['Sur papier', 'Sur un téléphone', 'Sur un ordinateur', 'Sur une clé USB'],
        answer: 2,
        explication: 'Le texte dit qu’il ouvre la page sur l’ordinateur.'
      },
      {
        question: 'Que choisit-il dans une liste ?',
        choices: ['Sa ville', 'Sa nationalité', 'Son mot de passe', 'Son métier'],
        answer: 1,
        explication: 'Youssef choisit sa nationalité dans une liste.'
      },
      {
        question: 'Pourquoi le message rouge apparaît-il ?',
        choices: ['Le site est fermé', 'Il a oublié un champ obligatoire', 'Il a écrit son nom deux fois', 'Il n’a pas de ticket'],
        answer: 1,
        explication: 'Le message rouge indique qu’un champ obligatoire manque.'
      },
      {
        question: 'Qu’avait-il oublié ?',
        choices: ['Son prénom', 'Sa signature', 'Son numéro de téléphone', 'Son pays'],
        answer: 2,
        explication: 'Il avait oublié son numéro de téléphone.'
      }
    ]
  },

  {
    id: 'ep04',
    type: 'dialogue',
    title: 'Avec le formateur',
    category: 'Aide / Compréhension',
    difficulty: 'easy',
    theme: 'numérique',
    lines: [
      { speaker: 'Formateur', gender: 'm', text: 'Tu as presque fini ?' },
      { speaker: 'Rosa', gender: 'f', text: 'Pas encore. Je ne sais pas où écrire mon e-mail.' },
      { speaker: 'Formateur', gender: 'm', text: 'Regarde en bas de la page, sous le numéro de téléphone.' },
      { speaker: 'Rosa', gender: 'f', text: 'Ah oui, je vois maintenant.' },
      { speaker: 'Formateur', gender: 'm', text: 'Très bien. Et n’oublie pas la date.' },
      { speaker: 'Rosa', gender: 'f', text: 'Je dois écrire la date d’aujourd’hui ?' },
      { speaker: 'Formateur', gender: 'm', text: 'Oui, la date d’aujourd’hui, puis ta signature à la fin.' },
      { speaker: 'Rosa', gender: 'f', text: 'D’accord. Après, je peux donner le document ?' },
      { speaker: 'Formateur', gender: 'm', text: 'Oui, mais relis avant.' },
      { speaker: 'Rosa', gender: 'f', text: 'Très bien, je vais vérifier.' }
    ],
    questions: [
      {
        question: 'Que cherche Rosa ?',
        choices: ['Le numéro de la salle', 'L’endroit pour écrire son e-mail', 'Son manteau', 'Une photo'],
        answer: 1,
        explication: 'Rosa ne sait pas où écrire son e-mail.'
      },
      {
        question: 'Où se trouve le champ e-mail ?',
        choices: ['En haut de la page', 'Sous le numéro de téléphone', 'À gauche du nom', 'Dans une autre salle'],
        answer: 1,
        explication: 'Le formateur dit : “sous le numéro de téléphone”.'
      },
      {
        question: 'Que doit écrire Rosa après ?',
        choices: ['Le nom du formateur', 'La date d’aujourd’hui', 'Le nom de son voisin', 'Une phrase libre'],
        answer: 1,
        explication: 'Le formateur lui rappelle d’écrire la date d’aujourd’hui.'
      },
      {
        question: 'Que doit-elle faire avant de donner le document ?',
        choices: ['Le plier', 'Le jeter', 'Le relire', 'Le scanner'],
        answer: 2,
        explication: 'Le formateur dit clairement : “Relis avant.”'
      }
    ]
  },

  {
    id: 'ep05',
    type: 'histoire',
    title: 'Une erreur dans le formulaire',
    category: 'Vérification',
    difficulty: 'medium',
    theme: 'numérique',
    transcript: `Samir remplit un formulaire rapidement. Il écrit son nom, son prénom, son adresse et son téléphone. Ensuite, il signe sans relire. Quand l’employée regarde le document, elle remarque un problème : le code postal n’est pas correct. Samir regarde encore une fois son adresse et comprend son erreur. Il barre le mauvais numéro, écrit le bon code postal et vérifie aussi la ville. Après cela, le formulaire est correct. Samir comprend qu’il est important de prendre son temps et de vérifier avant de signer.`,
    questions: [
      {
        question: 'Que fait Samir trop vite ?',
        choices: ['Il téléphone', 'Il signe sans relire', 'Il imprime le document', 'Il envoie un e-mail'],
        answer: 1,
        explication: 'Samir signe trop vite, sans relire le formulaire.'
      },
      {
        question: 'Quel est le problème dans le document ?',
        choices: ['Le prénom manque', 'Le téléphone manque', 'Le code postal est faux', 'La date manque'],
        answer: 2,
        explication: 'L’employée remarque que le code postal n’est pas correct.'
      },
      {
        question: 'Que fait Samir après ?',
        choices: ['Il recommence un autre document', 'Il corrige le code postal et vérifie la ville', 'Il rentre à la maison', 'Il demande un ordinateur'],
        answer: 1,
        explication: 'Samir corrige le code postal puis vérifie aussi la ville.'
      },
      {
        question: 'Que comprend Samir à la fin ?',
        choices: ['Il faut écrire plus vite', 'Il faut toujours signer en premier', 'Il est important de vérifier avant de signer', 'Les formulaires sont inutiles'],
        answer: 2,
        explication: 'L’histoire montre qu’il faut prendre son temps et vérifier avant de signer.'
      }
    ]
  },

  {
    id: 'ep06',
    type: 'dialogue',
    title: 'Envoyer le formulaire',
    category: 'Fin de tâche',
    difficulty: 'easy',
    theme: 'numérique',
    lines: [
      { speaker: 'Nora', gender: 'f', text: 'J’ai fini le formulaire.' },
      { speaker: 'Employé', gender: 'm', text: 'Très bien. Vous avez signé ?' },
      { speaker: 'Nora', gender: 'f', text: 'Oui, j’ai signé ici en bas.' },
      { speaker: 'Employé', gender: 'm', text: 'Parfait. Vous avez aussi mis la date ?' },
      { speaker: 'Nora', gender: 'f', text: 'Oui, la date est juste à côté de ma signature.' },
      { speaker: 'Employé', gender: 'm', text: 'Très bien. Alors vous pouvez me donner le document.' },
      { speaker: 'Nora', gender: 'f', text: 'Tenez.' },
      { speaker: 'Employé', gender: 'm', text: 'Merci. Tout est complet.' },
      { speaker: 'Nora', gender: 'f', text: 'Merci, bonne journée.' },
      { speaker: 'Employé', gender: 'm', text: 'Bonne journée madame.' }
    ],
    questions: [
      {
        question: 'Qu’a fait Nora ?',
        choices: ['Elle a fini le formulaire', 'Elle a perdu le document', 'Elle a imprimé un CV', 'Elle a changé de salle'],
        answer: 0,
        explication: 'Nora dit au début : “J’ai fini le formulaire.”'
      },
      {
        question: 'Où a-t-elle signé ?',
        choices: ['En haut', 'En bas', 'Au milieu', 'Sur une autre page'],
        answer: 1,
        explication: 'Nora dit qu’elle a signé en bas.'
      },
      {
        question: 'Où se trouve la date ?',
        choices: ['À côté de la signature', 'Sur la première ligne', 'Dans la marge', 'Sous le prénom'],
        answer: 0,
        explication: 'Elle dit que la date est juste à côté de sa signature.'
      },
      {
        question: 'Que dit l’employé à la fin ?',
        choices: ['Le formulaire n’est pas correct', 'Il manque une page', 'Tout est complet', 'Il faut revenir demain'],
        answer: 2,
        explication: 'À la fin, l’employé confirme que tout est complet.'
      }
    ]
  },

  {
    id: 'ep07',
    type: 'dialogue',
    title: "À l'ORP",
    category: "Recherche d'emploi",
    difficulty: 'medium',
    theme: 'orp',
    lines: [
      { speaker: 'Conseillère', gender: 'f', text: 'Bonjour Monsieur Diallo. Asseyez-vous, je vous en prie.' },
      { speaker: 'Mamadou', gender: 'm', text: 'Bonjour Madame. Merci.' },
      { speaker: 'Conseillère', gender: 'f', text: 'Avez-vous vos preuves de recherche d’emploi pour ce mois ?' },
      { speaker: 'Mamadou', gender: 'm', text: 'Oui, j’ai contacté cinq entreprises ce mois-ci. Voici les documents.' },
      { speaker: 'Conseillère', gender: 'f', text: 'Très bien. Dans quel secteur cherchez-vous du travail ?' },
      { speaker: 'Mamadou', gender: 'm', text: 'Je cherche un poste dans la logistique ou le nettoyage.' },
      { speaker: 'Conseillère', gender: 'f', text: 'D’accord. J’ai une offre à Renens pour un poste de nettoyage. Êtes-vous disponible ?' },
      { speaker: 'Mamadou', gender: 'm', text: 'Oui, je suis disponible immédiatement.' },
      { speaker: 'Conseillère', gender: 'f', text: 'Parfait. Je vous envoie les détails par e-mail. Vous avez un entretien jeudi à 10h.' },
      { speaker: 'Mamadou', gender: 'm', text: 'Merci beaucoup, je serai présent.' }
    ],
    questions: [
      {
        question: 'Que doit montrer Mamadou à la conseillère ?',
        choices: ['Son passeport uniquement', 'Ses preuves de recherche d’emploi', 'Son billet de train', 'Son formulaire de logement'],
        answer: 1,
        explication: 'La conseillère demande les preuves de recherche d’emploi.'
      },
      {
        question: 'Combien d’entreprises a-t-il contacté ?',
        choices: ['Deux', 'Trois', 'Cinq', 'Dix'],
        answer: 2,
        explication: 'Mamadou dit qu’il a contacté cinq entreprises.'
      },
      {
        question: 'Dans quel secteur cherche-t-il du travail ?',
        choices: ['Cuisine et restauration', 'Logistique ou nettoyage', 'Construction uniquement', 'Informatique'],
        answer: 1,
        explication: 'Il cherche un poste dans la logistique ou le nettoyage.'
      },
      {
        question: 'Quand est l’entretien ?',
        choices: ['Lundi à 9h', 'Mercredi à 14h', 'Jeudi à 10h', 'Vendredi à 8h'],
        answer: 2,
        explication: 'La conseillère lui donne un entretien jeudi à 10h.'
      }
    ]
  },

  {
    id: 'ep09',
    type: 'histoire',
    title: '\u00c0 la pharmacie',
    category: 'Sant\u00e9',
    difficulty: 'easy',
    theme: 'sant\u00e9',
    transcript: `Rania a mal \u00e0 la gorge depuis deux jours. Elle t\u00e9l\u00e9phone au cabinet m\u00e9dical et prend rendez-vous pour le lendemain. Le m\u00e9decin l\u2019examine et lui donne une ordonnance. Rania va ensuite \u00e0 la pharmacie. Elle donne l\u2019ordonnance au pharmacien. Il regarde les m\u00e9dicaments prescrits et va les chercher. Il revient avec deux bo\u00eetes et explique comment les prendre : un comprim\u00e9 le matin et un le soir, pendant sept jours. Il lui dit aussi de bien boire de l\u2019eau. Rania paie \u00e0 la caisse et garde le re\u00e7u. Elle sait qu\u2019elle devra envoyer le re\u00e7u \u00e0 son assurance maladie pour \u00eatre rembours\u00e9e.`,
    questions: [
      {
        question: 'Pourquoi Rania va-t-elle chez le m\u00e9decin ?',
        choices: ['Elle a mal au dos', 'Elle a mal \u00e0 la gorge', 'Elle a un rendez-vous de contr\u00f4le', 'Elle a perdu ses m\u00e9dicaments'],
        answer: 1,
        explication: 'Le texte dit qu\u2019elle a mal \u00e0 la gorge depuis deux jours.'
      },
      {
        question: 'Que donne le m\u00e9decin \u00e0 Rania ?',
        choices: ['Un billet de bus', 'Une ordonnance', 'Un formulaire administratif', 'Un rendez-vous \u00e0 l\u2019h\u00f4pital'],
        answer: 1,
        explication: 'Le m\u00e9decin lui donne une ordonnance pour acheter les m\u00e9dicaments.'
      },
      {
        question: 'Comment doit-elle prendre les m\u00e9dicaments ?',
        choices: ['Trois fois par jour', 'Seulement le soir', 'Un comprim\u00e9 le matin et un le soir pendant sept jours', 'Un comprim\u00e9 par semaine'],
        answer: 2,
        explication: 'Le pharmacien explique : un comprim\u00e9 le matin et un le soir pendant sept jours.'
      },
      {
        question: 'Pourquoi garde-t-elle le re\u00e7u ?',
        choices: ['Pour offrir les m\u00e9dicaments', 'Pour l\u2019envoyer \u00e0 l\u2019ORP', 'Pour l\u2019envoyer \u00e0 son assurance maladie', 'Pour montrer au m\u00e9decin'],
        answer: 2,
        explication: 'Elle garde le re\u00e7u pour l\u2019envoyer \u00e0 son assurance afin d\u2019\u00eatre rembours\u00e9e.'
      }
    ]
  },

  {
    id: 'ep10',
    type: 'dialogue',
    title: 'Probl\u00e8me de chauffage',
    category: 'Logement',
    difficulty: 'medium',
    theme: 'logement',
    lines: [
      { speaker: 'G\u00e9rance', gender: 'f', text: 'G\u00e9rance du Parc, bonjour.' },
      { speaker: 'Omar', gender: 'm', text: 'Bonjour madame. Je m\u2019appelle Omar Ciss\u00e9. J\u2019habite au 3e \u00e9tage, appartement 12.' },
      { speaker: 'G\u00e9rance', gender: 'f', text: 'Bonjour monsieur. Que puis-je faire pour vous ?' },
      { speaker: 'Omar', gender: 'm', text: 'Mon chauffage ne fonctionne plus depuis lundi. Il fait tr\u00e8s froid dans mon appartement.' },
      { speaker: 'G\u00e9rance', gender: 'f', text: 'Je suis d\u00e9sol\u00e9e d\u2019entendre \u00e7a. Avez-vous v\u00e9rifi\u00e9 le thermostat ?' },
      { speaker: 'Omar', gender: 'm', text: 'Oui, j\u2019ai v\u00e9rifi\u00e9. Le probl\u00e8me n\u2019est pas le thermostat.' },
      { speaker: 'G\u00e9rance', gender: 'f', text: 'D\u2019accord. Je vais envoyer un technicien demain matin entre 9h et 11h. Vous serez \u00e0 la maison ?' },
      { speaker: 'Omar', gender: 'm', text: 'Oui, je serai disponible.' },
      { speaker: 'G\u00e9rance', gender: 'f', text: 'Parfait. Merci de nous avoir pr\u00e9venus. Nous allons r\u00e9soudre le probl\u00e8me rapidement.' },
      { speaker: 'Omar', gender: 'm', text: 'Merci beaucoup, bonne journ\u00e9e.' }
    ],
    questions: [
      {
        question: 'Quel est le probl\u00e8me d\u2019Omar ?',
        choices: ['Le r\u00e9frig\u00e9rateur est cass\u00e9', 'Le chauffage ne fonctionne plus', 'Il a perdu ses cl\u00e9s', 'L\u2019eau chaude est coup\u00e9e'],
        answer: 1,
        explication: 'Omar explique que son chauffage ne fonctionne plus depuis lundi.'
      },
      {
        question: 'Depuis quand a-t-il ce probl\u00e8me ?',
        choices: ['Depuis hier', 'Depuis lundi', 'Depuis une semaine', 'Depuis ce matin'],
        answer: 1,
        explication: 'Omar dit : \u00ab depuis lundi \u00bb.'
      },
      {
        question: 'Quand le technicien va-t-il venir ?',
        choices: ['Ce soir', 'Demain entre 9h et 11h', 'Jeudi apr\u00e8s-midi', 'La semaine prochaine'],
        answer: 1,
        explication: 'La g\u00e9rance dit qu\u2019elle envoie un technicien demain matin entre 9h et 11h.'
      },
      {
        question: 'Qu\u2019a-t-il d\u00e9j\u00e0 v\u00e9rifi\u00e9 ?',
        choices: ['Les fen\u00eatres', 'Le thermostat', 'L\u2019\u00e9lectricit\u00e9', 'L\u2019adresse'],
        answer: 1,
        explication: 'Omar confirme qu\u2019il a v\u00e9rifi\u00e9 le thermostat mais que ce n\u2019est pas le probl\u00e8me.'
      }
    ]
  },

  {
    id: 'ep08',
    type: 'histoire',
    title: 'Prendre le bus \u00e0 Lausanne',
    category: 'Transports publics',
    difficulty: 'easy',
    theme: 'transports',
    transcript: `Fatima doit aller \u00e0 Renens pour un entretien d\u2019embauche. Elle habite \u00e0 Pully. Elle regarde l\u2019horaire des bus sur son t\u00e9l\u00e9phone. Le bus num\u00e9ro 9 part \u00e0 8h15 de l\u2019arr\u00eat Pully-Gare. Fatima va \u00e0 l\u2019arr\u00eat et ach\u00e8te un billet \u00e0 la machine. Elle v\u00e9rifie que son billet est valable pour deux zones. Le bus arrive \u00e0 l\u2019heure. Fatima monte et s\u2019assoit. Elle regarde les noms des arr\u00eats sur l\u2019\u00e9cran. \u00c0 la gare de Lausanne, elle change de bus. Elle prend un bus direction Renens-Gare. Elle descend \u00e0 l\u2019arr\u00eat Renens-Gare et arrive cinq minutes avant l\u2019entretien.`,
    questions: [
      {
        question: 'Où habite Fatima ?',
        choices: ['À Lausanne', 'À Pully', 'À Renens', 'À Montreux'],
        answer: 1,
        explication: 'Le texte dit qu’elle habite à Pully.'
      },
      {
        question: 'Pourquoi regarde-t-elle l’horaire ?',
        choices: ['Pour appeler l’ORP', 'Pour acheter un billet', 'Pour connaître l’heure du bus', 'Pour trouver le nom du conseiller'],
        answer: 2,
        explication: 'Elle regarde l’horaire pour savoir quand part le bus.'
      },
      {
        question: 'Où change-t-elle de bus ?',
        choices: ['À Pully-Gare', 'À Renens-Gare', 'À la gare de Lausanne', 'À l’ORP'],
        answer: 2,
        explication: 'Elle change de bus à la gare de Lausanne.'
      },
      {
        question: 'Quand arrive-t-elle à Renens ?',
        choices: ['En retard de dix minutes', 'Cinq minutes avant l’entretien', 'Exactement à l’heure', 'Une heure trop tôt'],
        answer: 1,
        explication: 'Fatima arrive cinq minutes avant l’entretien.'
      }
    ]
  }

];
