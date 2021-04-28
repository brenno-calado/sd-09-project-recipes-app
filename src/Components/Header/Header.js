import { string } from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipeContext } from '../../Context';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import './Header.css';

function Header({ title = '' }) {
  const { displaySearchBar, setDisplaySearchBar } = useContext(RecipeContext);
  let displaySearchIcon = false;
  if (title === 'Comidas' || title === 'Bebidas' || title === 'Explorar Origem') {
    displaySearchIcon = true;
  }
  return (
    <header className="main-header-container">
      <Link to="/perfil">
        <button
          type="button"
        >
          <img src={ profileIcon } alt="icone de perfil" data-testid="profile-top-btn" />
        </button>
      </Link>
      <h2 data-testid="page-title">{ title }</h2>
      {(displaySearchIcon) && (
        <button
          type="button"
          onClick={ () => setDisplaySearchBar(!displaySearchBar) }
        >
          <img src={ searchIcon } alt="icone de pesquisa" data-testid="search-top-btn" />
        </button>
      )}
    </header>
  );
}

Header.propTypes = {
  title: string.isRequired,
};

export default Header;
