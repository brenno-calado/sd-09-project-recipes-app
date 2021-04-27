import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import RecipesContext from './RecipesContext';

function Provider({ children }) {
  const [login, setLogin] = useState('login');
  const [foodsList, setFoodsList] = useState([]);
  const [drinksList, setDrinksList] = useState([]);
  const [fetchingFoods, setFetchingFoods] = useState(true);
  const [fetchingDrinks, setFetchingDrinks] = useState(true);

  useEffect(() => {
    async function fetchFoodsList() {
      try {
        const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const fetchResponse = await fetch(endpoint);
        const jsonResponse = await fetchResponse.json();
        setFoodsList(jsonResponse.meals);
        setFetchingFoods(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchFoodsList();
  }, []);

  useEffect(() => {
    async function fetchDrinksList() {
      try {
        const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        const fetchResponse = await fetch(endpoint);
        const jsonResponse = await fetchResponse.json();
        setDrinksList(jsonResponse.drinks);
        setFetchingDrinks(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDrinksList();
  }, []);

  const contextValue = {
    login,
    setLogin,
    foodsList,
    drinksList,
    fetchingFoods,
    fetchingDrinks,
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
