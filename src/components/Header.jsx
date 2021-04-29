import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BarraDeBusca from './BarraDeBusca';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

function Header() {
  const [toggleSearch, setToogleSearch] = useState(false);

  const handleClick = () => {
    setToogleSearch(!toggleSearch);
  };

  return (
    <div>
      <div className="header-content">
        <Link to="/perfil">
          <button data-testid="profile-top-btn" type="button">
            <img src={ ProfileIcon } alt="profile-icon" />
          </button>
        </Link>
        <h1 data-testid="page-title">Title</h1>
        <span>
          <button data-testid="search-top-btn" type="button" onClick={ handleClick }>
            <img src={ SearchIcon } alt="search-icon" />
          </button>
        </span>
      </div>
      <div>
        { toggleSearch ? <BarraDeBusca /> : null }
      </div>
    </div>
  );
}

export default Header;
