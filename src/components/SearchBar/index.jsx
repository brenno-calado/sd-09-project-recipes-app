import React from 'react';
import { shape } from 'prop-types';
import { InputGroup, FormControl } from 'react-bootstrap';
import { useRecipeContext } from '../../contexts/recipeContext';
import styles from './searchBar.module.css';

function SearchBar({ children }) {
  const {
    isSearchBar,
    handleCheck,
    getInputValue } = useRecipeContext();

  return (
    isSearchBar && (
      <>
        <InputGroup htmlFor="searchBtn">
          <InputGroup.Prepend className={ styles.inputSearch }>
            <FormControl
              placeholder="Digite para pesquisar"
              onChange={ getInputValue }
              data-testid="search-input"
              type="text"
              id="searchBtn"
            />
          </InputGroup.Prepend>
        </InputGroup>

        <label
          htmlFor="ingredientSearch"
          className={ styles.radioInput }
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
          className={ styles.radioInput }
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
          className={ styles.radioInput }
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
    )
  );
}
SearchBar.propTypes = {
  children: shape().isRequired,
};

export default SearchBar;
