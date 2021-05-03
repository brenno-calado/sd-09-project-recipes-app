import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import RecipesContext from './RecipesContext';

function Provider({ children }) {
  const [login, setLogin] = useState('login');
  const [foodsList, setFoodsList] = useState([]);
  const [drinksList, setDrinksList] = useState([]);
  const [fetchingFoods, setFetchingFoods] = useState(true);
  const [fetchingDrinks, setFetchingDrinks] = useState(true);
  const [selectedFoodsCategory, setSelectedFoodsCategory] = useState('All');
  const [selectedDrinksCategory, setSelectedDrinksCategory] = useState('All');

  useEffect(() => {
    async function fetchFoodsList() {
      try {
        setFetchingFoods(true);
        const endpoint = selectedFoodsCategory === 'All'
          ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
          : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedFoodsCategory}`;
        const fetchResponse = await fetch(endpoint);
        const jsonResponse = await fetchResponse.json();
        setFoodsList(jsonResponse.meals);
        setFetchingFoods(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchFoodsList();
  }, [selectedFoodsCategory]);

  useEffect(() => {
    async function fetchDrinksList() {
      try {
        setFetchingDrinks(true);
        const endpoint = selectedDrinksCategory === 'All'
          ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
          : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${selectedDrinksCategory}`;
        const fetchResponse = await fetch(endpoint);
        const jsonResponse = await fetchResponse.json();
        setDrinksList(jsonResponse.drinks);
        setFetchingDrinks(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDrinksList();
  }, [selectedDrinksCategory]);

  function setFoodsListBySearchResult(recipeList) {
    setFoodsList(recipeList);
    selectedFoodsCategory('');
  }

  function setDrinksListBySearchResult(recipeList) {
    setDrinksList(recipeList);
    selectedDrinksCategory('');
  }
  const contextValue = {
    login,
    setLogin,
    foodsList,
    drinksList,
    fetchingFoods,
    fetchingDrinks,
    selectedFoodsCategory,
    setSelectedFoodsCategory,
    selectedDrinksCategory,
    setSelectedDrinksCategory,
    setFoodsListBySearchResult,
    setDrinksListBySearchResult,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      { children }
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: node,
}.isRequired;

export default Provider;
