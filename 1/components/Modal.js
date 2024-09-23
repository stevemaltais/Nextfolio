import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from '@/styles/components/Modal.module.scss'; // Assurez-vous que le chemin d'importation est correct

const Modal = ({ isVisible, onClose, children }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    // Ce useEffect s'exécute au montage du composant pour vérifier si nous sommes côté client
    setIsBrowser(true);

    // Cette fonction sera appelée au nettoyage du useEffect
    return () => {
      <div>Allo</div>
    };
  }, []);

  useEffect(() => {
    if (!isBrowser) return;

    if (isVisible) {
      // Bloquer le défilement du body
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        // Rétablir le défilement du body lorsque le modal est fermé ou le composant est démonté
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isBrowser, isVisible]);

  if (!isBrowser || !isVisible) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
        <span className={styles.close} onClick={onClose}>&times;</span>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
