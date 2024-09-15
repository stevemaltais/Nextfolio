import React from 'react';
import { useRouter } from 'next/router';
import { fetchProjectSlugs, getProjectBySlug } from '@/graphql/queries';
import styles from '@/pages/portefolio/etudedecas.module.scss'; // Import du module CSS

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

const ProjectPage = ({ project }) => {
  const router = useRouter();

  if (router.isFallback || !project) {
    return <div>Loading...</div>;
  }

  const createMarkup = (content) => {
    return { __html: content };
  };

  return (
    <div className={styles.etudeDeCas}>
      <div className={styles.etudeDeCas__wrapper}>
        <div className={styles.etudeDeCas__header}>
        <div className={styles.etudeDeCas__HeaderRightSide}>
          <h1 className={styles.etudeDeCas__title}> <span>Etude de cas</span><br></br>{project.title}</h1>
                  {/* Section Technologies Utilisées */}
          <div className={styles.etudeDeCas__Techno}>
            <h2 className={styles.etudeDeCas__TechnoTitle}></h2>
              <div className={styles.etudeDeCas__content}>
                <ul>
                  {project.deTailsDuProjet.technologiesUtilisees.map((tech, index) => (
                    <li key={index}>{tech}</li>
                  ))}
                </ul>
              </div>
          </div>
        </div>
          {project.featuredImage?.node?.mediaItemUrl && (
            <div className={styles.etudeDeCas__imageContainer}>
              <img
                src={project.featuredImage.node.mediaItemUrl}
                alt={`Image de présentation pour ${project.title}`}
              />
            </div>
          )}
          
        </div>

        {/* Section Contexte et Objectifs */}
        <section className={styles.etudeDeCas__section}>
          <h2 className={styles.etudeDeCas__sectionTitle}>Contexte et Objectifs</h2>
          <div
            className={styles.etudeDeCas__content}
            dangerouslySetInnerHTML={createMarkup(project.deTailsDuProjet.contexteEtObjectifs || '')}
          />
        </section>

        {/* Section Description du Projet */}
        <section className={styles.etudeDeCas__section}>
          <h2 className={styles.etudeDeCas__sectionTitle}>Description du Projet</h2>
          <div
            className={styles.etudeDeCas__content}
            dangerouslySetInnerHTML={createMarkup(project.deTailsDuProjet.descriptionDuProjet || '')}
          />
        </section>

        {/* Section Problème à Résoudre */}
        <section className={styles.etudeDeCas__section}>
          <h2 className={styles.etudeDeCas__sectionTitle}>Problème à Résoudre</h2>
          <div
            className={styles.etudeDeCas__content}
            dangerouslySetInnerHTML={createMarkup(project.deTailsDuProjet.problemeAResoudre || '')}
          />
        </section>

        {/* Section Solution Proposée */}
        <section className={styles.etudeDeCas__section}>
          <h2 className={styles.etudeDeCas__sectionTitle}>Solution Proposée</h2>
          <div
            className={styles.etudeDeCas__content}
            dangerouslySetInnerHTML={createMarkup(project.deTailsDuProjet.solutionProposee || '')}
          />
        </section>

        {/* Section Processus de Développement */}
        <section className={styles.etudeDeCas__section}>
          <h2 className={styles.etudeDeCas__sectionTitle}>Processus de Développement</h2>
          <div
            className={styles.etudeDeCas__content}
            dangerouslySetInnerHTML={createMarkup(project.deTailsDuProjet.processusDeDeveloppement || '')}
          />
        </section>

        {/* Section Composants Réutilisables et Scalabilité */}
        <section className={styles.etudeDeCas__section}>
          <h2 className={styles.etudeDeCas__sectionTitle}>Composants Réutilisables et Scalabilité</h2>
          <div
            className={styles.etudeDeCas__content}
            dangerouslySetInnerHTML={createMarkup(project.deTailsDuProjet.composantsReutilisablesEtScalabilite || '')}
          />
        </section>

        {/* Section Fonctionnalités Clés */}
        <section className={styles.etudeDeCas__section}>
          <h2 className={styles.etudeDeCas__sectionTitle}>Fonctionnalités Clés</h2>
          <div
            className={styles.etudeDeCas__content}
            dangerouslySetInnerHTML={createMarkup(project.deTailsDuProjet.fonctionnalitesCles || '')}
          />
        </section>

        {/* Section Performance et Optimisation */}
        <section className={styles.etudeDeCas__section}>
          <h2 className={styles.etudeDeCas__sectionTitle}>Performance et Optimisation</h2>
          <div
            className={styles.etudeDeCas__content}
            dangerouslySetInnerHTML={createMarkup(project.deTailsDuProjet.performanceEtOptimisation || '')}
          />
        </section>

        {/* Section Interactions et Fonctionnalités Avancées */}
        <section className={styles.etudeDeCas__section}>
          <h2 className={styles.etudeDeCas__sectionTitle}>Interactions et Fonctionnalités Avancées</h2>
          <div
            className={styles.etudeDeCas__content}
            dangerouslySetInnerHTML={createMarkup(project.deTailsDuProjet.interactionsEtFonctionnalitesAvancees || '')}
          />
        </section>

        {/* Section Défis et Solutions */}
        <section className={styles.etudeDeCas__section}>
          <h2 className={styles.etudeDeCas__sectionTitle}>Défis et Solutions</h2>
          <div
            className={styles.etudeDeCas__content}
            dangerouslySetInnerHTML={createMarkup(project.deTailsDuProjet.defisEtSolutions || '')}
          />
        </section>

        {/* Section Tests et Validation */}
        <section className={styles.etudeDeCas__section}>
          <h2 className={styles.etudeDeCas__sectionTitle}>Tests et Validation</h2>
          <div
            className={styles.etudeDeCas__content}
            dangerouslySetInnerHTML={createMarkup(project.deTailsDuProjet.testsEtValidation || '')}
          />
        </section>

        {/* Section Résultats */}
        <section className={styles.etudeDeCas__section}>
          <h2 className={styles.etudeDeCas__sectionTitle}>Résultats</h2>
          <div
            className={styles.etudeDeCas__content}
            dangerouslySetInnerHTML={createMarkup(project.deTailsDuProjet.resultats || '')}
          />
        </section>

        {/* Section Conclusion et Retours d’Expérience */}
        <section className={styles.etudeDeCas__section}>
          <h2 className={styles.etudeDeCas__sectionTitle}>Conclusion et Retours d’Expérience</h2>
          <div
            className={styles.etudeDeCas__content}
            dangerouslySetInnerHTML={createMarkup(project.deTailsDuProjet.conclusionEtRetoursDExperience || '')}
          />
        </section>



        {/* Section URL du Projet */}
        {project.deTailsDuProjet.urlDuProjet && (
          <section className={styles.etudeDeCas__section}>
            <h2 className={styles.etudeDeCas__sectionTitle}>Lien vers le Projet</h2>
            <div className={styles.etudeDeCas__content}>
              <a href={project.deTailsDuProjet.urlDuProjet} target="_blank" rel="noopener noreferrer">
                Voir le projet
              </a>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
