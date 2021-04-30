import { shape } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { RecipeContext } from '../../Context';
import useIngredient from '../../services/useIngredients';
import IngredientList from '../IngredientList/IngredientList';

function RecipeMealDetailComponent() {
  const { recipeSpec } = useContext(RecipeContext);
  console.log(recipeSpec);
  const {
    strMeal,
    strCategory,
    strMealThumb,
    strInstructions,
  } = recipeSpec;
  return (
    <div>
      <img
        src={ strMealThumb }
        alt="foto da receita"
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{ strMeal }</h2>
      <p data-testid="recipe-category">{ strCategory }</p>
      <IngredientList />
      <h3>Instructions</h3>
      <p data-testid="instructions">{ strInstructions }</p>
      {/* <iframe
        width="560"
        height="315"
        src={ recipe.strYoutube }
        title="YouTube video player"
      /> */}
    </div>
  );
}

export default RecipeMealDetailComponent;
