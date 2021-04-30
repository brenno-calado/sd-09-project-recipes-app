import React from 'react';
import { number, shape, string } from 'prop-types';
import './cardRecipe.css';
import { Link } from 'react-router-dom';

function CardRecipeMeal({ recipe, index, testid }) {
  return (
    <Link to={ { pathname: `/comidas/${recipe.idMeal}`, pageType: 'comidas' } }>
      <div className="card-recipe-container" data-testid={ `${index}-recipe-card` }>
        <img
          src={ recipe.strMealThumb }
          alt={ `imagen de ${recipe.strMeal}` }
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ testid }>
          { recipe.strMeal }
        </p>
      </div>
    </Link>
  );
}

CardRecipeMeal.propTypes = {
  recipe: shape().isRequired,
  index: number.isRequired,
  testid: string.isRequired,
};

export default CardRecipeMeal;
