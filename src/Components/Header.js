import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import './styles/Header.css';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ name }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const location = useLocation().pathname;
  const regex = /\d/g;
  const result = regex.test(location);
  console.log(result);

  function renderSearchBar() {
    if (showSearchBar) setShowSearchBar(false);
    else setShowSearchBar(true);
  }

  return (
    <div>
      { !result && (
        <header className="container">
          <Link to="/perfil">
            <img
              src={ profileIcon }
              alt="Profile Icon Access"
              data-testid="profile-top-btn"
            />
          </Link>
          <span data-testid="page-title">{name}</span>
          { name.includes('Explorar') || name.includes('Receitas')
            ? ''
            : (
              <button
                src={ searchIcon }
                data-testid="search-top-btn"
                type="button"
                onClick={ renderSearchBar }
              >
                { !showSearchBar
                  ? <img src={ searchIcon } alt="Search-Bar" />
                  : '' }
              </button>)}
          { name.includes('Explorar Origem')
            ? (
              <button
                src={ searchIcon }
                data-testid="search-top-btn"
                type="button"
                onClick={ renderSearchBar }
              >
                { !showSearchBar
                  ? <img src={ searchIcon } alt="Search-Bar" />
                  : '' }
              </button>)
            : ''}
        </header>)}
      <section>
        {showSearchBar && <SearchBar /> }
      </section>
    </div>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
