import React from 'react';
import styles from '@/components/UI/Drawer.module.scss'; // Nous allons créer ce fichier SCSS pour le style

const Drawer = ({ isOpen, onClose, children }) => {
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
