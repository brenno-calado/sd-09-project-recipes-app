import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TiArrowBack } from 'react-icons/ti';
import SearchBar from './SearchBar';
import ShowArea from './ShowArea';
import '../Styles/Header.css';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ name }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const location = useLocation().pathname;
  const regex = /\d/g;
  const result = regex.test(location);

  function renderSearchBar() {
    const teste = document.querySelector('.app');
    const teste2 = document.querySelector('.gridForSearchBar');
    const teste3 = document.querySelector('.headerContainer');
    const teste4 = document.querySelector('.extendedHeaderContainer');
    if (showSearchBar) {
      teste2.className = 'app';
      teste4.className = 'headerContainer';
      setShowSearchBar(false);
    } else {
      teste.className = 'gridForSearchBar';
      teste3.className = 'extendedHeaderContainer';
      setShowSearchBar(true);
    }
  }

  return (
    <div className="headerContainer">
      { !result && (
        <header className="headerBar">
          <Link to="/perfil">
            <img
              src={ profileIcon }
              alt="Profile Icon Access"
              data-testid="profile-top-btn"
            />
          </Link>
          <span
            className="headerName"
            data-testid="page-title"
          >
            {name}
          </span>
          { name.includes('Explorar') || name.includes('Receitas')
            ? ''
            : (
              <button
                className="searchBtn"
                src={ searchIcon }
                data-testid="search-top-btn"
                type="button"
                onClick={ renderSearchBar }
              >
                { !showSearchBar
                  ? <img src={ searchIcon } alt="Search-Bar" />
                  : <TiArrowBack /> }
              </button>)}
          { name.includes('Explorar Origem')
            ? (
              <button
                className="searchBtn"
                src={ searchIcon }
                data-testid="search-top-btn"
                type="button"
                onClick={ renderSearchBar }
              >
                { !showSearchBar
                  ? <img src={ searchIcon } alt="Search-Bar" />
                  : <TiArrowBack /> }
              </button>)
            : ''}
        </header>)}
      {showSearchBar && <SearchBar /> }
      {location === '/explorar/comidas/area' ? <ShowArea /> : '' }
    </div>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
