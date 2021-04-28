import React from 'react';

export default function SearchBar() {
  return (
    <div data-testid="search-top-btn">
      <div className="search-bar">
        <input type="text" data-testid="search-input" />
        <div>
          <input
            type="radio"
            name="filter"
            value="ingredient"
            data-testid="ingredient-search-radio"
          />
          <input
            type="radio"
            name="filter"
            value="name"
            data-testid="name-search-radio"
          />
          <input
            type="radio"
            name="filter"
            value="first-letter"
            data-testid="first-letter-search-radio"
          />
        </div>
        <button type="button" data-testid="exec-search-btn">Buscar</button>
      </div>
    </div>
  );
}
