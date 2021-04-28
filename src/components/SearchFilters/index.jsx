import React from 'react';
import Filters from './styled';

export default function SearchFilters() {
  return (
    <Filters>
      <label htmlFor="name">
        Termo
        <input
          type="text"
          data-testid="search-input"
          id="name"
        />
      </label>
      <br />
      <label htmlFor="ingredient">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient"
          name="filter"
          value="ingredient"
        />
        Ingrediente
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          data-testid="name-search-radio"
          id="name"
          name="filter"
          value="name"
        />
        Nome
      </label>
      <label htmlFor="first-letter">
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="first-letter"
          name="filter"
          value="letters"
        />
        Primeira Letra
      </label>
      <br />
      <button type="button" data-testid="exec-search-btn">
        Buscar
      </button>
    </Filters>
  );
}
