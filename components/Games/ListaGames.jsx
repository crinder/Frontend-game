import React, { use, useState } from 'react'

const ListDescuento = () => {

  const images = [
    'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2020/06/horizon-forbidden-west-dive-1964777.jpeg?tf=3840x',
    'https://images.ctfassets.net/wn7ipiv9ue5v/2o2zzN8bdBFi6BwGFJR1lK/fab7d2a0fa20e7a8ec13c6400bd21422/N25-BASE-STANDARD_EDITION_ANNOUNCE-NA-STATIC-ESRB-AGN-1920x1080.jpg',
    'https://media.vandal.net/i/1280x720/27407/god-of-war-201842202610_1.jpg',
    'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2020/06/horizon-forbidden-west-dive-1964777.jpeg?tf=3840x',
    'https://images.ctfassets.net/wn7ipiv9ue5v/2o2zzN8bdBFi6BwGFJR1lK/fab7d2a0fa20e7a8ec13c6400bd21422/N25-BASE-STANDARD_EDITION_ANNOUNCE-NA-STATIC-ESRB-AGN-1920x1080.jpg',
    'https://media.vandal.net/i/1280x720/27407/god-of-war-201842202610_1.jpg'
  ];

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

  return (
    <div className='div__container'>

      <div className='div__title'>
        <span className='div__title-text'>Listado de descuentos</span>
      </div>

      <div className='games__container'>
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
                    <li className='nav__filter-item-opc-item'>
                      <div className='nav__filter-item-opc-item-container'>
                        <input type="checkbox" name="categoria" id="categoria" />
                        <label htmlFor="categoria" className='nav__filter-label'>Estrategia</label>
                      </div>
                    </li>
                    <li className='nav__filter-item-opc-item'>
                      <div className='nav__filter-item-opc-item-container'>
                        <input type="checkbox" name="categoria" id="categoria" />
                        <label htmlFor="categoria" className='nav__filter-label'>Aventura</label>
                      </div>
                    </li>
                    <li className='nav__filter-item-opc-item'>
                      <div className='nav__filter-item-opc-item-container'>
                        <input type="checkbox" name="categoria" id="categoria" />
                        <label htmlFor="categoria" className='nav__filter-label'>RPG</label>
                      </div>
                    </li>
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
                    <li className='nav__filter-item-opc-item'>
                      <div className='nav__filter-item-opc-item-container'>
                        <input type="checkbox" name="descuentos" id="descuentos" />
                        <label htmlFor="descuentos" className='nav__filter-label'>Menos 10%</label>                  </div>
                    </li>
                    <li className='nav__filter-item-opc-item'>
                      <div className='nav__filter-item-opc-item-container'>
                        <input type="checkbox" name="descuentos" id="descuentos" />
                        <label htmlFor="descuentos" className='nav__filter-label'>Menos 15%</label>
                      </div>
                    </li>
                    <li className='nav__filter-item-opc-item'>
                      <div className='nav__filter-item-opc-item-container'>
                        <input type="checkbox" name="descuentos" id="descuentos" />
                        <label htmlFor="descuentos" className='nav__filter-label'>Menos 20%</label>
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
                  <ul className='nav__filter-item-list'>
                    <li className='nav__filter-item-opc-item'>
                      <div className='nav__filter-item-opc-item-container'>
                        <input type="checkbox" name="precio" id="precio" />
                        <label htmlFor="precio" className='nav__filter-label'>Menos 10$</label>
                      </div>
                    </li>
                    <li className='nav__filter-item-opc-item'>
                      <div className='nav__filter-item-opc-item-container'>
                        <input type="checkbox" name="precio" id="precio" />
                        <label htmlFor="precio" className='nav__filter-label'>Menos 15$</label>
                      </div>
                    </li>
                    <li className='nav__filter-item-opc-item'>
                      <div className='nav__filter-item-opc-item-container'>
                        <input type="checkbox" name="precio" id="precio" />
                        <label htmlFor="precio" className='nav__filter-label'>Menos 20$</label>
                      </div>
                    </li>
                  </ul>
                </nav>
              )}
            </div>
          </div>
        </div>

        <div className='list__list'>
          {images.map(image => {
            return (
              <div className='div__img-list'>
                <img src={image} alt='Slider' className='games__item-img' />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ListDescuento