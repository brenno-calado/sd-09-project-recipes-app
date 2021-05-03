import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FavoriteButton from './FavoriteButton';
import shareIcon from '../../images/shareIcon.svg';

const copy = require('clipboard-copy');

function RecipeHeader({ path, url, recipe, id }) {
  const [hasCopied, setHasCopied] = useState(false);

  const copyShareLink = async () => {
    copy(`http://localhost:3000${url}`);
    setHasCopied(true);
  };

  return (
    <>
      <img
        data-testid="recipe-photo"
        src={ recipe.strDrinkThumb || recipe.strMealThumb }
        alt={ recipe.strDrink || recipe.strMeal }
      />
      <h3 data-testid="recipe-title">{recipe.strDrink || recipe.strMeal}</h3>
      <h5
        data-testid="recipe-category"
      >
        {(path.includes('bebidas') && recipe.strAlcoholic) || recipe.strCategory}
      </h5>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ copyShareLink }
      >
        { hasCopied
          ? <span>Link copiado!</span>
          : <img src={ shareIcon } alt="Compartilhar" />}
      </button>
      <FavoriteButton recipe={ recipe } id={ id } />
    </>
  );
}

RecipeHeader.propTypes = {
  recipe: PropTypes.objectOf(''),
}.isRequired;

export default RecipeHeader;
