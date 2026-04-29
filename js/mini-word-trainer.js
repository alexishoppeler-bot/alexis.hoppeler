'use strict';

const STORAGE_KEY = 'mini-word-trainer-state-v1';
const PAGE_KEY = 'mini-word-trainer';
const sizeMap = { '1': 10, '2': 13, '3': 16, '4': 18, '5': 24, '6': 32, '7': 40 };

let editor;
let feedbackBox;
let progressFill;
let progressText;
let missionCount;
let scoreValue;
let badgeMission;
let missionTitle;
let missionInstruction;
let missionObjective;
let missionVisual;
let missionHint;
let missionMap;
let state = { currentMission: 0, score: 0, completed: Array(20).fill(false), contents: {} };
let savedRange = null;

function stripText(value) {
  return value.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
}

function getPlainText() {
  return stripText(editor.innerText || '');
}

function getHtml() {
  return editor.innerHTML;
}

function saveSelection() {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;
  const range = selection.getRangeAt(0);
  if (editor.contains(range.commonAncestorContainer)) {
    savedRange = range.cloneRange();
  }
}

function restoreSelection() {
  if (!savedRange) return;
  const selection = window.getSelection();
  if (!selection) return;
  selection.removeAllRanges();
  selection.addRange(savedRange);
}

function hasBold() { return /<(b|strong)[^>]*>/.test(getHtml()); }
function hasItalic() { return /<(i|em)[^>]*>/.test(getHtml()); }
function hasUnderline() { return /<u[^>]*>/.test(getHtml()); }
function hasBullets(minItems = 2) { return editor.querySelectorAll('ul li').length >= minItems; }
function hasCenter() { return /text-align:\s*center/i.test(getHtml()) || !!editor.querySelector('[style*="text-align: center"]'); }
function hasRight() { return /text-align:\s*right/i.test(getHtml()) || !!editor.querySelector('[style*="text-align: right"]'); }

function hasLargeText(minPx = 24) {
  return Array.from(editor.querySelectorAll('font[size], span, div, p, h1, h2, h3')).some((node) => {
    const sizeAttr = node.getAttribute('size');
    if (sizeAttr && sizeMap[sizeAttr] >= minPx) return true;
    const style = node.getAttribute('style') || '';
    const match = style.match(/font-size:\s*(\d+)px/i);
    return match ? Number(match[1]) >= minPx : false;
  });
}

