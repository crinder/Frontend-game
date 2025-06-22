import { React, useEffect, useState } from 'react'
import Global from '../Utils/Global';
import { useLocation, useNavigate } from 'react-router-dom';
import Dropzone from '../Utils/Dropzone';
import Images from '../Utils/Images';
import { IconReturn } from '../Utils/Icons';
import Button from '../Utils/Button';

const Editar = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const id = location.state.id;
    const [categorias, setCategorias] = useState([]);
    const [name, setName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        devuelveCategorias();
    }, []);

    const fileSelected = (file) => {
        setSelectedFile(file);
    }

    const devuelveCategorias = async () => {

        const request = await fetch(Global.url + 'category/list-one/' + id, {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsUploading(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('file', selectedFile);
        formData.append('id', id);

        try {
            const request = await fetch(Global.url + 'category/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await request.json();

            if (data.status === 'success') {
                console.log('success');
                devuelveCategorias();
                setName('');
                setSelectedFile(null);
            } else {
                console.log('Request failed:', data);
            }
        } catch (error) {
            console.error('Error al enviar la petición:', error);
        }
    }

    const handleDelete = async () => {

        const response = await fetch(Global.url + 'category/delete/' + id, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        if (data.status === 'success') {
            navigate('/ultra-games/categorias');
        }


    }


    return (
        <div className='categorias__crear div__container'>

            <div className='category__return' onClick={() => navigate('/ultra-games/categorias')}>
                <IconReturn />
            </div>

            {categorias &&
                <div>
                    <div className='category__form'>
                        <div className='category__section'>

                            <div className='category__input'>

                                <input type='text' name='name' id='name' placeholder='Nombre de la categoría'
                                    className='category__input-field' required defaultValue={categorias.name}
                                    onChange={(e) => setName(e.target.value)} />
                                <label htmlFor='name' className='category__label'>Nombre de la categoría</label>
                            </div>

                            < Dropzone onFileSelected={fileSelected} />

                            <div className='category__button game__button'>

                                <div className='category__submit'>
                                    <Button handleSubmit={handleDelete} isUploading={isUploading}>
                                        <p>Eliminar</p>
                                    </Button>
                                </div>

                                <div className='category__submit'>

                                    <Button handleSubmit={handleSubmit} isUploading={isUploading}>
                                        <p>{isUploading ? 'Subiendo...' : 'Editar juego'}</p>
                                    </Button>

                                </div>

                            </div>

                        </div>
                    </div>

                    {categorias &&

                        <div className='category__list'>
                            <div className='card__category'>
                                <div className='card__category-img'>
                                    <div className='card__category-grandient'>
                                        <Images nombreImg={categorias.img} />
                                    </div>
                                    <div className='card__category-body'>

                                        <h4 className='card__category-body-title'>{categorias.name}</h4>

                                    </div>
                                </div>
                            </div>

                        </div>

                    }


                </div>
            }

        </div>
    )
}

export default Editar