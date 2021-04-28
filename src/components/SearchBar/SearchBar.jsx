import React, { useState } from 'react';
import Filters from './styled';
import SearchIcon from '../../images/searchIcon.svg';

function SearchBar() {
  const [isSearching, setIsSearching] = useState(false);

  const renderFilters = () => (
    <Filters>
      <label htmlFor="name">
        Termo
        <input
          type="text"
          data-testid="search-input"
          id="name"
        />
      </label>
      <label htmlFor="ingredient">
        Ingrediente
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient"
          name="filter"
          value="ingredient"
        />
      </label>
      <label htmlFor="name">
        Nome
        <input
          type="radio"
          data-testid="name-search-radio"
          id="name"
          name="filter"
          value="name"
        />
      </label>
      <label htmlFor="first-letter">
        Primeira Letra
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="first-letter"
          name="filter"
          value="letters"
        />
      </label>
      <button type="button" data-testid="exec-search-btn">
        Buscar
      </button>
    </Filters>
  );
  return (
    <>
      <div>
        <button
          type="button"
          onClick={ () => {
            setIsSearching(!isSearching);
          } }
        >
          <img
            data-testid="search-top-btn"
            src={ SearchIcon }
            alt="search-button"
          />
        </button>
      </div>
      {isSearching && renderFilters()}
    </>
  );
}

export default SearchBar;
