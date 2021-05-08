import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import { requestByArea, requestRecipes, getRecipesByCategories } from '../services/api';

function Provider({ children }) {
  const [title, setTitle] = useState();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [restartRecipes, setRestartRecipes] = useState(false);
  const [hearthIco, setHearthIco] = useState(false);
  const [dataFromApi, setDataFromApi] = useState(
    { recipes: [], meal: '', loading: false },
  );
  const [recipesFoods, setRecipesFoods] = useState([]);
  const [foodAreas, setFoodAreas] = useState([]);
  const [idRecipe, setIdRecipes] = useState();
  const [categoryName, setCategoryName] = useState('');

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

  const getCategoryName = async (typeOfRecipe) => {
    if (categoryName) {
      const req = await getRecipesByCategories(typeOfRecipe, categoryName);
      if (typeOfRecipe === 'comidas') {
        const { meals } = req;
        setDataFromApi({ recipes: meals });
      } else {
        const { drinks } = req;
        setDataFromApi({ recipes: drinks });
      }
    }
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
    idRecipe,
    setIdRecipes,
    categoryName,
    setCategoryName,
    getCategoryName,
    hearthIco,
    setHearthIco,
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
