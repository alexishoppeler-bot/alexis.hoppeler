'use strict';

(function initSharedLayout() {
  function enableAccessibleMode() {
    if (!document.body) return;
    document.body.classList.add('accessible-ui');
  }

  function currentPageId() {
    const file = window.location.pathname.split('/').pop() || '';
    return file.replace(/\.html$/i, '') || 'accueil';
  }

  function sectionedLinks() {
    const orderedPages = (window.EXERCISE_CONFIG && window.EXERCISE_CONFIG.orderedPages) || [];
    const meta = (window.EXERCISE_CONFIG && window.EXERCISE_CONFIG.meta) || {};
    const sectionOrder = ['Bureautique', 'Recherche d\'emploi', 'Français'];
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
    return [
      { title: 'Debut', links: ['accueil', 'evaluations', 'regles', 'donnees', 'autoevaluation'] },
      ...exerciseSections
    ];
  }

  const GROUP_SECTIONS = [
    { key: 'Numérique',   label: 'Bureautique', id: 'numerique'  },
    { key: 'Emploi & ORP', label: 'Emploi',    id: 'emploi'     },
    { key: 'Français',    label: 'Français',    id: 'francais'   }
  ];

  const GROUP_ICONS = { numerique: '💻', emploi: '💼', francais: '📖' };

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
            '<button class="sidebar-toggle" id="sidebarToggle" type="button" aria-label="Menu">☰</button>' +
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
    for (const section of sectionedLinks()) {
      parts.push('<div class="sidebar-section">');
      parts.push('<div class="sidebar-section-title">' + section.title + '</div>');
      for (const page of section.links) {
        const m = meta[page] || { name: page, href: page + '.html', icon: '•' };
        const active = page === pageId ? ' active' : '';
        let statusAttr = '';
        if (window.ScoreManager && ['Bureautique', 'Recherche d\'emploi', 'Français', 'Autres'].includes(section.title)) {
          const status = window.ScoreManager.readMetrics(page).status;
          statusAttr = ' data-status="' + status + '"';
        }
        parts.push(
          '<a class="sidebar-link' + active + '" href="' + m.href + '"' + statusAttr + '>' +
          '<span class="icon">' + (m.icon || '•') + '</span>' +
          '<span>' + (m.name || page) + '</span>' +
          '</a>'
        );
      }
      parts.push('</div>');
    }
    const apps = (window.EXERCISE_CONFIG && window.EXERCISE_CONFIG.apps) || [];
    if (apps.length > 0) {
      parts.push('<div class="sidebar-section">');
      parts.push('<div class="sidebar-section-title">Applications</div>');
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
      '  <span>Vos resultats restent sur cet appareil</span>',
      '</footer>'
    ].join('');
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
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    enableAccessibleMode();
    renderHeader();
    renderSidebar();
    renderFooter();
    updateHeaderProgress();
    initSidebarToggle();

    document.addEventListener('score:updated', () => {
      updateHeaderProgress();
      renderSidebar();
    });
  });
})();
