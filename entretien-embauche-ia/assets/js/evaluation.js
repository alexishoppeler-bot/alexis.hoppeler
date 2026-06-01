// evaluation.js — Évaluation des réponses sur 6 critères

const Evaluation = {

  // Évalue une réponse choisie parmi trois niveaux prédéfinis
  evaluerChoix(choix) {
    const evaluations = {
      mauvaise: {
        score: 25,
        titre: 'Réponse mauvaise',
        message: 'Cette réponse est trop courte, trop négative ou ne donne pas assez confiance au recruteur.',
        couleur: '#e74c3c',
        details: {
          pertinence: { score: 1, max: 4, feedback: 'La réponse ne répond pas vraiment à la question.' },
          precision: { score: 1, max: 3, feedback: 'Il manque des faits ou un exemple concret.' },
          attitude: { score: 1, max: 3, feedback: 'Le ton n\'est pas assez professionnel.' }
        }
      },
      acceptable: {
        score: 60,
        titre: 'Réponse acceptable',
        message: 'Cette réponse peut fonctionner, mais elle reste générale. Elle serait meilleure avec un exemple précis.',
        couleur: '#e67e22',
        details: {
          pertinence: { score: 3, max: 4, feedback: 'La réponse va dans le bon sens.' },
          precision: { score: 1, max: 3, feedback: 'Elle manque encore de détails concrets.' },
          attitude: { score: 2, max: 3, feedback: 'Le ton est correct et respectueux.' }
        }
      },
      bien: {
        score: 90,
        titre: 'Bonne réponse',
        message: 'Cette réponse est claire, professionnelle et concrète. Elle montre une bonne attitude pour l\'entretien.',
        couleur: '#27ae60',
        details: {
          pertinence: { score: 4, max: 4, feedback: 'La réponse répond directement à la question.' },
          precision: { score: 3, max: 3, feedback: 'Elle donne une explication ou un exemple utile.' },
          attitude: { score: 3, max: 3, feedback: 'Le ton donne confiance au recruteur.' }
        }
      }
    };

    const resultat = evaluations[choix?.niveau] || evaluations.mauvaise;
    return {
      score: resultat.score,
      details: resultat.details,
      feedback: {
        titre: resultat.titre,
        message: resultat.message,
        couleur: resultat.couleur
      }
    };
  },

  // Évalue une réponse et retourne un objet avec score et feedbacks détaillés
  evaluer(reponse, metier, criteres) {
    const texte = reponse.trim().toLowerCase();
    const mots = texte.split(/\s+/).filter(m => m.length > 0);
    const nbMots = mots.length;

    const details = {};
    let scoreTotal = 0;

    // 1. LONGUEUR (15 pts)
    const critLongueur = criteres.find(c => c.id === 'longueur');
    let scoreLongueur = 0;
    if (nbMots >= 50) {
      scoreLongueur = critLongueur.poids;
      details.longueur = { score: scoreLongueur, max: critLongueur.poids, feedback: critLongueur.niveaux.excellent };
    } else if (nbMots >= 20) {
      scoreLongueur = Math.round(critLongueur.poids * 0.6);
      details.longueur = { score: scoreLongueur, max: critLongueur.poids, feedback: critLongueur.niveaux.bien };
    } else {
      scoreLongueur = Math.round(critLongueur.poids * 0.2);
      details.longueur = { score: scoreLongueur, max: critLongueur.poids, feedback: critLongueur.niveaux.insuffisant };
    }
    scoreTotal += scoreLongueur;

    // 2. EXEMPLE CONCRET (25 pts)
    const critExemple = criteres.find(c => c.id === 'exemple');
    const aExemple = critExemple.mots_cles_exemple.some(mot => texte.includes(mot));
    let scoreExemple = 0;
    if (aExemple) {
      scoreExemple = critExemple.poids;
      details.exemple = { score: scoreExemple, max: critExemple.poids, feedback: critExemple.niveaux.excellent };
    } else {
      scoreExemple = 0;
      details.exemple = { score: 0, max: critExemple.poids, feedback: critExemple.niveaux.absent };
    }
    scoreTotal += scoreExemple;

    // 3. VOCABULAIRE MÉTIER (20 pts)
    const critVocab = criteres.find(c => c.id === 'vocabulaire');
    const motsMetier = (metier && metier.mots_cles) ? metier.mots_cles : [];
    const nbMotsMetier = motsMetier.filter(mot => texte.includes(mot.toLowerCase())).length;
    let scoreVocab = 0;
    if (nbMotsMetier >= 3) {
      scoreVocab = critVocab.poids;
      details.vocabulaire = { score: scoreVocab, max: critVocab.poids, feedback: critVocab.niveaux.excellent };
    } else if (nbMotsMetier >= 1) {
      scoreVocab = Math.round(critVocab.poids * 0.5);
      details.vocabulaire = { score: scoreVocab, max: critVocab.poids, feedback: critVocab.niveaux.bien };
    } else {
      scoreVocab = 0;
      details.vocabulaire = { score: 0, max: critVocab.poids, feedback: critVocab.niveaux.insuffisant };
    }
    scoreTotal += scoreVocab;

    // 4. POLITESSE (15 pts)
    const critPolitesse = criteres.find(c => c.id === 'politesse');
    const aMotPoli = critPolitesse.mots_polis.some(mot => texte.includes(mot));
    // Bonus si la réponse n'est pas agressive (pas de grossièretés)
    const estPolie = !texte.match(/\b(jamais|non|pas du tout|rien)\b/) || nbMots > 15;
    let scorePolitesse = 0;
    if (aMotPoli) {
      scorePolitesse = critPolitesse.poids;
      details.politesse = { score: scorePolitesse, max: critPolitesse.poids, feedback: critPolitesse.niveaux.excellent };
    } else if (estPolie) {
      scorePolitesse = Math.round(critPolitesse.poids * 0.6);
      details.politesse = { score: scorePolitesse, max: critPolitesse.poids, feedback: critPolitesse.niveaux.bien };
    } else {
      scorePolitesse = Math.round(critPolitesse.poids * 0.3);
      details.politesse = { score: scorePolitesse, max: critPolitesse.poids, feedback: critPolitesse.niveaux.insuffisant };
    }
    scoreTotal += scorePolitesse;

    // 5. STRUCTURE (15 pts)
    const critStructure = criteres.find(c => c.id === 'structure');
    const aStructure = critStructure.mots_structure.filter(mot => texte.includes(mot));
    let scoreStructure = 0;
    if (aStructure.length >= 2) {
      scoreStructure = critStructure.poids;
      details.structure = { score: scoreStructure, max: critStructure.poids, feedback: critStructure.niveaux.excellent };
    } else if (aStructure.length >= 1) {
      scoreStructure = Math.round(critStructure.poids * 0.6);
      details.structure = { score: scoreStructure, max: critStructure.poids, feedback: critStructure.niveaux.bien };
    } else {
      scoreStructure = 0;
      details.structure = { score: 0, max: critStructure.poids, feedback: critStructure.niveaux.insuffisant };
    }
    scoreTotal += scoreStructure;

    // 6. ADAPTATION À L'OFFRE (10 pts)
    const critAdapt = criteres.find(c => c.id === 'adaptation');
    // On vérifie si la personne mentionne le poste ou le travail en question
    const motsCle = ['poste', 'emploi', 'travail', 'entreprise', 'équipe', 'mission', 'responsabilité'];
    const aAdaptation = motsCle.some(m => texte.includes(m));
    let scoreAdapt = 0;
    if (aAdaptation && nbMots >= 20) {
      scoreAdapt = critAdapt.poids;
      details.adaptation = { score: scoreAdapt, max: critAdapt.poids, feedback: critAdapt.niveaux.excellent };
    } else {
      scoreAdapt = Math.round(critAdapt.poids * 0.3);
      details.adaptation = { score: scoreAdapt, max: critAdapt.poids, feedback: critAdapt.niveaux.insuffisant };
    }
    scoreTotal += scoreAdapt;

    // Score final sur 100
    const scoreFinal = Math.min(100, Math.round(scoreTotal));

    return {
      score: scoreFinal,
      details,
      nbMots,
      feedback: this.genererFeedback(scoreFinal)
    };
  },

  // Génère un feedback global selon le score
  genererFeedback(score) {
    if (score >= 80) {
      return {
        titre: '⭐ Excellent entretien !',
        message: 'Votre réponse est très bonne. Vous avez donné des exemples, utilisé le vocabulaire du métier et vous vous êtes bien exprimé. Continuez comme ça !',
        couleur: '#27ae60'
      };
    } else if (score >= 60) {
      return {
        titre: '👍 Bon entretien !',
        message: 'Votre réponse est bonne. Essayez d\'ajouter plus d\'exemples de votre expérience et d\'utiliser plus de mots du métier.',
        couleur: '#2980b9'
      };
    } else if (score >= 40) {
      return {
        titre: '📝 Réponse correcte',
        message: 'Votre réponse est correcte mais peut être améliorée. Donnez des exemples concrets et parlez plus longtemps.',
        couleur: '#e67e22'
      };
    } else {
      return {
        titre: '💡 Essayez encore',
        message: 'Votre réponse est trop courte ou manque d\'informations. Essayez de parler plus et de donner des exemples de votre vie.',
        couleur: '#e74c3c'
      };
    }
  }
};
