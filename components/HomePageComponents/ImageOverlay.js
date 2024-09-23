import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/components/HomePageModule/BackgroundOverlay.module.scss';

const ImageOverlay = ({ isDrawerOpen }) => {
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  // Fonction pour calculer la largeur de la scrollbar
  const calcScrollbarWidth = () => {
    const width = window.innerWidth - document.documentElement.clientWidth;
    setScrollbarWidth(width);
  };

  useEffect(() => {
    calcScrollbarWidth(); // Calcul initial

    if (isDrawerOpen) {
      // Ajouter la compensation du margin au body
      document.body.style.overflow = 'hidden'; // Bloquer le scroll
      document.body.style.marginRight = `${scrollbarWidth}px`; // Ajouter une marge pour compenser
    } else {
      // Réinitialiser le body après la fermeture
      document.body.style.overflow = ''; // Réinitialiser le scroll
      document.body.style.marginRight = '0px'; // Réinitialiser la marge
    }

    // Mettre à jour la largeur de la scrollbar lors du redimensionnement de la fenêtre
    window.addEventListener('resize', calcScrollbarWidth);
    return () => window.removeEventListener('resize', calcScrollbarWidth);
  }, [isDrawerOpen, scrollbarWidth]);

  return (
    <div className={styles.imageOverlay}>
      <Image
        className={styles.underlay}
        src="/hero_background.png"
        alt="Image forme abstraite"
        height={600}
        width={600}
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
    </div>
  );
};

export default ImageOverlay;
