import React from 'react';
import PropTypes from 'prop-types';
import TechnologiesList from '../Blog/TechnologiesList';
import styles from '@/styles/components/HomePageModule/PorteFolioSection.module.scss';

const ProjectDetails = ({ project, formatUrl }) => (
  <div>
    <div className={styles.projectDetails}>
      <h4>DESCRIPTION</h4>
      <div 
        className={styles.drawerContent__Description}
        dangerouslySetInnerHTML={{ __html: project.detailsDuProjet?.descriptionCourteDuProjet }} 
      />
    </div>
    <div className={styles.projectDetails}>
      <span className={styles.DrawerTechno_separator}></span>
      <h4>INFOS PROJET</h4>
      <p><strong>Catégorie :</strong> {Array.isArray(project.detailsDuProjet?.categorieDuProjet) ? project.detailsDuProjet.categorieDuProjet.join(', ') : project.detailsDuProjet?.categorieDuProjet}</p>
      <p><strong>Année :</strong> {project.detailsDuProjet?.anneeDuProjet}</p>
      <p><strong>Lien :</strong> 
        {project.etudeDeCas?.urlDuProjet && (
          <a className={styles.projectDetails__Link} href={project.etudeDeCas.urlDuProjet} target="_blank" rel="noopener noreferrer">
            {formatUrl(project.etudeDeCas.urlDuProjet)}
          </a>
        )}
      </p>
      <div className={styles.DrawerTechno}>
        <span className={styles.DrawerTechno_separator}></span>
        <TechnologiesList technologies={project.etudeDeCas?.technologiesUtilisees} isInDrawer={true} />
      </div>
      <span className={styles.DrawerTechno_separator}></span>
    </div>
  </div>
);

ProjectDetails.propTypes = {
  project: PropTypes.shape({
    detailsDuProjet: PropTypes.shape({
      descriptionCourteDuProjet: PropTypes.string,
      categorieDuProjet: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),  // Modifié pour accepter soit une chaîne, soit un tableau
      anneeDuProjet: PropTypes.string,
    }),
    etudeDeCas: PropTypes.shape({
      urlDuProjet: PropTypes.string,
      technologiesUtilisees: PropTypes.array,
    }),
  }).isRequired,
  formatUrl: PropTypes.func.isRequired,
};

export default ProjectDetails;
