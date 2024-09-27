// components/SEO/FAQSchema.js
import JsonLd from './JsonLd';

const FAQSchema = ({ questions }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(({ question, answer }) => ({
      "@type": "Question",
      "name": question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": answer,
      },
    })),
  };

  return <JsonLd schema={schema} />;
};

export default FAQSchema;
