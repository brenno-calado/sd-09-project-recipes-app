import React from 'react';
import './Header.css';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, search = false }) {
  const renderSearchButton = () => (
    <button type="button" data-testid="search-top-btn" src="../images/searchIcon.svg">
      <img src={ searchIcon } alt="profile" />
    </button>
  );

  return (
    <header className="Header">
      <button type="button" data-testid="profile-top-btn" src="'../images/profileIcon.svg'">
        <img src={ profileIcon } alt="profile" />
      </button>
      <h3 data-testid="page-title">{ title }</h3>
      {search && renderSearchButton()}
    </header>
  );
}

export default Header;
