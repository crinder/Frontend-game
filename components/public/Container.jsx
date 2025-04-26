import {React,useEffect, useState} from 'react'
import Slider from '../public/slider';
import Recomendados from '../Games/Recomendados';
import Descuentos from '../Games/Descuentos';
import Global from '../Utils/Global';

const Container = () => {

  const [images, setImages] = useState([]);

  const devuelveSlider = async () => {

    const request = await fetch(Global.url + 'slider/list', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await request.json();

    if (data.status == 'success') {
      setImages(data.slider);
    }

  }

  useEffect(() => {
    devuelveSlider();
  }, []);

  return (
    <div className='div__container'>
      {images && <Slider images={images} />}

        <div className='container__content'></div>
        <Descuentos/>
        <Recomendados/>

    </div>
  )
}

export default Container