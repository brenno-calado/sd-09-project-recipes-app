import React, { useState } from 'react';
import { number, string, objectOf, func } from 'prop-types';
import { Link } from 'react-router-dom';
import BlackHartIcon from '../images/blackHeartIcon.svg';
import WhiteHartIcon from '../images/whiteHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function RecipesCards({ index, recipe, onClick }) {
  const [copied, setCopied] = useState(false);
  const [favorite] = useState(true);

  const shareBtn = () => {
    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    setCopied(true);
  };

  return (
    <div>
      <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <img
          src={ recipe.image }
          alt="Recipe"
          data-testid={ `${index}-horizontal-image` }
          className="recipe-photo"
        />
        <h3 data-testid={ `${index}-horizontal-name` }>
          { recipe.name }
        </h3>
      </Link>
      <button
        className="main-buttons"
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ shareBtn }
        src="shareIcon"
      >
        { copied
          ? 'Link copiado!'
          : <img src={ ShareIcon } alt="share" /> }
      </button>
      <button
        className="main-buttons"
        type="button"
        data-testid={ `${index}-horizontal-favorite-btn` }
        onClick={ onClick }
        src="blackHeartIcon"
      >
        <img
          src={ favorite ? BlackHartIcon : WhiteHartIcon }
          id={ recipe.id }
          alt="favorite"
        />
      </button>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {`${recipe.alcoholicOrNot || recipe.area} - ${recipe.category}`}
      </p>
    </div>
  );
}

RecipesCards.propTypes = {
  index: number,
  recipe: objectOf(string),
  onClick: func,
}.isRequired;

export default RecipesCards;
