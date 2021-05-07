import React from 'react';
import { objectOf } from 'prop-types';

class RecipeMealCard extends React.Component {
  render() {
    const { meal, index } = this.props;
    return (
      <div
        className="recipe-card"
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
  drink: objectOf,
}.isRequired;

export default RecipeMealCard;
