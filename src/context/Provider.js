import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import { requestByArea, requestRecipes } from '../services/api';

function Provider({ children }) {
  const [title, setTitle] = useState();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [restartRecipes, setRestartRecipes] = useState(false);
  const [dataFromApi, setDataFromApi] = useState(
    { recipes: [], meal: '', loading: false },
  );
  const [recipesFoods, setRecipesFoods] = useState([]);
  const [foodAreas, setFoodAreas] = useState([]);

  useEffect(() => {
    requestRecipes().then((meals) => {
      setRecipesFoods(meals);
    });
  }, []);

  useEffect(() => {
    requestByArea().then((requestAreas) => {
      setFoodAreas(requestAreas);
    });
  }, []);

  const getTitleValue = () => {
    setTitle(title);
  };

  const contextValue = {
    title,
    setTitle,
    showSearchBar,
    setShowSearchBar,
    foodAreas,
    setFoodAreas,
    recipesFoods,
    setRecipesFoods,
    restartRecipes,
    setRestartRecipes,
    getTitleValue,
    dataFromApi,
    setDataFromApi,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
