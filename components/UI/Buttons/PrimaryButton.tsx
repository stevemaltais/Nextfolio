// PrimaryButton.js
import React from 'react';
import Link from 'next/link';
import styles from '@/components/UI/Buttons/PrimaryButton.module.scss';

const PrimaryButton = ({ text, href, className, onClick, isButton }) => {
  const combinedClassName = `${styles.btn} ${className ? styles[className] : ''}`;

  if (isButton) {
    return (
      <button onClick={onClick} className={combinedClassName}>
        {text}
      </button>
    );
  }

  return (
    <Link href={href} legacyBehavior>
      <div className={combinedClassName}>
        {text}
      </div>
    </Link>
  );
};

export default PrimaryButton;
