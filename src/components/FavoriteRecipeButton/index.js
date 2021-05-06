import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './style.css';
import blackHeart from '../../images/blackHeartIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';

/**
 * @param {string} recipeId
 * @returns {boolean}
 */
function isRecipeFavorite(recipeId) {
  const recipeString = localStorage.getItem('favoriteRecipes');
  if (!recipeString) {
    return;
  }
  const recipes = JSON.parse(recipeString);
  return Boolean(recipes.find(({ id }) => id === recipeId));
}

function favoriteRecipe({ id, type, area, category, alcoholicOrNot, name, image }) {
  const recipeString = localStorage.getItem('favoriteRecipes');
  let recipes = [];
  if (recipeString) {
    recipes = JSON.parse(recipeString);
  }
  const hasFavorited = recipes.findIndex(({ id: idRecipe }) => id === idRecipe);
  if (hasFavorited >= 0) {
    recipes.splice(hasFavorited, 1);
  } else {
    recipes.push({ id, type, area, category, alcoholicOrNot, name, image });
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify(recipes));
}

export default function FavoriteRecipeButton({ recipe }) {
  const [isFavorite, setIsFavorite] = useState(isRecipeFavorite(recipe.id));

  function handleFavoriteClick() {
    setIsFavorite(!isFavorite);
    favoriteRecipe(recipe);
  }
  return (
    <button className="favorite-button" type="button" onClick={ handleFavoriteClick }>
      <img
        src={ isFavorite ? blackHeart : whiteHeart }
        data-testid="favorite-btn"
        alt="Icone de favorito"
      />
    </button>
  );
}

FavoriteRecipeButton.propTypes = {
  recipe: PropTypes.shape().isRequired,
};
