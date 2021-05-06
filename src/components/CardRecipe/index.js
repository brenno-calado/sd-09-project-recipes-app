import React from 'react';
import { arrayOf } from 'prop-types';
import { Link } from 'react-router-dom';

import ShareButton from '../ShareButton';

const CardRecipe = (props) => {
  const { filteredRecipes } = props;

  return (
    <div>
      {
        filteredRecipes.map((recipe, index) => (
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
            <p data-testid={ `${index}-horizontal-done-date` }>
              { `Feita em: ${recipe.doneDate}` }
            </p>
            <ShareButton dataTestIdIndex={ `${index}` } URL={ `http://localhost:3000/${recipe.type}s/${recipe.id}` }/>
            {
              recipe.tags.map((tag) => (
                <span
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                  key={ tag }
                >
                  { tag }
                </span>))
            }
          </div>
        ))
      }
    </div>
  );
};

CardRecipe.propTypes = {
  filteredRecipes: arrayOf({}),
}.isRequeired;

export default CardRecipe;
