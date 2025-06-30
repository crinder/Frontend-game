import { React, useEffect, useState } from 'react'
import { IconCategory } from '../Utils/Icons';
import Dropzone from '../Utils/Dropzone';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import global from '../Utils/Global';
import CardGames from '../Games/CardGames';
import Button from '../Utils/Button';

const Crear = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [preview, setPreview] = useState(null);
    const [optionSeleted, setOptionSeleted] = useState([]);
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [idioma, setIdioma] = useState('');
    const [peso, setPeso] = useState('');
    const [descuento, setDescuento] = useState('');
    const [plataforma, setPlataforma] = useState([]);
    const optionPlataforma = [
        { value: 'PS4', label: 'PS4' },
        { value: 'PS5', label: 'PS5' }
    ];
    const idiomas = [
        { value: 'ES', label: 'Español' },
        { value: 'EN', label: 'Inglés' }
    ];

    useEffect(() => {
        buscarCate();
    }, []);


    const fileSelected = (file) => {
        setSelectedFile(file);
    }

    const handleChange = (selected) => {
        setOptionSeleted(selected);
    }

    const handleChange2 = (selected) => {
        setPlataforma(selected);
    }

    const handleChange3 = (selected) => {
        setIdioma(selected);
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            console.log("Por favor, selecciona una imagen.");
            return;
        }

        setIsUploading(true);

        if (peso == 0 || peso == null) {
            console.log("Por favor, selecciona un peso.");
            return;
        }

        if (description.length < 10) {
            console.log("Por favor, escribe una descripcion.");
            return;
        }

        if (name.length < 3) {
            console.log("Por favor, escribe un nombre.");
            return;
        }

        if (price == 0 || peso == null) {
            console.log("Por favor, escribe un precio.");
            return;
        }

        if (optionSeleted.length < 1) {
            console.log("Por favor, selecciona una categoria.");
            return;
        }

        const opciones = optionSeleted.map(option => {
            return option.value;
        });

        const idiomaS = idioma.map(option => {
            return option.value;
        });

        const plataformaS = plataforma.map(option => {
            return option.value;
        });

        const formData = new FormData();
        formData.append('name', name);
        formData.append('file', selectedFile);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category', opciones);
        formData.append('plataforma', plataformaS);
        formData.append('idioma', idiomaS);
        formData.append('peso', peso);

        try {
            const request = await fetch(global.url + 'game/upload', {
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

    const buscarCate = async () => {
        const request = await fetch(global.url + 'category/list', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await request.json();

        if (data.status == 'success') {

            const categoria = data.category.map(category => {

                return {
                    label: category.name,
                    value: category._id
                }
            });

            console.log('categoria...', categoria);

            setCategories(categoria);
        }

    }

    return (
        <div className='div__container'>

            <div className='games__crear'>
                <div className='games__title'>
                    <span className='title__color--title'>Crear un nuevo juego</span>
                </div>
            </div>

            <div className='category__form-crear'>
                <div className='category__section-crear game__section'>

                    <section className='game__games-content'>
                        <div className='game__games-content-left'>

                            <div className='category__input game__input-crear'>
                                <div className='category__input game__input-crear'>
                                    <input type='text' name='name' id='name' placeholder='Nombre del juego'
                                        className='category__input-field' required onChange={(e) => setName(e.target.value)} />
                                    <label htmlFor='name' className='category__label'>Nombre del juego</label>
                                    <IconCategory />
                                </div>
                            </div>

                            <div className='games__game '>

                                <div className='category__input game__input-crear '>
                                    {
                                        categories.length > 0 &&
                                        <Select
                                            isMulti
                                            options={categories}
                                            onChange={handleChange} />
                                    }
                                </div>


                            </div>

                            <div className='games__game'>

                                <div className='category__input game__input-crear game__games-dist2'>
                                    <input type='text' name='peso' id='peso' placeholder='peso'
                                        className='category__input-field' required onChange={(e) => setPeso(e.target.value)} />
                                    <label htmlFor='peso' className='category__label'>Peso</label>
                                    <IconCategory />
                                </div>

                                <div className='category__input game__input-crear game__games-dist3'>
                                    <input type='text' name='name' id='name' placeholder='Precio'
                                        className='category__input-field' required onChange={(e) => setPrice(e.target.value)} />
                                    <label htmlFor='name' className='category__label'>Precio</label>
                                    <IconCategory />
                                </div>

                                <div className='category__input game__input-crear '>
                                    <Select isMulti options={optionPlataforma} onChange={handleChange2} />
                                </div>

                                <div className='category__input game__input-crear game__games-dist'>
                                    <Select isMulti options={idiomas} onChange={handleChange3} />
                                </div>

                            </div>

                            <div className='category__input game__input-crear'>
                                <textarea type='text' name='name' id='name' placeholder='Descripcion'
                                    className='category__input-field' required onChange={(e) => setDescription(e.target.value)} />
                                <label htmlFor='name' className='category__label'>Descripcion</label>
                                <IconCategory />
                            </div>
                        </div>
                    </section>

                    <div className='game__games-preview'>
                        <div className='game__dropzone'>
                            <Dropzone onFileSelected={fileSelected} prewiew={preview} setPreview={setPreview} />
                        </div>

                        {preview &&
                            <CardGames preview={preview} price={price} description={description} name={name} />
                        }

                        <div className='category__button'>
                            <div className='category__submit'>

                                <Button handleSubmit={handleSubmit} isUploading={isUploading}>
                                    {isUploading ? 'Subiendo...' : 'Crear juego'}
                                </Button>
                               
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Crear