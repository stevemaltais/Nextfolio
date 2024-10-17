import React from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { fetchTechnologiesByCategory } from '@/graphql/queries'; // Import de la requête

const TechnologiePage = ({ categories }) => {
  // Vérifie si les catégories existent et ne sont pas vides
  if (!categories || categories.length === 0) {
    return (
      <div>
        <h1>Technologies</h1>
        <p>Aucune catégorie de technologies disponible pour le moment.</p>
      </div>
    );
  }

  return (
    <>
      {/* SEO de la page des technologies */}
      <NextSeo
        title="Technologies - Steve Maltais"
        description="Découvrez les technologies utilisées regroupées par catégories."
        canonical="https://stevemaltais.dev/technologie"
        openGraph={{
          url: 'https://stevemaltais.dev/technologie',
          title: 'Technologies - Steve Maltais',
          description: 'Explorez les technologies utilisées dans mes projets, organisées par catégories.',
          images: [
            {
              url: '/images/technologie-preview.jpg',
              width: 1200,
              height: 630,
              alt: 'Aperçu des technologies',
            },
          ],
          site_name: 'Steve Maltais Portfolio',
        }}
      />

      <div>
        <h1>Technologies</h1>
        <p>Explorez les technologies regroupées par catégories :</p>

        {categories.map((category) => (
          <div key={category.id} style={{ marginBottom: '2rem' }}>
            <h2>{category.name}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
              {category.technologies.nodes.map((tech) => (
                <div
                  key={tech.id}
                  style={{
                    width: '150px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '10px',
                    textAlign: 'center',
                  }}
                >
                  <Link href={`/technologie/${tech.slug}`}>
                    <div>
                      <img
                        src={tech.deTailsTechnologies?.logo?.node?.mediaItemUrl || '/images/default-tech-image.jpg'}
                        alt={tech.deTailsTechnologies?.logo?.node?.altText || `Logo de ${tech.title}`}
                        style={{ width: '100%', height: 'auto', marginBottom: '10px' }}
                      />
                      <h3>{tech.title}</h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

// Récupération des données à la compilation (SSG)
export async function getStaticProps() {
  try {
    const categories = await fetchTechnologiesByCategory();

    // Vérifie si des catégories ont été récupérées
    if (!categories || categories.length === 0) {
      console.warn('Aucune catégorie de technologies trouvée.');
      return { notFound: true };
    }

    return {
      props: {
        categories: categories || [],
      },
      revalidate: 60, // Revalidation ISR
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    return {
      notFound: true,
    };
  }
}

export default TechnologiePage;
