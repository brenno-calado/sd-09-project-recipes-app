import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';
import { getRecipesByCategories } from '../services/api';

function Provider({ children }) {
  const [title, setTitle] = useState();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [restartRecipes, setRestartRecipes] = useState(false);
  const [idRecipe, setIdRecipes] = useState();
  const [categoryName, setCategoryName] = useState('');
  const [dataFromApi, setDataFromApi] = useState(
    { recipes: [], meal: '', loading: false },
  );
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
    getTitleValue,
    dataFromApi,
    setDataFromApi,
    restartRecipes,
    setRestartRecipes,
    idRecipe,
    setIdRecipes,
    categoryName,
    setCategoryName,
    getCategoryName,
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
