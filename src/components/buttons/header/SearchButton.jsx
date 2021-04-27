import React from 'react';
import SearchIcon from '../../../images/searchIcon.svg';

function SearchButton() {
  return (
    <button
      type="button"
      className="main-buttons"
      data-testid="search-top-btn"
      src="searchIcon"
    >
      <img src={ SearchIcon } alt="search button" />
    </button>
  );
}

export default SearchButton;
