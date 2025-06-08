import { React, useEffect, useState } from 'react'
import Global from '../Utils/Global';
import { useLocation, useNavigate } from 'react-router-dom';
import Dropzone from '../Utils/Dropzone';
import { IconCategory } from '../Utils/Icons';
import CardGames from '../Games/CardGames';
import Select from 'react-select';

const Editar = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state.id;

  const [name, setName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [optionSeleted, setOptionSeleted] = useState([]);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  let categories;
  const [categorias, setCategorias] = useState([]);
  const [game, setGame] = useState([]);
  const [peso, setPeso] = useState('');
  const [plataforma, setPlataforma] = useState([]);
  const [categoriaSelected, setCategoriaSelected] = useState([]);
  const [optionPlataforma] = useState([
    { value: 'PS4', label: 'PS4' },
    { value: 'PS5', label: 'PS5' }
  ]);

  const [optionIdioma] = useState([
    { value: 'ES', label: 'Español' },
    { value: 'EN', label: 'Inglés' }
  ]);
  const [idioma, setIdioma] = useState('');

  const [plataformaSelected, setPlataformaSelected] = useState([]);
  const [idiomaSelected, setIdiomaSelected] = useState([]);

  useEffect(() => {
    buscarCate();
    devuelveGame();
  }, []);


  const fileSelected = (file) => {
    setSelectedFile(file);
  }

  const handleChange = (selected) => {
    setOptionSeleted(selected);
    setCategoriaSelected(selected);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();


    setIsUploading(true);

    const opciones = optionSeleted.map(option => {
      return option.value;
    });

    const idiomaS = idiomaSelected.map(option => {
      return option.value;
    });

    const plataformaS = plataformaSelected.map(option => {
      return option.value;
    });

    const formData = new FormData();
    formData.append('name', name);
    formData.append('file', selectedFile);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', opciones);
    formData.append('id', id);
    formData.append('idioma', idiomaS);
    formData.append('plataforma', plataformaS);


    try {
      const request = await fetch(Global.url + 'game/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await request.json();

      if (data.status === 'success') {
        console.log('success');
        /*setName('');
        setSelectedFile(null);*/
      } else {
        console.log('Request failed:', data);
      }
    } catch (error) {
      console.error('Error al enviar la petición:', error);
    } finally {
      setIsUploading(false);
    }
  }

  const devuelveGame = async () => {

    const request = await fetch(Global.url + 'game/list-one/' + id, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await request.json();

    if (data.status == 'success') {
      setGame(data.game);
      setName(data.game.name);
      setPrice(data.game.price);
      setDescription(data.game.description);

      let gamesPlataforma = data.game.plataforma.map(plataforma => {
                            const foundOption = optionPlataforma.find(opt => opt.value === plataforma);
                            return foundOption ? foundOption : null;
                            }).filter(option => option !== null)

      setPlataformaSelected(gamesPlataforma);
      


      let gamesIdioma = data.game.idioma.map(idioma => {
                        const foundOption = optionIdioma.find(opt => opt.value === idioma);
                        return foundOption ? foundOption : null;
                        }).filter(option => option !== null)

      setIdiomaSelected(gamesIdioma);

      let gamesCategory = data.game.category.map(categoria => {
                          const foundOption = categories.find(opt => opt.value === categoria);
                          return foundOption ? foundOption : null;
                        }).filter(option => option !== null);

      setCategoriaSelected(gamesCategory);
      setOptionSeleted(gamesCategory);

    }

  }

  const buscarCate = async () => {
    const request = await fetch(Global.url + 'category/list', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await request.json();

    if (data.status == 'success') {

      categories = data.category.map(category => {

        return {
          value: category._id,
          label: category.name
        }
      });

      setCategorias(categories);

    }

  }

  const handleDelete = async () => {

    const response = await fetch(Global.url + 'game/delete/' + id, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    if (data.status === 'success') {
      navigate('/ultra-games/list-games');
    }


  }

  const handleChange2 = (selected) => {
    setPlataforma(selected);
    setPlataformaSelected(selected);
  }

  const handleChange3 = (selected) => {
    setIdioma(selected);
    setIdiomaSelected(selected);
  }

  return (
    <div className='div__container'>

      <div className='games__crear'>
        <div className='games__title'>
          <span>Editar juego</span>
        </div>
      </div>

      <div className='category__form'>
        {game &&

          <div className='category__section game__section'>

            <section className='game__games-content'>
              <div className='game__games-content-left'>

                <div className='category__input game__input-crear'>
                  <div className='category__input game__input-crear'>
                    <input type='text' name='name' id='name' placeholder='Nombre del juego'
                      className='category__input-field' required onChange={(e) => setName(e.target.value)}
                      defaultValue={game.name} />
                    <label htmlFor='name' className='category__label'>Nombre del juego</label>
                    <IconCategory />
                  </div>
                </div>

                <div className='games__game '>
                  <div className='category__input game__input-crear '>
                    {
                      categoriaSelected.length > 0 &&
                      <Select
                        isMulti
                        options={categorias}
                        value={categoriaSelected}
                        onChange={handleChange} />
                    }
                  </div>
                </div>

                <div className='games__game'>

                  <div className='category__input game__input-crear game__games-dist4'>
                    <input type='text' name='peso' id='peso' placeholder='peso'
                      className='category__input-field' required onChange={(e) => setPeso(e.target.value)}
                      defaultValue={game.peso} />
                    <label htmlFor='peso' className='category__label'>Peso</label>
                    <IconCategory />
                  </div>

                  <div className='category__input game__input-crear game__games-dist4'>
                    <input type='text' name='name' id='name' placeholder='Precio'
                      className='category__input-field' required onChange={(e) => setPrice(e.target.value)}
                      defaultValue={game.price} />
                    <label htmlFor='name' className='category__label'>Precio</label>
                    <IconCategory />
                  </div>

                  <div className='category__input game__input-crear game__games-dist5'>
                    <Select isMulti options={optionPlataforma} value={plataformaSelected} onChange={handleChange2} />
                  </div>

                  <div className='category__input game__input-crear game__games-dist5'>
                    <Select isMulti onChange={handleChange3} value={idiomaSelected} options={optionIdioma} />
                  </div>

                </div>

                <div className='category__input game__input-crear'>
                  <textarea type='text' name='name' id='name' placeholder='Descripcion'
                    className='category__input-field' required onChange={(e) => setDescription(e.target.value)}
                    defaultValue={game.description} />
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

              {!preview && game &&
                <CardGames preview={'E'} price={price} description={description} name={name} img={game.image} />
              }

              <div className='category__button'>
                <div className='category__submit'>
                  <button className="button" onClick={handleSubmit} disabled={isUploading}>
                    <p>{isUploading ? 'Subiendo...' : 'Editar juego'}</p>
                  </button>
                </div>

                <div className='category__submit'>
                  <button className="button" onClick={handleDelete}>
                    <p>Eliminar</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Editar