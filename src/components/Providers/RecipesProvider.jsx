import React, { useState } from 'react';
import { shape } from 'prop-types';
import { RecipesContext } from '../../context';

export default function RecipesProvider({ children }) {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState({
    cocktails: {}, meals: {},
  });

  const value = {
    values: {
      doneRecipes,
      favoriteRecipes,
      inProgressRecipes,
    },
    actions: {
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
    Object.keys(values.value).forEach((key) => (
      localStorage.setItem(key, values.value[key])
    ));
  }, [doneRecipes, favoriteRecipes, inProgressRecipes]);

  return (
    <RecipesContext.Provider value={ value }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: shape(),
}.isRequired;
