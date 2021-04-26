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

  const buttonLink = () => (
    <Link to="/perfil">
      <button data-testid="profile-top-btn" type="button">
        <img src={ ProfileLogo } alt="profile" />
      </button>
    </Link>
  );

  const buttonClick = () => (
    <button data-testid="search-top-btn" type="button" onClick={ handleClick }>
      <img src={ SerchLogo } alt="search" />
    </button>
  );

  return (
    <>
      <div className="header-content">
        { buttonLink() }
        <p data-testid="page-title">Comidas</p>
        { buttonClick() }
      </div>
      <div>
        { xablau ? <SearchBar /> : null }
      </div>
    </>
  );
}

export default Header;
