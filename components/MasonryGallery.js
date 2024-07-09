import React from 'react';
import ModalImage from 'react-modal-image';
import styles from '@/styles/components/MasonryGallery.module.scss';

const MasonryGallery = () => {
  // Simuler des URLs d'images pour l'exemple
  const photos = [
    '/profilePicture.jpg',
    '/2.jpg',
    '/profilePicture.jpg',
    '/3.jpg',
    '/profilePicture.jpg',
    '/3.jpg',
    '/2.jpg',
    '/profilePicture.jpg',
    '/2.jpg',
    // Ajoutez plus d'URLs d'images ici
  ];

  return (
    <div className={styles.myGrid}>
      {photos.map((src, index) => (
        <div key={index} className={styles.photoItem}>
          <ModalImage
            small={src}
            large={src}
            alt={`Photo ${index + 1}`}
            hideDownload={true}
            hideZoom={true}
          />
        </div>
      ))}
    </div>
  );
};

export default MasonryGallery;
