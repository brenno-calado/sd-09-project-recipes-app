import React, { useEffect, useState } from 'react';
import noFavIcon from '../images/whiteHeartIcon.svg';
import isFavIcon from '../images/blackHeartIcon.svg';

export default function Favorite(props) {
  const [isFav, setIsFav] = useState(false);
  const { recipe } = props;

  const favoriteAdd = () => {
    const fav = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

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
    } else {
      favoriteAdd();
    }
    setIsFav(!isFav);
  }

  const checkFav = () => {
    const fav = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

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
