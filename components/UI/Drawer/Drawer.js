import React, { useEffect, useState } from 'react';
import styles from '@/components/UI/Drawer/Drawer.module.scss'; 

const Drawer = ({ isOpen, onClose, children }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
      setIsClosing(false); // Réinitialise l'état lors de l'ouverture
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true); // Lance la fermeture du contenu
    setTimeout(() => {
      onClose(); // Appelle la fonction de fermeture du drawer après 200ms (le temps que l'opacité atteigne 0)
      setIsClosing(false); // Réinitialise l'état après la fermeture
    }, 200); // Délai de 200ms pour laisser le temps au contenu de disparaître rapidement
  };

  return (
    <>
      {/* Overlay qui apparaît quand le drawer est ouvert */}
      <div 
        className={`${styles.drawerOverlay} ${isOpen ? styles.open : ''}`}
        onClick={handleClose} /* Ferme le drawer en cliquant sur l'overlay */
      />
      
      {/* Drawer qui s'étire de droite à gauche */}
      <div className={`${styles.drawer} ${isOpen ? styles.open : ''} ${isClosing ? 'closing' : ''}`}>
        <div className={styles.drawer__content}>
          <button className={styles.drawer__closeButton} onClick={handleClose}>
            ×
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;
