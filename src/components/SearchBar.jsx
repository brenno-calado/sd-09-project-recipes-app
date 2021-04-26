import React from 'react';

function SearchBar() {
  return (
    <div>
      <h3>SearchBar</h3>
      <input data-testid="search-input" />
      <input type="radio" data-testid="ingredient-search-radio" />
      <input type="radio" data-testid="name-search-radio" />
      <input type="radio" data-testid="first-letter-search-radio" />
      <button type="button" data-testid="exec-search-btn">Procurar</button>
    </div>
  );
}

export default SearchBar;
