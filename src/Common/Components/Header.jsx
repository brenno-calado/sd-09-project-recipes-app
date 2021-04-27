import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ProfileIcon } from '../../images/profileIcon.svg';
// import { ReactComponent as SearchIcon } from '../../images/searchIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

class Header extends React.Component {
  render() {
    return (
      <nav className="header" data-testid="header-component">
        <Link to="/perfil" data-testid="profile-top-btn">
          <ProfileIcon />
        </Link>
        <h1 data-testid="page-title">Page Title</h1>
        <button
          type="button"
          name="search-top-btn"
          data-testid="search-top-btn"
          onClick={ () => console.log('clicou') }
        >
          <img src={ searchIcon } alt="search-icon" />
        </button>
      </nav>
    );
  }
}

export default Header;
