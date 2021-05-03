import React from 'react';
import { object, number } from 'prop-types';
import { Link } from 'react-router-dom';
import '../Style/CardRecipe.css';

function RecipeItemFood({ recipe, index }) {
  return (
    <Link to={ `/comidas/${recipe.idMeal}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <img
          className="card-food-image"
          src={ recipe.strMealThumb }
          alt="Recipe"
          data-testid={ `${index}-card-img` }
        />
        <h2 data-testid={ `${index}-card-name` }>{ recipe.strMeal }</h2>
      </div>
    </Link>
  );
}

RecipeItemFood.propTypes = {
  recipe: object,
  index: number,
}.isRequired;

export default RecipeItemFood;
