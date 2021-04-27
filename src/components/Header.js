import React from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

const Header = () => (
  <header>
    <div>
      <Link to="/perfil">
        <img
          src={ ProfileImage }
          alt="profileIcon"
          data-testid="profile-top-btn"
        />
      </Link>
    </div>
    <h1
      data-testid="page-title"
    >
      Comidas
    </h1>
    <div>
      <img
        src={ SearchIcon }
        alt="profileIcon"
        data-testid="search-top-btn"
      />
    </div>
  </header>
);

export default Header;
