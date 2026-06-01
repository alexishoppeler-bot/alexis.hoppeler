// app.js — Orchestrateur principal de l'application

const App = {
  // État de la session en cours
  session: {
    metier: null,
    niveau: 'A2',
    typeRecruteur: 'sympathique',
    questions: [],
    indexQuestion: 0,
    reponses: [],
    dateDebut: null,
    scoreTotal: 0,
    choixCourants: [],
    choixSelectionne: null
  },

  // Initialisation au chargement de la page
  async init() {
    await Data.chargerTout();
    Voice.init();
    this.afficherEcran('ecran-accueil');
    this.chargerSessionSauvegardee();
    this.construireListeMetiers();
    this.bindEvenements();
  },

  // Construit la liste des métiers dans l'écran de config
  construireListeMetiers() {
    const conteneur = document.getElementById('liste-metiers');
    if (!conteneur) return;
    conteneur.innerHTML = '';
    Data.metiers.forEach(metier => {
      const btn = document.createElement('button');
      btn.className = 'btn-metier';
      btn.dataset.id = metier.id;
      btn.innerHTML = `<span class="emoji">${metier.emoji}</span><span>${metier.nom}</span>`;
      btn.addEventListener('click', () => this.selectionnerMetier(metier.id));
      conteneur.appendChild(btn);
    });
  },

  // Lie tous les événements de l'interface
  bindEvenements() {
    // Bouton démarrer
    document.getElementById('btn-demarrer')?.addEventListener('click', () => {
      this.afficherEcran('ecran-config');
    });

    // Niveau de français
    document.querySelectorAll('.btn-niveau').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-niveau').forEach(b => b.classList.remove('actif'));
        btn.classList.add('actif');
        this.session.niveau = btn.dataset.niveau;
        // Adapter la vitesse seulement si le curseur n'a pas été modifié manuellement
        if (!this._vitesseManuelle) Voice.adapterNiveau(this.session.niveau);
      });
    });

    // Type de recruteur
    document.querySelectorAll('.btn-recruteur').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-recruteur').forEach(b => b.classList.remove('actif'));
        btn.classList.add('actif');
        this.session.typeRecruteur = btn.dataset.recruteur;
      });
    });

    // Bouton lancer l'entretien
    document.getElementById('btn-lancer')?.addEventListener('click', () => {
      this.lancerEntretien();
    });

    // Bouton soumettre réponse
    document.getElementById('btn-soumettre')?.addEventListener('click', () => {
      this.soumettreReponse();
    });

    // Bouton question suivante
    document.getElementById('btn-suivant')?.addEventListener('click', () => {
      this.questionSuivante();
    });

    // Bouton relire la question
    document.getElementById('btn-relire')?.addEventListener('click', () => {
      const texte = document.getElementById('texte-question')?.textContent;
      if (texte) Voice.lire(texte);
    });

    // Bouton activer/désactiver voix
    document.getElementById('btn-voix')?.addEventListener('click', () => {
      const actif = Voice.basculer();
      const btn = document.getElementById('btn-voix');
      btn.textContent = actif ? '🔊 Voix' : '🔇 Muet';
      btn.classList.toggle('voix-off', !actif);
    });

    // Curseur de vitesse dans la page de config
    document.getElementById('curseur-vitesse')?.addEventListener('input', (e) => {
      Voice.vitesse = parseFloat(e.target.value);
      Voice._afficherVitesse();
      this._vitesseManuelle = true;  // L'utilisateur a choisi manuellement
    });

    // Bouton terminer l'entretien
    document.getElementById('btn-terminer')?.addEventListener('click', () => {
      this.terminerEntretien();
    });

    // Bouton rapport
    document.getElementById('btn-imprimer')?.addEventListener('click', () => {
      window.print();
    });

    // Bouton recommencer
    document.getElementById('btn-recommencer')?.addEventListener('click', () => {
      this.recommencer();
    });

    // Bouton retour à l'accueil depuis config
    document.getElementById('btn-retour-accueil')?.addEventListener('click', () => {
      this.afficherEcran('ecran-accueil');
    });

    document.getElementById('choix-reponses')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.choix-reponse');
      if (btn) this.selectionnerChoix(btn.dataset.index);
    });
  },

  // Sélectionne un métier
  selectionnerMetier(id) {
    document.querySelectorAll('.btn-metier').forEach(b => b.classList.remove('actif'));
    const btn = document.querySelector(`.btn-metier[data-id="${id}"]`);
    if (btn) btn.classList.add('actif');
    this.session.metier = Data.metiers.find(m => m.id === id);

    // Activer le bouton lancer
    const btnLancer = document.getElementById('btn-lancer');
    if (btnLancer) {
      btnLancer.disabled = false;
      btnLancer.classList.add('pret');
    }
  },

  // Lance l'entretien avec une progression logique
  lancerEntretien() {
    if (!this.session.metier) {
      alert('Veuillez choisir un métier.');
      return;
    }

    const toutesQuestions = Data.getQuestions(this.session.metier, this.session.niveau) || [];

    // Ancienne logique : questions 100% mélangées.
    // Nouvelle logique : on garde de la variété, mais dans un ordre réaliste d'entretien.
    this.session.questions = this.ordonnerQuestions(toutesQuestions, 10);

    this.session.indexQuestion = 0;
    this.session.reponses = [];
    this.session.scoreTotal = 0;
    this.session.dateDebut = new Date().toISOString();
    this.session.choixCourants = [];
    this.session.choixSelectionne = null;

    Storage.sauvegarder(this.session);

    this.afficherEcran('ecran-entretien');

    const nomEl = document.getElementById('entretien-metier-nom');
    if (nomEl) nomEl.textContent = this.session.metier.emoji + ' ' + this.session.metier.nom;

    const recruteur = Data.recruteurs?.[this.session.typeRecruteur];
    if (recruteur) {
      this.afficherMessageRecruteur(recruteur.introduction);
    }

    setTimeout(() => {
      this.afficherQuestion();
    }, 1800);
  },

  // Organise les questions pour ressembler à un vrai entretien
  ordonnerQuestions(questions, limite = 10) {
    const groupes = {
      debut: [],
      motivation: [],
      experience: [],
      competences: [],
      situations: [],
      fin: [],
      autres: []
    };

    questions.forEach(q => {
      const type = q.type || this.infererTypeQuestion(q.question);
      q.type = type; // On fixe le type pour éviter de le recalculer partout.

      if (['presentation', 'parcours'].includes(type)) {
        groupes.debut.push(q);
      } else if (['motivation', 'valeurs_travail', 'projet'].includes(type)) {
        groupes.motivation.push(q);
      } else if (['experience', 'formation', 'langue', 'transport', 'permis', 'certification'].includes(type)) {
        groupes.experience.push(q);
      } else if (['qualites', 'defauts', 'organisation', 'outil', 'ponctualite', 'equipe', 'communication', 'horaires', 'charges'].includes(type)) {
        groupes.competences.push(q);
      } else if ([
        'client_accueil', 'client_difficile', 'conseil_client', 'rupture_stock', 'objectifs',
        'conflit', 'stress', 'urgence', 'securite', 'hygiene', 'probleme_technique',
        'signalement', 'objet_trouve', 'date_perimee', 'adresse', 'produit_abime',
        'client_absent', 'chargement', 'commande', 'erreur_commande', 'inventaire',
        'controle_reception', 'mobilite_personne', 'medicaments', 'discretion',
        'empathie', 'adaptation', 'communication_famille', 'telephone', 'calme',
        'surveillance', 'rapport', 'controle_acces', 'plan', 'hierarchie',
        'conditions', 'rangement', 'doute', 'hauteur', 'controle_qualite'
      ].includes(type)) {
        groupes.situations.push(q);
      } else if (['questions', 'salaire', 'disponibilite'].includes(type)) {
        groupes.fin.push(q);
      } else {
        groupes.autres.push(q);
      }
    });

    const prendre = (liste, n) => Data.melanger(liste).slice(0, n);

    let resultat = [
      ...prendre(groupes.debut, 1),
      ...prendre(groupes.motivation, 2),
      ...prendre(groupes.experience, 2),
      ...prendre(groupes.competences, 2),
      ...prendre(groupes.situations, 2),
      ...prendre(groupes.fin, 1)
    ];

    // Sécurité : si un groupe manque de questions, on complète sans doublons.
    if (resultat.length < limite) {
      const dejaPris = new Set(resultat);
      const reste = Data.melanger([
        ...groupes.debut,
        ...groupes.motivation,
        ...groupes.experience,
        ...groupes.competences,
        ...groupes.situations,
        ...groupes.fin,
        ...groupes.autres
      ]).filter(q => !dejaPris.has(q));

      resultat = [...resultat, ...reste.slice(0, limite - resultat.length)];
    }

    return resultat.slice(0, limite);
  },

  // Affiche la question courante
  afficherQuestion() {
    const q = this.session.questions[this.session.indexQuestion];
    if (!q) return;

    const nbTotal = this.session.questions.length;
    const nbActuel = this.session.indexQuestion + 1;

    // Mise à jour de l'interface
    document.getElementById('numero-question').textContent = `Question ${nbActuel} / ${nbTotal}`;
    document.getElementById('texte-question').textContent = q.question;
    this.session.choixCourants = this.genererChoix(q);
    this.session.choixSelectionne = null;
    this.afficherChoixReponses();

    // Masquer le feedback de la question précédente
    document.getElementById('zone-feedback')?.classList.add('cache');
    document.getElementById('btn-suivant')?.classList.add('cache');
    document.getElementById('btn-terminer')?.classList.add('cache');
    document.getElementById('btn-soumettre')?.classList.remove('cache');
    document.getElementById('btn-soumettre').disabled = true;

    // Progression
    const pct = Math.round((this.session.indexQuestion / nbTotal) * 100);
    document.getElementById('barre-progression')?.style.setProperty('width', pct + '%');

    // Lecture vocale
    Voice.lire(q.question);

    // Sauvegarder l'état
    this.sauvegarderAuto();
  },

  // Génère trois propositions : mauvaise, acceptable, bien
  genererChoix(question) {
    const metierNom = this.session.metier?.nom?.toLowerCase() || 'ce poste';
    const motsMetier = this.session.metier?.mots_cles || [];
    const motCle = motsMetier[0] || 'travail';
    const motCle2 = motsMetier[1] || 'équipe';
    const type = question.type || this.infererTypeQuestion(question.question);

    const choixParType = {
      presentation: {
        mauvaise: 'Je ne sais pas trop quoi dire. Tout est déjà dans mon CV.',
        acceptable: 'Je suis motivé et j\'ai envie de trouver un emploi stable. Je peux apprendre rapidement.',
        bien: `Bonjour, je suis une personne sérieuse et ponctuelle. J'ai de l'expérience dans le ${metierNom}, et j'aime travailler avec méthode. Par exemple, j'ai déjà dû m'organiser pour respecter des consignes et aider une équipe.`
      },
      motivation: {
        mauvaise: 'Je cherche surtout un travail, peu importe lequel.',
        acceptable: `Ce poste m'intéresse parce que je veux travailler dans le ${metierNom} et progresser.`,
        bien: `Ce poste m'intéresse parce qu'il correspond à mes compétences et à mon envie de travailler dans le ${metierNom}. Je veux apporter mon sérieux, apprendre vos méthodes et m'intégrer durablement dans l'équipe.`
      },
      valeurs_travail: {
        mauvaise: 'Le plus important, c\'est que le travail soit simple et qu\'on ne me demande pas trop de choses.',
        acceptable: 'Pour moi, c\'est important de faire un travail correct et d\'être ponctuel.',
        bien: `Pour moi, le plus important est de respecter les consignes, d'être fiable et de faire un travail propre. Dans le ${metierNom}, la régularité compte beaucoup.`
      },
      qualites: {
        mauvaise: 'Je suis normal, je fais ce qu\'on me dit.',
        acceptable: 'Je suis ponctuel, sérieux et j\'essaie de bien faire mon travail.',
        bien: `Mes qualités principales sont la ponctualité, le sérieux et l'écoute. Par exemple, quand je reçois une consigne, je vérifie que j'ai bien compris et je termine le travail proprement.`
      },
      defauts: {
        mauvaise: 'Je n\'ai pas de défauts.',
        acceptable: 'Je peux parfois manquer de confiance, mais j\'essaie de m\'améliorer.',
        bien: 'Je peux parfois vouloir aller trop vite quand je suis motivé. Pour progresser, je prends le temps de vérifier mon travail et de demander confirmation si nécessaire.'
      },
      experience: {
        mauvaise: 'Pas vraiment, mais je peux essayer.',
        acceptable: `J'ai déjà fait des tâches proches du ${metierNom}, et je suis prêt à apprendre.`,
        bien: `J'ai déjà réalisé des tâches utiles pour ce poste, notamment avec ${motCle} et ${motCle2}. Cette expérience m'a appris à respecter les consignes, à être régulier et à travailler correctement avec les autres.`
      },
      disponibilite: {
        mauvaise: 'Ça dépend, je ne sais pas encore.',
        acceptable: 'Oui, je peux m\'organiser pour être disponible.',
        bien: 'Oui, je suis disponible et je peux m\'organiser selon vos horaires. Si les horaires changent, je préfère être prévenu à l\'avance pour rester fiable et ponctuel.'
      },
      equipe: {
        mauvaise: 'Je préfère travailler seul, les collègues compliquent les choses.',
        acceptable: 'Oui, je peux travailler avec une équipe et respecter les consignes.',
        bien: 'Oui, j\'aime travailler en équipe. Pour moi, c\'est important de communiquer clairement, d\'aider les collègues quand c\'est possible et de prévenir rapidement en cas de problème.'
      },
      ponctualite: {
        mauvaise: 'Je fais de mon mieux, mais parfois je suis en retard.',
        acceptable: 'Oui, je suis ponctuel et je fais attention aux horaires.',
        bien: 'Oui, la ponctualité est très importante pour moi. Je prépare mon trajet à l\'avance et j\'arrive quelques minutes plus tôt pour commencer le travail sereinement.'
      },
      communication: {
        mauvaise: 'Je fais quand même, même si je n\'ai pas compris.',
        acceptable: 'Je demande à la personne de répéter pour éviter une erreur.',
        bien: 'Si je ne comprends pas une instruction, je demande calmement de répéter ou de montrer un exemple. Je préfère vérifier avant d\'agir pour éviter une erreur.'
      },
      reponse_inconnue: {
        mauvaise: 'J\'invente une réponse pour ne pas montrer que je ne sais pas.',
        acceptable: 'Je dis que je ne sais pas et je demande à un collègue.',
        bien: 'Je reste honnête : je dis que je vais vérifier, je demande la bonne information et je reviens vers le client rapidement.'
      },
      projet: {
        mauvaise: 'Je ne sais pas. Je verrai bien où je serai dans quelques années.',
        acceptable: 'J\'aimerais garder un emploi stable et continuer à apprendre.',
        bien: `Dans 5 ans, j'aimerais être plus autonome dans le ${metierNom}, bien connaître les méthodes de l'entreprise et pouvoir aider les nouveaux collègues.`
      },
      parcours: {
        mauvaise: 'Je suis parti parce que ça ne me plaisait plus et que je voulais changer.',
        acceptable: 'J\'ai quitté mon dernier emploi pour chercher une nouvelle opportunité.',
        bien: 'J\'ai quitté mon dernier emploi correctement. Aujourd\'hui, je cherche un poste où je peux utiliser mon expérience, apprendre et m\'engager sérieusement.'
      },
      questions: {
        mauvaise: 'Non, je n\'ai aucune question.',
        acceptable: 'Oui, je voudrais connaître les horaires et les tâches principales.',
        bien: 'Oui. Pouvez-vous me préciser les horaires, les priorités du poste et la manière dont l\'équipe est organisée ?'
      },
      stress: {
        mauvaise: 'Quand je suis stressé, je préfère qu\'on me laisse tranquille.',
        acceptable: 'J\'essaie de rester calme et de faire les tâches une par une.',
        bien: 'Je reste calme, je priorise les urgences et je communique si j\'ai besoin d\'aide. Cela évite les erreurs.'
      },
      conflit: {
        mauvaise: 'S\'il y a un conflit, je réponds directement parce qu\'il ne faut pas se laisser faire.',
        acceptable: 'J\'essaie de parler calmement avec la personne.',
        bien: 'Je garde un ton respectueux, j\'écoute l\'autre personne et je cherche une solution. Si nécessaire, j\'en parle au responsable.'
      },
      langue: {
        mauvaise: 'Mon français est comme il est. Les gens doivent comprendre.',
        acceptable: 'Je comprends les consignes simples et je progresse en français.',
        bien: 'Je comprends les consignes de travail courantes. Si un mot est difficile, je demande de répéter pour éviter une erreur.'
      },
      transport: {
        mauvaise: 'Je ne sais pas encore comment je viendrai, mais je trouverai peut-être.',
        acceptable: 'Oui, j\'ai un moyen de transport pour venir travailler.',
        bien: 'Oui, mon trajet est organisé. J\'ai prévu le temps nécessaire pour arriver ponctuellement, même en cas de petit retard de transport.'
      },
      salaire: {
        mauvaise: 'Je veux le salaire le plus haut possible.',
        acceptable: 'Je souhaite un salaire correct selon le poste et les horaires.',
        bien: 'Je souhaite un salaire conforme au poste, à mon expérience et à la convention. Je suis ouvert à en discuter.'
      },
      formation: {
        mauvaise: 'J\'ai fait des formations, mais je ne me souviens plus vraiment lesquelles.',
        acceptable: 'J\'ai quelques formations et je peux aussi apprendre sur le poste.',
        bien: 'J\'ai les formations indiquées sur mon CV. Je suis aussi prêt à suivre une formation interne pour respecter vos méthodes.'
      },
      outil: {
        mauvaise: `Je peux utiliser l'outil si quelqu'un me montre vite, même sans connaître les règles de sécurité.`,
        acceptable: `J'ai déjà utilisé certains outils proches de ce poste et je peux apprendre.`,
        bien: `Oui, je l'utilise avec prudence. Je respecte les consignes, je demande une démonstration si besoin et je vérifie la sécurité avant de commencer.`
      },
      certification: {
        mauvaise: 'Je ne sais pas si mon document est encore valable, mais ça devrait aller.',
        acceptable: 'J\'ai certains documents, et je peux vous les montrer si nécessaire.',
        bien: 'Oui, je peux présenter mes certificats ou ma carte si le poste l\'exige. Si une formation manque, je suis prêt à la suivre.'
      },
      organisation: {
        mauvaise: 'Je commence par ce que je vois en premier et je change si on me dit autre chose.',
        acceptable: 'Je regarde les priorités et j\'avance tâche par tâche.',
        bien: `Je commence par les priorités, je prépare le matériel, puis je travaille zone par zone. Je vérifie à la fin que tout est terminé.`
      },
      horaires: {
        mauvaise: 'Je peux peut-être, mais je préfère éviter les horaires compliqués.',
        acceptable: 'Oui, je peux m\'organiser pour ces horaires.',
        bien: 'Oui, je peux travailler sur ces horaires. Je préfère connaître le planning à l\'avance pour être ponctuel et fiable.'
      },
      objet_trouve: {
        mauvaise: 'Je le garde de côté et je vois plus tard si quelqu\'un le réclame.',
        acceptable: 'Je le donne à mon responsable.',
        bien: 'Je ne garde rien. Je signale l\'objet immédiatement et je le remets au responsable selon la procédure.'
      },
      probleme_technique: {
        mauvaise: 'J\'insiste jusqu\'à ce que ça parte, même avec beaucoup de produit.',
        acceptable: 'J\'essaie une méthode adaptée et je demande conseil si besoin.',
        bien: `Je vérifie la surface, j'utilise le bon produit ou la bonne méthode, puis je préviens le responsable si le problème reste difficile.`
      },
      controle_qualite: {
        mauvaise: 'Si personne ne se plaint, c\'est que le travail est bon.',
        acceptable: 'Je vérifie rapidement mon travail à la fin.',
        bien: 'Je contrôle les points importants, je compare avec les consignes et je corrige tout de suite si quelque chose manque.'
      },
      permis: {
        mauvaise: 'J\'ai conduit plusieurs fois, donc ce n\'est pas vraiment un problème.',
        acceptable: 'Oui, j\'ai le permis et je peux conduire pour le travail.',
        bien: 'Oui, j\'ai le permis valide. Je conduis prudemment, je respecte les règles et je peux présenter les documents nécessaires.'
      },
      charges: {
        mauvaise: 'Je porte les charges comme je peux, même si c\'est lourd.',
        acceptable: 'Oui, je peux porter des charges raisonnables.',
        bien: 'Oui, en respectant les bons gestes. Si la charge est trop lourde, j\'utilise le matériel adapté ou je demande de l\'aide.'
      },
      feedback: {
        mauvaise: 'Je me défends, parce que je n\'aime pas qu\'on critique mon travail.',
        acceptable: 'J\'écoute la remarque et j\'essaie de corriger.',
        bien: 'J\'écoute calmement, je demande ce qu\'il faut améliorer et je corrige mon travail. Une remarque peut aider à progresser.'
      },
      hygiene: {
        mauvaise: 'Je fais attention en général, mais quand il y a beaucoup de travail on ne peut pas tout vérifier.',
        acceptable: 'Je respecte les règles de propreté et je me lave les mains.',
        bien: 'Je respecte les règles d\'hygiène, le lavage des mains, les températures, la séparation des aliments et le nettoyage du poste.'
      },
      securite: {
        mauvaise: 'Je fais attention, mais je continue à travailler même si quelque chose semble dangereux.',
        acceptable: 'Je respecte les règles de sécurité et je fais attention.',
        bien: 'Je respecte les consignes, je porte les protections nécessaires et je signale immédiatement une situation dangereuse.'
      },
      client_accueil: {
        mauvaise: 'J\'attends que le client me demande quelque chose.',
        acceptable: 'Je dis bonjour et je reste disponible.',
        bien: 'Je salue le client, je souris, je propose mon aide sans insister et je reste attentif à son besoin.'
      },
      client_difficile: {
        mauvaise: 'Je lui réponds sur le même ton pour qu\'il comprenne.',
        acceptable: 'Je reste calme et je cherche une solution simple.',
        bien: 'Je reste calme, j\'écoute le problème, je parle avec respect et je propose une solution ou j\'alerte le responsable.'
      },
      conseil_client: {
        mauvaise: 'Je conseille le produit le plus cher, comme ça le magasin vend plus.',
        acceptable: 'Je pose quelques questions et je propose un produit.',
        bien: 'Je demande l\'usage, le budget et les préférences du client. Ensuite je compare simplement les produits adaptés.'
      },
      rupture_stock: {
        mauvaise: 'Je dis seulement qu\'il n\'y en a plus.',
        acceptable: 'Je propose de regarder s\'il reste du stock.',
        bien: 'Je vérifie le stock, je propose une alternative ou une date de retour, et je reste poli avec le client.'
      },
      objectifs: {
        mauvaise: 'Je pousse les clients à acheter plus, même s\'ils hésitent.',
        acceptable: 'J\'essaie de bien conseiller les clients pour vendre.',
        bien: 'Je cherche à comprendre le besoin du client. Un bon conseil donne confiance et aide aussi à atteindre les objectifs.'
      },
      date_perimee: {
        mauvaise: 'Je le laisse si la date n\'est dépassée que de peu.',
        acceptable: 'Je retire le produit du rayon.',
        bien: 'Je retire le produit immédiatement, je préviens le responsable et je respecte la procédure du magasin.'
      },
      adresse: {
        mauvaise: 'Je tourne jusqu\'à trouver, même si je perds beaucoup de temps.',
        acceptable: 'J\'utilise le GPS ou j\'appelle le client.',
        bien: 'Je vérifie l\'adresse, j\'utilise le GPS, puis j\'appelle le client ou le responsable si nécessaire.'
      },
      produit_abime: {
        mauvaise: 'Je continue la livraison ou le rangement, sauf si le client remarque le problème.',
        acceptable: 'Je signale le produit abîmé.',
        bien: 'Je mets le produit de côté, je le signale et je suis la procédure pour éviter une erreur ou une réclamation.'
      },
      client_absent: {
        mauvaise: 'Je laisse le colis devant la porte pour gagner du temps.',
        acceptable: 'Je suis la procédure prévue.',
        bien: 'Je respecte la procédure : avis de passage, point relais ou nouvelle livraison selon les consignes de l\'entreprise.'
      },
      chargement: {
        mauvaise: 'Je charge vite, puis je range mieux si ça bouge pendant la route.',
        acceptable: 'Je fais attention au poids et au rangement.',
        bien: 'Je répartis le poids, je bloque les colis fragiles et je vérifie que rien ne peut tomber pendant le transport.'
      },
      urgence: {
        mauvaise: 'J\'essaie de régler seul pour ne pas perdre de temps.',
        acceptable: 'Je préviens mon responsable.',
        bien: 'Je sécurise la situation, je préviens le responsable et je suis la procédure prévue pour l\'accident ou la panne.'
      },
      commande: {
        mauvaise: 'Je prépare vite et je corrige si le client se plaint.',
        acceptable: 'Je vérifie les références avant d\'envoyer.',
        bien: 'Je lis la commande, je scanne ou vérifie chaque article, puis je contrôle avant l\'expédition.'
      },
      erreur_commande: {
        mauvaise: 'Je corrige discrètement si je peux, pour éviter qu\'on pense que j\'ai fait une erreur.',
        acceptable: 'Je signale l\'erreur et je la corrige.',
        bien: 'Je bloque la commande, je préviens le responsable, je corrige l\'erreur et je vérifie la cause pour éviter qu\'elle se répète.'
      },
      inventaire: {
        mauvaise: 'Je compte rapidement, l\'important est de finir dans les temps.',
        acceptable: 'Je compte les produits et je note les différences.',
        bien: 'Je compte avec méthode, je vérifie les références et je signale les écarts de stock clairement.'
      },
      controle_reception: {
        mauvaise: 'Je signe la livraison et je vérifie après si j\'ai le temps.',
        acceptable: 'Je compare la livraison avec le bon.',
        bien: 'Je contrôle les quantités, l\'état des produits et les références avant de valider la réception.'
      },
      volume_repas: {
        mauvaise: 'Je peux préparer beaucoup de repas si on me laisse faire à ma façon.',
        acceptable: 'J\'ai déjà aidé à préparer plusieurs repas en même temps.',
        bien: 'Oui, j\'ai appris à suivre une organisation, respecter les quantités, l\'hygiène et le rythme demandé.'
      },
      preference_cuisine: {
        mauvaise: 'J\'aime cuisiner ce que je connais, mais je n\'aime pas trop suivre les recettes des autres.',
        acceptable: 'J\'aime préparer des plats simples et apprendre de nouvelles recettes.',
        bien: 'J\'aime préparer des plats simples et bien organisés. En cuisine professionnelle, je sais qu\'il faut surtout respecter la recette et les consignes du chef.'
      },
      mobilite_personne: {
        mauvaise: 'Je la tiens comme je peux pour aller plus vite.',
        acceptable: 'Je l\'aide doucement et je fais attention.',
        bien: 'Je sécurise le déplacement, je demande comment la personne préfère être aidée et j\'utilise le matériel prévu si nécessaire.'
      },
      domaines_batiment: {
        mauvaise: 'J\'ai touché un peu à tout, donc je peux sûrement faire n\'importe quel métier du bâtiment.',
        acceptable: 'J\'ai déjà fait quelques travaux et je peux apprendre.',
        bien: 'Je précise les tâches que je sais faire, par exemple préparation, peinture ou aide en maçonnerie, et je respecte toujours les consignes du chef.'
      },
      medicaments: {
        mauvaise: 'J\'insiste jusqu\'à ce que la personne accepte.',
        acceptable: 'Je préviens la famille ou mon responsable.',
        bien: 'Je ne force pas. Je rassure la personne, je note la situation et je préviens la personne responsable selon la procédure.'
      },
      discretion: {
        mauvaise: 'Je peux parler de la situation si cela aide à expliquer mon travail.',
        acceptable: 'Je respecte la vie privée et je reste discret.',
        bien: 'Je respecte le domicile, les affaires personnelles et les informations privées. Je ne parle qu\'aux personnes autorisées.'
      },
      empathie: {
        mauvaise: 'Je lui dis de ne pas pleurer et je continue mon travail.',
        acceptable: 'Je l\'écoute et j\'essaie de la rassurer.',
        bien: 'Je reste calme, j\'écoute avec respect, je rassure la personne et je préviens si la situation semble inquiétante.'
      },
      adaptation: {
        mauvaise: 'Je prépare un repas simple, même si la personne a un régime particulier.',
        acceptable: 'Je regarde ce que la personne peut manger.',
        bien: 'Je respecte le régime, les goûts, les allergies et les consignes médicales. En cas de doute, je demande confirmation.'
      },
      signalement: {
        mauvaise: 'Je préfère ne rien dire pour ne pas créer de problème.',
        acceptable: 'Je préviens mon responsable.',
        bien: 'Je protège les personnes, je ne prends pas de risque inutile et je signale immédiatement selon la procédure.'
      },
      communication_famille: {
        mauvaise: 'Je raconte tout à la famille, même les détails personnels, pour qu\'elle soit au courant.',
        acceptable: 'Je communique avec la famille quand c\'est nécessaire.',
        bien: 'Je transmets les informations utiles avec respect, sans révéler ce qui est privé, et je respecte les consignes du service.'
      },
      telephone: {
        mauvaise: 'Je raccroche si la personne parle mal.',
        acceptable: 'Je reste poli et j\'essaie de répondre.',
        bien: 'Je parle calmement, j\'écoute la demande, je reformule et je transmets au bon service si nécessaire.'
      },
      calme: {
        mauvaise: 'Je garde mon calme seulement si la personne reste correcte avec moi.',
        acceptable: 'Je respire, je parle calmement et j\'évite de répondre trop vite.',
        bien: 'Je garde une distance professionnelle, je parle posément et je demande de l\'aide si la situation devient risquée.'
      },
      presentation_pro: {
        mauvaise: 'Je m\'habille comme je veux tant que je fais le travail.',
        acceptable: 'Je porte une tenue propre et correcte.',
        bien: 'Je porte une tenue propre, adaptée au poste et à l\'image de l\'entreprise.'
      },
      surveillance: {
        mauvaise: 'Je fais la ronde rapidement pour terminer plus vite.',
        acceptable: 'Je vérifie les points importants pendant la ronde.',
        bien: 'Je suis un parcours défini, j\'observe les anomalies, je note les informations importantes et je signale tout incident.'
      },
      rapport: {
        mauvaise: 'J\'écris seulement quelques mots, le responsable comprendra.',
        acceptable: 'Je note les faits importants.',
        bien: 'J\'écris un rapport clair avec la date, l\'heure, le lieu, les faits observés et les personnes concernées.'
      },
      controle_acces: {
        mauvaise: 'Je laisse entrer les personnes qui ont l\'air de travailler ici.',
        acceptable: 'Je vérifie les badges ou les autorisations.',
        bien: 'Je contrôle l\'identité, les badges et les consignes d\'accès, tout en restant poli et ferme.'
      },
      plan: {
        mauvaise: 'Je préfère regarder les autres faire plutôt que lire le plan.',
        acceptable: 'Je peux suivre des consignes simples sur un plan.',
        bien: 'Je lis les indications principales, je vérifie les mesures et je demande confirmation si un point n\'est pas clair.'
      },
      hierarchie: {
        mauvaise: 'Je fais à ma façon si je pense que c\'est mieux.',
        acceptable: 'J\'écoute le chef et je respecte les consignes.',
        bien: 'Je respecte les consignes du chef, je pose des questions en cas de doute et je signale les problèmes rapidement.'
      },
      conditions: {
        mauvaise: 'Je peux travailler dehors, mais seulement quand les conditions sont bonnes.',
        acceptable: 'Oui, je peux travailler dehors avec l\'équipement adapté.',
        bien: 'Oui, si les règles de sécurité sont respectées. Je m\'équipe correctement et je préviens si les conditions deviennent dangereuses.'
      },
      rangement: {
        mauvaise: 'Je range à la fin si j\'ai encore le temps.',
        acceptable: 'Je garde mon espace de travail propre.',
        bien: 'Je trie les déchets, je range les outils et je garde la zone propre pour travailler en sécurité.'
      },
      doute: {
        mauvaise: 'J\'essaie quand même pour montrer que je suis autonome.',
        acceptable: 'Je demande au responsable avant de continuer.',
        bien: 'Je m\'arrête, je demande une consigne claire et je reprends seulement quand je suis sûr de la méthode.'
      },
      hauteur: {
        mauvaise: 'Je peux monter si quelqu\'un me tient l\'échelle.',
        acceptable: 'Je peux travailler en hauteur avec le bon matériel.',
        bien: 'Oui, avec les protections adaptées, le matériel conforme et le respect strict des consignes de sécurité.'
      }
    };

    const choix = choixParType[type] || {
      mauvaise: 'Je ne sais pas. Je verrai sur place.',
      acceptable: `Je peux faire ce travail si on m'explique bien les consignes.`,
      bien: `Oui, je peux répondre à cette situation avec sérieux. Dans le ${metierNom}, je ferais attention à ${motCle}, aux consignes et à la communication avec l'équipe pour faire un travail fiable.`
    };

    const piegesLongueur = {
      presentation: {
        mauvaise: 'Je suis quelqu\'un qui a fait beaucoup de choses différentes, mais je ne sais pas vraiment lesquelles sont utiles pour ce poste. Je préfère que vous lisiez mon CV parce que tout est écrit dedans.',
        bien: `Je suis sérieux, ponctuel et motivé pour ce poste. J'ai déjà appris à respecter des consignes et à travailler avec méthode.`
      },
      motivation: {
        mauvaise: 'Je veux ce travail parce que j\'ai besoin de gagner de l\'argent rapidement. Je ne connais pas encore bien votre entreprise, mais je peux venir et voir après si cela me convient.',
        bien: `Ce poste correspond à mes compétences. Je veux apprendre vos méthodes et m'intégrer dans l'équipe.`
      },
      qualites: {
        mauvaise: 'Je pense avoir beaucoup de qualités, par exemple je suis meilleur que plusieurs personnes avec qui j\'ai travaillé. En général je sais déjà comment faire, donc je n\'ai pas souvent besoin de conseils.',
        bien: 'Je suis ponctuel, attentif aux consignes et régulier dans mon travail.'
      },
      defauts: {
        mauvaise: 'Mon défaut principal est que je dis parfois directement quand les choses ne me plaisent pas, même si cela dérange les collègues ou le responsable, parce que je préfère être comme je suis.',
        bien: 'Je peux parfois manquer de confiance, alors je vérifie les consignes et je demande confirmation.'
      },
      experience: {
        mauvaise: `J'ai fait plusieurs choses, mais je ne me rappelle pas exactement des tâches. Je pense que cela ressemble peut-être au ${metierNom}, donc je devrais pouvoir me débrouiller si on me laisse essayer.`,
        bien: `J'ai déjà travaillé avec ${motCle} et ${motCle2}. J'ai appris à respecter les consignes.`
      },
      disponibilite: {
        mauvaise: 'Je peux être disponible, mais cela dépend beaucoup des jours, des horaires, de mes rendez-vous et de mes autres priorités. Je préfère décider semaine après semaine.',
        bien: 'Oui, je suis disponible et je peux m\'organiser selon vos horaires.'
      },
      equipe: {
        mauvaise: 'Je peux travailler en équipe si les collègues font les choses comme moi. Sinon, je préfère travailler seul parce que cela évite les discussions et les pertes de temps.',
        bien: 'Oui. Je communique clairement, j\'écoute les consignes et j\'aide si possible.'
      },
      ponctualite: {
        mauvaise: 'La ponctualité est importante, mais parfois les transports ou les imprévus arrivent. Si je suis en retard, ce n\'est pas toujours ma faute et je préfère expliquer après.',
        bien: 'Oui. Je prépare mon trajet et j\'arrive quelques minutes en avance.'
      },
      communication: {
        mauvaise: 'Si je ne comprends pas, j\'essaie quand même pour ne pas déranger. Après, si ce n\'est pas correct, on peut toujours corriger plus tard avec le responsable.',
        bien: 'Je demande de répéter ou de montrer un exemple pour éviter une erreur.'
      },
      metier: {
        mauvaise: `Je pense pouvoir faire ce travail, même si je ne connais pas encore les détails. Je préfère apprendre directement sur place et voir les problèmes quand ils arrivent.`,
        bien: `Je respecte les consignes, je fais attention à ${motCle} et je préviens en cas de doute.`
      }
    };

    const piege = piegesLongueur[type];
    const utiliserPiegeLong = piege && Math.random() < 0.65;
    const mauvaise = utiliserPiegeLong ? piege.mauvaise : choix.mauvaise;
    const bien = utiliserPiegeLong ? piege.bien : choix.bien;

    const propositions = [
      { niveau: 'mauvaise', label: 'Mauvaise réponse', texte: mauvaise },
      { niveau: 'acceptable', label: 'Réponse acceptable', texte: choix.acceptable },
      { niveau: 'bien', label: 'Bonne réponse', texte: bien }
    ];

    const choixAffines = this.affinerDifficulte(this.equilibrerLongueurs(propositions, type));
    const choixAdaptes = this.adapterChoixAuNiveau(choixAffines, type);

    return Data.melanger(choixAdaptes);
  },

  // Adapte les réponses au niveau choisi, pour éviter des réponses trop longues en A1
  adapterChoixAuNiveau(choix, type) {
    const niveau = this.session.niveau || 'A2';

    if (niveau === 'B1') {
      return choix.map(c => ({
        ...c,
        texte: c.texte
      }));
    }

    if (niveau === 'A1') {
      return choix.map(c => ({
        ...c,
        texte: this.simplifierTexteA1(c.texte, c.niveau, type)
      }));
    }

    // A2 : on garde le texte, mais on coupe les réponses trop longues.
    return choix.map(c => ({
      ...c,
      texte: this.limiterPhrases(c.texte, c.niveau === 'bien' ? 3 : 2)
    }));
  },

  simplifierTexteA1(texte, niveau, type) {
    const metierNom = this.session.metier?.nom?.toLowerCase() || 'ce poste';

    const modeles = {
      mauvaise: {
        presentation: 'Je ne sais pas quoi dire. Tout est dans mon CV.',
        motivation: 'Je veux travailler. Le poste me va.',
        experience: 'Je ne sais pas. Je peux essayer.',
        communication: 'Je fais même si je ne comprends pas.',
        client_difficile: 'Je réponds vite au client.',
        conflit: 'Je réponds directement.',
        default: 'Je ne sais pas. Je verrai sur place.'
      },
      acceptable: {
        presentation: `Je suis sérieux et motivé. Je cherche un travail dans le ${metierNom}.`,
        motivation: `Ce poste m'intéresse. Je veux apprendre et travailler.`,
        experience: `J'ai déjà fait des tâches proches. Je peux apprendre.`,
        communication: 'Je demande de répéter.',
        client_difficile: 'Je reste calme et je demande de l’aide.',
        conflit: 'Je parle calmement.',
        default: 'Je fais attention et je respecte les consignes.'
      },
      bien: {
        presentation: `Bonjour, je suis sérieux et ponctuel. Je veux travailler dans le ${metierNom}.`,
        motivation: `Ce poste m'intéresse parce qu'il correspond à mon projet. Je veux apprendre vos méthodes.`,
        experience: `J'ai déjà fait des tâches utiles pour ce poste. Je respecte les consignes.`,
        communication: 'Je demande de répéter ou de montrer un exemple pour éviter une erreur.',
        client_difficile: 'Je reste calme, j’écoute le client et je préviens le responsable si besoin.',
        conflit: 'Je reste respectueux, j’écoute et je cherche une solution.',
        default: 'Je respecte les consignes, je demande si je ne comprends pas et je fais un travail sérieux.'
      }
    };

    return modeles[niveau]?.[type] || modeles[niveau]?.default || this.limiterPhrases(texte, 2);
  },

  limiterPhrases(texte, maxPhrases = 2) {
    const phrases = String(texte)
      .split(/(?<=[.!?])\s+/)
      .map(p => p.trim())
      .filter(Boolean);

    if (phrases.length <= maxPhrases) return texte;
    return phrases.slice(0, maxPhrases).join(' ');
  },

  equilibrerLongueurs(choix, type) {
    const ajoutsParType = {
      client_accueil: {
        mauvaise: ['Je reste près de la caisse et j\'attends de voir si la personne insiste.', 'Je pense que le client voit bien que je suis disponible.'],
        acceptable: ['Je garde une attitude polie et je réponds si la personne a une demande.', 'Je fais attention à ne pas trop insister.']
      },
      client_difficile: {
        mauvaise: ['Je veux surtout que la discussion se termine vite.', 'Je ne laisse pas le client prendre toute la place.'],
        acceptable: ['Je laisse la personne expliquer le problème.', 'Je réponds avec des mots simples et calmes.']
      },
      reponse_inconnue: {
        mauvaise: ['Je préfère répondre quelque chose plutôt que rester silencieux.', 'Le client veut souvent une réponse rapide.'],
        acceptable: ['Je vérifie l\'information avant de répondre clairement.', 'Je reviens vers la personne avec une réponse sûre.']
      },
      horaires: {
        mauvaise: ['Je peux changer selon les semaines, mais pas toujours au dernier moment.', 'Je préfère quand les horaires restent confortables.'],
        acceptable: ['Je m\'organise avec le planning donné.', 'Je préviens tôt si un horaire pose problème.']
      },
      organisation: {
        mauvaise: ['Je commence vite, puis je trie les priorités en avançant.', 'Je préfère ne pas perdre trop de temps à préparer.'],
        acceptable: ['Je prépare le matériel et je suis un ordre logique.', 'Je termine en vérifiant les points importants.']
      },
      outil: {
        mauvaise: ['Je fais attention, mais je préfère apprendre directement en pratiquant.', 'Je regarde comment les autres font et j\'essaie pareil.'],
        acceptable: ['Je l\'utilise doucement et je respecte les gestes de base.', 'Je vérifie que le matériel est prêt avant de commencer.']
      },
      hygiene: {
        mauvaise: ['Je fais attention, surtout quand le poste est visible.', 'Je nettoie quand ça me paraît nécessaire.'],
        acceptable: ['Je garde le poste propre et je respecte les gestes essentiels.', 'Je fais attention aux mains, aux surfaces et au matériel.']
      },
      securite: {
        mauvaise: ['Je fais surtout attention aux risques les plus visibles.', 'Je travaille vite, mais je reste quand même prudent.'],
        acceptable: ['Je porte l\'équipement prévu et je respecte les zones de travail.', 'Je ralentis quand une tâche peut être dangereuse.']
      },
      charges: {
        mauvaise: ['Je force un peu si la charge doit être déplacée rapidement.', 'Je peux faire un effort même si ce n\'est pas très confortable.'],
        acceptable: ['Je fais attention à ma posture et au poids.', 'Je prends le temps de porter correctement.']
      },
      commande: {
        mauvaise: ['Je vais vite pour respecter le rythme demandé.', 'Je peux corriger si je vois l\'erreur ensuite.'],
        acceptable: ['Je vérifie les références et les quantités.', 'Je contrôle avant de passer à la commande suivante.']
      },
      erreur_commande: {
        mauvaise: ['Je corrige sans trop en parler si c\'est possible.', 'Je préfère éviter que l\'erreur devienne trop visible.'],
        acceptable: ['Je bloque la commande et je corrige proprement.', 'Je cherche d\'où vient l\'erreur pour ne pas la refaire.']
      },
      inventaire: {
        mauvaise: ['Je compte assez vite pour avancer dans les rayons.', 'Je note les différences seulement si elles sont importantes.'],
        acceptable: ['Je compte avec méthode et je note les écarts.', 'Je vérifie les références avant de valider.']
      },
      mobilite_personne: {
        mauvaise: ['Je l\'aide rapidement pour éviter qu\'elle attende trop.', 'Je pense que l\'important est surtout d\'arriver au bon endroit.'],
        acceptable: ['Je parle doucement et je sécurise le déplacement.', 'Je respecte le rythme de la personne.']
      },
      signalement: {
        mauvaise: ['Je regarde d\'abord si la situation se règle toute seule.', 'Je préfère ne pas créer une histoire trop vite.'],
        acceptable: ['Je protège la personne ou le lieu et je suis la procédure.', 'Je note les faits importants.']
      }
    };

    const ajoutsDefaut = {
      mauvaise: [
        'Je pense que cela peut suffire dans beaucoup de situations.',
        'Je préfère rester simple et avancer sans trop compliquer.',
        'Je peux corriger ensuite si je remarque un problème.'
      ],
      acceptable: [
        'Je reste attentif à la situation.',
        'Je garde une méthode simple et régulière.',
        'Je fais attention au résultat attendu.'
      ]
    };

    const ajouts = ajoutsParType[type] || ajoutsDefaut;

    const copies = choix.map(c => ({ ...c }));
    const maxMots = Math.max(...copies.map(c => this.compterMots(c.texte)));

    copies.forEach(c => {
      if (c.niveau === 'bien') return;

      const phrases = ajouts[c.niveau] || [];
      let index = 0;
      while (this.compterMots(c.texte) < maxMots - 2 && index < phrases.length) {
        c.texte += ' ' + phrases[index];
        index++;
      }
    });

    return copies;
  },

  affinerDifficulte(choix) {
    return choix.map(c => {
      if (c.niveau === 'bien') return c;
      return {
        ...c,
        texte: this.ajouterProblemeFormulation(c.texte, c.niveau)
      };
    });
  },

  ajouterProblemeFormulation(texte, niveau) {
    const ajouts = {
      mauvaise: [
        'Je reste volontairement assez général.',
        'Je pense que cela montre l\'idée principale.',
        'Je préfère ne pas trop développer pendant l\'entretien.',
        'Je ne donne pas forcément d\'exemple précis.',
        'Je réponds surtout selon mon impression.'
      ],
      acceptable: [
        'Je peux aussi préciser avec un exemple si nécessaire.',
        'Je peux expliquer ma méthode plus en détail.',
        'Je reste simple dans mon explication.',
        'Je peux compléter avec une situation vécue.',
        'Je peux donner plus de précisions pendant l\'entretien.'
      ]
    };

    const phrases = ajouts[niveau] || [];
    if (!phrases.length) return texte;

    return texte + ' ' + phrases[Math.floor(Math.random() * phrases.length)];
  },

  compterMots(texte) {
    return String(texte).trim().split(/\s+/).filter(Boolean).length;
  },

  infererTypeQuestion(questionTexte) {
    const texte = (questionTexte || '').toLowerCase();
    const contient = (...mots) => mots.some(mot => texte.includes(mot));

    if (contient('parlez-moi de vous')) return 'presentation';
    if (contient('pourquoi voulez-vous', 'qu\'est-ce qui vous motive')) return 'motivation';
    if (contient('qualités principales')) return 'qualites';
    if (contient('défauts')) return 'defauts';
    if (contient('5 ans')) return 'projet';
    if (contient('quitté votre dernier emploi')) return 'parcours';
    if (contient('des questions sur le poste')) return 'questions';
    if (contient('salaire')) return 'salaire';
    if (contient('niveau de français', 'autre langue', 'autres langues')) return 'langue';
    if (contient('moyen de transport')) return 'transport';
    if (contient('formation', 'diplôme', 'diplômes')) return 'formation';
    if (contient('stress')) return 'stress';
    if (contient('conflit', 'collègue que vous n\'aimez pas')) return 'conflit';
    if (contient('ne connaissez pas la réponse')) return 'reponse_inconnue';
    if (contient('ne comprenez pas', 'ne savez pas', 'ne connaissez pas')) return 'communication';
    if (contient('équipe', 'collègues', 'chef de chantier')) return texte.includes('chef') ? 'hierarchie' : 'equipe';
    if (contient('disponible', 'week-end', 'jours fériés', 'tôt le matin', 'tard le soir', 'la nuit', 'horaires décalés')) return 'horaires';
    if (contient('ponctuel')) return 'ponctualite';
    if (contient('maçonnerie, peinture ou plomberie')) return 'domaines_batiment';
    if (contient('expérience', 'déjà travaillé', 'déjà aidé', 'déjà fait')) return 'experience';

    if (contient('permis de conduire', 'points sur votre permis')) return 'permis';
    if (contient('carte professionnelle', 'cqp', 'caces', 'certificat', 'habilitations')) return 'certification';
    if (contient('produits de nettoyage', 'couteau', 'caisse', 'transpalette', 'chariot élévateur', 'scanner', 'logiciel', 'outils')) return 'outil';
    if (contient('organisez', 'organiser', 'tournée', 'remplissage', 'plusieurs pièces', 'plusieurs clients', 'beaucoup de commandes', 'beaucoup de marchandises')) return 'organisation';
    if (contient('objet oublié')) return 'objet_trouve';
    if (contient('date est dépassée', 'date dépassée', 'périmé')) return 'date_perimee';
    if (contient('taches difficiles', 'tâches difficiles', 'difficiles à enlever')) return 'probleme_technique';
    if (contient('important pour vous dans ce travail')) return 'valeurs_travail';
    if (contient('bien fait', 'rayon soit beau', 'prix sur les étiquettes', 'livré tous les colis')) return 'controle_qualite';
    if (contient('porter', 'charges lourdes', '15 à 25 kg')) return 'charges';
    if (contient('responsable vous dit', 'critique')) return 'feedback';
    if (contient('hygiène alimentaire', 'haccp')) return 'hygiene';
    if (contient('accidents en cuisine', 'accidents dans un entrepôt', 'sécurité sur un chantier')) return 'securite';
    if (contient('client est en colère', 'client se plaint', 'appel téléphonique difficile', 'personne qui refuse', 'client est très agressif')) return 'client_difficile';
    if (contient('accueillez-vous un client', 'accueillez un client', 'accueil d\'un client', 'sourire avec les clients')) return 'client_accueil';
    if (contient('conseillez un client', 'hésite entre deux produits')) return 'conseil_client';
    if (contient('rupture de stock')) return 'rupture_stock';
    if (contient('objectifs de vente')) return 'objectifs';
    if (contient('adresse du client')) return 'adresse';
    if (contient('colis abîmé', 'produit abîmé')) return 'produit_abime';
    if (contient('client n\'est pas chez lui')) return 'client_absent';
    if (contient('camion est bien chargé', 'chargé et sécurisé')) return 'chargement';
    if (contient('accident ou de panne', 'urgence médicale', 'début d\'incendie', 'objet suspect', 'maltraitance', 'forces de l\'ordre', 'quelqu\'un voler')) return 'signalement';
    if (contient('préparez-vous une commande', 'préparez une commande')) return 'commande';
    if (contient('erreurs dans une commande')) return 'erreur_commande';
    if (contient('inventaire')) return 'inventaire';
    if (contient('livraison est correcte à la réception')) return 'controle_reception';
    if (contient('repas pour plus de 50 personnes')) return 'volume_repas';
    if (contient('aimez cuisiner')) return 'preference_cuisine';
    if (contient('du mal à se déplacer')) return 'mobilite_personne';
    if (contient('médicaments')) return 'medicaments';
    if (contient('vie privée')) return 'discretion';
    if (contient('triste ou qui pleure')) return 'empathie';
    if (contient('repas adapté')) return 'adaptation';
    if (contient('famille de la personne')) return 'communication_famille';
    if (contient('téléphonique difficile')) return 'telephone';
    if (contient('habillez-vous')) return 'presentation_pro';
    if (contient('ronde de surveillance')) return 'surveillance';
    if (contient('rapport d\'incident')) return 'rapport';
    if (contient('maintenez-vous votre calme')) return 'calme';
    if (contient('entrées et sorties')) return 'controle_acces';
    if (contient('lire un plan')) return 'plan';
    if (contient('extérieur par tous les temps')) return 'conditions';
    if (contient('déchets et le rangement')) return 'rangement';
    if (contient('doute sur la façon')) return 'doute';
    if (contient('accident de travail')) return 'signalement';
    if (contient('travailler en hauteur')) return 'hauteur';

    return 'metier';
  },

  afficherChoixReponses() {
    const conteneur = document.getElementById('choix-reponses');
    if (!conteneur) return;

    conteneur.innerHTML = this.session.choixCourants.map((choix, index) => `
      <button class="choix-reponse" type="button" role="radio" aria-checked="false" data-index="${index}">
        <span class="choix-lettre">${String.fromCharCode(65 + index)}</span>
        <span class="choix-texte">${this.escapeHTML(choix.texte)}</span>
      </button>
    `).join('');
  },

  selectionnerChoix(index) {
    const choix = this.session.choixCourants[Number(index)];
    if (!choix) return;

    this.session.choixSelectionne = choix;
    document.querySelectorAll('.choix-reponse').forEach(btn => {
      const actif = btn.dataset.index === String(index);
      btn.classList.toggle('actif', actif);
      btn.setAttribute('aria-checked', actif ? 'true' : 'false');
    });
    document.getElementById('btn-soumettre').disabled = false;
    this.sauvegarderAuto();
  },

  // Soumet la réponse et l'évalue
  soumettreReponse() {
    const choix = this.session.choixSelectionne;
    if (!choix) {
      alert('Choisissez une réponse avant de continuer.');
      return;
    }

    document.querySelectorAll('.choix-reponse').forEach(btn => {
      btn.disabled = true;
      const choixBtn = this.session.choixCourants[Number(btn.dataset.index)];
      if (choixBtn?.niveau) btn.classList.add(`niveau-${choixBtn.niveau}`);
    });
    document.getElementById('btn-soumettre')?.classList.add('cache');

    // Évaluation
    const resultat = Evaluation.evaluerChoix(choix);

    // Sauvegarder la réponse
    const q = this.session.questions[this.session.indexQuestion];
    this.session.reponses.push({
      question: q.question,
      reponse: choix.texte,
      niveauChoisi: choix.niveau,
      labelChoisi: choix.label,
      score: resultat.score,
      details: resultat.details,
      feedback: resultat.feedback
    });
    this.session.scoreTotal += resultat.score;

    Storage.ajouterReponse({
      question: q.question,
      reponse: choix.texte,
      niveauChoisi: choix.niveau,
      score: resultat.score
    });

    // Afficher le feedback
    this.afficherFeedback(resultat);
  },

  // Affiche le feedback visuel
  afficherFeedback(resultat) {
    const zone = document.getElementById('zone-feedback');
    if (!zone) return;

    // Score visuel
    const scoreEl = document.getElementById('score-valeur');
    if (scoreEl) scoreEl.textContent = resultat.score;

    const scoreLabel = document.getElementById('score-label');
    if (scoreLabel) scoreLabel.textContent = resultat.feedback.titre;

    const scoreMsg = document.getElementById('score-message');
    if (scoreMsg) scoreMsg.textContent = resultat.feedback.message;

    // Couleur selon score
    const cercle = document.getElementById('score-cercle');
    if (cercle) {
      cercle.style.borderColor = resultat.feedback.couleur;
      cercle.style.color = resultat.feedback.couleur;
    }

    // Détails des critères
    const detailsEl = document.getElementById('details-criteres');
    if (detailsEl) {
      detailsEl.innerHTML = Object.entries(resultat.details).map(([cle, d]) => `
        <div class="critere-ligne">
          <span class="critere-nom">${this.nomCritere(cle)}</span>
          <span class="critere-barre-cont">
            <span class="critere-barre" style="width:${Math.round((d.score / d.max) * 100)}%"></span>
          </span>
          <span class="critere-pts">${d.score}/${d.max}</span>
        </div>
        <p class="critere-feedback">${d.feedback}</p>
      `).join('');
    }

    zone.classList.remove('cache');
    document.getElementById('btn-suivant')?.classList.remove('cache');

    // Afficher bouton "Terminer" si dernière question
    const derniere = this.session.indexQuestion >= this.session.questions.length - 1;
    const btnSuivant = document.getElementById('btn-suivant');
    const btnTerminer = document.getElementById('btn-terminer');
    if (derniere) {
      if (btnSuivant) btnSuivant.classList.add('cache');
      if (btnTerminer) btnTerminer.classList.remove('cache');
    }
  },

  // Nom lisible d'un critère
  nomCritere(cle) {
    const noms = {
      longueur: '📏 Longueur',
      exemple: '💡 Exemple concret',
      vocabulaire: '📚 Vocabulaire',
      politesse: '🤝 Politesse',
      structure: '🏗️ Structure',
      adaptation: '🎯 Adaptation',
      pertinence: '🎯 Pertinence',
      precision: '💡 Précision',
      attitude: '🤝 Attitude'
    };
    return noms[cle] || cle;
  },

  // Passe à la question suivante
  questionSuivante() {
    this.session.indexQuestion++;
    if (this.session.indexQuestion < this.session.questions.length) {
      this.afficherQuestion();
    } else {
      this.terminerEntretien();
    }
  },

  // Termine l'entretien et affiche le rapport
  terminerEntretien() {
    Voice.arreter();
    const scoreMoyen = this.session.reponses.length > 0
      ? Math.round(this.session.scoreTotal / this.session.reponses.length)
      : 0;

    // Archiver la session
    Storage.archiverSession({
      metier: this.session.metier?.nom,
      niveau: this.session.niveau,
      recruteur: this.session.typeRecruteur,
      scoreMoyen,
      nbReponses: this.session.reponses.length,
      dateDebut: this.session.dateDebut
    });

    this.afficherRapport(scoreMoyen);
    this.afficherEcran('ecran-rapport');
  },

  // Affiche le rapport final
  afficherRapport(scoreMoyen) {
    const metierNom = this.session.metier?.nom || '';
    const metierEmoji = this.session.metier?.emoji || '';
    const now = new Date();

    document.getElementById('rapport-metier').textContent = `${metierEmoji} ${metierNom}`;
    document.getElementById('rapport-niveau').textContent = this.session.niveau;
    document.getElementById('rapport-recruteur').textContent = this.nomRecruteur(this.session.typeRecruteur);
    document.getElementById('rapport-date').textContent = now.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
    document.getElementById('rapport-score').textContent = scoreMoyen + ' / 100';
    document.getElementById('rapport-nb-questions').textContent = this.session.reponses.length;

    // Message de conclusion du recruteur
    const recruteur = Data.recruteurs?.[this.session.typeRecruteur];
    if (recruteur) {
      document.getElementById('rapport-conclusion').textContent = recruteur.conclusion;
    }

    // Liste des réponses
    const liste = document.getElementById('rapport-liste-reponses');
    if (liste) {
      liste.innerHTML = this.session.reponses.map((r, i) => `
        <div class="rapport-reponse">
          <div class="rapport-q-header">
            <span class="rapport-q-num">Q${i + 1}</span>
            <span class="rapport-q-score" style="color:${r.feedback.couleur}">${r.score}/100</span>
          </div>
          <p class="rapport-q-texte"><strong>Question :</strong> ${r.question}</p>
          <p class="rapport-r-texte"><strong>Choix :</strong> ${r.labelChoisi || 'Réponse choisie'} — ${r.reponse}</p>
          <p class="rapport-fb"><strong>Bilan :</strong> ${r.feedback.message}</p>
        </div>
      `).join('');
    }

    // Score graphique
    const scoreCircle = document.getElementById('rapport-score-cercle');
    if (scoreCircle) {
      const couleur = scoreMoyen >= 80 ? '#27ae60' : scoreMoyen >= 60 ? '#2980b9' : scoreMoyen >= 40 ? '#e67e22' : '#e74c3c';
      scoreCircle.style.borderColor = couleur;
      scoreCircle.style.color = couleur;
      scoreCircle.querySelector('.score-grand').textContent = scoreMoyen;
    }
  },

  nomRecruteur(type) {
    const noms = { sympathique: '😊 Sympathique', presse: '⏱️ Pressé', exigeant: '🎯 Exigeant' };
    return noms[type] || type;
  },

  // Affiche un message du recruteur
  afficherMessageRecruteur(message) {
    const el = document.getElementById('message-recruteur');
    if (el) {
      el.textContent = message;
      el.classList.remove('cache');
    }
    Voice.lire(message);
  },

  // Affiche un écran et cache les autres
  afficherEcran(id) {
    document.querySelectorAll('.ecran').forEach(e => e.classList.remove('actif'));
    document.getElementById(id)?.classList.add('actif');
    window.scrollTo(0, 0);
  },

  // Recharge une session sauvegardée si elle existe
  chargerSessionSauvegardee() {
    const sauvegarde = Storage.charger();
    if (sauvegarde && sauvegarde.metier) {
      const banner = document.getElementById('banner-reprise');
      if (banner) {
        banner.classList.remove('cache');
        banner.querySelector('.reprise-metier').textContent = sauvegarde.metier.nom || '';
        banner.querySelector('.btn-reprendre')?.addEventListener('click', () => {
          // Pour simplifier : on repart de zéro avec le même métier
          banner.classList.add('cache');
        });
        banner.querySelector('.btn-ignorer')?.addEventListener('click', () => {
          Storage.effacer();
          banner.classList.add('cache');
        });
      }
    }
  },

  // Sauvegarde automatique de l'état courant
  sauvegarderAuto() {
    Storage.sauvegarder({
      metier: this.session.metier,
      niveau: this.session.niveau,
      typeRecruteur: this.session.typeRecruteur,
      indexQuestion: this.session.indexQuestion,
      nbReponses: this.session.reponses.length,
      reponses: this.session.reponses
    });
  },

  // Recommence une nouvelle session
  recommencer() {
    Voice.arreter();
    Storage.effacer();
    this.session = {
      metier: null,
      niveau: 'A2',
      typeRecruteur: 'sympathique',
      questions: [],
      indexQuestion: 0,
      reponses: [],
      dateDebut: null,
      scoreTotal: 0,
      choixCourants: [],
      choixSelectionne: null
    };
    this.afficherEcran('ecran-accueil');
    // Réinitialiser les boutons
    document.querySelectorAll('.btn-niveau').forEach(b => b.classList.remove('actif'));
    document.querySelector('.btn-niveau[data-niveau="A2"]')?.classList.add('actif');
    document.querySelectorAll('.btn-recruteur').forEach(b => b.classList.remove('actif'));
    document.querySelector('.btn-recruteur[data-recruteur="sympathique"]')?.classList.add('actif');
    document.querySelectorAll('.btn-metier').forEach(b => b.classList.remove('actif'));
    const btnLancer = document.getElementById('btn-lancer');
    if (btnLancer) { btnLancer.disabled = true; btnLancer.classList.remove('pret'); }
  },

  escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, c => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[c]));
  }
};

// Démarrage quand la page est chargée
document.addEventListener('DOMContentLoaded', () => App.init());
