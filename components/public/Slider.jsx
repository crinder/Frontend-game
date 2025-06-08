import React, { useState, useEffect, useRef } from 'react';
import Global from '../Utils/Global';
import { IconRocket } from '../Utils/Icons';

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
          <img key={index} src={Global.url + 'slider/images/' + image.image} alt={`Slide ${index + 1}`} style={{ width: '100%', flexShrink: 0 }} />
        ))}
      </div>
      <button className='button__slider-right button__rocket' onClick={goToPrevious}>
        <div class="svg-wrapper-1">
          <div class="svg-wrapper">
            <IconRocket w={24} h={24} />
          </div>
        </div>
        <span>Anterior</span>
      </button>

      <button className='button__slider-left button__rocket' onClick={goToNext}>
        <div class="svg-wrapper-1">
          <div class="svg-wrapper">
            <IconRocket w={24} h={24} />
          </div>
        </div>
        <span>Siguiente</span>
      </button>
    </div>
  );
};

export default Slider;