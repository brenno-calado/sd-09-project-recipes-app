import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartImg from '../images/blackHeartIcon.svg';

function FavoriteDrinkCard({
  recipe, index, linkShared, shareLink, handleFavoriteButton,
}) {
  return (
    <div key={ recipe.name }>
      <div>
        <Link
          to={
            recipe.type === 'comida'
              ? `/comidas/${recipe.id}` : `/bebidas/${recipe.id}`
          }
        >
          <img
            src={ recipe.image }
            alt=""
            data-testid={ `${index}-horizontal-image` }
            width="100px"
          />
        </Link>
      </div>
      <h4
        data-testid={ `${index}-horizontal-top-text` }
      >
        {recipe.alcoholicOrNot}
      </h4>
      <Link
        to={
          recipe.type === 'comida'
            ? `/comidas/${recipe.id}` : `/bebidas/${recipe.id}`
        }
      >
        <h1 data-testid={ `${index}-horizontal-name` }>
          { recipe.name }
        </h1>
      </Link>
      <button
        type="button"
        onClick={ () => shareLink(recipe.id, recipe.type) }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="compartilhar"
        />
      </button>
      { linkShared && <p>Link copiado!</p> }
      <button
        type="button"
        onClick={ () => handleFavoriteButton(recipe.id) }
      >
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ blackHeartImg }
          alt="Favoritar"
        />
      </button>
    </div>
  );
}

FavoriteDrinkCard.propTypes = {
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  linkShared: PropTypes.bool.isRequired,
  shareLink: PropTypes.func.isRequired,
  handleFavoriteButton: PropTypes.func.isRequired,
};

export default FavoriteDrinkCard;
