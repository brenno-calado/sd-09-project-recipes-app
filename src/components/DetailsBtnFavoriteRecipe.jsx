import React from 'react';
import './DetailsBtnFavoriteRecipe.css';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { getPageFromURL } from '../services/others';
import useHeartFill from '../hooks/useHeartFill';
import { ReactComponent as WhiteHeart } from '../images/whiteHeartIcon.svg';
import { ReactComponent as BlackHeart } from '../images/blackHeartIcon.svg';

function constructFavoriteObject(recipeItem) {
  const booleanPage = getPageFromURL();
  const recipeId = (booleanPage ? recipeItem.idMeal : recipeItem.idDrink);
  const typeRecipe = (booleanPage ? 'comida' : 'bebida');
  const areaMeal = (booleanPage ? recipeItem.strArea : '');
  const alcoholic = (booleanPage ? '' : recipeItem.strAlcoholic);
  const recipeName = (booleanPage ? recipeItem.strMeal : recipeItem.strDrink);
  const imageUrl = (booleanPage ? recipeItem.strMealThumb : recipeItem.strDrinkThumb);

  const objectRecipe = {
    id: recipeId,
    type: typeRecipe,
    area: areaMeal,
    category: recipeItem.strCategory,
    alcoholicOrNot: alcoholic,
    name: recipeName,
    image: imageUrl,
  };
  return objectRecipe;
}

function DetailsBtnFavoriteRecipe({ detailsContext }) {
  const { recipe } = detailsContext;
  const [hearthFill, setShouldVerifyToFillHeart] = useHeartFill();

  function handleSaveRemoveRecipe() {
    const objectToSave = constructFavoriteObject(recipe);
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
    setShouldVerifyToFillHeart(true);
  }

  return (
    <Button
      data-testid="favorite-btn"
      type="button"
      color="primary"
      onClick={ handleSaveRemoveRecipe }
      className="btnpattern"
      src={ hearthFill ? 'blackHeartIcon' : 'whiteHeartIcon' }
    >
      {hearthFill ? <BlackHeart /> : <WhiteHeart /> }
      <span className="btnpatternText">Favorite it</span>
    </Button>
  );
}

DetailsBtnFavoriteRecipe.propTypes = { detailsContext: PropTypes.object }.isRequired;

export default DetailsBtnFavoriteRecipe;
