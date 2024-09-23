import React, { useState, useEffect, useCallback } from 'react';
import styles from '@/components/SocialMedia/InstagramGallery.module.scss';
import ImageItem from '@/components/SocialMedia/ImageItem';
import { truncateText } from '@/utils/truncateText';
import LoadMoreButton from '@/components/UI/Buttons/LoadMoreButton';
import { getImageLimit } from '@/utils/mediaUtils'; // Import de la fonction utilitaire

const InstagramGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [after, setAfter] = useState(null);
  const [error, setError] = useState(null);
  const [imageLimit, setImageLimit] = useState(getImageLimit()); // Définir la limite d'images initiale

  // Définir dynamiquement le nombre de colonnes en fonction du nombre d'images
  const getGridColumns = () => {
    const maxColumns = 6; // Le nombre maximum de colonnes autorisé
    return Math.min(photos.length, maxColumns);
  };

  const fetchPhotos = useCallback(async (initialLoad = false) => {
    setLoading(true);
    setError(null);
    const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;
    const limit = imageLimit; // Utiliser la limite dynamique ici
    let endpoint = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption&access_token=${accessToken}&limit=${limit}`;
    if (after && !initialLoad) {
      endpoint += `&after=${after}`;
    }

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      const media = data.data.filter(
        (item) => item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM' || item.media_type === 'VIDEO'
      );

      if (data.paging && data.paging.next) {
        setAfter(data.paging.cursors.after);
      } else {
        setHasMore(false);
      }

      setPhotos((prevPhotos) => {
        if (initialLoad) {
          return media;
        } else {
          const newPhotos = [...prevPhotos, ...media];
          const uniquePhotos = newPhotos.filter(
            (photo, index, self) => index === self.findIndex((p) => p.id === photo.id)
          );
          return uniquePhotos;
        }
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des images Instagram:', error);
      setError('Erreur lors de la récupération des images. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  }, [after, imageLimit]);

  useEffect(() => {
    // Définir la limite d'images au chargement et lors du redimensionnement
    const updateImageLimit = () => {
      setImageLimit(getImageLimit());
    };

    updateImageLimit(); // Appeler une fois pour définir la limite initiale
    window.addEventListener('resize', updateImageLimit); // Ajouter un écouteur pour les changements de taille de fenêtre

    return () => {
      window.removeEventListener('resize', updateImageLimit); // Nettoyer l'écouteur lorsque le composant est démonté
    };
  }, []);

  useEffect(() => {
    fetchPhotos(true);
  }, [imageLimit]); // Recharger les photos lorsque la limite change

  const loadMore = () => {
    fetchPhotos();
  };

  return (
    <div>
      <div
        className={styles.gallery}
        style={{ gridTemplateColumns: `repeat(${getGridColumns()}, 1fr)` }} // Définir le nombre de colonnes dynamiquement
      >
        {photos.map((photo) => (
          <ImageItem key={photo.id} photo={photo} truncateText={truncateText} />
        ))}
      </div>
      {error && <div className={styles.error}>{error}</div>}
      {hasMore && !error && (
        <div className={styles.loadMoreContainer}>
          <LoadMoreButton onClick={loadMore} loading={loading} />
        </div>
      )}
    </div>
  );
};

export default InstagramGallery;
