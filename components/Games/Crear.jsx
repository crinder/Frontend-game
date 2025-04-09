import { React, useState } from 'react'
import { IconCategory } from '../Utils/Icons';
import Dropzone from '../Utils/Dropzone';
import { useNavigate } from 'react-router-dom';

const Crear = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [preview, setPreview] = useState(null);


    const fileSelected = (file) => {
        setSelectedFile(file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            console.log("Por favor, selecciona una imagen.");
            return;
        }

        setIsUploading(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('file', selectedFile);

        try {
            const request = await fetch(global.url + 'category/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await request.json();

            if (data.status === 'success') {
                console.log('success');
                setName('');
                setSelectedFile(null);
            } else {
                console.log('Request failed:', data);
            }
        } catch (error) {
            console.error('Error al enviar la petición:', error);
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <div className='div__container'>

            <div className='games__crear'>
                <div className='games__title'>
                    <span>Crear un nuevo juego</span>
                </div>
            </div>

            <div className='category__form'>
                <div className='category__section'>

                    <div className='category__input'>
                        <input type='text' name='name' id='name' placeholder='Nombre de la categoría'
                            className='category__input-field' required onChange={(e) => setName(e.target.value)} />
                        <label htmlFor='name' className='category__label'>Nombre de la categoría</label>
                        <IconCategory />
                    </div>

                    <Dropzone onFileSelected={fileSelected} prewiew={preview} setPreview={setPreview} />

                    <div className='category__list'>
                        <div className='card__category created__category'>
                            <div className='card__category-img'>
                                <div className='card__category-grandient'>
                                    <img src={preview}
                                        className='card__category-img-img'
                                    />
                                </div>
                                <div className='card__category-body'>

                                    <h4 className='card__category-body-title'>{name}</h4>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='category__button'>
                        <div className='category__submit'>
                            <button className="button" onClick={handleSubmit} disabled={isUploading}>
                                <p>{isUploading ? 'Subiendo...' : 'Crear categoría'}</p>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Crear