function hasColor() {
  return /color:\s*(?!rgb\(0,\s*0,\s*0\)|#000000|black)/i.test(getHtml()) || !!editor.querySelector('[style*="color:"]');
}

function countParagraphs() {
  return editor.innerHTML
    .split(/<(div|p|br|li|tr|h1|h2|h3)[^>]*>/i)
    .filter(Boolean)
    .map((item) => stripText(item.replace(/<[^>]+>/g, '')))
    .filter(Boolean).length;
}

const missions = [
  { title: "Écrire son prénom et nom", instruction: "Écris ton prénom et ton nom sur la page.", objective: "Savoir cliquer dans le document et écrire son identité.", visual: "👤", hint: "Exemple : Maria Lopez", setup: () => "", check: () => { const words = getPlainText().split(' ').filter(Boolean); if (words.length >= 2) return { level: 'ok', text: 'Bravo, ton prénom et ton nom sont écrits.' }; if (words.length === 1) return { level: 'warn', text: 'Presque. Ajoute encore un mot pour le nom.' }; return { level: 'bad', text: 'Essaie encore. Écris au moins deux mots.' }; } },
  { title: "Écrire une phrase simple", instruction: "Écris une phrase simple avec au moins 4 mots.", objective: "Former une petite phrase complète.", visual: "✍️", hint: "Exemple : J'habite à Lyon avec ma famille.", setup: () => "", check: () => { const text = getPlainText(); const words = text.split(' ').filter(Boolean); if (words.length >= 4 && /[.!?]$/.test(text)) return { level: 'ok', text: 'Bravo, la phrase est complète.' }; if (words.length >= 4) return { level: 'warn', text: 'Presque. Ajoute un point à la fin.' }; return { level: 'bad', text: 'Essaie encore. Il faut une phrase plus longue.' }; } },
  { title: "Mettre un titre en gras", instruction: "Écris un titre puis mets-le en gras avec le bouton G.", objective: "Utiliser le gras pour faire ressortir un titre.", visual: "𝐆", hint: "Sélectionne le texte, puis clique sur G.", setup: () => "", check: () => { const text = getPlainText(); if (text.length > 2 && hasBold()) return { level: 'ok', text: 'Bravo, le titre est en gras.' }; if (text.length > 2) return { level: 'warn', text: 'Presque. Sélectionne le titre et clique sur G.' }; return { level: 'bad', text: 'Essaie encore. Écris un titre puis mets-le en gras.' }; } },
  { title: "Centrer un titre", instruction: "Écris un titre et centre-le.", objective: "Apprendre à changer l'alignement du texte.", visual: "↔", hint: "Sélectionne le titre, puis clique sur le bouton centrer.", setup: () => "", check: () => { if (getPlainText().length > 2 && hasCenter()) return { level: 'ok', text: 'Bravo, le titre est centré.' }; if (getPlainText().length > 2) return { level: 'warn', text: 'Presque. Utilise le bouton de centrage.' }; return { level: 'bad', text: "Essaie encore. Écris un titre d'abord." }; } },
  { title: "Changer la taille d'un titre", instruction: "Écris un titre puis augmente sa taille.", objective: "Savoir agrandir un texte important.", visual: "🔠", hint: "Sélectionne le titre puis choisis une grande taille.", setup: () => "", check: () => { if (getPlainText().length > 2 && hasLargeText(24)) return { level: 'ok', text: 'Bravo, le titre est plus grand.' }; if (getPlainText().length > 2) return { level: 'warn', text: 'Presque. Choisis une taille plus grande.' }; return { level: 'bad', text: 'Essaie encore. Écris un titre puis change sa taille.' }; } },
  { title: "Souligner un mot", instruction: "Écris une petite phrase. Puis souligne un mot.", objective: "Utiliser le soulignement.", visual: "U̲", hint: "Sélectionne un mot puis clique sur S.", setup: () => "", check: () => { if (getPlainText().split(' ').filter(Boolean).length >= 2 && hasUnderline()) return { level: 'ok', text: 'Bravo, un mot est souligné.' }; if (getPlainText().length > 0) return { level: 'warn', text: 'Presque. Il faut souligner un mot.' }; return { level: 'bad', text: 'Essaie encore. Écris une phrase et souligne un mot.' }; } },
  { title: "Mettre un mot en italique", instruction: "Écris une petite phrase. Puis mets un mot en italique.", objective: "Utiliser l'italique.", visual: "𝘐", hint: "Sélectionne un mot puis clique sur I.", setup: () => "", check: () => { if (getPlainText().split(' ').filter(Boolean).length >= 2 && hasItalic()) return { level: 'ok', text: 'Bravo, un mot est en italique.' }; if (getPlainText().length > 0) return { level: 'warn', text: 'Presque. Il faut mettre un mot en italique.' }; return { level: 'bad', text: 'Essaie encore. Écris puis mets un mot en italique.' }; } },
  { title: "Créer une liste à puces", instruction: "Fais une petite liste avec au moins 3 éléments.", objective: "Savoir présenter des éléments avec des puces.", visual: "• • •", hint: "Écris plusieurs lignes puis clique sur Liste.", setup: () => "", check: () => { if (hasBullets(3)) return { level: 'ok', text: 'Bravo, la liste à puces est prête.' }; if (getPlainText().length > 0) return { level: 'warn', text: 'Presque. Il faut une vraie liste avec 3 puces.' }; return { level: 'bad', text: 'Essaie encore. Fais une liste simple de 3 éléments.' }; } },
  { title: "Copier-coller une phrase", instruction: "Écris une phrase, puis copie-la et colle-la une deuxième fois.", objective: "Découvrir copier et coller.", visual: "📄📄", hint: "À la fin, la même phrase doit apparaître 2 fois.", setup: () => "", check: () => { const parts = editor.innerText.split(/\n+/).map(stripText).filter(Boolean); const foundDuplicate = parts.some((part, i) => parts.indexOf(part) !== i && part.split(' ').length >= 3); if (foundDuplicate) return { level: 'ok', text: 'Bravo, la phrase a été copiée puis collée.' }; if (getPlainText().split(' ').length >= 3) return { level: 'warn', text: 'Presque. La même phrase doit apparaître 2 fois.' }; return { level: 'bad', text: 'Essaie encore. Écris une phrase puis duplique-la.' }; } },
  { title: "Corriger un texte avec des espaces", instruction: "Corrige le texte. Il ne doit plus y avoir trop d'espaces.", objective: "Apprendre à nettoyer un texte.", visual: "🧹", hint: "Supprime les grands trous entre les mots.", setup: () => "Bonjour     je   m'appelle   Sara   et   j'habite   à   Lille.", check: () => { const raw = editor.innerText.replace(/\u00a0/g, ' '); if (!/ {2,}/.test(raw) && /Bonjour/.test(raw) && /Lille/.test(raw)) return { level: 'ok', text: 'Bravo, le texte est plus propre.' }; if (/Bonjour/.test(raw)) return { level: 'warn', text: "Presque. Il reste encore trop d'espaces." }; return { level: 'bad', text: 'Essaie encore. Corrige le texte sans changer le sens.' }; } },
  { title: "Faire une petite annonce", instruction: "Écris une petite annonce simple pour vendre ou chercher quelque chose.", objective: "Créer un message court et utile.", visual: "📢", hint: "Exemple : Je cherche un vélo. Téléphone : 06 00 00 00 00", setup: () => "", check: () => { const text = getPlainText(); if (text.split(' ').length >= 8 && /\d/.test(text)) return { level: 'ok', text: "Bravo, l'annonce est claire." }; if (text.split(' ').length >= 6) return { level: 'warn', text: 'Presque. Ajoute un détail utile, par exemple un numéro.' }; return { level: 'bad', text: 'Essaie encore. Écris une petite annonce simple.' }; } },
  { title: "Faire une liste de tâches", instruction: "Crée une liste de tâches pour aujourd'hui.", objective: "Présenter des actions à faire.", visual: "✅", hint: "Exemple : courses, rendez-vous, appeler l'école", setup: () => "", check: () => { if (hasBullets(3)) return { level: 'ok', text: 'Bravo, la liste de tâches est prête.' }; if (getPlainText().length > 0) return { level: 'warn', text: 'Presque. Utilise les puces pour au moins 3 tâches.' }; return { level: 'bad', text: 'Essaie encore. Fais une liste avec 3 tâches.' }; } },
  { title: "Créer un tableau simple", instruction: "Insère un petit tableau puis écris dedans.", objective: "Découvrir le tableau.", visual: "▦", hint: "Clique sur Tableau, puis remplis au moins 2 cases.", setup: () => "", check: () => { const table = editor.querySelector('table'); const filled = table ? Array.from(table.querySelectorAll('td')).filter((cell) => stripText(cell.innerText).length > 0).length : 0; if (table && filled >= 2) return { level: 'ok', text: 'Bravo, le tableau est utilisé.' }; if (table) return { level: 'warn', text: 'Presque. Écris dans au moins 2 cases.' }; return { level: 'bad', text: 'Essaie encore. Insère un petit tableau.' }; } },
  { title: "Écrire une adresse", instruction: "Écris une adresse simple sur plusieurs lignes.", objective: "Présenter des informations d'adresse correctement.", visual: "🏠", hint: "Nom, rue, code postal, ville", setup: () => "", check: () => { const lines = editor.innerText.split(/\n+/).map(stripText).filter(Boolean); const joined = lines.join(' '); if (lines.length >= 3 && /\d/.test(joined)) return { level: 'ok', text: "Bravo, l'adresse est bien présentée." }; if (lines.length >= 2) return { level: 'warn', text: 'Presque. Ajoute encore une ligne ou un numéro.' }; return { level: 'bad', text: 'Essaie encore. Utilise plusieurs lignes.' }; } },
  { title: "Écrire un email dans Word", instruction: "Écris un petit email avec bonjour, un message, et une formule de fin.", objective: "Structurer un email simple.", visual: "✉️", hint: "Exemple : Bonjour..., Merci..., Cordialement", setup: () => "", check: () => { const text = getPlainText().toLowerCase(); if (text.includes('bonjour') && (text.includes('merci') || text.includes('cordialement') || text.includes('à bientôt'))) return { level: 'ok', text: "Bravo, l'email a une bonne forme." }; if (text.length > 15) return { level: 'warn', text: 'Presque. Il manque une formule comme bonjour ou cordialement.' }; return { level: 'bad', text: 'Essaie encore. Écris un vrai petit email.' }; } },
  { title: "Écrire une lettre courte", instruction: "Écris une lettre courte avec une date, une salutation et une signature.", objective: "Découvrir la forme simple d'une lettre.", visual: "📝", hint: "Exemple : 29/04/2026, Bonjour Madame, ... Signature", setup: () => "", check: () => { const text = getPlainText().toLowerCase(); const hasDate = /\d{1,2}[\/.-]\d{1,2}[\/.-]\d{2,4}/.test(text); const hasGreeting = /bonjour|madame|monsieur/.test(text); const lines = editor.innerText.split(/\n+/).map(stripText).filter(Boolean); if (hasDate && hasGreeting && lines.length >= 4) return { level: 'ok', text: 'Bravo, la lettre est bien construite.' }; if (lines.length >= 3) return { level: 'warn', text: 'Presque. Ajoute une date ou une formule de politesse.' }; return { level: 'bad', text: 'Essaie encore. La lettre doit avoir plusieurs parties.' }; } },
  { title: "Faire une mise en page propre", instruction: "Prépare un document propre avec un titre visible et un texte bien rangé.", objective: "Mieux présenter un document.", visual: "🪄", hint: "Un titre plus grand, du texte lisible, pas de désordre.", setup: () => "", check: () => { if (getPlainText().split(' ').length >= 8 && hasLargeText(24) && (hasBold() || hasCenter())) return { level: 'ok', text: 'Bravo, la mise en page est plus propre.' }; if (getPlainText().length > 10) return { level: 'warn', text: 'Presque. Ajoute un vrai titre visible.' }; return { level: 'bad', text: 'Essaie encore. Fais un titre et organise le texte.' }; } },
  { title: "Créer un mini CV", instruction: "Écris un mini CV avec nom, expérience ou formation, et contact.", objective: "Rassembler des informations utiles pour le travail.", visual: "👔", hint: "Exemple : Nom, expérience, téléphone ou email", setup: () => "", check: () => { const text = getPlainText().toLowerCase(); const hasContact = /\d/.test(text) || text.includes('@'); const hasSection = /expérience|formation|compétence|travail/.test(text); if (text.split(' ').length >= 10 && hasContact && hasSection) return { level: 'ok', text: 'Bravo, le mini CV est prêt.' }; if (text.split(' ').length >= 6) return { level: 'warn', text: 'Presque. Ajoute une rubrique et un contact.' }; return { level: 'bad', text: 'Essaie encore. Mets plusieurs informations utiles.' }; } },
  { title: "Corriger un document mal présenté", instruction: "Améliore ce document: ajoute de l'ordre, un titre, et une présentation plus claire.", objective: "Reprendre un texte mal présenté.", visual: "🔧", hint: "Tu peux mettre un titre, faire une liste, et mieux espacer.", setup: () => "liste de courses pommes bananes riz lait\npenser pharmacie\nappeler la maitresse", check: () => { if ((hasBullets(3) || countParagraphs() >= 3) && (hasBold() || hasLargeText(24))) return { level: 'ok', text: 'Bravo, le document est mieux présenté.' }; if (getPlainText().length > 10) return { level: 'warn', text: 'Presque. Il faut rendre le document plus clair visuellement.' }; return { level: 'bad', text: 'Essaie encore. Organise mieux le document.' }; } },
  { title: "Préparer un document à imprimer", instruction: "Prépare un document final clair, avec un titre et un contenu lisible.", objective: "Créer un document propre pour l'impression.", visual: "🖨️", hint: "Titre, texte organisé, éventuellement date ou couleur simple", setup: () => "", check: () => { const enoughText = getPlainText().split(' ').length >= 12; if (enoughText && (hasLargeText(24) || hasBold()) && (countParagraphs() >= 3 || hasBullets(2) || hasColor() || hasRight() || hasCenter())) return { level: 'ok', text: 'Bravo, le document semble prêt à imprimer.' }; if (enoughText) return { level: 'warn', text: 'Presque. Ajoute un titre visible ou une meilleure présentation.' }; return { level: 'bad', text: 'Essaie encore. Prépare un vrai document final.' }; } }
];

function saveState() {
  state.contents[state.currentMission] = editor.innerHTML;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return;
    state = {
      currentMission: saved.currentMission || 0,
      score: saved.score || 0,
      completed: Array.isArray(saved.completed) ? saved.completed.slice(0, 20) : Array(20).fill(false),
      contents: saved.contents || {}
    };
    while (state.completed.length < 20) state.completed.push(false);
  } catch (error) {
    console.warn('Sauvegarde introuvable ou invalide.', error);
  }
}

