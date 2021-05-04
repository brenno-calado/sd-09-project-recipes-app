import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import { MyContext } from '../MyContext';

function Header() {
  const { showBar, clickShowBar, setShowBar } = useContext(MyContext);
  const { pathname } = useLocation();

  let title = '';
  switch (pathname) {
  case '/comidas':
    title = 'Comidas';
    break;
  case '/bebidas':
    title = 'Bebidas';
    break;
  case '/perfil':
    setShowBar(false);
    title = 'Perfil';
    break;
  case '/explorar':
    setShowBar(false);
    title = 'Explorar';
    break;
  case '/explorarbebidas':
    setShowBar(false);
    title = 'Explorar Bebidas';
    break;
  case '/explorarcomidas':
    setShowBar(false);
    title = 'Explorar Comidas';
    break;
  default:
    break;
  }

  return (
    <div className="container">
      <div className="d-flex">
        <Link to="/perfil">
          <img src={ profileIcon } alt="iconePerfil" data-testid="profile-top-btn" />
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        {pathname === '/comidas' || pathname === '/bebidas' ? (
          <button
            type="button"
            onClick={ clickShowBar }
          >
            <img src={ searchIcon } alt="iconeBusca" data-testid="search-top-btn" />
          </button>) : null}
      </div>
      {showBar ? <SearchBar /> : null}
    </div>
  );
}

export default Header;
