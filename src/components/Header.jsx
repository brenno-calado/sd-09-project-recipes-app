import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileImg from '../images/profileIcon.svg';
import searchImg from '../images/searchIcon.svg';
import { RecipiesContext } from '../context/RecipiesContext';
import Footer from './Footer';

function CreateHeader({ title, showButton }) {
  const { showSearchBar, setShowSearchBar } = useContext(RecipiesContext);
  const changeSearchBarStatus = () => setShowSearchBar(!showSearchBar);
  function renderButton() {
    return (
      <button
        data-testid="search-top-btn"
        type="button"
        src={ searchImg }
        onClick={ changeSearchBarStatus }
      >
        <img alt="SearchImage" src={ searchImg } />
      </button>
    );
  }
  return (
    <header>
      <Link to="/perfil">
        <button data-testid="profile-top-btn" type="button" src={ profileImg }>
          <img alt="ProfileImage" src={ profileImg } />
        </button>
      </Link>
      <h1 data-testid="page-title">{title}</h1>
      {showButton && renderButton()}
      <Footer />
    </header>
  );
}

CreateHeader.propTypes = {
  title: PropTypes.string,
  showButton: PropTypes.bool,
}.isRequired;

export default CreateHeader;
