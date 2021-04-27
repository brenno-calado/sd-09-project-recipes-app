import React from 'react';
import { object, number } from 'prop-types';

function RecipeItemFood({ recipe, index }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        src={ recipe.strMealThumb }
        alt="Recipe"
        data-testid={ `${index}-card-img` }
      />
      <h2 data-testid={ `${index}-card-name` }>{ recipe.strMeal }</h2>
    </div>
  );
}

RecipeItemFood.propTypes = {
  recipe: object,
  index: number,
}.isRequired;

export default RecipeItemFood;
