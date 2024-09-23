export const getImageLimit = () => {
  if (typeof window === 'undefined') {
    // Retourne une valeur par défaut pendant le rendu côté serveur
    return 4;
  }

  const width = window.innerWidth;
  const isLandscape = window.matchMedia('(orientation: landscape)').matches;

  if (isLandscape && width <= 767) {
    return 4; // Nombre d'images pour les appareils en mode paysage et une largeur ≤ 767px
  } else if (width < 375) {
    return 3; // Très petits mobiles
  } else if (width < 576) {
    return 3; // Mobiles en portrait
  } else if (width < 768) {
    return 4; // Mobiles en paysage et tablettes en portrait
  } else if (width < 992) {
    return 4; // Tablettes en paysage
  } else if (width < 1200) {
    return 5; // Desktops
  } else {
    return 6; // Écrans larges
  }
};
