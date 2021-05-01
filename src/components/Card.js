import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ recipe, index }) => (
  <div data-testid={ `${index}-recipe-card` }>
    <p data-testid={ `${index}-card-name` }>{recipe.strDrink || recipe.strMeal}</p>
    <img
      src={ recipe.strMealThumb || recipe.strDrinkThumb }
      width="150px"
      alt="Imagem da receita"
      data-testid={ `${index}-card-img` }
    />
  </div>
);

Card.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
};

export default Card;
