import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { RecipiesContext } from '../context/RecipiesContext';
import * as api from '../services/api';

export default function SearchBar({ isMealsPage }) {
  const {
    searchMealsList,
    setSearchMealsList,
    searchDrinksList,
    setSearchDrinksList,
  } = useContext(RecipiesContext);

  const [inputValue, setInputValue] = useState('');
  const [radioValue, setRadioValue] = useState('');

  const history = useHistory();

  const handleChange = ({ target }) => {
    setInputValue(target.value);
  };

  const radioClick = ({ target }) => {
    setRadioValue(target.value);
  };

  const searchRecipes = async () => {
    let result;
    switch (radioValue) {
    case 'ingredient':
      result = await api.getRecipesByIngredient(inputValue, isMealsPage);
      break;
    case 'name':
      result = await api.getRecipesByName(inputValue, isMealsPage);
      break;
    case 'first-letter':
      if (inputValue.length > 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      result = await api.getRecipesByFirstLetter(inputValue, isMealsPage);
      break;
    default:
    }
    if (isMealsPage) setSearchMealsList(result);
    else setSearchDrinksList(result);
  };

  const redirectDetails = () => {
    if (searchMealsList && searchMealsList.length === 1) {
      return history.push(`/comidas/${searchMealsList[0].idMeal}`);
    }
    if (searchDrinksList && searchDrinksList.length === 1) {
      return history.push(`/bebidas/${searchDrinksList[0].idDrink}`);
    }
  };

  const showRecipies = () => {
    if (searchMealsList === null || searchDrinksList === null) {
      return alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  };

  return (
    <div>
      <input data-testid="search-input" type="text" onChange={ handleChange } />
      <div>
        <label htmlFor="ingredient">
          Ingredientes
          <input
            id="ingredient"
            type="radio"
            data-testid="ingredient-search-radio"
            name="radio-options"
            value="ingredient"
            onClick={ radioClick }
          />
        </label>
        <label htmlFor="name">
          Nome
          <input
            id="name"
            type="radio"
            data-testid="name-search-radio"
            name="radio-options"
            value="name"
            onClick={ radioClick }
          />
        </label>
        <label htmlFor="first-letter">
          Primeira letra
          <input
            id="first-letter"
            type="radio"
            data-testid="first-letter-search-radio"
            name="radio-options"
            value="first-letter"
            onClick={ radioClick }
          />
        </label>
      </div>
      <div>
        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ searchRecipes }
        >
          Buscar
        </button>
        {redirectDetails()}
        {showRecipies()}
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  isMealsPage: PropTypes.bool.isRequired,
};
