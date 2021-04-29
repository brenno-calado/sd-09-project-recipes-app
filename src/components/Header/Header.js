import React from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';

import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header({ title, isSearch }) {
  return (
    <header>
      <Link to="/perfil">
        <img src={ profileIcon } alt="Profile Icon" data-testid="profile-top-btn" />
      </Link>
      <h1 data-testid="page-title">{ title }</h1>
      {
        isSearch ? (
          <img src={ searchIcon } alt="Search Icon" data-testid="search-top-btn" />
        ) : ''
      }
    </header>
  );
}

Header.propTypes = {
  title: Proptypes.string.isRequired,
  isSearch: Proptypes.bool.isRequired,
};

export default Header;
