import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import SearchBar from '../SearchBar';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import './Header.css';

const Header = ({ title }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleClick = () => (showSearchBar
    ? setShowSearchBar(false)
    : setShowSearchBar(true));

  const titles = [
    'Explorar',
    'Explorar Comidas',
    'Explorar Ingredientes',
    'Explorar Bebidas',
    'Receitas Feitas',
    'Receitas Favoritas',
    'Perfil',
  ];

  return (
    <header className="header">
      <Link to="/perfil">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profile icon"
        />
      </Link>

      <h1 data-testid="page-title">{ title }</h1>

      { !titles.includes(title) && (
        <Button onClick={ handleClick }>
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search icon"
          />
        </Button>
      ) }

      { showSearchBar && <SearchBar /> }
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Header;
