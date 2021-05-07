import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../CSS/Header.css';

const Header = ({ title, searchIcon }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const toogleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <>
      <header className="header">
        <Link to="/perfil">
          <img
            className="profile-img"
            data-testid="profile-top-btn"
            src={ profile }
            alt="Profile"
          />
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        {searchIcon && (
          <button type="button" onClick={ toogleSearchBar }>
            <img
              className="search-img"
              data-testid="search-top-btn"
              src={ search }
              alt="Search Icon"
            />
          </button>
        )}
      </header>
      { showSearchBar && <SearchBar title={ title } /> }
    </>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchIcon: PropTypes.bool.isRequired,
};

export default Header;
