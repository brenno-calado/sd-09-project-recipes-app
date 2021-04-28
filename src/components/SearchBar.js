import React from 'react';

export default function SearchBar() {
  return (
    <div className="search-bar">
      <input type="text" data-testid="search-input" />
      <div>
        <span>Ingrediente</span>
        <input
          type="radio"
          name="filter"
          value="ingredient"
          data-testid="ingredient-search-radio"
        />
        <span>Nome</span>
        <input
          type="radio"
          name="filter"
          value="name"
          data-testid="name-search-radio"
        />
        <span> Primeira letra</span>
        <input
          type="radio"
          name="filter"
          value="first-letter"
          testid="first-letter-search-radio"
        />
      </div>
      <button type="button" data-testid="exec-search-btn">Buscar</button>
    </div>
  );
}
