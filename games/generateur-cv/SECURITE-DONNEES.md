# Sécurité des données — Générateur de CV

## Vue d'ensemble

Ce projet est une application **100 % locale**, sans serveur, sans base de données, sans compte utilisateur. Toutes les données personnelles saisies (nom, adresse, téléphone, e-mail, expériences, photo) restent sur l'appareil de l'utilisateur et ne quittent jamais son navigateur.

---

## Données collectées

| Donnée | Type | Où elle est stockée |
|---|---|---|
| Prénom, Nom | Identifiant direct | `localStorage` du navigateur |
| Adresse postale | Donnée personnelle | `localStorage` du navigateur |
| Téléphone | Donnée personnelle | `localStorage` du navigateur |
| E-mail | Donnée personnelle | `localStorage` du navigateur |
| Photo (optionnelle) | Donnée personnelle (image base64) | `localStorage` du navigateur |
| Expériences professionnelles | Donnée professionnelle | `localStorage` du navigateur |
| Formations | Donnée professionnelle | `localStorage` du navigateur |
| Compétences, langues | Donnée professionnelle | `localStorage` du navigateur |
| Profil rédigé | Donnée professionnelle | `localStorage` du navigateur |

> **Aucune de ces données n'est envoyée à un serveur.** Aucune API externe n'est appelée avec les données de l'utilisateur. Le fichier Word généré est produit entièrement dans le navigateur et téléchargé directement.

---

## Risques identifiés et mesures en place

### Risque 1 — Données stockées en clair dans le navigateur

**Description :**
Les données du formulaire sont sauvegardées automatiquement dans le `localStorage` du navigateur sous la clé `cv-generator-state-v1`. Ce stockage persiste entre les sessions jusqu'à suppression explicite. Sur un ordinateur partagé (bibliothèque, école, conseiller emploi), une autre personne pourrait accéder au profil d'un utilisateur précédent.

**Ce qui a été fait :**
- Bannière d'information visible à chaque ouverture de l'outil, rappelant que les données sont stockées localement.
- Bouton **"Effacer mes données"** accessible en permanence dans la bannière.
- Proposition automatique d'effacement après chaque téléchargement du CV.

**Ce que l'utilisateur doit faire :**
- Sur un ordinateur partagé : cliquer sur "Effacer mes données" après utilisation.
- Ne pas laisser l'onglet ouvert sur un poste accessible à d'autres personnes.

---

### Risque 2 — Bibliothèque externe (PDF.js) chargée depuis un CDN

**Description :**
L'outil utilise la bibliothèque PDF.js (pour l'import de CV existants) chargée depuis `cdnjs.cloudflare.com`. Si ce CDN était compromis (attaque supply chain), un script malveillant pourrait s'exécuter dans le contexte de la page et accéder aux données du formulaire.

**Ce qui a été fait :**
- Ajout de l'attribut **`integrity`** (Subresource Integrity / SRI) sur la balise `<script>` :
  ```html
  integrity="sha384-/1qUCSGwTur9vjf/z9lmu/eCUYbpOTgSjmpbMQZ1/CtX2v/WcAIKqRv+U1DUCG6e"
  crossorigin="anonymous"
  ```
- Le navigateur vérifie l'empreinte cryptographique (SHA-384) du fichier avant de l'exécuter. Si le fichier a été modifié, même d'un seul octet, le navigateur bloque son exécution.

**Ce que cela garantit :**
- La bibliothèque PDF.js exécutée est exactement la version `3.11.174` auditée, non altérée.

---

### Risque 3 — Injection de code malveillant (XSS)

**Description :**
Une page HTML qui insère directement des données utilisateur dans le DOM via `innerHTML` est vulnérable aux attaques XSS (Cross-Site Scripting) : un utilisateur malveillant pourrait saisir du code HTML ou JavaScript dans un champ, qui s'exécuterait ensuite dans le navigateur.

**Ce qui a été fait :**
- Toutes les données utilisateur affichées dans la prévisualisation utilisent `textContent` (et non `innerHTML`), ce qui empêche l'interprétation de balises HTML.
- Les `innerHTML` présents dans le code servent uniquement à injecter des **structures HTML statiques** définies par le développeur, jamais des données saisies par l'utilisateur.
- Une **Content Security Policy (CSP)** a été ajoutée en en-tête de page pour limiter les sources de scripts autorisées.

---

### Risque 4 — Intégration dans une iframe (clickjacking)

