import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import './RecipeCard.css';

const RecipeCard = ({ recipeName, recipeImage, index, id }) => {
  const location = useLocation();
  return (
    <Link to={ `${location.pathname}/${id}` }>
      <div data-testid={ `${index}-recipe-card` } className="card-container">
        <img
          className="recipe-image"
          src={ recipeImage }
          data-testid={ `${index}-card-img` }
          alt={ `foto de ${recipeName}` }
        />
        <span data-testid={ `${index}-card-name` }>{ recipeName }</span>
      </div>
    </Link>
  );
};

RecipeCard.propTypes = {
  recipeName: PropTypes.string,
  recipeImage: PropTypes.string,
}.isRequired;

export default RecipeCard;
