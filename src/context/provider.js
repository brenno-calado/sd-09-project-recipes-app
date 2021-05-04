import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './context';
import fetchApi from '../services/index';

const Provider = ({ children }) => {
  // [user, setUser] = useState('');
  const [mealCategories, setMealCategories] = useState([]);
  const [mealIngredients, setMealIngredients] = useState([]);
  const [mealArea, setMealArea] = useState([]);
  const [drinksCategories, setDrinksCategories] = useState([]);
  const [drinksIngredients, setDrinksIngredients] = useState([]);
  const [searchFilter, setSearchFilter] = useState([]);
  const [handleCards, setHandleCards] = useState([]);

  const getApiData = async () => {
    const mealCategoryApi = await fetchApi.fetchMealCategories();
    const mealAreaApi = await fetchApi.fetchMealByArea();
    const mealIngredientApi = await fetchApi.fetchMealByIngredients();
    const drinksCategoriesApi = await fetchApi.fetchDrinkCategories();
    const drinksIngredientsApi = await fetchApi.fetchDrinkByIngredients();

    setMealCategories(mealCategoryApi);
    setMealIngredients(mealIngredientApi);
    setMealArea(mealAreaApi);
    setDrinksCategories(drinksCategoriesApi);
    setDrinksIngredients(drinksIngredientsApi);
  };

  useEffect(() => {
    getApiData();
  }, []);

  const providerData = {
    // user,
    // setUser,
    mealCategories,
    mealIngredients,
    mealArea,
    drinksCategories,
    drinksIngredients,
    searchFilter,
    setSearchFilter,
    handleCards,
    setHandleCards,
  };

  return (
    <MyContext.Provider value={ providerData }>
      {children}
    </MyContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
