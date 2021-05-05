import React, { useState } from 'react';
import { string, bool } from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../Style/Header.css';

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
      <header>
        <div className="header-bar">
          <Link to="/perfil">
            <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
          </Link>
          <h4 data-testid="page-title" className="page-title">{ page }</h4>
          { search
      && (
        <button type="button" onClick={ HandleSearch }>
          <img src={ searchIcon } alt="Search" data-testid="search-top-btn" />
        </button>
      )}
        </div>
      </header>
      { searchBar && <SearchBar page={ page } /> }
    </div>
  );
}

Header.propTypes = {
  page: string,
  search: bool,
}.isRequired;

export default Header;
