import React from 'react';
import { array } from 'prop-types';

class RecipeMealCard extends React.Component {
  render() {
    const { meal, index } = this.props;
    return (
      <div
        data-testid={ `${index}-recipe-card` }
      >
        <img
          src={ meal.strMealThumb }
          alt={ meal.strMeal }
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
      </div>
    );
  }
}

RecipeMealCard.propTypes = {
  meal: array,
}.isRequired;

export default RecipeMealCard;
