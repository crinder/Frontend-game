import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Global from '../Utils/Global';
import Images from '../Utils/Images';

const Category = () => {

    const navigate = useNavigate();
    const [categorias, setCategorias] = useState([]);

    const crear = () => {
        navigate('/ultra-games/crear-categorias');
    }

    const editar = (id) => {
        navigate('/ultra-games/editar-categorias/', { state: { id } });
    }

    const devuelveCategorias = async () => {

        const request = await fetch(Global.url + 'category/list', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await request.json();

        if (data.status == 'success') {
            setCategorias(data.category);
        }

    }

    useEffect(() => {
        devuelveCategorias();
    }, []);

    return (
        <div className='category__container div__container'>


            <section className='category__category'>

                <div className='category__title'>
                    <span>Categorias</span>
                </div>

                <div className='category__list'>

                    {categorias && categorias.map(categoria => {
                        return (
                            <div className='card__category' key={categoria._id} onClick={() => editar(categoria._id)}>
                                <div className='card__category-img'>
                                    <Images nombreImg={categoria.img} />
                                    <div className='card__category-body'>
                                        <h4 className='card__category-body-title'>{categoria.name}</h4>
                                    </div>
                                </div>
                            </div>
                        )

                    })}
                    

                    <div className='card__category' onClick={() => crear()}>
                            <div className='card__category-img'>
                                <div className='card__category-grandient'>
                                    <img src="https://sm.ign.com/ign_es/feature/t/the-best-p/the-best-playstation-exclusives-of-all-time_es2q.jpg" alt=""
                                        className='card__category-img-img'
                                    />
                                </div>
                                <div className='card__category-body'>
                                    <h4 className='card__category-body-title'>Crear categorias</h4>
                                </div>
                            </div>
                        </div>
                </div>

            </section>

        </div>
    )
}

export default Category