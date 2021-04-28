import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/Header.css';

function toUpperCaseFirstLetter(str) {
  const arr = str.split('');
  arr[0] = str[0].toUpperCase();
  return arr.join('');
}

function refineTitle(title) {
  if ((title.includes('/')) || (title.includes('-'))) {
    const arr = title.split('')
      .map((str) => (((str === '/') || (str === '-')) ? ' ' : str));
    const newArr = arr.join('').split(' ')
      .filter((str) => (str !== ''))
      .map((str) => ((str !== 'area') ? toUpperCaseFirstLetter(str) : 'Origem'));
    if (newArr.length > 1) return `${newArr[0]} ${newArr[newArr.length - 1]}`;
    return newArr[0];
  }
  return toUpperCaseFirstLetter(title);
}

function Header() {
  const { handleClickShowSearchButton, showSearchBar } = useContext(RecipesAppContext);
  const location = useLocation();
  const title = refineTitle(location.pathname.slice(1));
  return (
    <div>
      <header className="header-container">
        <Link to="/perfil">
          <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
        </Link>
        <h1 data-testid="page-title">{ title }</h1>
        { ((title === 'Perfil')
          || ((title.includes('Explorar') && !(title.includes('Origem'))))
          || (title.includes('Receitas'))) ? (<div />) : (
            <button type="button" onClick={ handleClickShowSearchButton }>
              <img src={ searchIcon } alt="search" data-testid="search-top-btn" />
            </button>
          ) }
      </header>
      { (showSearchBar) && <SearchBar /> }
    </div>
  );
}

export default Header;
