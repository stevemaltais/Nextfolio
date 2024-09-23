import React from 'react';
import styles from '@/components/SocialMedia/InstagramGallery.module.scss';

const ImageItem = ({ photo, truncateText }) => {
  return (
    <a key={photo.id} href={photo.permalink} target="_blank" rel="noopener noreferrer" className={styles.anchor}>
      {photo.media_type === 'IMAGE' || photo.media_type === 'CAROUSEL_ALBUM' ? (
        <img src={photo.media_url} alt="Instagram Photo" className={styles.image} />
      ) : (
        <img src={photo.thumbnail_url} alt="Instagram Reel" className={styles.thumbnail} />
      )}
      <div className={styles.overlay}>
        <p className={styles.caption}>{truncateText(photo.caption || '', 100)}</p>
      </div>
    </a>
  );
};

export default ImageItem;
