import React, { useEffect, useRef, useState } from 'react';
import Global from '../Utils/Global';
import Skeleton from 'react-loading-skeleton';
import { IconArrowLeft, IconArrowRights } from '../Utils/Icons';
import Button from '../Utils/Button';
import { useNavigate } from 'react-router-dom';

const Descuentos = () => {

    const [position, setPosition] = useState(0);
    const sliderRef = useRef(null);
    const itemWidth = useRef(0);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const devuelveSlider = async () => {

        let body = {
            page: 1,
            limit: 999,
            destacado: 'S'
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

            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }

    }

    useEffect(() => {
        devuelveSlider();
    }, []);



    useEffect(() => {

        if (sliderRef.current && images.length > 0) {
            setTimeout(() => {
                itemWidth.current = sliderRef.current.offsetWidth / images.length;
                console.log("Tamaño ajustado después del render:", itemWidth.current);
            }, 2000); // Pequeña espera para garantizar que el DOM se estabilice
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
        <div className='games__list-destacado-descuentos'>


            <div ref={sliderRef} style={{ display: 'flex', transition: 'transform 0.5s ease-in-out', transform: `translateX(${position}px)`, }}
                className='games__list-destacado'
            >
                {images && images.map((image, index) => (

                    loading ? (
                        <Skeleton count={4} baseColor="#e9e8e8" highlightColor="#ffffff" containerClassName="my-custom-skeleton-card-container"
                            height={300} width={420} />) : (

                        <div className='games__item-destacado' key={index}>
                            <img src={Global.url + 'game/images/' + image.image} key={index} alt={`Slide ${index + 1}`} style={{ width: '100%', flexShrink: 0 }} />

                        </div>
                    )
                ))}
            </div>

            <div className='games__item-acciones'>
                <span onClick={handlePrev}><IconArrowLeft w={80} h={80} classe={'custom-icon'}/></span>
                <span onClick={() => navigate('/ultra-games/lista-games')}>
                <Button >
                    Ver todos
                </Button>
                </span>
                <span onClick={handleNext}><IconArrowRights w={80} h={80} classe={'custom-icon'} /></span>
            </div>

        </div>
    );
};

export default Descuentos;