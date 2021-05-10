import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../css/Header.css';

const Header = ({ title }) => {
  const [searchBar, setSearchBar] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    if (title === undefined || title === 'Explorar Origem') {
      setShowSearch(true);
    } else if (title === 'Perfil'
      || title === 'Receitas Favoritas'
      || title === 'Receitas Feitas') {
      setShowSearch(false);
    } else {
      setShowSearch(false);
    }
  }, []);

  const searchButton = (
    <Button
      size="sm"
      variant="outline-primary"
      type="button"
      onClick={ () => setSearchBar(!searchBar) }
    >
      <img
        data-testid="search-top-btn"
        alt="search-icon"
        src={ searchIcon }
      />
    </Button>
  );

  return (
    <div>
      <h1 data-testid="page-title">{ title }</h1>
      <Navbar collapseOnSelect expand="lg" variant="light">
        <Link to="/perfil">
          <Button variant="outline-primary" size="sm">
            <img
              data-testid="profile-top-btn"
              alt="profile-icon"
              src={ profileIcon }
            />
          </Button>
        </Link>
        { showSearch && searchButton }
        { searchBar && <SearchBar /> }
      </Navbar>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
