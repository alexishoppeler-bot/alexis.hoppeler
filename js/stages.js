'use strict';

(function initStageManager() {
  function buildExercise(page) {
    const meta = (window.EXERCISE_CONFIG && window.EXERCISE_CONFIG.meta && window.EXERCISE_CONFIG.meta[page]) || {};
    return {
      page,
      name: meta.name || page,
      href: meta.href || (page + '.html')
    };
  }

  function getOrderedPages() {
    return ((window.EXERCISE_CONFIG && window.EXERCISE_CONFIG.orderedPages) || []).slice();
  }

  const StageManager = {
    getStages() {
      const pages = getOrderedPages();
      const chunk = Math.max(1, Math.ceil(pages.length / 3));
      return [
        { id: 'stage-1', name: 'Niveau 1', exercises: pages.slice(0, chunk).map(buildExercise) },
        { id: 'stage-2', name: 'Niveau 2', exercises: pages.slice(chunk, chunk * 2).map(buildExercise) },
        { id: 'stage-3', name: 'Niveau 3', exercises: pages.slice(chunk * 2).map(buildExercise) }
      ].filter((stage) => stage.exercises.length > 0);
    },

    getLockedBonuses() {
      return [];
    },

    getUnlockedBonuses() {
      return [];
    },

    getNextRecommendedExercise() {
      const pages = getOrderedPages();
      for (const page of pages) {
        const m = window.ScoreManager ? window.ScoreManager.readMetrics(page) : { status: 'not_started' };
        if (m.status !== 'completed') return buildExercise(page);
      }
      return pages.length ? buildExercise(pages[0]) : null;
    }
  };

  window.StageManager = StageManager;
})();
