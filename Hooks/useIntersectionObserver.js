import { useEffect } from 'react';



const useIntersectionObserver = (ref, onEnter, onExit) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onEnter();
        } else {
          onExit();
        }
      });
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, onEnter, onExit]);
};



export default useIntersectionObserver;
