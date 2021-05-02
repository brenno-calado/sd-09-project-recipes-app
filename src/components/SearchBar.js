import React, { useState } from 'react';
import PropTypes from 'prop-types';

async function fetchByIngredient(ingredient, title) {
  try {
    const endpoint = title === 'Comidas'
      ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const fetchResponse = await fetch(endpoint);
    const jsonResponse = await fetchResponse.json();
    console.log(jsonResponse);
  } catch (error) {
    console.error(error);
  }
}

async function fetchByName(name, title) {
  try {
    const endpoint = title === 'Comidas'
      ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
      : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
    const fetchResponse = await fetch(endpoint);
    const jsonResponse = await fetchResponse.json();
    console.log(jsonResponse);
  } catch (error) {
    console.error(error);
  }
}

async function fetchByFirstLetter(firstLetter, title) {
  try {
    const endpoint = title === 'Comidas'
      ? `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`
      : `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
    const fetchResponse = await fetch(endpoint);
    const jsonResponse = await fetchResponse.json();
    console.log(jsonResponse);
  } catch (error) {
    console.error(error);
  }
}

function SearchBar({ title }) {
  const [textSearch, setTextSearch] = useState('');
  const [radioSearch, setRadioSearch] = useState();

  function handleClick() {
    if (radioSearch === 'ingredient-search') {
      fetchByIngredient(textSearch, title);
    }
    if (radioSearch === 'name-search') {
      fetchByName(textSearch, title);
    }
    if (radioSearch === 'first-letter-search') {
      if (textSearch.length === 1) {
        fetchByFirstLetter(textSearch, title);
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

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SearchBar;
