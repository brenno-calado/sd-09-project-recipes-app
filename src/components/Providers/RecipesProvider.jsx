import React, { useState, useEffect } from 'react';
import { shape } from 'prop-types';
import { RecipesContext } from '../../context';

export default function RecipesProvider({ children }) {
  const [recipesResult, setRecipesResult] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState({
    cocktails: {}, meals: {},
  });

  const value = {
    values: {
      recipesResult,
      doneRecipes,
      favoriteRecipes,
      inProgressRecipes,
    },
    actions: {
      setRecipesResult,
      addRecipeToDone(recipeObj) {
        setDoneRecipes([...doneRecipes, recipeObj]);
      },
      addRecipeToFavorites(recipeObj) {
        setFavoriteRecipes([...favoriteRecipes, recipeObj]);
      },
      addRecipeToInProgress(recipeObj) {
        setInProgressRecipes([...inProgressRecipes, recipeObj]);
      },
    },
  };

  useEffect(() => {
    Object.keys(value.values).forEach((key) => (
      localStorage.setItem(key, value.values[key])
    ));
  }, [doneRecipes, favoriteRecipes, inProgressRecipes, value.values]);

  return (
    <RecipesContext.Provider value={ value }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: shape(),
}.isRequired;
