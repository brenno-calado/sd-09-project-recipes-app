import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import SearchBar from './SearchBar';
import ProfileImage from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

const exploreTitle = (pathName, title) => {
  let valueReturn;

  if (pathName[3] === 'ingredientes') {
    valueReturn = `${title} Ingredientes`;
  } else {
    switch (pathName[2]) {
    case 'bebidas':
      valueReturn = `${title} Bebidas`;
      break;
    default:
      if (pathName[3] === 'area') {
        valueReturn = `${title} Origem`;
      } else {
        valueReturn = `${title} Comidas`;
      }
    }
  }
  return valueReturn;
};

const Header = () => {
  const { displaySearchBar, statusSearchBar } = useContext(RecipesContext);
  const { status } = displaySearchBar;
  const pathName = useLocation().pathname.split('/');
  let headerTitle;
  const tempTitle = pathName[1].charAt(0).toUpperCase() + pathName[1].slice(1);
  let renderSearch = true;

  if (pathName[1] === 'explorar') {
    renderSearch = false;
    headerTitle = exploreTitle(pathName, tempTitle);
  } else {
    headerTitle = tempTitle;
  }

  if (pathName[3] === 'area') {
    renderSearch = true;
  }

  if (pathName[1] === 'perfil') {
    renderSearch = false;
  }

  if (pathName[1] === 'receitas-feitas') {
    renderSearch = false;
    headerTitle += 'Receitas Feitas';
  }
  if (pathName[1] === 'receitas-favoritas') {
    renderSearch = false;
    headerTitle += 'Receitas Favoritas';
  }
  return (
    <header>
      <div>
        <Link to="/perfil">
          <img
            src={ ProfileImage }
            alt="profileIcon"
            data-testid="profile-top-btn"
          />
        </Link>
      </div>
      <h1
        data-testid="page-title"
      >
        { headerTitle }
      </h1>
      { renderSearch && (
        <div>
          <img
            src={ SearchIcon }
            alt="profileIcon"
            data-testid="search-top-btn"
            onClick={ statusSearchBar }
          />
        </div>
      )}
      { status && (<SearchBar />)}
    </header>
  );
};

export default Header;
