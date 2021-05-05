import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

const toggleSearchBar = (searchBarView, setSearchBarView) => {
  setSearchBarView(!searchBarView);
};

const Header = (props) => {
  const { title } = props;
  const [searchBarView, setSearchBarView] = useState(false);
  return (
    <header>
      <Link to="/perfil">
        <img
          src={ profileIcon }
          alt="Icone de perfil"
          data-testid="profile-top-btn"
        />
      </Link>
      <h1 data-testid="page-title">{title}</h1>
      <button
        type="button"
        onClick={ () => toggleSearchBar(searchBarView, setSearchBarView) }
      >
        <img src={ searchIcon } alt="Icone de perfil" data-testid="search-top-btn" />
      </button>
      {searchBarView ? <SearchBar /> : <span /> }
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
