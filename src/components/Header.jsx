import React, { useState } from 'react';
import { string, bool } from 'prop-types';
import { Link } from 'react-router-dom';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ page, search }) {
  const [searchBar, setSearchBar] = useState(false);

  const HandleSearch = () => {
    if (searchBar) {
      setSearchBar(false);
    } else {
      setSearchBar(true);
    }
  };

  return (
    <div>
      <Link to="/perfil">
        <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
      </Link>
      <h2 data-testid="page-title">{ page }</h2>
      { search
      && (
        <button type="button" onClick={ HandleSearch }>
          <img src={ searchIcon } alt="Search" data-testid="search-top-btn" />
        </button>
      )}
      { searchBar && <SearchBar /> }
    </div>
  );
}

Header.propTypes = {
  page: string,
  search: bool,
}.isRequired;

export default Header;
