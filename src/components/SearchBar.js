import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  getMealsByFirstLetter,
  getMealsByIngredient,
  getMealsByName,
} from '../services/apiMeals';
import {
  getDrinksByFirstLetter,
  getDrinksByIngredient,
  getDrinksByName,
} from '../services/apiDrinks';
import { RecipiesContext } from '../context/RecipiesContext';
import RecipeList from './RecipeList';

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

  const searchDrinks = async () => {
    if (radioValue === 'ingredient') {
      setSearchDrinksList(await getDrinksByIngredient(inputValue));
    }
    if (radioValue === 'name') {
      setSearchDrinksList(await getDrinksByName(inputValue));
    }
    if (radioValue === 'first-letter') {
      if (inputValue.length > 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      setSearchDrinksList(await getDrinksByFirstLetter(inputValue));
    }
  };

  const searchMeals = async () => {
    if (radioValue === 'ingredient') {
      setSearchMealsList(await getMealsByIngredient(inputValue));
    }
    if (radioValue === 'name') {
      setSearchMealsList(await getMealsByName(inputValue));
    }
    if (radioValue === 'first-letter') {
      if (inputValue.length > 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      setSearchMealsList(await getMealsByFirstLetter(inputValue));
    }
  };

  const handleClickSearch = () => {
    if (isMealsPage) return searchMeals();
    return searchDrinks();
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
    if (searchMealsList.length > 1 || searchDrinksList.length > 1) {
      return <RecipeList />;
    }
  };

  /* const renderListOfIngredients = () => {
    const ingredientsList = [];
    for (let i = 1; i <= Number('20'); i += 1) {

    }
  };

  console.log(searchMealsList[0] && searchMealsList[0]); */

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
        {showRecipies()}
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  isMealsPage: PropTypes.bool.isRequired,
};
