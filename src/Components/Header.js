import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import './styles/Header.css';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ name }) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  function renderSearchBar() {
    if (showSearchBar) setShowSearchBar(false);
    else setShowSearchBar(true);
  }

  return (
    <div>
      <header className="container">
        <Link to="/perfil">
          <img
            src={ profileIcon }
            alt="Profile Icon Access"
            data-testid="profile-top-btn"
          />
        </Link>
        <span data-testid="page-title">{name}</span>
        <button type="button" onClick={ renderSearchBar }>
          <img src={ searchIcon } alt="Search-Bar" data-testid="search-top-btn" />
        </button>
      </header>
      <section>
        {showSearchBar ? <SearchBar /> : ''}
      </section>
    </div>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
