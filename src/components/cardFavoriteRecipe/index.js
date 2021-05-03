import React from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import './cardFavoriteRecipe.css';
import { copyClipboard, resetSpanShare } from '../../services/clipboardCopy';

function setLocalStorage(id) {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  localStorage
    .setItem('favoriteRecipes', JSON.stringify(favoriteRecipes
      .filter((recipe) => recipe.id !== id)));
}

function index({ recipe, indexCard, setStateFavoriteRecipes }) {
  const {
    id, image, type, category, alcoholicOrNot, area, name,
  } = recipe;

  return (
    <div className="container-cardHorizontal">
      <Link to={ `/${type}s/${id}` }>
        <img
          className="img-main-cardHorizontal"
          src={ image }
          alt="item"
          data-testid={ `${indexCard}-horizontal-image` }
        />
      </Link>
      <div className="container-info-cardHorizontal">
        <div className="container-topText-cardHorizontal">
          {
            (type === 'bebida')
              ? (
                <p
                  className="top-text-cardHorizontal"
                  data-testid={ `${indexCard}-horizontal-top-text` }
                >
                  { `${alcoholicOrNot}` }
                </p>)
              : (
                <p
                  className="top-text-cardHorizontal"
                  data-testid={ `${indexCard}-horizontal-top-text` }
                >
                  { `${area} - ${category}` }
                </p>)
          }
        </div>
        <Link to={ `/${type}s/${id}` }>
          <h4
            className="name-cardHorizontal"
            data-testid={ `${indexCard}-horizontal-name` }
          >
            { name }
          </h4>
        </Link>
        <div className="container-btns-favoriteRecipe">
          <button
            className="btn-share-cardHorizontal"
            type="button"
            onClick={ () => copyClipboard(type, id) }
          >
            <img
              data-testid={ `${indexCard}-horizontal-share-btn` }
              src={ shareIcon }
              alt="shareIcon"
            />
            <span id={ `spanShare${id}` } className="tooltip-text">Copia URL</span>
          </button>
          <button
            className="btn-favorite-cardHorizontal"
            type="button"
            onClick={ () => {
              setLocalStorage(id);
              setStateFavoriteRecipes();
            } }
            onBlur={ () => {} }
            onMouseOut={ () => resetSpanShare(id) }
          >
            <img
              data-testid={ `${indexCard}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt="blackHeart"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default index;
