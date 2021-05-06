import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import BlackHeart from '../../images/blackHeartIcon.svg';
import WhiteHeart from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import {
  updateLocalStorageItem,
} from '../../services/localStorage';

const timeoutClipboard = 2000;

function ListFavoriteCards({ favorite = [], handleFavoriteState }) {
  const [clipboard, setClipboard] = useState(false);

  const handleFavorite = (item) => {
    const newState = updateLocalStorageItem('favoriteRecipes', item);
    handleFavoriteState(newState);
  };

  const handleClipboard = (item) => {
    clipboardCopy(`http://localhost:3000/${item.type}s/${item.id}`);
    setClipboard(true);
    setTimeout(() => setClipboard(false), timeoutClipboard);
  };

  const isFavorite = (item) => favorite.find(
    (recipe) => recipe.idMeal === item.idMeal || recipe.idDrink === item.idDrink,
  );

  const renderCard = (item, index) => (
    <div key={ item.id } data-testid={ `${index}-recipe-card` }>
      <span data-testid={ `${index}-horizontal-top-text` }>
        {item.alcoholicOrNot || `${item.area} - ${item.category}`}
      </span>
      <Link to={ `/${item.type}s/${item.id}` }>
        <img
          style={ { width: '10%' } }
          data-testid={ `${index}-horizontal-image` }
          src={ item.image }
          alt={ `${item.name}-done-recipe` }
        />
        <span data-testid={ `${index}-horizontal-name` }>{item.name}</span>
      </Link>
      <button type="button" onClick={ handleClipboard.bind(null, item) }>
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="favorite-status"
        />
      </button>
      {clipboard && <span>Link copiado!</span>}
      <button type="button" onClick={ handleFavorite.bind(null, item) }>
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ isFavorite(item) ? BlackHeart : WhiteHeart }
          alt="favorite-status"
        />
      </button>
    </div>
  );

  const renderCards = () => favorite.map(
    (recipe, index) => renderCard(recipe, index),
  );
  return favorite.length > 0 && renderCards();
}

export default ListFavoriteCards;
