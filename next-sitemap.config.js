const siteUrl = 'https://stevemaltais.dev';
const generateRobotsTxt = true;
const sitemapSize = 7000;
const changefreq = 'daily';
const priority = 0.7;

// Chemins à exclure du sitemap
const exclude = [
  '/cdn-cgi/*',     // Exclut les scripts Cloudflare
  '/_next/static/*', // Exclut les fichiers statiques générés par Next.js
  '/api/*',          // Exclut les routes API
  '/technologie/[tech]', // Exclut les routes dynamiques brutes comme [tech]
  '/portefolio/[slug]', // Exclut les routes dynamiques brutes comme [slug]
  '/blog/[slug]', // Exclut les routes dynamiques brutes comme [slug]
];

const robotsTxtOptions = {
  policies: [
    { userAgent: '*', allow: '/' },      // Permet aux robots d'explorer le site
    { userAgent: '*', disallow: '/api/' }, // Bloque l'accès aux routes API
    { userAgent: '*', disallow: '/_next/' }, // Bloque l'accès aux fichiers Next.js
    { userAgent: '*', disallow: '/cdn-cgi/' }, // Bloque les scripts Cloudflare
    // Ajoute les exclusions pour les routes dynamiques
    { userAgent: '*', disallow: '/technologie/[tech]' }, 
    { userAgent: '*', disallow: '/portefolio/[slug]' }, 
    { userAgent: '*', disallow: '/blog/[slug]' },
  ],
};

module.exports = {
  siteUrl,
  generateRobotsTxt,
  sitemapSize,
  changefreq,
  priority,
  exclude, // Exclusions ajoutées ici pour le sitemap
  robotsTxtOptions,
};
