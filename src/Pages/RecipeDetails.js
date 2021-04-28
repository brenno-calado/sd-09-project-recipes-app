import React, { useState } from 'react';
// import { testDrink, testMeal } from '../Common/recipeTestObj';

function RecipeDetails({ recipe }) {
  const [isFavorite, setFavorite] = useState(false);
  return (
    <div>
      <img src={ urlDaReceita } alt="Receita" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">Nome da receita</h1>
      <div>
        <button
          type="button"
          data-testid="share-btn"
        >
          <img src={ shareIcon } alt="compartilhar" />
        </button>
        <button
          type="button"
          alt="compartilhar"
          onClick={ () => setFavorite(!isFavorite) }
        >
          { isFavorite ? blackHeartIcon : whiteHeartIcon }
        </button>
      </div>
    </div>
  );
}
