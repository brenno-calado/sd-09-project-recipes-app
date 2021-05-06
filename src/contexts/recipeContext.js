import React, { createContext, useContext, useState } from 'react';
import { shape } from 'prop-types';
import useClickFetch from '../hooks/useClickFetch';

const RecipeContext = createContext();

export function RecipeContextProvider({ children }) {
  const [recipesData,
    setRecipesData,
    handleFetchFoodClick,
    handleFetchDrinkClick,
    handleCheck,
    getInputValue,
    getRecipes,
    getRecipesByCategory,
    getRecipesFoodsFilterByCategory,
    getRecipesDrinksFilterByCategory,
    getRecipesRandom,
    getLocations,
    getRecipesByLocations,
    getIngredients,
    setCheckValue,
    setInputValue,
    renderRecipesByIngredients] = useClickFetch();

  const [mealsToken] = useState(1);
  const [cocktailsToken] = useState(1);
  const [isSearchBar, setIsSearchBar] = useState(false);

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
    setRecipesData,
    getRecipes,
    getRecipesByCategory,
    getRecipesFoodsFilterByCategory,
    getRecipesDrinksFilterByCategory,
    getRecipesRandom,
    getLocations,
    getRecipesByLocations,
    getIngredients,
    setCheckValue,
    setInputValue,
    renderRecipesByIngredients,
  };

  return (
    <RecipeContext.Provider value={ context }>
      {children }
    </RecipeContext.Provider>
  );
}

RecipeContextProvider.propTypes = {
  children: shape().isRequired,
};

export function useRecipeContext() {
  return useContext(RecipeContext);
}
