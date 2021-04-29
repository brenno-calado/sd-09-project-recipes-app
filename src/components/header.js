import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { string, shape, bool } from 'prop-types';
import { Collapse } from 'react-bootstrap';

import SearchBar from './searchBar';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

function Header({ page, search: { searchBtn, searchFor } }) {
  const [searchBar, setSearchBar] = useState(false);

  const handleSearch = () => {
    setSearchBar(!searchBar);
  };

  return (
    <>
      <header
        className="header-Display header-wrapper"
      >
        <Link to="/perfil">
          <img
            src={ profileIcon }
            alt="Profile"
            data-testid="profile-top-btn"
          />
        </Link>
        <h1 data-testid="page-title">{ page }</h1>
        { searchBtn && (
          <button type="button" onClick={ handleSearch } className="header-searchBttn">
            <img src={ searchIcon } alt="procurar" data-testid="search-top-btn" />
          </button>
        )}
      </header>
      <Collapse in={ searchBar }>
        <div id="example-collapse-text" className="search-bar-wrapper">
          { searchBar && <SearchBar type={ searchFor } /> }
        </div>
      </Collapse>
    </>
  );
}

Header.propTypes = {
  page: string.isRequired,
  search: shape({
    searchBtn: bool,
    searchFor: string,
  }),
};

Header.defaultProps = {
  search: {
    searchBtn: false,
    searchFor: 'food',
  },
};

export default Header;
