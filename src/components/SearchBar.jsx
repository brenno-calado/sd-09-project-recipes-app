import React from 'react';

const SearchBar = () => (
  <div className="search-bar-container">
    <input data-testid="search-input" />
    <div className="radio-container">
      <label
        htmlFor="ingredient-search-radio"
      >
        <input
          type="radio"
          id="ingredient-search-radio"
          data-testid="ingredient-search-radio"
        />
        Ingrediente
      </label>
      <label
        htmlFor="name-search-radio"
      >
        <input
          type="radio"
          id="name-search-radio"
          data-testid="name-search-radio"
        />
        Nome
      </label>
      <label
        htmlFor="first-letter-search-radio"
      >
        <input
          type="radio"
          id="first-letter-search-radio"
          data-testid="first-letter-search-radio"
        />
        Primeira letra
      </label>
    </div>
    <button
      type="button"
      data-testid="exec-search-btn"
    >
      Buscar
    </button>
  </div>
);

export default SearchBar;
