import React, { useEffect, useState } from 'react';
import { object } from 'prop-types';

import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import {
  saveFavoriteRecipesInLocalStorage,
  getFavoriteRecipesFromLocalStorageById,
  removeFavoriteRecipesFromLocalStorageById,
} from '../../services/favoriteRecipes';

const FavoriteButton = (props) => {
  const [heartIcon, setHeartIcon] = useState(whiteHeartIcon);
  const [isFavorite, setIsFavorite] = useState(false);
  const { recipe, recipeType } = props;
  const favoriteRecipes = {
    id: '',
    type: '',
    area: '',
    category: '',
    alcoholicOrNot: '',
    name: '',
    image: '',
    doneDate: '',
    tags: '',
  };

  const setFavoriteRecipes = () => {
    if (recipeType === 'Meal') {
      favoriteRecipes.type = 'comida';
      favoriteRecipes.area = recipe.strArea;
    } else {
      favoriteRecipes.type = 'bebida';
      favoriteRecipes.alcoholicOrNot = recipe.strAlcoholic;
    }
    favoriteRecipes.id = recipe[`id${recipeType}`];
    favoriteRecipes.category = recipe.strCategory;
    favoriteRecipes.name = recipe[`str${recipeType}`];
    favoriteRecipes.image = recipe[`str${recipeType}Thumb`];
    favoriteRecipes.doneDate = recipe.dateModified;
    favoriteRecipes.tags = recipe.strTags;
    return favoriteRecipes;
  };

  const saveFavoriteRecipes = () => {
    saveFavoriteRecipesInLocalStorage(setFavoriteRecipes());
    setHeartIcon(blackHeartIcon);
  };

  const removeFavoriteRecipes = () => {
    removeFavoriteRecipesFromLocalStorageById(recipe[`id${recipeType}`]);
    setHeartIcon(whiteHeartIcon);
  };

  useEffect(() => {
    const favorite = getFavoriteRecipesFromLocalStorageById(recipe[`id${recipeType}`]);
    setIsFavorite(favorite);
    if (isFavorite) {
      setHeartIcon(blackHeartIcon);
    }
  }, [isFavorite, recipe, recipeType]);

  const addOrRemoveFavoriteRecipes = () => {
    if (isFavorite) {
      removeFavoriteRecipes();
      setIsFavorite(false);
      return null;
    }
    saveFavoriteRecipes();
    setIsFavorite(true);
  };

  return (
    <div>
      <button type="button" onClick={ addOrRemoveFavoriteRecipes }>
        <img
          data-testid="favorite-btn"
          src={ heartIcon }
          alt="Favoritar"
        />
      </button>
    </div>
  );
};

FavoriteButton.propTypes = {
  recipe: object,
}.isRequired;

export default FavoriteButton;
