// components/TechnologiesList.js
import React from 'react';
import styles from '@/components/Blog/TechnologiesList.module.scss'; // Import du nouveau module CSS
import technoColors from '@/utils/technoColors';

const TechnologiesList = ({ technologies }) => {
  if (!technologies?.length) {
    return null;
  }

  return (
    <div className={styles.technologiesList__container}>
      <div className={styles.technologiesList__content}>
        <ul>
          {technologies.map((tech, index) => (
            <li key={index} className={styles.technologiesList__item}>
              <a
                href={`/technologie/${encodeURIComponent(tech.toLowerCase())}`}
                onClick={(e) => e.stopPropagation()}
                className={styles.technologiesList__techno}
                style={{ backgroundColor: technoColors[tech] || '#64d8ff' }}
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
