import React from 'react';
import './Header.css';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title }) {
  return (
    <header className="Header">
      <button type="button" data-testid="profile-top-btn">
        <img src={ profileIcon } alt="profile" />
      </button>
      <h3 data-testid="page-title">{ title }</h3>
      <button type="button" data-testid="search-top-btn">
        <img src={ searchIcon } alt="profile" />
      </button>
    </header>
  );
}

export default Header;
