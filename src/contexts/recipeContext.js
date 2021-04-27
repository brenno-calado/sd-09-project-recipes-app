import React, { createContext, useContext, useState } from 'react';
import { shape } from 'prop-types';

const RecipeContext = createContext();

export function RecipeContextProvider({ children }) {
  const [mealsToken] = useState(1);
  const [cocktailsToken] = useState(1);

  function handleLocalStorage() {
    localStorage.setItem('mealsToken', mealsToken);
    localStorage.setItem('cocktailsToken', cocktailsToken);
  }

  return (
    <RecipeContext.Provider value={ { handleLocalStorage } }>
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
