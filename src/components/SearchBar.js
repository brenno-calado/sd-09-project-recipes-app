import React, { useState } from 'react';
import { fetchByIngredient, fetchByName, fetchByFirstLetter } from '../services/mealsAPI';

const SearchBar = () => {
  const [textSearch, setTextSearch] = useState('');
  const [radioSearch, setRadioSearch] = useState();

  const handleClick = () => {
    if (radioSearch === 'ingredient-search') {
      fetchByIngredient(textSearch);
    }
    if (radioSearch === 'name-search') {
      fetchByName(textSearch);
    }
    if (radioSearch === 'first-letter-search') {
      if (textSearch.length === 1) {
        fetchByFirstLetter(textSearch);
      } else {
        alert('Sua busca deve conter somente 1 (um) caracter');
      }
    }
  };

  return (
    <div>
      <label htmlFor="search">
        Search
        <input
          type="text"
          data-testid="search-input"
          name="search"
          id="search"
          value={ textSearch }
          onChange={ ({ target: { value } }) => setTextSearch(value) }
        />
      </label>

      <label htmlFor="ingredient-search">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient-search"
          name="radio-filter"
          onClick={ ({ target: { id } }) => setRadioSearch(id) }
        />
        Ingrediente
      </label>

      <label htmlFor="name-search">
        <input
          type="radio"
          data-testid="name-search-radio"
          id="name-search"
          name="radio-filter"
          onClick={ ({ target: { id } }) => setRadioSearch(id) }
        />
        Nome
      </label>

      <label htmlFor="first-letter-search">
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="first-letter-search"
          name="radio-filter"
          onClick={ ({ target: { id } }) => setRadioSearch(id) }
        />
        Primeira letra
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
