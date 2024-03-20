import styles from "@/styles/components/HomePageModule/AboutSection.module.scss"
import PrimaryButton from '../PrimaryButton';

const AboutSection = () => {
  return (
    <section data-scroll id="about" className={styles.section}>
      <div className={styles.container} id="about-info">
          <h2 data-scroll data-scroll-direction="vertical" data-scroll-speed="1" >A propos</h2>
          <div data-scroll data-scroll-direction="vertical" data-scroll-speed="1" className={styles.aboutSeparator}></div>

          <div className={styles.aboutWrapper}>
              <div data-scroll data-scroll-direction="horizontal" data-scroll-speed="1" className={styles.aboutInfo}>

            <p>Bonjour, je suis Steve, développeur web freelance passionné par la création de sites web dynamiques et fonctionnels. Avec une formation universitaire récemment terminée, je poursuis actuellement mes études pour continuer à développer mes compétences et rester à jour avec les dernières tendances en matière de développement web.
            <br/><br/> J'ai acquis des compétences solides dans les langages <span>HTML</span>, <span>CSS</span>, <span>SCSS</span> et <span>JavaScript</span>, ainsi que dans les bases de données <span>SQL</span> et le développement logiciel par <span>UML</span> et <span>RUP</span>. De plus, j'ai une expérience pratique avec <span>Java</span>, <span>C++</span> et leurs bibliothèques associées.
            <br/><br/> Passionné par l'interface utilisateur (<span>UI</span>) et l'expérience utilisateur (<span>UX</span>), je suis constamment à la recherche de nouveaux moyens de créer des designs modernes et esthétiques pour mes clients. Je m'efforce toujours de maintenir une communication ouverte et transparente avec mes clients pour m'assurer que leur vision est réalisée à la perfection.
            <br/><br/> Je suis constamment à la recherche de nouveaux défis pour continuer à améliorer mes compétences et à offrir des solutions innovantes et personnalisées à mes clients. Si vous recherchez un développeur web passionné et motivé pour votre prochain projet, je serais ravi de discuter avec vous.</p>
              </div>


  <div data-scroll data-scroll-direction="horizontal" data-scroll-speed="-1" className={styles.contactInfo}>
    <h4>Personal Information</h4>
    <ul data-scroll data-scroll-direction="vertical" data-scroll-speed="-1" >
      <li > <strong>Nom:</strong> Steve Maltais</li>
      <li  ><strong>Courriel:</strong> <a className={styles.aboutEmail} href="mailto:codingWith@stevemaltais.ca">codingWith@stevemaltais.ca</a></li>
      <li ><strong>Téléphone:</strong> <a className={styles.aboutTel} href="tel:438-525-5695">438-525-5695</a></li>
      <li  ><strong>Date de naissance:</strong> 08/07/1980</li>
      <li  ><strong>Adresse:</strong> Sur la route en Amérique</li>
      <li ><strong>Nationalité:</strong> Canadien</li>
      <li  ><strong>Profil professionnel:</strong> Développeur Web</li>
  </ul>
    <PrimaryButton data-scroll data-scroll-direction="vertical" data-scroll-speed="0.5" data-scroll-delay="0.05" text="Télécharger mon CV"onClick={() => alert('CV téléchargé !')}></PrimaryButton>

  </div>
          </div>
      </div>

    </section>
  );
};

export default AboutSection;
