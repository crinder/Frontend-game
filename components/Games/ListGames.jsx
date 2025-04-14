import { React, useState, useEffect } from 'react'
import Global from '../Utils/Global'
import CardGames from './CardGames';
import { useNavigate } from 'react-router-dom';

const ListGames = () => {

    const [games, setGames] = useState([]);
    const navigate = useNavigate();

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
        }

    }

    useEffect(() => {
        devuelveGames();
    }, []);

    const editarGames = (id) => {
        navigate('/ultra-games/editar-games/', { state: { id } });
    }

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
                                    name={game.name} img={game.image}/>
                            </div>
                        )
                    })

                    }

                </div>
            </div>
        </div>
    )
}

export default ListGames