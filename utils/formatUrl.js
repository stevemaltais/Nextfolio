/**
 * Fonction utilitaire pour formater une URL en supprimant les protocoles HTTP/HTTPS
 * et les slashes de fin.
 *
 * @param {string} url - L'URL à formater.
 * @returns {string} - L'URL formatée.
 */
export const formatUrl = (url) => url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : '';
