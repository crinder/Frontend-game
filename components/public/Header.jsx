import React from 'react'
import Nav from './Nav'
import { IconUser, IconAdmin } from '../Utils/Icons'
import Search from './Search'
import logo6 from '../../src/img/logo_space6.png';
import logo7 from '../../src/img/logo_space7.png';
import CountGames from '../Utils/CountGames';
import Shopping from '../Games/Shopping';
import { useNavigate } from 'react-router-dom';
import Login from './Login';


const Header = () => {
  const navigate = useNavigate();

  return (
    <header className='div__header'>
      <div className='header__container'>
        <div className='header__left'>
          <div className='header__burguer'>
            <Nav />
          </div>

          <div className='header__logo' onClick={() => navigate('/ultra-games/home')}>
            <div className='header__logo-img'>
              <img src={logo6} alt="Logo" className='header__logo-img-img' />
            </div>
            <div className='header__logo-img header__logo-img--2'>
              <img src={logo7} alt="Logo" className='header__logo-img-img' />
            </div>
          </div>

        </div>
        <nav className='header__right'>
          <ul className='header__menu'>
            <li className='hearder__menu-list'><Search /></li>
            <li className='hearder__menu-list'><Login /></li>
            <li className='hearder__menu-list' onClick={() => navigate('/ultra-games/admin-games')}><IconAdmin /></li>
            <li className='hearder__menu-list '><Shopping /><CountGames /></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header