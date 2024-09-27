// lib/gtag.js

export const GA_TRACKING_ID = 'G-405760612'; // Remplace par ton ID de mesure Google Analytics

// Fonction pour envoyer des événements de pageview à Google Analytics
export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// Fonction pour envoyer des événements personnalisés à Google Analytics
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
