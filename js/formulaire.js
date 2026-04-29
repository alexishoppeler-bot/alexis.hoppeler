'use strict';

const PAGE_ID = 'formulaire';
const CASES = Array.isArray(window.FORMULAIRE_DATA) ? window.FORMULAIRE_DATA : [];

let session = {
  items: [],
  index: 0,
  correct: 0,
  errors: 0,
  typed: 0,
  xp: 0,
  answered: false,
  hintsUsed: 0
};
let autoAdvanceTimer = null;

function filledFieldCount(fields) {
  return fields.reduce((count, field) => {
    const input = document.getElementById(`field-${field.name}`);
    return count + (input && input.value.trim() ? 1 : 0);
  }, 0);
}

function updateRoundStrip(fields) {
  const total = fields.length;
  const done = filledFieldCount(fields);
  document.getElementById('fieldsCount').textContent = String(total);
  document.getElementById('fieldsDone').textContent = String(done);
  document.getElementById('profileStatus').textContent = session.answered
    ? 'Vérifié'
    : done === 0
      ? 'À commencer'
      : done < total
        ? 'À compléter'
        : 'Prêt';
  document.getElementById('btnValidate').disabled = done === 0 || session.answered;
}

function clearAutoAdvance() {
  if (autoAdvanceTimer) {
    clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }
}

function scheduleAutoAdvance(callback, delay = 1800) {
  clearAutoAdvance();
  autoAdvanceTimer = setTimeout(() => {
    autoAdvanceTimer = null;
    callback();
  }, delay);
}


