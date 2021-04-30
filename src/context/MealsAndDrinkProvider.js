import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MealsAndDrinkContext from './MealsAndDrinkContext';

function MealsAndDrinkProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [page, setPage] = useState('comidas');

  const context = {
    meals, setMeals, drinks, setDrinks, page, setPage };
  return (
    <main>
      <MealsAndDrinkContext.Provider value={ context }>
        { children }
      </MealsAndDrinkContext.Provider>
    </main>
  );
}

MealsAndDrinkProvider.propTypes = { children: PropTypes.element }.isRequired;

export default MealsAndDrinkProvider;
