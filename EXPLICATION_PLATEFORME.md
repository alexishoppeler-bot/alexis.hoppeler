# Explication detaillee de la plateforme AH

## 1. Presentation generale

La plateforme **AH** est un projet web statique d'apprentissage. Elle sert a entrainer des competences utiles du quotidien, en particulier :

- l'utilisation de l'ordinateur
- la comprehension de consignes simples
- la lecture et l'ecriture en francais
- la recherche d'emploi
- les demarches de candidature

La plateforme est pensee pour proposer un environnement :

- simple
- rassurant
- progressif
- utilisable hors ligne

L'objectif est d'aider l'utilisateur a apprendre **pas a pas**, a son rythme, avec une progression visible directement sur l'appareil utilise.

## 2. Acces a la plateforme

Le point d'entree principal est le fichier [index.html](/workspaces/AH/index.html:1).

Ce fichier ne contient pas la page d'accueil complete : il redirige automatiquement vers [games/accueil.html](/workspaces/AH/games/accueil.html:1).

La page d'accueil presente la philosophie de la plateforme :

- apprendre sans stress
- avancer en petites etapes
- suivre ses resultats localement

Elle invite aussi l'utilisateur a utiliser la barre laterale pour :

- ouvrir un exercice
- consulter ses evaluations
- lancer l'autoevaluation
- acceder aux donnees et regles XP

## 3. Public et usages

La plateforme semble etre concue pour des personnes qui ont besoin de renforcer des bases dans :

- la bureautique
- l'autonomie numerique
- le francais fonctionnel
- les demarches liees a l'emploi et a l'ORP

Les activites sont formulees de maniere concrete, avec des taches proches de situations reelles : cliquer, taper, completer, ecouter, classer, remplir un formulaire ou preparer un e-mail.

## 4. Fonctionnement global

La plateforme fonctionne comme un ensemble de pages HTML reliees entre elles, sans backend et sans base de donnees distante.

Concretement :

- les pages sont dans le dossier `games/`
- la logique applicative est dans `js/`
- les styles sont dans `css/`
- les donnees de progression sont stockees dans le navigateur avec `localStorage`

Cela veut dire que :

- le site peut fonctionner hors ligne
- les resultats restent sur l'appareil
- rien n'est envoye sur internet

## 5. Structure principale du projet

Voici les reperes les plus importants :

- [index.html](/workspaces/AH/index.html:1) : redirection vers l'accueil
- [games/accueil.html](/workspaces/AH/games/accueil.html:1) : page d'entree principale
- [games/evaluations.html](/workspaces/AH/games/evaluations.html:1) : tableau de bord des resultats
- [games/autoevaluation.html](/workspaces/AH/games/autoevaluation.html:1) : diagnostic guide
- [games/donnees.html](/workspaces/AH/games/donnees.html:1) : export, import et suppression des donnees
- [js/exercises-config.js](/workspaces/AH/js/exercises-config.js:1) : configuration centrale des exercices
- [js/score.js](/workspaces/AH/js/score.js:1) : gestion des scores et de la progression
- [js/shared.js](/workspaces/AH/js/shared.js:1) : elements communs de l'interface

## 6. Organisation pedagogique

La plateforme est organisee autour de plusieurs grands blocs de contenu.

### Bureautique / Numerique

Ce bloc regroupe des activites liees a l'usage de l'ordinateur et a la navigation simple :

- `clavier`
- `cliquer`
- `cherche-clique`
- `completer`
- `orientation`

L'objectif est de travailler les gestes de base et la comprehension d'actions simples a realiser sur ecran.

### Emploi & ORP

Ce bloc est centre sur les situations de candidature et de communication professionnelle :

- `formulaire`
- `email-ecrire`
- `email-pro`
- `retaper`
- `quiz`
- `vrai-faux`
- `trier`

L'objectif est de preparer des taches utiles dans la recherche d'emploi : remplir des informations, comprendre un contexte, repondre correctement et produire des contenus simples.

### Francais

Ce bloc propose des activites de langue et de vocabulaire :

- `alphabet`
- `ecouter`
- `anagramme`
- `apparier`
- `pendu`
- `classement`
- `mots-croises`
- `mots-meles`
- `demeler`
- `paire`

L'objectif est de renforcer la lecture, l'ecoute, l'ecriture et la memorisation.

## 7. Configuration centrale des exercices

Le fichier [js/exercises-config.js](/workspaces/AH/js/exercises-config.js:1) joue un role central.

Il definit pour chaque page :

- le nom de l'exercice
- son icone
- sa categorie
- sa section d'affichage
- les themes associes
- son lien HTML

Il contient aussi :

- la liste des pages suivies dans la progression
- les regles XP par exercice
- les categories pedagogiques
- la liste de quelques applications annexes

Cette configuration permet d'avoir une plateforme coherente et facile a faire evoluer.

## 8. Suivi de progression

Le suivi de progression est gere par [js/score.js](/workspaces/AH/js/score.js:1).

Pour chaque exercice, la plateforme enregistre plusieurs informations :

- le nombre de reponses correctes
- le nombre de tentatives
- le nombre d'erreurs
- l'XP gagnee
- le statut de progression
- des compteurs de vote `like/dislike`

Les statuts possibles sont :

- `not_started`
- `in_progress`
- `completed`

