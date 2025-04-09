import React, { useState, useEffect, useRef } from 'react';

const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 300000); // Cambia la imagen cada 3 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className='slider__container' >
      <div style={{ display: 'flex', transition: 'transform 0.5s ease-in-out', transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Slide ${index + 1}`} style={{ width: '100%', flexShrink: 0 }} />
        ))}
      </div>
      <button onClick={goToPrevious} style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' }}>
        Anterior
      </button>
      <button onClick={goToNext} style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
        Siguiente
      </button>
    </div>
  );
};

export default Slider;