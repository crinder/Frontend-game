import React, { use, useEffect, useState, useRef } from 'react'
import Global from '../Utils/Global';
import CardGames from './CardGames';
import { useNavigate } from 'react-router-dom';
import FadeInOnScroll from '../Utils/FadeInOnScroll';

const ListDescuento = ({ children, threshold = 0.2, rootMargin = '0px' }) => {

  const [isOpenCategoria, setIsOpenCategoria] = useState(false);
  const [isOpenDescuentos, setIsOpenDescuentos] = useState(false);
  const [isOpenPrecio, setIsOpenPrecio] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [games, setGames] = useState([]);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const [loadingGames, setLoadingGames] = useState(true);

  const toggleCategoria = () => {
    setIsOpenCategoria(!isOpenCategoria);
  };

  const toggleDescuentos = () => {
    setIsOpenDescuentos(!isOpenDescuentos);
  };

  const togglePrecio = () => {
    setIsOpenPrecio(!isOpenPrecio);
  };

  useEffect(() => {
    devuelveGames();
    console.log('devuelve games...');
  }, []);

  const devuelveGames = async () => {

    const request = await fetch(Global.url + 'game/list', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await request.json();

    if (data.status == 'success') {
      setGames(data.game);
      setLoadingGames(false);
    }

  }

  const viewDeatail = (id) => {
    navigate('/ultra-games/detalle-game/', { state: { id } });
  }

  return (
    <div className='div__container'>

      <div className='div__title'>
        <span className='div__title-text'>Listado</span>
      </div>

      <div className='games__container'>
        <div className='nav__filter'>
          <span className='nav__filter-text'>Filtrar por: </span>
          <div className='nav__filter-list'>
            <div className='nav__filter-item'>
              <div className='nav__filter-item-text' onClick={toggleCategoria}>
                Categoria
                <span className={`arrow ${isOpenCategoria ? 'up' : 'down'}`}></span>
              </div>
              {isOpenCategoria && (
                <nav className='nav__filter-item-nav'>
                  <ul className='nav__filter-item-list'>
                    <li className='nav__filter-item-opc-item'>
                      <div className='nav__filter-item-opc-item-container'>
                        <input type="checkbox" name="categoria" id="categoria" />
                        <label htmlFor="categoria" className='nav__filter-label'>Estrategia</label>
                      </div>
                    </li>
                    <li className='nav__filter-item-opc-item'>
                      <div className='nav__filter-item-opc-item-container'>
                        <input type="checkbox" name="categoria" id="categoria" />
                        <label htmlFor="categoria" className='nav__filter-label'>Aventura</label>
                      </div>
                    </li>
                    <li className='nav__filter-item-opc-item'>
                      <div className='nav__filter-item-opc-item-container'>
                        <input type="checkbox" name="categoria" id="categoria" />
                        <label htmlFor="categoria" className='nav__filter-label'>RPG</label>
                      </div>
                    </li>
                  </ul>
                </nav>
              )}
            </div>

            <div className='nav__filter-item'>
              <div className='nav__filter-item-text' onClick={toggleDescuentos}>
                Descuentos
                <span className={`arrow ${isOpenDescuentos ? 'up' : 'down'}`}></span>
              </div>
              {isOpenDescuentos && (
                <nav className='nav__filter-item-nav'>
                  <ul className='nav__filter-item-list'>
                    <li className='nav__filter-item-opc-item'>
                      <div className='nav__filter-item-opc-item-container'>
                        <input type="checkbox" name="descuentos" id="descuentos" />
                        <label htmlFor="descuentos" className='nav__filter-label'>Menos 10%</label>                  </div>
                    </li>
                    <li className='nav__filter-item-opc-item'>
                      <div className='nav__filter-item-opc-item-container'>
                        <input type="checkbox" name="descuentos" id="descuentos" />
                        <label htmlFor="descuentos" className='nav__filter-label'>Menos 15%</label>
                      </div>
                    </li>
                    <li className='nav__filter-item-opc-item'>
                      <div className='nav__filter-item-opc-item-container'>
                        <input type="checkbox" name="descuentos" id="descuentos" />
                        <label htmlFor="descuentos" className='nav__filter-label'>Menos 20%</label>
                      </div>
                    </li>
                  </ul>
                </nav>
              )}
            </div>

            <div className='nav__filter-item'>
              <div className='nav__filter-item-text' onClick={togglePrecio}>
                Precio
                <span className={`arrow ${isOpenPrecio ? 'up' : 'down'}`}></span>
              </div>
              {isOpenPrecio && (
                <nav className='nav__filter-item-nav'>
                  <ul className='nav__filter-item-list'>
                    <li className='nav__filter-item-opc-item'>
                      <div className='nav__filter-item-opc-item-container'>
                        <input type="checkbox" name="precio" id="precio" />
                        <label htmlFor="precio" className='nav__filter-label'>Menos 10$</label>
                      </div>
                    </li>
                    <li className='nav__filter-item-opc-item'>
                      <div className='nav__filter-item-opc-item-container'>
                        <input type="checkbox" name="precio" id="precio" />
                        <label htmlFor="precio" className='nav__filter-label'>Menos 15$</label>
                      </div>
                    </li>
                    <li className='nav__filter-item-opc-item'>
                      <div className='nav__filter-item-opc-item-container'>
                        <input type="checkbox" name="precio" id="precio" />
                        <label htmlFor="precio" className='nav__filter-label'>Menos 20$</label>
                      </div>
                    </li>
                  </ul>
                </nav>
              )}
            </div>
          </div>
        </div>

        <div className='list__list'>
          {loadingGames ? (
            <p>Cargando juegos...</p> // Mensaje de carga
          ) : (
            games.length > 0 ? (
              games.map(game => (
                // ¡AQUÍ ES DONDE USAS FADEINOPSCROLL PARA CADA ITEM!
                <FadeInOnScroll key={game._id}> {/* Usa game._id como key */}
                  <div className='list__games' onClick={() => viewDeatail(game._id)}>
                    <CardGames
                      preview={'E'} // ¿Qué significa 'E'? Asegúrate de que sea lo que esperas
                      price={game.price}
                      description={game.description}
                      name={game.name}
                      img={game.image} // Asumiendo que game.image es la URL de la imagen
                    />
                  </div>
                </FadeInOnScroll>
              ))
            ) : (
              <p>No se encontraron juegos.</p> // Mensaje si no hay juegos
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default ListDescuento