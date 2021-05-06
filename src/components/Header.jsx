import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

const Header = ({ title }) => {
  const [searchBar, setSearchBar] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    if (title === undefined || title === 'Explorar Origem') {
      setShowSearch(true);
    } else if (title === 'Perfil'
      || title === 'Receitas Favoritas'
      || title === 'Receitas Feitas') {
      setShowSearch(false);
    } else {
      setShowSearch(false);
    }
  }, []);

  const searchButton = (
    <button
      type="button"
      onClick={ () => setSearchBar(!searchBar) }
    >
      <img
        data-testid="search-top-btn"
        alt="search-icon"
        src={ searchIcon }
      />
    </button>
  );

  return (
    <div>
      <h1 data-testid="page-title">{ title }</h1>

      <Link to="/perfil">
        <img
          data-testid="profile-top-btn"
          alt="profile-icon"
          src={ profileIcon }
        />
      </Link>

      { showSearch && searchButton }

      { searchBar && <SearchBar /> }
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
