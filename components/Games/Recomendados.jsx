import React, { useEffect, useRef, useState } from 'react';
import	Global from '../Utils/Global';

const InfiniteSlider = () => {
  const [position, setPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null); // Índice de la imagen resaltada
  const [images, setImages] = useState([]);
  const sliderRef = useRef(null);
  const itemWidth = useRef(0);
  const speed = 0.5;

  const devuelveSlider = async () => {

    let body = {
        page: 1,
        limit: 999,
        tipo: 'D'
    };

    const request = await fetch(Global.url + 'game/list', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await request.json();

    if (data.status == 'success') {

        setImages(data.game);
    }

}

useEffect(() => {
    devuelveSlider();
}, []);

  const duplicatedImages = [...images, ...images];

  useEffect(() => {
    if (sliderRef.current && images.length > 0) {
        itemWidth.current = sliderRef.current.offsetWidth / images.length;
    }
}, [images]); // Solo recalcula cuando `images` cambia

  useEffect(() => {
    if (!isPaused && images.length > 0) {
        let animationFrameId;
        
        const animate = () => {
            setPosition((prevPosition) => {
                const maxScroll = itemWidth.current * images.length;
                return prevPosition <= -maxScroll ? 0 : prevPosition - speed;
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }
}, [isPaused, images]); // Se activa cuando `isPaused` cambia O cuando `images` tiene datos

  return (
    <div className="slider-container">
      <div
        ref={sliderRef}
        className="slider-track"
        style={{
          display: 'flex',
          transform: `translateX(${position}px)`,
        }}
      >
        {duplicatedImages.map((image, index) => (
          <div
            {...(hoveredIndex === index ? { className: 'slider-item' } : 
              isPaused ? { className: 'slider-item recomendados__image--paused' } : { className: 'slider-item' })}
            key={index}
            onMouseEnter={() => {
              setHoveredIndex(index);
              setIsPaused(true);
            }}
            onMouseLeave={() => {
              setHoveredIndex(null);
              setIsPaused(false);
            }}
          >
            <img src={Global.url + 'game/images/' + image.image} alt={`Slide ${index}`}  className='recomendados__image-img'/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteSlider;