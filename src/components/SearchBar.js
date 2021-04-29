import React, { useState } from 'react';
import getFilteredRecipes from '../services/api';

function SearchBar() {
  const [searchState, setSearchState] = useState({ search: '', radioButton: '' });

  const handleChange = ({ target: { value } }) => {
    setSearchState({ ...searchState, search: value });
  };

  const handleClick = ({ target: { id } }) => {
    setSearchState({ ...searchState, radioButton: id });
  };

  const handleSubmit = () => {
    const { search, radioButton } = searchState;
    getFilteredRecipes(search, radioButton);
  };

  return (
    <div>
      <label htmlFor="search">
        <input
          data-testid="search-input"
          name="search"
          id="search"
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="ingrediente">
        Ingrediente
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="filter"
          id="ingrediente"
          onClick={ handleClick }
        />
      </label>

      <label htmlFor="nome">
        Nome
        <input
          type="radio"
          data-testid="name-search-radio"
          name="filter"
          id="nome"
          onClick={ handleClick }
        />
      </label>

      <label htmlFor="primeira-letra">
        Primeira letra
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="filter"
          id="primeira-letra"
          onClick={ handleClick }
        />
      </label>

      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ () => handleSubmit() }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
