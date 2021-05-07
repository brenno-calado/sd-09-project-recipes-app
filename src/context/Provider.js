import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
<<<<<<< HEAD
import { requestByArea, requestRecipes } from '../services/api';
=======
import { getRecipesByCategories } from '../services/api';
>>>>>>> 67c0045839e672f10bf0fb9bb10bcabdad9b3f66

function Provider({ children }) {
  const [title, setTitle] = useState();
  const [showSearchBar, setShowSearchBar] = useState(false);
<<<<<<< HEAD
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

=======
  const [categoryName, setCategoryName] = useState('');
  const [dataFromApi, setDataFromApi] = useState(
    { recipes: [], meal: '', loading: false },
  );
  const [restartRecipes, setRestartRecipes] = useState(false);
>>>>>>> 67c0045839e672f10bf0fb9bb10bcabdad9b3f66
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
    categoryName,
    setCategoryName,
    getCategoryName,
    restartRecipes,
    setRestartRecipes,
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
