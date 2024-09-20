import React, { useEffect } from 'react';
import styles from '@/components/UI/Drawer.module.scss';

const Drawer = ({ isOpen, onClose, children }) => {
  
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

  return (
    <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
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
