import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import EmblaCarousel from '@/components/Carousel/EmblaCarousel';
import styles from '@/styles/components/HomePageModule/PorteFolioSection.module.scss';
import TechnologiesList from '../Blog/TechnologiesList';
import Drawer from '@/components/UI/Drawer/Drawer';
import PrimaryButton from '../PrimaryButton';
import ProjectDetails from '@/components/Projets/ProjectDetails'; 
import { formatUrl } from '@/utils/formatUrl';

const PorteFolioSection = ({ projets }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const isValidProject = (projet) => projet && projet.id;

  const handleProjectSelection = useCallback(
    (projet) => {
      if (selectedProject && selectedProject.id !== projet.id) {
        setIsTransitioning(true);
        setTimeout(() => {
          setSelectedProject(projet);
          setIsTransitioning(false);
        }, 500);
      } else {
        setSelectedProject(projet);
        setIsDrawerOpen(true);
      }
    },
    [selectedProject]
  );

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      setSelectedProject(null);
    }, 600);
  }, []);

  if (!projets || projets.length === 0) {
    return <p>Aucun projet disponible pour l'instant.</p>;
  }

  const renderSlide = useCallback(
    (projet) => {
      if (!isValidProject(projet)) {
        console.warn('Projet sans ID trouvé:', projet);
        return null;
      }

      const backgroundImageUrl =
        projet.etudeDeCas?.mockupimage?.node?.sourceUrl ||
        projet.featuredImage?.node?.mediaItemUrl ||
        '/default-image.svg';

      return (
        <div
          key={projet.id}
          className={styles.embla__slide}
          onClick={() => handleProjectSelection(projet)}
        >
          <div
            className={styles.embla__slideBackground}
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          >
            <div className={styles.embla__slideContent}>
              <h2 className={styles.slideContent_title}>
                {formatUrl(projet.etudeDeCas?.urlDuProjet || projet.title)}
              </h2>
              {projet.etudeDeCas?.technologiesutilisees?.nodes?.length ? (
                <TechnologiesList technologies={projet.etudeDeCas.technologiesutilisees.nodes} />
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
            <ProjectDetails project={selectedProject} />
            <div className={styles.moreInfoButton}>
              <Link href={`/portefolio/${selectedProject.slug}`} scroll={true}>
                <div>
                  <PrimaryButton text="Étude de cas" />
                </div>
              </Link>
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
        technologiesutilisees: PropTypes.shape({
          nodes: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
              slug: PropTypes.string.isRequired,
            })
          ),
        }),
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
