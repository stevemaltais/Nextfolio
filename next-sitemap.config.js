// next-sitemap.config.js
const siteUrl = 'https://stevemaltais.dev';
const generateRobotsTxt = true;
const sitemapSize = 7000;
const changefreq = 'daily';
const priority = 0.7;

// Ajouter ici les chemins que tu veux exclure
const exclude = ['/cdn-cgi/*', '/_next/static/*', '/api/*'];

const robotsTxtOptions = {
    policies: [
        { userAgent: '*', allow: '/' },
        { userAgent: '*', disallow: '/api/' },  // Empêcher les robots d'accéder à /api/
    ],
};

module.exports = {
    siteUrl,
    generateRobotsTxt,
    sitemapSize,
    changefreq,
    priority,
    exclude, // Exclusions ajoutées ici
    robotsTxtOptions,
};
