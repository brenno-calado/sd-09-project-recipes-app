import React from 'react';
import { number, shape, string } from 'prop-types';
import './cardRecipeDrink.css';
import { Link } from 'react-router-dom';

function CardRecipeMeal({ recipe, index, testid }) {
  return (
    <Link to={ { pathname: `/bebidas/${recipe.idDrink}`, pageType: 'bebidas' } }>
      <div className="card-recipe-container" data-testid={ `${index}-recipe-card` }>
        <img
          src={ recipe.strDrinkThumb }
          alt={ `imagen de ${recipe.strDrink}` }
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ testid }>
          { recipe.strDrink }
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
