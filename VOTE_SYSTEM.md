# Systeme de vote

## Etat actuel

Le module `js/vote-system.js` est present uniquement pour compatibilite.
La fonction `VoteSystem.vote()` est un placeholder et n'active aucune UI de vote.

## Impact

- Aucun vote n'est collecte ni persiste.
- Aucun affichage de score de vote n'est utilise dans les pages principales.

## Si vous voulez reactiver le vote

1. Definir les regles de vote (type, barème, persistance).
2. Connecter une interface dans les pages concernees.
3. Remplacer le placeholder par une implementation reelle.
