import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchI from '../images/searchIcon.svg';

function Header({ title }) {
  const [searchBar, setSearchBar] = useState(false);
  return (
    <header className="header">
      <Link to="/perfil">
        <img alt="profile-icon" src={ profileIcon } data-testid="profile-top-btn" />
      </Link>

      <h3 data-testid="page-title">{title}</h3>

      <button
        type="button"
        onClick={ () => setSearchBar(!searchBar) }
      >
        <img
          alt="search"
          src={ searchI }
          data-testid="search-top-btn"
        />
      </button>
      { searchBar && <SearchBar /> }
    </header>
  );
}
Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
