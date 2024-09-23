import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/components/HomePageModule/BackgroundOverlay.module.scss'; 

const ImageOverlay = ({ isDrawerOpen }) => {
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  // Calculer la largeur de la scrollbar et ajuster la position de l'image
  useEffect(() => {
    const calcScrollbarWidth = () => {
      const width = window.innerWidth - document.documentElement.clientWidth;
      setScrollbarWidth(width); // Stocke la largeur de la scrollbar
    };

    calcScrollbarWidth(); // Calcul initial

    // Ajouter ou retirer la compensation lorsque le drawer s'ouvre ou se ferme
    if (isDrawerOpen) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.paddingRight = '0px';
    }

    // Écoute le redimensionnement de la fenêtre pour recalculer la scrollbar si nécessaire
    window.addEventListener('resize', calcScrollbarWidth);
    return () => window.removeEventListener('resize', calcScrollbarWidth);
  }, [isDrawerOpen, scrollbarWidth]);

  return (
    <>
      <div
        className={styles.imageOverlay}
        style={{ right: isDrawerOpen ? `${scrollbarWidth}px` : '0px' }} // Compense la scrollbar
        data-scroll
        data-scroll-direction="vertical"
        data-scroll-speed="-7"
      >
        <Image
          className={styles.underlay}
          src="/hero_background.png"
          alt="Image forme abstraite"
          height={600}
          width={600}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>
    </>
  );
};

export default ImageOverlay;
