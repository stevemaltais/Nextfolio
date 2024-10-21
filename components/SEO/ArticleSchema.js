import JsonLd from './JsonLd';

const ArticleSchema = ({ title, author, authorUrl, datePublished, url, image, publisherName, publisherLogo }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "author": {
      "@type": "Person",
      "name": author,
      "url": authorUrl  // Ajoute ici l'URL de l'auteur
    },
    "datePublished": datePublished,
    "url": url,
    "image": image,
    "publisher": {
      "@type": "Organization",
      "name": publisherName,
      "logo": {
        "@type": "ImageObject",
        "url": publisherLogo  // Facultatif : ajoute un logo pour l'éditeur
      }
    }
  };

  return <JsonLd schema={schema} />;
};

export default ArticleSchema;
