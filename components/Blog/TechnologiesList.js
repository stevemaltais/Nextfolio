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
          {displayedTechnologies.map((tech) => (
            <li key={tech.id} className={styles.technologiesList__item}>
              <a
                href={`/technologie/${encodeURIComponent(tech.slug)}`}  // Utilisation du slug récupéré depuis ACF
                onClick={(e) => e.stopPropagation()}  // Empêche la propagation du clic si dans un Drawer
                className={styles.technologiesList__techno}
                style={{ backgroundColor: isInDrawer ? 'var(--accent-color)' : technoColors[tech.title] || '#64d8ff' }}  // Couleur personnalisée
              >
                {tech.title}  {/* Affiche le nom de la technologie */} 
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TechnologiesList;
