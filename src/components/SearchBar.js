import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { saveFilterDataAction } from '../redux/actions';

function SearchBar() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('');

  async function fetchData(endpoint) {
    try {
      const res = await fetch(endpoint);
      const json = await res.json();
      const { meals } = json;
      dispatch(saveFilterDataAction(meals));
    } catch (err) {
      console.error('err', err);
    }
  }

  function fetchRecipe() {
    let endpoint = '';
    if (inputValue.length > 1 && filter === 'first-letter') {
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      switch (filter) {
      case 'ingredient':
        endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`;
        fetchData(endpoint);
        break;

      case 'first-letter':
        endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue.charAt(0)}`;
        fetchData(endpoint);
        break;

      case 'name':
        endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`;
        fetchData(endpoint);
        break;

      default:
        break;
      }
    }
  }

  return (
    <div data-testid="search-top-btn">
      <div className="search-bar">
        <input
          type="text"
          data-testid="search-input"
          onChange={ (event) => setInputValue(event.target.value) }
        />
        <div>
          <input
            type="radio"
            name="filter"
            value="ingredient"
            data-testid="ingredient-search-radio"
            onChange={ (event) => setFilter(event.target.value) }
          />
          <input
            type="radio"
            name="filter"
            value="name"
            data-testid="name-search-radio"
            onChange={ (event) => setFilter(event.target.value) }
          />
          <input
            type="radio"
            name="filter"
            value="first-letter"
            data-testid="first-letter-search-radio"
            onChange={ (event) => setFilter(event.target.value) }
          />
        </div>
        <button
          type="button"
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
