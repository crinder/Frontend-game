import React, { useEffect, useRef, useState } from 'react';

const Descuentos = () => {
    const [position, setPosition] = useState(0);
    const sliderRef = useRef(null);
    const itemWidth = useRef(0);

    const images = [
        'https://juegosdigitalesargentina.com/files/images/productos/1585785076-shadow-of-the-tomb-raider-definitive-edition-ps4.jpg',
        'https://gorilagamesbsas.com/img/Public/1019-producto-dead-island-2-4364.jpg',
        'https://m.media-amazon.com/images/I/8161Oznnf6L.jpg',
        'https://juegosdigitalesargentina.com/files/images/productos/1585785076-shadow-of-the-tomb-raider-definitive-edition-ps4.jpg',
        'https://gorilagamesbsas.com/img/Public/1019-producto-dead-island-2-4364.jpg',
        'https://m.media-amazon.com/images/I/8161Oznnf6L.jpg'
    ];

    useEffect(() => {
        if (sliderRef.current) {
            itemWidth.current = sliderRef.current.offsetWidth / images.length;
        }
    }, [images.length, sliderRef.current]);

    const handlePrev = () => {
        if (sliderRef.current) {
            setPosition((prev) => {
                const newPosition = prev + itemWidth.current;
                if (newPosition > 0) {
                    return -itemWidth.current * (images.length - 1); // Salta a la última imagen
                }
                return newPosition;
            });
        }
    };

    const handleNext = () => {
        if (sliderRef.current) {
            setPosition((prev) => {
                const newPosition = prev - itemWidth.current;
                if (newPosition < -itemWidth.current * (images.length - 1)) {
                    return 0; // Salta a la primera imagen
                }
                return newPosition;
            });
        }
    };

    return (
        <div className='games__list'>
            <div ref={sliderRef} style={{ display: 'flex',transition: 'transform 0.5s ease-in-out', transform: `translateX(${position}px)`,}}>
                {images.map((image, index) => (

                    <div className='games__item' key={index}>
                        <img key={index} src={image} alt={`Slide ${index + 1}`}style={{ width: '100%', flexShrink: 0 }}/>
                    </div>

                ))}
            </div>
            <button onClick={handlePrev}>Anterior</button>
            <button onClick={handleNext}>Siguiente</button>
            <button>Ver todos</button>
        </div>
    );
};

export default Descuentos;