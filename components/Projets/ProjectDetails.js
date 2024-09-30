import React from 'react';
import PropTypes from 'prop-types';
import TechnologiesList from '../Blog/TechnologiesList';
import styles from '@/styles/components/HomePageModule/PorteFolioSection.module.scss';
import { formatUrl } from '@/utils/formatUrl';

const ProjectDetails = ({ project }) => (
  <div>
    <div className={styles.projectDetails}>
      <h4>DESCRIPTION</h4>
      <div 
        className={styles.drawerContent__Description}
        dangerouslySetInnerHTML={{ __html: project.detailsDuProjet?.descriptionCourteDuProjet || 'Description non disponible.' }}  // Valeur par défaut
      />
    </div>
    <div className={styles.projectDetails}>
      <span className={styles.DrawerTechno_separator}></span>
      <h4>INFOS PROJET</h4>
      <p>
        <strong>Catégorie :</strong> 
        {Array.isArray(project.detailsDuProjet?.categorieDuProjet) 
          ? project.detailsDuProjet.categorieDuProjet.join(', ') 
          : project.detailsDuProjet?.categorieDuProjet || 'Non spécifié'}  // Valeur par défaut
      </p>
      <p><strong>Année :</strong> {project.detailsDuProjet?.anneeDuProjet || 'Non spécifiée'}</p>  {/* Valeur par défaut */}
      <p>
        <strong>Lien :</strong> 
        {project.etudeDeCas?.urlDuProjet ? (
          <a className={styles.projectDetails__Link} href={project.etudeDeCas.urlDuProjet} target="_blank" rel="noopener noreferrer">
            {formatUrl(project.etudeDeCas.urlDuProjet)}
          </a>
        ) : (
          'Aucun lien disponible'
        )}
      </p>

      <div className={styles.DrawerTechno}>
        <span className={styles.DrawerTechno_separator}></span>

        {/* Vérification que technologiesutilisees et nodes existent */}
        {project.etudeDeCas?.technologiesutilisees?.nodes && project.etudeDeCas.technologiesutilisees.nodes.length > 0 ? (
          <TechnologiesList technologies={project.etudeDeCas.technologiesutilisees.nodes} isInDrawer={true} />
        ) : (
          <p>Aucune technologie utilisée n'a été trouvée pour ce projet.</p>  // Message en cas d'absence de données
        )}

      </div>
      <span className={styles.DrawerTechno_separator}></span>
    </div>
  </div>
);

ProjectDetails.propTypes = {
  project: PropTypes.shape({
    detailsDuProjet: PropTypes.shape({
      descriptionCourteDuProjet: PropTypes.string,
      categorieDuProjet: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),  // Accepte une chaîne ou un tableau
      anneeDuProjet: PropTypes.string,
    }),
    etudeDeCas: PropTypes.shape({
      urlDuProjet: PropTypes.string,
      technologiesutilisees: PropTypes.shape({
        nodes: PropTypes.array,  // Doit être un tableau
      }),
    }),
  }).isRequired,
  formatUrl: PropTypes.func.isRequired,
};

export default ProjectDetails;
