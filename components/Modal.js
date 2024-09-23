import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from '@/styles/components/Modal.module.scss';

const Modal = ({ isVisible, onClose, children }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (!isBrowser || !isVisible) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isBrowser, isVisible]);

  if (!isBrowser || !isVisible) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.close} onClick={onClose}>&times;</span>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
