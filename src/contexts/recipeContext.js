import React, { createContext, useContext, useState } from 'react';
import { shape } from 'prop-types';
import {
  getRecipeByIngredient,
  getRecipeByName,
  getRecipeByFirstLetter,
  getDrinkByIngredient,
  getDrinkByName,
  getDrinkByFirstLetter } from '../services/fetchApi';

const RecipeContext = createContext();

export function RecipeContextProvider({ children }) {
  const [mealsToken] = useState(1);
  const [cocktailsToken] = useState(1);
  const [isSearchBar, setIsSearchBar] = useState(false);
  const [recipesData, setRecipesData] = useState([]);
  const [inputValue, setInputvalue] = useState('');
  const [checkValue, setCheckValue] = useState('');

  function handleCheck({ target }) {
    const { value } = target;
    setCheckValue(value);
  }

  async function handleFetchFoodClick() {
    if (checkValue === 'ingredient') {
      const apiData = await getRecipeByIngredient(inputValue);
      setRecipesData(apiData);
    }
    if (checkValue === 'name') {
      const apiData = await getRecipeByName(inputValue);
      setRecipesData(apiData);
    }
    if (checkValue === 'firstLetter') {
      if (inputValue.length > 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
      }
      const apiData = await getRecipeByFirstLetter(inputValue);
      setRecipesData(apiData);
    }
  }

  async function handleFetchDrinkClick() {
    if (checkValue === 'ingredient') {
      const apiData = await getDrinkByIngredient(inputValue);
      setRecipesData(apiData);
    }
    if (checkValue === 'name') {
      const apiData = await getDrinkByName(inputValue);
      setRecipesData(apiData);
    }
    if (checkValue === 'firstLetter') {
      if (inputValue.length > 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
      }
      const apiData = await getDrinkByFirstLetter(inputValue);
      setRecipesData(apiData);
    }
  }

  function getInputValue({ target }) {
    const { value } = target;
    setInputvalue(value);
  }

  function handleChangeSearchBar() {
    setIsSearchBar(!isSearchBar);
  }

  function handleLocalStorage() {
    localStorage.setItem('mealsToken', mealsToken);
    localStorage.setItem('cocktailsToken', cocktailsToken);
  }

  const context = {
    handleLocalStorage,
    handleChangeSearchBar,
    isSearchBar,
    handleCheck,
    getInputValue,
    handleFetchFoodClick,
    handleFetchDrinkClick,
    recipesData,
  };
  console.log(recipesData);
  return (
    <RecipeContext.Provider value={ context }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeContextProvider.propTypes = {
  children: shape().isRequired,
};

export function useRecipeContext() {
  return useContext(RecipeContext);
}
