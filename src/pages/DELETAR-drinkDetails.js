import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import { getItemLocalStorage,
  setItemLocalStorage } from '../services/servicesLocalStorage';

const copy = require('clipboard-copy');

export default function DetailHeader({ recipe, isFood }) {
  const { pathname } = useLocation();
  const type = isFood ? 'Meal' : 'Drink';
  const typeObject = {
    Meal: {
      data: 'strMeal',
      favType: 'comida',
      img: 'strMealThumb',
    },
    Drink: {
      data: 'strDrink',
      favType: 'bebida',
      img: 'strDrinkThumb',
    },
  };
  const favList = getItemLocalStorage('favoriteRecipes');
  if (!favList) setItemLocalStorage('favoriteRecipes', []);
  const id = pathname.split('/')[2];
  const [isFavorite, setFavorite] = useState(false);

  const favRecipe = (item) => {
    setFavorite(!isFavorite);
    const favObject = {
      id,
      type: typeObject[type].favType,
      area: item.strArea || '',
      category: item.strCategory,
      alcoholicOrNot: item.strAlcoholic || '',
      name: item[`str${type}`],
      image: item[`str${type}Thumb`],
    };
    const removeFav = favList.filter((e) => e.id !== id);
    setItemLocalStorage('favoriteRecipes', [...removeFav]);
    if (!isFavorite) {
      setItemLocalStorage('favoriteRecipes', [...favList, favObject]);
    }
  };

  const btn = 'btn btn-light border m-1';
  return (
    <header>
      <button
        onClick={ () => favRecipe(recipe) }
        type="button"
        className={ btn }
        data-testid="favorite-btn"
        src={ isFavorite ? blackHeart : whiteHeart }
        aria-label="fav-recipe"
      >
        <img src={ isFavorite ? blackHeart : whiteHeart } alt="Fav Button" />
      </button>
      <h3 data-testid="recipe-category">
        {isFood ? recipe.strCategory : recipe.strAlcoholic}
      </h3>
    </header>);
}

DetailHeader.propTypes = {
  recipe: PropTypes.objectOf,
  isFood: PropTypes.bool,
}.isRequired;
