import React from 'react';

export default function SearchBar() {
  return (
    <div>

      <input
        className="search-input"
        id="search-input"
        data-testId="search-input"
      />

      <div className="containerRadioBtns" id="containerRadioBtns">
        <label htmlFor="ingredient-search-radio">
          Ingrediente
          <input
            type="radio"
            className="ingredient-search-radio"
            id="ingredient-search-radio"
            data-testId="ingredient-search-radio"
          />
        </label>

        <label htmlFor="name-search-radio">
          Nome
          <input
            type="radio"
            className="name-search-radio"
            id="name-search-radio"
            data-testId="name-search-radio"
          />
        </label>

        <label htmlFor="first-letter-search-radio">
          Primeira letra
          <input
            type="radio"
            className="first-letter-search-radio"
            id="first-letter-search-radio"
            data-testId="first-letter-search-radio"
          />
        </label>
      </div>
    </div>
  );
}
