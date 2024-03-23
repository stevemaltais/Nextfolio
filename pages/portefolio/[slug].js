import { useRouter } from 'next/router';
import React from 'react';

const SlugPage = () => {
  const router = useRouter();
  const { slug } = router.query; // Accès au slug de l'URL

  return (
    <div>
      {/* Affiche le slug dans votre UI */}
      <p>Page pour le slug : {slug}</p>
    </div>
  );
};

export default SlugPage;
