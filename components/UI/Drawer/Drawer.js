import React, { useEffect, useState } from 'react';
import styles from '@/components/UI/Drawer/Drawer.module.scss'; 

const Drawer = ({ isOpen, onClose, children }) => {
  const [isClosing, setIsClosing] = useState(false);

  // Fonction pour calculer la largeur de la scrollbar
  const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
  };

  // Gestion de l'état pour bloquer le scroll et ajuster la marge du body
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = getScrollbarWidth(); // Calcul de la largeur de la scrollbar
      document.body.style.overflow = 'hidden'; // Bloquer le scroll
      document.body.style.paddingRight = `${scrollbarWidth}px`; // Ajouter une marge à droite pour compenser la disparition de la scrollbar
    } else {
      document.body.style.overflow = ''; // Réinitialiser le scroll
      document.body.style.paddingRight = ''; // Réinitialiser la marge à droite
    }

    return () => {
      // Nettoyage lors de la fermeture du drawer
      document.body.style.overflow = ''; // Réinitialiser le scroll
      document.body.style.paddingRight = ''; // Réinitialiser la marge à droite
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true); // Lance la fermeture du contenu
    setTimeout(() => {
      onClose(); // Ferme le drawer après que l'opacité du contenu ait disparu
      setIsClosing(false); // Réinitialise l'état après la fermeture
    }, 300); // Délai de 300ms pour laisser le contenu disparaître avant que le drawer ne se rétracte
  };

  return (
    <>
      {/* Drawer qui se déplace de droite à gauche */}
      <div className={`${styles.drawer} ${isOpen ? styles.open : ''} ${isClosing ? 'closing' : ''}`}>
        <div className={styles.drawer__content}>
          <button className={styles.drawer__closeButton} onClick={handleClose}>
            x
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;
