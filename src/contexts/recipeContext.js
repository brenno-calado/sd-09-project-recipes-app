import React, { createContext, useContext, useState } from 'react';
import { shape } from 'prop-types';
import useClickFetch from '../hooks/useClickFetch';

const RecipeContext = createContext();

export function RecipeContextProvider({ children }) {
  const [recipesData,
    handleFetchFoodClick,
    handleFetchDrinkClick,
    handleCheck,
    getInputValue,
    handleFetchRecipes] = useClickFetch();

  const [mealsToken] = useState(1);
  const [cocktailsToken] = useState(1);
  const [isSearchBar, setIsSearchBar] = useState(false);

  function handleChangeSearchBar() {
    setIsSearchBar(!isSearchBar);
    console.log('clicado');
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
    handleFetchRecipes,
  };

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
