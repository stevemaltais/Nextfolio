import React from 'react';
import styles from '@/styles/components/Carousel.module.scss'; // Assurez-vous que le chemin est correct

export const NextButton = ({ onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    // Assurez-vous que cette ligne est correctement formatée
    className={`${styles.embla__button} ${styles['embla__button--next']}`}
    type="button"
  >
    <svg className={styles.embla__button__svg} viewBox="0 0 24 24">
      <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
    </svg>
  </button>
);

export default NextButton;
