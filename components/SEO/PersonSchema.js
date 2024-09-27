// components/SEO/PersonSchema.js
import JsonLd from './JsonLd';

const PersonSchema = ({ name, jobTitle, url, image, sameAs }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "jobTitle": jobTitle,
    "url": url,
    "image": image,
    "sameAs": sameAs,  // Profils sociaux ou autres liens pertinents
  };

  return <JsonLd schema={schema} />;
};

export default PersonSchema;
