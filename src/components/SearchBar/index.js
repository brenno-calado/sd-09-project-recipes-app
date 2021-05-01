import React, { useContext, useState } from 'react';

import Button from 'react-bootstrap/Button';
import RecipesContext from '../../context/RecipesContext';
import {
  getDrinksByName,
  getDrinksByIngredient,
  getDrinksByFirstLetter,
} from '../../services/DrinksAPI';
import {
  getFoodByName,
  getFoodByIngredient,
  getFoodByFirstLetter,
} from '../../services/FoodAPI';

const SearchBar = () => {
  const { requestSearch } = useContext(RecipesContext);
  const [activeQuery, setActiveQuery] = useState({ query: '', filter: '' });

  const handleChange = ({ target }) => (
    setActiveQuery({ ...activeQuery, [target.name]: target.value }));

  const handleClick = () => {
    const { query, filter } = activeQuery;
    switch (filter) {
    case 'name':
      requestSearch(getFoodByName, getDrinksByName, query);
      break;
    case 'ingredient':
      requestSearch(getFoodByIngredient, getDrinksByIngredient, query);
      break;
    case 'first-letter':
      if (query.length > 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      requestSearch(getFoodByFirstLetter, getDrinksByFirstLetter, query);
      break;
    default:
      break;
    }
  };

  return (
    <div>
      <input
        name="query"
        type="text"
        data-testid="search-input"
        onChange={ (event) => handleChange(event) }
      />
      <div
        className="search-radio-container"
        onChange={ (event) => handleChange(event) }
      >
        <label htmlFor="ingredient-radio">
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            id="ingredient-radio"
            value="ingredient"
            name="filter"
          />
          Ingredientes
        </label>
        <label htmlFor="name-radio">
          <input
            type="radio"
            data-testid="name-search-radio"
            id="name-radio"
            value="name"
            name="filter"
          />
          Nome
        </label>
        <label htmlFor="first-letter-radio">
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            id="first-letter-radio"
            value="first-letter"
            name="filter"
          />
          Primeira letra
        </label>
      </div>
      <Button data-testid="exec-search-btn" onClick={ handleClick }>Buscar</Button>
    </div>
  );
};

export default SearchBar;
