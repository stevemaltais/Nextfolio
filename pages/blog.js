import React from 'react';
import { NextSeo, ArticleJsonLd, BreadcrumbJsonLd } from 'next-seo';  // Import des composants SEO

const Blog = () => {
  return (
    <>
      {/* Configuration SEO pour la page de Blog */}
      <NextSeo
  title="Blog - Steve Maltais"
  description="Découvrez des articles passionnants sur le développement web, les technologies, et des conseils pratiques pour les développeurs."
  canonical="https://stevemaltais.dev/blog"
  noindex={true}  // Cette balise empêche l'indexation de la page
  openGraph={{
    url: 'https://stevemaltais.dev/blog',
    title: 'Blog - Steve Maltais',
    description: 'Explorez des articles sur le développement web, les technologies et plus encore.',
    images: [
      {
        url: '/images/blog-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Aperçu du Blog',
      },
    ],
    site_name: 'Steve Maltais Blog',
  }}
  twitter={{
    handle: '@stevemaltais',
    site: '@stevemaltais',
    cardType: 'summary_large_image',
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
