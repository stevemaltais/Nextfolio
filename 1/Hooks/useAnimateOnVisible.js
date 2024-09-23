import { useEffect } from 'react';
import  useIntersectionObserver  from '@/Hooks/useIntersectionObserver';

const useAnimateOnVisible = (ref) => {


  useEffect(() => {
    const handleEnter = () => ref.current.classList.add('animate');
    const handleExit = () => ref.current.classList.remove('animate');
    
    useIntersectionObserver(ref, handleEnter, handleExit, {
      rootMargin: '0px',
      threshold: 0.1,
    });

    
  }, [ref]); // Assurez-vous que ref est la seule dépendance
  console.log('Chemin de l\'image:', yourImagePath);
  // ou pour une URL d'API
  console.log('URL de la requête:', `/api/resource/${resourceId}`);
};

export default useAnimateOnVisible;
