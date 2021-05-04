import React, { useState } from 'react';
import PropTypes from 'prop-types';
import blackHeart from '../../images/blackHeartIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

function ShareLikeButtons({ recipe, url }) {
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [type, setType] = useState('');
  const id = recipe.idMeal || recipe.idDrink;

  useState(() => {
    function verifyFavorite() {
      const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
      const isFav = favorites.find((item) => item.id === id);
      setFavorite(isFav);
      return (recipe.idMeal ? setType('comida') : setType('bebida'));
    }
    verifyFavorite();
  });

  function addToFavorites() {
    setFavorite(true);
    const fav = {
      id: recipe.idMeal || recipe.idDrink,
      type,
      area: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
    };
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    favorites.push(fav);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  }

  function removeFromFavorites() {
    setFavorite(false);
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    const newFav = favorites.filter((fav) => fav.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFav));
  }

  const favoriteClick = () => (
    (favorite ? removeFromFavorites() : addToFavorites())
  );

  const shareClick = () => {
    const element = document.createElement('textarea');
    element.value = `http://localhost:3000${url}`;
    document.body.appendChild(element);
    element.select();
    document.execCommand('copy');
    document.body.removeChild(element);
    setCopied(true);
  };

  return (
    <div>
      <button
        type="button"
        className="share-like-btn"
        onClick={ shareClick }
      >
        <img data-testid="share-btn" src={ shareIcon } alt="share icon" height="25px" />
      </button>
      { copied ? <p>Link copiado!</p> : null }
      <button
        type="button"
        className="share-like-btn"
        onClick={ favoriteClick }
      >
        {favorite
          ? <img data-testid="favorite-btn" src={ blackHeart } alt="fav" height="25px" />
          : <img data-testid="favorite-btn" src={ whiteHeart } alt="fav" height="25px" />}
      </button>
    </div>
  );
}

ShareLikeButtons.propTypes = {
  url: PropTypes.string.isRequired,
  recipe: PropTypes.shape({
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMealThumb: PropTypes.string,
    srtInstructions: PropTypes.string,
    strArea: PropTypes.string,
  }).isRequired,
};

export default ShareLikeButtons;
// refactor complexity
