import {React, useEffect, useState} from 'react'
import { IconMenu, IconClose } from '../Utils/Icons'

const Nav = () => {

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);


  return (
    <div className='header__menu'>
      <div className='menu__container'>

        <div {...(isOpen ? { className: 'menu__icon menu__icon--open' } : { className: 'menu__icon menu__icon--close' })} onClick={() => setIsOpen(!isOpen)}>
          {
            isOpen ? <IconClose /> : < IconMenu/>
          }
        </div>
      </div>

      <div {...(isOpen ? { className: 'menu__options menu__options--open' } : { className: 'menu__options menu__options--close' })}>

        <ul className='menu__list'>
          <li className='menu__option'><span className='menu__link'>Juegos para PS4</span></li>
          <li className='menu__option'><span className='menu__link'>Juegos para PS5</span></li>
          <li className='menu__option'><span className='menu__link'>Juegos para PC</span></li>
          <li className='menu__option'><span className='menu__link'>Juegos para Xbox</span></li>
          <li className='menu__option'><span className='menu__link'>Contacto</span></li>
        </ul>
      </div>

    </div>
  )
}

export default Nav