import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import myContext from './myContext';
import fetchFoodsAPI from '../services/fetchFoodsAPI';
import fetchDrinksAPI from '../services/fetchDrinksAPI';
import fetchFoodIngredientsAPI from '../services/fetchFoodIngredientsAPI';
import fetchDrinkIngredientsAPI from '../services/fetchDrinkIngredientsAPI';

const RecipesProvider = ({ children }) => {
  // passar os states
  const [recipesFoods, setRecipesFoods] = useState([]);
  const [recipesDrinks, setRecipesDrinks] = useState([]);
  const [foodIngredients, setFoodIngredients] = useState([]);
  const [drinkIngredients, setDrinkIngredients] = useState([]);

  // passar as funcoes
  useEffect(() => {
    fetchFoodsAPI().then((meals) => {
      setRecipesFoods(meals);
    });
  }, []);

  useEffect(() => {
    fetchDrinksAPI().then((drinks) => {
      setRecipesDrinks(drinks);
    });
  }, []);

  useEffect(() => {
    fetchFoodIngredientsAPI().then((myFoodIngredients) => {
      setFoodIngredients(myFoodIngredients);
    });
  }, []);

  useEffect(() => {
    fetchDrinkIngredientsAPI().then((myDrinkIngredients) => {
      setDrinkIngredients(myDrinkIngredients);
    });
  }, []);

  // passar o context
  const context = {
    recipesFoods,
    setRecipesFoods,
    recipesDrinks,
    setRecipesDrinks,
    foodIngredients,
    drinkIngredients,
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
