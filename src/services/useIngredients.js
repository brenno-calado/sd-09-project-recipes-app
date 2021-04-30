import React, { useState } from 'react';

const useIngredient = () => {
  const [recipe, setRecipe] = useState([]);
  console.log(recipe);

  return [recipe, setRecipe];
};

export default useIngredient;
