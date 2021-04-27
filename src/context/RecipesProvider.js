import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import myContext from './myContext';
import fetchFoodsAPI from '../services/fetchFoodsAPI';
import fetchDrinksAPI from '../services/fetchDrinksAPI';

const RecipesProvider = ({ children }) => {
  // passar os states
  const [recipesFoods, setRecipesFoods] = useState([]);
  const [recipesDrinks, setRecipesDrinks] = useState([]);

  // passar as funcoes
  useEffect(() => {
    fetchFoodsAPI().then((meals) => {
      setRecipesFoods(meals);
    });
  }, [recipesFoods]);

  useEffect(() => {
    fetchDrinksAPI().then((drinks) => {
      setRecipesDrinks(drinks);
    });
  }, [recipesDrinks]);

  // passar o context
  const context = {
    recipesFoods,
    setRecipesFoods,
    recipesDrinks,
    setRecipesDrinks,
  };

  // return
  return (
    <myContext.Provider value={ context }>
      {children}
    </myContext.Provider>
  );
};

RecipesProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipesProvider;
