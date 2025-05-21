import React, { useRef, useEffect, useState } from 'react';


const FadeInOnScroll = ({ children, threshold = 0.2, rootMargin = '0px' }) => {
  const domRef = useRef(); 
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: threshold,
        rootMargin: rootMargin,
      }
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    // Función de limpieza
    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return (
    <div
      ref={domRef}
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
    >
      {children}
    </div>
  );
};

export default FadeInOnScroll;