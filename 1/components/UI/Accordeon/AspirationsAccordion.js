import React, { useState } from "react";
import styles from './AspirationsAccordion.module.scss'; // Import des modules CSS

const CustomAccordionItem = ({ title, content, isOpen, onClick }) => {
  console.log(isOpen); // Log pour voir si l'état change

  return (
    <div className={styles.accordionItem}>
      <button className={styles.accordionHeader} onClick={onClick}>
        <span>{title}</span>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.rotat : ""}`} // Vérifie l'application de la classe
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
        >
          <path
            d="M15.5 19l-7-7 7-7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <div className={`${styles.accordionContent} ${isOpen ? styles.open : ""}`}>
        <div className={styles.accordionContentInner}>
          {content}
        </div>
      </div>
    </div>
  );
};

export default function CustomAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className={styles.accordion}>
      <CustomAccordionItem
        title="Repousser les limites technologiques"
        content="Travailler sur des projets utilisant les dernières technologies pour rester à la pointe de l'innovation."
        isOpen={openIndex === 0}
        onClick={() => toggleAccordion(0)}
      />
      <CustomAccordionItem
        title="Contribuer à des projets à impact social"
        content="Intégrer des initiatives qui favorisent un développement durable et éthique."
        isOpen={openIndex === 1}
        onClick={() => toggleAccordion(1)}
      />
      <CustomAccordionItem
        title="Développer des solutions évolutives"
        content="Concevoir des applications capables de s'adapter aux besoins futurs tout en offrant une expérience utilisateur optimale."
        isOpen={openIndex === 2}
        onClick={() => toggleAccordion(2)}
      />
    </div>
  );
}
