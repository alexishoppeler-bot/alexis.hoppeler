// voice.js — Synthèse vocale avec priorité Google, support fr-CH et fr-FR

const Voice = {
  actif: true,
  voixChoisie: null,   // SpeechSynthesisVoice sélectionnée
  vitesse: 0.85,
  volume: 1.0,
  synth: window.speechSynthesis,

  // Ordre de préférence des voix françaises
  PRIORITE_VOIX: [
    // Google fr-CH (Suisse) — disponible dans Chrome/Edge avec internet au premier chargement
    v => v.name.toLowerCase().includes('google') && v.lang === 'fr-CH',
    // Google fr-FR
    v => v.name.toLowerCase().includes('google') && v.lang === 'fr-FR',
    // Google français (autre région)
    v => v.name.toLowerCase().includes('google') && v.lang.startsWith('fr'),
    // Microsoft fr-CH (Edge)
    v => v.name.toLowerCase().includes('microsoft') && v.lang === 'fr-CH',
    // Microsoft fr-FR (Edge)
    v => v.name.toLowerCase().includes('microsoft') && v.lang === 'fr-FR',
    // Microsoft français
    v => v.name.toLowerCase().includes('microsoft') && v.lang.startsWith('fr'),
    // Toute voix fr-CH
    v => v.lang === 'fr-CH',
    // Toute voix fr-FR
    v => v.lang === 'fr-FR',
    // N'importe quelle voix française
    v => v.lang.startsWith('fr'),
    // Fallback : première voix disponible
    () => true,
  ],

  // Initialise les voix disponibles
  init() {
    const charger = () => {
      this.voixChoisie = this._choisirMeilleureVoix();
      this._construireSelecteur();
    };

    // Chrome charge les voix de manière asynchrone
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = charger;
    }
    // Tentative synchrone (Firefox, Edge)
    charger();

    // Deuxième tentative après 500ms si pas encore chargé
    setTimeout(() => {
      if (!this.voixChoisie) charger();
    }, 500);
  },

  // Sélectionne la meilleure voix selon l'ordre de priorité
  _choisirMeilleureVoix() {
    const disponibles = this.synth.getVoices();
    if (!disponibles.length) return null;

    for (const test of this.PRIORITE_VOIX) {
      const voix = disponibles.find(test);
      if (voix) return voix;
    }
    return null;
  },

  // Retourne toutes les voix françaises disponibles (pour le sélecteur)
  voixFrancaises() {
    return this.synth.getVoices().filter(v => v.lang.startsWith('fr'));
  },

  // Construit tous les sélecteurs de voix présents dans la page
  _construireSelecteur() {
    this._remplirSelect('select-voix');
    this._remplirSelect('select-voix-entretien');
    this._bindCurseurVitesse();
    this._bindBoutonTest();
  },

  _remplirSelect(id) {
    const select = document.getElementById(id);
    if (!select) return;

    const voix = this.voixFrancaises();
    select.innerHTML = '';

    if (!voix.length) {
      const opt = document.createElement('option');
      opt.textContent = 'Voix par défaut';
      select.appendChild(opt);
      return;
    }

    voix.forEach(v => {
      const opt = document.createElement('option');
      const badge = v.name.toLowerCase().includes('google')    ? '🌐' :
                    v.name.toLowerCase().includes('microsoft')  ? '🪟' : '🔊';
      const region = v.lang === 'fr-CH' ? '🇨🇭' :
                     v.lang === 'fr-FR' ? '🇫🇷' :
                     v.lang === 'fr-BE' ? '🇧🇪' :
                     v.lang === 'fr-CA' ? '🇨🇦' : '🌍';
      opt.value = v.name;
      opt.textContent = `${badge} ${region} ${v.name}`;
      opt.selected = this.voixChoisie && v.name === this.voixChoisie.name;
      select.appendChild(opt);
    });

    // Éviter les doublons d'écouteur en clonant le nœud
    const nouveau = select.cloneNode(true);
    select.parentNode.replaceChild(nouveau, select);
    nouveau.addEventListener('change', () => {
      const toutes = this.synth.getVoices();
      this.voixChoisie = toutes.find(v => v.name === nouveau.value) || null;
      // Synchroniser l'autre sélecteur
      const autreId = id === 'select-voix' ? 'select-voix-entretien' : 'select-voix';
      const autre = document.getElementById(autreId);
      if (autre) autre.value = nouveau.value;
    });
  },

  // Lie le curseur de vitesse
  _bindCurseurVitesse() {
    const curseur = document.getElementById('curseur-vitesse');
    if (!curseur) return;
    curseur.value = this.vitesse;
    this._afficherVitesse();
    curseur.addEventListener('input', () => {
      this.vitesse = parseFloat(curseur.value);
      this._afficherVitesse();
    });
  },

  // Lie le bouton "Tester la voix"
  _bindBoutonTest() {
    const btn = document.getElementById('btn-tester-voix');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const region = this.voixChoisie?.lang === 'fr-CH' ? 'Bonjour ! Je parle le français de Suisse.' :
                     this.voixChoisie?.lang === 'fr-BE' ? 'Bonjour ! Je parle le français de Belgique.' :
                     'Bonjour ! Je suis prêt pour votre entretien d\'embauche.';
      this.lire(region);
    });
  },

  // Lit un texte à voix haute
  lire(texte, callback) {
    if (!this.actif || !texte) {
      if (callback) callback();
      return;
    }

    this.arreter();

    const u = new SpeechSynthesisUtterance(texte);
    // Utiliser la langue de la voix si disponible, sinon fr-FR par défaut
    u.lang = this.voixChoisie ? this.voixChoisie.lang : 'fr-FR';
    u.rate = this.vitesse;
    u.volume = this.volume;

    if (this.voixChoisie) u.voice = this.voixChoisie;

    u.onend = () => { if (callback) callback(); };
    u.onerror = (e) => {
      // Ignorer l'erreur "interrupted" qui est normale lors d'un cancel()
      if (e.error !== 'interrupted') console.warn('Erreur vocale :', e.error);
      if (callback) callback();
    };

    this.synth.speak(u);
  },

  // Arrête la lecture en cours
  arreter() {
    if (this.synth.speaking || this.synth.pending) {
      this.synth.cancel();
    }
  },

  // Active ou désactive la voix
  basculer() {
    this.actif = !this.actif;
    if (!this.actif) this.arreter();
    return this.actif;
  },

  // Adapte la vitesse selon le niveau de français
  adapterNiveau(niveau) {
    switch (niveau) {
      case 'A1': this.vitesse = 0.72; break;  // Très lent pour débutants
      case 'A2': this.vitesse = 0.82; break;
      case 'B1': this.vitesse = 0.92; break;
      default:   this.vitesse = 0.85;
    }
    // Mettre à jour le curseur de vitesse si présent
    const curseur = document.getElementById('curseur-vitesse');
    if (curseur) curseur.value = this.vitesse;
    this._afficherVitesse();
  },

  // Met à jour l'affichage de la vitesse
  _afficherVitesse() {
    const label = document.getElementById('label-vitesse');
    if (!label) return;
    const pct = Math.round(this.vitesse * 100);
    label.textContent = pct + '%';
  },

  // Vérifie si la synthèse vocale est disponible
  estDisponible() {
    return 'speechSynthesis' in window;
  }
};
