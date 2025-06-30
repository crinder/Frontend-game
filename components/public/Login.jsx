import { React, useState, useRef, useEffect } from 'react';
import { useAuth } from '../Context/authContext';
import GoogleAuth from '../Utils/googleAuth';
import { IconUser } from '../Utils/Icons';

const Login = () => {

    const [isOpen, setIsOpen] = useState(false);
    const loginRef = useRef(null);
    const { token, isLoading, logout, imgUser } = useAuth();

    console.log(imgUser);

    
    const handleClickOutside = (event) => {
        if (loginRef.current && !loginRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
    
            if (isOpen) {
                document.addEventListener('mousedown', handleClickOutside);
            } else {
                document.removeEventListener('mousedown', handleClickOutside);
            }
    
            return () => {
                document.body.style.overflow = 'auto';
                document.removeEventListener('mousedown', handleClickOutside);
            };
    
        }, [isOpen]);

    const logoutUser = async () => {
        await logout();
        setIsOpen(false);
    }


    return (
        <div>
            <div className='div__login'>
                <div className='login__container' ref={loginRef}>
                    <div className='login__header'>
                        <span className={!token ? 'title__color' : 'title__color--title login__img'} onClick={() => setIsOpen(!isOpen)}>
                            {token && imgUser ? <img src={imgUser} alt="User" className='header__img login__img-img' /> : <IconUser />}
                            </span>
                    </div>
                    {!token && isOpen &&
                        <div className='login__login'>
                            <GoogleAuth Message='Inicia sesión para poder acceder a la aplicación' authorize={setIsOpen} setAuthorize={setIsOpen} cargando={isLoading} setCargando={setIsOpen} />
                        </div>
                    }

                    {token && isOpen && 
                        <div className='login__logout'>
                            <span onClick={() => logoutUser()}>Salir</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Login