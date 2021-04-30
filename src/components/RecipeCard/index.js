import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

const RecipeCard = ({ index, name, image, path, id }) => (
  <Link
    className="recipe-card silver-shadow"
    data-testid={ `${index}-recipe-card` }
    to={ `${path}/${id}` }
  >
    <img
      src={ image }
      alt={ name }
      width="160px"
      data-testid={ `${index}-card-img` }
    />
    <p
      data-testid={ `${index}-card-name` }
      className="recipe-title"
    >
      {name}
    </p>
  </Link>
);

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default RecipeCard;
