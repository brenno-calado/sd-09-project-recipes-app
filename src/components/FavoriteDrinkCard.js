import React, { useState } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartImg from '../images/blackHeartIcon.svg';
import '../CSS/DoneCard.css';

function FavoriteDrinkCard({
  recipe, index, handleFavoriteButton,
}) {
  const [linkShared, setLinkShared] = useState(false);
  const shareLink = (id) => {
    copy(`http://localhost:3000/bebidas/${id}`);
    setLinkShared(true);
  };
  return (
    <div key={ recipe.name } className="meal-card">
      <div className="img-div">
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
            className="food-img"
          />
        </Link>
      </div>
      <div className="infos-div">
        <div className="recipe-names">
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.alcoholicOrNot}
          </p>
          <Link
            to={
              recipe.type === 'comida'
                ? `/comidas/${recipe.id}` : `/bebidas/${recipe.id}`
            }
          >
            <h3 data-testid={ `${index}-horizontal-name` }>
              { recipe.name }
            </h3>
          </Link>
        </div>
        <div className="recipe-card-buttons">
          <button
            type="button"
            onClick={ () => shareLink(recipe.id) }
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
      </div>
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
  handleFavoriteButton: PropTypes.func.isRequired,
};

export default FavoriteDrinkCard;
