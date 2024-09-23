import React from 'react';
import styles from '@/components/MyFormModal.module.scss';

const MyFormModal = ({ onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    onClose(); // Ferme le modal après la soumission
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.formLabel}>Nom :</label>
        <input type="text" id="name" name="name" className={styles.formInput} required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.formLabel}>Email :</label>
        <input type="email" id="email" name="email" className={styles.formInput} required />
      </div>

      <button type="submit" className={styles.formButton}>Soumettre</button>
    </form>
  );
};

export default MyFormModal;
