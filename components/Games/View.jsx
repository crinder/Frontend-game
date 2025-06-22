import { React, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Global from '../Utils/Global';
import Reviews from './Reviews';
import { useAuth } from '../Context/authContext'
import Button from '../Utils/Button';

const View = () => {

    const location = useLocation();
    const id = location.state.id;
    const { addGame, getItem } = useAuth();

    const [game, setGame] = useState([]);

    useEffect(() => {
        devuelveGame();
    }, []);

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

        }

    }

    const addList = async (e, game) => {
        e.preventDefault();
        await addGame(game);
    }


    return (
        <div className='div__container'>
            <div className='detalle-games__view'>
                {game &&
                    <section className='game__view-section'>

                        <div className='game__view'>
                            <div className='game__view--left'>
                                <div className='game__view-img-linear'></div>
                                <div className='game__view-img'>
                                    <img src={Global.url + 'game/images/' + game.image} alt="Slider" className='game__view-img-img' />
                                </div>
                            </div>
                            <div className='game__view-img-linear-2'></div>
                        </div>

                        <div className='game__view-right'>
                            <div className='game__view-right-container'>

                                <div className='game__view-body'>
                                    <div className='game__view-title'>
                                        <span className='game__view-name'>{game.name}</span>
                                    </div>

                                    {game.descuento != '0' ?
                                        <div>
                                            <span className='game__card-descuento'>${game.price} USD</span>
                                            <span className='game__card-price'>${game.price - (game.price * game.descuento / 100)} USD</span>
                                        </div>
                                        :
                                        <span className='game__card-price'>${game.price} USD</span>
                                    }

                                    <div className='game__view-plataforma-container'>

                                        {game.plataforma && game.plataforma.map(plataform => {
                                            return (
                                                <span className='game__card-description-plataform game__view-plataforma' key={plataform}>{plataform}</span>
                                            )
                                        })

                                        }
                                    </div>

                                </div>

                                <div className='game__view-body-description-container game__view-body'>

                                    <div className='category__submit'>

                                        <Button handleSubmit={e => addList(e, game)}>
                                            <p>Agregar a lista</p>
                                        </Button>

                                    </div>

                                    <div className='game__view-body-description'>
                                        <span className='game__view-description'>{game.description}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Reviews id_game={id} />
                    </section>
                }
            </div>
        </div>
    )
}

export default View