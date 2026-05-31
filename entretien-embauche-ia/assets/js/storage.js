// storage.js — Sauvegarde automatique avec localStorage

const Storage = {
  CLE: 'entretien_embauche_ia',

  // Sauvegarde la session complète
  sauvegarder(session) {
    try {
      const data = {
        date: new Date().toISOString(),
        ...session
      };
      localStorage.setItem(this.CLE, JSON.stringify(data));
      return true;
    } catch (e) {
      console.warn('Impossible de sauvegarder :', e);
      return false;
    }
  },

  // Charge la dernière session
  charger() {
    try {
      const data = localStorage.getItem(this.CLE);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn('Impossible de charger la session :', e);
      return null;
    }
  },

  // Efface la session sauvegardée
  effacer() {
    localStorage.removeItem(this.CLE);
  },

  // Sauvegarde l'historique des réponses
  ajouterReponse(reponse) {
    const session = this.charger() || { reponses: [] };
    if (!session.reponses) session.reponses = [];
    session.reponses.push({
      timestamp: new Date().toISOString(),
      ...reponse
    });
    this.sauvegarder(session);
  },

  // Charge toutes les sessions passées
  chargerHistorique() {
    const cle = this.CLE + '_historique';
    try {
      const data = localStorage.getItem(cle);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  // Archive la session dans l'historique
  archiverSession(session) {
    const cle = this.CLE + '_historique';
    try {
      const historique = this.chargerHistorique();
      historique.push({
        date: new Date().toISOString(),
        ...session
      });
      // Garder seulement les 20 dernières sessions
      if (historique.length > 20) historique.shift();
      localStorage.setItem(cle, JSON.stringify(historique));
    } catch (e) {
      console.warn('Impossible d\'archiver :', e);
    }
  },

  // Efface tout
  effacerTout() {
    localStorage.removeItem(this.CLE);
    localStorage.removeItem(this.CLE + '_historique');
  }
};
