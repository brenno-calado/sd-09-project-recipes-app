import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getMealsByFirstLetter, getMealsByIngredient,
  getMealsByName } from '../services/apiMeals';
import { getDrinksByFirstLetter, getDrinksByIngredient,
  getDrinksByName } from '../services/apiDrinks';

export default function SearchBar({ isMealsPage }) {
  const [inputValue, setInputValue] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [searchItemList, setSearchItemList] = useState([]);

  const handleChange = ({ target }) => {
    setInputValue(target.value);
  };

  const radioClick = ({ target }) => {
    setRadioValue(target.value);
  };
  console.log(radioValue);

  const searchDrinks = async () => {
    if (radioValue === 'ingredient') {
      const ingredient = await getDrinksByIngredient(inputValue, 'thecoktal/fdvc=?');
      setSearchItemList(ingredient);
    }
    if (radioValue === 'name') {
      const drinkName = await getDrinksByName(inputValue);
      setSearchItemList(drinkName);
    }
    if (radioValue === 'first-letter') {
      if (inputValue.length > 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      const drinkName = await getDrinksByFirstLetter(inputValue);
      setSearchItemList(drinkName);
    }
  };

  const searchMeals = async () => {
    if (radioValue === 'ingredient') {
      const ingredient = await getMealsByIngredient(inputValue);
      setSearchItemList(ingredient);
    }
    if (radioValue === 'name') {
      const mealskName = await getMealsByName(inputValue);
      setSearchItemList(mealskName);
    }
    if (radioValue === 'first-letter') {
      if (inputValue.length > 1) {
        return alert('Sua busca deve conter somente 1 (um) caracter');
      }
      const mealskName = await getMealsByFirstLetter(inputValue);
      setSearchItemList(mealskName);
    }
  };

  const handleClickSearch = () => {
    if (isMealsPage) return searchMeals();
    return searchDrinks();
  };

  console.log(searchItemList);

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
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  isMealsPage: PropTypes.bool.isRequired,
};
