import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { shape, number, string, arrayOf } from 'prop-types';
import copy from 'clipboard-copy';

import shareIcon from '../images/shareIcon.svg';

function DoneRecipesCard({ recipe, index }) {
  const [shareButtonText, setShareButtonText] = useState('');

  function handleShareButtonClick() {
    const shareButtonTextFadeOutTime = 3000;
    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    setShareButtonText('Link copiado!');
    setTimeout(() => setShareButtonText(''), shareButtonTextFadeOutTime);
  }

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
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        onClick={ handleShareButtonClick }
      >
        <img src={ shareIcon } alt="Share button" />
      </button>
    );
  }

  function renderTags() {
    return (
      <div>
        { recipe.tags.map((tag) => (
          <span
            key={ tag }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            { tag }
          </span>
        ))}
      </div>
    );
  }

  return (
    <div style={ { display: 'flex' } }>
      { renderCardImage() }
      <div>
        { renderTopText() }
        <Link
          to={ recipe.area
            ? `/comidas/${recipe.id}`
            : `/bebidas/${recipe.id}` }
        >
          <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
        </Link>
        <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
        { renderTags() }
        { renderShareButton() }
        { shareButtonText }
      </div>
    </div>
  );
}

DoneRecipesCard.propTypes = {
  recipe: shape({
    id: string,
    type: string,
    area: string,
    category: string,
    alcoholicOrNot: string,
    name: string,
    image: string,
    doneDate: string,
    tags: arrayOf(string),
  }),
  index: number,
}.isRequired;

export default DoneRecipesCard;
