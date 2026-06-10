'use strict';

(function initSharedLayout() {
  function enableAccessibleMode() {
    if (!document.body) return;
    document.body.classList.add('accessible-ui');
  }

  function currentPageId() {
    const file = window.location.pathname.split('/').pop() || '';
    const page = file.replace(/\.html$/i, '') || 'accueil';
    try {
      return decodeURIComponent(page);
    } catch (error) {
      return page;
    }
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, function(char) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[char];
    });
  }

  function sectionedLinks() {
    const orderedPages = (window.EXERCISE_CONFIG && window.EXERCISE_CONFIG.orderedPages) || [];
    const meta = (window.EXERCISE_CONFIG && window.EXERCISE_CONFIG.meta) || {};
    const sectionOrder = ['Numérique', 'Communication'];
    const sectionMap = {};
    for (const page of orderedPages) {
      const section = (meta[page] && meta[page].section) || 'Autres';
      if (!sectionMap[section]) sectionMap[section] = [];
      sectionMap[section].push(page);
    }
    const exerciseSections = sectionOrder
      .filter((s) => sectionMap[s])
      .map((s) => ({ title: s, links: sectionMap[s] }));
    Object.keys(sectionMap).forEach((s) => {
      if (!sectionOrder.includes(s)) exerciseSections.push({ title: s, links: sectionMap[s] });
    });
    return exerciseSections;
  }

  function startLinks() {
    return ['accueil', 'evaluations', 'regles', 'donnees', 'autoevaluation'];
  }

  function renderLink(page, sectionTitle, pageId, meta) {
    const m = meta[page] || { name: page, href: page + '.html', icon: '•' };
    const active = page === pageId ? ' active' : '';
    let statusAttr = '';
    if (window.ScoreManager && ['Numérique', 'Communication', 'Autres'].includes(sectionTitle)) {
      const status = window.ScoreManager.readMetrics(page).status;
      statusAttr = ' data-status="' + status + '"';
    }
    return '<a class="sidebar-link' + active + '" href="' + escapeHtml(m.href) + '"' + statusAttr + '>' +
      '<span class="icon">' + escapeHtml(m.icon || '•') + '</span>' +
      '<span>' + escapeHtml(m.name || page) + '</span>' +
      '</a>';
  }

  const GROUP_SECTIONS = [
    { key: 'Numérique', label: 'Numérique', id: 'numerique' },
    { key: 'Communication', label: 'Communication', id: 'communication' }
  ];

  const GROUP_ICONS = { numerique: '💻', communication: '💬' };
  const SECTION_ICONS = { 'Numérique': '💻', 'Communication': '💬', 'Autres': '📌' };

  function xpLevel(xp) {
    if (xp >= 350) return 'Niv. 4';
    if (xp >= 150) return 'Niv. 3';
    if (xp >= 50)  return 'Niv. 2';
    return 'Niv. 1';
  }

  function animateCount(el, to) {
    if (!el) return;
    const from = parseInt(el.textContent, 10) || 0;
    if (from === to) return;
    const dur = Math.min(800, Math.max(200, Math.abs(to - from) * 10));
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(from + (to - from) * ease);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function stat(fillId, pctId, icon, label, main) {
    var cls   = main ? 'hstat hstat--main' : 'hstat';
    var fCls  = main ? 'hstat-fill' : 'hstat-fill hstat-fill--' + fillId.replace('groupFill-', '');
    var init  = main ? '0 %' : '0 XP';
    return '<div class="' + cls + '">' +
      '<div class="hstat-row">' +
      (icon ? '<span class="hstat-icon">' + icon + '</span>' : '') +
      '<span class="hstat-label">' + label + '</span>' +
      '<span class="hstat-val" id="' + pctId + '">' + init + '</span>' +
      '</div>' +
      '<div class="hstat-track"><div class="' + fCls + '" id="' + fillId + '" style="width:0%"></div></div>' +
      '</div>';
  }

  function renderHeader() {
    const slot = document.getElementById('header-slot');
    if (!slot) return;
    const pageId = currentPageId();
    const meta = (window.EXERCISE_CONFIG && window.EXERCISE_CONFIG.meta) || {};
    const headerNavLinks = startLinks().map(function(page) {
      const m = meta[page] || { name: page, href: page + '.html', icon: '•' };
      const active = page === pageId ? ' active' : '';
      return '<a class="header-menu-link' + active + '" href="' + escapeHtml(m.href) + '" title="' + escapeHtml(m.name || page) + '">' +
        '<span aria-hidden="true">' + escapeHtml(m.icon || '•') + '</span>' +
        '<span>' + escapeHtml(m.name || page) + '</span>' +
        '</a>';
    }).join('');
    var groups = GROUP_SECTIONS.map(function(g) {
      return '<div class="hstat-sep"></div>' +
        stat('groupFill-' + g.id, 'groupPct-' + g.id, GROUP_ICONS[g.id] || '', g.label, false);
    }).join('');
    slot.innerHTML =
      '<header class="header">' +
        '<div class="header-row1">' +
          '<a href="accueil.html" class="header-logo">' +
            '<span class="header-logo-icon"></span>' +
            '<span>Autonomie numerique</span>' +
          '</a>' +
          '<div class="hxp" id="headerXpBadge">' +
            '<span class="hxp-star">⭐</span>' +
            '<strong class="hxp-n" id="headerXpTotal">0</strong>' +
            '<span class="hxp-u">XP</span>' +
            '<span class="hxp-div"></span>' +
            '<span class="hxp-lvl" id="headerXpLevel">Niv. 1</span>' +
          '</div>' +
          '<div class="header-right">' +
            '<nav class="header-nav" aria-label="Accueil et suivi">' +
              headerNavLinks +
            '</nav>' +
            '<button class="sidebar-toggle" id="sidebarToggle" type="button" aria-label="Ouvrir les activités" title="Activités">☰</button>' +
          '</div>' +
        '</div>' +
        '<div class="header-row2">' +
          stat('headerProgressFill', 'headerProgressText', '', 'Ma progression', true) +
          groups +
        '</div>' +
      '</header>';
  }

  function renderSidebar() {
    const slot = document.getElementById('sidebar-slot');
    if (!slot) return;
    const pageId = currentPageId();
    const meta = (window.EXERCISE_CONFIG && window.EXERCISE_CONFIG.meta) || {};

    const parts = ['<aside class="sidebar" id="sidebar">'];
    const exerciseSections = sectionedLinks();

    parts.push(
      '<div class="sidebar-heading">' +
      '<strong>Activités</strong>' +
      '<span>Choisissez un exercice</span>' +
      '</div>'
    );

    parts.push('<div class="sidebar-section-list sidebar-activity-groups">');

    for (const section of exerciseSections) {
      const activeGroup = section.links.includes(pageId) ? ' active-group' : '';
      parts.push('<section class="sidebar-section sidebar-group' + activeGroup + '">');
      parts.push(
        '<div class="sidebar-section-title sidebar-group-title">' +
        '<span><span class="sidebar-section-icon" aria-hidden="true">' + escapeHtml(SECTION_ICONS[section.title] || '📌') + '</span>' + escapeHtml(section.title) + '</span>' +
        '</div>'
      );
      parts.push('<div class="sidebar-section-list">');
      for (const page of section.links) {
        parts.push(renderLink(page, section.title, pageId, meta));
      }
      parts.push('</div>');
      parts.push('</section>');
    }
    parts.push('</div>');

    const apps = (window.EXERCISE_CONFIG && window.EXERCISE_CONFIG.apps) || [];
    if (apps.length > 0) {
      const activeApps = apps.some(function(app) {
        return ('/' + app.href).endsWith('/' + pageId + '.html');
      }) ? ' active-group' : '';
      parts.push('<section class="sidebar-section sidebar-group' + activeApps + '">');
      parts.push(
        '<div class="sidebar-section-title sidebar-group-title">' +
        '<span><span class="sidebar-section-icon" aria-hidden="true">✦</span>Applications</span>' +
        '</div>'
      );
      parts.push('<div class="sidebar-section-list">');
      for (const app of apps) {
        const activeApp = ('/' + app.href).endsWith('/' + pageId + '.html') ? ' active' : '';
        parts.push(
          '<a class="sidebar-link' + activeApp + '" href="' + app.href + '">' +
          '<span class="icon">' + (app.icon || '•') + '</span>' +
          '<span>' + app.name + '</span>' +
          '</a>'
        );
      }
      parts.push('</div>');
      parts.push('</section>');
    }

    parts.push('</aside>');
    slot.innerHTML = parts.join('');
  }

  function renderFooter() {
    const slot = document.getElementById('footer-slot');
    if (!slot) return;
    slot.innerHTML = [
      '<footer class="footer">',
      '  <span>Plateforme simple pour apprendre pas a pas</span>',
      '  <span>Vos résultats restent sur cet appareil</span>',
      '</footer>'
    ].join('');
  }

  function renderGameBrief() {
    if (!window.EXERCISE_CONFIG) return;
    const pageId = currentPageId();
    const config = window.EXERCISE_CONFIG;
    const orderedPages = config.orderedPages || [];
    const meta = config.meta || {};
    const pageMeta = meta[pageId];
    const details = pageMeta && pageMeta.details;
    if (!details || !orderedPages.includes(pageId) || document.querySelector('.game-brief')) return;

    const header = document.querySelector('.page-header');
    const container = document.querySelector('.main .container');
    if (!header || !container) return;

    const xpRule = config.xpRules && config.xpRules.byPage && config.xpRules.byPage[pageId];
    const themes = Array.isArray(pageMeta.themes) ? pageMeta.themes.slice(0, 4) : [];
    const section = pageMeta.section || 'Activite';
    const summary = details.summary || '';
    const objective = details.objective || '';
    const practice = details.practice || '';
    const useWhen = details.useWhen || '';

    const brief = document.createElement('section');
    brief.className = 'game-brief fade-up delay-1';
    brief.setAttribute('aria-label', 'Repères de l activité');
    brief.innerHTML = [
      '<div class="game-brief-main">',
      '  <div class="game-brief-line">',
      '    <span class="game-brief-eyebrow">' + escapeHtml(section) + '</span>',
      '    <h2>' + escapeHtml(summary) + '</h2>',
      '  </div>',
      '  <div class="game-brief-tags" aria-label="Thèmes">' + themes.map(function(theme) {
        return '<span>' + escapeHtml(theme) + '</span>';
      }).join('') + '</div>',
      '</div>',
      '<details class="game-brief-more">',
      '  <summary>Voir les détails</summary>',
      '  <dl class="game-brief-grid">',
      '    <div><dt>Objectif</dt><dd>' + escapeHtml(objective) + '</dd></div>',
      '    <div><dt>Travaille</dt><dd>' + escapeHtml(practice) + '</dd></div>',
      '    <div><dt>Moment utile</dt><dd>' + escapeHtml(useWhen) + '</dd></div>',
      xpRule ? '    <div><dt>Points</dt><dd>' + escapeHtml(xpRule) + '</dd></div>' : '',
      '  </dl>',
      '</details>'
    ].join('');

    header.insertAdjacentElement('afterend', brief);
  }

  function boostExerciseContent() {
    if (window.__AH_CONTENT_200H_BOOSTED) return;
    window.__AH_CONTENT_200H_BOOSTED = true;

    const themes = [
      {
        theme: 'emploi',
        category: 'Emploi',
        terms: [
          ['Badge', 'Carte utilisée pour entrer au travail'],
          ['Planning', 'Tableau avec les horaires de travail'],
          ['Responsable', 'Personne qui organise le travail de l’équipe'],
          ['Consigne', 'Instruction à suivre pendant le travail'],
          ['Pause', 'Moment de repos prévu dans la journée'],
          ['Sécurité', 'Règles pour éviter les accidents'],
          ['Contrat', 'Document signé pour le travail'],
          ['Salaire', 'Argent reçu pour le travail']
        ],
        sentences: [
          'Je note mes horaires avant de commencer.',
          'Je demande une explication si la consigne n’est pas claire.',
          'Je garde mon badge dans mon sac.',
          'Je préviens mon responsable en cas de retard.',
          'Je respecte les règles de sécurité au travail.'
        ]
      },
      {
        theme: 'orp',
        category: 'ORP',
        terms: [
          ['Convocation', 'Message qui demande de venir à un rendez-vous'],
          ['Conseiller', 'Personne qui accompagne la recherche d’emploi'],
          ['Preuve', 'Document qui montre une démarche effectuée'],
          ['Délai', 'Date limite à respecter'],
          ['Postulation', 'Candidature envoyée à un employeur'],
          ['Attestation', 'Document officiel qui confirme une information'],
          ['Dossier', 'Ensemble de documents classés'],
          ['Recherche', 'Action de chercher un emploi']
        ],
        sentences: [
          'Je classe mes preuves de recherche d’emploi.',
          'Je respecte le délai indiqué dans le message.',
          'Je prépare mes documents avant le rendez-vous ORP.',
          'Je réponds poliment à mon conseiller.',
          'Je note la date de la prochaine convocation.'
        ]
      },
      {
        theme: 'numérique',
        category: 'Numérique',
        terms: [
          ['Fichier', 'Document enregistré sur l’ordinateur'],
          ['Dossier', 'Endroit où ranger des fichiers'],
          ['Mot de passe', 'Code secret pour se connecter'],
          ['Télécharger', 'Recevoir un fichier depuis internet'],
          ['Sauvegarder', 'Enregistrer pour ne pas perdre'],
          ['Pièce jointe', 'Fichier ajouté à un e-mail'],
          ['Scanner', 'Transformer un document papier en fichier'],
          ['Déconnexion', 'Action de quitter un compte en sécurité']
        ],
        sentences: [
          'Je sauvegarde mon document avant de fermer la fenêtre.',
          'Je vérifie la pièce jointe avant d’envoyer l’e-mail.',
          'Je choisis un mot de passe difficile à deviner.',
          'Je range mon fichier dans le bon dossier.',
          'Je me déconnecte après avoir utilisé un ordinateur public.'
        ]
      },
      {
        theme: 'santé',
        category: 'Santé',
        terms: [
          ['Ordonnance', 'Document du médecin pour obtenir des médicaments'],
          ['Pharmacie', 'Lieu où acheter des médicaments'],
          ['Assuré', 'Personne couverte par une assurance'],
          ['Franchise', 'Montant payé avant le remboursement'],
          ['Urgences', 'Service pour les cas graves'],
          ['Cabinet', 'Lieu de consultation du médecin'],
          ['Certificat', 'Document médical qui justifie une absence'],
          ['Rendez-vous', 'Moment fixé pour consulter']
        ],
        sentences: [
          'J’apporte ma carte d’assuré au rendez-vous.',
          'Je montre mon ordonnance à la pharmacie.',
          'Je demande un certificat médical si mon employeur en a besoin.',
          'Je téléphone au cabinet pour déplacer mon rendez-vous.',
          'En cas d’urgence médicale, j’appelle le 144.'
        ]
      },
      {
        theme: 'logement',
        category: 'Logement',
        terms: [
          ['Bail', 'Contrat de location'],
          ['Loyer', 'Somme payée chaque mois pour habiter'],
          ['Caution', 'Garantie versée au début de la location'],
          ['Gérance', 'Société qui gère l’immeuble'],
          ['Locataire', 'Personne qui loue un logement'],
          ['Réparation', 'Action de corriger un dégât'],
          ['État des lieux', 'Contrôle du logement à l’entrée ou à la sortie'],
          ['Charges', 'Frais liés au logement']
        ],
        sentences: [
          'Je contacte la gérance si le chauffage ne fonctionne plus.',
          'Je relis le bail avant de le signer.',
          'Je garde une copie de l’état des lieux.',
          'Je paie mon loyer chaque mois à la date prévue.',
          'Je prends une photo du dégât avant d’écrire à la gérance.'
        ]
      },
      {
        theme: 'transports',
        category: 'Transports',
        terms: [
          ['Horaire', 'Heure de départ ou d’arrivée'],
          ['Billet', 'Titre pour voyager'],
          ['Quai', 'Endroit où attendre le train'],
          ['Correspondance', 'Changement de transport'],
          ['Arrêt', 'Endroit où attendre le bus'],
          ['Zone', 'Partie du réseau de transport'],
          ['Itinéraire', 'Chemin prévu pour aller quelque part'],
          ['Retard', 'Arrivée après l’heure prévue']
        ],
        sentences: [
          'Je vérifie l’horaire avant de partir.',
          'J’achète mon billet avant de monter dans le train.',
          'Je cherche le bon quai à la gare.',
          'Je préviens si je risque d’arriver en retard.',
          'Je prépare mon itinéraire la veille du rendez-vous.'
        ]
      },
      {
        theme: 'numérique',
        category: 'Banque',
        terms: [
          ['IBAN', 'Numéro de compte bancaire'],
          ['Virement', 'Transfert d’argent entre deux comptes'],
          ['Facture', 'Document qui indique une somme à payer'],
          ['Solde', 'Argent disponible sur le compte'],
          ['Relevé', 'Document qui liste les opérations du compte'],
          ['Code PIN', 'Code secret d’une carte bancaire'],
          ['Paiement', 'Action de payer une somme'],
          ['Fraude', 'Tentative d’arnaque']
        ],
        sentences: [
          'Je vérifie le montant avant de payer la facture.',
          'Je ne donne jamais mon code PIN.',
          'Je contrôle mon relevé de compte chaque mois.',
          'Je copie l’IBAN sans oublier de chiffres.',
          'Je signale un e-mail bancaire suspect.'
        ]
      }
    ];

    const pushMany = (arrayName, items) => {
      if (Array.isArray(window[arrayName])) window[arrayName].push(...items);
    };

    const cleanWord = (value) => value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^A-Za-z]/g, '')
      .toUpperCase();

    // Vocabulaire et orthographe.
    pushMany('ANAGRAMME_DATA', themes.flatMap((group) => group.terms.map(([term, def]) => ({
      word: cleanWord(term),
      hint: def,
      category: group.category,
      difficulty: cleanWord(term).length > 8 ? 'hard' : cleanWord(term).length > 5 ? 'medium' : 'easy',
      theme: group.theme
    }))));

    pushMany('PENDU_DATA', themes.flatMap((group) => group.terms.map(([term, def]) => ({
      word: cleanWord(term),
      hint: def,
      category: group.category,
      difficulty: cleanWord(term).length > 8 ? 'hard' : cleanWord(term).length > 5 ? 'medium' : 'easy',
      theme: group.theme
    }))));

    pushMany('DEMELER_DATA', themes.flatMap((group) => group.sentences.map((text, index) => ({
      cat: group.category,
      difficulty: index < 2 ? 'easy' : 'medium',
      theme: group.theme,
      text
    }))));

    pushMany('APPARIER_DATA', themes.map((group) => ({
      category: group.category + ' - série longue',
      difficulty: 'medium',
      theme: group.theme,
      pairs: group.terms.slice(0, 5).map(([term, def]) => ({ term, def }))
    })));

    if (Array.isArray(window.PAIRE_DATA)) {
      themes.forEach((group) => {
        group.terms.slice(0, 4).forEach(([term, def]) => {
          window.PAIRE_DATA.push({
            category: group.category,
            difficulty: 'medium',
            theme: group.theme,
            isPair: true,
            card1: { emoji: '📌', text: term },
            card2: { emoji: '💬', text: def },
            explication: term + ' correspond à cette définition.'
          });
        });
      });
    }

    // Lecture, choix et compréhension.
    pushMany('QUIZ_DATA', themes.flatMap((group) => group.terms.slice(0, 6).map(([term, def], index) => ({
      category: group.category,
      difficulty: index < 2 ? 'easy' : 'medium',
      theme: group.theme,
      question: 'Que signifie "' + term + '" ?',
      choices: [
        def,
        'Un moyen de transport',
        'Une réponse sans rapport avec la démarche',
        'Un objet personnel sans importance'
      ],
      answer: 0,
      explication: '"' + term + '" signifie: ' + def.toLowerCase() + '.'
    }))));

    pushMany('VRAI_FAUX_DATA', themes.flatMap((group) => group.sentences.map((text, index) => ({
      category: group.category,
      difficulty: index < 2 ? 'easy' : 'medium',
      theme: group.theme,
      statement: text,
      answer: true,
      explication: 'Cette phrase décrit une bonne pratique dans le thème ' + group.category.toLowerCase() + '.'
    }))));

    pushMany('COMPLETER_DATA', themes.flatMap((group) => group.terms.slice(0, 5).map(([term, def]) => ({
      category: group.category,
      difficulty: cleanWord(term).length > 7 ? 'medium' : 'easy',
      theme: group.theme,
      text: 'Dans cette situation, le mot important est ___ .',
      answer: term.toLowerCase(),
      choices: [
        term.toLowerCase(),
        'billet',
        'couleur',
        'vacances'
      ],
      hint: def + '.'
    }))));

    if (window.CLAVIER_DATA && typeof window.CLAVIER_DATA === 'object') {
      const allSentences = themes.flatMap((group) => group.sentences);
      window.CLAVIER_DATA.debutant = (window.CLAVIER_DATA.debutant || []).concat(allSentences.slice(0, 14));
      window.CLAVIER_DATA.intermediaire = (window.CLAVIER_DATA.intermediaire || []).concat(allSentences.slice(14, 32));
      window.CLAVIER_DATA.avance = (window.CLAVIER_DATA.avance || []).concat(allSentences.slice(32));
    }

    if (Array.isArray(window.ALPHABET_DATA)) {
      themes.forEach((group) => {
        window.ALPHABET_DATA.push({
          words: group.terms.map(([term]) => term).slice(0, 8),
          difficulty: 'medium',
          theme: group.theme
        });
      });
    }

    // Tri et ordre logique.
    pushMany('TRIER_DATA', themes.slice(0, 6).map((group) => ({
      theme: group.category + ' - vocabulaire',
      difficulty: 'medium',
      topic: group.theme,
      groups: [
        { label: 'Mots importants', emoji: '📌', items: group.terms.slice(0, 4).map(([term]) => term) },
        { label: 'Actions utiles', emoji: '✅', items: group.sentences.slice(0, 4).map((text) => text.split(' ').slice(0, 4).join(' ')) },
        { label: 'Documents ou preuves', emoji: '📄', items: group.terms.slice(4, 8).map(([term]) => term) },
        { label: 'À vérifier', emoji: '🔎', items: ['Date', 'Heure', 'Adresse', 'Signature'] }
      ]
    })));

    pushMany('CLASSEMENT_DATA', [
      { category: 'Numérique', difficulty: 'medium', theme: 'numérique', question: 'Envoyer un fichier demandé', label: 'Dans l’ordre logique', items: ['Trouver le fichier', 'Vérifier son nom', 'Ouvrir l’e-mail', 'Joindre le fichier', 'Relire puis envoyer'] },
      { category: 'Emploi', difficulty: 'medium', theme: 'emploi', question: 'Préparer son premier jour', label: 'Dans l’ordre logique', items: ['Vérifier l’horaire', 'Préparer ses documents', 'Arriver à l’heure', 'Écouter les consignes', 'Noter les informations utiles'] },
      { category: 'Santé', difficulty: 'medium', theme: 'santé', question: 'Reporter un rendez-vous médical', label: 'Dans l’ordre logique', items: ['Appeler le cabinet', 'Dire son nom', 'Expliquer la demande', 'Noter la nouvelle date', 'Remercier'] },
      { category: 'Logement', difficulty: 'medium', theme: 'logement', question: 'Signaler un dégât', label: 'Dans l’ordre logique', items: ['Observer le problème', 'Prendre une photo', 'Écrire à la gérance', 'Proposer ses disponibilités', 'Garder une copie du message'] }
    ]);

    // Chercher, cliquer et glisser.
    if (Array.isArray(window.CHERCHE_CLIQUE_DATA)) {
      themes.forEach((group) => {
        group.terms.slice(0, 3).forEach(([term]) => {
          const id = cleanWord(group.category + term).toLowerCase();
          window.CHERCHE_CLIQUE_DATA.push({
            id,
            icon: group.category === 'Santé' ? '🩺' : group.category === 'Logement' ? '🏠' : group.category === 'Banque' ? '🏦' : '📌',
            label: term,
            category: group.category,
            difficulty: 'medium',
            theme: group.theme
          });
        });
      });
    }

    if (window.CLIQUER_DATA && Array.isArray(window.CLIQUER_DATA.dragItems)) {
      const catByTheme = {
        emploi: 'emploi',
        orp: 'emploi',
        numérique: 'banque',
        santé: 'sante',
        logement: 'logement',
        transports: 'transport'
      };
      themes.forEach((group) => {
        group.terms.slice(0, 3).forEach(([term]) => {
          window.CLIQUER_DATA.dragItems.push({ label: '📌 ' + term, cat: catByTheme[group.theme] || 'action' });
        });
      });
    }
  }

  function updateHeaderProgress() {
    if (!window.ScoreManager || !window.EXERCISE_CONFIG) return;
    const meta = window.EXERCISE_CONFIG.meta || {};
    const orderedPages = window.EXERCISE_CONFIG.orderedPages || [];

    // Global progress
    const summary = window.ScoreManager.getGlobalSummary(orderedPages);
    const total = orderedPages.length || 1;
    const pct = Math.round((summary.completed / total) * 100);
    const text = document.getElementById('headerProgressText');
    const fill = document.getElementById('headerProgressFill');
    if (text) text.textContent = pct + ' %';
    if (fill) fill.style.width = pct + '%';

    // Per-group XP
    const groupXp = {};
    for (const page of orderedPages) {
      const section = meta[page] && meta[page].section;
      if (!section) continue;
      const metrics = window.ScoreManager.readMetrics(page);
      groupXp[section] = (groupXp[section] || 0) + (Number(metrics.xp) || 0);
    }
    const maxGroupXp = Math.max(1, ...GROUP_SECTIONS.map(function(g) { return groupXp[g.key] || 0; }));

    // Total XP + level badge
    const totalXp = GROUP_SECTIONS.reduce(function(sum, g) { return sum + (groupXp[g.key] || 0); }, 0);
    const xpEl   = document.getElementById('headerXpTotal');
    const levelEl = document.getElementById('headerXpLevel');
    const chip    = document.getElementById('headerXpBadge');
    animateCount(xpEl, totalXp);
    if (levelEl) levelEl.textContent = xpLevel(totalXp);
    if (chip && totalXp > 0) {
      chip.classList.remove('xp-pulse');
      void chip.offsetWidth;
      chip.classList.add('xp-pulse');
    }

    for (const g of GROUP_SECTIONS) {
      const xp = groupXp[g.key] || 0;
      const gPct = Math.round((xp / maxGroupXp) * 100);
      const gText = document.getElementById('groupPct-' + g.id);
      const gFill = document.getElementById('groupFill-' + g.id);
      if (gText) gText.textContent = xp + ' XP';
      if (gFill) gFill.style.width = gPct + '%';
    }
  }

  function initSidebarToggle() {
    const btn = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    if (!btn || !sidebar) return;
    btn.addEventListener('click', () => {
      const open = sidebar.classList.toggle('open');
      btn.classList.toggle('active', open);
      try {
        localStorage.setItem('ah:sidebar-open:v1', open ? '1' : '0');
      } catch (_) {}
    });
  }

  function initSidebarPersistence() {
    const sidebar = document.getElementById('sidebar');
    const btn = document.getElementById('sidebarToggle');
    if (!sidebar) return;

    try {
      const savedTop = Number(localStorage.getItem('ah:sidebar-scroll:v1')) || 0;
      if (savedTop > 0) sidebar.scrollTop = savedTop;

      const savedOpen = localStorage.getItem('ah:sidebar-open:v1') === '1';
      if (savedOpen) {
        sidebar.classList.add('open');
        if (btn) btn.classList.add('active');
      }
    } catch (_) {}

    let scrollTimer = null;
    sidebar.addEventListener('scroll', () => {
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        try {
          localStorage.setItem('ah:sidebar-scroll:v1', String(sidebar.scrollTop));
        } catch (_) {}
      }, 80);
    });

    sidebar.addEventListener('click', (event) => {
      const link = event.target.closest && event.target.closest('a.sidebar-link');
      if (!link) return;
      try {
        localStorage.setItem('ah:sidebar-scroll:v1', String(sidebar.scrollTop));
        localStorage.setItem('ah:sidebar-open:v1', sidebar.classList.contains('open') ? '1' : '0');
      } catch (_) {}
    });
  }

  function initFocusMode() {
    const storageKey = 'ah:focus-mode:v1';
    let btn = document.getElementById('focusModeToggle');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'focusModeToggle';
      btn.className = 'focus-mode-toggle';
      btn.type = 'button';
      document.body.appendChild(btn);
    }

    function readEnabled() {
      try {
        return localStorage.getItem(storageKey) === '1';
      } catch (_) {
        return false;
      }
    }

    function writeEnabled(enabled) {
      try {
        localStorage.setItem(storageKey, enabled ? '1' : '0');
      } catch (_) {}
    }

    function applyState(enabled) {
      document.body.classList.toggle('focus-mode', enabled);
      btn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
      btn.setAttribute('aria-label', enabled ? 'Désactiver le mode focus' : 'Activer le mode focus');
      btn.innerHTML = enabled
        ? '<span aria-hidden="true">●</span><strong>Focus actif</strong>'
        : '<span aria-hidden="true">◎</span><strong>Focus</strong>';
    }

    applyState(readEnabled());
    btn.addEventListener('click', () => {
      const enabled = !document.body.classList.contains('focus-mode');
      writeEnabled(enabled);
      applyState(enabled);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    boostExerciseContent();
    enableAccessibleMode();
    renderHeader();
    renderSidebar();
    renderFooter();
    updateHeaderProgress();
    initSidebarToggle();
    initSidebarPersistence();
    initFocusMode();

    document.addEventListener('score:updated', () => {
      updateHeaderProgress();
      renderSidebar();
    });
  });
})();
