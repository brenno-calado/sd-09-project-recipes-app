import React, { createContext, useContext, useState } from 'react';

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

export function useRecipeContext() {
  return useContext(RecipeContext);
}
