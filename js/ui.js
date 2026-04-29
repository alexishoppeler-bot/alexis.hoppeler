'use strict';

(function initUIHelpers() {
  function getText(id) {
    const el = document.getElementById(id);
    return el ? el.textContent.trim() : '';
  }

  function parseIntSafe(v) {
    const n = parseInt((v || '').replace(/[^0-9-]/g, ''), 10);
    return Number.isFinite(n) ? n : 0;
  }

  function bindShareButtons() {
    const buttons = document.querySelectorAll('.btn-share');
    if (!buttons.length || typeof copyResultSummary !== 'function') return;

    const pageTitle = (document.querySelector('h1') && document.querySelector('h1').textContent.trim()) || 'Exercice';
    const stats = {
      correct: parseIntSafe(getText('resCorrect')),
      errors: parseIntSafe(getText('resErrors')),
      xp: parseIntSafe(getText('resXP')),
      accuracy: parseIntSafe(getText('resAccuracy'))
    };

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => copyResultSummary(pageTitle, stats));
    });
  }

  document.addEventListener('DOMContentLoaded', bindShareButtons);
})();
