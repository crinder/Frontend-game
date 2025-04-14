import { React, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Global from '../Utils/Global';

const View = () => {

    const location = useLocation();
    const id = location.state.id;

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


    return (
        <div className='div__container'>
            <div className='detalle-games__view'>


                {game &&
                    <section className='game__view'>
                        <div className='game__view--left'>
                            <div className='game__view-img'>
                                <img src={Global.url + 'game/images/' + game.image} alt="Slider" className='game__view-img-img' />
                            </div>
                        </div>

                        <div className='game__view-right'>
                            <div className='game__view-right-container'>

                                <div className='game__view-body'>
                                    <div className='game__view-title'>
                                        <span className='game__view-name'>{game.name}</span>


                                    </div>

                                    <div className='game__view-price'>
                                        <span className='game__view-price'>${game.price}.00  USD</span>
                                    </div>

                                    <div className='game__view-category-container'>
                                        <span className='game__view-category'>PS4</span>
                                    </div>

                                </div>

                                <div className='game__view-body-button'>
                                    <button className="button">Agregar a lista</button>
                                </div>

                                <div className='game__view-body-description'>
                                    <span className='game__view-description'>{game.description}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                }
            </div>
        </div>
    )
}

export default View