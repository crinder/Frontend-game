import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import ListaGames from '../Games/ListaGames';
import Section from '../public/Section'
import Principal from '../public/Principal';
import Admin from '../Administrador/Admin';
import Categorias from '../Categorias/Category';
import Crear from '../Categorias/Crear';
import Editar from '../Categorias/Editar';
import CrearGame from '../Games/Crear';
import EditarGame from '../Games/Editar';
import ListGames from '../Games/ListGames';
import View from '../Games/View';
import Slider from '../Administrador/Slider';
import EditarSlider from '../Administrador/EditarSlider';
import PreviewSlider from '../Administrador/PreviewSlider';
import Shopping from '../Games/Shopping';
import ListDescuento from '../Games/ListDescuento';

const Routing = () => {

    const location = useLocation();

    return (
        <Routes location={location}>
            <Route path='/ultra-games/*' element={<Principal />}>
                <Route path='home' element={<Section />} />
                <Route path='lista-games' element={<ListaGames />} />
                <Route path='admin-games' element={<Admin />} />
                <Route path='categorias' element={<Categorias />} />
                <Route path='crear-categorias' element={<Crear />} />
                <Route path='editar-categorias' element={<Editar />} />
                <Route path='crear-games' element={<CrearGame />} />
                <Route path='editar-games' element={<EditarGame />} />
                <Route path='list-games' element={<ListGames />} />
                <Route path='detalle-game' element={<View />} />
                <Route path='admin-slider-destacados' element={<Slider />} />
                <Route path='admin-editar-slider' element={<EditarSlider />} />
                <Route path='preview-slider' element={<PreviewSlider />} />
                <Route path='shopping-cart' element={<Shopping />} />
                <Route path='list-descuento' element={<ListDescuento />} />
            </Route>
        </Routes>
    )
}

export default Routing