function setFeedback(level, text) {
  feedbackBox.className = 'mini-word-feedback' + (level ? ' ' + level : '');
  feedbackBox.textContent = text;
}

function renderMissionMap() {
  missionMap.innerHTML = '';
  missions.forEach((mission, index) => {
    const button = document.createElement('button');
    button.className = 'mini-word-mission-dot';
    if (state.completed[index]) button.classList.add('done');
    if (state.currentMission === index) button.classList.add('current');
    button.textContent = index + 1;
    button.addEventListener('click', () => {
      saveState();
      state.currentMission = index;
      loadMission();
    });
    missionMap.appendChild(button);
  });
}

function missionTemplate(index) {
  const existing = state.contents[index];
  if (typeof existing === 'string') return existing;
  return missions[index].setup();
}

function syncScoreManager() {
  if (!window.ScoreManager) return;
  const completed = state.completed.filter(Boolean).length;
  const accuracy = Math.round((completed / missions.length) * 100);
  window.ScoreManager.writeMetrics(PAGE_KEY, {
    status: completed === 0 ? 'not_started' : completed === missions.length ? 'completed' : 'in_progress',
    correct: completed,
    errors: 0,
    xp: completed * 5
  });
  document.dispatchEvent(new CustomEvent('score:updated', { detail: { accuracy } }));
}

