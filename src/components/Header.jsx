import React from 'react';
import { Link } from 'react-router-dom';
import { string, bool } from 'prop-types';
import './Header.css';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, search = false }) {
  // const handleProfileClick = () => (<Redirect to="/perfil" />);

  const handleSearchClick = ({ target }) => {
    console.log(target);
  };

  const renderSearchButton = () => (
    <button
      type="button"
      data-testid="search-top-btn"
      src="../images/searchIcon.svg"
      onClick={ handleSearchClick }
    >
      <img src={ searchIcon } alt="search" />
    </button>
  );

  return (
    <header className="Header">
      <Link to="/perfil">
        <button
          type="button"
          data-testid="profile-top-btn"
          src="../images/profileIcon.svg"
        >
          <img src={ profileIcon } alt="profile" />
        </button>
      </Link>
      <h3 data-testid="page-title">{ title }</h3>
      {search && renderSearchButton()}
    </header>
  );
}

Header.propTypes = {
  title: string,
  search: bool,
}.isRequired;

export default Header;
