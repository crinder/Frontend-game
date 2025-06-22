import { React, useState, useEffect, useRef } from 'react'
import Global from '../Utils/Global';
import { useLocation } from 'react-router-dom';
import { IconRocket } from '../Utils/Icons';

const PreviewSlider = () => {

    const location = useLocation();
    const items = location.state.items;

    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        }, 300000); // Cambia la imagen cada 3 segundos

        return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
    }, [items.length]);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };


    return (

        <div className='slider__container' >
            <div style={{ display: 'flex', transition: 'transform 0.5s ease-in-out', transform: `translateX(-${currentIndex * 100}%)` }}>
                {items.map((item, index) => {

                    return (
                        item.image ?
                            <img src={Global.url + 'slider/images/' + item.image} alt="Card" style={{ width: '100%', flexShrink: 0 }} />
                            :
                            <img src={item.url} alt="Card" style={{ width: '100%', flexShrink: 0 }} />
                    )

                })}
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


    )
}

export default PreviewSlider