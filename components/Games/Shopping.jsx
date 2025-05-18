import { React, useState, useEffect, useRef } from 'react';
import { IconClose, IconShopping, Icondelete } from '../Utils/Icons';
import { devuelveMetodoDePago} from '../Utils/Indexed';
import { useAuth } from '../Context/authContext'
import Global from '../Utils/Global';

const Shopping = () => {

    const [isOpenGames, setIsOpenGames] = useState(false);
    const cartRef = useRef(null);
    const [metodosDePago, setMetodosDePago] = useState([]);
    const selectedMethod = 'Binance';
    const [games, setGames] = useState([]);
    const {devuelveCart,deleteGame} = useAuth();

    useEffect(() => {
        const metodos = async () => {
            const request = await devuelveMetodoDePago();
            console.log('metodos...', request);
            setMetodosDePago(request);
        }
        metodos();

        devuelveGames();

    }, []);

    const devuelveGames = async () => {
        const request = await devuelveCart();
        setGames(request);
    }

    const deletegames = async (id) => {
        await deleteGame(id);
        await devuelveGames();
    }

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

        console.log(cartRef.current.contains(event.target));

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
                                    <span className='shopping__cart-totales-subtotal-title'>Subtotal</span>
                                    <span className='shopping__cart-totales-subtotal-price'>$0</span>
                                </div>

                                <div className='shopping__cart-totales-subtotal'>
                                    <span className='shopping__cart-totales-subtotal-title'>Descuento</span>
                                    <span className='shopping__cart-totales-subtotal-price'>$0</span>
                                </div>

                                <div className='shopping__cart-totales-subtotal'>
                                    <span className='shopping__cart-totales-subtotal-title'>Total a pagar</span>
                                    <span className='shopping__cart-totales-subtotal-price'>$0</span>
                                </div>
                            </div>

                            <div className='shopping__cart-method-pay'>
                                <div className='shopping__cart-method-pay-title'>
                                    <span className='shopping__cart-method-pay-title'>Método de pago</span>
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
                                                <span className='shopping__cart-games-item-name-title'>{game.value.name}</span>
                                                <span className='shopping__cart-games-item-name-price'>${game.value.price}.00  USD</span>
                                                <div className='game__view-category-container shopping__cart-plataform'>
                                                    <span className='game__view-category shopping__cart-plataform-p'>{game.value.plataforma}</span>
                                                </div>
                                            </div>
                                            <div className='shopping__cart-games-item-delete'>
                                                <span className='shopping__cart-games-item-delete-span' onClick={() => deletegames(game.value._id)}><Icondelete /></span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className='shopping__cart-pay'>
                                <div className='shopping__cart-pay-title'>
                                    <span className='shopping__cart-pay-span'>Confirmar compra</span>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Shopping;