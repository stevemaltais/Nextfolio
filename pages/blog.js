import React from 'react';
import { NextSeo, ArticleJsonLd, BreadcrumbJsonLd } from 'next-seo';  // Import des composants SEO

const Blog = () => {
  return (
    <>
      {/* Configuration SEO pour la page de Blog */}
      <NextSeo
        title="Blog - Steve Maltais"  // Titre pour la page
        description="Découvrez des articles passionnants sur le développement web, les technologies, et des conseils pratiques pour les développeurs."  // Description SEO
        canonical="https://www.stevemaltais.dev/blog"  // URL canonique
        openGraph={{
          url: 'https://www.stevemaltais.dev/blog',  // URL Open Graph
          title: 'Blog - Steve Maltais',
          description: 'Explorez des articles sur le développement web, les technologies et plus encore.',
          images: [
            {
              url: '/images/blog-preview.jpg',  // Image Open Graph pour l'aperçu
              width: 1200,
              height: 630,
              alt: 'Aperçu du Blog',
            },
          ],
          site_name: 'Steve Maltais Blog',
        }}
        twitter={{
          handle: '@stevemaltais',  // Ton handle Twitter
          site: '@stevemaltais',     // Handle Twitter du site
          cardType: 'summary_large_image',  // Carte Twitter avec grande image
        }}
      />

      {/* Schéma JSON-LD pour le fil d'Ariane (Breadcrumb) */}
      <BreadcrumbJsonLd
        itemListElements={[
          { position: 1, name: 'Accueil', item: 'https://www.stevemaltais.dev/' },
          { position: 2, name: 'Blog', item: 'https://www.stevemaltais.dev/blog' },
        ]}
      />

      {/* Schéma JSON-LD Article pour la page de Blog */}
      <ArticleJsonLd
        url="https://stevemaltais.dev/blog"
        title="Blog - Steve Maltais"
        images={['/images/blog-preview.jpg']}
        datePublished="2023-01-01"  // Date de publication de ton blog
        dateModified="2023-01-01"   // Date de modification si applicable
        authorName="Steve Maltais"
        publisherName="Steve Maltais"
        publisherLogo="/images/logo-steve.png"  // Logo de ton site ou ton entreprise
        description="Découvrez des articles passionnants sur le développement web, les technologies, et des conseils pratiques pour les développeurs."
      />

      {/* Contenu de la page de blog */}
      <div>
        <h1>Bienvenue sur mon Blog</h1>
        <p>Découvrez des articles sur le développement web, la technologie, et bien plus encore.</p>
      </div>
    </>
  );
};

export default Blog;
