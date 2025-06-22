import React, { createContext, use, useContext, useEffect, useState } from 'react'
import Global from '../Utils/Global';
import { getToken, saveToken, countGames, getAllGames, deleteItem, addItem } from '../Utils/Indexed';


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
        } else {
            setCargando(false);
            setExiste(false);
            setLoading(false);
            setId_usuario(false);
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
        if (!token) {
            checkAuth();
        }
    }, [token]);

    useEffect(() => {
        setTimeout(() => {
            checkAuth();
        }, 10 * 60 * 100);
    }, []);

    /*console.log(token);
    console.log(loading);
    console.log(existe);*/

    return (
        <Context.Provider value={{
            token, loading, cargando, existe, count, setCount, deleteGame, devuelveCart, cart,
            addGame, actShopping, setActShopping,id_usuario
        }}>
            {children}
        </Context.Provider>
    )
}

export const useAuth = () => useContext(Context);