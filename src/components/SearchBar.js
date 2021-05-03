import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
// import RecipeCard from './RecipeCard';
import RecipesContext from '../Provider/RecipesContext';

function SearchBar({ title }) {
  console.log(title);
  const {
    setFoodsListBySearchResult, setDrinksListBySearchResult,
  } = useContext(RecipesContext);
  const [textSearch, setTextSearch] = useState('');
  const [radioSearch, setRadioSearch] = useState();
  const alertMsg = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

  async function fetchByIngredient(ingredient) {
    try {
      const endpoint = title === 'Comidas'
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
        : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
      const fetchResponse = await fetch(endpoint);
      const jsonResponse = await fetchResponse.json();
      if (jsonResponse.meals === null && title === 'Comidas') {
        alert(alertMsg);
        return;
      }
      if (jsonResponse.drinks === null && title === 'Bebidas') {
        alert(alertMsg);
        return;
      }
      if (title === 'Comidas') setFoodsListBySearchResult(jsonResponse.meals);
      else setDrinksListBySearchResult(jsonResponse.drinks);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchByName(name) {
    try {
      const endpoint = title === 'Comidas'
        ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
        : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
      const fetchResponse = await fetch(endpoint);
      const jsonResponse = await fetchResponse.json();
      if (jsonResponse.meals === null) {
        alert(alertMsg);
        return;
      }
      if (jsonResponse.drinks === null && title === 'Bebidas') {
        alert(alertMsg);
        return;
      }
      if (title === 'Comidas') setFoodsListBySearchResult(jsonResponse.meals);
      else setDrinksListBySearchResult(jsonResponse.drinks);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchByFirstLetter(firstLetter) {
    try {
      const endpoint = title === 'Comidas'
        ? `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`
        : `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
      const fetchResponse = await fetch(endpoint);
      const jsonResponse = await fetchResponse.json();
      if (jsonResponse.meals === null) {
        alert(alertMsg);
        return;
      }
      if (jsonResponse.drinks === null && title === 'Bebidas') {
        alert(alertMsg);
        return;
      }
      if (title === 'Comidas') setFoodsListBySearchResult(jsonResponse.meals);
      else setDrinksListBySearchResult(jsonResponse.drinks);
    } catch (error) {
      console.error(error);
    }
  }

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

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SearchBar;
