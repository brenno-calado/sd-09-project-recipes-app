import React, { useState } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

const toggleSearchBar = (searchBarView, setSearchBarView) => {
  setSearchBarView(!searchBarView);
};

const Header = (props) => {
  const { title } = props;
  const [searchBarView, setSearchBarView] = useState(true);
  return (
    <header>
      <img
        src={ profileIcon }
        alt="Icone de perfil"
        data-testid="profile-top-btn"
      />
      <h1 data-testid="page-title">{title}</h1>
      <button
        type="button"
        onClick={ () => toggleSearchBar(searchBarView, setSearchBarView) }
        data-testid="search-top-btn"
      >
        <img src={ searchIcon } alt="Icone de perfil" />
      </button>
      {searchBarView ? <SearchBar /> : <span /> }
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
