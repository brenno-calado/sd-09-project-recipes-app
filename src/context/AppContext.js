import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getFoods, getDrinks } from '../services';

export const AppContext = createContext();

const NUMBER_OF_ITEMS = 12;

const AppProvider = ({ children }) => {
  const [foodApiResults, setFoodApiResults] = useState([]);
  const [drinksApiResults, setDrinksApiResults] = useState([]);
  const [foodsArray, setFoodsArray] = useState([]);
  const [drinksArray, setDrinksArray] = useState([]);

  const fetchFoods = async () => {
    const response = await getFoods();
    setFoodsArray(response.slice(0, NUMBER_OF_ITEMS));
  };

  const fetchDrinks = async () => {
    const response = await getDrinks();
    setDrinksArray(response.slice(0, NUMBER_OF_ITEMS));
  };

  useEffect(() => {
    fetchFoods();
    fetchDrinks();
  }, []);

  const foods = foodApiResults.length && foodApiResults !== 'null'
    ? foodApiResults : foodsArray;
  const drinks = drinksApiResults.length && drinksApiResults !== 'null'
    ? drinksApiResults : drinksArray;

  const context = {
    foods,
    drinks,
    setFoodApiResults,
    setDrinksApiResults,
    foodApiResults,
    drinksApiResults,
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
