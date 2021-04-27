import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

const Header = () => {
  const [searchBar, setSearchBar] = useState(false);
  return (
    <div>
      <h1 data-testid="page-title">
        Recipes App
      </h1>

      <Link to="/perfil">
        <img
          data-testid="profile-top-btn"
          alt="profile-icon"
          src={ profileIcon }
        />
      </Link>

      <button
        type="button"
        onClick={ () => setSearchBar(!searchBar) }
      >
        <img
          data-testid="search-top-btn"
          alt="search-icon"
          src={ searchIcon }
        />
        Search
      </button>

      { searchBar && <SearchBar /> }
    </div>
  );
};

export default Header;
