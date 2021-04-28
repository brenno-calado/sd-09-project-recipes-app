import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const { header: { page, search } } = useContext(AppContext);
  const [searchBar, setSearchBar] = useState(false);
  return (
    <div>
      <header className="header">
        <Link to="/perfil">
          <img data-testid="profile-top-btn" alt="profile" src={ profileIcon } />
        </Link>
        <div data-testid="page-title">{page}</div>
        {search ? (
          <button
            className="search-button"
            type="button"
            onClick={ () => setSearchBar(!searchBar) }
          >
            <img data-testid="search-top-btn" alt="profile" src={ searchIcon } />
          </button>) : <div />}
      </header>

    </div>
  );
}
export default Header;
