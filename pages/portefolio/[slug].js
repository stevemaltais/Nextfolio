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
    return { notFound: true };
  }

  return { props: { project } };
}

// Fonction pour séparer le titre en deux parties
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

// Fonction pour formater le titre SEO
const formatTitleSEO = (project) => {
  const projectName = project.champsSeo?.titreSeo || project.title;
  const technologies = project.etudeDeCas?.technologiesutilisees?.nodes
    .slice(0, 2)
    .map((tech) => tech.title)
    .join(' & ') || 'des technologies modernes';

  return `Étude de cas: ${projectName} – ${technologies}`;
};

// Fonction pour formater la description SEO
const formatDescriptionSEO = (project) => {
  const category = project.detailsDuProjet?.categorieDuProjet || 'projet innovant';
  const technologies = project.etudeDeCas?.technologiesutilisees?.nodes
    .slice(0, 2)
    .map((tech) => tech.title)
    .join(' et ') || 'des technologies modernes';

  return `Un ${category} développé avec ${technologies}, offrant une architecture performante et une expérience utilisateur fluide.`;
};

// Fonction pour créer le rendu HTML sécurisé
const createMarkup = (content) => ({ __html: content });

const renderSection = (title, content) => {
  if (!content) return null;
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

const ProjectPage = ({ project }) => {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (router.isFallback || !project) {
    return <div>Loading...</div>;
  }

  const { firstPart, secondPart } = splitProjectTitle(project.title);
  const titleSEO = formatTitleSEO(project);
  const descriptionSEO = formatDescriptionSEO(project);

  return (
    <>
      <NextSeo
        title={titleSEO}
        description={descriptionSEO}
        canonical={`https://stevemaltais.dev/portefolio/${project.slug}`}
        openGraph={{
          url: `https://stevemaltais.dev/portefolio/${project.slug}`,
          title: titleSEO,
          description: descriptionSEO,
          images: [
            {
              url: project.featuredImage?.node?.mediaItemUrl || '/images/default-image.jpg',
              width: 1200,
              height: 630,
              alt: `Image de présentation pour ${project.title}`,
            },
          ],
          site_name: 'Mon Portfolio',
        }}
        twitter={{
          handle: '@tonhandle',
          site: '@tonhandle',
          cardType: 'summary_large_image',
        }}
      />

      <div className={styles.etudeDeCas}>
        <div className={styles.etudeDeCas__wrapper}>
          <div className={styles.etudeDeCas__header}>
            <div className={styles.etudeDeCas__HeaderRightSide}>
              <h1 className={styles.etudeDeCas__title}>
                <span className={styles.etudeDeCas__titleSpan}>Étude de cas</span>
                <br />
                <a
                  href={project.etudeDeCas?.urlDuProjet || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.etudeDeCas__titleFirstPart}>
                    <strong>{firstPart}</strong>
                  </span>
                  {secondPart && (
                    <span className={styles.etudeDeCas__titleSecondPart}>
                      {' – ' + secondPart}
                    </span>
                  )}
                </a>
              </h1>

              {project.etudeDeCas?.technologiesutilisees?.nodes && (
                <TechnologiesList technologies={project.etudeDeCas.technologiesutilisees.nodes} />
              )}
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
