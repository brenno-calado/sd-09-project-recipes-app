import React from 'react';

function Search() {
  return (
    <div>
      <input data-testid="search-input" type="text" placeholder="Buscar Reaceitas" />
      <div>
        <label htmlFor="ingredients">
          <input
            data-testid="ingredient-search-radio"
            id="ingredients"
            type="radio"
            name="search"
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input data-testid="name-search-radio" id="name" type="radio" name="search" />
          Nome
        </label>
        <label htmlFor="firstLetter">
          <input
            data-testid="first-letter-search-radio"
            id="firstLetter"
            type="radio"
            name="search"
          />
          Primeira letra
        </label>
      </div>
      <button data-testid="exec-search-btn" type="button">Buscar</button>
    </div>
  );
}

export default Search;
