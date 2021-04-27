import React from 'react';
import { number, shape } from 'prop-types';
import './cardRecipe.css';

function CardRecipeMeal({ recipe, index }) {
  return (
    <div className="card-recipe-container">
      <img
        src={ recipe.strMealThumb }
        alt={ `imagen de ${recipe.strMeal}` }
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>
        { recipe.strMeal }
      </p>
    </div>
  );
}

CardRecipeMeal.propTypes = {
  recipe: shape().isRequired,
  index: number.isRequired,
};

export default CardRecipeMeal;
