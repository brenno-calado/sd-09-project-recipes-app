import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

function Header({ pageName }) {
  return (
    <nav className="header-bar" data-testid="header-component">
      <Link
        to="/perfil"
        data-testid="profile-top-btn"
      >
        <img
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
      <img
        src={ searchIcon }
        alt="search-icon"
        data-testid="search-top-btn"
      />
    </nav>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default Header;
