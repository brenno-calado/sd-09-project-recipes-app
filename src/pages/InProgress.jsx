import React from 'react';
import { meals } from '../mock/mockMeals.json'

function InProgress() {
  const { strMeal, strMealThumb } = meals[0];
  return (
    <main>
      <div className="img-container">
        <img
          src={ strMealThumb }
          className="details-recipe-photo"
          data-testid="recipe-photo"
          alt={ strMeal }
        />
      </div>
      <h2
        data-testid="recipe-title"
      >
        { strMeal }
      </h2>
    </main>
  );
}

export default InProgress;
