import React from 'react';
import { objectOf } from 'prop-types';

class RecipeCard extends React.Component {
  render() {
    const { meal } = this.props;
    return (
      <div>
        <img src={ meal.strMealThumb } alt={ meal.strMeal } />
        <p>{meal.strMeal}</p>
      </div>
    );
  }
}

RecipeCard.propTypes = {
  meal: objectOf,
}.isRequired;

export default RecipeCard;
