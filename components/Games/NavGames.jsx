import React, { use, useEffect, useState, useRef } from 'react'

const NavGames = ({ categories, categorieSelected, setCategorieSelected, desde, setDesde, hasta, setHasta, descuentoEspecial, setDescuentoEspecial }) => {

    const [isOpenCategoria, setIsOpenCategoria] = useState(false);
    const [isOpenDescuentos, setIsOpenDescuentos] = useState(false);
    const [isOpenPrecio, setIsOpenPrecio] = useState(false);
    

    const toggleCategoria = () => {
        setIsOpenCategoria(!isOpenCategoria);
    };

    const toggleDescuentos = () => {
        setIsOpenDescuentos(!isOpenDescuentos);
    };

    const togglePrecio = () => {
        setIsOpenPrecio(!isOpenPrecio);
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setCategorieSelected(categorieSelected.includes(value) ? categorieSelected.filter(item => item !== value) : 
                                [...categorieSelected, value]);
        
    }

    const handleChangeDescuento = (event) => {
        const { value } = event.target;
        setDescuentoEspecial(value);
    }

    const handleChangeDesde = (event) => {
        const { value } = event.target;
        setDesde(value);
    }

    const handleChangeHasta = (event) => {
        const { value } = event.target;
        setHasta(value);
    }

    return (
        <div className='nav__filter'>
            <span className='nav__filter-text'>Filtrar por: </span>
            <div className='nav__filter-list'>
                <div className='nav__filter-item'>
                    <div className='nav__filter-item-text' onClick={toggleCategoria}>
                        Categoria
                        <span className={`arrow ${isOpenCategoria ? 'up' : 'down'}`}></span>
                    </div>
                    {isOpenCategoria && (
                        <nav className='nav__filter-item-nav'>
                            <ul className='nav__filter-item-list'>
                                {categories.map(category => (
                                    <li className='nav__filter-item-opc-item' key={category._id}>
                                        <div className='nav__filter-item-opc-item-container'>
                                            <input type="checkbox" name="categoria" id={category._id} value={category._id} onChange={e => handleChange(e)} />
                                            <label htmlFor={category._id} className='nav__filter-label'>{category.name}</label>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}
                </div>

                <div className='nav__filter-item'>
                    <div className='nav__filter-item-text' onClick={toggleDescuentos}>
                        Descuentos
                        <span className={`arrow ${isOpenDescuentos ? 'up' : 'down'}`}></span>
                    </div>
                    {isOpenDescuentos && (
                        <nav className='nav__filter-item-nav'>
                            <ul className='nav__filter-item-list'>
                                <li className='nav__filter-item-opc-item nav__filter-item-opc-item-descuentos'>
                                    <div className='nav__filter-item-opc-item-container'>
                                        <input type="checkbox" name="descuentos" id="descuentos" onChange={e => handleChangeDescuento(e)} />
                                    </div>
                                    <div className='nav__filter-item-opc-item-container'>
                                        <label htmlFor="descuentos" className='nav__filter-label nav__filter-descuento'>Ahorra hasta 10%</label>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    )}
                </div>

                <div className='nav__filter-item'>
                    <div className='nav__filter-item-text' onClick={togglePrecio}>
                        Precio
                        <span className={`arrow ${isOpenPrecio ? 'up' : 'down'}`}></span>
                    </div>
                    {isOpenPrecio && (
                        <nav className='nav__filter-item-nav'>
                            <ul className='nav__filter-item-list nav__filter-item-list-precio'>
                                <li className='nav__filter-item-opc-item'>
                                    <div className='nav__filter-item-opc-item-container'>
                                        <input type="text" name="precio_desde" id="precio_desde" placeholder='Desde' className='input-has-icon' 
                                        defaultValue={desde}
                                        onChange={e => handleChangeDesde(e)}
                                        />
                                    </div>
                                </li>
                                <li className='nav__filter-item-opc-item'>
                                    <div className='nav__filter-item-opc-item-container'>
                                        <input type="text" name="precio_hasta" id="precio_hasta" placeholder='Hasta' className='input-has-icon' 
                                        defaultValue={hasta}
                                        onChange={e => handleChangeHasta(e)}
                                        />
                                    </div>
                                </li>
                            </ul>
                        </nav>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NavGames