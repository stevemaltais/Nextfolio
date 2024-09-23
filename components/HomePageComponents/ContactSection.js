import React, { useState, useEffect, useRef } from 'react';
import PrimaryButton from '../PrimaryButton'
import styles from '@/styles/components/HomePageModule/ContactSection.module.scss'
import useIntersectionObserver from '@/Hooks/useIntersectionObserver'
import AnimatedText from '@/components/AnimatedText'
import Modal from '@/components/Modal';
import MyFormModal from '@/components/MyFormModal';



const ContactSection = () => {

    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    }; 

    const [isIntersecting, setIsIntersecting] = useState(false);
    const pRef = useRef(null);

  // Fonction de rappel pour gérer les changements de visibilité
    const handleVisibilityChange = (isVisible) => {
        setIsIntersecting(isVisible);
    };

    // Utiliser le hook useIntersectionObserver pour observer h4Ref
  useIntersectionObserver(pRef, () => handleVisibilityChange(true), () => handleVisibilityChange(false));


  return (
    <section  id="contact" className={styles.section}>
      <div className={styles.contact__wrapper}></div>
        <div className={styles.title}>
            <h2>
                <AnimatedText text="Contact" onVisibilityChange={handleVisibilityChange} />
            </h2>
        </div>
        <div className={styles.contact} >
            <p ref={pRef} className={ styles.animate}>Je vous remercie de l'intérêt que vous portez à mon profil. Si vous souhaitez en savoir plus sur mes compétences,
                discuter de vos projets ou échanger sur des opportunités, n'hésitez pas à me contacter. Je suis à votre disposition pour
                répondre à toutes vos questions et évaluer ensemble comment nous pouvons travailler en synergie.
                La méthode la plus simple et efficace pour me joindre est par courriel. Vous trouverez ci-dessous mon adresse e-mail.
                N'hésitez pas à me fournir des détails sur votre entreprise, vos besoins et les objectifs que vous souhaitez atteindre.
                Je m'engage à vous répondre dans les meilleurs délais.
                Je suis impatient de discuter avec vous et d'explorer ensemble les possibilités de collaboration pour réaliser de
                grandes choses. N'hésitez pas à me solliciter pour toute information complémentaire. À très bientôt !</p>

                <PrimaryButton data-scroll  text="Dites moi Bonjour!" onClick={toggleModal}></PrimaryButton>
                <Modal isVisible={isModalVisible} onClose={toggleModal}>
        <MyFormModal onClose={toggleModal} />
      </Modal>
            
               
        </div>
  </section>
  )
}
export default ContactSection;