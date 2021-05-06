import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function Provider({ children }) {
  const [title, setTitle] = useState();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [restartRecipes, setRestartRecipes] = useState(false);
  const id = 178319;
  const [idRecipe, setIdRecipes] = useState(id);
  const [dataFromApi, setDataFromApi] = useState(
    { recipes: [], meal: '', loading: false },
  );
  const getTitleValue = () => {
    setTitle(title);
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
