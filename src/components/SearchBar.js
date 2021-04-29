import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { getMealsByFirstLetter, getMealsByIngredient,
  getMealsByName } from '../services/apiMeals';
import { getDrinksByFirstLetter, getDrinksByIngredient,
  getDrinksByName } from '../services/apiDrinks';
import { RecipiesContext } from '../context/RecipiesContext';

export default function SearchBar({ isMealsPage }) {
  const { searchMealsList, setSearchMealsList,
    searchDrinksList, setSearchDrinksList } = useContext(RecipiesContext);

  const [inputValue, setInputValue] = useState('');
  const [radioValue, setRadioValue] = useState('');

  const history = useHistory();

  const handleChange = ({ target }) => {
    setInputValue(target.value);
  };

  const radioClick = ({ target }) => {
    setRadioValue(target.value);
  };

  const searchDrinks = async () => {
    if (radioValue === 'ingredient') {
      const ingredient = await getDrinksByIngredient(inputValue);
      setSearchDrinksList(ingredient);
    }
    if (radioValue === 'name') {
      const drinkName = await getDrinksByName(inputValue);
      setSearchDrinksList(drinkName);
    }
    if (radioValue === 'first-letter') {
      if (inputValue.length > 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      const drinkName = await getDrinksByFirstLetter(inputValue);
      setSearchDrinksList(drinkName);
    }
  };

  const searchMeals = async () => {
    if (radioValue === 'ingredient') {
      const ingredient = await getMealsByIngredient(inputValue);
      setSearchMealsList(ingredient);
    }
    if (radioValue === 'name') {
      const mealskName = await getMealsByName(inputValue);
      setSearchMealsList(mealskName);
    }
    if (radioValue === 'first-letter') {
      if (inputValue.length > 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      const mealskName = await getMealsByFirstLetter(inputValue);
      setSearchMealsList(mealskName);
    }
  };

  console.log(searchMealsList);
  console.log(searchDrinksList);

  const handleClickSearch = () => {
    if (isMealsPage) return searchMeals();
    return searchDrinks();
  };

  const redirectDetails = () => {
    if (searchMealsList.length === 1) {
      return history.push(`/comidas/${searchMealsList[0].idMeal}`);
    }
    if (searchDrinksList.length === 1) {
      return history.push(`/bebidas/${searchDrinksList[0].idDrink}`);
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
          onClick={ handleClickSearch }
        >
          Buscar
        </button>
        {redirectDetails()}
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  isMealsPage: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
