import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import "../styles/Header.css";

function refineTitle(title) {
  if ((title.includes('/')) || (title.includes('-'))) {
    const arr = title.split('')
      .map((str) => ((str === '/') || (str === '-')) ? ' ' : str);
    const newArr = arr.join('').split(' ')
      .filter((str) => (str !== ''))
      .map((str) => (str !== 'area') ? toUpperCaseFirstLetter(str) : 'Origem');
    return `${newArr[0]} ${newArr[newArr.length - 1]}`
  }
  return toUpperCaseFirstLetter(title);
}

function toUpperCaseFirstLetter(str) {
  const arr = str.split('');
  arr[0] = str[0].toUpperCase();
  return arr.join('');
}

function Header() {
  const location = useLocation();
  const title = refineTitle(location.pathname.slice(1));
  return (
    <header className="header-container">
      <Link to="/perfil">
        <img src={ profileIcon } alt="profile" data-testid="profile-top-btn"/>
      </Link>
      <h1 data-testid="page-title">{ title }</h1>
      { ((title === 'Perfil')
        || ((title.includes('Explorar') && !(title.includes('Origem'))))
        || (title.includes('Receitas'))
        ) ? (
        <div />
      ) : (
        <button>
          <img src={ searchIcon } alt="search" data-testid="search-top-btn" />
        </button>
      ) }
    </header>
  );
}

export default Header;
