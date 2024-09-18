import React from 'react';
import EmblaCarousel from '@/components/Carousel/EmblaCarousel';
import styles from '@/styles/components/HomePageModule/PorteFolioSection.module.scss';
import { useRouter } from 'next/router';
import technoColors from '@/utils/technoColors';
import TechnologiesList from '../Blog/TechnologiesList';


export const PorteFolioSection = ({ projets }) => {
  // Fonction pour tronquer l'URL
  const formatUrl = (url) => {
    if (!url) {
      return ''; // Retourne une chaîne vide si l'URL est nulle ou indéfinie
    }
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  };

  const router = useRouter();

  const slides = projets.map(projet => {
    // Utiliser la clé exacte pour accéder à l'URL de l'image de mockup
    const backgroundImageUrl = projet.deTailsDuProjet?.mockupimage?.node?.sourceUrl || 
                               projet.featuredImage?.node?.mediaItemUrl ||
                               '/default-image.svg'; // Image de secours

    // Log pour vérifier quelle image est utilisée
    console.log(`Projet: ${projet.slug}, Image URL: ${backgroundImageUrl}`);

    return (
      <div 
        key={projet.id} 
        className={styles.embla__slide} 
        onClick={() => router.push(`/portefolio/${projet.slug}`)}
      >
        <div 
          className={styles.embla__slideBackground} 
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        >
          <div className={styles.embla__slideContent}>
            <h2 className={styles.slideContent_title}>{formatUrl(projet.deTailsDuProjet?.urlDuProjet)}</h2>
            <TechnologiesList technologies={projet.deTailsDuProjet.technologiesUtilisees} />
        
          </div>
        </div>
      </div>
    );
  });

  return (
    <section className={styles.section} id="folio">
      <div className={styles.container} id="about-info">
        <h2>Portefolio</h2>
        <div className={styles.aboutSeparator}></div>
        <EmblaCarousel slides={slides} />
      </div>
    </section>
  );
};
