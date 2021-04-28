import React from 'react';

function SearchBar() {
  return (
    <div>
      <input data-testid="search-input" type="text" />
      <input
        data-testid="ingredient-search-radio"
        type="radio"
        name="Search radio"
      />
      Ingredientes
      <input data-testid="name-search-radio" type="radio" name="Search radio" />
      Nome
      <input data-testid="first-letter-search-radio" type="radio" name="Search radio" />
      Primeira Letra
      <button data-testid="exec-search-btn" type="button">Buscar</button>
    </div>
  );
}

export default SearchBar;
