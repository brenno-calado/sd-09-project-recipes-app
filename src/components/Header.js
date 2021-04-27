import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProfileImage from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

const Header = () => {
  const pathname = useLocation().pathname.split('/');
  const headerTitle = pathname[1].charAt(0).toUpperCase()
  + pathname[1].slice(1);
  return (
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
        { headerTitle }
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
};

export default Header;
