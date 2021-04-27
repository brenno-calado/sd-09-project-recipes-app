import React, { useState } from 'react';
import PropTypes from 'prop-types';
import myContext from './myContext';

const RecipesProvider = ({ children }) => {
  // passar os states
  const [recipesFoods, setRecipesFoods] = useState([]);
  const [recipesDrinks, setRecipesDrinks] = useState([]);

  // passar as funcoes

  // passar o context
  const context = {
    recipesFoods,
    setRecipesFoods,
    recipesDrinks,
    setRecipesDrinks,
  };

  // return
  return (
    <myContext.Provider value={ context }>
      {children}
    </myContext.Provider>
  );
};

RecipesProvider.propTypes = { children: PropTypes.node.isRequired };

export default RecipesProvider;
