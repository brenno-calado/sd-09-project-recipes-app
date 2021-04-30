import React from 'react';
import './Search.css';

function Search() {
  return (
    <div className="search-container">
      <form onSubmit={ ' ' }>
        <input
          onChange={ ' ' }
          type="text"
          value={ ' ' }
          className="input-search"
          data-testid="search-input"
        />
        <section className="radio">
          <label htmlFor="ingredients">
            Ingredientes:
            <input
              data-testid="ingredient-search-radio"
              type="radio"
              value="ing"
              onChange={ ' ' }
              name="filter"
              id="ingredients"
            />
          </label>
          <label htmlFor="name">
            Nome:
            <input
              data-testid="name-search-radio"
              type="radio"
              value="name"
              onChange={ ' ' }
              name="filter"
              id="name"
            />
          </label>
          <label htmlFor="first">
            Primeira Letra:
            <input
              data-testid="first-letter-search-radio"
              type="radio"
              value="first"
              onChange={ ' ' }
              id="first"
              name="filter"
            />
          </label>
        </section>
        <button data-testid="exec-search-btn" type="submit">Buscar</button>
      </form>
    </div>
  );
}

export default Search;
