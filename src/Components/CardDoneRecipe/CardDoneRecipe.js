import React, { useState } from 'react';
import { number, shape } from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';

const copy = require('clipboard-copy');

function CardDoneRecipe({ recipe, index }) {
  const [showCopyMsg, setShowCopyMsg] = useState(false);
  const copyFunction = () => {
    const recipeLink = `http://localhost:3000/${recipe.type}s/${recipe.id}`;
    copy(recipeLink);
    setShowCopyMsg(true);
  };

  return (
    <div className="card-recipe-container">
      <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <img
          src={ recipe.image }
          alt={ `imagen de ${recipe.name}` }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <span data-testid={ `${index}-horizontal-top-text` }>
        { recipe.type === 'comida'
          ? `${recipe.area} - ${recipe.category}`
          : recipe.alcoholicOrNot }
      </span>
      <button type="button" onClick={ () => copyFunction() }>
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="Botão para compartilhar a receita"
        />
      </button>
      <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <p data-testid={ `${index}-horizontal-name` }>
          { recipe.name }
        </p>
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>
        {`Feita em ${recipe.doneDate}`}
      </p>
      <div>
        { (recipe.tags.length > 0) && recipe.tags.map((tag) => (
          <span data-testid={ `${index}-${tag}-horizontal-tag` } key={ tag }>
            {tag}
          </span>
        )) }
      </div>
      { (showCopyMsg) && <span>Link copiado!</span>}
    </div>
  );
}

CardDoneRecipe.propTypes = {
  recipe: shape().isRequired,
  index: number.isRequired,
};

export default CardDoneRecipe;
