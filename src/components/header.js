import React, { useState } from 'react';
import { bool, string } from 'prop-types';
import { Link } from 'react-router-dom';

import SearchBar from './searchBar';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

function Header({ page, search }) {
  const [searchBar, setSearchBar] = useState(false);
  const handleSearch = () => {
    if (searchBar) {
      setSearhBar(false);
    } else {
      setSearhBar(true);
    }
  };

  return (
    <div
      style={ {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      } }
    >
      <Link to="/profile">
        <img
          src={ profileIcon }
          alt="Profile"
          data-testid="profile-top-btn"
        />
      </Link>
      <h1 data-testid="page-title">{ page }</h1>
      { search && (
        <button type="button" onClick={ handleSearch }>
          <img src={ searchIcon } alt="procurar" data-testid="search-top-btn" />
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
