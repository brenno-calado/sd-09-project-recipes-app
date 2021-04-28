import React from 'react';
import './SearchBar.css';

function SearchBar() {
  const renderRadioButtons = () => (
    <div className="radio-buttons">
      <label htmlFor="ingredient-search-radio">
        <input
          type="radio"
          value="ingredient"
          data-testid="ingredient-search-radio"
          id="ingredient-search-radio"
        />
        Ingredientes
      </label>
      <label htmlFor="name-search-radio">
        <input
          type="radio"
          value="name"
          data-testid="name-search-radio"
          id="name-search-radio"
        />
        Nome
      </label>
      <label htmlFor="first-letter-search-radio">
        <input
          type="radio"
          value="first-letter"
          data-testid="first-letter-search-radio"
          id="first-letter-search-radio"
        />
        Primeira letra
      </label>
    </div>
  );

  return (
    <div className="SearchBar">
      <input type="text" data-testid="search-input" />
      {renderRadioButtons()}
      <button type="button" data-testid="exec-search-btn">Buscar</button>
    </div>
  );
}

export default SearchBar;
