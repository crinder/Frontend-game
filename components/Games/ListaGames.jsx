import React, { use, useEffect, useState, useRef } from 'react'
import Global from '../Utils/Global';
import CardGames from './CardGames';
import { useNavigate } from 'react-router-dom';
import FadeInOnScroll from '../Utils/FadeInOnScroll';
import Skeleton from 'react-loading-skeleton';
import ReactPaginate from 'react-paginate';
import { IconArrowLeft, IconArrowRights } from '../Utils/Icons';
import NavGames from './NavGames';
import Loading from '../Utils/Loading';

const ListDescuento = () => {


  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [loadingGames, setLoadingGames] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categorieSelected, setCategorieSelected] = useState([]);
  const [desde, setDesde] = useState(0);
  const [hasta, setHasta] = useState(0);
  const [descuentoEspecial, setDescuentoEspecial] = useState(0);

  useEffect(() => {
    devuelveCategories();
    devuelveGames();
  }, []);

  const devuelveGames = async () => {

    let body = {
      page: page,
      limit: 12,
    };

    if (categorieSelected.length > 0) {
      body.category = categorieSelected;
    }

    if (desde > 0) {
      body.price_from = desde;
    }

    if (hasta > 0) {
      body.price_to = hasta;
    }

    if (descuentoEspecial > 0) {
      body.descuento = descuentoEspecial;
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
      window.scrollTo(0, 0);
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

  useEffect(() => {

    setLoadingGames(true);

    setTimeout(() => {
      
      devuelveGames();
    }, 1000);

  }, [categorieSelected, desde, hasta, descuentoEspecial]);

  return (
    <div className='div__container games__games-container'>

      <div className='div__title'>
        <span className='div__title-text title__color--title'>Todos los juegos</span>
      </div>

      <div className='games__container'>

        <NavGames categories={categories} categorieSelected={categorieSelected} setCategorieSelected={setCategorieSelected}
                  desde={desde} setDesde={setDesde} hasta={hasta} setHasta={setHasta} descuentoEspecial={descuentoEspecial} setDescuentoEspecial={setDescuentoEspecial} />

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