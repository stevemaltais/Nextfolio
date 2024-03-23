import React from 'react';
import EmblaCarousel from '@/components/Carousel/EmblaCarousel';
import styles from '@/styles/components/HomePageModule/PorteFolioSection.module.scss';
import Link from 'next/link';
import technoColors from '@/utils/technoColors'; // Assurez-vous que ce fichier exporte bien l'objet technoColors

export const PorteFolioSection = ({ projets }) => {
  const slides = projets.map(projet => (
    <Link key={projet.id} href={`/portefolio/${projet.slug}`} passHref>
      <div className={styles.embla__slide}>
        <div 
          className={styles.embla__slideBackground} 
          style={{ backgroundImage: `url(${projet.featuredImage?.node?.mediaItemUrl})` }}
        >
         <div className={styles.embla__slideContent}>
            <h2>{projet.title}</h2>
            {projet.content && <div dangerouslySetInnerHTML={{ __html: projet.content }} />}
            {projet.deTailsDuProjet.technologiesUtilisees && Array.isArray(projet.deTailsDuProjet.technologiesUtilisees) &&
              <div style={{ display: 'flex' }}>
                {projet.deTailsDuProjet.technologiesUtilisees.map((techno) => (
                  // Modification ici
                  <div
                    key={techno}
                    className={styles.techno}
                    style={{ backgroundColor: technoColors[techno] || '#64d8ff' }}
                    onClick={(event) => {
                      // Empêcher l'événement de clic de se propager au slide
                      event.stopPropagation();
                      // Redirection ou autre logique ici
                      window.location.href = `/portefolio/technologie/${encodeURIComponent(techno.toLowerCase())}`;
                    }}
                  >
                    {techno}
                  </div>
                ))}
              </div>
            }
          </div>
        </div>
      </div>
    </Link>
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
