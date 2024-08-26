import React, { useEffect, useRef } from 'react';
import styles from '@/styles/components/AboutPage/VisionSection.module.scss';

const VisionSection = () => {
  const visionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visionRef.current.classList.add(styles['fade-in']);
          observer.disconnect(); // Déclenchement unique
        }
      },
      {
        threshold: 0.1, // 10% de l'élément visible pour déclencher l'animation
      }
    );

    if (visionRef.current) {
      observer.observe(visionRef.current);
    }

    return () => {
      observer.disconnect(); // Nettoyage de l'observateur
    };
  }, []);

  return (
    <div ref={visionRef} className={styles.visionSection}>
      <h2 className={styles.title}>Ma Vision du Développement</h2>
      <p className={styles.aboutMe__Explain}>
        En 2024, je perçois le développement web comme une opportunité majeure pour connecter les gens, 
        résoudre des problèmes environnementaux et sociaux, et innover dans la façon dont nous interagissons 
        avec le monde numérique. Je m'efforce de contribuer à des projets qui non seulement repoussent les limites 
        de la technologie, mais qui ont aussi un impact positif et durable sur la société.
      </p>
    </div>
  );
};

export default VisionSection;
