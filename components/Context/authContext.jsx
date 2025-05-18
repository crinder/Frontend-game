import React, { createContext, useContext, useEffect, useState } from 'react'
import Global from '../Utils/Global';
import {  getToken, saveToken, countGames, getAllGames, deleteItem } from '../Utils/Indexed';


const Context = createContext();

export const AuthContext = ({children}) => {


    const [token, setToken] = useState(false);
    const [loading, setLoading] = useState(true);
    const [cargando, setCargando] = useState(true);
    const [existe, setExiste] = useState(true);
    const [count, setCount] = useState(0);
    const [cart, setCart] = useState([]);
    let headers;

    const checkAuth = async () =>{

            if(!token){
                headers = {
                    "Content-type": 'application/json'
                }
            }
    
            const request = await fetch(Global.url+'temp/token',{
                method: 'GET',
                headers
            });
    
            const data = await request.json();
    
            if(data.status == 'success'){
    
                setToken(data.token);
                setCargando(false);
                setExiste(true);
                setLoading(false);
                saveToken(data.token);
            }else{
                setCargando(false);
                setExiste(false);
                setLoading(false);
            }
    }

    useEffect(() =>{
        
        devuelveToken();
        devuelveCount();

    },[]);

    const devuelveToken = async () => {
        
        const token = await getToken();

        console.log('token...',token);

        if(token){
            setToken(token);
            setCargando(false);
            setExiste(true);
            setLoading(false);      
        }else{
            setCargando(false);
            setExiste(false);
            setLoading(false);          
            checkAuth();
        }        
    }

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
    
    /*console.log(token);
    console.log(loading);
    console.log(existe);*/

  return (
    <Context.Provider value={{token,loading,cargando,existe,count,setCount,deleteGame,devuelveCart,cart}}>
        {children}
    </Context.Provider>
  )
}

export const useAuth = () => useContext(Context);