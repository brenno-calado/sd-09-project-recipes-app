import React from 'react';
import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';
import '../css/components/ContentDoneRecipes.css';

/* COMIDA                                             BEBIDA
foto da receita                                      foto da receita 
o nome                                               o nome
categoria                                            se é alcoólica
area
data em que a pessoa fez a receita                   data em que a pessoa fez a receita
as 2 primeiras tags retornadas pela API
e um botão de compartilhar                           e um botão de compartilhar
*/

function ContentDoneRecipes({ recipes, recipeIndex }) {
  const { type, alcoholicOrNot, name, image, doneDate, tags } = recipes;
  const filteredTags = tags.filter((_, index) => index < 2);

  return (
    <div className="done-recipes-card">
      <img
        className="thumbnail"
        src={ image }
        alt={ name }
        data-testid={ `${recipeIndex}-horizontal-image` }
      />
      <section>
        <div>
          <div data-testid={ `${recipeIndex}-horizontal-top-text` }>
            {type === 'meals' ? type : alcoholicOrNot}
          </div>
          <img
            data-testid={ `${recipeIndex}-horizontal-share-btn` }
            src={ shareIcon }
            alt="Share Icon"
          />
        </div>
        <h4 data-testid={ `${recipeIndex}-horizontal-name` }>{ name }</h4>
        <span data-testid={ `${recipeIndex}-horizontal-done-date` }>
          { `Feita em: ${doneDate}` }
        </span>
        <div>
          {filteredTags.map((tagName) => (
            <span
              data-testid={ `${recipeIndex}-${tagName}-horizontal-tag` }
              key={ tagName }
              className="done-recipes-tags"
            >
              { tagName }
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

ContentDoneRecipes.propTypes = {
  recipes: PropTypes.arrayOf(Object).isRequired,
  recipeIndex: PropTypes.number.isRequired,
};

export default ContentDoneRecipes;
