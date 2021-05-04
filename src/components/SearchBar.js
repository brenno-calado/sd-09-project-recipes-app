import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { receiveDataDrink, saveFilterDataAction } from '../redux/actions';
import useRouter from '../hooks/router';

function SearchBar() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('');
  const router = useRouter();
  const path = router.pathname === '/comidas';

  async function fetchDrinks(endpoint) {
    try {
      const res = await fetch(endpoint);
      const json = await res.json();
      const { drinks } = json;
      dispatch(receiveDataDrink(drinks));
      if (drinks.length === 1 && !path) router.push(`/bebidas/${drinks[0].idDrink}`);
    } catch (err) {
      console.error('err', err);
    }
  }

  async function fetchMeals(endpoint) {
    try {
      const res = await fetch(endpoint);
      const json = await res.json();
      const { meals } = json;
      dispatch(saveFilterDataAction(meals));
      if (meals.length === 1) router.push(`/comidas/${meals[0].idMeal}`);
    } catch (err) {
      console.error('err', err);
    }
  }

  async function fetchData(endpoint) {
    if (path) {
      fetchMeals(endpoint);
    } else {
      fetchDrinks(endpoint);
    }
  }

  function fetchRecipe() {
    let endpoint = '';
    if (inputValue.length > 1 && filter === 'first-letter') {
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      switch (filter) {
      case 'ingredient':
        endpoint = path
          ? `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`
          : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputValue}`;
        fetchData(endpoint);
        break;

      case 'first-letter':
        endpoint = path
          ? `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue.charAt(0)}`
          : `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`;
        fetchData(endpoint);
        break;

      case 'name':
        endpoint = path
          ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`
          : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`;
        fetchData(endpoint);
        break;

      default:
        break;
      }
    }
  }

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          data-testid="search-input"
          className="text-input"
          onChange={ (event) => setInputValue(event.target.value) }
        />
        <div>
          <input
            type="radio"
            name="filter"
            value="ingredient"
            className="radio-btn"
            data-testid="ingredient-search-radio"
            onChange={ (event) => setFilter(event.target.value) }
          />
          <input
            type="radio"
            name="filter"
            value="name"
            className="radio-btn"
            data-testid="name-search-radio"
            onChange={ (event) => setFilter(event.target.value) }
          />
          <input
            type="radio"
            name="filter"
            value="first-letter"
            className="radio-btn"
            data-testid="first-letter-search-radio"
            onChange={ (event) => setFilter(event.target.value) }
          />
        </div>
        <button
          type="button"
          className="search-btn"
          data-testid="exec-search-btn"
          onClick={ () => fetchRecipe() }
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

export default connect()(SearchBar);
