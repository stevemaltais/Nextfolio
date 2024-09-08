import React, { useState, useRef, useEffect } from "react";
import styles from './AspirationsAccordion.module.scss';

const CustomAccordionItem = ({ title, content, isOpen, onClick }) => {
  const contentRef = useRef(null);

  return (
    <div className={styles.accordionItem}>
      <button className={styles.accordionHeader} onClick={onClick}>
        <span>{title}</span>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.rotate : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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
      <div
        ref={contentRef}
        className={`${styles.accordionContent} ${isOpen ? styles.open : ""}`}
        style={{
          height: isOpen ? `${contentRef.current.scrollHeight}px` : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className={styles.accordionContentInner}>{content}</div>
      </div>
    </div>
  );
};

export default function CustomAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(index === openIndex ? null : index); // Toggle open state
  };

  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <div className={styles.accordion}>
      <CustomAccordionItem
        title="Repousser les limites technologiques"
        content={defaultContent}
        isOpen={openIndex === 0}
        onClick={() => toggleAccordion(0)}
      />
      <CustomAccordionItem
        title="Contribuer à des projets à impact social"
        content={defaultContent}
        isOpen={openIndex === 1}
        onClick={() => toggleAccordion(1)}
      />
      <CustomAccordionItem
        title="Développer des solutions évolutives"
        content={defaultContent}
        isOpen={openIndex === 2}
        onClick={() => toggleAccordion(2)}
      />
    </div>
  );
}
