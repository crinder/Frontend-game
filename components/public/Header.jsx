import React from 'react'
import Nav from './Nav'
import { IconSearch, IconUser, IconShopping } from '../Utils/Icons'
import Search from './Search'

const Header = () => {
  return (
    <header className='div__header'>
      <div className='header__container'>
        <div className='header__left'>
          <div className='header__burguer'>
            <Nav />
          </div>
          <div className='header__logo'>
            <span>Logo</span>
          </div>

        </div>
        <div className='header__right'>
          <ul className='header__menu'>
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