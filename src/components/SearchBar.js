import React, { useState } from 'react';
import getFilteredRecipes from '../services/api';

function SearchBar() {
  const [searchState, setSearchState] = useState({ search: '', radioButton: '' });

  const handleChange = ({ target: { value } }) => {
    setSearchState({ ...searchState, search: value });
  };

  const handleClick = ({ target: { name } }) => {
    setSearchState({ ...searchState, radioButton: name });
  };

  const handleSubmit = () => {
    const { search, radioButton } = searchState;
    console.log(getFilteredRecipes(search, radioButton));
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

      <label htmlFor="ingredient">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="ingrediente"
          onClick={ handleClick }
        />
        Ingrediente
      </label>

      <label htmlFor="ingredient">
        <input
          type="radio"
          data-testid="name-search-radio"
          name="nome"
          onClick={ handleClick }
        />
        Nome
      </label>

      <label htmlFor="ingredient">
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="primeira-letra"
          onClick={ handleClick }
        />
        Primeira letra
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