function loadMission() {
  const mission = missions[state.currentMission];
  badgeMission.textContent = 'Mission ' + (state.currentMission + 1);
  missionCount.textContent = (state.currentMission + 1) + ' / 20';
  missionTitle.textContent = mission.title;
  missionInstruction.textContent = mission.instruction;
  missionObjective.textContent = mission.objective;
  missionVisual.textContent = mission.visual;
  missionHint.textContent = mission.hint;
  editor.innerHTML = missionTemplate(state.currentMission);
  setFeedback('', state.completed[state.currentMission] ? "Mission déjà réussie. Tu peux l'améliorer ou passer à la suivante." : 'Prêt ? Écris dans la grande page blanche.');
  renderMissionMap();
  updateProgress();
  editor.focus();
}

function updateProgress() {
  state.score = state.completed.filter(Boolean).length;
  scoreValue.textContent = state.score + ' / 20';
  progressFill.style.width = ((state.score / 20) * 100) + '%';
  progressText.textContent = state.score <= 1 ? state.score + ' mission réussie' : state.score + ' missions réussies';
  saveState();
  syncScoreManager();
}

function exec(command, value = null) {
  editor.focus();
  restoreSelection();
  document.execCommand(command, false, value);
  saveSelection();
  saveState();
  updateToolbarStates();
}

