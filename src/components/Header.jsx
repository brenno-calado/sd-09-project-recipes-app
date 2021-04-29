import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BarraDeBusca from './BarraDeBusca';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';


function Header() {
  const [toggleSearch, setToogleSearch] = useState(false);
  const {pathname} = useLocation();
  const pagesWithSearchButton = [
    '/comidas',
    '/bebidas',
    '/explorar/comidas/area',
    '/explorar/bebidas/area',
  ];

  const renderSearchButton = () => (
    <button type="button" onClick={ handleClick }>
      <img data-testid="search-top-btn" src={ SearchIcon } alt="search-icon" />
    </button>
  )

  const getPageTitle = () => {
    switch (pathname) {
      case '/comidas':
        return 'Comidas';
      case '/bebidas':
        return 'Bebidas';
      case '/explorar':
        return 'Explorar';
      case '/explorar/comidas':
        return 'Explorar Comidas';
      case '/explorar/bebidas':
        return 'Explorar Bebidas';
      case '/perfil':
        return 'Perfil';
      case '/receitas-feitas':
        return 'Receitas Feitas';
      case '/receitas-favoritas':
        return 'Receitas Favoritas';
      case '/explorar/comidas/ingredientes':
      case '/explorar/bebidas/ingredientes':
        return 'Explorar Ingredientes';
      case '/explorar/comidas/area':
      case '/explorar/bebidas/area':
        return 'Explorar Origem';
      default:
        return 'Não encontrado';
    }
  }

  const handleClick = () => {
    setToogleSearch(!toggleSearch);
  };

  return (
    <div>
      <div className="header-content">
        <Link to="/perfil">
          <button type="button">
            <img data-testid="profile-top-btn" src={ ProfileIcon } alt="profile-icon" />
          </button>
        </Link>
        <h1 data-testid="page-title">
          { getPageTitle() }
        </h1>
        { pagesWithSearchButton.includes(pathname) && renderSearchButton()}
      </div>
      <div>
        { toggleSearch && <BarraDeBusca /> }
      </div>
    </div>
  );
}

export default Header;
