import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './RecipeCard.css';

const RecipeCard = ({ recipeName, recipeImage, index, id, type }) => (
  <Link to={ `/${type}/${id}` }>
    <div data-testid={ `${index}-recipe-card` } className="card-container">
      <img
        className="recipe-image"
        src={ recipeImage }
        data-testid={ `${index}-card-img` }
        alt={ `foto de ${recipeName}` }
      />
      <p data-testid={ `${index}-card-name` }>{ recipeName }</p>
    </div>
  </Link>
);

RecipeCard.propTypes = {
  recipeName: PropTypes.string,
  recipeImage: PropTypes.string,
}.isRequired;

export default RecipeCard;
