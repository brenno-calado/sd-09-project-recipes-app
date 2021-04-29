import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import './style.css';
import SearchBar from '../SearchBar';

function Header({ title, path, setResult }) {
  const [search, setSearch] = useState(false);

  const renderButtonSearch = () => {
    if (!path) return;

    if (path === '/bebidas'
      || path === '/comidas'
      || path === '/explorar/comidas/area') {
      return (
        <button
          type="button"
          onClick={ () => setSearch(!search) }
        >
          <img data-testid="search-top-btn" src={ searchIcon } alt="Search" />
        </button>
      );
    }
  };

  return (
    <>
      <header>
        <Link
          to="/perfil"
        >
          <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile" />
        </Link>
        <h1 data-testid="page-title">{ title }</h1>
        { renderButtonSearch() }
      </header>
      { search && <SearchBar path={ path } setResult={ setResult } /> }
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  setResult: PropTypes.func.isRequired,
};

export default Header;
