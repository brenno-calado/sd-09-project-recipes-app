import React from 'react';
import { shape } from 'prop-types';
import { useRecipeContext } from '../../contexts/recipeContext';

function SearchBar({ children }) {
  const {
    isSearchBar,
    handleCheck,
    getInputValue } = useRecipeContext();

  return (
    <>
      {isSearchBar && (
        <label htmlFor="searchBtn">
          <input
            onChange={ getInputValue }
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
          value="ingredient"
          onChange={ handleCheck }
          name="search"
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
          value="name"
          onChange={ handleCheck }
          name="search"
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
          value="firstLetter"
          onChange={ handleCheck }
          name="search"
          id="firstLetterSearch"
          data-testid="first-letter-search-radio"
          type="radio"
        />
        Primeira Letra
      </label>
      <div>{ children }</div>
    </>
  );
}
SearchBar.propTypes = {
  children: shape().isRequired,
};

export default SearchBar;
