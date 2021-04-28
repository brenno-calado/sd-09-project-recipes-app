import React from 'react';
import { array } from 'prop-types';

class RecipeCard extends React.Component {
  render() {
    const { meal } = this.props;
    return (
      <div className="recipe-card">
        <img src={ meal.strMealThumb } alt={ meal.strMeal } />
        <p>{meal.strMeal}</p>
      </div>
    );
  }
}

RecipeCard.propTypes = {
  meal: array,
}.isRequired;

export default RecipeCard;
