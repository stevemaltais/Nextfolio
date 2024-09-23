

// Assurez-vous que cette importation est en haut du fichier
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '@/styles/components/CinematicEntrance.module.scss';

const CinematicEntrance = () => {
  return (
    <div className="container">
      {/* Arrière-plan */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={styles.background_layer}
      >
         <Image src='/profilePicture.jpg' alt="Background" layout="fill"  />
      </motion.div>

      {/* Couche intermédiaire (par exemple, votre photo de profil) */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className={styles.middle_layer}
      >
       <Image src='/hero_background.png' alt="Background" layout="fill" objectFit="cover" />
      </motion.div>

      {/* Premier plan (texte ou éléments interactifs) */}
   
    </div>
  );
};

export default CinematicEntrance;
