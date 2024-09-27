// components/SEO/ProductSchema.js
import JsonLd from './JsonLd';

const ProductSchema = ({ name, description, image, sku, price }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "image": image,
    "sku": sku,
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": "USD",
    },
  };

  return <JsonLd schema={schema} />;
};

export default ProductSchema;
