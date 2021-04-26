import React, { useContext } from 'react';

import RecipesContext from '../context/RecipesContext';

const FoodRecipes = () => {
  const { user } = useContext(RecipesContext);
  return (
    <div>
      <h1>Food Recipes</h1>
      <p>{user.email}</p>
    </div>
  );
};

export default FoodRecipes;
