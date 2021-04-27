import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getFoods, getDrinks, getFoodCategories, getDrinkCategories } from '../services';

export const AppContext = createContext();

const NUMBER_OF_ITEMS = 12;
const NUMBER_OF_CATEGORIES = 5;

const AppProvider = ({ children }) => {
  const [foodApiResults, setFoodApiResults] = useState([]);
  const [drinksApiResults, setDrinksApiResults] = useState([]);
  const [foodsArray, setFoodsArray] = useState([]);
  const [drinksArray, setDrinksArray] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);

  const fetchFoods = async () => {
    const response = await getFoods();
    setFoodsArray(response.slice(0, NUMBER_OF_ITEMS));
  };

  const fetchDrinks = async () => {
    const response = await getDrinks();
    setDrinksArray(response.slice(0, NUMBER_OF_ITEMS));
  };

  const fetchFoodCategories = async () => {
    const response = await getFoodCategories();
    setFoodCategories(response.slice(0, NUMBER_OF_CATEGORIES));
  };

  const fetchDrinkCategories = async () => {
    const response = await getDrinkCategories();
    setDrinkCategories(response.slice(0, NUMBER_OF_CATEGORIES));
  };

  useEffect(() => {
    fetchFoods();
    fetchDrinks();
    fetchFoodCategories();
    fetchDrinkCategories();
  }, []);

  const foods = foodApiResults.length ? foodApiResults : foodsArray;
  const drinks = drinksApiResults.length ? drinksApiResults : drinksArray;

  const context = {
    foods,
    drinks,
    foodCategories,
    drinkCategories,
    setFoodApiResults,
    setDrinksApiResults,
  };
  return (
    <AppContext.Provider value={ context }>
      { children }
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
