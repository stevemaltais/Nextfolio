import React from 'react';
import EmblaCarousel from '@/components/Carousel/EmblaCarousel';
import styles from '@/styles/components/HomePageModule/PorteFolioSection.module.scss';
import Link from 'next/link';
import technoColors from '@/utils/technoColors';
import { useRouter } from 'next/router';

export const PorteFolioSection = ({ projets }) => {
  const router = useRouter(); 

  const slides = projets.map(projet => (
    <div key={projet.id} className={styles.embla__slide} onClick={() => router.push(`/portefolio/${projet.slug}`)}>
      <div 
        className={styles.embla__slideBackground} 
        style={{ backgroundImage: `url(${projet.featuredImage?.node?.mediaItemUrl})` }}
      >
        <div className={styles.embla__slideContent}>
          <h2>{projet.title}</h2>
          {projet.content && <div dangerouslySetInnerHTML={{ __html: projet.content }} />}
          {projet.deTailsDuProjet.technologiesUtilisees && Array.isArray(projet.deTailsDuProjet.technologiesUtilisees) &&
            <div style={{ display: 'flex' }} onClick={(e) => e.stopPropagation()}>
              {projet.deTailsDuProjet.technologiesUtilisees.map((techno) => (
                <a 
                  key={techno}
                  href={`/technologie/${encodeURIComponent(techno.toLowerCase())}`}
                  className={styles.techno}
                  style={{ backgroundColor: technoColors[techno] || '#64d8ff' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {techno}
                </a>
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  ));

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
