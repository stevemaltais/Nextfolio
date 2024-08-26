import React, { useEffect, useRef } from 'react';
import styles from '@/styles/components/AboutPage/ObjectivesSection.module.scss';

const ObjectivesSection = ({ objectives }) => {
  const titleBigRef = useRef(null);
  const punchRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          titleBigRef.current.classList.add(styles['slide-in']);
          punchRef.current.classList.add(styles['slide-in']);
          observer.disconnect(); // Déclenchement unique
        }
      },
      {
        threshold: 0.1, // 10% de l'élément visible pour déclencher l'animation
      }
    );

    if (titleBigRef.current && punchRef.current) {
      observer.observe(titleBigRef.current);
      observer.observe(punchRef.current);
    }

    return () => {
      observer.disconnect(); // Nettoyage de l'observateur
    };
  }, []);

  return (
    <div className={styles.objectivesSection}>
      <h2 ref={titleBigRef} className={styles.titleBig}>Mes Objectifs</h2>
      <div ref={punchRef} className={styles.punch}>POUR 2024</div>
    </div>
  );
};

export default ObjectivesSection;
