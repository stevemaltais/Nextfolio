import React, { useEffect, useState } from 'react';
import styles from '@/components/UI/Drawer.module.scss';

const Drawer = ({ isOpen, onClose, children }) => {
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  // Utilise useEffect pour bloquer/débloquer le scroll
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    // Nettoyage de l'effet quand le composant est démonté ou le drawer est fermé
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  // Fonction pour gérer le début du swipe (touchstart)
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  // Fonction pour gérer la fin du swipe (touchend)
  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  // Fonction pour détecter le swipe
  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 100) {
      // Si on swipes vers la gauche (drawer à droite), on ferme
      onClose();
    }
    // Réinitialisation des positions
    setTouchStartX(0);
    setTouchEndX(0);
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
