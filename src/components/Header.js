import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import { MyContext } from '../MyContext';

function Header() {
  const { showBar, clickShowBar } = useContext(MyContext);
  const { pathname } = useLocation();
  // const title = pathname.slice(1);
  let title = '';
  switch (pathname) {
  case '/comidas':
    title = 'Comidas';
    break;
  case '/bebidas':
    title = 'Bebidas';
    break;
  case '/perfil':
    title = 'Perfil';
    break;
  default:
    break;
  }

  return (
    <div className="container">
      <div className="d-flex">
        <Link to="/perfil">
          <img src={ profileIcon } alt="iconePerfil" />
        </Link>
        <h1>{title}</h1>
        <button
          type="button"
          onClick={ clickShowBar }
        >
          <img src={ searchIcon } alt="iconeBusca" />
        </button>
      </div>
      {showBar ? <SearchBar /> : null}
    </div>
  );
}

export default Header;
