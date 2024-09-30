// next-sitemap.config.js
const siteUrl = 'https://stevemaltais.dev';
const generateRobotsTxt = true;
const sitemapSize = 7000;
const changefreq = 'daily';
const priority = 0.7;
const exclude = [];
const robotsTxtOptions = {
    policies: [
        { userAgent: '*', allow: '/' },
        { userAgent: '*', disallow: '/api/' },
    ],
};

module.exports = {
    siteUrl,
    generateRobotsTxt,
    sitemapSize,
    changefreq,
    priority,
    exclude,
    robotsTxtOptions,
};
