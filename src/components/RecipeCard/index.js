import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const RecipeCard = ({ index, name, image }) => (
  <article
    className="recipe-card silver-shadow"
    data-testid={ `${index}-recipe-card` }
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
  </article>
);

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default RecipeCard;
