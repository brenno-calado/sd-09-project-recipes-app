import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/header.css';

function Header({ title }) {
  const [search, setSearch] = useState(false);

  function renderContent() {
    return (
      <header className="container-header">
        <Link to="/perfil">
          <img
            src={ profileIcon }
            alt="icon"
            data-testid="profile-top-btn"
            className="header-icon"
          />
        </Link>
        <h1 data-testid="page-title" className="title">{ title }</h1>
        <button
          type="button"
          onClick={ () => setSearch(!search) }
          className="header-button"
        >
          <img
            src={ searchIcon }
            alt="search"
            data-testid="search-top-btn"
          />
        </button>
      </header>
    );
  }

  if (search) {
    return (
      <div>
        { renderContent() }
        <SearchBar />
      </div>
    );
  }
  return (
    <div>
      { renderContent() }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
};

Header.defaultProps = {
  title: null,
};

export default Header;
