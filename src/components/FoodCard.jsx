import React from 'react';
import { objectOf, string, number } from 'prop-types';

function FoodCard({ food, index }) {
  function renderFoodImage() {
    return (
      <img
        data-testid={ `${index}-card-img` }
        src={ food.strMealThumb }
        alt={ food.strMeal }
      />
    );
  }

  function renderFoodName() {
    return (
      <h3 data-testid={ `${index}-card-name` }>{food.strMeal}</h3>
    );
  }

  return (
    <div data-testid={ `${index}-recipe-card` }>
      {renderFoodImage()}
      {renderFoodName()}
    </div>
  );
}

FoodCard.propTypes = {
  food: objectOf(string),
  index: number,
}.isRequired;

export default FoodCard;
