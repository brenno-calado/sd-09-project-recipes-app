import React from 'react';
import { number, shape } from 'prop-types';
import './cardRecipeDrink.css';

function CardRecipeMeal({ recipe, index }) {
  return (
    <div className="card-recipe-container">
      <img
        src={ recipe.strDrinkThumb }
        alt={ `imagen de ${recipe.strDrink}` }
        data-testid={ `${index}-card-img` }
      />
      <p data-testid={ `${index}-card-name` }>
        { recipe.strDrink }
      </p>
    </div>
  );
}

CardRecipeMeal.propTypes = {
  recipe: shape().isRequired,
  index: number.isRequired,
};

export default CardRecipeMeal;
