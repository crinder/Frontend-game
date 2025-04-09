import React from 'react'
import Slider from '../public/slider';
import Recomendados from '../Games/Recomendados';
import Descuentos from '../Games/Descuentos';

const Container = () => {

  const images = [
    'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2020/06/horizon-forbidden-west-dive-1964777.jpeg?tf=3840x',
    'https://images.ctfassets.net/wn7ipiv9ue5v/2o2zzN8bdBFi6BwGFJR1lK/fab7d2a0fa20e7a8ec13c6400bd21422/N25-BASE-STANDARD_EDITION_ANNOUNCE-NA-STATIC-ESRB-AGN-1920x1080.jpg',
    'https://media.vandal.net/i/1280x720/27407/god-of-war-201842202610_1.jpg'
  ];
  return (
    <div className='div__container'>
        <Slider  images={images} />

        <div className='container__content'></div>
        <Descuentos/>
        <Recomendados/>

    </div>
  )
}

export default Container