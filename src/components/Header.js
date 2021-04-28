import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import { MyContext } from '../MyContext';

function Header() {
  const { showBar, clickShowBar } = useContext(MyContext);

  return (
    <div className="container">
      <div className="d-flex">
        <img src={ profileIcon } alt="iconeBusca" />
        <h1>Comidas</h1>
        <button
          type="button"
          onClick={ clickShowBar }
        >
          <img src={ searchIcon } alt="iconeBusca" />
        </button>
      </div>
      {showBar ? <SearchBar /> : null}
    </div>
  );
}

export default Header;
