import React from 'react';

function SearchBar() {
  return (
    <section>
      <input
        type="text"
        data-testid="search-input"
        plceholder="Buscar Receita"
      />
      <label htmlFor="ingredient-radio">
        <input
          type="radio"
          id="ingredient-radio"
          name="radio-search"
          data-testid="ingredient-search-radio"
        />
        Ingrediente
      </label>
      <label htmlFor="name-radio">
        <input
          type="radio"
          id="name-radio"
          name="radio-search"
          data-testid="name-search-radio"
        />
        Nome
      </label>
      <label htmlFor="first-letter-radio">
        <input
          type="radio"
          id="first-letter-radio"
          name="radio-search"
          data-testid="first-letter-search-radio"
        />
        Primeira-letra
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
    </section>
  );
}

export default SearchBar;