function updateToolbarStates() {
  document.querySelectorAll('[data-cmd]').forEach((btn) => {
    const cmd = btn.getAttribute('data-cmd');
    try {
      btn.classList.toggle('active', document.queryCommandState(cmd));
    } catch (error) {
      btn.classList.remove('active');
    }
  });
}

function handleCheck() {
  const result = missions[state.currentMission].check();
  setFeedback(result.level, result.text);
  if (result.level === 'ok' && !state.completed[state.currentMission]) {
    state.completed[state.currentMission] = true;
    updateProgress();
    renderMissionMap();
  } else {
    saveState();
  }
}

function exportDocument(extension) {
  const title = 'Mini Word Trainer - Mission ' + (state.currentMission + 1);
  const content = [
    '<!doctype html>',
    '<html lang="fr">',
    '<head>',
    '<meta charset="utf-8">',
    '<title>' + title + '</title>',
    '<style>',
    'body{font-family:Arial,sans-serif;margin:30px}',
    '.doc{max-width:900px;margin:0 auto;font-size:16px;line-height:1.5}',
    'table{border-collapse:collapse;width:100%;margin:12px 0}',
    'td,th{border:1px solid #333;padding:8px}',
    '</style>',
    '</head>',
    '<body>',
    '<div class="doc">' + editor.innerHTML + '</div>',
    '</body>',
    '</html>'
  ].join('');
  const mime = extension === 'doc' ? 'application/msword' : 'text/html';
  const blob = new Blob([content], { type: mime });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'mini-word-trainer-mission-' + (state.currentMission + 1) + '.' + extension;
  link.click();
  URL.revokeObjectURL(link.href);
}

