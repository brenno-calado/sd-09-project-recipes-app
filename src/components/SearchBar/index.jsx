import React from 'react';
import { useRecipeContext } from '../../contexts/recipeContext';

function SearchBar() {
  const { isSearchBar } = useRecipeContext();
  return (
    <>
      {isSearchBar && (
        <label htmlFor="searchBtn">
          <input
            data-testid="search-input"
            type="text"
            id="searchBtn"
          />
        </label>
      )}
      <label
        htmlFor="ingredientSearch"
      >
        <input
          id="ingredientSearch"
          data-testid="ingredient-search-radio"
          type="radio"
        />
        Ingrediente
      </label>
      <label
        htmlFor="nameSearch"
      >
        <input
          id="nameSearch"
          data-testid="name-search-radio"
          type="radio"
        />
        Nome
      </label>
      <label
        htmlFor="firstLetterSearch"
      >
        <input
          id="firstLetterSearch"
          data-testid="first-letter-search-radio"
          type="radio"
        />
        Primeira Letra
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
      >
        Buscar
      </button>
    </>
  );
}

export default SearchBar;
