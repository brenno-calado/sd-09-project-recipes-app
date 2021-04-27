import React, { createContext, useState } from 'react';
import { node } from 'prop-types';

export const RecipeContext = createContext();

export const Provider = ({ children }) => {
  const [recipies, setRecipies] = useState([]);
  const value = {
    recipies,
    setRecipies,
  };
  return (
    <RecipeContext.Provider value={ value }>
      { children }
    </RecipeContext.Provider>
  );
};

Provider.propTypes = {
  children: node.isRequired,
};
