import { React, useState, useEffect, useRef } from 'react'
import Global from '../Utils/Global';
import { useLocation } from 'react-router-dom';

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
                            <img src={item.url} alt="Card"  style={{ width: '100%', flexShrink: 0 }}/>
                    )

                })}
            </div>
            <button onClick={goToPrevious} style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)' }}>
                Anterior
            </button>
            <button onClick={goToNext} style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
                Siguiente
            </button>
        </div>


    )
}

export default PreviewSlider