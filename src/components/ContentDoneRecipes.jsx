import React from 'react';
import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';
import '../css/components/ContentDoneRecipes.css';

function ContentDoneRecipes({ recipes, index }) {
  const { type, alcoholicOrNot, name, image, doneDate, tags } = recipes;
  return (
    <div className="done-recipes-card">
      <img
        className="thumbnail"
        src={ image }
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
      />
      <section>
        <div>
          <div data-testid={ `${index}-horizontal-top-text` }>
            {type === 'meals' ? type : alcoholicOrNot}
          </div>
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="Share Icon"
          />
        </div>
        <h4 data-testid={ `${index}-horizontal-name` }>{ name }</h4>
        <span data-testid={ `${index}-horizontal-done-date` }>
          { `Feita em: ${doneDate}` }
        </span>
        <div>
          {tags.map((tagName) => (
            <span
              data-testid={ `${index}-${tagName}-horizontal-tag` }
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
  index: PropTypes.number.isRequired,
};

export default ContentDoneRecipes;
