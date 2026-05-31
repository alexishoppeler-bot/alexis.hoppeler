// data.js — Chargement des données JSON (inline pour mode hors-ligne)

const Data = {
  metiers: null,
  questionsGenerales: null,
  questionsDifficiles: null,
  criteresEvaluation: null,

  // Charge toutes les données
  async chargerTout() {
    try {
      // Essai de chargement via fetch (serveur local ou file://)
      const [m, qg, qd, ce] = await Promise.all([
        this._chargerJSON('./data/metiers.json'),
        this._chargerJSON('./data/questions-generales.json'),
        this._chargerJSON('./data/questions-difficiles.json'),
        this._chargerJSON('./data/criteres-evaluation.json')
      ]);
      this.metiers = m.metiers;
      this.questionsGenerales = qg.questions_generales;
      this.questionsDifficiles = qd.questions_difficiles;
      this.criteresEvaluation = ce.criteres;
      this.recruteurs = ce.recruteurs;
      return true;
    } catch (e) {
      console.warn('Chargement JSON externe impossible, utilisation des données intégrées :', e.message);
      this._chargerDonneesIntegrees();
      return true;
    }
  },

  async _chargerJSON(url) {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('Fetch failed: ' + url);
    return resp.json();
  },

  // Données intégrées au cas où fetch ne fonctionne pas (ouverture directe index.html)
  _chargerDonneesIntegrees() {
    // Métiers simplifiés intégrés
    this.metiers = [
      { id: 'nettoyage', nom: 'Employé de nettoyage', emoji: '🧹', mots_cles: ['propre','nettoyer','produits','aspirateur','sol','surfaces','hygiène'], questions: ['Pourquoi voulez-vous travailler comme employé de nettoyage ?','Avez-vous déjà utilisé des produits de nettoyage professionnels ?','Comment organisez-vous votre travail quand vous avez plusieurs pièces à nettoyer ?','Que faites-vous si vous trouvez un objet oublié par un client ?','Pouvez-vous travailler tôt le matin ou tard le soir ?','Comment gérez-vous les taches difficiles à enlever ?','Avez-vous déjà travaillé dans un hôtel ou une entreprise ?','Qu\'est-ce qui est important pour vous dans ce travail ?','Comment vous assurez-vous que votre travail est bien fait ?','Avez-vous un permis de conduire ?','Pouvez-vous porter des charges lourdes comme des aspirateurs industriels ?','Comment réagissez-vous si votre responsable vous dit que votre travail n\'est pas parfait ?'], relances: ['Pouvez-vous me donner un exemple concret ?','Qu\'avez-vous appris de cette expérience ?','Comment avez-vous géré cette situation difficile ?'] },
      { id: 'cuisine', nom: 'Aide de cuisine', emoji: '🍳', mots_cles: ['cuisiner','préparer','recette','ingrédients','couteau','feu','hygiène','équipe'], questions: ['Pourquoi voulez-vous travailler en cuisine ?','Avez-vous déjà travaillé dans un restaurant ou une cantine ?','Connaissez-vous les règles d\'hygiène alimentaire ?','Comment travaillez-vous quand il y a beaucoup de commandes en même temps ?','Savez-vous utiliser un couteau professionnel ?','Pouvez-vous travailler le week-end et les jours fériés ?','Avez-vous déjà préparé des repas pour plus de 50 personnes ?','Comment gérez-vous le stress pendant le service ?','Qu\'est-ce que vous aimez cuisiner ?','Comment évitez-vous les accidents en cuisine ?','Avez-vous une formation en restauration ou en cuisine ?','Que faites-vous si vous ne savez pas préparer un plat que le chef demande ?'], relances: ['Pouvez-vous décrire votre technique ?','Qu\'avez-vous fait exactement dans cette situation ?'] },
      { id: 'vente', nom: 'Employé de vente', emoji: '🛍️', mots_cles: ['client','accueil','conseil','caisse','produit','stock','vendre','sourire'], questions: ['Pourquoi voulez-vous travailler dans la vente ?','Comment accueillez-vous un client qui entre dans le magasin ?','Que faites-vous si un client est en colère ?','Avez-vous déjà utilisé une caisse enregistreuse ?','Comment conseillez-vous un client qui hésite entre deux produits ?','Que faites-vous si un produit est en rupture de stock ?','Pouvez-vous travailler les week-ends et les jours fériés ?','Comment gérez-vous plusieurs clients en même temps ?','Avez-vous déjà eu une expérience en vente ou en service client ?','Pourquoi est-il important de sourire avec les clients ?','Comment faites-vous pour atteindre vos objectifs de vente ?','Que faites-vous si vous ne connaissez pas la réponse à la question d\'un client ?'], relances: ['Comment avez-vous géré ce client difficile ?','Qu\'est-ce que vous avez dit exactement ?'] },
      { id: 'rayon', nom: 'Employé de rayon', emoji: '🏪', mots_cles: ['rayon','réapprovisionner','étiquette','prix','stock','facing','date','périmé'], questions: ['Pourquoi voulez-vous travailler comme employé de rayon ?','Avez-vous déjà travaillé dans un supermarché ou une grande surface ?','Comment organisez-vous le remplissage d\'un rayon ?','Que faites-vous si vous trouvez un produit dont la date est dépassée ?','Savez-vous utiliser un transpalette ou un chariot élévateur ?','Comment gérez-vous votre travail quand il y a beaucoup de marchandises à ranger ?','Pouvez-vous travailler tôt le matin avant l\'ouverture du magasin ?','Comment vérifiez-vous que les prix sur les étiquettes sont corrects ?','Avez-vous déjà participé à un inventaire ?','Que faites-vous si un client vous pose une question et que vous ne connaissez pas la réponse ?','Comment portez-vous des charges lourdes sans vous blesser ?','Qu\'est-ce qui est important pour que le rayon soit beau et bien rangé ?'], relances: ['Pouvez-vous me décrire comment vous organisez votre travail ?','Qu\'avez-vous appris dans ce poste ?'] },
      { id: 'livreur', nom: 'Chauffeur-livreur', emoji: '🚚', mots_cles: ['livraison','colis','camion','route','GPS','ponctuel','permis','client'], questions: ['Avez-vous le permis de conduire et depuis combien de temps ?','Avez-vous déjà fait de la livraison ?','Comment organisez-vous votre tournée de livraison ?','Que faites-vous si vous ne trouvez pas l\'adresse du client ?','Comment gérez-vous un colis abîmé pendant le transport ?','Pouvez-vous porter des colis lourds et les livrer au bon endroit ?','Que faites-vous si le client n\'est pas chez lui au moment de la livraison ?','Avez-vous des points sur votre permis de conduire ?','Comment vous assurez-vous que votre camion est bien chargé et sécurisé ?','Pouvez-vous travailler tôt le matin ?','Que faites-vous en cas d\'accident ou de panne ?','Comment vérifiez-vous que vous avez livré tous les colis correctement ?'], relances: ['Racontez-moi une situation difficile en livraison.','Comment avez-vous géré cette situation ?'] },
      { id: 'logistique', nom: 'Employé en logistique', emoji: '📦', mots_cles: ['entrepôt','stock','palette','scanner','commande','préparation','expédition'], questions: ['Avez-vous déjà travaillé dans un entrepôt ou un dépôt ?','Savez-vous utiliser un scanner de codes-barres ?','Comment préparez-vous une commande ?','Avez-vous le CACES ou un certificat pour conduire un chariot élévateur ?','Comment gérez-vous les erreurs dans une commande ?','Pouvez-vous travailler en horaires décalés ?','Comment vérifiez-vous qu\'une livraison est correcte à la réception ?','Que faites-vous si vous trouvez un produit abîmé dans le stock ?','Comment travaillez-vous avec les autres membres de votre équipe ?','Pouvez-vous porter des charges de 15 à 25 kg ?','Avez-vous déjà utilisé un logiciel de gestion de stock ?','Que faites-vous pour éviter les accidents dans un entrepôt ?'], relances: ['Pouvez-vous décrire votre expérience en entrepôt ?','Comment avez-vous géré cette erreur ?'] },
      { id: 'aide-domicile', nom: 'Aide à domicile', emoji: '🏠', mots_cles: ['personne âgée','aide','ménage','repas','médicaments','bienveillance','patience'], questions: ['Pourquoi voulez-vous travailler comme aide à domicile ?','Avez-vous déjà aidé des personnes âgées ou handicapées ?','Comment aidez-vous quelqu\'un qui a du mal à se déplacer ?','Que faites-vous si la personne ne veut pas prendre ses médicaments ?','Comment respectez-vous la vie privée de la personne chez elle ?','Que faites-vous en cas d\'urgence médicale ?','Pouvez-vous travailler le week-end ?','Comment gérez-vous une personne qui est triste ou qui pleure ?','Avez-vous une formation dans le secteur médico-social ?','Comment préparez-vous un repas adapté à une personne âgée ?','Que faites-vous si vous êtes témoin de maltraitance ?','Comment communiquez-vous avec la famille de la personne aidée ?'], relances: ['Pouvez-vous me donner un exemple de situation difficile ?','Qu\'est-ce qui est le plus important dans ce travail pour vous ?'] },
      { id: 'receptionniste', nom: 'Réceptionniste', emoji: '🏨', mots_cles: ['accueil','téléphone','reservation','check-in','client','sourire','organisé'], questions: ['Pourquoi voulez-vous travailler comme réceptionniste ?','Avez-vous déjà travaillé à l\'accueil d\'un hôtel ou d\'une entreprise ?','Comment accueillez-vous un client qui arrive à la réception ?','Que faites-vous si un client se plaint de sa chambre ?','Parlez-vous une autre langue que le français ?','Pouvez-vous travailler la nuit ou le week-end ?','Comment gérez-vous plusieurs clients en même temps ?','Avez-vous déjà utilisé un logiciel de réservation d\'hôtel ?','Que faites-vous si un client arrive et qu\'il n\'y a plus de chambre disponible ?','Comment gérez-vous un appel téléphonique difficile ?','Qu\'est-ce qui est le plus important dans l\'accueil d\'un client ?','Comment vous habillez-vous pour travailler à la réception ?'], relances: ['Décrivez comment vous avez géré ce client difficile.','Qu\'avez-vous dit exactement à ce client ?'] },
      { id: 'securite', nom: 'Agent de sécurité', emoji: '🔐', mots_cles: ['sécurité','surveillance','rondes','incident','rapport','calme','autorité'], questions: ['Avez-vous une carte professionnelle d\'agent de sécurité ?','Avez-vous le CQP Agent de Prévention et de Sécurité ?','Comment réagissez-vous si vous voyez quelqu\'un voler dans un magasin ?','Comment effectuez-vous une ronde de surveillance ?','Que faites-vous en cas de début d\'incendie ?','Comment gérez-vous une personne qui refuse de partir ?','Avez-vous déjà écrit un rapport d\'incident ?','Comment maintenez-vous votre calme dans une situation de conflit ?','Pouvez-vous travailler la nuit ?','Comment contrôlez-vous les entrées et sorties d\'un bâtiment ?','Que faites-vous si vous trouvez un objet suspect ?','Comment communiquez-vous avec les forces de l\'ordre si nécessaire ?'], relances: ['Racontez-moi un incident que vous avez géré.','Comment avez-vous utilisé votre formation dans cette situation ?'] },
      { id: 'batiment', nom: 'Ouvrier du bâtiment', emoji: '🏗️', mots_cles: ['chantier','outils','maçonnerie','sécurité','casque','équipe','plan','béton'], questions: ['Avez-vous de l\'expérience dans le bâtiment ?','Quels outils savez-vous utiliser ?','Avez-vous travaillé en maçonnerie, peinture ou plomberie ?','Comment respectez-vous les règles de sécurité sur un chantier ?','Pouvez-vous lire un plan ou des instructions techniques ?','Comment travaillez-vous avec le chef de chantier ?','Pouvez-vous travailler en extérieur par tous les temps ?','Avez-vous des habilitations électriques ou d\'autres certifications ?','Comment gérez-vous les déchets et le rangement sur un chantier ?','Que faites-vous si vous avez un doute sur la façon de faire un travail ?','Avez-vous déjà eu un accident de travail ? Comment l\'avez-vous géré ?','Pouvez-vous travailler en hauteur ?'], relances: ['Décrivez un chantier difficile sur lequel vous avez travaillé.','Comment avez-vous résolu ce problème technique ?'] }
    ];

    this.questionsGenerales = [
      { id: 'gen1', question: 'Parlez-moi de vous.', niveau: ['A1','A2','B1'], type: 'presentation' },
      { id: 'gen2', question: 'Pourquoi voulez-vous travailler dans notre entreprise ?', niveau: ['A1','A2','B1'], type: 'motivation' },
      { id: 'gen3', question: 'Quelles sont vos qualités principales ?', niveau: ['A2','B1'], type: 'qualites' },
      { id: 'gen4', question: 'Quels sont vos défauts ?', niveau: ['B1'], type: 'defauts' },
      { id: 'gen5', question: 'Pourquoi avez-vous quitté votre dernier emploi ?', niveau: ['A2','B1'], type: 'parcours' },
      { id: 'gen6', question: 'Êtes-vous disponible immédiatement ?', niveau: ['A1','A2','B1'], type: 'disponibilite' },
      { id: 'gen7', question: 'Pouvez-vous travailler en équipe ?', niveau: ['A1','A2','B1'], type: 'equipe' },
      { id: 'gen8', question: 'Quelle est votre expérience professionnelle ?', niveau: ['A1','A2','B1'], type: 'experience' },
      { id: 'gen9', question: 'Êtes-vous ponctuel ?', niveau: ['A1','A2','B1'], type: 'ponctualite' },
      { id: 'gen10', question: 'Comment gérez-vous le stress au travail ?', niveau: ['B1'], type: 'stress' },
      { id: 'gen11', question: 'Avez-vous un moyen de transport pour venir travailler ?', niveau: ['A1','A2','B1'], type: 'transport' },
      { id: 'gen12', question: 'Pouvez-vous travailler le week-end ?', niveau: ['A1','A2','B1'], type: 'disponibilite' },
      { id: 'gen13', question: 'Quel salaire souhaitez-vous ?', niveau: ['B1'], type: 'salaire' },
      { id: 'gen14', question: "Qu'est-ce qui vous motive dans ce travail ?", niveau: ['A2','B1'], type: 'motivation' },
      { id: 'gen15', question: 'Avez-vous des formations ou des diplômes ?', niveau: ['A1','A2','B1'], type: 'formation' },
      { id: 'gen16', question: "Que faites-vous quand vous ne comprenez pas une instruction ?", niveau: ['A1','A2','B1'], type: 'communication' },
      { id: 'gen17', question: "Avez-vous déjà travaillé en France ?", niveau: ['A1','A2','B1'], type: 'experience' },
      { id: 'gen18', question: "Parlez-vous d'autres langues ?", niveau: ['A1','A2','B1'], type: 'langue' },
      { id: 'gen19', question: "Êtes-vous prêt à vous former si l'entreprise le propose ?", niveau: ['A2','B1'], type: 'formation' },
      { id: 'gen20', question: "Avez-vous des questions sur le poste ?", niveau: ['A2','B1'], type: 'questions' }
    ];

    this.questionsDifficiles = [
      { id: 'diff1', question: "Donnez-moi un exemple d'une fois où vous avez fait une erreur au travail. Qu'avez-vous appris ?", type: 'erreur', conseil: "Montrez que vous savez apprendre de vos erreurs." },
      { id: 'diff2', question: "Comment réagissez-vous si votre responsable vous critique devant vos collègues ?", type: 'critique', conseil: "Restez calme et professionnel dans votre réponse." },
      { id: 'diff3', question: "Vous avez deux tâches urgentes en même temps. Que faites-vous ?", type: 'priorites', conseil: "Expliquez comment vous priorisez votre travail." },
      { id: 'diff4', question: "Pourquoi devrions-nous vous choisir plutôt qu'un autre candidat ?", type: 'motivation', conseil: "Valorisez vos compétences sans critiquer les autres." },
      { id: 'diff5', question: "Que faites-vous si vous voyez un collègue voler dans l'entreprise ?", type: 'ethique', conseil: "Montrez votre honnêteté et votre sens des responsabilités." },
      { id: 'diff6', question: "Comment réagissez-vous quand un client est très agressif avec vous ?", type: 'client', conseil: "Montrez votre calme et votre professionnalisme." },
      { id: 'diff7', question: "Pourquoi avez-vous eu un long trou dans votre CV ?", type: 'cv', conseil: "Expliquez honnêtement ce que vous avez fait pendant cette période." },
      { id: 'diff8', question: "Que faites-vous si on vous demande de faire quelque chose qui n'est pas dans votre contrat ?", type: 'contrat', conseil: "Montrez votre flexibilité tout en connaissant vos droits." },
      { id: 'diff9', question: "Vous n'avez pas d'expérience dans ce domaine. Pourquoi devrait-on vous faire confiance ?", type: 'confiance', conseil: "Valorisez vos compétences transférables et votre motivation." },
      { id: 'diff10', question: "Comment réagissez-vous si vous apprenez que votre collègue gagne plus que vous pour le même travail ?", type: 'salaire', conseil: "Restez calme et montrez que vous savez dialoguer." },
      { id: 'diff11', question: "Décrivez votre pire journée de travail.", type: 'difficulte', conseil: "Transformez le négatif en apprentissage." },
      { id: 'diff12', question: "Votre responsable vous donne une instruction que vous pensez incorrecte. Que faites-vous ?", type: 'hierarchie', conseil: "Montrez que vous savez exprimer votre avis avec respect." },
      { id: 'diff13', question: "Si vous pouviez changer une chose dans votre caractère, ce serait quoi ?", type: 'caractere', conseil: "Choisissez quelque chose d'honnête mais pas trop négatif." },
      { id: 'diff14', question: "Que pensez-vous de votre ancien responsable ?", type: 'relations', conseil: "Ne critiquez jamais votre ancien employeur. Restez positif." },
      { id: 'diff15', question: "Avez-vous déjà refusé de faire quelque chose que votre responsable vous demandait ? Pourquoi ?", type: 'autorite', conseil: "Répondez honnêtement mais montrez votre respect de l'autorité." },
      { id: 'diff16', question: "Comment vous comportez-vous avec un collègue que vous n'aimez pas ?", type: 'relations', conseil: "Montrez votre professionnalisme." },
      { id: 'diff17', question: "Vous travaillez vite mais faites des erreurs, ou lentement mais bien. Que préférez-vous ?", type: 'methode', conseil: "Expliquez votre point de vue avec des exemples." },
      { id: 'diff18', question: "Comment gérez-vous un désaccord avec votre chef ?", type: 'conflit', conseil: "Montrez que vous savez communiquer avec respect." },
      { id: 'diff19', question: "Vous avez plusieurs offres d'emploi. Pourquoi choisissez-vous notre entreprise ?", type: 'choix', conseil: "Montrez votre connaissance de l'entreprise et votre enthousiasme." },
      { id: 'diff20', question: "Que feriez-vous si vous étiez responsable d'une grosse erreur ?", type: 'responsabilite', conseil: "Montrez votre honnêteté et votre sens des responsabilités." }
    ];

    this.criteresEvaluation = [
      { id: 'longueur', nom: 'Longueur de la réponse', poids: 15, niveaux: { excellent: 'La réponse fait plus de 50 mots. C\'est bien !', bien: 'La réponse fait entre 20 et 50 mots. C\'est correct.', insuffisant: 'La réponse est trop courte. Essayez de dire plus de choses.' } },
      { id: 'exemple', nom: 'Exemple concret', poids: 25, mots_cles_exemple: ['par exemple','une fois','j\'ai','quand j\'ai','dans mon ancien','j\'avais','j\'ai eu','j\'ai vécu','comme quand','notamment','en particulier','lors de'], niveaux: { excellent: 'Bravo ! Vous avez donné un exemple concret.', absent: 'Essayez de donner un exemple de votre vie ou de votre travail.' } },
      { id: 'vocabulaire', nom: 'Vocabulaire du métier', poids: 20, niveaux: { excellent: 'Très bien ! Vous utilisez le vocabulaire du métier.', bien: 'Bien. Essayez d\'utiliser encore plus de mots du métier.', insuffisant: 'Essayez d\'utiliser des mots spécifiques à ce métier.' } },
      { id: 'politesse', nom: 'Politesse et respect', poids: 15, mots_polis: ['bonjour','merci','s\'il vous plaît','je vous remercie','avec plaisir','je serais ravi','je serais heureux','bien sûr','certainement','absolument'], niveaux: { excellent: 'Excellent ! Votre réponse est très polie.', bien: 'Bien. Votre réponse est correcte.', insuffisant: 'Pensez à utiliser des formules polies.' } },
      { id: 'structure', nom: 'Structure de la réponse', poids: 15, mots_structure: ['premièrement','d\'abord','ensuite','puis','enfin','pour terminer','en conclusion','donc','ainsi','car','parce que','c\'est pourquoi','finalement'], niveaux: { excellent: 'Votre réponse est bien structurée. C\'est excellent !', bien: 'Votre réponse a une bonne structure.', insuffisant: 'Essayez d\'organiser : d\'abord... ensuite... enfin...' } },
      { id: 'adaptation', nom: 'Adaptation à l\'offre', poids: 10, niveaux: { excellent: 'Très bien ! Vous montrez que vous connaissez ce poste.', insuffisant: 'Essayez de montrer que vous connaissez bien ce travail.' } }
    ];

    this.recruteurs = {
      sympathique: { style: 'chaleureux', introduction: 'Bonjour, bienvenue ! Je suis content(e) de vous rencontrer. Installez-vous confortablement.', relance_positive: "C'est très intéressant ! Pouvez-vous me dire plus ?", relance_negative: "Je comprends. Pouvez-vous m'expliquer un peu plus ?", conclusion: "Merci beaucoup pour cet entretien. C'était très agréable de vous parler !" },
      presse: { style: 'direct', introduction: "Bonjour, asseyez-vous. Allons droit au but. J'ai peu de temps.", relance_positive: "Bien. Et concrètement ?", relance_negative: "Soyez plus précis, s'il vous plaît.", conclusion: "D'accord, merci. On vous recontactera." },
      exigeant: { style: 'formel', introduction: "Bonjour. Asseyez-vous. Soyez précis et concret dans vos réponses.", relance_positive: "Intéressant. Pouvez-vous développer avec un exemple précis ?", relance_negative: "Ce n'est pas suffisant. Donnez-moi des faits concrets.", conclusion: "Bien. Nous avons d'autres candidats à voir. Nous vous ferons part de notre décision." }
    };
  },

  // Retourne les questions pour un métier et un niveau donnés
  getQuestions(metierOuId, niveau) {
    const metier = typeof metierOuId === 'string'
      ? this.metiers.find(m => m.id === metierOuId)
      : metierOuId;
    if (!metier) return [];

    const questionsMetier = metier.questions.map((q, i) => ({
      id: metier.id + '_' + i,
      question: q,
      source: 'metier'
    }));

    const questionsGen = this.questionsGenerales
      .filter(q => q.niveau.includes(niveau))
      .map(q => ({ ...q, source: 'generale' }));

    return [...questionsMetier, ...questionsGen];
  },

  // Mélange un tableau (algorithme Fisher-Yates)
  melanger(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
};
