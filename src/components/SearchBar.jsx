import React from 'react';

function SearchBar() {
  return (
    <div>
      <label htmlFor="inputText">
        Buscar por:
        <input
          id="inputText"
          data-testid="search-input"
          type="text"
          placeholder="digite..."
        />
      </label>
      <label htmlFor="ingredient-search">
        Ingredient
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          id="ingredient-search"
          name="search"
          value="ingredient"
        />
      </label>
      <label htmlFor="name-search">
        Name
        <input
          data-testid="name-search-radio"
          type="radio"
          id="name-search"
          name="search"
          value="name"
        />
      </label>
      <label htmlFor="first-letter-search">
        First Letter
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          id="first-letter-search"
          name="search"
          value="firstLetter"
        />
      </label>
      <button data-testid="exec-search-btn" type="button">Busca</button>
    </div>
  );
}

export default SearchBar;
