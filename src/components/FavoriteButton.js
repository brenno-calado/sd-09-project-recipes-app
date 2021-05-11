import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  checkIfFavoriteRecipe,
  saveSingleFavoriteRecipe,
  removeRecipeFromFavorites,
} from '../services/storage';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const FavoriteButton = ({ recipe, testId }) => {
  const isInFavorites = checkIfFavoriteRecipe(recipe);
  console.log(isInFavorites);
  const [isFavorite, setFavorite] = useState(isInFavorites);
  const image = isFavorite ? blackHeartIcon : whiteHeartIcon;
  const favoriteAction = isFavorite
    ? () => {
      setFavorite(false);
      removeRecipeFromFavorites(recipe);
    }
    : () => {
      setFavorite(true);
      saveSingleFavoriteRecipe(recipe);
    };

  console.log(recipe);
  return (
    <div
      role="button"
      onClick={ () => favoriteAction() }
      tabIndex="0"
      onKeyPress={ ({ key }) => {
        if (key === 'Enter') favoriteAction();
      } }
    >
      <img
        src={ image }
        alt="Compartilhar receita"
        data-testid={ testId }
      />
    </div>
  );
};

export default FavoriteButton;

FavoriteButton.propTypes = {
  recipe: PropTypes.shape.isRequired,
  testId: PropTypes.string.isRequired,
};
