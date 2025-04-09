import React, { useEffect, useRef, useState } from 'react';

const Recomendados = () => {
  const [position, setPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null); // Nuevo estado para el índice de la imagen resaltada
  const sliderRef = useRef(null);
  const itemWidth = useRef(0);
  const speed = 0.1;

  const images = [
    'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2019/05/last-us-2.jpg',
    'https://cdn.mos.cms.futurecdn.net/tzrHVPCwDh2PDn9umMBm3X-1200-80.jpg',
    'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2020/06/horizon-forbidden-west-dive-1964777.jpeg?tf=3840x',
    'https://images.ctfassets.net/wn7ipiv9ue5v/2o2zzN8bdBFi6BwGFJR1lK/fab7d2a0fa20e7a8ec13c6400bd21422/N25-BASE-STANDARD_EDITION_ANNOUNCE-NA-STATIC-ESRB-AGN-1920x1080.jpg',
    'https://media.vandal.net/i/1280x720/27407/god-of-war-201842202610_1.jpg',
    'https://www.gematsu.com/wp-content/uploads/2022/12/Hogwarts-Legacy-Play_12-14-22.jpg',
  ];

  const duplicatedImages = Array(3).fill(images).flat();

  useEffect(() => {
    if (sliderRef.current) {
      itemWidth.current = sliderRef.current.offsetWidth / images.length;
    }
  }, [images.length]);

  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      if (!isPaused) {
        setPosition((prevPosition) => prevPosition - speed);
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    if (!isPaused) {
      animationFrameId = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [speed, isPaused]);

  useEffect(() => {
    if (sliderRef.current && itemWidth.current) {
      setPosition((prevPosition) => prevPosition % (itemWidth.current * images.length));
    }
  }, [position, images.length]);

  return (
    <div
      className="recomendados__container"
      style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={sliderRef}
        style={{
          display: 'inline-flex',
          transition: 'none',
          transform: `translateX(${position}px)`,
          borderRadius: '10px',
        }}
      >
        {duplicatedImages.map((image, index) => (
          <div
             {...(hoveredIndex === index ? { className: 'recomendados__image recomendados__image-hover' } : 
               isPaused ? { className: 'recomendados__image recomendados__image--paused' } : { className: 'recomendados__image' })}
            key={index}
            onMouseEnter={() => setHoveredIndex(index)} // Actualizar el índice al pasar el cursor
            onMouseLeave={() => setHoveredIndex(null)} // Restablecer el índice al salir el cursor
          >
            <img src={image} alt="Slider" className='recomendados__image-img'/>
          </div>
        ))}
      </div>
      <button>Ver todos</button>
    </div>
  );
};

export default Recomendados;