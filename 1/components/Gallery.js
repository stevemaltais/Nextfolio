// Importez les hooks et gql de Apollo Client
import { useQuery, gql } from '@apollo/client';
import { GET_PHOTOS_QUERY } from '@/graphql/queries';

// Définissez votre requête GraphQL (ajustez-la selon votre schéma exact si nécessaire)


// Composant Gallery pour afficher les images
const Gallery = () => {
    const { loading, error, data } = useQuery(GET_PHOTOS_QUERY);
  
    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {data.photos.nodes.map((node) => (
          node.photosMe.imageDeMoi.node ? (
            <img key={node.id} src={node.photosMe.imageDeMoi.node.sourceUrl} alt="Photo" style={{ width: '100%', maxWidth: '600px', marginBottom: '20px' }} />
          ) : null
        ))}
      </div>
    );
  };
  

export default Gallery;
