import React from 'react';
import { object, number } from 'prop-types';
import { Link } from 'react-router-dom';
import '../Style/CardRecipe.css';

function RecipeItemDrink({ recipe, index }) {
  return (
    <Link to={ `/bebidas/${recipe.idDrink}` }>
      <div data-testid={ `${index}-recipe-card` }>
        <img
          className="card-food-image"
          src={ recipe.strDrinkThumb }
          alt="Recipe"
          data-testid={ `${index}-card-img` }
        />
        <h2 data-testid={ `${index}-card-name` }>{ recipe.strDrink }</h2>
      </div>
    </Link>
  );
}

RecipeItemDrink.propTypes = {
  recipe: object,
  index: number,
}.isRequired;

export default RecipeItemDrink;
