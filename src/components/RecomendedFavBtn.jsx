import React from 'react';
import './DetailsBtnFavoriteRecipe.css';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import useHeartFill from '../hooks/useHeartFill';
import { ReactComponent as WhiteHeart } from '../images/whiteHeartIcon.svg';
import { ReactComponent as BlackHeart } from '../images/blackHeartIcon.svg';

function constructObject(recipe) {
  const objectRecipe = {
    id: recipe.id,
    type: recipe.type,
    area: recipe.area,
    category: recipe.category,
    alcoholicOrNot: recipe.alcoholicOrNot,
    name: recipe.name,
    image: recipe.image,
  };
  return objectRecipe;
}

function RecomendedFavBtn(recipeDone) {
  const [hearthFill, setShouldVerifyToFillHeart] = useHeartFill();
  const { recipe } = recipeDone;

  function handleSaveRemoveRecipe() {
    // save the object in localStorage
    const objectToSave = constructObject(recipe);
    let favoriteListStorage = [];
    const foundInStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (foundInStorage) {
      if (!foundInStorage.find((objInStorage) => objInStorage.id === objectToSave.id)) {
        favoriteListStorage = [...foundInStorage, objectToSave];
      } else {
        favoriteListStorage = foundInStorage
          .filter((objInStorage) => objInStorage.id !== objectToSave.id);
      }
    } else {
      favoriteListStorage.push(objectToSave);
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteListStorage));

    // set the new array on hook useHeartFill
    setShouldVerifyToFillHeart(true);
  }

  return (
    <Button
      data-testid="favorite-btn"
      type="button"
      color="primary"
      onClick={ handleSaveRemoveRecipe }
      src={ hearthFill.includes(recipe.id) ? 'blackHeartIcon' : 'whiteHeartIcon' }
    >
      {hearthFill.includes(recipe.id) ? <BlackHeart /> : <WhiteHeart /> }
    </Button>
  );
}

RecomendedFavBtn.propTypes = { recipeId: PropTypes.object }.isRequired;

export default RecomendedFavBtn;
