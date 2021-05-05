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
  const [foods, setFoods] = useState([]);
  const [radio, setRadio] = useState('');
  const [inputValue, setInputValue] = useState('');

  const notFound = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

  function handleChange({ target: { value } }) {
    setInputValue(value);
  }

  function handleChangeRadio({ target: { value } }) {
    setRadio(value);
  }

  function foodFilter(input) {
    if (radio === 'name' || radio === '') {
      getMealsByName(inputValue)
        .then((response) => {
          if (response < 1) return alert(notFound);
          setFoods(response);
        });
    }

    if (radio === 'ingredient') {
      getMealByIngredients(input)
        .then((response) => setFoods(response));
    }

    if (radio === 'letter' && input.length === 1) {
      getMealByFirstLetter(input)
        .then((response) => setFoods(response));
    } else if (radio === 'letter' && input.length > 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }

  function drinkFilter(input) {
    if (radio === 'name' || radio === '') {
      getDrinkByName(inputValue)
        .then((response) => {
          if (response < 1) return alert(notFound);
          setFoods(response);
        });
    }

    if (radio === 'ingredient') {
      getDrinkByIngredients(input)
        .then((response) => setFoods(response));
    }

    if (radio === 'letter' && input.length === 1) {
      getDrinkByFirstLetter(input)
        .then((response) => setFoods(response));
    } else if (radio === 'letter' && input.length > 1) {
      return alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }

  function filters() {
    if (window.location.href.match(/comidas$/)) {
      foodFilter(inputValue);
    }

    if (window.location.href.match(/bebidas$/)) {
      drinkFilter(inputValue);
    }
  }

  const context = {
    foods,
    setFoods,
    radio,
    handleChangeRadio,
    handleChange,
    filters,
    inputValue,
    foodFilter,
    drinkFilter,
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
