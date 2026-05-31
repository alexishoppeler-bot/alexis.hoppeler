import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const baseUrl = (process.env.SITE_URL || 'https://alexishoppeler-bot.github.io/alexis.hoppeler/').replace(/\/?$/, '/');

global.window = {};
require(path.join(root, 'js/exercises-config.js'));

const config = global.window.EXERCISE_CONFIG || {};
const meta = config.meta || {};
const orderedPages = config.orderedPages || [];

const noindexPages = new Set([
  'games/donnees.html',
  'games/evaluations.html',
  'games/regles.html',
  'games/test-cherche-clique.html',
  'games/generateur-cv.html',
  'games/generateur-cv/presentation-ecran.html'
]);

const specialSeo = {
  'index.html': {
    title: 'Autonomie numérique, emploi et français | Exercices gratuits',
    description: "Exercices gratuits et progressifs pour apprendre le numérique, la bureautique, le français pratique, les e-mails, le CV et les démarches d'emploi."
  },
  'games/accueil.html': {
    title: 'Autonomie numérique, emploi et français | Exercices gratuits',
    description: "Plateforme d'exercices progressifs pour apprendre le numérique, la bureautique, le français pratique et les démarches d'emploi: clavier, souris, CV, e-mails, Google Docs, Excel et ORP."
  },
  'games/autoevaluation.html': {
    title: 'Autoévaluation numérique et emploi | Exercices adultes',
    description: 'Autoévaluation simple pour repérer ses priorités en numérique, emploi, bureautique, français pratique et démarches administratives.'
  },
  'games/cv-competences.html': {
    title: 'Compétences CV par métier | Exercice emploi gratuit',
    description: 'Choisir un métier et trouver des compétences simples à copier dans un CV, une lettre de motivation ou une candidature.'
  },
  'games/generateur-cv/generateur-cv.html': {
    title: 'Générateur de CV gratuit | CV et lettre de motivation',
    description: 'Créer un CV et une lettre de motivation étape par étape, avec un outil pédagogique simple utilisable sans compte.'
  },
  'games/simulateur-email/simulateur-email.html': {
    title: 'Simulateur d e-mails professionnels | Exercice emploi',
    description: 'S entraîner à écrire un e-mail professionnel clair pour une candidature, un rendez-vous, une demande d information ou une réponse à un employeur.'
  },
  'games/missions-google-docs.html': {
    title: 'Missions Google Docs | Exercices bureautique emploi',
    description: 'Exercices Google Docs pour créer des affiches, documents et supports utiles à la recherche d emploi, à la candidature et à la bureautique.'
  }
};

