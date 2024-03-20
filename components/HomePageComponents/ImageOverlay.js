import Image from 'next/image';
import styles from '../../styles/components/HomePageModule/BackgroundOverlay.module.scss'; // Assurez-vous que le chemin est correct

const ImageOverlay = () => {
  return (
    <>
      <div className={styles.imageOverlay} data-scroll data-scroll-direction="vertical" data-scroll-speed="-7">
        <Image
          className={styles.underlay}
          src="/hero_background.png"
          alt="Image forme abstraite"
          height={600}
          width={600}
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

   
      
   
    </>
  );
};

export default ImageOverlay;
