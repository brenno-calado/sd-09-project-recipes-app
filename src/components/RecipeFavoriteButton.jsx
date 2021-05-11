import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipesAppContext from '../context/RecipesAppContext';

function RecipeFavoriteButton({ id, type }) {
  const [isFavorited, setIsFavorited] = useState(false);

  const { mealId, drinkId } = useContext(RecipesAppContext);

  const recipe = (type === 'Meal') ? mealId : drinkId;

  function removeFavoriteRecipe(favorites) {
    setIsFavorited(false);
    if (favorites.length === 1) {
      localStorage.removeItem('favoriteRecipes');
      return;
    }
    const newFavorites = favorites
      .filter((favorite) => favorite.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  }

  function handleClickFavorite() {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteRecipe = (type === 'Meal') ? {
      id: recipe.idMeal,
      type: 'comida',
      area: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    } : {
      id: recipe.idDrink,
      type: 'bebida',
      area: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
    if (favorites === null) {
      setIsFavorited(true);
      localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteRecipe]));
      return;
    }
    const isFavorite = favorites.some((favorite) => favorite.id === id);
    if (isFavorite) {
      removeFavoriteRecipe(favorites);
      return;
    }
    setIsFavorited(true);
    favorites.push(favoriteRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  }

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if ((favorites !== null) && (favorites.some((favorite) => favorite.id === id))) {
      setIsFavorited(true);
    }
  }, [id]);

  return (
    <button type="button" onClick={ () => handleClickFavorite() }>
      <img
        src={ (isFavorited) ? blackHeartIcon : whiteHeartIcon }
        alt="blackHeartIcon"
        data-testid="favorite-btn"
      />
    </button>
  );
}

RecipeFavoriteButton.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
}.isRequired;

export default RecipeFavoriteButton;
