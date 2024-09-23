// utils/breakpoints.js

export const getLeftPosition = (isOpen, sidebarIsOpen) => {
    const windowWidth = window.innerWidth;
    const isLandscape = window.matchMedia('(orientation: landscape)').matches;
  
    if (isLandscape && windowWidth <= 767) {
      // Paysage sur les appareils mobiles
      return isOpen ? (sidebarIsOpen ? '200px' : '-350px') : '-350px';
    } else if (windowWidth <= 600) {
      // Très petits écrans (mobiles)
      return isOpen ? (sidebarIsOpen ? '58px' : '-350px') : '-350px';
    } else if (windowWidth <= 750) {
      // Petits écrans (tablettes ou mobiles)
      return isOpen ? (sidebarIsOpen ? '58px' : '-350px') : '-350px';
    } else if (windowWidth <= 992) {
      // Écrans de taille moyenne (tablettes en paysage)
      return isOpen ? (sidebarIsOpen ? '250px' : '7.8rem') : '-350px';
    } else if (windowWidth <= 1200) {
      // Ordinateurs portables ou petits écrans de bureau
      return isOpen ? (sidebarIsOpen ? '250px' : '7.8rem') : '-350px';
    } else {
      // Grands écrans (ordinateurs de bureau)
      return isOpen ? (sidebarIsOpen ? '250px' : '8rem') : '-350px';
    }
  };
  