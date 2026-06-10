'use strict';

(function initFocusMode() {
  const STORAGE_KEY = 'ah:focus-mode:v1';
  const ACTIVE_CLASS = 'focus-mode';

  function readEnabled() {
    try {
      return localStorage.getItem(STORAGE_KEY) === '1';
    } catch (_) {
      return false;
    }
  }

  function writeEnabled(enabled) {
    try {
      localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0');
    } catch (_) {}
  }

  function ensureButton() {
    let button = document.getElementById('focusModeToggle');
    if (button) return button;

    button = document.createElement('button');
    button.id = 'focusModeToggle';
    button.className = 'focus-mode-toggle';
    button.type = 'button';
    button.setAttribute('aria-pressed', 'false');
    button.setAttribute('aria-label', 'Activer le mode focus');
    button.innerHTML = '<span aria-hidden="true">◎</span><strong>Focus</strong>';
    document.body.appendChild(button);
    return button;
  }

  function syncButton(button, enabled) {
    button.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    button.setAttribute('aria-label', enabled ? 'Désactiver le mode focus' : 'Activer le mode focus');
    button.innerHTML = enabled
      ? '<span aria-hidden="true">●</span><strong>Focus actif</strong>'
      : '<span aria-hidden="true">◎</span><strong>Focus</strong>';
  }

  function applyState(enabled) {
    document.body.classList.toggle(ACTIVE_CLASS, enabled);
    const button = ensureButton();
    syncButton(button, enabled);
  }

  document.addEventListener('DOMContentLoaded', function () {
    const button = ensureButton();
    applyState(readEnabled());

    button.addEventListener('click', function () {
      const enabled = !document.body.classList.contains(ACTIVE_CLASS);
      writeEnabled(enabled);
      applyState(enabled);
    });
  });
})();
