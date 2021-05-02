import React from 'react';
import Button from 'react-bootstrap/Button';

const SearchBar = () => {
  const handleChange = (event) => {
    console.log(event.target.value);
  };
  return (
    <div>
      <input type="text" data-testid="search-input" />
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
            name="search-radio"
          />
          Ingredientes
        </label>
        <label htmlFor="name-radio">
          <input
            type="radio"
            data-testid="name-search-radio"
            id="name-radio"
            value="name"
            name="search-radio"
          />
          Nome
        </label>
        <label htmlFor="first-letter-radio">
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            id="first-letter-radio"
            value="first-letter"
            name="search-radio"
          />
          Primeira letra
        </label>
      </div>
      <Button data-testid="exec-search-btn">Buscar</Button>
    </div>
  );
};

export default SearchBar;
