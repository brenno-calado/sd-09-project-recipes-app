import React, { createContext, useState } from 'react';
import { node } from 'prop-types';

export const RecipeContext = createContext();

export const Provider = ({ children }) => {
  const [recipies, setRecipies] = useState([]);
  const [typeRecipies, setTypeRecipies] = useState('');
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const [recipeSpec, setRecipeSpec] = useState({});
  // const [mealsCategory, setMealsCategory] = useState([]);
  // const [drinksCategory, setDrinksCategory] = useState([]);
  const value = {
    recipies,
    setRecipies,
    typeRecipies,
    setTypeRecipies,
    setDisplaySearchBar,
    displaySearchBar,
    recipeSpec,
    setRecipeSpec,
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
