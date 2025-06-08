import { React, useState, useEffect } from 'react'
import Global from '../Utils/Global'
import CardGames from './CardGames';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { IconArrowLeft, IconArrowRights } from '../Utils/Icons';

const ListGames = () => {

    const [games, setGames] = useState([]);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const devuelveGames = async () => {

        const body = {
            page: page,
            limit: 15
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
            setTotalPages(data.total);
        }

    }

    useEffect(() => {
        devuelveGames();
    }, []);

    const editarGames = (id) => {
        navigate('/ultra-games/editar-games/', { state: { id } });
    }

    const cambiarPagina = ({ selected }) => {
        setPage(selected + 1);
    }

    useEffect(() => {
        devuelveGames();
    }, [page]);

    return (
        <div className='div__container'>
            <div className='games__crear'>
                <div className='games__title'>
                    <span>Editar juegos</span>
                </div>
            </div>

            <div className='category__form'>
                <div className='games__lists game__section'>

                    {games && games.map(game => {
                        return (
                            <div className="list__games" key={game._id} onClick={() => editarGames(game._id)}>
                                <CardGames preview={'E'} price={game.price} description={game.description}
                                    name={game.name} img={game.image} descuento={game.descuento}/>
                            </div>
                        )
                    })

                    }

                </div>
                <div className='paginacion-games games__paginacion'>
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
        </div>
    )
}

export default ListGames