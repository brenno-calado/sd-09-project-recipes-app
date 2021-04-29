import React from 'react';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

export default function Header() {
  return (
    <header>
      <button
        type="button"
        className="profile-top-btn"
        id="profile-top-btn"
        data-testId="profile-top-btn"
      >
        <img src={ ProfileIcon } alt="Profile Icon" />
      </button>

      <h1
        className="page-title"
        id="page-title"
        data-testId="page-title"
      >
        COMIDAS
      </h1>

      <button
        type="button"
        className="search-top-btn"
        id="search-top-btn"
        data-testId="search-top-btn"
      >
        <img src={ SearchIcon } alt="Search Icon" />
      </button>

    </header>
  );
}
