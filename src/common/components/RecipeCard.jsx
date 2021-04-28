import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard(props) {
  const { index, recipe } = props;
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt="recipe-thumb"
      />
      <h4 data-testid={ `${index}-card-name` }>{recipe.strMeal || recipe.strDrink }</h4>
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
  }).isRequired,
};

export default RecipeCard;