function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function escapeHTML(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function normalize(text) {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function formatSwissDate(text) {
  const value = String(text || '').trim();
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return value;
  return `${match[3]}.${match[2]}.${match[1]}`;
}

function splitSkillInput(text) {
  return normalize(text)
    .split(/[,;/]+/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

function calculateSimilarity(str1, str2) {
  // Levenshtein distance avec pondération
  const len1 = str1.length;
  const len2 = str2.length;
  if (len1 === 0 && len2 === 0) return 1.0;
  if (len1 === 0 || len2 === 0) return 0.0;

  const dp = Array(len2 + 1).fill(null).map(() => Array(len1 + 1).fill(0));
  for (let i = 0; i <= len1; i++) dp[0][i] = i;
  for (let j = 0; j <= len2; j++) dp[j][0] = j;

  for (let j = 1; j <= len2; j++) {
    for (let i = 1; i <= len1; i++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      dp[j][i] = Math.min(
        dp[j][i - 1] + 1,
        dp[j - 1][i] + 1,
        dp[j - 1][i - 1] + cost
      );
    }
  }

  const maxLen = Math.max(len1, len2);
  return 1 - (dp[len2][len1] / maxLen);
}

function isSkillMatch(inputSkill, allowedSkill) {
  if (inputSkill === allowedSkill) return true;

  // Exact prefix match (e.g., "node" matches "node.js")
  if (allowedSkill.startsWith(`${inputSkill} `) ||
      allowedSkill.startsWith(`${inputSkill}.`) ||
      allowedSkill.startsWith(`${inputSkill}-`)) {
    return true;
  }

  // Reverse prefix (e.g., "javascript" matches "js")
  if (inputSkill.startsWith(`${allowedSkill} `) ||
      inputSkill.startsWith(`${allowedSkill}.`) ||
      inputSkill.startsWith(`${allowedSkill}-`)) {
    return true;
  }

  // Levenshtein distance for typos (85% similarity threshold)
  return calculateSimilarity(inputSkill, allowedSkill) >= 0.85;
}

function isSkillsFieldCorrect(actualRaw, round) {
  const allowed = ((round && round.profile && round.profile.skills) || [])
    .map((skill) => normalize(skill))
    .filter((skill) => skill.length > 0);

  const entered = splitSkillInput(actualRaw);
  if (!allowed.length) return actualRaw.trim().length === 0;
  if (!entered.length) return false;

  // All entered skills must match at least one allowed skill
  const allMatch = entered.every((skill) =>
    allowed.some((allowedSkill) => isSkillMatch(skill, allowedSkill))
  );

  // Don't require ALL allowed skills, just the ones entered must be valid
  return allMatch;
}

function isFieldCorrect(field, actualRaw, round) {
  if (field && field.name === 'skills') return isSkillsFieldCorrect(actualRaw, round);
  return normalize(actualRaw) === normalize(field.expected);
}

function expectedValueForField(field, round) {
  if (field && field.name === 'skills') {
    const allSkills = (round && round.profile && Array.isArray(round.profile.skills)) ? round.profile.skills : [];
    return allSkills.join(', ');
  }
  return field.expected;
}

function getRoundTag(round) {
  return round && round.tag ? round.tag : 'Candidature';
}

function profileRows(round) {
  const p = round.profile || {};
  const fullName = [p.firstName, p.lastName].filter(Boolean).join(' ');
  return [
    ['Nom complet', fullName],
    ['Date de naissance', formatSwissDate(p.birthDate || '')],
    ['Situation familiale', p.maritalStatus || ''],
    ['Age', p.age ? `${p.age} ans` : ''],
    ['E-mail', p.email || ''],
    ['Téléphone', p.phone || ''],
    ['Adresse', p.address ? `${p.address}, ${p.npa} ${p.city}` : ''],
    ['Formation', p.education || ''],
    ['Expérience', p.experienceText || ''],
    ['Permis de conduire', p.drivingLicense || ''],
    ['Permis de séjour', p.residencePermit || ''],
    ['Disponibilité', p.availability || ''],
    ['Qualités personnelles', Array.isArray(p.qualities) ? p.qualities.join(', ') : ''],
    ['Compétences', Array.isArray(p.skills) ? p.skills.join(', ') : '']
  ].filter(([, value]) => String(value).trim() !== '');
}


function startSession() {
  clearAutoAdvance();
  if (!CASES.length) {
    showToast('Aucun profil disponible.', 'error');
    return;
  }

  session = {
    items: shuffle(CASES),
    index: 0,
    correct: 0,
    errors: 0,
    typed: 0,
    xp: 0,
    answered: false,
    hintsUsed: 0
  };

  const resultZone = document.getElementById('resultZone');
  const gameZone = document.getElementById('gameZone');
  if (resultZone) resultZone.classList.add('hidden');
  if (gameZone) gameZone.classList.remove('hidden');

  renderRound();
}

function renderRound() {
  clearAutoAdvance();
  const round = session.items[session.index];
  if (!round) return;

  session.answered = false;

  document.getElementById('roundNum').textContent = String(session.index + 1);
  document.getElementById('roundTotal').textContent = String(session.items.length);
  document.getElementById('roundTag').textContent = getRoundTag(round);
  const p = round.profile || {};
  const fullName = [p.firstName, p.lastName].filter(Boolean).join(' ') || 'Candidat';
  document.getElementById('profileTitle').textContent = `Profil : ${fullName}`;
  document.getElementById('profileIntro').textContent = 'Lisez les informations, puis complétez le formulaire.';
  document.getElementById('formTitle').textContent = 'Formulaire';
  document.getElementById('formIntro').textContent = 'Remplissez les champs avec les mêmes informations que dans le profil.';

  const profileList = document.getElementById('profileList');
  const rows = profileRows(round);
  profileList.innerHTML = rows.map(([label, value]) => `<li><strong>${escapeHTML(label)}:</strong> ${escapeHTML(value)}</li>`).join('');

  const fields = (round.form && Array.isArray(round.form.fields)) ? round.form.fields : [];

  const formFields = document.getElementById('formFields');
  formFields.innerHTML = '';

  fields.forEach((field) => {
    const wrap = document.createElement('div');
    wrap.className = 'form-field';

    const label = document.createElement('label');
    label.setAttribute('for', `field-${field.name}`);
    label.textContent = field.label || field.name;

    const input = document.createElement('input');
    input.className = 'form-input';
    input.id = `field-${field.name}`;
    input.name = field.name;
    input.type = field.type || 'text';
    input.autocomplete = 'off';

    input.addEventListener('input', () => {
      input.removeAttribute('aria-invalid');
      input.style.borderColor = '';
      input.style.boxShadow = '';
      updateRoundStrip(fields);

      const missing = fields.length - filledFieldCount(fields);
      const feedback = document.getElementById('formFeedback');
      feedback.className = 'form-feedback';
      feedback.innerHTML = missing > 0
        ? `Il reste <strong>${missing}</strong> champ${missing > 1 ? 's' : ''} à remplir.`
        : 'Tous les champs sont remplis. Cliquez sur « Vérifier ».';
    });

    wrap.appendChild(label);
    wrap.appendChild(input);
    formFields.appendChild(wrap);
  });

  const feedback = document.getElementById('formFeedback');
  feedback.className = 'form-feedback';
  feedback.innerHTML = 'Commencez par lire le profil à gauche, puis remplissez le formulaire à droite.';

  const btnValidate = document.getElementById('btnValidate');
  btnValidate.disabled = true;

  const btnNext = document.getElementById('btnNext');
  btnNext.style.display = 'none';

  const progress = Math.round((session.index / session.items.length) * 100);
  document.getElementById('progressFill').style.width = `${progress}%`;
  updateRoundStrip(fields);
  updateKPIs();
}

function validateRound() {
  if (session.answered) return;

  const round = session.items[session.index];
  if (!round) return;

  const fields = (round.form && Array.isArray(round.form.fields)) ? round.form.fields : [];
  if (!fields.length) return;

  let okCount = 0;
  let wrongCount = 0;
  const messages = [];

  fields.forEach((field) => {
    const input = document.getElementById(`field-${field.name}`);
    if (!input) return;

    const actualRaw = input.value;
    const expectedRaw = expectedValueForField(field, round);
    const isOk = isFieldCorrect(field, actualRaw, round);

    if (isOk) {
      okCount += 1;
      input.setAttribute('aria-invalid', 'false');
      input.style.borderColor = 'var(--success)';
      input.style.boxShadow = '0 0 0 3px rgba(52, 211, 153, 0.12)';
      messages.push(`<div class="feedback-item success">✓ ${escapeHTML(field.label)} : correct.</div>`);
    } else {
      wrongCount += 1;
      input.setAttribute('aria-invalid', 'true');
      input.style.borderColor = 'var(--danger)';
      input.style.boxShadow = '0 0 0 3px rgba(248, 113, 113, 0.12)';
      messages.push(`<div class="feedback-item error">✗ ${escapeHTML(field.label)} : réponse attendue « ${escapeHTML(expectedRaw)} ».</div>`);
    }

    input.readOnly = true;
  });

  session.answered = true;
  session.typed += 1;

  const isRoundCorrect = wrongCount === 0;
  const baseXP = 6;
  const bonusMultiplier = 1 + (0.5 * (1 - session.hintsUsed / Math.max(1, okCount + wrongCount)));
  const awardedXP = isRoundCorrect
    ? Math.round(baseXP * bonusMultiplier)
    : Math.max(1, okCount);

  session.xp += awardedXP;

  if (isRoundCorrect) {
    session.correct += 1;
    recordExerciseProgress(PAGE_ID, { correct: 1, typed: 1, errors: 0, xp: awardedXP });
  } else {
    session.errors += 1;
    recordExerciseProgress(PAGE_ID, { correct: 0, typed: 1, errors: 1, xp: awardedXP });
  }

  const feedback = document.getElementById('formFeedback');
  let summary = '';

  if (isRoundCorrect) {
    const hintPenalty = session.hintsUsed > 0 ? ` (${session.hintsUsed} indice${session.hintsUsed > 1 ? 's' : ''} utilisé${session.hintsUsed > 1 ? 's' : ''})` : '';
    summary = `<div class="feedback-item success">Bravo, le formulaire est correct.${hintPenalty} +${awardedXP} XP.</div>`;
    feedback.className = 'form-feedback success-state';
  } else {
    const errorRate = Math.round((wrongCount / fields.length) * 100);
    summary = `<div class="feedback-item error">Il reste ${wrongCount} erreur${wrongCount > 1 ? 's' : ''} (${errorRate} %). +${awardedXP} XP.</div>`;
    feedback.className = 'form-feedback error-state';
  }

  feedback.innerHTML = summary + messages.join('');

  const btnValidate = document.getElementById('btnValidate');
  btnValidate.disabled = true;
  document.getElementById('btnNext').style.display = 'inline-flex';

  updateRoundStrip(fields);
  updateKPIs();
  scheduleAutoAdvance(nextRound);
}

function showHint() {
  if (session.answered) return;

  const round = session.items[session.index];
  if (!round) return;

  const fields = (round.form && Array.isArray(round.form.fields)) ? round.form.fields : [];
  const pending = fields.filter((field) => {
    const input = document.getElementById(`field-${field.name}`);
    return input && !isFieldCorrect(field, input.value, round);
  });

  if (!pending.length) {
    showToast('Tout semble correct.', 'success');
    return;
  }

  const target = pending[Math.floor(Math.random() * pending.length)];
  const expected = String(expectedValueForField(target, round) || '');

  // Show more useful hint: 40% of the expected value
  const hintLength = Math.max(3, Math.ceil(expected.length * 0.4));
  const preview = expected.slice(0, hintLength);

  const feedback = document.getElementById('formFeedback');
  feedback.className = 'form-feedback';
  const hintType = expected.length <= 10 ? 'la réponse' : 'le début';
  feedback.innerHTML = `<div class="feedback-item">Aide : pour <strong>${escapeHTML(target.label)}</strong>, ${hintType} est <strong>${escapeHTML(preview)}${expected.length > hintLength ? '...' : ''}</strong>.</div>`;

  session.hintsUsed += 1;
}

function nextRound() {
  if (!session.answered) {
    showToast('Cliquez d’abord sur « Vérifier ».', 'info');
    return;
  }

  session.index += 1;
  if (session.index >= session.items.length) {
    finishSession();
    return;
  }

  renderRound();
}

function finishSession() {
  clearAutoAdvance();
  promoteExerciseStatus(PAGE_ID, 'completed');

  const gameZone = document.getElementById('gameZone');
  const resultZone = document.getElementById('resultZone');
  if (gameZone) gameZone.classList.add('hidden');
  if (resultZone) resultZone.classList.remove('hidden');

  document.getElementById('progressFill').style.width = '100%';

  const accuracy = calcAccuracy(session.correct, session.typed);
  document.getElementById('resEmoji').textContent = accuracy >= 80 ? '🏆' : '📝';
  document.getElementById('resTitle').textContent = accuracy >= 80 ? 'Très bien' : 'Continuez';
  document.getElementById('resSubtitle').textContent = `${session.correct} formulaire${session.correct > 1 ? 's' : ''} correct${session.correct > 1 ? 's' : ''} sur ${session.items.length}.`;

  document.getElementById('resCorrect').textContent = String(session.correct);
  document.getElementById('resErrors').textContent = String(session.errors);
  document.getElementById('resXP').textContent = String(session.xp);
  document.getElementById('resAccuracy').textContent = `${accuracy}%`;
}

function updateKPIs() {
  const total = session.items.length || 1;
  const progress = Math.round((session.index / total) * 100);

  updateExerciseScoreKpis({
    correct: String(session.correct),
    errors: String(session.errors),
    xp: String(session.xp),
    includeAccuracy: false
  });
  document.getElementById('kpiProgress').textContent = `${progress}%`;
}

document.addEventListener('DOMContentLoaded', () => {
  setupNextExerciseButton(PAGE_ID);

  document.getElementById('btnHint').addEventListener('click', showHint);
  document.getElementById('btnValidate').addEventListener('click', validateRound);
  document.getElementById('btnNext').addEventListener('click', nextRound);
  setupRestartButton(startSession);

  document.addEventListener('keydown', (event) => {
    const tag = event.target && event.target.tagName;

    if (event.key === 'Enter' && tag === 'INPUT' && !session.answered) {
      event.preventDefault();
      validateRound();
      return;
    }

    if (event.key === 'Enter' && session.answered) {
      event.preventDefault();
      nextRound();
      return;
    }

    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    if (event.key.toLowerCase() === 'h') showHint();
  });

  startSession();
});
