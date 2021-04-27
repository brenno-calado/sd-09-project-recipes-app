import React from 'react';
import { object, number } from 'prop-types';

function RecipeItemDrink({ recipe, index }) {
  console.log(recipe);
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        src={ recipe.strDrinkThumb }
        alt="Recipe"
        data-testid={ `${index}-card-img` }
      />
      <h2 data-testid={ `${index}-card-name` }>{ recipe.strDrink }</h2>
    </div>
  );
}

RecipeItemDrink.propTypes = {
  recipe: object,
  index: number,
}.isRequired;

export default RecipeItemDrink;
