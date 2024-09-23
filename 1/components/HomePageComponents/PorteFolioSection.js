import React, { useState } from 'react';
import EmblaCarousel from '@/components/Carousel/EmblaCarousel';
import styles from '@/styles/components/HomePageModule/PorteFolioSection.module.scss';
import { useRouter } from 'next/router';
import TechnologiesList from '../Blog/TechnologiesList';
import Drawer from '@/components/UI/Drawer';
import PrimaryButton from '../PrimaryButton';

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
            {/* Affiche seulement 4 technologies en dehors du Drawer */}
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
      <h3 className={styles.drawerContent__Title}>{selectedProject.detailsDuProjet?.titreCourtDuProjet}</h3>
      {selectedProject.featuredImage?.node?.mediaItemUrl && (
        <img 
          src={selectedProject.featuredImage.node.mediaItemUrl} 
          alt={selectedProject.title} 
          className={styles.drawerImage}
        />
      )}

      <div className={styles.projectDetails}>
        <h4>DESCRIPTION</h4>
        <div className={styles.drawerContent__Description}
          dangerouslySetInnerHTML={{ __html: selectedProject.detailsDuProjet?.descriptionCourteDuProjet }} 
        />
      </div>

      <div className={styles.projectDetails}>
        <span className={styles.DrawerTechno_separator}></span>
        <h4>INFOS PROJET</h4>
        <p><strong>Catégorie :</strong> {selectedProject.detailsDuProjet?.categorieDuProjet}</p>
        <p><strong>Année :</strong> {selectedProject.detailsDuProjet?.anneeDuProjet}</p>
        <p><strong>Lien :</strong> 
          {selectedProject.etudeDeCas?.urlDuProjet && (
            <a className={styles.projectDetails__Link} href={selectedProject.etudeDeCas.urlDuProjet} target="_blank" rel="noopener noreferrer">
              {formatUrl(selectedProject.etudeDeCas.urlDuProjet)}
            </a>
          )}
        </p>
        <div className={styles.DrawerTechno}>
          <span className={styles.DrawerTechno_separator}></span>
          <TechnologiesList technologies={selectedProject.etudeDeCas?.technologiesUtilisees} isInDrawer={true} />
        </div>
        <span className={styles.DrawerTechno_separator}></span>
      </div>

      {/* Utilisation de PrimaryButton */}
      <div className={styles.moreInfoButton}>
      <PrimaryButton 
        text="Étude de cas"
        onClick={() => router.push(`/portefolio/${selectedProject.slug}`)}
        
        data-scroll
      />
      </div>
    </div>
  )}
</Drawer>


    </section>
  );
};
