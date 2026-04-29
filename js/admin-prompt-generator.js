(function () {
  function inferWorkspacePath() {
    if (window.location.protocol !== 'file:') return '';
    let pathname = decodeURIComponent(window.location.pathname || '').replace(/\\/g, '/');
    if (/^\/[A-Za-z]:\//.test(pathname)) pathname = pathname.slice(1);
    return pathname.replace(/\/admin\/prompt-generator\.html$/i, '');
  }

  const pathValue = inferWorkspacePath() || '[chemin-projet-a-remplacer]';
  const HISTORY_KEY = 'prompt_generator_history_v1';
  const DRAFT_KEY = 'prompt_generator_draft_v1';
  const HISTORY_MAX_ITEMS = 10;

  const $ = (id) => document.getElementById(id);

  function getCheckedValues(containerId) {
    return [...document.querySelectorAll(`#${containerId} input[type="checkbox"]:checked`)]
      .map((el) => el.value);
  }

  function listOrDefault(raw, fallback) {
    const seen = new Set();
    const parts = raw
      .split(/[,\n;]+/)
      .map((s) => s.trim())
      .filter(Boolean)
      .filter((item) => {
        const key = item.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    return parts.length ? parts : [fallback];
  }

  function normalizeSentence(text) {
    return text.replace(/\s+/g, ' ').trim();
  }

  function escapeHTML(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function inferScopeLevel(values) {
    let wildcardCount = 0;
    let rootCount = 0;
    values.forEach((value) => {
      if (/[*?]/.test(value)) wildcardCount += 1;
      if (/^(games|js|css)\/\*\.(html|js|css)$/i.test(value)) rootCount += 1;
    });
    if (rootCount >= 2 || wildcardCount >= 3) return 'large';
    if (wildcardCount >= 1) return 'medium';
    return 'focused';
  }

  function defaultWorkTypesForMode(mode) {
    if (mode === 'review') {
      return [
        'Verifier et executer des tests locaux',
        'Expliquer les changements avec references de fichiers'
      ];
    }
    if (mode === 'plan') {
      return [
        'Modifier des fichiers existants',
        'Mettre a jour la logique JS',
        'Expliquer les changements avec references de fichiers'
      ];
    }
    return [
      'Modifier des fichiers existants',
      'Ajouter de nouveaux fichiers',
      'Modifier le contenu (textes, labels, messages)',
      'Mettre a jour la logique JS',
      'Creer ou enrichir des donnees dans js/data',
      'Expliquer les changements avec references de fichiers'
    ];
  }

  function setWorkTypes(values) {
    const wanted = new Set(values);
    document.querySelectorAll('#workTypes input[type="checkbox"]').forEach((check) => {
      check.checked = wanted.has(check.value);
    });
  }

  function debounce(fn, waitMs) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), waitMs);
    };
  }

  function applyCompleteRevisionPreset() {
    $('goal').value = 'Automatiser au maximum la revision complete du dossier: nettoyer, modifier et supprimer si necessaire.';
    $('pages').value = 'games/*.html';
    $('scripts').value = 'js/*.js';
    $('dataFiles').value = 'js/data/*.js';
    $('styles').value = 'css/*.css';
    $('deleteTargets').value = '';
    $('addTargets').value = '';
    $('updateTargets').value = '';
    $('contentChanges').value = '';
    $('constraints').value = 'Conserver le comportement actuel, eviter les regressions et garder un code lisible.';
    $('acceptance').value = 'Coherence config/pages/scripts, zero erreur JS, et bilan complet des fichiers modifies/supprimes.';
    $('mode').value = 'review';
    setWorkTypes([
      'Modifier des fichiers existants',
      'Ajouter de nouveaux fichiers',
      'Modifier le contenu (textes, labels, messages)',
      'Mettre a jour la logique JS',
      'Creer ou enrichir des donnees dans js/data',
      'Ameliorer UX/UI responsive',
      'Nettoyer ou refactoriser du code',
      'Verifier et executer des tests locaux',
      'Expliquer les changements avec references de fichiers'
    ]);
    setStatus('Preset revision complete applique.', 'ok');
  }

  function applyPlatformAutomationPreset() {
    $('goal').value = 'Automatiser la maintenance de la plateforme: modifier, ajouter et supprimer les fichiers necessaires pour garder une base propre et coherente.';
    $('pages').value = 'games/*.html';
    $('scripts').value = 'js/*.js';
    $('dataFiles').value = 'js/data/*.js';
    $('styles').value = 'css/*.css';
    $('deleteTargets').value = 'games/generateur-cv/generateur-cv (1).html';
    $('addTargets').value = 'games/nouveau-module.html, js/nouveau-module.js, css/pages/nouveau-module.css';
    $('updateTargets').value = 'games/accueil.html, js/exercises-config.js, admin/revision-complete.mjs';
    $('contentChanges').value = "Uniformiser les intitules, clarifier les consignes, ameliorer les messages de statut et harmoniser les textes d interface.";
    $('constraints').value = 'Ne supprimer que des fichiers obsoletes verifies, mettre a jour les references impactees et ne pas casser le parcours utilisateur.';
    $('acceptance').value = 'Plateforme coherente: references valides, fichiers inutiles supprimes, nouvelles additions integrees, verification globale OK.';
    $('mode').value = 'execute';
    setWorkTypes([
      'Modifier des fichiers existants',
      'Ajouter de nouveaux fichiers',
      'Modifier le contenu (textes, labels, messages)',
      'Mettre a jour la logique JS',
      'Creer ou enrichir des donnees dans js/data',
      'Nettoyer ou refactoriser du code',
      'Verifier et executer des tests locaux',
      'Expliquer les changements avec references de fichiers'
    ]);
    setStatus('Preset automatisation plateforme applique.', 'ok');
  }

  function modeInstruction(mode) {
    if (mode === 'plan') return 'Commence par un plan court (3 a 6 etapes), puis execute les modifications sans attendre ma validation.';
    if (mode === 'review') return 'Adopte un mode review en priorite: liste bugs/risques/regressions, puis corrige ce qui est necessaire.';
    return 'Execute directement les modifications dans les fichiers, puis verifie le resultat.';
  }

  function isAutoMaxEnabled() {
    return $('autoMax') && $('autoMax').checked;
  }

  function applyAutoDefaults() {
    if (!isAutoMaxEnabled()) return;
    if (!$('goal').value.trim()) $('goal').value = 'Automatiser au maximum la maintenance de la plateforme avec modifications, ajouts, suppressions controlees et verification finale.';
    if (!$('pages').value.trim()) $('pages').value = 'games/*.html';
    if (!$('scripts').value.trim()) $('scripts').value = 'js/*.js';
    if (!$('dataFiles').value.trim()) $('dataFiles').value = 'js/data/*.js';
    if (!$('styles').value.trim()) $('styles').value = 'css/*.css';
    if (!$('constraints').value.trim()) $('constraints').value = 'Preserver les comportements existants, minimiser les regressions et garder un code lisible.';
    if (!$('acceptance').value.trim()) $('acceptance').value = 'Verification globale OK, references valides et bilan des changements.';
    if (getCheckedValues('workTypes').length === 0) setWorkTypes(defaultWorkTypesForMode($('mode').value));
  }

  function readHistory() {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch { return []; }
  }

  function writeHistory(items) {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0, HISTORY_MAX_ITEMS)));
  }

  function readDraft() {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }

  function writeDraft(state) {
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(state)); } catch { /* quota */ }
  }

  function computeQualityScore(payload) {
    let score = 0;
    if (payload.goal) score += 25;
    if (payload.scopeValuesCount >= 4) score += 15;
    if (payload.selectedTypesCount >= 4) score += 10;
    if (payload.constraints) score += 15;
    if (payload.acceptance) score += 15;
    if (payload.hasContentType && payload.contentChanges) score += 10;
    if (!payload.hasContentType) score += 5;
    if (payload.hasDeletionType && payload.deleteTargetsCount > 0) score += 5;
    if (!payload.hasDeletionType) score += 5;
    if (payload.mode === 'review' || payload.mode === 'plan') score += 5;
    return Math.max(0, Math.min(100, score));
  }

  function updateQualityScore(score) {
    $('qualityScore').textContent = `${score}/100`;
    const bar = $('qualityBar');
    if (!bar) return;
    bar.style.width = `${score}%`;
    bar.style.background = score >= 70 ? '#22c55e' : score >= 40 ? '#f59e0b' : '#ef4444';
  }

  function updateOutputCounter() {
    const el = $('outputCounter');
    if (!el) return;
    const len = ($('output').value || '').length;
    el.textContent = len === 0 ? '0 caractere' : `${len.toLocaleString('fr-CH')} caracteres`;
  }

  function gatherFormState() {
    return {
      goal: $('goal').value,
      pages: $('pages').value,
      scripts: $('scripts').value,
      dataFiles: $('dataFiles').value,
      styles: $('styles').value,
      deleteTargets: $('deleteTargets').value,
      addTargets: $('addTargets').value,
      updateTargets: $('updateTargets').value,
      contentChanges: $('contentChanges').value,
      constraints: $('constraints').value,
      acceptance: $('acceptance').value,
      mode: $('mode').value,
      workTypes: getCheckedValues('workTypes'),
      output: $('output').value,
      qualityScore: $('qualityScore').textContent
    };
  }

  function applyFormState(state) {
    if (!state || typeof state !== 'object') return;
    $('goal').value = state.goal || '';
    $('pages').value = state.pages || '';
    $('scripts').value = state.scripts || '';
    $('dataFiles').value = state.dataFiles || '';
    $('styles').value = state.styles || '';
    $('deleteTargets').value = state.deleteTargets || '';
    $('addTargets').value = state.addTargets || '';
    $('updateTargets').value = state.updateTargets || '';
    $('contentChanges').value = state.contentChanges || '';
    $('constraints').value = state.constraints || '';
    $('acceptance').value = state.acceptance || '';
    $('mode').value = state.mode || 'execute';
    setWorkTypes(Array.isArray(state.workTypes) ? state.workTypes : defaultWorkTypesForMode($('mode').value));
    $('output').value = state.output || '';
    const scoreMatch = (state.qualityScore || '0/100').match(/^(\d+)/);
    updateQualityScore(scoreMatch ? parseInt(scoreMatch[1], 10) : 0);
    updateOutputCounter();
  }

  function saveCurrentToHistory() {
    const items = readHistory();
    writeHistory([{ createdAt: new Date().toISOString(), state: gatherFormState() }, ...items]);
    renderHistory();
  }

  function saveDraft() { writeDraft(gatherFormState()); }

  function applySmartRecommendationsFromGoal() {
    const goalText = normalizeSentence(($('goal').value || '').toLowerCase());
    if (!goalText) return;
    const recommended = new Set(getCheckedValues('workTypes'));
    if (/supprim|obsolete|nettoy|clean/.test(goalText)) recommended.add('Supprimer les fichiers obsoletes');
    if (/ajout|creer|nouveau|nouvelle/.test(goalText)) recommended.add('Ajouter de nouveaux fichiers');
    if (/contenu|texte|label|message|tradu|copy/.test(goalText)) recommended.add('Modifier le contenu (textes, labels, messages)');
    if (/ui|ux|responsive|css|style/.test(goalText)) recommended.add('Ameliorer UX/UI responsive');
    if (/review|audit|risque|bug/.test(goalText)) $('mode').value = 'review';
    if (/plan|etape|roadmap/.test(goalText)) $('mode').value = 'plan';
    setWorkTypes([...recommended]);
  }

  function renderHistory() {
    const root = $('historyList');
    const items = readHistory();
    if (items.length === 0) {
      root.innerHTML = '<div class="history-empty">Aucun prompt sauvegarde localement.</div>';
      return;
    }
    root.innerHTML = items.map((item, index) => {
      const d = new Date(item.createdAt);
      const dateLabel = Number.isNaN(d.getTime()) ? 'Date inconnue' : d.toLocaleString('fr-CH');
      const goal = normalizeSentence((item.state && item.state.goal) || 'Sans objectif');
      const shortGoal = goal.length > 80 ? `${goal.slice(0, 80)}...` : goal;
      return [
        '<article class="history-item">',
        `  <div class="history-meta">${dateLabel}</div>`,
        `  <div class="history-goal">${escapeHTML(shortGoal)}</div>`,
        '  <div class="history-actions">',
        `    <button type="button" class="btn-history" data-history-restore="${index}">Restaurer</button>`,
        `    <button type="button" class="btn-history" data-history-copy="${index}">Copier</button>`,
        `    <button type="button" class="btn-history btn-history-delete" data-history-delete="${index}" aria-label="Supprimer cette entree">&#x2715;</button>`,
        '  </div>',
        '</article>'
      ].join('');
    }).join('');
  }

  function generatePrompt(options = {}) {
    const { silent = false, skipHistory = false } = options;
    applyAutoDefaults();
    const goal = normalizeSentence($('goal').value.trim());
    const pages = listOrDefault($('pages').value, 'games/accueil.html');
    const scripts = listOrDefault($('scripts').value, 'js/shared.js');
    const dataFiles = listOrDefault($('dataFiles').value, 'js/data/*.js');
    const styles = listOrDefault($('styles').value, 'css/*.css');
    const deleteTargets = listOrDefault($('deleteTargets').value, '');
    const addTargets = listOrDefault($('addTargets').value, '');
    const updateTargets = listOrDefault($('updateTargets').value, '');
    const types = getCheckedValues('workTypes');
    const contentChanges = normalizeSentence($('contentChanges').value.trim());
    const constraints = normalizeSentence($('constraints').value.trim());
    const acceptance = normalizeSentence($('acceptance').value.trim());
    const mode = $('mode').value;

    if (!goal) {
      if (!silent) { setStatus('Ajoute un objectif principal pour generer un prompt utile.', 'err'); $('goal').focus(); }
      return false;
    }

    const selectedTypes = types.length ? types : defaultWorkTypesForMode(mode);
    const hasDeletionType = selectedTypes.includes('Supprimer les fichiers obsoletes');
    const hasContentType = selectedTypes.includes('Modifier le contenu (textes, labels, messages)');
    const cleanDeleteTargets = deleteTargets.filter(Boolean);
    const cleanAddTargets = addTargets.filter(Boolean);
    const cleanUpdateTargets = updateTargets.filter(Boolean);
    const scopeValues = [...pages, ...scripts, ...dataFiles, ...styles, ...cleanAddTargets, ...cleanUpdateTargets];
    const scopeLevel = inferScopeLevel(scopeValues);

    if (hasDeletionType && cleanDeleteTargets.length === 0) {
      if (!silent) { setStatus('Safe delete: precise au moins un fichier a supprimer.', 'err'); $('deleteTargets').focus(); }
      return false;
    }
    if (cleanDeleteTargets.some((t) => /[*?]/.test(t))) {
      if (!silent) { setStatus('Safe delete: les jokers (*, ?) sont interdits dans les suppressions.', 'err'); $('deleteTargets').focus(); }
      return false;
    }

    const stamp = new Date().toLocaleString('fr-CH');
    const prompt = [
      'Contexte projet:',
      `- Dossier de travail: ${pathValue}`,
      '- Type: site d exercices HTML/CSS/JS avec donnees dans js/data',
      '',
      'Mission:',
      `- ${goal}`,
      '',
      'Perimetre fichiers prioritaires:',
      `- Pages HTML: ${pages.join(', ')}`,
      `- Scripts JS: ${scripts.join(', ')}`,
      `- Data JS: ${dataFiles.join(', ')}`,
      `- CSS: ${styles.join(', ')}`,
      `- Fichiers a modifier: ${cleanUpdateTargets.length ? cleanUpdateTargets.join(', ') : 'Non precises (utiliser le perimetre principal).'}`,
      `- Fichiers a ajouter: ${cleanAddTargets.length ? cleanAddTargets.join(', ') : 'Aucun specifie.'}`,
      `- Suppressions ciblees: ${cleanDeleteTargets.length ? cleanDeleteTargets.join(', ') : 'Aucune specifiee (supprimer seulement ce qui est prouve obsolete).'}`,
      '',
      'Modification de contenu attendue:',
      hasContentType ? `- ${contentChanges || 'Adapter les textes et labels pour clarte, coherence et accessibilite.'}` : '- Pas de modification de contenu demandee.',
      '',
      'Travaux a effectuer:',
      ...selectedTypes.map((t) => `- ${t}`),
      '',
      'Contraintes:',
      constraints ? `- ${constraints}` : '- Ne casse rien hors perimetre et preserve le comportement existant.',
      '- Eviter les regressions UX et verifier les interactions principales.',
      '- Garder un code lisible, coherent avec le style du projet.',
      cleanAddTargets.length > 0 ? '- Pour les ajouts: creer les fichiers avec structure minimale, puis brancher les references necessaires.' : '- Ajouter de nouveaux fichiers uniquement si necessaire.',
      hasDeletionType ? '- Avant suppression: verifier l inutilite, supprimer proprement, puis corriger les references impactees.' : '- Ne pas supprimer de fichiers sans preuve d obsolescence.',
      hasContentType ? '- Pour le contenu: conserver le ton pedagogique et la simplicite des phrases.' : '- Ne pas modifier le contenu editorial inutilement.',
      '',
      'Definition de termine:',
      acceptance ? `- ${acceptance}` : '- Fonctionne sans erreur console et sans regression visible.',
      '',
      'Mode de travail:',
      `- ${modeInstruction(mode)}`,
      '- Donne un resume clair des changements avec references de fichiers.',
      '',
      'Sortie attendue:',
      '- Modifs appliquees dans le repo.',
      '- Liste precise des fichiers modifies/ajoutes.',
      '- Tests/verifications executes et resultat.',
      '',
      'Niveau de perimetre:',
      `- ${scopeLevel}`,
      '',
      `Date de generation du prompt: ${stamp}`
    ].join('\n');

    $('output').value = prompt;
    updateOutputCounter();
    const quality = computeQualityScore({ goal, scopeValuesCount: scopeValues.length, selectedTypesCount: selectedTypes.length, constraints, acceptance, hasContentType, contentChanges, hasDeletionType, deleteTargetsCount: cleanDeleteTargets.length, mode });
    updateQualityScore(quality);
    if (!skipHistory) saveCurrentToHistory();
    if (!silent) setStatus(scopeLevel === 'large' ? 'Prompt genere (perimetre large: verifier les cibles avant execution).' : 'Prompt genere.', scopeLevel === 'large' ? 'warn' : 'ok');
    return true;
  }

  async function copyPrompt(quiet = false) {
    const text = $('output').value;
    if (!text.trim()) {
      if (!quiet) setStatus('Rien a copier. Genere un prompt d abord.', 'err');
      return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      if (!quiet) setStatus('Prompt copie dans le presse-papiers.', 'ok');
      return true;
    } catch {
      if (!quiet) { $('output').focus(); $('output').select(); setStatus('Copie auto bloquee. Utilise Ctrl+C apres selection.', 'err'); }
      return false;
    }
  }

  function exportPromptMarkdown(quiet = false) {
    const text = $('output').value.trim();
    if (!text) {
      if (!quiet) setStatus('Rien a exporter. Genere un prompt d abord.', 'err');
      return false;
    }
    const fileNameDate = new Date().toISOString().replace(/[:.]/g, '-');
    const blob = new Blob([`# Prompt Codex\n\n${text}\n`], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `prompt-codex-${fileNameDate}.md`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    if (!quiet) setStatus('Prompt exporte en .md.', 'ok');
    return true;
  }

  async function runAutoPipeline() {
    applyAutoDefaults();
    const ok = generatePrompt({ silent: false, skipHistory: false });
    if (!ok) return;
    const copied = await copyPrompt(true);
    const exported = exportPromptMarkdown(true);
    if (copied && exported) setStatus('Auto-run termine: prompt genere, copie et export .md effectues.', 'ok');
    else if (copied || exported) setStatus('Auto-run partiel: generation OK, une action secondaire a echoue.', 'warn');
    else setStatus('Prompt genere, mais copie/export non finalises.', 'warn');
  }

  function clearAll() {
    if (!confirm('Vider tous les champs ? Cette action est irreversible.')) return;
    ['goal', 'pages', 'scripts', 'dataFiles', 'styles', 'deleteTargets', 'addTargets', 'updateTargets', 'contentChanges', 'constraints', 'acceptance', 'output'].forEach((id) => { $(id).value = ''; });
    setWorkTypes(['Modifier des fichiers existants', 'Ajouter de nouveaux fichiers', 'Modifier le contenu (textes, labels, messages)', 'Mettre a jour la logique JS', 'Creer ou enrichir des donnees dans js/data', 'Expliquer les changements avec references de fichiers']);
    $('mode').value = 'execute';
    updateQualityScore(0);
    updateOutputCounter();
    writeDraft(gatherFormState());
    setStatus('Champs reinitialises.', 'ok');
  }

  function setStatus(message, type) {
    const el = $('status');
    el.className = `status ${type || ''}`;
    el.textContent = message;
  }

  // Listeners
  $('btnPresetRevision').addEventListener('click', applyCompleteRevisionPreset);
  $('btnPresetAutomation').addEventListener('click', applyPlatformAutomationPreset);
  $('btnGenerate').addEventListener('click', generatePrompt);
  $('btnAutoRun').addEventListener('click', runAutoPipeline);
  $('btnCopy').addEventListener('click', copyPrompt);
  $('btnExportMd').addEventListener('click', exportPromptMarkdown);
  $('btnClear').addEventListener('click', clearAll);
  $('btnClearHistory').addEventListener('click', () => { writeHistory([]); renderHistory(); setStatus('Historique local vide.', 'ok'); });

  $('historyList').addEventListener('click', async (event) => {
    const restoreIndex = event.target.getAttribute('data-history-restore');
    const copyIndex = event.target.getAttribute('data-history-copy');
    const deleteIndex = event.target.getAttribute('data-history-delete');
    const items = readHistory();
    if (restoreIndex !== null) {
      const item = items[Number(restoreIndex)];
      if (item) { applyFormState(item.state); setStatus('Prompt restaure depuis l historique.', 'ok'); }
    }
    if (copyIndex !== null) {
      const item = items[Number(copyIndex)];
      if (item && item.state && item.state.output) {
        try { await navigator.clipboard.writeText(item.state.output); setStatus('Prompt historique copie.', 'ok'); }
        catch { setStatus('Copie historique bloquee. Restaure puis Ctrl+C.', 'err'); }
      }
    }
    if (deleteIndex !== null) {
      const next = items.filter((_, i) => i !== Number(deleteIndex));
      writeHistory(next);
      renderHistory();
      setStatus('Entree supprimee de l historique.', 'ok');
    }
  });

  const debouncedAutoGenerate = debounce(() => {
    applySmartRecommendationsFromGoal();
    saveDraft();
    if (!$('autoLive') || !$('autoLive').checked) return;
    generatePrompt({ silent: true, skipHistory: true });
  }, 300);

  document.querySelectorAll('input, textarea, select').forEach((el) => {
    if (el.id === 'output') return;
    el.addEventListener('input', debouncedAutoGenerate);
    el.addEventListener('change', debouncedAutoGenerate);
  });

  // Re-declencher auto-pilot quand autoMax est recoche
  $('autoMax').addEventListener('change', () => {
    if (!$('autoMax').checked) return;
    applyAutoDefaults();
    generatePrompt({ silent: true, skipHistory: true });
  });

  // Compteur sur edition manuelle du prompt
  $('output').addEventListener('input', updateOutputCounter);

  // Init
  const existingDraft = readDraft();
  if (existingDraft) {
    applyFormState(existingDraft);
    setStatus('Brouillon restaure automatiquement.', 'ok');
  } else if (isAutoMaxEnabled()) {
    applyAutoDefaults();
    generatePrompt({ silent: true, skipHistory: true });
  }
  renderHistory();
  updateOutputCounter();

  document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      generatePrompt();
    }
  });
})();
