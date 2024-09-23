import React from 'react';
import styles from '@/styles/components/Carousel.module.scss'; // Assurez-vous que le chemin est correct

export const PrevButton = ({ onClick, disabled }) => (
  <button
    className={styles.embla__button}
    onClick={onClick}
    disabled={disabled}
    type="button"
  >
 
 <svg className={styles.embla__button__svg} viewBox="0 0 24 24">
      <path fill="currentColor" d="M15.41 16.59L10.83 12 15.41 7.41 14 6l-6 6 6 6z"/>
    </svg>
  </button>
);
