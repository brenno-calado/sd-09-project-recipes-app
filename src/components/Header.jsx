import React from 'react';
import { string, bool } from 'prop-types';
import { Link } from 'react-router-dom';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ page, search }) {
  return (
    <div>
      <Link to="/perfil">
        <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
      </Link>
      <h2 data-testid="page-title">{ page }</h2>
      { search && <img src={ searchIcon } alt="Search" data-testid="search-top-btn" /> }
    </div>
  );
}

Header.propTypes = {
  page: string,
  search: bool,
}.isRequired;

export default Header;
