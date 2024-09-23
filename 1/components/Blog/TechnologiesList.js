import React from 'react';
import styles from '@/components/Blog/TechnologiesList.module.scss'; // Import du module CSS
import technoColors from '@/utils/technoColors';

const TechnologiesList = ({ technologies, isInDrawer = false }) => {
  if (!technologies?.length) {
    return null;
  }

  // Limite l'affichage à 4 technologies si ce n'est pas dans le Drawer
  const displayedTechnologies = isInDrawer ? technologies : technologies.slice(0, 4);

  return (
    <div className={`${styles.technologiesList__container} ${isInDrawer ? styles.drawerTechnologiesGrid : ''}`}>
      <div className={styles.technologiesList__content}>
        <ul>
          {displayedTechnologies.map((tech, index) => (
            <li key={index} className={styles.technologiesList__item}>
              <a
                href={`/technologie/${encodeURIComponent(tech.toLowerCase())}`}
                onClick={(e) => e.stopPropagation()}
                className={styles.technologiesList__techno}
                style={{ backgroundColor: isInDrawer ? 'var(--accent-color)' : technoColors[tech] || '#64d8ff' }} // Couleur personnalisée pour le drawer
              >
                {tech}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TechnologiesList;
