import React from 'react';
import { Link } from 'react-router-dom';

function DoneRecipesCard({ recipe, index }) {
  function renderCardImage() {
    return (
      <Link
        to={ recipe.area
          ? `/comidas/${recipe.id}`
          : `/bebidas/${recipe.id}` }
      >
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ recipe.name }
          style={ { width: '100px' } }
        />
      </Link>
    );
  }

  function renderTopText() {
    return (
      <p data-testid={ `${index}-horizontal-top-text` }>
        { recipe.area
          ? `${recipe.area} - ${recipe.category}`
          : `${recipe.alcoholicOrNot}` }
      </p>
    );
  }

  function renderShareButton() {
    return (
      <button type="button" data-testid={ `${index}-horizontal-share-btn` }>
        share
      </button>
    );
  }

  function renderTags() {
    return (
      <div>
        { recipe.tags.map((tag) => (
          <span key={ tag } data-testid={ `{index}-${tag}-horizontal-tag` }>{ tag }</span>
        ))}
      </div>
    );
  }

  return (
    <div style={ { display: 'flex' } }>
      { renderCardImage() }
      <div>
        { renderTopText() }
        <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
        <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
        { renderShareButton() }
        { renderTags() }
      </div>
    </div>
  );
}

export default DoneRecipesCard;
