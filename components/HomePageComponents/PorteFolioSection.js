import React from 'react';
import EmblaCarousel from '@/components/Carousel/EmblaCarousel';
import styles from '@/styles/components/HomePageModule/PorteFolioSection.module.scss'
import Link from 'next/link';

export const PorteFolioSection = ({ projets }) => {
  
  const slides = projets.map(projet => (
    <div key={projet.id} className={styles.embla__slide}>
      <Link className={styles.slideLink} href="/#" passHref>
      

          <div 
            className={styles.embla__slideBackground} 
            style={{ backgroundImage: `url(${projet.featuredImage?.node?.mediaItemUrl})` }}
          >
            <div className={styles.embla__slideContent}>
              <h2>{projet.title}</h2>
              {projet.content && <div dangerouslySetInnerHTML={{ __html: projet.content }} />}
              <h2>{projet.deTailsDuProjet.technologiesUtilisees}</h2>
            </div>
          </div>
      
      </Link>
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