import React, { useEffect } from 'react'; 
import { useRouter } from 'next/router';
import { fetchProjectSlugs, getProjectBySlug } from '@/graphql/queries';
import styles from './etudedecas.module.scss'; 
import TechnologiesList from '@/components/Blog/TechnologiesList';
import { NextSeo } from 'next-seo'; 

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

const formatUrl = (url) => {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
};

const ProjectPage = ({ project }) => {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (router.isFallback || !project) {
    return <div>Loading...</div>;
  }

  const { firstPart, secondPart } = splitProjectTitle(project.title);

  const createMarkup = (content) => {
    return { __html: content };
  };

  const renderSection = (title, content) => {
    if (!content) return null; // Si le contenu est vide, on ne rend rien.
    return (
      <section className={styles.etudeDeCas__section}>
        <h2 className={styles.etudeDeCas__sectionTitle}>{title}</h2>
        <div
          className={styles.etudeDeCas__content}
          dangerouslySetInnerHTML={createMarkup(content)}
        />
      </section>
    );
  };

  return (
    <>
      <NextSeo
        title={`${project.title} - Étude de cas`}  // Titre dynamique
        description={project.etudeDeCas?.descriptionDuProjet || 'Découvrez ce projet unique.'}  // Description du projet
        canonical={`https://ton-site.com/portefolio/${project.slug}`}  // URL canonique
        openGraph={{
          url: `https://ton-site.com/portefolio/${project.slug}`,  // URL Open Graph dynamique
          title: `${project.title} - Étude de cas`,
          description: project.etudeDeCas?.descriptionDuProjet || 'Découvrez ce projet unique.',
          images: [
            {
              url: project.featuredImage?.node?.mediaItemUrl || '/images/default-image.jpg',  // Image dynamique ou par défaut
              width: 1200,
              height: 630,
              alt: `Image de présentation pour ${project.title}`,
            },
          ],
          site_name: 'Mon Portfolio',
        }}
        twitter={{
          handle: '@tonhandle',  // Twitter handle
          site: '@tonhandle',
          cardType: 'summary_large_image',
        }}
      />

      <div className={styles.etudeDeCas}>
        <div className={styles.etudeDeCas__wrapper}>
          <div className={styles.etudeDeCas__header}>
            <div className={styles.etudeDeCas__HeaderRightSide}>
              <h1 className={styles.etudeDeCas__title}>
                <span className={styles.etudeDeCas__titleSpan}>Étude de cas</span><br />
                <a href={project.etudeDeCas?.urlDuProjet || '#'} target="_blank" rel="noopener noreferrer">
                  <span className={styles.etudeDeCas__titleFirstPart}><strong>{firstPart}</strong></span>
                </a>
                {secondPart && (
                  <span className={styles.etudeDeCas__titleSecondPart}> – {secondPart}</span>
                )}
              </h1>

              {/* Section Technologies Utilisées */}
              {project.etudeDeCas?.technologiesutilisees?.nodes && (
                <TechnologiesList technologies={project.etudeDeCas.technologiesutilisees.nodes} />
              )}

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

          {/* Rendu dynamique des sections */}
          {project.etudeDeCas && (
            <>
              {renderSection('Contexte et Objectifs', project.etudeDeCas.contexteEtObjectifs)}
              {renderSection('Description du Projet', project.etudeDeCas.descriptionDuProjet)}
              {renderSection('Problème à Résoudre', project.etudeDeCas.problemeAResoudre)}
              {renderSection('Solution Proposée', project.etudeDeCas.solutionProposee)}
              {renderSection('Processus de Développement', project.etudeDeCas.processusDeDeveloppement)}
              {renderSection('Composants Réutilisables et Scalabilité', project.etudeDeCas.composantsReutilisablesEtScalabilite)}
              {renderSection('Fonctionnalités Clés', project.etudeDeCas.fonctionnalitesCles)}
              {renderSection('Performance et Optimisation', project.etudeDeCas.performanceEtOptimisation)}
              {renderSection('Interactions et Fonctionnalités Avancées', project.etudeDeCas.interactionsEtFonctionnalitesAvancees)}
              {renderSection('Défis et Solutions', project.etudeDeCas.defisEtSolutions)}
              {renderSection('Tests et Validation', project.etudeDeCas.testsEtValidation)}
              {renderSection('Résultats', project.etudeDeCas.resultats)}
              {renderSection('Conclusion et Retours d’Expérience', project.etudeDeCas.conclusionEtRetoursDExperience)}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectPage;