Les donnees sont enregistrees sous une cle `localStorage` nommee `ah:scores:v1`.

## 9. Ce que voit l'utilisateur dans le suivi

La page [games/evaluations.html](/workspaces/AH/games/evaluations.html:1) sert de tableau de bord.

Elle affiche notamment :

- le niveau global
- l'XP total
- une barre de progression vers le niveau suivant
- des jalons de progression
- une serie de jours consecutifs
- l'XP gagnee sur 7 jours
- les 5 dernieres sessions
- des indicateurs globaux
- un detail par exercice

Elle contient aussi une lecture pedagogique de la situation :

- point fort
- point a travailler
- prochaine etape recommandee

La plateforme ne montre donc pas seulement des scores : elle essaie aussi de donner du sens pedagogique aux resultats.

## 10. Systeme XP

Chaque exercice possede ses propres regles de gain d'XP, definies dans [js/exercises-config.js](/workspaces/AH/js/exercises-config.js:1).

Exemples :

- `alphabet` : `+5 XP` par bonne reponse
- `clavier` : `+1 XP` par bonne touche
- `quiz` : `+3 XP` par bonne reponse avec bonus de serie
- `retaper` : XP variable selon la qualite de la saisie
- `formulaire` : XP variable avec bonus si l'exercice est reussi sans indice

Le niveau global est calcule a partir de l'XP totale. Dans l'interface commune :

- `Niv. 1` en dessous de `50 XP`
- `Niv. 2` a partir de `50 XP`
- `Niv. 3` a partir de `150 XP`
- `Niv. 4` a partir de `350 XP`

## 11. Interface commune

Le fichier [js/shared.js](/workspaces/AH/js/shared.js:1) genere des elements partages par l'ensemble du site :

- l'en-tete
- la barre laterale
- le pied de page
- l'affichage global de la progression

La barre laterale organise la navigation en sections :

- debut
- bureautique
- emploi
- francais
- applications

Chaque lien peut aussi refleter l'etat d'avancement d'un exercice.

## 12. Autoevaluation

La page [games/autoevaluation.html](/workspaces/AH/games/autoevaluation.html:1) propose une **autoevaluation intelligente**.

Son principe :

- l'utilisateur repond a 10 mises en situation
- les reponses ont des poids differents
- les competences critiques comptent davantage
- un niveau global est calcule

L'analyse couvre au moins deux grands domaines :

- bureautique
- recherche d'emploi

La page affiche ensuite :

- un score par domaine
- un niveau global
- des forces
- des priorites
- un parcours recommande
- un conseil formateur
- une comparaison entre deux evaluations

Elle peut aussi exporter le resultat en texte.

## 13. Gestion des donnees et confidentialite

La page [games/donnees.html](/workspaces/AH/games/donnees.html:1) explique clairement la logique de confidentialite.

La plateforme affirme que :

- les donnees restent sur cet appareil
- rien n'est envoye sur internet
- le stockage repose sur le navigateur

L'utilisateur peut :

- voir un resume des donnees enregistrees
- exporter ses donnees en JSON
- importer un fichier JSON deja exporte
- effacer les scores et la progression
- tout supprimer

Cette partie est utile pour un usage pedagogique local, dans un contexte ou la simplicite et la confidentialite sont importantes.

## 14. Applications annexes

La configuration mentionne aussi des applications complementaires :

- un generateur de CV
- un module de competences pour CV
- un simulateur d'e-mails professionnels

Ces elements montrent que la plateforme ne se limite pas a des mini-jeux : elle cherche aussi a accompagner des besoins concrets lies a l'emploi.

## 15. Points forts de la plateforme

Les points forts observes dans le projet sont les suivants :

- fonctionnement hors ligne
- stockage local simple
- navigation claire
- progression visible
- logique pedagogique progressive
- exercices varies
- lien fort avec des usages du quotidien

La page d'accueil insiste d'ailleurs sur une experience calme, lisible et rassurante.

## 16. Limites actuelles visibles dans le code

Quelques limites apparaissent aussi dans les fichiers consultes :

- le systeme de vote est present mais inactif
- certaines applications declarees dans la configuration pointent vers des chemins qui semblent externes au dossier `games/`
- la plateforme repose sur du stockage local, donc les donnees peuvent etre perdues si le navigateur est vide

Le fichier [VOTE_SYSTEM.md](/workspaces/AH/VOTE_SYSTEM.md:1) precise que `js/vote-system.js` est actuellement un placeholder de compatibilite.

## 17. Utilisation type

Un parcours simple d'utilisation peut ressembler a ceci :

1. Ouvrir `index.html`.
2. Arriver sur la page d'accueil.
3. Choisir un exercice depuis la barre laterale.
4. Realiser l'activite.
5. Voir la progression se mettre a jour.
6. Consulter la page des evaluations.
7. Faire une autoevaluation pour identifier les priorites.
8. Exporter les donnees si besoin.

## 18. Resume

La plateforme AH est une **plateforme web statique d'apprentissage progressif** orientee vers l'autonomie numerique, le francais et la recherche d'emploi.

Elle combine :

- des exercices pratiques
- un systeme de progression local
- un tableau de bord d'evaluation
- une autoevaluation guidee
- des outils annexes utiles pour l'emploi

Son identite repose sur une idee simple : **apprendre pas a pas, dans un cadre clair, sans stress, avec des resultats visibles et conserves localement**.
