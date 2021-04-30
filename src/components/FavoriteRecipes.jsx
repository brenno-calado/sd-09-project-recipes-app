import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes({ data, path }) {
  function createLocalStorage() {
    const inProgressRecipes = 'favoriteRecipes';
    if (localStorage[inProgressRecipes] === undefined) {
      const object = [];
      localStorage.setItem('favoriteRecipes', JSON.stringify(object));
    }
  }

  function colorHeart() {
    createLocalStorage();
    const numberSlice = 9;
    const idFood = path.slice(numberSlice);
    const include = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const color = include.filter(({ id }) => id === idFood);
    if (color.length > 0) return blackHeartIcon;
    return whiteHeartIcon;
  }

  const [heartIcon, setHeartIcon] = useState(colorHeart());

  function favorite() {
    const numberSlice = 9;
    const idFood = path.slice(numberSlice);
    const include = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favorites = include.filter(({ id }) => id === idFood);
    if (favorites.length === 0) {
      if (path.includes('/bebidas')) {
        const { idDrink, strCategory, strAlcoholic, strDrink, strDrinkThumb } = data;
        const array = [...include,
          {
            id: idDrink,
            type: 'bebida',
            area: '',
            category: strCategory,
            alcoholicOrNot: strAlcoholic,
            name: strDrink,
            image: strDrinkThumb }];
        localStorage.setItem('favoriteRecipes', JSON.stringify(array));
      } else {
        const { idMeal, strCategory, strArea, strMeal, strMealThumb } = data;
        const array = [...include,
          {
            id: idMeal,
            type: 'comida',
            area: strArea,
            category: strCategory,
            alcoholicOrNot: '',
            name: strMeal,
            image: strMealThumb }];
        localStorage.setItem('favoriteRecipes', JSON.stringify(array));
      }
    } else {
      const deleteFav = include.filter(({ id }) => id !== favorites[0].id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(deleteFav));
    }
  }

  function handleClick() {
    favorite();
    if (heartIcon === whiteHeartIcon) {
      return setHeartIcon(blackHeartIcon);
    }
    setHeartIcon(whiteHeartIcon);
  }

  useEffect(() => {
    createLocalStorage();
  });

  return (
    <button
      type="button"
      onClick={ handleClick }
      src={ heartIcon }
    >
      <img src={ heartIcon } alt="favorite" data-testid="favorite-btn" />
    </button>
  );
}

FavoriteRecipes.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  path: PropTypes.string.isRequired,
};

export default FavoriteRecipes;
