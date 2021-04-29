import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import './style.css';
import SearchBar from '../SearchBar';

function Header({ title, match }) {
  const [search, setSearch] = useState(false);

  const handleSearch = () => (
    search ? setSearch(false) : setSearch(true)
  );

  const renderButtonSearch = () => {
    if (!match) return;

    const { path } = match;
    if (path === '/bebidas'
      || path === '/comidas'
      || path === '/explorar/comidas/area') {
      return (
        <button
          type="button"
          onClick={ handleSearch }
        >
          <img data-testid="search-top-btn" src={ searchIcon } alt="Search" />
        </button>
      );
    }
  };

  const renderSearch = () => (
    <SearchBar match={ match } />
  );

  return (
    <>
      <header className="header-container">
        <Link
          to="/perfil"
        >
          <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile" />
        </Link>
        <h1 data-testid="page-title">{ title }</h1>
        { renderButtonSearch() }
      </header>
      { search && renderSearch() }
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  match: PropTypes.shape().isRequired,
};

export default Header;
