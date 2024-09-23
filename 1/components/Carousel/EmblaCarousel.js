// EmblaCarousel.js
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { PrevButton } from '@/components/Carousel/PrevButton';
import { NextButton } from '@/components/Carousel/NextButton';
import { useDotButton } from '@/components/Carousel/useDotButton';
import { usePrevNextButtons } from '@/components/Carousel/usePrevNextButtons';
import styles from '@/styles/components/Carousel.module.scss';

const EmblaCarousel = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { selectedIndex, scrollSnaps } = useDotButton(emblaApi);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  // Fonction pour gérer le clic sur un point de navigation
  const onDotButtonClick = (index) => {
    emblaApi && emblaApi.scrollTo(index);
  };

  return (
    <section className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((slide, index) => (
            <div className={styles.embla__slide} key={index}>
               <div className={styles.embla__slide__number}>{slide}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.embla__controls}>
          <div className={styles.embla__buttons}>
              <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
              <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>
          <div className={styles.embla__dots}>
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={`${styles.embla__dot} ${index === selectedIndex ? styles['embla__dot--selected'] : ''}`}
                />
              ))}
            </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
