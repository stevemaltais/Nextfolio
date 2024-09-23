import React, { useEffect } from 'react';
import ModalImage from 'react-modal-image';
import styles from '@/styles/components/MasonryGallery.module.scss';

const MasonryGallery = () => {
  const photos = [
    '/3.jpg',
    '/1.jpg',
    '/4.jpg',
    '/5.jpg',
    '/6.jpg',
    '/7.jpg',
    '/8.jpg',
    '/9.jpg',
    '/2.jpg',
  ];

  useEffect(() => {
    const photoItems = document.querySelectorAll(`.${styles.photoItem}`);
    photoItems.forEach((item, index) => {
      console.log(`Revealing item ${index}`); // Debugging log
      setTimeout(() => {
        item.classList.add(styles['reveal']);
      }, index * 200); // Adjust delay as needed
    });
  }, []);

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
