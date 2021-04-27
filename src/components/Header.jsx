import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import "../styles/Header.css";

function Header() {
  const location = useLocation();
  const title = location.pathname.slice(1);
  return (
    <header className="header-container">
      <Link to="/perfil">
        <img src={ profileIcon } alt="profile" data-testid="profile-top-btn"/>
      </Link>
      <h1 data-testid="page-title">{ title }</h1>
      { ((title !== 'perfil') && (title !== 'explorar')) ? (
        <button>
          <img src={ searchIcon } alt="search" data-test-id="search-top-btn" />
        </button>
      ) : (<div />) }
    </header>
  );
}

export default Header;