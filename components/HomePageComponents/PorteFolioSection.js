import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import EmblaCarousel from '@/components/Carousel/EmblaCarousel';
import styles from '@/styles/components/HomePageModule/PorteFolioSection.module.scss';
import { useRouter } from 'next/router';
import TechnologiesList from '../Blog/TechnologiesList';
import Drawer from '@/components/UI/Drawer/Drawer';
import PrimaryButton from '../PrimaryButton';
import ProjectDetails from '@/components/Projets/ProjectDetails'; // Importation du composant séparé
import { formatUrl } from '@/utils/formatUrl';

const PorteFolioSection = ({ projets }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isValidProject = (projet) => projet && projet.id;

  // Ouvre le drawer avec le projet sélectionné
  const handleProjectSelection = useCallback(
    (projet) => {
      if (selectedProject && selectedProject.id !== projet.id) {
        setIsTransitioning(true);
        setTimeout(() => {
          setSelectedProject(projet);
          setIsTransitioning(false);
        }, 500);
      } else {
        setSelectedProject(projet); // Sélectionne le projet
        setIsDrawerOpen(true); // Ouvre le drawer
      }
    },
    [selectedProject]
  );

  // Ferme le drawer et réinitialise l'état
  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      setSelectedProject(null); // Réinitialise après la fermeture
    }, 600); // Correspond à la durée de la transition de fermeture
  }, []);

  if (!projets || projets.length === 0) {
    return <p>Aucun projet disponible pour l'instant.</p>;
  }

  const renderSlide = useCallback(
    (projet) => {
      if (!isValidProject(projet)) {
        console.warn('Projet sans ID trouvé:', projet);
        return null; // Ignore les projets sans ID
      }

      const backgroundImageUrl =
        projet.etudeDeCas?.mockupimage?.node?.sourceUrl ||
        projet.featuredImage?.node?.mediaItemUrl ||
        '/default-image.svg';

      return (
        <div
          key={projet.id}
          className={styles.embla__slide}
          onClick={() => handleProjectSelection(projet)} // Ouvre ou met à jour le drawer
        >
          <div
            className={styles.embla__slideBackground}
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          >
            <div className={styles.embla__slideContent}>
              <h2 className={styles.slideContent_title}>
                {formatUrl(projet.etudeDeCas?.urlDuProjet || projet.title)}
              </h2>
              {projet.etudeDeCas?.technologiesUtilisees ? (
                <TechnologiesList technologies={projet.etudeDeCas.technologiesUtilisees} />
              ) : (
                <p>Aucune technologie spécifiée</p>
              )}
            </div>
          </div>
        </div>
      );
    },
    [handleProjectSelection, formatUrl]
  );

  return (
    <section className={styles.section} id="folio">
      <div className={styles.container} id="about-info">
        <h2>Portefolio</h2>
        <div className={styles.aboutSeparator}></div>
        <EmblaCarousel slides={projets.filter(isValidProject).map(renderSlide)} />
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer}>
        {selectedProject && (
          <div
            className={`${styles.drawerContent} ${
              isTransitioning ? styles.drawerContentFadeOut : styles.drawerContentFadeIn
            }`}
          >
            <h3 className={styles.drawerContent__Title}>
              {selectedProject.detailsDuProjet?.titreCourtDuProjet || selectedProject.title}
            </h3>
            {selectedProject.featuredImage?.node?.mediaItemUrl && (
              <img
                src={selectedProject.featuredImage.node.mediaItemUrl}
                alt={selectedProject.title}
                className={styles.drawerImage}
              />
            )}
            <ProjectDetails project={selectedProject} formatUrl={formatUrl} />
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

// Validation des props avec PropTypes
PorteFolioSection.propTypes = {
  projets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      detailsDuProjet: PropTypes.shape({
        titreCourtDuProjet: PropTypes.string,
        descriptionCourteDuProjet: PropTypes.string,
        categorieDuProjet: PropTypes.array,
        anneeDuProjet: PropTypes.string,
      }),
      featuredImage: PropTypes.shape({
        node: PropTypes.shape({
          mediaItemUrl: PropTypes.string,
        }),
      }),
      etudeDeCas: PropTypes.shape({
        technologiesUtilisees: PropTypes.array,
        mockupimage: PropTypes.shape({
          node: PropTypes.shape({
            sourceUrl: PropTypes.string,
          }),
        }),
        urlDuProjet: PropTypes.string,
      }),
    })
  ).isRequired,
};

export default PorteFolioSection;
