import React, { useState } from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import SerchLogo from '../images/searchIcon.svg';
import ProfileLogo from '../images/profileIcon.svg';

function Header() {
  const [xablau, setXablau] = useState(false);

  const handleClick = () => {
    setXablau(!xablau);
  };

  return (
    <>
      <div className="header-content">
        <div>
          <Link to="/perfil">
            <button data-testid="profile-top-btn" type="button">
              <img src={ ProfileLogo } alt="profile" />
            </button>
          </Link>
        </div>
        <p data-testid="page-title">Comidas</p>
        <span>
          <button data-testid="search-top-btn" type="button" onClick={ handleClick }>
            <img src={ SerchLogo } alt="search" />
          </button>
        </span>
      </div>
      <div>
        { xablau ? <SearchBar /> : null }
      </div>
    </>
  );
}

export default Header;
