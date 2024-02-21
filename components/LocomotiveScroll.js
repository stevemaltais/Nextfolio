import { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

const LocomotiveScrollComponent = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scroll = new LocomotiveScroll({
      el: containerRef.current,
      smooth: true,
      // Autres options ici...
    });

    return () => scroll.destroy();
  }, []);

  return <div data-scroll-container ref={containerRef}>{children}</div>;
};

export default LocomotiveScrollComponent;
