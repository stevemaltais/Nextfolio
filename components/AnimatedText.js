import React, { useEffect, useRef } from 'react';
import useIntersectionObserver from '@/Hooks/useIntersectionObserver'; // Ajustez le chemin d'importation selon votre structure de dossier

const AnimatedText = ({ text, onVisibilityChange }) => {
  const textRef = useRef(null);

  // Fonction pour initialiser l'animation du texte
  const animateText = () => {
    const container = document.createElement('span');
    container.setAttribute('aria-label', text);
    container.setAttribute('role', 'heading');
    container.classList.add('hidden');

    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.setAttribute('aria-hidden', 'true');
      span.style.animationDelay = `${0.9 + index / 10}s`;
      span.textContent = char;
      container.appendChild(span);
    });

    if (textRef.current) {
      textRef.current.innerHTML = '';
      textRef.current.appendChild(container);
    }
  };

  // Utilisation du hook useIntersectionObserver pour déclencher l'animation lorsque le texte entre dans le viewport
  useIntersectionObserver(textRef, () => {
    // Appel de la fonction de rappel pour indiquer que l'élément est visible
    onVisibilityChange(true);
    animateText();
  }, () => {
    // Appel de la fonction de rappel pour indiquer que l'élément n'est plus visible
    onVisibilityChange(false);
  }, {
    rootMargin: '0px',
    threshold: 0.1, 
  });

  // Ajout des styles nécessaires pour l'animation
  useEffect(() => {
    const styleAlreadyAdded = document.head.querySelector('style[data-style="animatedText"]');
    if (!styleAlreadyAdded) {
      const style = document.createElement('style');
      style.setAttribute('data-style', 'animatedText');
      style.innerHTML = `
        .hidden span {
          opacity: 0;
        }

        .visible span {
          animation: fadeIn 1s ease forwards;
        }

        .ml2 span span {
          position: relative;
          animation: move-text-color 1.75s forwards;
          bottom: -1em;
          opacity: 0;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes move-text-color {
          0% {
            bottom: -0.2em;
            opacity: 1;
            color: var(--accent-color);
          }

          50% {
            bottom: 0.2em;
            color: var(--accent-color);
          }

          100% {
            bottom: 0;
            opacity: 1;
            color: var(--titleScript);
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return <span ref={textRef} className="ml2"></span>;
};

export default AnimatedText;
