import Link from 'next/link';
import styles from "@/styles/components/HomePageModule/AboutSection.module.scss";
import PrimaryButton from '../PrimaryButton';
import formatWithLinks from '@/utils/formatWithLinks';

const AboutSection = () => {
  const aboutText = `J'ai acquis des compétences solides dans les langages HTML, CSS, SCSS et JavaScript, ainsi que dans les bases de données 
  SQL et le développement logiciel par UML et RUP. De plus, j'ai une expérience pratique avec Java, C++ et leurs bibliothèques associées.
  `;

  const aboutText2 = `Passionné par l'interface utilisateur (UI) et l'expérience utilisateur (UX), je suis constamment à la recherche de nouveaux 
  moyens de créer des designs modernes et esthétiques pour mes clients. Je m'efforce toujours de maintenir une communication ouverte et 
  transparente avec mes clients pour m'assurer que leur vision est réalisée à la perfection. `;
  return (
    <section data-scroll id="about" className={styles.section}>
      <div className={styles.container} id="about-info">
        <h2 data-scroll data-scroll-direction="vertical" data-scroll-speed="1">A propos</h2>
        <div data-scroll data-scroll-direction="vertical" data-scroll-speed="1" className={styles.aboutSeparator}></div>
        <div className={styles.aboutWrapper}>
          <div data-scroll data-scroll-direction="horizontal" data-scroll-speed="1" className={styles.aboutInfo}>
            <p>
              Bonjour, je suis Steve, développeur web freelance passionné par la création de sites web dynamiques et fonctionnels.
              Avec une formation universitaire récemment terminée, je poursuis actuellement mes études pour continuer à
              développer mes compétences et rester à jour avec les dernières tendances en matière de développement web. <br /><br />
              {formatWithLinks(aboutText)}
              <br /><br />
              {formatWithLinks(aboutText2)}
              <br /><br />
              Je suis constamment à la recherche de nouveaux défis pour continuer à améliorer mes compétences et à offrir des solutions
              innovantes et personnalisées à mes clients. Si vous recherchez un développeur web passionné et motivé pour votre prochain
              projet, je serais ravi de discuter avec vous.
            </p>
          </div>
          <div data-scroll data-scroll-direction="horizontal" data-scroll-speed="-1" className={styles.contactInfo}>
            <h3>Personal Information</h3>
            <PersonalInfo />
          </div>
        </div>
      </div>
    </section>
  );
};

const PersonalInfo = () => (
  <>
    <ul data-scroll data-scroll-direction="vertical" data-scroll-speed="-1">
      <li><strong>Nom:&nbsp;</strong> Steve Maltais</li>
      <li><strong>Courriel:&nbsp;</strong> <a className={styles.aboutEmail} href="mailto:codingWith@stevemaltais.ca">codingWith@stevemaltais.ca</a></li>
      <li><strong>Téléphone:&nbsp;</strong> <a className={styles.aboutTel} href="tel:438-525-5695">438-525-5695</a></li>
      <li><strong>Date de naissance:&nbsp;</strong> 08/07/1980</li>
      <li><strong>Adresse:&nbsp;</strong> Sur la route en Amérique</li>
      <li><strong>Nationalité:&nbsp;</strong> Canadien</li>
      <li><strong>Profil professionnel:&nbsp;</strong> Développeur Web</li>
    </ul>
    <div className={styles.buttonWrapper}>
      <PrimaryButton data-scroll data-scroll-direction="vertical" data-scroll-speed="0.5" data-scroll-delay="0.05" text="Télécharger mon CV" onClick={() => alert('CV téléchargé !')}></PrimaryButton>
    </div>
  </>
);



export default AboutSection;
