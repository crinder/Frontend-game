import { React, useEffect, useState } from 'react'
import Global from '../Utils/Global';
import ReactPaginate from 'react-paginate';
import { IconArrowLeft, IconArrowRights } from '../Utils/Icons';

const ListDescuento = () => {

    const [games, setGames] = useState([]);
    const [descuentos, setDescuentos] = useState([]);
    const [destacado, setDestacado] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);


    const cambiarPagina = ({ selected }) => {
        setPage(selected + 1);
    }

    useEffect(() => {
        devuelveGames();
    }, [page]);

    const devuelveGames = async () => {

        let body = {
            page: page,
            limit: 12,
        };

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

    const handleChangeDescuento = (event, id) => {
        const { value } = event.target;
        const idGame = id;

        setDescuentos({
            ...descuentos,
            [idGame]: value
        });
    }

    const handleSubmit = async () => {

        let devolverDescuento = 'N';
        let devolverDescadado = 'N';

        if (Object.keys(descuentos).length == 0) {
            devolverDescuento = 'S';
        }

        if (Object.keys(destacado).length == 0) {
            devolverDescadado = 'S';
        }

        if (devolverDescadado == 'S' && devolverDescuento == 'S') {
            console.log('return');
            return;
        }

        let body = {
            descuento: descuentos,
            destacado: destacado
        }

        console.log('body...', body);

        const request = await fetch(Global.url + 'game/update', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await request.json();

        if (data.status == 'success') {
            console.log('success');
        }
    }

    const handleChangeDestacado = (event, id) => {
        let { value } = event.target;

        if (value) {
            value = 'S';
        } else {
            value = 'N';
        }

        const idGame = id;
        setDestacado({
            ...destacado,
            [idGame]: value
        });
    }


    return (
        <div className='div__container'>
            <div className='container__content'>
                <div className='descuentos__title'>
                    <span className='descuentos__title-text'>Aplicar descuentos</span>
                </div>
            </div>

            <section className='descuentos__container'>
                <div className='descuentos__list'>
                    {games && games.map(game => {
                        return (
                            <div key={game._id} className='descuentos__item-container'>

                                <section className='section__descuento'>

                                    <div className='descuentos__item'>
                                        <div className='descuentos__item-img'>
                                            <img src={Global.url + 'game/images/' + game.image} alt="Slider" />
                                        </div>

                                        <div className='descuentos__item-desc'>

                                            <div className='descuentos__item-title'>
                                                <span className='descuentos__item-title-text remarcar_text'>{game.name}</span>
                                                <span className='descuentos__item-price-text'><span className='remarcar_text'>Precio: $</span> {game.price}</span>
                                            </div>
                                            <div className='descuentos__item-price'>

                                            </div>
                                            <div className='descuentos__item-descuento'>
                                                <span className='descuentos__item-descuento-text descuentos__item-title-text remarcar_text'>Descuento: </span>
                                                <input type="text" name="descuento" id="descuento" placeholder='Descuento' className='input-has-icon input-has-icon-desc'
                                                    defaultValue={game.descuento}
                                                    onChange={e => handleChangeDescuento(e, game._id)}
                                                />
                                            </div>

                                            {descuentos[game._id] && game.descuento == 0 &&

                                                <div className='descuentos__apply'>
                                                    <p><span className='descuentos__item-title-text remarcar_text'>Total con descuento:</span> {game.price * (1 - descuentos[game._id] / 100).toFixed(2)}</p>
                                                    <div>
                                                        <span className='descuentos__destacado-text'>Destacar?</span>
                                                        <input type="checkbox" name="destacado" id="destacado" onChange={e => handleChangeDestacado(e, game._id)}
                                                            defaultValue={destacado[game._id]}
                                                        />
                                                    </div>

                                                </div>

                                            }

                                            {game.descuento > 0 && !descuentos[game._id] &&

                                                <div className='descuentos__apply'>
                                                    <p><span className='descuentos__item-title-text remarcar_text'>Total con descuento: $</span>{game.price * (1 - game.descuento / 100).toFixed(2)}</p>
                                                    <div>
                                                        <span className='descuentos__destacado-text descuentos__item-title-text remarcar_text'>Destacar?</span>
                                                        <input type="checkbox" name="destacado" id="destacado" onChange={e => handleChangeDestacado(e, game._id)}
                                                            checked={game.destacado == 'S' ? true : false}
                                                            className='destacado_checkbox'
                                                        />

                                                    </div>

                                                </div>

                                            }

                                        </div>

                                    </div>
                                </section>
                            </div>
                        )
                    })}

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

                    <button className="button" onClick={handleSubmit}>
                        <p>Aplicar</p>
                    </button>
                </div>

            </section>

        </div>
    )
}

export default ListDescuento