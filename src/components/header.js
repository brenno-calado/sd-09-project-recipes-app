import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { bool, string } from 'prop-types';
import { Collapse } from 'react-bootstrap';

import SearchBar from './searchBar';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';

function Header({ page, search }) {
  const [searchBar, setSearchBar] = useState(false);

  const handleSearch = () => {
    setSearchBar(!searchBar);
  };
  console.log(typeof search);
  return (
    <>
      <header
        style={ {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        } }
      >
        <Link to="/perfil">
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
      </header>
      <Collapse in={ searchBar }>
        <div id="example-collapse-text">
          { searchBar && <SearchBar /> }
        </div>
      </Collapse>
    </>
  );
}

Header.propTypes = {
  page: string.isRequired,
  search: bool,
};

Header.defaultProps = {
  search: false,
};

export default Header;
