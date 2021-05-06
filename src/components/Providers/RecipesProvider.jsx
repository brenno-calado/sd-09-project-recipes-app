import React, { useState, useEffect } from 'react';
import { shape } from 'prop-types';
import { RecipesContext } from '../../context';
import getAllRecipes from '../../services/allRecipesAPI';
import { usePathLocation, useRecipes } from '../../hooks';
import getCategories from '../../services/categoriesAPI';
import areasAPI from '../../services/areasAPI';

export default function RecipesProvider({ children }) {
  const [recipesResult, setRecipesResult] = useState([]);
  const [doneRecipes, setDoneRecipes] = useState(
    JSON.parse(localStorage.getItem('doneRecipes')),
  );
  const [favoriteRecipes, setFavoriteRecipes] = useState(
    JSON.parse(localStorage.getItem('favoriteRecipes')),
  );
  const [inProgressRecipes, setInProgressRecipes] = useState(
    JSON.parse(localStorage.getItem('inProgressRecipes')),
  );
  const [areas, setAreas] = useState([]);
  const [areaFilter, setAreaFilter] = useState('');
  const [isFetching, setIsFetching] = useState(true);
  const [pathLocation] = usePathLocation();
  const [categories, setCategories] = useState();

  const { getRecipes } = useRecipes();

  const value = {
    values: {
      recipesResult,
      doneRecipes,
      favoriteRecipes,
      inProgressRecipes,
      isFetching,
      categories,
      areas,
      areaFilter,
    },
    actions: {
      setRecipesResult,
      addRecipeToDone(recipeObj) {
        setDoneRecipes([...doneRecipes, recipeObj]);
      },
      addRecipeToFavorites(recipeObj) {
        setFavoriteRecipes([...favoriteRecipes, recipeObj]);
      },
      removeRecipeFromFavorites(recipeObj) {
        const { id } = recipeObj;
        setFavoriteRecipes([...favoriteRecipes.filter((recipe) => recipe.id !== id)]);
      },
      addRecipeToInProgress(recipeObj) {
        setInProgressRecipes([...inProgressRecipes, recipeObj]);
      },
      setAreaFilter,
    },
  };

  useEffect(() => {
    Object.keys(value.values).forEach((key) => (
      localStorage.setItem(key, JSON.stringify(value.values[key]))
    ));
  }, [doneRecipes, favoriteRecipes, inProgressRecipes, value.values]);

  useEffect(() => {
    if (!areaFilter) {
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
      getCategories(pathLocation)
        .then((response) => setCategories(response));
    } else {
      const fetchAreaRecipes = () => {
        setIsFetching(true);
        getRecipes('comidas', areaFilter, 'area')
          .then(
            (response) => setRecipesResult(response),
            (error) => setRecipesResult(error),
          ).finally(() => setIsFetching(false));
      };
      fetchAreaRecipes();
    }
  }, [pathLocation, areaFilter]);

  useEffect(() => {
    if (pathLocation === 'explorar') {
      const fetchAreas = () => {
        setIsFetching(true);
        areasAPI.getAreas()
          .then(
            ((response) => {
              const areasResopnse = response.map(({ strArea }) => strArea);
              return setAreas(areasResopnse);
            }),
            (error) => setAreas(error),
          ).finally(() => setIsFetching(false));
      };
      fetchAreas();
    }
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
