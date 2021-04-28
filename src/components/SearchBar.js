import React, { useState } from 'react';

const fetchByIngredient = (ingredient) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

const fetchByName = (name) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

const fetchByFirstLetter = (firstLetter) => {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

function SearchBar() {
  const [textSearch, setTextSearch] = useState('');
  const [radioSearch, setRadioSearch] = useState();

  function handleClick() {
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
  }

  return (
    <div className="searchbar">
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
          name="radio-filter"
          id="ingredient-search"
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
          name="radio-filter"
          id="first-letter-search"
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
}

export default SearchBar;
