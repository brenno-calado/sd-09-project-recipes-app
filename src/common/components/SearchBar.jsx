import React from 'react';

const SearchBar = () => {
  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
      />
      <div>
        <label htmlFor="ingredient-input">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            name="search-radio"
            id="ingredient-input"
          />
          Ingrediente
        </label>
        <label htmlFor="name-search-input">
          <input
            data-testid="name-search-radio"
            type="radio"
            name="search-radio"
            id="name-search-input"
          />
          Nome
        </label>
        <label htmlFor="first-letter-input">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            name="search-radio"
            id="first-letter-input"
          />
          Primeira letra
        </label>
      </div>
      <button
        data-testid="exec-search-btn"
        type="button"
        id="search-btn"
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
