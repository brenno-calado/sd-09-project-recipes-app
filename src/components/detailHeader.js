import React from 'react';
import PropTypes from 'prop-types';

export default function DetailHeader({ recipe, isFood }) {
  const type = isFood ? 'strMeal' : 'strDrink';
  const btn = 'btn btn-light border m-1';
  return (
    <header>
      <img
        src={ recipe[`${type}Thumb`] }
        className="w-100"
        alt={ recipe[type] }
        width="400px"
        data-testid="recipe-photo"
      />
      <h1
        data-testid="recipe-title"
      >
        { recipe[type] }
      </h1>
      <button type="button" className={ btn } data-testid="share-btn">Share</button>
      <button type="button" className={ btn } data-testid="favorite-btn">Fav</button>
      <h3 data-testid="recipe-category">
        {isFood ? recipe.strCategory : recipe.strAlcoholic}
      </h3>
    </header>);
}

DetailHeader.propTypes = {
  recipe: PropTypes.objectOf,
  isFood: PropTypes.bool,
}.isRequired;
