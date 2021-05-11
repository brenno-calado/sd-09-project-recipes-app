import React, { useEffect, useState } from 'react';
// import { useRouteMatch } from 'react-router-dom';
// import PropTypes from 'prop-types';
import noFavIcon from '../images/whiteHeartIcon.svg';
import isFavIcon from '../images/blackHeartIcon.svg';

export default function Favorite(props) {
  const [isFav, setIsFav] = useState(false);
  const { recipe } = props;
  console.log('id da receita:', recipe.id);

  const favoriteAdd = () => {
    let fav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (fav === null) {
      fav = [];
    }
    fav.push(recipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(fav));
  };

  const favoriteRemove = () => {
    const fav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const index = fav.findIndex((item) => item.id === recipe.id);
    fav.splice(index, 1);
    localStorage.setItem('favoriteRecipes', JSON.stringify(fav));
  };

  function handleClick() {
    if (isFav === true) {
      favoriteRemove();
      console.log('Remove!');
    } else {
      favoriteAdd();
      console.log('Add!');
    }
    setIsFav(!isFav);
  }

  const checkFav = () => {
    let fav = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (fav === null) {
      fav = [];
    }
    console.log('Favorites:', fav);
    fav.map((item) => {
      if (item.id === recipe.id) {
        setIsFav(true);
      }
      return null;
    });
  };

  useEffect(() => {
    checkFav();
  }, [recipe.id, handleClick]);

  if (isFav === true) {
    return (
      <button
        type="button"
        onClick={ handleClick }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavIcon }
          alt="Favorite"
        />
      </button>
    );
  }
  if (isFav === false) {
    return (
      <button
        type="button"
        onClick={ handleClick }
      >
        <img
          data-testid="favorite-btn"
          src={ noFavIcon }
          alt="Favorite"
        />
      </button>
    );
  }
}
