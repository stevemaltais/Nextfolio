import React, { useState } from 'react';
import EmblaCarousel from '@/components/Carousel/EmblaCarousel';
import styles from '@/styles/components/HomePageModule/PorteFolioSection.module.scss';
import { useRouter } from 'next/router';
import TechnologiesList from '../Blog/TechnologiesList';
import Drawer from '@/components/UI/Drawer';

export const PorteFolioSection = ({ projets }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false); // État de transition
  const router = useRouter();

  const openDrawer = (projet) => {
    if (selectedProject && selectedProject.id !== projet.id) {
      setIsTransitioning(true); // Déclenche la transition de sortie
      setTimeout(() => {
        setSelectedProject(projet); // Met à jour le projet sélectionné
        setIsTransitioning(false); // Réinitialise la transition
      }, 500); // Délai correspondant à la durée de l'animation
    } else {
      setSelectedProject(projet); // Met à jour le projet directement si le drawer est fermé
      setIsDrawerOpen(true); // Ouvre le drawer
    }
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const formatUrl = (url) => {
    return url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : '';
  };

  if (!projets || projets.length === 0) {
    return <p>Aucun projet disponible pour l'instant.</p>;
  }

  const slides = projets.map((projet) => {
    const backgroundImageUrl = projet.etudeDeCas?.mockupimage?.node?.sourceUrl || 
                               projet.featuredImage?.node?.mediaItemUrl || 
                               '/default-image.svg';

    return (
      <div 
        key={projet.id} 
        className={styles.embla__slide} 
        onClick={() => openDrawer(projet)} // Ouvre ou met à jour le drawer
      >
        <div 
          className={styles.embla__slideBackground} 
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        >
          <div className={styles.embla__slideContent}>
            <h2 className={styles.slideContent_title}>{formatUrl(projet.etudeDeCas?.urlDuProjet)}</h2>
            <TechnologiesList technologies={projet.etudeDeCas?.technologiesUtilisees} />
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

      {/* Drawer pour afficher le résumé du projet avec transition */}
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
        {selectedProject && (
          <div 
            className={`${styles.drawerContent} ${isTransitioning ? styles.drawerContentFadeOut : styles.drawerContentFadeIn}`} 
          >
            {selectedProject.featuredImage?.node?.mediaItemUrl && (
              <img 
                src={selectedProject.featuredImage.node.mediaItemUrl} 
                alt={selectedProject.title} 
                className={styles.drawerImage}
              />
            )}
            <h3>{selectedProject.detailsDuProjet?.titreCourtDuProjet}</h3>
            <p>{selectedProject.detailsDuProjet?.categorieDuProjet}</p>
            <div 
              dangerouslySetInnerHTML={{ __html: selectedProject.detailsDuProjet?.descriptionCourteDuProjet }} 
            />
            <span>{selectedProject.detailsDuProjet?.anneeDuProjet}</span>
            <button 
              onClick={() => router.push(`/portefolio/${selectedProject.slug}`)}
              className={styles.moreInfoButton}
            >
              En savoir plus
            </button>
          </div>
        )}
      </Drawer>
    </section>
  );
};
