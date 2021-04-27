import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  return (
    <div className="container row">
      <img src={ profileIcon } alt="iconeBusca" />
      <h1>Comidas</h1>
      <button
        type="button"
        // onClick={() => {}}
      >
        <img src={ searchIcon } alt="iconeBusca" />
      </button>

      <SearchBar />
    </div>
  );
}

export default Header;
