import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from '@/components/SocialMedia/InstagramGallery.module.scss';
import ImageItem from '@/components/SocialMedia/ImageItem';
import { truncateText } from '@/utils/truncateText';
import LoadMoreButton from '@/components/UI/Buttons/LoadMoreButton';

const InstagramGallery = () => {
  const [photos, setPhotos] = useState([]); // Toutes les photos récupérées
  const [visibleCount, setVisibleCount] = useState(0); // Nombre d'images visibles
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [after, setAfter] = useState(null);
  const galleryRef = useRef(null); // Référence au conteneur de la galerie

  // Détecter le nombre de colonnes visibles à partir du CSS Grid
  const getVisibleColumns = useCallback(() => {
    if (galleryRef.current) {
      const style = getComputedStyle(galleryRef.current);
      const columns = style.getPropertyValue('grid-template-columns').split(' ').length;
      return columns;
    }
    return 1; // Par défaut 1 colonne si non détecté
  }, []);

  // Charger les photos depuis l'API Instagram
  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;
    const limit = 50; // Charger suffisamment de photos

    let endpoint = `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption&access_token=${accessToken}&limit=${limit}`;
    if (after) {
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

      setPhotos((prev) => [...prev, ...media]); // Ajouter les nouvelles photos à la liste existante
    } catch (error) {
      console.error('Erreur lors de la récupération des images Instagram:', error);
    } finally {
      setLoading(false);
    }
  }, [after]);

  // Initialiser le nombre d'images visibles lors du chargement
  useEffect(() => {
    const columns = getVisibleColumns(); // Récupérer le nombre de colonnes visibles
    setVisibleCount(columns); // Définir le nombre d'images visibles initialement
  }, [getVisibleColumns]);

  useEffect(() => {
    fetchPhotos(); // Charger les photos à l'initialisation
  }, []);

  const loadMore = () => {
    const columns = getVisibleColumns(); // Nombre de colonnes visibles
    setVisibleCount((prev) => prev + columns); // Augmenter le nombre d'images visibles
  };

  return (
    <div>
      <div className={styles.gallery} ref={galleryRef}>
        {photos.slice(0, visibleCount).map((photo) => (
          <ImageItem key={photo.id} photo={photo} truncateText={truncateText} />
        ))}
      </div>
      {hasMore && (
        <div className={styles.loadMoreContainer}>
          <LoadMoreButton onClick={loadMore} loading={loading} />
        </div>
      )}
    </div>
  );
};

export default InstagramGallery;
