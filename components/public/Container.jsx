import {React,useEffect, useState} from 'react'
import Slider from '../public/slider';
import Recomendados from '../Games/Recomendados';
import Descuentos from '../Games/Descuentos';
import Global from '../Utils/Global';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const Container = () => {

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const devuelveSlider = async () => {

    const request = await fetch(Global.url + 'slider/list', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await request.json();

    if (data.status == 'success') {
      setImages(data.slider);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      
    }

  }

  useEffect(() => {
    devuelveSlider();
  }, []);

  return (
    <div className='div__container'>
      {isLoading ? <Skeleton count={1} height={700} baseColor="#e9e8e8" highlightColor="#ffffff" /> :
        images && <Slider images={images} />
      }
      
        <div className='container__content'></div>
        <Descuentos/>
        <Recomendados/>

    </div>
  )
}

export default Container