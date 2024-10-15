// next-sitemap.config.js

const siteUrl = 'https://stevemaltais.dev';

module.exports = {
  siteUrl,
  generateRobotsTxt: true,  // Générer un fichier robots.txt
  sitemapSize: 7000,        // Limite de 7000 URLs par fichier sitemap
  changefreq: 'daily',       // Fréquence d’exploration suggérée
  priority: 0.7,             // Priorité par défaut

  // Exclusion de certaines routes
  exclude: [
    '/cdn-cgi/*',           // Scripts Cloudflare
    '/_next/static/*',       // Fichiers statiques Next.js
    '/api/*',               // Routes API
    '/technologie/[tech]',  // Routes dynamiques brutes
    '/portefolio/[slug]',   // Routes dynamiques brutes
    '/blog/[slug]',         // Routes dynamiques brutes
  ],

  // Configuration de robots.txt
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },        // Autorise l'exploration du site
      { userAgent: '*', disallow: '/api/' }, // Bloque les routes API
      { userAgent: '*', disallow: '/_next/' }, // Bloque les fichiers Next.js
      { userAgent: '*', disallow: '/cdn-cgi/' }, // Bloque les scripts Cloudflare
    ],
    additionalSitemaps: [
      `${siteUrl}/sitemap-0.xml`,  // Inclusion manuelle du sitemap secondaire
    ],
  },
};
