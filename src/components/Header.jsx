import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const [searchBarToggle, setToggle] = useState(false);
  const { textProp } = props;

  function searchBtn() {
    if (
      textProp === 'Comidas'
      || textProp === 'Bebidas'
      || textProp === 'Explorar Origem'
    ) {
      return (
        <button
          type="button"
          onClick={ () => setToggle(!searchBarToggle) }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="Ativar barra de pesquisa"
          />
        </button>
      );
    }
  }

  function search() {
    if (searchBarToggle) {
      return (<SearchBar />);
    }
  }

  return (
    <>
      <header>
        <Link
          to="/perfil"
        >
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Foto do perfil do usuário"
          />
        </Link>
        <span data-testid="page-title">{ textProp }</span>
        { searchBtn() }
      </header>
      { search() }
    </>
  );
}

Header.propTypes = {
  textProp: PropTypes.string.isRequired,
};

export default Header;
