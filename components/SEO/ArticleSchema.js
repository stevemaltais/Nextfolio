// components/SEO/ArticleSchema.js
import JsonLd from './JsonLd';

const ArticleSchema = ({ title, author, datePublished, url, image }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "author": {
      "@type": "Person",
      "name": author,
    },
    "datePublished": datePublished,
    "url": url,
    "image": image,
  };

  return <JsonLd schema={schema} />;
};

export default ArticleSchema;