function initMiniWordTrainer() {
  editor = document.getElementById('editor');
  feedbackBox = document.getElementById('feedbackBox');
  progressFill = document.getElementById('progressFill');
  progressText = document.getElementById('progressText');
  missionCount = document.getElementById('missionCount');
  scoreValue = document.getElementById('scoreValue');
  badgeMission = document.getElementById('badgeMission');
  missionTitle = document.getElementById('missionTitle');
  missionInstruction = document.getElementById('missionInstruction');
  missionObjective = document.getElementById('missionObjective');
  missionVisual = document.getElementById('missionVisual');
  missionHint = document.getElementById('missionHint');
  missionMap = document.getElementById('missionMap');

  if (!editor || !feedbackBox || !missionMap) {
    console.error('Mini Word Trainer: éléments introuvables.');
    return;
  }

  document.querySelectorAll('[data-cmd]').forEach((btn) => {
    btn.addEventListener('mousedown', (event) => {
      event.preventDefault();
      saveSelection();
    });
    btn.addEventListener('click', () => exec(btn.getAttribute('data-cmd')));
  });
  document.getElementById('fontSize').addEventListener('change', (event) => exec('fontSize', event.target.value));
  document.getElementById('textColor').addEventListener('input', (event) => exec('foreColor', event.target.value));

  document.getElementById('copyBtn').addEventListener('click', () => {
    editor.focus();
    try {
      document.execCommand('copy');
      setFeedback('ok', 'Texte copié.');
    } catch (error) {
      setFeedback('warn', 'Sélectionne du texte puis essaie encore.');
    }
  });

  document.getElementById('pasteBtn').addEventListener('click', async () => {
    editor.focus();
    try {
      const clipboard = navigator.clipboard && await navigator.clipboard.readText();
      if (clipboard) document.execCommand('insertText', false, clipboard);
      else document.execCommand('paste');
      saveState();
      setFeedback('ok', 'Texte collé.');
    } catch (error) {
      setFeedback('warn', 'Le collage direct peut être bloqué. Tu peux aussi utiliser Ctrl+V.');
    }
  });

  document.getElementById('insertTableBtn').addEventListener('click', () => {
    editor.focus();
    document.execCommand('insertHTML', false, '<table style="width:100%; border-collapse:collapse;"><tr><td style="border:1px solid #333; padding:8px;">Case 1</td><td style="border:1px solid #333; padding:8px;">Case 2</td></tr><tr><td style="border:1px solid #333; padding:8px;">Case 3</td><td style="border:1px solid #333; padding:8px;">Case 4</td></tr></table><p></p>');
    saveState();
  });

  document.getElementById('prevMission').addEventListener('click', () => { saveState(); state.currentMission = Math.max(0, state.currentMission - 1); loadMission(); });
  document.getElementById('nextMission').addEventListener('click', () => { saveState(); state.currentMission = Math.min(missions.length - 1, state.currentMission + 1); loadMission(); });
  document.getElementById('checkMission').addEventListener('click', handleCheck);
  document.getElementById('exportHtml').addEventListener('click', () => exportDocument('html'));
  document.getElementById('exportDoc').addEventListener('click', () => exportDocument('doc'));
  document.getElementById('resetAll').addEventListener('click', () => {
    if (!window.confirm('Recommencer tout le parcours ?')) return;
    state = { currentMission: 0, score: 0, completed: Array(20).fill(false), contents: {} };
    localStorage.removeItem(STORAGE_KEY);
    loadMission();
  });

  editor.addEventListener('input', saveState);
  editor.addEventListener('keyup', updateToolbarStates);
  editor.addEventListener('mouseup', updateToolbarStates);
  editor.addEventListener('keyup', saveSelection);
  editor.addEventListener('mouseup', saveSelection);
  editor.addEventListener('focus', saveSelection);

  loadState();
  loadMission();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMiniWordTrainer);
} else {
  initMiniWordTrainer();
}
