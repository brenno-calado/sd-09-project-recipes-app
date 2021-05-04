import React from 'react';
import PropTypes from 'prop-types';

function RecommendedCard({ recipe, index, hidden }) {
  const { first, second } = hidden;
  return (
    <div
      style={ index === first || index === second
        ? { display: '' } : { display: 'none' } }
      data-testid={ `${index}-recomendation-card` }
    >
      <img
        width="200px"
        // data-testid={ `${key}-card-img` }
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt="recommended-thumb"
      />
      <h4
        data-testid={ `${index}-recomendation-title` }
      >
        {
          recipe.strMeal || recipe.strDrink
        }
      </h4>
    </div>
  );
}

RecommendedCard.propTypes = {
  recipe: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  hidden: PropTypes.shape({
    first: PropTypes.number,
    second: PropTypes.number,
  }).isRequired,
};

export default RecommendedCard;
