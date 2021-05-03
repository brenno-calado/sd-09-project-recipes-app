import React, { useState } from 'react';
import { string, bool } from 'prop-types';
import { Link } from 'react-router-dom';
import Logo1 from '../images/Logo1.png';
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
        <img src={ Logo1 } alt="logo" className="logo-img" />
        <h1> Minhas Receitas</h1>
        <Link to="/perfil">
          <img src={ profileIcon } alt="Profile" data-testid="profile-top-btn" />
        </Link>
      </header>

      <h2 data-testid="page-title">{ page }</h2>
      { search
      && (
        <button type="button" onClick={ HandleSearch }>
          <img src={ searchIcon } alt="Search" data-testid="search-top-btn" />
        </button>
      )}
      { searchBar && <SearchBar page={ page } /> }
    </div>
  );
}

Header.propTypes = {
  page: string,
  search: bool,
}.isRequired;

export default Header;
