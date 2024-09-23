import React from 'react';
import { useRouter } from 'next/router';
import { fetchProjectSlugs, getProjectBySlug } from '@/graphql/queries';
import styles from './etudedecas.module.scss'; // Import du module SCSS
import technoColors from '@/utils/technoColors';
import TechnologiesList from '@/components/Blog/TechnologiesList';

export async function getStaticPaths() {
  const slugs = await fetchProjectSlugs();
  const paths = slugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      project,
    },
  };
}

// Fonction pour diviser le titre en deux parties
function splitProjectTitle(title) {
  let parts = title.split(' – ');
  if (parts.length > 1) {
    return {
      firstPart: parts[0],
      secondPart: parts.slice(1).join(' – '),
    };
  }
  return { firstPart: title, secondPart: '' };
}

// Fonction pour tronquer l'URL
const formatUrl = (url) => {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
};

const ProjectPage = ({ project }) => {
  const router = useRouter();

  if (router.isFallback || !project) {
    return <div>Loading...</div>;
  }

  // Diviser le titre en deux parties
  const { firstPart, secondPart } = splitProjectTitle(project.title);

  const createMarkup = (content) => {
    return { __html: content };
  };

  return (
    <div className={styles.etudeDeCas}>
      <div className={styles.etudeDeCas__wrapper}>
        <div className={styles.etudeDeCas__header}>
          <div className={styles.etudeDeCas__HeaderRightSide}>
          <h1 className={styles.etudeDeCas__title}>
         
          <span className={styles.etudeDeCas__titleSpan}>Étude de cas</span><br />
            {/* Section URL du Projet */}
          <a href={project.etudeDeCas.urlDuProjet} target="_blank" rel="noopener noreferrer">
            <span className={styles.etudeDeCas__titleFirstPart}><strong>{firstPart}</strong></span>
          </a>
              {secondPart && (
                 <span className={styles.etudeDeCas__titleSecondPart}> – {secondPart}</span>
              )}
          </h1>

            {/* Section Technologies Utilisées */}
            <TechnologiesList technologies={project.etudeDeCas?.technologiesUtilisees} />

          </div>

          {/* Section Image du Projet */}
          {project.featuredImage?.node?.mediaItemUrl && (
            <div className={styles.etudeDeCas__imageContainer}>
              <img
                src={project.featuredImage.node.mediaItemUrl}
                alt={`Image de présentation pour ${project.title}`}
              />
            </div>
          )}
        </div>

        {/* Autres Sections Dynamique */}
        {project.etudeDeCas && (
          <>
            {/* Section Contexte et Objectifs */}
            {project.etudeDeCas.contexteEtObjectifs && (
              <section className={styles.etudeDeCas__section}>
                <h2 className={styles.etudeDeCas__sectionTitle}>Contexte et Objectifs</h2>
                <div
                  className={styles.etudeDeCas__content}
                  dangerouslySetInnerHTML={createMarkup(project.etudeDeCas.contexteEtObjectifs)}
                />
              </section>
            )}

            {/* Section Description du Projet */}
            {project.etudeDeCas.descriptionDuProjet && (
              <section className={styles.etudeDeCas__section}>
                <h2 className={styles.etudeDeCas__sectionTitle}>Description du Projet</h2>
                <div
                  className={styles.etudeDeCas__content}
                  dangerouslySetInnerHTML={createMarkup(project.etudeDeCas.descriptionDuProjet)}
                />
              </section>
            )}

            {/* Autres sections similaires */}
            {project.etudeDeCas.problemeAResoudre && (
              <section className={styles.etudeDeCas__section}>
                <h2 className={styles.etudeDeCas__sectionTitle}>Problème à Résoudre</h2>
                <div
                  className={styles.etudeDeCas__content}
                  dangerouslySetInnerHTML={createMarkup(project.etudeDeCas.problemeAResoudre)}
                />
              </section>
            )}

            {project.etudeDeCas.solutionProposee && (
              <section className={styles.etudeDeCas__section}>
                <h2 className={styles.etudeDeCas__sectionTitle}>Solution Proposée</h2>
                <div
                  className={styles.etudeDeCas__content}
                  dangerouslySetInnerHTML={createMarkup(project.etudeDeCas.solutionProposee)}
                />
              </section>
            )}

            {project.etudeDeCas.processusDeDeveloppement && (
              <section className={styles.etudeDeCas__section}>
                <h2 className={styles.etudeDeCas__sectionTitle}>Processus de Développement</h2>
                <div
                  className={styles.etudeDeCas__content}
                  dangerouslySetInnerHTML={createMarkup(project.etudeDeCas.processusDeDeveloppement)}
                />
              </section>
            )}

            {project.etudeDeCas.composantsReutilisablesEtScalabilite && (
              <section className={styles.etudeDeCas__section}>
                <h2 className={styles.etudeDeCas__sectionTitle}>Composants Réutilisables et Scalabilité</h2>
                <div
                  className={styles.etudeDeCas__content}
                  dangerouslySetInnerHTML={createMarkup(project.etudeDeCas.composantsReutilisablesEtScalabilite)}
                />
              </section>
            )}

            {project.etudeDeCas.fonctionnalitesCles && (
              <section className={styles.etudeDeCas__section}>
                <h2 className={styles.etudeDeCas__sectionTitle}>Fonctionnalités Clés</h2>
                <div
                  className={styles.etudeDeCas__content}
                  dangerouslySetInnerHTML={createMarkup(project.etudeDeCas.fonctionnalitesCles)}
                />
              </section>
            )}

            {project.etudeDeCas.performanceEtOptimisation && (
              <section className={styles.etudeDeCas__section}>
                <h2 className={styles.etudeDeCas__sectionTitle}>Performance et Optimisation</h2>
                <div
                  className={styles.etudeDeCas__content}
                  dangerouslySetInnerHTML={createMarkup(project.etudeDeCas.performanceEtOptimisation)}
                />
              </section>
            )}

            {project.etudeDeCas.interactionsEtFonctionnalitesAvancees && (
              <section className={styles.etudeDeCas__section}>
                <h2 className={styles.etudeDeCas__sectionTitle}>Interactions et Fonctionnalités Avancées</h2>
                <div
                  className={styles.etudeDeCas__content}
                  dangerouslySetInnerHTML={createMarkup(project.etudeDeCas.interactionsEtFonctionnalitesAvancees)}
                />
              </section>
            )}

            {project.etudeDeCas.defisEtSolutions && (
              <section className={styles.etudeDeCas__section}>
                <h2 className={styles.etudeDeCas__sectionTitle}>Défis et Solutions</h2>
                <div
                  className={styles.etudeDeCas__content}
                  dangerouslySetInnerHTML={createMarkup(project.etudeDeCas.defisEtSolutions)}
                />
              </section>
            )}

            {project.etudeDeCas.testsEtValidation && (
              <section className={styles.etudeDeCas__section}>
                <h2 className={styles.etudeDeCas__sectionTitle}>Tests et Validation</h2>
                <div
                  className={styles.etudeDeCas__content}
                  dangerouslySetInnerHTML={createMarkup(project.etudeDeCas.testsEtValidation)}
                />
              </section>
            )}

            {project.etudeDeCas.resultats && (
              <section className={styles.etudeDeCas__section}>
                <h2 className={styles.etudeDeCas__sectionTitle}>Résultats</h2>
                <div
                  className={styles.etudeDeCas__content}
                  dangerouslySetInnerHTML={createMarkup(project.etudeDeCas.resultats)}
                />
              </section>
            )}

            {project.etudeDeCas.conclusionEtRetoursDExperience && (
              <section className={styles.etudeDeCas__section}>
                <h2 className={styles.etudeDeCas__sectionTitle}>Conclusion et Retours d’Expérience</h2>
                <div
                  className={styles.etudeDeCas__content}
                  dangerouslySetInnerHTML={createMarkup(project.etudeDeCas.conclusionEtRetoursDExperience)}
                />
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
