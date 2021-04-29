import React from 'react';

const SearchBar = () => {
  console.log('Oi!');
  return (
    <form>
      <input
        data-testid="search-input"
        type="text"
      />
      <label htmlFor="ingredientInput">
        Ingrediente
        <input
          id="ingredientInput"
          data-testid="ingredient-search-radio"
          type="radio"
          name="searchOption"
          value="ingredients"
        />
      </label>
      <label htmlFor="nameInput">
        Nome
        <input
          id="nameInput"
          data-testid="name-search-radio"
          type="radio"
          name="searchOption"
          value="name"
        />
      </label>
      <label htmlFor="firstLetterInput">
        Primeira Letra
        <input
          id="firstLetterInput"
          data-testid="first-letter-search-radio"
          type="radio"
          name="searchOption"
          value="firstLetter"
        />
      </label>
      <button data-testid="exec-search-btn" type="button">Buscar</button>
    </form>
  );
};

export default SearchBar;
