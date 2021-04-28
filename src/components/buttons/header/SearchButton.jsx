import React from 'react';
import { func, bool } from 'prop-types';
import SearchIcon from '../../../images/searchIcon.svg';

function SearchButton({ onClick, status }) {
  return (
    <button
      type="button"
      className="main-buttons"
      data-testid="search-top-btn"
      src="searchIcon"
      onClick={ () => onClick(!status) }
    >
      <img src={ SearchIcon } alt="search button" />
    </button>
  );
}

SearchButton.propTypes = {
  onClick: func,
  status: bool,
}.isRequired;

export default SearchButton;
