import React, { useContext } from 'react';

import Button from 'react-bootstrap/Button';
import RecipesContext from '../../context/RecipesContext';

const SearchBar = () => {
  const { handleChange, handleClick } = useContext(RecipesContext);

  return (
    <div>
      <input
        name="query"
        type="text"
        data-testid="search-input"
        onChange={ (event) => handleChange(event) }
      />
      <div
        className="search-radio-container"
        onChange={ (event) => handleChange(event) }
      >
        <label htmlFor="ingredient-radio">
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            id="ingredient-radio"
            value="ingredient"
            name="filter"
          />
          Ingredientes
        </label>
        <label htmlFor="name-radio">
          <input
            type="radio"
            data-testid="name-search-radio"
            id="name-radio"
            value="name"
            name="filter"
          />
          Nome
        </label>
        <label htmlFor="first-letter-radio">
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            id="first-letter-radio"
            value="first-letter"
            name="filter"
          />
          Primeira letra
        </label>
      </div>
      <Button data-testid="exec-search-btn" onClick={ handleClick }>Buscar</Button>
    </div>
  );
};

export default SearchBar;
