import { number, object } from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const RecipeCardDone = ({ recipe, index }) => {
  const [isCopied, setIsCopiedStatus] = useState(false);
  const type = () => {
    if (recipe.alcoholicOrNot) return 'bebidas';
    return 'comidas';
  };

  const copyToClipboard = () => {
    const url = `http://localhost:3000/${type()}/${recipe.id}`;
    navigator.clipboard.writeText(url);
    setIsCopiedStatus(true);
  };

  return (
    <div>
      <Link to={ `/${type()}/${recipe.id}` }>
        <img
          src={ recipe.image }
          alt="recipe-thumb"
          data-testid={ `${index}-horizontal-image` }
          style={ { width: '25vw' } }
        />
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        { recipe.alcoholicOrNot || `${recipe.area} - ${recipe.category}`}
      </p>
      <Link to={ `/${type()}/${recipe.id}` }>
        <p data-testid={ `${index}-horizontal-name` }>
          {recipe.name}
        </p>
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>
        {recipe.doneDate}
      </p>
      <button type="button" onClick={ copyToClipboard }>
        { isCopied ? 'Link copiado!' : <img
          src={ shareIcon }
          data-testid={ `${index}-horizontal-share-btn` }
          alt="share-icon"
        />}
      </button>
      { recipe.tags.map((tag) => (
        <p key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>{tag}</p>
      )) }
    </div>
  );
};

RecipeCardDone.propTypes = {
  recipe: object,
  index: number,
}.isRequired;

export default RecipeCardDone;
