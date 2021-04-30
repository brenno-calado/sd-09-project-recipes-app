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
      <button 
        href="#share"
        data-testid="share-btn"
      >
        <img src="" alt="Share button" />
      </button>
      <button
        href="#favorites"
        data-testid="favorite-btn"
      >
        <img src="" alt="Favorite button"/>
      </button>

    </main>
  );
}

export default InProgress;
