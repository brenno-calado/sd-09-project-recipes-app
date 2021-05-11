import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import SearchBar from './SearchBar';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import Context from '../contextApi/context';

export default function Header() {
  const { definedTypeSearch, hideSearchBar } = useContext(Context);

  return (
    <header>
      <button
        type="button"
        className="profile-top-btn"
        id="profile-top-btn"
        data-testId="profile-top-btn"
        onClick={ <Redirect to="/perfil" /> }
      >
        <img src={ ProfileIcon } alt="Profile Icon" />
      </button>

      <h1
        className="page-title"
        id="page-title"
        data-testId="page-title"
      >
        {
          definedTypeSearch === 'Meal' ? 'COMIDAS' : 'BEBIDAS'
        }
      </h1>

      <button
        type="button"
        className="search-top-btn"
        id="search-top-btn"
        data-testId="search-top-btn"
        onClick={ () => hideSearchBar() }
      >
        <img src={ SearchIcon } alt="Search Icon" />
      </button>
      <SearchBar />
    </header>
  );
}
