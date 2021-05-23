import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import share from '../images/shareIcon.svg';
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

  useEffect(() => {
    if (favList) {
      setFavorite(favList.some((e) => e.id === id));
    }
  }, [favList, id]);

  const message = (props) => (
    <Tooltip
      id="message"
      { ...props }
    >
      Link copiado!
    </Tooltip>);

  const btn = 'btn btn-light border m-1';

  const lastIndex = -1;

  return (
    <header>
      <img
        src={ recipe[typeObject[type].img] }
        className="w-100"
        alt={ recipe[typeObject[type].data] }
        data-testid="recipe-photo"
      />
      <h1
        data-testid="recipe-title"
      >
        { recipe[typeObject[type].data] }
      </h1>
      <OverlayTrigger
        trigger="click"
        delay={ { show: 250, hide: 400 } }
        placement="top"
        overlay={ message }
      >
        <button
          type="button"
          onClick={ () => copy(`http://localhost:3000${
            pathname.split('/').slice(lastIndex)[0] === 'in-progress'
              ? pathname.replace('/in-progress', '')
              : pathname
          }`) }
          className={ btn }
          data-testid="share-btn"
        >
          <img src={ share } alt="shareIcon" />
        </button>
      </OverlayTrigger>
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
