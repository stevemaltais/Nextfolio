// components/SEO/BreadcrumbSchema.js
import JsonLd from './JsonLd';

const BreadcrumbSchema = ({ items }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };

  return <JsonLd schema={schema} />;
};

export default BreadcrumbSchema;
