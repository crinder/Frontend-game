import { React, useState, useEffect, useRef, use } from 'react';
import { IconClose, IconShopping, Icondelete } from '../Utils/Icons';
import { devuelveMetodoDePago } from '../Utils/Indexed';
import { useAuth } from '../Context/authContext'
import Global from '../Utils/Global';
import GoogleAuth from '../Utils/googleAuth';

const Shopping = () => {

    const [isOpenGames, setIsOpenGames] = useState(false);
    const cartRef = useRef(null);
    const [metodosDePago, setMetodosDePago] = useState([]);
    const selectedMethod = 'Binance';
    const [games, setGames] = useState([]);
    const [totalGeneral, setTotalGeneral] = useState(0);
    const [descuentos, setDescuentos] = useState([]);
    const [totalDescuentos, setTotalDescuentos] = useState(0);
    const { token, isLoading, devuelveCart, deleteGame, actShopping, setActShopping } = useAuth();

    useEffect(() => {

        const metodos = async () => {
            const request = await devuelveMetodoDePago();
            setMetodosDePago(request);
        }
        metodos();

        devuelveGames();

    }, []);

    const devuelveGames = async () => {
        const request = await devuelveCart();

        let total = 0;
        let descuento = 0;

        request.map(game => {
            total += game.value.price;
            descuento += game.value.price * game.value.descuento / 100;
        });

        setTotalGeneral(total);
        setDescuentos(descuento);
        setTotalDescuentos(total - descuento);

        setGames(request);
    }

    const deletegames = async (id) => {
        await deleteGame(id);
        await devuelveGames();
    }

    useEffect(() => {

        if (actShopping) {
            devuelveGames();
            setActShopping(false);
        }

    }, [actShopping]);

    useEffect(() => {

        if (isOpenGames) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.body.style.overflow = 'auto';
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.body.style.overflow = 'auto';
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [isOpenGames]);

    const handleClickOutside = (event) => {

        if (cartRef.current && !cartRef.current.contains(event.target)) {
            setIsOpenGames(false);
        }
    };

    return (
        <div className='shopping__container'>
            <div className='shopping__detail'>
                <div onClick={() => setIsOpenGames(!isOpenGames)}>
                    <IconShopping />
                </div>
            </div>

            {isOpenGames && (
                <div className='shopping__cart'>
                    <div className='shopping__over' onClick={(e) => {
                        if (e.target.classList.contains('shopping__over')) {
                            setIsOpenGames(false);
                        }
                    }}>
                        <div className='shopping__list' ref={cartRef}>
                            <header className='shopping__list-header'>
                                <div className='shopping__list-header-text'>
                                    <span className='shopping__list-header-text-title'>Confirmar compra</span>
                                </div>
                                <div onClick={() => setIsOpenGames(false)}><span className='shopping__list-header-text-close'><IconClose /></span></div>
                            </header>

                            <div className='shopping__cart-totales'>

                                <div className='shopping__cart-totales-subtotal'>
                                    <h4 className='shopping__cart-totales-subtotal-title'><span >Subtotal:</span></h4>
                                    <span className='shopping__cart-totales-subtotal-price'>${totalGeneral}</span>
                                </div>

                                <div className='shopping__cart-totales-subtotal'>
                                    <h4 className='shopping__cart-totales-subtotal-title'><span >Descuento:</span></h4>
                                    <span className='shopping__cart-totales-subtotal-price'>${descuentos}</span>
                                </div>

                                <div className='shopping__cart-totales-subtotal'>
                                    <h4 className='shopping__cart-totales-subtotal-title'><span >Total a pagar:</span></h4>
                                    <span className='shopping__cart-totales-subtotal-price'>${totalDescuentos}</span>
                                </div>
                            </div>

                            <div className='shopping__cart-method-pay'>
                                <div className='shopping__cart-method-pay-title'>
                                    <span className='shopping__cart-method-pay-title'>Métodos de pago</span>
                                </div>

                                <div className='shopping__cart-method-pay-select'>
                                    <div class="radio-inputs">
                                        {metodosDePago && metodosDePago.map(metodo => {
                                            return (

                                                <label class="radio">
                                                    <input type="radio" name="radio" />
                                                    <span class="name">
                                                        <span class="pre-name"></span>
                                                        <span class="pos-name"></span>
                                                        <span>
                                                            <img className='shopping__cart-img'
                                                                src={'../../src/img/method-pay/' + metodo.image} alt="Metodo de pago" />
                                                        </span>
                                                    </span>
                                                    <div class="content">
                                                        <div>
                                                            <div class='shopping__cart-method-pay-selected-item'>
                                                                <span className='shopping__cart-method-pay-select-item-text-title'>{metodo.id}</span>
                                                                <span className='shopping__cart-method-pay-select-item-text-description'>{metodo.email}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </label>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>


                            <div className='shopping__cart-games'>
                                {games && games.map(game => {
                                    return (
                                        <div className='shopping__cart-games-item'>
                                            <div className='shopping__cart-games-item-img'>
                                                <img className='shopping__cart-games-img' src={Global.url + 'game/images/' + game.value.image} alt="Slider" />
                                            </div>
                                            <div className='shopping__cart-games-item-name'>
                                                <h4 className='shopping__cart-games-item-name-title'><span >{game.value.name}</span></h4>
                                                <div className='shopping__list-price'>
                                                    <span className='game__card-descuento'>{game.value.price} USD</span>
                                                    <span className=' game__card-price'>{game.value.price - (game.value.price * game.value.descuento / 100)} USD</span>
                                                </div>

                                                <section className='game__card-body-content'>

                                                    {game.value.plataforma && game.value.plataforma.map(plataform => {
                                                        return (
                                                            <span className='game__card-description-plataform' key={plataform}>{plataform}</span>
                                                        )
                                                    })

                                                    }

                                                </section>
                                            </div>
                                            <div className='shopping__cart-games-item-delete'>
                                                <span className='shopping__cart-games-item-delete-span' onClick={() => deletegames(game.value._id)}><Icondelete /></span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            {token ? (
                                <div className='shopping__cart-pay'>
                                    <div className='shopping__cart-pay-title'>
                                        <span className='shopping__cart-pay-span'>Confirmar compra</span>
                                    </div>
                                </div>
                            ) : (
                                <div className='shopping__cart-pay--auth'>
                                    <div className='shopping__cart-pay-title'>
                                        <GoogleAuth Message={'Inicia session para finalizar la compra'} authorize={isOpenGames} setAuthorize={isOpenGames} cargando={isLoading} setCargando={setIsOpenGames} />
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Shopping;