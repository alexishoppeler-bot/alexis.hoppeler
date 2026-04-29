'use strict';

(function initCvCompetences() {
  const data = {
    chauffeur: {
      comp: [
        "Conduite de véhicules de livraison",
        "Chargement et déchargement des marchandises",
        "Respect des itinéraires et délais",
        "Contrôle des documents de livraison",
        "Entretien de base du véhicule",
        "Respect des règles de circulation",
        "Relation professionnelle avec les clients",
        "Gestion autonome des tournées"
      ],
      H: ["Ponctuel", "Autonome", "Responsable", "Prudent", "Fiable", "Organisé"],
      F: ["Ponctuelle", "Autonome", "Responsable", "Prudente", "Fiable", "Organisée"]
    },
    securite: {
      comp: [
        "Surveillance des lieux et des accès",
        "Contrôle des entrées et sorties",
        "Application des consignes de sécurité",
        "Rédaction de rapports simples",
        "Gestion des situations conflictuelles",
        "Communication avec les équipes",
        "Respect strict des procédures",
        "Intervention en cas d'incident"
      ],
      H: ["Calme", "Vigilant", "Responsable", "Fiable", "Discret", "Autoritaire"],
      F: ["Calme", "Vigilante", "Responsable", "Fiable", "Discrète", "Autoritaire"]
    },
    administratif: {
      comp: [
        "Accueil téléphonique et physique",
        "Classement et archivage de documents",
        "Saisie de données simples",
        "Utilisation de Word et e-mails",
        "Gestion du courrier entrant et sortant",
        "Respect de la confidentialité",
        "Organisation des tâches administratives",
        "Communication interne professionnelle"
      ],
      H: ["Organisé", "Autonome", "Discret", "Fiable", "Soigneux", "Polyvalent"],
      F: ["Organisée", "Autonome", "Discrète", "Fiable", "Soigneuse", "Polyvalente"]
    },
    reassort: {
      comp: [
        "Mise en rayon des produits",
        "Contrôle des dates et de la qualité",
        "Réassort des rayons",
        "Organisation des stocks",
        "Respect des consignes du magasin",
        "Travail en horaires flexibles",
        "Travail en équipe",
        "Maintien de la propreté du rayon"
      ],
      H: ["Rapide", "Organisé", "Autonome", "Fiable", "Endurant", "Soigneux"],
      F: ["Rapide", "Organisée", "Autonome", "Fiable", "Endurante", "Soigneuse"]
    },
    ems: {
      comp: [
        "Aide à l'accompagnement des résidents",
        "Soutien dans les gestes du quotidien",
        "Aide aux déplacements des personnes",
        "Respect des règles d'hygiène",
        "Communication bienveillante",
        "Travail en collaboration avec l'équipe",
        "Respect des consignes médicales",
        "Discrétion et respect de la confidentialité"
      ],
      H: ["Patient", "Respectueux", "Calme", "Fiable", "Empathique", "Responsable"],
      F: ["Patiente", "Respectueuse", "Calme", "Fiable", "Empathique", "Responsable"]
    },
    nettoyage: {
      comp: [
        "Nettoyage et entretien des surfaces et des sols",
        "Nettoyage complet des sanitaires",
        "Application des règles d'hygiène et de sécurité",
        "Utilisation correcte du matériel et des produits",
        "Organisation autonome du travail",
        "Gestion du temps et des priorités",
        "Travail efficace en équipe",
        "Respect des procédures de l'entreprise"
      ],
      H: ["Ponctuel", "Autonome", "Rigoureux", "Fiable", "Responsable", "Consciencieux"],
      F: ["Ponctuelle", "Autonome", "Rigoureuse", "Fiable", "Responsable", "Consciencieuse"]
    },
    cuisine: {
      comp: [
        "Préparation des ingrédients selon les consignes",
        "Application stricte des règles d'hygiène (HACCP)",
        "Organisation du poste de travail",
        "Soutien actif à l'équipe de cuisine",
        "Gestion du rythme et du stress",
        "Nettoyage et rangement de la cuisine",
        "Communication efficace avec l'équipe",
        "Respect des procédures internes"
      ],
      H: ["Dynamique", "Organisé", "Autonome", "Fiable", "Rigoureux", "Impliqué"],
      F: ["Dynamique", "Organisée", "Autonome", "Fiable", "Rigoureuse", "Impliquée"]
    },
    batiment: {
      comp: [
        "Participation aux travaux de chantier",
        "Manutention et préparation du matériel",
        "Utilisation d'outils et machines de base",
        "Application stricte des règles de sécurité",
        "Lecture et respect des consignes",
        "Organisation efficace des tâches",
        "Travail coordonné avec l'équipe",
        "Respect des délais et procédures"
      ],
      H: ["Autonome", "Responsable", "Rigoureux", "Endurant", "Fiable", "Motivé"],
      F: ["Autonome", "Responsable", "Rigoureuse", "Endurante", "Fiable", "Motivée"]
    },
    logistique: {
      comp: [
        "Préparation et contrôle des commandes",
        "Manutention et stockage des marchandises",
        "Utilisation du matériel logistique",
        "Organisation du stock",
        "Gestion du temps et des priorités",
        "Respect des procédures et de la sécurité",
        "Communication avec l'équipe",
        "Contribution à l'amélioration du flux de travail"
      ],
      H: ["Organisé", "Autonome", "Responsable", "Fiable", "Rigoureux", "Réactif"],
      F: ["Organisée", "Autonome", "Responsable", "Fiable", "Rigoureuse", "Réactive"]
    },
    vente: {
      comp: [
        "Accueil et conseil à la clientèle",
        "Mise en rayon et présentation des produits",
        "Gestion de la caisse et des paiements",
        "Contrôle des stocks et réassort",
        "Respect des procédures de vente",
        "Communication professionnelle avec les clients",
        "Gestion des priorités en période d'affluence",
        "Travail en équipe"
      ],
      H: ["Souriant", "Autonome", "Organisé", "Fiable", "Responsable", "Polyvalent"],
      F: ["Souriante", "Autonome", "Organisée", "Fiable", "Responsable", "Polyvalente"]
    },
    jardin: {
      comp: [
        "Entretien des espaces verts",
        "Tonte et taille des végétaux",
        "Utilisation d'outils de jardinage",
        "Respect des règles de sécurité",
        "Organisation des tâches quotidiennes",
        "Travail en extérieur par tous les temps",
        "Collaboration avec l'équipe",
        "Respect des consignes du responsable"
      ],
      H: ["Endurant", "Autonome", "Sérieux", "Fiable", "Soigneux", "Motivé"],
      F: ["Endurante", "Autonome", "Sérieuse", "Fiable", "Soigneuse", "Motivée"]
    },
    restauration: {
      comp: [
        "Mise en place de la salle",
        "Accueil et service à la clientèle",
        "Prise et transmission des commandes",
        "Respect des règles d'hygiène",
        "Encaissement des paiements",
        "Gestion du rythme et du stress",
        "Nettoyage et rangement",
        "Travail en équipe"
      ],
      H: ["Dynamique", "Souriant", "Autonome", "Fiable", "Polyvalent", "Résistant"],
      F: ["Dynamique", "Souriante", "Autonome", "Fiable", "Polyvalente", "Résistante"]
    },
    hotellerie: {
      comp: [
        "Accueil des clients",
        "Entretien des chambres et espaces communs",
        "Respect des standards de qualité",
        "Gestion des demandes clients",
        "Organisation du travail quotidien",
        "Respect des règles d'hygiène",
        "Communication professionnelle",
        "Travail en équipe"
      ],
      H: ["Professionnel", "Discret", "Autonome", "Fiable", "Organisé", "Souriant"],
      F: ["Professionnelle", "Discrète", "Autonome", "Fiable", "Organisée", "Souriante"]
    },
    conciergerie: {
      comp: [
        "Entretien des immeubles et parties communes",
        "Gestion des déchets et recyclage",
        "Petits travaux de maintenance",
        "Surveillance des installations",
        "Organisation des tâches quotidiennes",
        "Communication avec les locataires",
        "Respect des règles de sécurité",
        "Travail en autonomie"
      ],
      H: ["Autonome", "Polyvalent", "Fiable", "Responsable", "Soigneux", "Organisé"],
      F: ["Autonome", "Polyvalente", "Fiable", "Responsable", "Soigneuse", "Organisée"]
    },
    manutention: {
      comp: [
        "Chargement et déchargement de marchandises",
        "Manutention manuelle de charges",
        "Respect des règles de sécurité",
        "Organisation de l'espace de travail",
        "Utilisation de matériel de manutention",
        "Gestion du rythme de travail",
        "Travail en équipe",
        "Respect des consignes"
      ],
      H: ["Endurant", "Motivé", "Sérieux", "Fiable", "Rapide", "Discipliné"],
      F: ["Endurante", "Motivée", "Sérieuse", "Fiable", "Rapide", "Disciplinée"]
    },
    aide_domicile: {
      comp: [
        "Aide aux tâches ménagères",
        "Entretien du logement",
        "Aide à la préparation des repas",
        "Respect de l'intimité des personnes",
        "Organisation du travail à domicile",
        "Communication bienveillante",
        "Respect des consignes",
        "Autonomie dans les tâches"
      ],
      H: ["Patient", "Respectueux", "Autonome", "Fiable", "Attentionné", "Responsable"],
      F: ["Patiente", "Respectueuse", "Autonome", "Fiable", "Attentionnée", "Responsable"]
    },
    echafaudeur: {
      comp: [
        "Montage et démontage d'échafaudages",
        "Lecture des plans simples",
        "Respect strict des règles de sécurité",
        "Utilisation d'outils spécifiques",
        "Travail en hauteur en toute sécurité",
        "Vérification de la stabilité des structures",
        "Collaboration avec les autres corps de métier",
        "Respect des délais de chantier"
      ],
      H: ["Vigilant", "Endurant", "Rigoureux", "Responsable", "Autonome", "Fiable"],
      F: ["Vigilante", "Endurante", "Rigoureuse", "Responsable", "Autonome", "Fiable"]
    },
    peintre: {
      comp: [
        "Préparation des surfaces (ponçage, nettoyage)",
        "Application de peinture et revêtements",
        "Protection des sols et du mobilier",
        "Utilisation d'outils de peinture",
        "Respect des consignes techniques",
        "Finitions soignées",
        "Organisation du poste de travail",
        "Respect des délais"
      ],
      H: ["Soigneux", "Minutieux", "Autonome", "Fiable", "Organisé", "Patient"],
      F: ["Soigneuse", "Minutieuse", "Autonome", "Fiable", "Organisée", "Patiente"]
    },
    macon: {
      comp: [
        "Réalisation de travaux de maçonnerie",
        "Préparation et coulage du béton",
        "Montage de murs et cloisons",
        "Lecture de plans simples",
        "Utilisation d'outils de chantier",
        "Respect des normes de sécurité",
        "Travail en équipe",
        "Respect des délais"
      ],
      H: ["Endurant", "Précis", "Autonome", "Responsable", "Fiable", "Rigoureux"],
      F: ["Endurante", "Précise", "Autonome", "Responsable", "Fiable", "Rigoureuse"]
    },
    construction: {
      comp: [
        "Participation aux travaux de construction",
        "Manutention de matériaux",
        "Utilisation d'outils de base",
        "Respect des consignes de sécurité",
        "Nettoyage et organisation du chantier",
        "Travail en équipe",
        "Suivi des instructions du chef de chantier",
        "Respect des délais"
      ],
      H: ["Polyvalent", "Endurant", "Motivé", "Autonome", "Fiable", "Discipliné"],
      F: ["Polyvalente", "Endurante", "Motivée", "Autonome", "Fiable", "Disciplinée"]
    },
    coffreur: {
      comp: [
        "Réalisation de coffrages en bois ou métal",
        "Lecture de plans simples de coffrage",
        "Mise en place et démontage des coffrages",
        "Coulage du béton",
        "Contrôle de la qualité des ouvrages",
        "Respect strict des règles de sécurité",
        "Travail en coordination avec l'équipe",
        "Respect des délais de chantier"
      ],
      H: ["Précis", "Rigoureux", "Autonome", "Responsable", "Endurant", "Fiable"],
      F: ["Précise", "Rigoureuse", "Autonome", "Responsable", "Endurante", "Fiable"]
    },
    ferrailleur: {
      comp: [
        "Mise en place des armatures métalliques",
        "Lecture de plans simples d'armatures",
        "Découpe et façonnage du fer",
        "Assemblage et ligaturage des armatures",
        "Respect des normes de sécurité",
        "Travail en équipe sur chantier",
        "Préparation des zones de bétonnage",
        "Respect des délais"
      ],
      H: ["Technique", "Rigoureux", "Autonome", "Endurant", "Fiable", "Concentré"],
      F: ["Technique", "Rigoureuse", "Autonome", "Endurante", "Fiable", "Concentrée"]
    },
    aide_macon: {
      comp: [
        "Aide aux travaux de maçonnerie",
        "Préparation des matériaux",
        "Manutention sur le chantier",
        "Nettoyage et rangement du chantier",
        "Utilisation d'outils simples",
        "Respect des consignes de sécurité",
        "Travail en équipe",
        "Respect des délais"
      ],
      H: ["Motivé", "Endurant", "Autonome", "Fiable", "Sérieux", "Respectueux"],
      F: ["Motivée", "Endurante", "Autonome", "Fiable", "Sérieuse", "Respectueuse"]
    }
  };

  const metiersMeta = {
    chauffeur: "Chauffeur / Livreur",
    securite: "Agent de sécurité",
    administratif: "Employé administratif simple",
    reassort: "Réassortisseur",
    ems: "Aide en EMS / soins non qualifiés",
    nettoyage: "Agent de nettoyage",
    cuisine: "Aide de cuisine",
    batiment: "Ouvrier bâtiment",
    logistique: "Aide logistique",
    vente: "Employé de commerce",
    jardin: "Jardinier / Espaces verts",
    restauration: "Employé de restauration",
    hotellerie: "Employé d'hôtel",
    conciergerie: "Conciergerie",
    manutention: "Manutentionnaire",
    aide_domicile: "Aide à domicile",
    echafaudeur: "Échafaudeur",
    peintre: "Peintre en bâtiment",
    macon: "Maçon",
    construction: "Ouvrier en construction",
    coffreur: "Coffreur",
    ferrailleur: "Ferrailleur",
    aide_macon: "Aide maçon"
  };

  const profil = document.getElementById("profil");
  const metier = document.getElementById("metier");
  const compBox = document.getElementById("competences");
  const qualBox = document.getElementById("qualites");
  const warning = document.getElementById("warning");
  const status = document.getElementById("status");
  const toast = document.getElementById("toast");
  const overlay = document.getElementById("overlay");
  const manualText = document.getElementById("manualText");
  const btnClose = document.getElementById("btnClose");
  const btnSelect = document.getElementById("btnSelect");
  const diagBox = document.getElementById("diagBox");
  const diag = document.getElementById("diag");
  const btnTestCopy = document.getElementById("btnTestCopy");
  const btnShowDiag = document.getElementById("btnShowDiag");

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 1100);
  }

  function openManualCopy(text) {
    manualText.value = String(text);
    overlay.classList.add("show");
    window.setTimeout(() => {
      manualText.focus();
      manualText.select();
    }, 50);
  }

  function setWarning(msg) {
    warning.textContent = msg || "";
    if (msg) status.textContent = "";
  }

  function renderEmptyState(container, text) {
    container.innerHTML = '<div class="empty-state">' + text + "</div>";
  }

  async function copyText(text) {
    const plain = String(text);

    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(plain);
        showToast("Copié");
        return { ok: true, method: "clipboard-api" };
      }
    } catch (err) {
    }

    try {
      const ta = document.createElement("textarea");
      ta.value = plain;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-1000px";
      ta.style.left = "-1000px";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      if (ok) {
        showToast("Copié");
        return { ok: true, method: "execcommand" };
      }
    } catch (err) {
    }

    openManualCopy(plain);
    return { ok: false, method: "manual" };
  }

  function makeCopyButton(text) {
    const btn = document.createElement("button");
    btn.textContent = "📋 Copier";
    btn.className = "btn btn-ghost btn-sm copy-btn";
    btn.type = "button";
    btn.setAttribute("aria-label", "Copier");
    btn.addEventListener("click", async () => {
      status.textContent = "";
      const result = await copyText(text);
      if (!result.ok && result.method === "manual") {
        status.textContent = "Copie automatique bloquée. La fenêtre de copie manuelle est ouverte.";
      }
    });
    return btn;
  }

  function renderList(container, items) {
    container.innerHTML = "";
    items.forEach((text) => {
      const item = document.createElement("div");
      item.className = "list-item";

      const label = document.createElement("span");
      label.textContent = text;

      item.appendChild(label);
      item.appendChild(makeCopyButton(text));
      container.appendChild(item);
    });
  }

  function fillMetiers() {
    metier.innerHTML = "";
    const opt0 = document.createElement("option");
    opt0.value = "";
    opt0.textContent = "-- Choisir --";
    metier.appendChild(opt0);

    Object.keys(metiersMeta).forEach((key) => {
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = metiersMeta[key];
      if (!data[key]) {
        opt.textContent += " (bientôt)";
        opt.disabled = true;
      }
      metier.appendChild(opt);
    });
  }

  function update() {
    if (!profil.value || !metier.value) {
      renderEmptyState(compBox, "Choisissez un profil et un métier pour afficher les compétences.");
      renderEmptyState(qualBox, "Choisissez un profil et un métier pour afficher les qualités.");
      setWarning("Choisissez le profil (H/F) et le métier.");
      return;
    }

    if (!data[metier.value]) {
      renderEmptyState(compBox, "Ce métier n'est pas encore rempli.");
      renderEmptyState(qualBox, "Ce métier n'est pas encore rempli.");
      setWarning("Ce métier n'est pas encore rempli.");
      return;
    }

    setWarning("");
    const d = data[metier.value];
    renderList(compBox, d.comp);
    renderList(qualBox, d[profil.value]);
  }

  function runDiagnostics() {
    const lines = [];
    const issues = [];

    lines.push("UserAgent: " + navigator.userAgent);
    lines.push("Secure context: " + String(window.isSecureContext));
    lines.push("Clipboard API present: " + String(!!(navigator.clipboard && navigator.clipboard.writeText)));

    Object.keys(data).forEach((m) => {
      const d = data[m];
      if (!d || typeof d !== "object") issues.push(m + ": missing object");
      if (!Array.isArray(d.comp) || d.comp.length !== 8) issues.push(m + ".comp must be 8");
      if (!Array.isArray(d.H) || d.H.length < 5 || d.H.length > 6) issues.push(m + ".H must be 5-6");
      if (!Array.isArray(d.F) || d.F.length < 5 || d.F.length > 6) issues.push(m + ".F must be 5-6");
      (d.comp || []).forEach((s, i) => { if (!String(s).trim()) issues.push(m + ".comp[" + i + "] empty"); });
      (d.H || []).forEach((s, i) => { if (!String(s).trim()) issues.push(m + ".H[" + i + "] empty"); });
      (d.F || []).forEach((s, i) => { if (!String(s).trim()) issues.push(m + ".F[" + i + "] empty"); });
    });

    const disabledLabels = [];
    Array.from(metier.options).forEach((o) => {
      if (o.disabled) disabledLabels.push(o.value);
    });
    disabledLabels.forEach((key) => {
      if (data[key]) issues.push("Option " + key + " disabled but has data");
    });

    lines.push("Data checks: " + (issues.length ? "FAIL" : "OK"));
    if (issues.length) lines.push("Issues:\n- " + issues.join("\n- "));
    lines.push("Métiers désactivés (bientôt): " + (disabledLabels.length ? disabledLabels.join(", ") : "aucun"));
    diag.textContent = lines.join("\n");
  }

  btnClose.addEventListener("click", () => overlay.classList.remove("show"));
  btnSelect.addEventListener("click", () => {
    manualText.focus();
    manualText.select();
  });
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.classList.remove("show");
  });

  btnTestCopy.addEventListener("click", async () => {
    const result = await copyText("TEST COPIE");
    runDiagnostics();
    diag.textContent += "\nCopy test method: " + result.method + " (ok=" + result.ok + ")";
  });

  btnShowDiag.addEventListener("click", () => {
    const isHidden = diagBox.hasAttribute("hidden");
    if (isHidden) {
      diagBox.removeAttribute("hidden");
      runDiagnostics();
    } else {
      diagBox.setAttribute("hidden", "");
    }
  });

  fillMetiers();
  [profil, metier].forEach((el) => el.addEventListener("change", update));
  update();
})();
