import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton({ id, item, type }) {
  const [isFavorited, setIsFavorited] = useState(false);

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
    const favoriteRecipe = (type === 'meals') ? {
      id: item.idMeal,
      type: 'comida',
      area: item.strArea,
      category: item.strCategory,
      alcoholicOrNot: '',
      name: item.strMeal,
      image: item.strMealThumb,
    } : {
      id: item.idDrink,
      type: 'bebida',
      area: '',
      category: item.strCategory,
      alcoholicOrNot: item.strAlcoholic,
      name: item.strDrink,
      image: item.strDrinkThumb,
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

FavoriteButton.propTypes = {
  id: PropTypes.number,
  type: PropTypes.shape({
    idMeal: PropTypes.number,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }),
}.isRequired;

export default FavoriteButton;
