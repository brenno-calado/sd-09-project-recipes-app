import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title }) {
  const [search, setSearch] = useState(false);

  function renderContent() {
    return (
      <div>
        <Link to="/perfil">
          <img src={ profileIcon } alt="icon" data-testid="profile-top-btn" />
        </Link>
        <h1 data-testid="page-title">{ title }</h1>
        <button type="button" onClick={ () => setSearch(!search) }>
          <img
            src={ searchIcon }
            alt="search"
            data-testid="search-top-btn"
          />
        </button>
      </div>
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
  title: PropTypes.string.isRequired,
};

export default Header;
