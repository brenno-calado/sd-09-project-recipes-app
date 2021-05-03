import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { getPageFromURL } from '../services/others';

function DetailsBtnFavoriteRecipe({ detailsContext }) {
  const { recipe } = detailsContext;

  function constructFavoriteObject() {
    const booleanPage = getPageFromURL();
    const recipeId = (booleanPage ? recipe.idMeal : recipe.idDrink);
    const typeRecipe = (booleanPage ? 'comida' : 'bebida');
    const areaMeal = (booleanPage ? recipe.strArea : '');
    const alcoholic = (booleanPage ? '' : recipe.strAlcoholic);
    const recipeName = (booleanPage ? recipe.strMeal : recipe.strDrink);
    const imageUrl = (booleanPage ? recipe.strMealThumb : recipe.strDrinkThumb);

    const objectRecipe = {
      id: recipeId,
      type: typeRecipe,
      area: areaMeal,
      category: recipe.strCategory,
      alcoholicOrNot: alcoholic,
      name: recipeName,
      image: imageUrl,
    };
    return objectRecipe;
  }
  function handleSaveRecipe() {
    const objectToSave = constructFavoriteObject();
    let favoriteListStorage = [];
    const foundInStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (foundInStorage) {
      if (!foundInStorage.find((objInStorage) => objInStorage.id === objectToSave.id)) {
        favoriteListStorage.push(objectToSave);
      }
      favoriteListStorage = [...foundInStorage, ...favoriteListStorage];
    } else {
      favoriteListStorage.push(objectToSave);
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteListStorage));
  }

  return (
    <Button
      data-testid="favorite-btn"
      type="button"
      color="primary"
      onClick={ handleSaveRecipe }
    >
      Favorite it
    </Button>
  );
}

DetailsBtnFavoriteRecipe.propTypes = { detailsContext: PropTypes.object }.isRequired;

export default DetailsBtnFavoriteRecipe;
