import React, { useState } from 'react';
import { object } from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import isFavorite from '../images/blackHeartIcon.svg';
import isNotFavorite from '../images/whiteHeartIcon.svg';
import share from '../images/shareIcon.svg';
import '../Style/ShareAndFavo.css';

function ShareAndFavo({ match, recipe }) {
  const [copy, setCopy] = useState(false);
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [favorite, setFavorite] = useState(
    favorites.find((favo) => favo.id === match.params.id),
  );

  const location = match.path.includes('/comidas') ? 'Meal' : 'Drink';

  const handleShare = () => {
    setCopy(true);
    const timeoutToCopy = 2500;
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
    localStorage.setItem(
      'favoriteRecipes', JSON.stringify([...favorites, storeRecipe]),
    );
  };

  const removeFavorite = (id) => {
    const newFavorites = favorites.filter((recipeLocal) => recipeLocal.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  };

  const handleFavorite = () => {
    if (favorite) {
      setFavorite(false);
      removeFavorite(match.params.id);
    } else {
      setStorage();
      setFavorite(true);
    }
  };

  return (
    <div className="shareAndFavo">
      <CopyToClipboard
        text={ `http://localhost:3000${match.url}` }
        onCopy={ handleShare }
      >
        <button
          type="button"
          data-testid="share-btn"
        >
          <img src={ share } alt="Compartilhar" />
        </button>
      </CopyToClipboard>
      <button
        type="button"
        data-testid="favorite-btn"
        src={ favorite ? isFavorite : isNotFavorite }
        onClick={ handleFavorite }
      >
        <img src={ favorite ? isFavorite : isNotFavorite } alt="Favoritar" />
      </button>
      { copy && 'Link copiado!' }
    </div>
  );
}

ShareAndFavo.propTypes = {
  match: object,
  recipe: object,
}.isRequired;

export default ShareAndFavo;
