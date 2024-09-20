import React, { useState, useEffect } from 'react';
import styles from '@/components/UI/Drawer.module.scss'; 

const Drawer = ({ isOpen, onClose, children }) => {
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  // Utilise useEffect pour bloquer/débloquer le scroll
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  // Fonction pour gérer le début du swipe (touchstart)
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setIsSwiping(false); // Réinitialise l'état de swipe
  };

  // Fonction pour gérer le mouvement du swipe (touchmove)
  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
    if (Math.abs(touchStartX - touchEndX) > 50) {
      setIsSwiping(true); // Le swipe commence à être significatif
    }
  };

  // Fonction pour détecter le swipe (touchend)
  const handleTouchEnd = () => {
    // Si l'utilisateur a swipé suffisamment de gauche à droite
    if (isSwiping && touchEndX - touchStartX > 100) {
      onClose(); // Fermer le drawer si le swipe est vers la droite
    }

    // Réinitialisation des valeurs après le swipe
    setTouchStartX(0);
    setTouchEndX(0);
    setIsSwiping(false);
  };

  return (
    <div
      className={`${styles.drawer} ${isOpen ? styles.open : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.drawer__content}>
        <button className={styles.drawer__closeButton} onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Drawer;
