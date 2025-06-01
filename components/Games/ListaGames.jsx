import React, { use, useEffect, useState, useRef } from 'react'
import Global from '../Utils/Global';
import CardGames from './CardGames';
import { useNavigate } from 'react-router-dom';
import FadeInOnScroll from '../Utils/FadeInOnScroll';
import Skeleton from 'react-loading-skeleton';
import ReactPaginate from 'react-paginate';
import { IconArrowLeft, IconArrowRights } from '../Utils/Icons';

const ListDescuento = ({ children, threshold = 0.2, rootMargin = '0px' }) => {

  const [isOpenCategoria, setIsOpenCategoria] = useState(false);
  const [isOpenDescuentos, setIsOpenDescuentos] = useState(false);
  const [isOpenPrecio, setIsOpenPrecio] = useState(false);
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [loadingGames, setLoadingGames] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
    devuelveCategories();
    devuelveGames();
  }, []);

  const devuelveGames = async () => {

    const body = {
      page: page,
      limit: 12
    }

    const request = await fetch(Global.url + 'game/list', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await request.json();

    if (data.status == 'success') {
      setGames(data.game);
      setLoadingGames(false);
      setTotalPages(data.total);
    }
  }

  const viewDeatail = (id) => {
    navigate('/ultra-games/detalle-game/', { state: { id } });
  }

  const devuelveCategories = async () => {
    const request = await fetch(Global.url + 'category/list', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await request.json();

    if (data.status == 'success') {
      setCategories(data.category);
    }

  }

  const cambiarPagina = ({ selected }) => {
    setPage(selected + 1);
  }

  useEffect(() => {
    devuelveGames();
  }, [page]);

  return (
    <div className='div__container games__games-container'>

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
                    {categories.map(category => (
                      <li className='nav__filter-item-opc-item' key={category._id}>
                        <div className='nav__filter-item-opc-item-container'>
                          <input type="checkbox" name="categoria" id={category._id} />
                          <label htmlFor={category._id} className='nav__filter-label'>{category.name}</label>
                        </div>
                      </li>
                    ))}
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
            <Skeleton count={4} baseColor="#e9e8e8" highlightColor="#ffffff" containerClassName="my-custom-skeleton-card-container"
              height={400} width={300} />) : (
            games.length > 0 ? (
              games.map(game => (
                <FadeInOnScroll key={game._id}> { }
                  <div className='list__games' onClick={() => viewDeatail(game._id)}>
                    <CardGames
                      preview={'E'}
                      price={game.price}
                      description={game.description}
                      name={game.name}
                      img={game.image}
                      descuento={game.descuento}
                      plataform={game.plataforma}
                    />
                  </div>
                </FadeInOnScroll>
              ))

            ) : (
              <p>No se encontraron juegos.</p>
            )
          )}

        </div>
      </div>
      <div className='paginacion-games'>
        <ReactPaginate
          previousLabel={<IconArrowLeft />}
          nextLabel={<IconArrowRights />}
          pageCount={totalPages}
          onPageChange={cambiarPagina}
          containerClassName={"paginacion-content"}
          activeClassName={"pagina-activa"}
        />
      </div>
    </div>
  )
}

export default ListDescuento