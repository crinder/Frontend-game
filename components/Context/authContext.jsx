import React, { createContext, useContext, useEffect, useState } from 'react'
import Global from '../Utils/Global';
import { getToken, saveToken, countGames, getAllGames, deleteItem, addItem, deleteAll } from '../Utils/Indexed';


const Context = createContext();

export const AuthContext = ({ children }) => {


    const [token, setToken] = useState(false);
    const [loading, setLoading] = useState(true);
    const [cargando, setCargando] = useState(true);
    const [existe, setExiste] = useState(true);
    const [count, setCount] = useState(0);
    const [cart, setCart] = useState([]);
    const [actShopping, setActShopping] = useState(false);
    const [id_usuario, setId_usuario] = useState(null);
    const [userOff, setUserOff] = useState(false);
    const [imgUser, setImgUser] = useState(null);   

    let headers;

    const checkAuth = async () => {

        if (!token) {
            headers = {
                "Content-type": 'application/json'
            }
        } else {
            headers = {
                "Content-type": 'application/json',
                'authorization': token
            }
        }

        const request = await fetch(Global.url + 'user/refresh', {
            method: 'GET',
            headers,
            credentials: 'include'
        });

        const data = await request.json();

        if (data.status == 'success') {

            setToken(data.token);
            setCargando(false);
            setExiste(true);
            setLoading(false);
            setId_usuario(data.id_user);
            setImgUser(data.image);
            
        } else {
            setCargando(false);
            setExiste(false);
            setLoading(false);
            setId_usuario(false);
            setToken(false);
            setImgUser(null);
        }
    }

    useEffect(() => {
        devuelveCount();
    }, []);

    const devuelveCount = async () => {

        const request = await countGames();
        setCount(request);

    }

    const deleteGame = async (id) => {
        await deleteItem(id);
        await devuelveCount();
    }

    const devuelveCart = async () => {
        const request = await getAllGames();
        return request;
    }

    const addGame = async (game) => {
        await addItem(game);
        await devuelveCount();
        setActShopping(true);
    }

    useEffect(() => {
        if (!token && !userOff) {
            checkAuth();
        }
    }, [token]);

    useEffect(() => {
        setTimeout(() => {
            checkAuth();
        }, 10 * 60 * 100);
    }, []);

    const authLogin = async (auth) => {
       
        if(auth){
            checkAuth();
        }
    }

    const logout = async () => { 

        const request = await fetch(Global.url + 'user/logout', {
            method: 'GET',
            headers: {
                "Content-type": 'application/json'
            },
            credentials: 'include'
        });
        
        const data = await request.json();
        
        if(data.status == 'success'){
            setToken(false);
            setId_usuario(false);
            setExiste(false);
            setLoading(false);
            setUserOff(true);

            window.google.accounts.id.renderButton(
                document.getElementById("google-sign-in-button"),
                { theme: "outline", size: "large", type: "standard", text: "signin_with", shape: "pill" }
            );
        }
        
    }

    const deleteAllGames = async () => {
        await deleteAll();
        await devuelveCount();
    }
    

    /*console.log(token);
    console.log(loading);
    console.log(existe);*/

    return (
        <Context.Provider value={{
            token, loading, cargando, existe, count, setCount, deleteGame, devuelveCart, cart,
            addGame, actShopping, setActShopping, id_usuario, authLogin,logout,deleteAllGames,
            imgUser
        }}>
            {children}
        </Context.Provider>
    )
}

export const useAuth = () => useContext(Context);