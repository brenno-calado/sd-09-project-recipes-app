import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

import SearchBar from './SearchBar';

function Header({ pageName, searchBtn }) {
  const [searchBar, showSearchBar] = useState(false);

  const renderSearchBtn = () => (
    <button type="button" onClick={ () => showSearchBar(!searchBar) }>
      <img
        src={ searchIcon }
        alt="search-icon"
        data-testid="search-top-btn"
      />
    </button>
  );

  return (
    <>
      <nav className="header-bar" data-testid="header-component">
        <Link to="/perfil">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile-icon"
            className="header-icons"
          />
        </Link>
        <h1
          data-testid="page-title"
        >
          { pageName }
        </h1>
        { searchBtn && renderSearchBtn() }
      </nav>
      { searchBar && <SearchBar />}
    </>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
  searchBtn: PropTypes.bool.isRequired,
};

export default Header;
