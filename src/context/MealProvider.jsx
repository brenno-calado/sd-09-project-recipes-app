import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MealContext from './MealContext';
import {
  getMealsByName,
  getMealByIngredients,
  getMealByFirstLetter,
} from '../services/MealFetch';

const MealProvider = ({ children }) => {
  const [foods, setFoods] = useState();
  const [drinks, setDrinks] = useState();
  const [radio, setRadio] = useState('');
  const [inputValue, setInputValue] = useState('');

  function handleChangeRadio({ target: { value } }) {
    setRadio(value);
  }

  function filters(input) {
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

    console.clear();
    console.log(foods);
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
