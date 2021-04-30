import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MealContext from './MealContext';
import {
  getMealsByName,
  getMealByIngredients,
  getMealByFirstLetter,
} from '../services/MealFetch';
import {
  getDrinkByName,
  getDrinkByFirstLetter,
  getDrinkByIngredients,
} from '../services/DrinkFetch';

const MealProvider = ({ children }) => {
  const [foods, setFoods] = useState();
  const [drinks, setDrinks] = useState();
  const [radio, setRadio] = useState('');
  const [inputValue, setInputValue] = useState('');

  function handleChangeRadio({ target: { value } }) {
    setRadio(value);
  }

  function foodFilter(input) {
    if (radio === 'name') {
      getMealsByName(input)
        .then((response) => setFoods(response));
    }

    if (radio === 'ingredient') {
      getMealByIngredients(input)
        .then((response) => setFoods(response));
    }

    if (radio === 'letter' && input.length === 1) {
      getMealByFirstLetter(input)
        .then((response) => setFoods(response));
    } else if (radio === 'letter' && input.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }

  function drinkFilter(input) {
    if (radio === 'name') {
      getDrinkByName(input)
        .then((response) => setFoods(response));
    }

    if (radio === 'ingredient') {
      getDrinkByIngredients(input)
        .then((response) => setFoods(response));
    }

    if (radio === 'letter' && input.length === 1) {
      getDrinkByFirstLetter(input)
        .then((response) => setFoods(response));
    } else if (radio === 'letter' && input.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }

  function filters(input) {
    if (window.location.href.match(/comidas$/)) {
      foodFilter(input);
    }

    if (window.location.href.match(/bebidas$/)) {
      drinkFilter(input);
    }
  }

  const context = {
    foods,
    setFoods,
    drinks,
    setDrinks,
    radio,
    handleChangeRadio,
    filters,
    inputValue,
    setInputValue,
  };

  return (
    <MealContext.Provider value={ context }>
      { children }
    </MealContext.Provider>
  );
};

MealProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MealProvider;
