import React from 'react'
import { IconArrowRight,IconBubbles } from '../Utils/Icons';
import  Bubbles from '../../src/assets/circle.svg';
import { useNavigate } from 'react-router-dom';

const Admin = () => {

    const navigate = useNavigate();

    const goCategory = () => {
        navigate('/ultra-games/categorias');
    }

    return (
        <div className='div__container'>

            <div className='cards__admin'>

                <div className='card__admin' onClick={goCategory}>
                    <div className='card__admin-img'>
                        <div className='card__admin-grandient'>
                            <img src="https://wallup.net/wp-content/uploads/2019/10/254647-angels-devil-may-cry-vergil-dmc.jpg" alt="" 
                            className='card__admin-img-img'
                            />
                        </div>
                        <div className='card__admin-body card__body_1'>
                            <div className='card-img'>
                             
                            </div>
                        
                            <h4>Categorias</h4>
                            <div className='card-buble'>
                            <IconBubbles />
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className='card__admin'>
                    <div className='card__admin-img'>
                        <div className='card__admin-grandient'>
                            <img src="https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/grS2qwo9ibGvyJuXWEz67/c3e86cd45b1aab7e683e29ab1560f8b9/Assassin___s_Creed_Valhalla_____Ubisoft_Forward_Fan_Kit.jpg" alt="" 
                            className='card__admin-img-img'
                            />
                        </div>
                        <div className='card__admin-body card__body_2'>
                            <h4>Juegos</h4>
                            <div className='card-buble'>
                            <IconBubbles />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='card__admin'>
                    <div className='card__admin-img'>
                        <div className='card__admin-grandient'>
                            <img src="https://images.launchbox-app.com/491bb498-0caa-4af8-acbf-dd0bfbfd74c9.jpg" alt="" 
                            className='card__admin-img-img'
                            />
                        </div>
                        <div className='card__admin-body card__body_3'>
                            <h4>Slider</h4>
                            <div className='card-buble'>
                            <IconBubbles />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Admin