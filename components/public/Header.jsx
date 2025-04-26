import React from 'react'
import Nav from './Nav'
import { IconSearch, IconUser, IconShopping, IconAdmin } from '../Utils/Icons'
import Search from './Search'
import logo6 from '../../src/img/logo_space6.png';
import logo7 from '../../src/img/logo_space7.png';


const Header = () => {
  return (
    <header className='div__header'>
      <div className='header__container'>
        <div className='header__left'>
          <div className='header__burguer'>
            <Nav />
          </div>

          <div className='header__logo'>
            <div className='header__logo-img'>
              <img src={logo6} alt="Logo" className='header__logo-img-img' />
              <img src={logo7} alt="Logo" className='header__logo-img-img' />
            </div>
          </div>

        </div>
        <div className='header__right'>
          <ul className='header__menu'>
            <li className='hearder__menu-list'><IconAdmin/></li>
            <li className='hearder__menu-list'><Search/></li>
            <li className='hearder__menu-list'><IconUser/></li>
            <li className='hearder__menu-list'><IconShopping/></li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header