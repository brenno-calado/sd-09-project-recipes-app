import React from 'react';
import profileIcon from  "../images/profileIcon.svg"
import searchIcon from '../images/searchIcon.svg'

function Header() {
  return (
    <header>
      <button type data-testid="profile-top-btn"><img src={ profileIcon } alt="Profile" /></button>
      <h1 data-testid="page-title">Title</h1>
      <button data-testid="search-top-btn"><img src={ searchIcon } alt="Search"/></button>
    </header>
  );
}

export default Header;
