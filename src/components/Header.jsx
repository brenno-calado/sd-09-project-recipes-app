import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import RecipesContext from '../contexts/RecipesContext';

function Header({ page, hasSearchButton = true }) {
  const {
    showSearchBar,
    setToggledSearchButton,
    toggledProfileButton,
    toggledSearchButton,
  } = useContext(RecipesContext);

  useEffect(() => { // ComponentDidMount
    if (!hasSearchButton) {
      setToggledSearchButton(false);
    } else {
      setToggledSearchButton(true);
    }
  });

  const profileButton = () => (
    <Link to="/perfil">
      <input
        data-testid="profile-top-btn"
        type="image"
        src={ profileIcon }
        alt="profileIcon"
      />
    </Link>
  );

  const searchButton = () => (
    <input
      data-testid="search-top-btn"
      type="image"
      src={ searchIcon }
      alt="searchIcon"
      onClick={ showSearchBar }
    />
  );

  return (
    <>
      <h4 data-testid="page-title">{page}</h4>
      { toggledProfileButton && profileButton() }
      { toggledSearchButton && searchButton() }
    </>
  );
}

Header.propTypes = {
  page: PropTypes.string,
  hasSearchButton: PropTypes.bool,
}.isRequired;

export default Header;