function normalize(value) {
  return String(value || '')
    .replace(/[’]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function htmlEscape(value) {
  return normalize(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function pageFromFile(file) {
  return path.basename(file, '.html');
}

function seoFor(file) {
  if (specialSeo[file]) return specialSeo[file];
  const page = pageFromFile(file);
  const item = meta[page];
  if (!item) {
    return {
      title: 'Exercice autonomie numérique | Formation adultes',
      description: 'Exercice interactif pour progresser en autonomie numérique, bureautique, français pratique et recherche d emploi.'
    };
  }
  const details = item.details || {};
  const titleSuffix = item.section === 'Emploi & ORP'
    ? 'emploi et ORP'
    : item.section === 'Français'
      ? 'français pratique'
      : 'autonomie numérique';
  return {
    title: `${item.name} | Exercice ${titleSuffix}`,
    description: details.summary || `Exercice ${item.name} pour progresser pas à pas en ${titleSuffix}, avec une activité simple et utile au quotidien.`
  };
}

function absoluteUrl(file) {
  if (file === 'index.html') return baseUrl;
  return new URL(file, baseUrl).toString();
}

function stripSeoTags(head) {
  return head
    .replace(/\s*<title>[\s\S]*?<\/title>\s*/i, '\n')
    .replace(/\s*<meta\s+name=["']description["'][^>]*>\s*/gi, '\n')
    .replace(/\s*<meta\s+name=["']robots["'][^>]*>\s*/gi, '\n')
    .replace(/\s*<link\s+rel=["']canonical["'][^>]*>\s*/gi, '\n')
    .replace(/\s*<meta\s+property=["']og:[^"']+["'][^>]*>\s*/gi, '\n');
}

function insertAfterViewportOrCharset(head, block) {
  const viewport = head.match(/<meta[^>]+name=["']viewport["'][^>]*>\s*/i);
  if (viewport && typeof viewport.index === 'number') {
    const end = viewport.index + viewport[0].length;
    return head.slice(0, end) + block + head.slice(end);
  }
  const charset = head.match(/<meta[^>]+charset=["']?[^"'\s/>]+["']?[^>]*>\s*/i);
  if (charset && typeof charset.index === 'number') {
    const end = charset.index + charset[0].length;
    return head.slice(0, end) + block + head.slice(end);
  }
  return block + head;
}

function updateHtmlSeo(file) {
  const abs = path.join(root, file);
  if (!fs.existsSync(abs)) return;
  const html = fs.readFileSync(abs, 'utf8');
  const match = html.match(/<head>([\s\S]*?)<\/head>/i);
  if (!match) return;
  const seo = seoFor(file);
  const robots = noindexPages.has(file) ? 'noindex, follow' : 'index, follow';
  const block = [
    `  <title>${htmlEscape(seo.title)}</title>`,
    `  <meta name="description" content="${htmlEscape(seo.description)}">`,
    `  <meta name="robots" content="${robots}">`,
    `  <link rel="canonical" href="${absoluteUrl(file)}">`,
    `  <meta property="og:type" content="website">`,
    `  <meta property="og:title" content="${htmlEscape(seo.title)}">`,
    `  <meta property="og:description" content="${htmlEscape(seo.description)}">`,
    `  <meta property="og:image" content="${absoluteUrl('assets/logo.png')}">`,
    `  <meta property="og:locale" content="fr_CH">`,
    ''
  ].join('\n');
  const cleanHead = stripSeoTags(match[1]);
  const nextHead = insertAfterViewportOrCharset(cleanHead, block).replace(/\n{3,}/g, '\n\n');
  fs.writeFileSync(abs, html.replace(match[1], nextHead));
}

function allHtmlFiles() {
  const files = ['index.html'];
  const stack = [path.join(root, 'games')];
  while (stack.length) {
    const dir = stack.pop();
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        stack.push(abs);
      } else if (entry.name.endsWith('.html')) {
        files.push(path.relative(root, abs).replace(/\\/g, '/'));
      }
    }
  }
  return files.sort();
}

function sitemapFiles() {
  const files = [
    'index.html',
    'games/accueil.html',
    'games/autoevaluation.html',
    ...orderedPages.map((page) => `games/${page}.html`),
    'games/cv-competences.html',
    'games/generateur-cv/generateur-cv.html',
    'games/simulateur-email/simulateur-email.html'
  ];
  return [...new Set(files)]
    .filter((file) => fs.existsSync(path.join(root, file)))
    .filter((file) => !noindexPages.has(file))
    .sort();
}

function writeSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = sitemapFiles().map((file) => {
    const priority = file === 'index.html' || file === 'games/accueil.html' ? '1.0' : '0.7';
    return [
      '  <url>',
      `    <loc>${absoluteUrl(file)}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      '    <changefreq>monthly</changefreq>',
      `    <priority>${priority}</priority>`,
      '  </url>'
    ].join('\n');
  }).join('\n');
  fs.writeFileSync(path.join(root, 'sitemap.xml'), [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    '</urlset>',
    ''
  ].join('\n'));
}

function writeRobots() {
  fs.writeFileSync(path.join(root, 'robots.txt'), [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin/',
    '',
    `Sitemap: ${absoluteUrl('sitemap.xml')}`,
    ''
  ].join('\n'));
}

for (const file of allHtmlFiles()) {
  updateHtmlSeo(file);
}
writeSitemap();
writeRobots();

console.log(`SEO mis à jour pour ${allHtmlFiles().length} page(s).`);
console.log(`Sitemap: ${absoluteUrl('sitemap.xml')}`);
