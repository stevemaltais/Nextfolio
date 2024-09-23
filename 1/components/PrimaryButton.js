// components/Button.js
import React from 'react';
import styles from '@/styles/components/PrimaryButton.module.scss'; 


const PrimaryButton = ({ text, onClick }) => {
  return (
    <a href="#" className={styles.btn} data-text={text} onClick={onClick}>
      {text}
    </a>
  );
};

export default PrimaryButton;

