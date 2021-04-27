import React from 'react';

export default function SearchBar() {
  return (
    <div>
      <button data-testid="search-top-btn" type="button">Fake</button>
      <input data-testid="search-input" type="text" />
      <input type="radio" data-testid="ingredient-search-radio" />
      <input type="radio" data-testid="name-search-radio" />
      <input type="radio" data-testid="first-letter-search-radio" />
      <button data-testid="exec-search-btn" type="button">Buscar</button>
    </div>
  );
}
