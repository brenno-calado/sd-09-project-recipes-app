import React from 'react';
import { arrayOf } from 'prop-types';
import { Link } from 'react-router-dom';

import FavoriteButton from '../FavoriteButton';
import ShareButton from '../ShareButton';

const CardRecipe = (props) => {
  const { filteredRecipes, isFavorite } = props;
  const checkType = (recipeType) => (recipeType === 'comida' ? 'Meal' : 'Drink');

  return (
    <div>
      { filteredRecipes
      && filteredRecipes.map((recipe, index) => (
        <div key={ recipe.name }>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              src={ recipe.image }
              alt="imagem da Receita"
              data-testid={ `${index}-horizontal-image` }
              height="250"
              width="200"
            />
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { recipe.alcoholicOrNot || `${recipe.area} - ${recipe.category}` }
          </p>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <p data-testid={ `${index}-horizontal-name` }>
              { recipe.name }
            </p>
          </Link>
          { recipe.doneDate
            && (
              <p data-testid={ `${index}-horizontal-done-date` }>
                { `Feita em: ${recipe.doneDate}` }
              </p>
            ) }
          <ShareButton dataTestIdIndex={ `${index}` } URL={ `http://localhost:3000/${recipe.type}s/${recipe.id}` } />
          { isFavorite
          && <FavoriteButton recipe={ recipe } recipeType={ checkType(recipe.type) } /> }
          { recipe.tags
          && recipe.tags.map((tag) => (
            <span
              data-testid={ `${index}-${tag}-horizontal-tag` }
              key={ tag }
            >
              { tag }
            </span>)) }
        </div>
      )) }
    </div>
  );
};

CardRecipe.propTypes = {
  filteredRecipes: arrayOf({}),
}.isRequeired;

export default CardRecipe;
