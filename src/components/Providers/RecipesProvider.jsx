import React, { useState, useEffect } from 'react';
import { shape } from 'prop-types';
import { RecipesContext } from '../../context';
import getAllRecipes from '../../services/allRecipesAPI';
import { usePathLocation } from '../../hooks';

export default function RecipesProvider({ children }) {
  const [recipesResult, setRecipesResult] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState({
    cocktails: {}, meals: {},
  });
  const [isFetching, setIsFetching] = useState(true);
  const [pathLocation] = usePathLocation();

  const value = {
    values: {
      recipesResult,
      doneRecipes,
      favoriteRecipes,
      inProgressRecipes,
      isFetching,
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

  useEffect(() => {
    const fetchAllRecipes = () => {
      setIsFetching(true);
      getAllRecipes(pathLocation)
        .then(
          (response) => setRecipesResult(response),
          (error) => console.log(error.message),
        )
        .finally(() => setIsFetching(false));
    };
    fetchAllRecipes();
  }, [pathLocation]);

  return (
    <RecipesContext.Provider value={ value }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: shape(),
}.isRequired;
