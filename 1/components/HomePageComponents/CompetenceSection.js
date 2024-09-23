import React, { useState, useRef, useEffect } from 'react';
import styles from "@/styles/components/HomePageModule/CompetenceSection.module.scss";
import AnimatedText from '@/components/AnimatedText';
import useIntersectionObserver from '@/Hooks/useIntersectionObserver';

const CompetenceSection = () => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sectionRef = useRef(null); // Référence pour observer la section entière

  // Fonction de rappel pour gérer les changements de visibilité
  const handleVisibilityChange = (isVisible) => {
    setIsIntersecting(isVisible);
  };

  // Utiliser le hook useIntersectionObserver pour observer la section entière
  useIntersectionObserver(sectionRef, () => handleVisibilityChange(true), () => handleVisibilityChange(false));

  useEffect(() => {
    if (isIntersecting) {
      const progressBars = document.querySelectorAll(`.${styles.progress}`);
      progressBars.forEach((bar, index) => {
        // Réinitialiser la largeur à 0 pour l'animation
        bar.style.width = '0%';

        // Récupérer la largeur cible depuis l'attribut data-width
        const width = bar.getAttribute('data-width');

        // Ajouter un délai d'animation pour s'assurer que la transition se déclenche
        setTimeout(() => {
          if (width) {
            bar.style.width = `${width}%`;
          }
        }, 100 + index * 300); // délai de 100ms pour le déclenchement initial plus 300ms entre chaque barre
      });
    }
  }, [isIntersecting]);

  return (
    <section ref={sectionRef} id="competence" className={styles.wrapper}>
      <div className={styles.title}>
        <h2>
          <AnimatedText text="Compétences" onVisibilityChange={handleVisibilityChange} />
        </h2>
        <h4 className={`${styles.title2} ${isIntersecting ? styles.animate : ''}`}>
          Stack Technique
        </h4>
      </div>

      <div className={`${styles.competencesWeb} ${styles.fadeIn}`}>
        <div className={styles.domaines}>
          <h2 data-scroll data-scroll-direction="vertical" data-scroll-speed="-1">Domaines d'Expertise</h2>
          <ul data-scroll data-scroll-direction="horizontal" data-scroll-speed="-1" className="fa-ul">
            <li>
              <span className="fa-li">
                <i className="fa-regular fa-square-check"></i>
              </span>
              <strong>Développement Front-End</strong><br />
              <em>HTML5, CSS3, SASS, JavaScript, React, Angular, jQuery, Bootstrap, Tailwind CSS</em>
            </li>
            <li>
              <span className="fa-li">
                <i className="fa-regular fa-square-check"></i>
              </span>
              <strong>DÉVELOPPEMENT BACK-END</strong><br />
              <em>Java, C++, PHP, Swing, Spring, Laravel</em>
            </li>
            <li>
              <span className="fa-li">
                <i className="fa-regular fa-square-check"></i>
              </span>
              <strong>BASES DE DONNÉES</strong><br />
              <em>SQL, MySQL, phpMyAdmin</em>
            </li>
            <li>
              <span className="fa-li">
                <i className="fa-regular fa-square-check"></i>
              </span>
              <strong>VERSIONING ET GESTION DE PROJET</strong><br />
              <em>Git, GitHub, Scrum, Slack, Asana</em>
            </li>
            <li>
              <span className="fa-li">
                <i className="fa-regular fa-square-check"></i>
              </span>
              <strong>CONCEPTION ET GRAPHISME</strong><br />
              <em>Suite Adobe, Figma</em>
            </li>
            <li>
              <span className="fa-li">
                <i className="fa-regular fa-square-check"></i>
              </span>
              <strong>RÉFÉRENCEMENT ET ANALYSE</strong><br />
              <em>SEO : référencement naturel, optimisation de contenu, etc.<br />Analytics : Google Analytics, Mixpanel, etc.</em>
            </li>
          </ul>
        </div>

        <div data-scroll data-scroll-direction="horizontal" data-scroll-speed="1" className={styles.developpement} id="dev-progress">
          <h2 data-scroll data-scroll-direction="vertical" data-scroll-speed="-1">Niveaux de Maîtrise</h2>
          <div>
            <ul>
              <li>
                <div className={styles.progressBar}>
                  <div className={styles.progress} data-width="95"><span>Développement Front-End</span></div>
                </div>
              </li>
              <li>
                <div className={styles.progressBar}>
                  <div className={styles.progress} data-width="85"><span>Développement Back-End</span></div>
                </div>
              </li>
              <li>
                <div className={styles.progressBar}>
                  <div className={styles.progress} data-width="78"><span>Bases de données</span></div>
                </div>
              </li>
              <li>
                <div className={styles.progressBar}>
                  <div className={styles.progress} data-width="80"><span>Versioning et Gestion de projets</span></div>
                </div>
              </li>
              <li>
                <div className={styles.progressBar}>
                  <div className={styles.progress} data-width="70"><span>Conception et Graphisme</span></div>
                </div>
              </li>
              <li>
                <div className={styles.progressBar}>
                  <div className={styles.progress} data-width="85"><span>Référencement et Analyse</span></div>
                </div>
              </li>
              <li>
                <div className={styles.progressBar}>
                  <div className={styles.progress} data-width="90"><span>Gestion de projets</span></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetenceSection;
