import React, { useState } from 'react';
import PropTypes from 'prop-types';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import { getItemLocalStorage,
  setItemLocalStorage } from '../services/servicesLocalStorage';

export default function UnfavoriteButton({ recipeId, callback, testID }) {
  const [favorite, setFavorite] = useState(true);

  const unFavoriteRecipe = (unfavoritedID) => {
    const favoritesArray = getItemLocalStorage('favoriteRecipes');
    const filteredFavorites = favoritesArray.filter(({ id }) => id !== unfavoritedID);

    setItemLocalStorage('favoriteRecipes', filteredFavorites);
    setFavorite(false);
  };

  const btn = 'btn btn-light border m-1';
  return (
    <button
      onClick={ () => {
        unFavoriteRecipe(recipeId);
        callback();
      } }
      type="button"
      className={ btn }
      data-testid={ testID }
      src={ favorite ? blackHeart : whiteHeart }
      aria-label="fav-recipe"
    >
      <img src={ favorite ? blackHeart : whiteHeart } alt="Fav Button" />
    </button>
  );
}

UnfavoriteButton.propTypes = {
  recipe: PropTypes.objectOf,
  isFood: PropTypes.bool,
}.isRequired;
