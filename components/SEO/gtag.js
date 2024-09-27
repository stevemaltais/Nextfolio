// lib/gtag.js

export const GA_TRACKING_ID = 'G-Z17QLKZT3S'; // Mets ton ID de mesure ici

// Fonction pour enregistrer un "pageview"
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// Fonction pour suivre un événement spécifique
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
