import { useState } from 'react';
import {
  getRecipes,
  getRecipeByIngredient,
  getRecipeByName,
  getRecipeByFirstLetter,
  getDrinkByIngredient,
  getDrinkByName,
  getDrinkByFirstLetter,
  getRecipesFoodsFilterByCategory,
  getRecipesDrinksFilterByCategory,
  getRecipesByCategory } from '../services/fetchApi';

function useClickFetch() {
  const [recipesData, setRecipesData] = useState({});
  const [checkValue, setCheckValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  function handleCheck({ target }) {
    const { value } = target;
    setCheckValue(value);
  }

  function getInputValue({ target }) {
    const { value } = target;
    setInputValue(value);
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

  async function handleFetchRecipes(type) {
    const apiData = await getRecipes(type);
    setRecipesData(apiData);
  }

  return [
    recipesData,
    handleFetchFoodClick,
    handleFetchDrinkClick,
    handleCheck,
    getInputValue,
    handleFetchRecipes,
    getRecipesByCategory,
    getRecipesFoodsFilterByCategory,
    getRecipesDrinksFilterByCategory,
  ];
}

export default useClickFetch;
