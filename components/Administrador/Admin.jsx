import React from 'react'
import { IconArrowRight, IconBubbles } from '../Utils/Icons';
import Bubbles from '../../src/assets/circle.svg';
import { useNavigate } from 'react-router-dom';

const Admin = () => {

    /*https://wallup.net/wp-content/uploads/2019/10/254647-angels-devil-may-cry-vergil-dmc.jpg
    https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/grS2qwo9ibGvyJuXWEz67/c3e86cd45b1aab7e683e29ab1560f8b9/Assassin___s_Creed_Valhalla_____Ubisoft_Forward_Fan_Kit.jpg
    https://images.launchbox-app.com/491bb498-0caa-4af8-acbf-dd0bfbfd74c9.jpg*/

    const navigate = useNavigate();

    const goComponent = (id) => {
        navigate('/ultra-games/'+id);
    }

    return (
        <div className='div__container'>

            <div className='cards__admins'>

                <div class="card" onClick={() => goComponent('admin-editar-slider')}>
                    <div class="card__admin-header">
                        <img src="https://wallup.net/wp-content/uploads/2019/10/254647-angels-devil-may-cry-vergil-dmc.jpg" alt="" 
                        className='card__admin-header-img'/>
                        <div class="card__admin-header-descrip">
                            <div class="card__admin-header-descrip-title">
                                <p class="card__admin-header-title">Administrar slider</p>
                            </div>
                        </div>
                    </div>

                    <div class="card__content">
                        <p class="card__title"></p>
                        <p class="card__description">Puedes crear, editar y eliminar sliders y darle el orden que desees solo arrastra y suelta.</p>
                    </div>
                </div>

                <div class="card" onClick={() => goComponent('crear-games')}>
                    <div class="card__admin-header">
                        <img src="https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/grS2qwo9ibGvyJuXWEz67/c3e86cd45b1aab7e683e29ab1560f8b9/Assassin___s_Creed_Valhalla_____Ubisoft_Forward_Fan_Kit.jpg" alt="" 
                        className='card__admin-header-img'/>
                        <div class="card__admin-header-descrip">
                            <div class="card__admin-header-descrip-title">
                                <p class="card__admin-header-title">Crear juegos</p>
                            </div>
                        </div>
                    </div>

                    <div class="card__content">
                        <p class="card__title"></p>
                        <p class="card__description">Puedes crear juegos para PS4, PS5 .</p>
                    </div>
                </div>

                <div class="card" onClick={() => goComponent('list-games')}>
                    <div class="card__admin-header" >
                        <img src="https://images.launchbox-app.com/491bb498-0caa-4af8-acbf-dd0bfbfd74c9.jpg" alt="" className='card__admin-header-img'/>
                        <div class="card__admin-header-descrip">
                            <div class="card__admin-header-descrip-title">
                                <p class="card__admin-header-title">Editar juegos</p>
                            </div>
                        </div>
                    </div>

                    <div class="card__content">
                        <p class="card__title"></p>
                        <p class="card__description">No te gusto como quedo el juego? Puedes editar los detalles del juego.</p>
                    </div>
                </div>

                <div class="card" onClick={() => goComponent('categorias')}>
                    <div class="card__admin-header" >
                        <img src="https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/grS2qwo9ibGvyJuXWEz67/c3e86cd45b1aab7e683e29ab1560f8b9/Assassin___s_Creed_Valhalla_____Ubisoft_Forward_Fan_Kit.jpg" alt="" 
                        className='card__admin-header-img'/>
                        <div class="card__admin-header-descrip">
                            <div class="card__admin-header-descrip-title">
                                <p class="card__admin-header-title">Categorias</p>
                            </div>
                        </div>
                    </div>

                    <div class="card__content">
                        <p class="card__title"></p>
                        <p class="card__description">Puedes crear categorias para tus juegos.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin