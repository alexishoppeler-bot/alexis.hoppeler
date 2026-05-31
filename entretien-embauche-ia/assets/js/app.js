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
    scoreTotal: 0
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

    // Touche Entrée dans la zone de réponse (Ctrl+Entrée pour soumettre)
    document.getElementById('zone-reponse')?.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'Enter') {
        this.soumettreReponse();
      }
    });

    // Auto-save à chaque modification de la réponse
    document.getElementById('zone-reponse')?.addEventListener('input', () => {
      this.sauvegarderAuto();
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

  // Lance l'entretien
  lancerEntretien() {
    if (!this.session.metier) {
      alert('Veuillez choisir un métier.');
      return;
    }

    // Préparer les questions
    const toutesQuestions = Data.getQuestions(this.session.metier, this.session.niveau);
    this.session.questions = Data.melanger(toutesQuestions).slice(0, 10);
    this.session.indexQuestion = 0;
    this.session.reponses = [];
    this.session.scoreTotal = 0;
    this.session.dateDebut = new Date().toISOString();

    // Sauvegarder le début
    Storage.sauvegarder(this.session);

    // Afficher l'écran entretien
    this.afficherEcran('ecran-entretien');

    // Afficher le nom du métier dans l'en-tête
    const nomEl = document.getElementById('entretien-metier-nom');
    if (nomEl) nomEl.textContent = this.session.metier.emoji + ' ' + this.session.metier.nom;

    // Message d'intro du recruteur
    const recruteur = Data.recruteurs?.[this.session.typeRecruteur];
    if (recruteur) {
      this.afficherMessageRecruteur(recruteur.introduction);
    }

    // Afficher la première question après un délai
    setTimeout(() => {
      this.afficherQuestion();
    }, 2500);
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
    document.getElementById('zone-reponse').value = '';
    document.getElementById('zone-reponse').disabled = false;
    document.getElementById('zone-reponse').focus();

    // Masquer le feedback de la question précédente
    document.getElementById('zone-feedback')?.classList.add('cache');
    document.getElementById('btn-suivant')?.classList.add('cache');
    document.getElementById('btn-soumettre')?.classList.remove('cache');

    // Progression
    const pct = Math.round((this.session.indexQuestion / nbTotal) * 100);
    document.getElementById('barre-progression')?.style.setProperty('width', pct + '%');

    // Lecture vocale
    Voice.lire(q.question);

    // Sauvegarder l'état
    this.sauvegarderAuto();
  },

  // Soumet la réponse et l'évalue
  soumettreReponse() {
    const reponse = document.getElementById('zone-reponse')?.value?.trim();
    if (!reponse) {
      alert('Écrivez votre réponse avant de continuer.');
      return;
    }

    document.getElementById('zone-reponse').disabled = true;
    document.getElementById('btn-soumettre')?.classList.add('cache');

    // Évaluation
    const resultat = Evaluation.evaluer(
      reponse,
      this.session.metier,
      Data.criteresEvaluation
    );

    // Choisir une relance
    const relance = Evaluation.choisirRelance(
      this.session.metier,
      this.session.typeRecruteur,
      resultat.score,
      Data.criteresEvaluation
    );

    // Sauvegarder la réponse
    const q = this.session.questions[this.session.indexQuestion];
    this.session.reponses.push({
      question: q.question,
      reponse,
      score: resultat.score,
      details: resultat.details,
      feedback: resultat.feedback,
      relance
    });
    this.session.scoreTotal += resultat.score;

    Storage.ajouterReponse({
      question: q.question,
      reponse,
      score: resultat.score
    });

    // Afficher le feedback
    this.afficherFeedback(resultat, relance);
  },

  // Affiche le feedback visuel
  afficherFeedback(resultat, relance) {
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

    // Question de relance
    const relanceEl = document.getElementById('question-relance');
    if (relanceEl) {
      relanceEl.textContent = relance;
      Voice.lire(relance);
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
      adaptation: '🎯 Adaptation'
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
          <p class="rapport-r-texte"><strong>Réponse :</strong> ${r.reponse}</p>
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
      scoreTotal: 0
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
  }
};

// Démarrage quand la page est chargée
document.addEventListener('DOMContentLoaded', () => App.init());
