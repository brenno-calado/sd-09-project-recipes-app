import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.css';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header({ name }) {
  return (
    <header className="container">
      <Link to="/perfil">
        <img
          src={ profileIcon }
          alt="Profile Icon Access"
          data-testid="profile-top-btn"
        />
      </Link>
      <span data-testid="page-title">{name}</span>
      <img src={ searchIcon } alt="Search-Bar" data-testid="search-top-btn" />
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
