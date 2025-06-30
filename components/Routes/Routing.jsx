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
import History from '../Games/History';
import Scroll from '../Utils/Scroll';
import AnimatedPage from '../Utils/Animated';
import { AnimatePresence } from 'framer-motion';

const Routing = () => {

    const location = useLocation();

    return (
        <>
            <Scroll />
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname} >
                    <Route path='/ultra-games/*' element={<Principal />}>
                        <Route path="home" element={<AnimatedPage><Section /></AnimatedPage>} />
                        <Route path="lista-games" element={<AnimatedPage><ListaGames /></AnimatedPage>} />
                        <Route path="admin-games" element={<AnimatedPage><Admin /></AnimatedPage>} />
                        <Route path="categorias" element={<AnimatedPage><Categorias /></AnimatedPage>} />
                        <Route path="crear-categorias" element={<AnimatedPage><Crear /></AnimatedPage>} />
                        <Route path="editar-categorias" element={<AnimatedPage><Editar /></AnimatedPage>} />
                        <Route path="crear-games" element={<AnimatedPage><CrearGame /></AnimatedPage>} />
                        <Route path="editar-games" element={<AnimatedPage><EditarGame /></AnimatedPage>} />
                        <Route path="list-games" element={<AnimatedPage><ListGames /></AnimatedPage>} />
                        <Route path="detalle-game" element={<AnimatedPage><View /></AnimatedPage>} />
                        <Route path="admin-slider-destacados" element={<AnimatedPage><Slider /></AnimatedPage>} />
                        <Route path="admin-editar-slider" element={<AnimatedPage><EditarSlider /></AnimatedPage>} />
                        <Route path="preview-slider" element={<AnimatedPage><PreviewSlider /></AnimatedPage>} />
                        <Route path="shopping-cart" element={<AnimatedPage><Shopping /></AnimatedPage>} />
                        <Route path="list-descuento" element={<AnimatedPage><ListDescuento /></AnimatedPage>} />
                        <Route path="history" element={<AnimatedPage><History /></AnimatedPage>} />

                    </Route>
                </Routes>
            </AnimatePresence>
        </>
    )
}

export default Routing