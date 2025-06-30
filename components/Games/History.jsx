import { React, useState, useEffect } from 'react'
import Global from '../Utils/Global';
import { useAuth } from '../Context/authContext';
import GoogleAuth from '../Utils/googleAuth';
import Skeleton from 'react-loading-skeleton';
import moment from 'moment';

const History = () => {


    const [historial, setHistorial] = useState([]);
    const { token, isLoading, authLogin } = useAuth();
    const [authorize, setAuthorize] = useState(false);
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        if (token) {
            devuelveHistorial();
        }else{
            setHistorial([]);
        }
    }, [token]);

    useEffect(() => {
        if (authorize) {
            authLogin(true);
            setCargando(false);
            setAuthorize(false);
        }
    }, [authorize]);

    const devuelveHistorial = async () => {

        const request = await fetch(Global.url + 'pedido/list', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                authorization: token
            }
        });

        const data = await request.json();

        if (data.status == 'success') {
            setHistorial(data.pedido);
        }

    }

    return (
        <div className='div__container'>
            <div className='historial__container'>
                <header className='historial__header'>
                    <span className='title__color--title'>Historial de compras</span>
                </header>

                {!token && isLoading &&
                    <Skeleton count={1} baseColor="#e9e8e8" highlightColor="#ffffff" containerClassName="my-custom-skeleton-card-flex"
                        height={300} width={600} />
                }

                <section className='historial__content'>
                    {token && historial && historial.length > 0 &&
                        historial.map(historial => {
                            return (
                                <div className='historial__card' key={historial._id}>
                                    <div className='historial__card-header'>
                                        <span className='historial__card-header-title game__card-price'>Fecha de compra: <span className='historial-title'>{moment(historial.created_at).format('DD/MM/YYYY')}</span></span>
                                        <span className='historial__card-header-title game__card-price'>Total pagado: <span className='historial-title'>{historial.total}$</span></span>
                                        {historial.descuento > 0 &&
                                            <span className='historial__card-header-title game__card-price'>Total pagado con descuento: <span className='historial-title'>{historial.descuento}$</span></span>
                                        }

                                    </div>
                                    {historial.game &&
                                        historial.game.map(game => {
                                            return (
                                                <div className='historial__card-body'>
                                                    <div className='historial__card-body-title'>
                                                        <div className='historial__card-body-img'>
                                                            <img src={Global.url + 'game/images/' + game.image} alt="Slider" className='historial__card-body-img-img' />
                                                        </div>

                                                        <div className='historial__card-body-text'>
                                                            <span className='historial_title '>{game.name}</span>
                                                            <span className='game__card-price'>Precio: <span className='historial-title'>{game.price}$</span> </span>
                                                            {game.descuento > 0 &&
                                                                <div className='historial__card-body-descuento'>
                                                                    <span className=' game__card-price'>Descuento: <span className='historial-title'>{game.descuento}%</span></span>
                                                                    <span className=' game__card-price'>Precio: <span className='historial-title'>{game.price - (game.price * game.descuento / 100)}$</span></span>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                        })

                                    }
                                </div>
                            )
                        })}

                    {token && historial.length == 0 &&
                        <span>No tienes historial de compras</span>
                    }

                    {!token && !isLoading &&
                        <GoogleAuth Message={'Inicia session para ver tu historial'} authorize={authorize} setAuthorize={setAuthorize} cargando={cargando} setCargando={setCargando} />
                    }

                </section>
            </div>
        </div>
    )
}

export default History