import React, { useState } from 'react';
import { object } from 'prop-types';
import isFavorite from '../images/blackHeartIcon.svg';
import isNotFavorite from '../images/whiteHeartIcon.svg';

function ShareAndFavo({ match, recipe }) {
  const [copy, setCopy] = useState(false);
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [{}];
  const [favorite, setFavorite] = useState(
    favorites.find((favo) => favo.id === match.params.id),
  );

  const location = match.path.includes('/comidas') ? 'Meal' : 'Drink';

  const handleShare = () => {
    navigator.clipboard.writeText(`http://localhost:3000${match.url}`);
    setCopy(true);
    const timeoutToCopy = 3000;
    setTimeout(() => {
      setCopy(false);
    }, timeoutToCopy);
  };

  const setStorage = () => {
    const storeRecipe = {
      id: match.params.id,
      type: location === 'Meal' ? 'comida' : 'bebida',
      area: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe[`str${location}`],
      image: recipe[`str${location}Thumb`],
    };
    console.log(favorites);
    if (favorites[0].id) {
      localStorage.setItem(
        'favoriteRecipes', JSON.stringify([...favorites, storeRecipe]),
      );
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([storeRecipe]));
    }
  };

  const handleFavorite = () => {
    if (favorite) {
      setFavorite(false);
    } else {
      setStorage();
      setFavorite(true);
    }
  };

  return (
    <div>
      <label htmlFor="favorite-btn">
        <button
          type="button"
          data-testid="share-btn"
          onClick={ handleShare }
        >
          Compartilhar
        </button>
        { copy && 'Link copiado!' }
      </label>
      <button
        type="button"
        data-testid="favorite-btn"
        src={ favorite ? isFavorite : isNotFavorite }
        onClick={ handleFavorite }
      >
        <img src={ favorite ? isFavorite : isNotFavorite } alt="Favoritar" />
      </button>
    </div>
  );
}

ShareAndFavo.propTypes = {
  match: object,
  recipe: object,
}.isRequired;

export default ShareAndFavo;
