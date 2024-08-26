// PrimaryButton.js
import React from 'react';
import Link from 'next/link';
import styles from '@/styles/components/PrimaryButton.module.scss';

const PrimaryButton = ({ text, href, className, onClick, isButton }) => {
  const combinedClassName = `${styles.btn} ${className ? styles[className] : ''}`;

  if (isButton) {
    return (
      <button onClick={onClick} className={combinedClassName} data-text={text}>
        {text}
      </button>
    );
  }

  return (
    <Link href={href} legacyBehavior>
      <div className={combinedClassName} data-text={text}>
        {text}
      </div>
    </Link>
  );
};

export default PrimaryButton;
