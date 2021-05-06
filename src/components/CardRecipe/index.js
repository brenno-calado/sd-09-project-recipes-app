import React from 'react';
import { arrayOf } from 'prop-types';

import ShareButton from '../ShareButton';

const CardRecipe = (props) => {
  const { filteredRecipes } = props;

  return (
    <div>
      {
        filteredRecipes.map((recipe, index) => (
          <div key={ recipe.name }>
            <img
              src={ recipe.image }
              alt="imagem da Receita"
              data-testid={ `${index}-horizontal-image` }
              height="250"
              width="200"
            />
            <p data-testid={ `${index}-horizontal-top-text` }>
              { recipe.alcoholicOrNot || recipe.category }
            </p>
            <p data-testid={ `${index}-horizontal-name` }>
              { recipe.name }
            </p>
            <p data-testid={ `${index}-horizontal-done-date` }>
              { `Feita em: ${recipe.doneDate}` }
            </p>
            <ShareButton dataTestIdIndex={ `${index}` } />
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
