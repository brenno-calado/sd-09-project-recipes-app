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
        Ingrediente:
        <input
          type="text"
          id="ingredient-radio"
          name="radio-search"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name-radio">
        <input
          type="text"
          id="name-radio"
          name="radio-search"
          data-testid="name-search-radio"
        />
      </label>
      <label htmlFor="first-letter-radio">
        <input
          type="text"
          id="first-letter-radio"
          name="radio-search"
          data-testid="first-letter-search-radio"
        />
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