**Description :**
Sans protection, une page peut être intégrée dans une `<iframe>` sur un site tiers. Un attaquant pourrait superposer une interface trompeuse par-dessus l'outil pour inciter l'utilisateur à saisir ses données sans s'en rendre compte.

**Ce qui a été fait :**
- Ajout de `<meta http-equiv="X-Frame-Options" content="DENY">` sur les deux pages.
- La directive `frame-ancestors 'none'` est incluse dans la CSP.
- Le navigateur refusera d'afficher la page dans n'importe quelle iframe.

---

### Risque 5 — Fuite d'URL via le referrer HTTP

**Description :**
Sans restriction, lorsqu'un utilisateur clique sur un lien vers une ressource externe, son navigateur peut transmettre l'URL de la page en cours dans l'en-tête `Referer`. Cela peut exposer des informations de navigation.

**Ce qui a été fait :**
- Ajout de `<meta name="referrer" content="no-referrer">` sur les deux pages.
- Aucune URL ne sera transmise en referrer lors de la navigation ou du chargement de ressources.

---

### Risque 6 — Ressources tierces non contrôlées (Google Fonts)

**Description :**
Les polices Google Fonts chargées via `@import url(...)` envoyaient une requête aux serveurs de Google à chaque chargement de page, permettant à Google de connaître l'adresse IP de l'utilisateur et l'heure de sa visite.

**Statut : ✅ Résolu**

Les polices sont désormais **auto-hébergées** dans le dossier `fonts/` :
- `Manrope` (400–800) — latin + latin-ext
- `Space Grotesk` (400–700) — latin + latin-ext
- `Nunito` (400–800) — latin + latin-ext
- `Lato` (400, 700) — latin + latin-ext

Le `@import` Google Fonts a été remplacé par `@import url('fonts/fonts.css')` dans les deux pages. La CSP a été mise à jour pour supprimer `https://fonts.googleapis.com` et `https://fonts.gstatic.com` des sources autorisées (`font-src 'self'` uniquement). Aucune requête réseau vers Google n'est plus émise.

---

## Content Security Policy en place

La CSP appliquée sur le générateur (`generateur-cv.html`) :

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src https://fonts.gstatic.com;
img-src 'self' data: blob:;
connect-src 'none';
object-src 'none';
base-uri 'self';
```

| Directive | Effet |
|---|---|
| `default-src 'self'` | Tout ce qui n'est pas listé explicitement est bloqué |
| `script-src` | Seuls les scripts de cdnjs.cloudflare.com sont autorisés |
| `connect-src 'none'` | Aucune requête réseau (fetch, XHR, WebSocket) n'est autorisée |
| `object-src 'none'` | Aucun plugin (Flash, etc.) ne peut s'exécuter |
| `img-src data: blob:` | Autorise les photos encodées en base64 et les blobs locaux |

---

## Ce que l'outil ne fait PAS

- ❌ Il n'envoie aucune donnée à un serveur.
- ❌ Il n'utilise pas de cookies.
- ❌ Il ne crée pas de compte utilisateur.
- ❌ Il n'intègre aucun tracker publicitaire ou analytique.
- ❌ Il n'envoie pas d'e-mail.
- ❌ Il ne partage aucune donnée avec un tiers.

---

## Conseils d'utilisation sécurisée

1. **Sur un ordinateur partagé** : cliquer sur "Effacer mes données" dans la bannière jaune avant de fermer l'onglet.
2. **Après téléchargement** : accepter la proposition d'effacement qui apparaît automatiquement.
3. **Photo** : éviter d'uploader une photo sur un ordinateur public — elle est stockée en base64 dans le localStorage.
4. **Navigateur privé** : utiliser le mode navigation privée / incognito efface automatiquement le localStorage à la fermeture de l'onglet.

---

## Récapitulatif des protections

| Protection | Statut |
|---|---|
| Données restent en local (pas de serveur) | ✅ |
| SRI sur PDF.js | ✅ |
| Content Security Policy (CSP) | ✅ |
| Anti-clickjacking (X-Frame-Options) | ✅ |
| No-referrer | ✅ |
| Affichage via `textContent` (anti-XSS) | ✅ |
| Bannière RGPD + bouton effacement | ✅ |
| Proposition d'effacement après export | ✅ |
| Google Fonts en auto-hébergement | ✅ |
| Chiffrement du localStorage | ⚠️ Non résolu (complexité vs bénéfice faible pour un outil local) |
