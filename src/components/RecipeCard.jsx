import React from 'react';
import PropTypes from 'prop-types';

const RecipeCard = ({ index, name, image }) => (
  <article data-testid={ `${index}-recipe-card` }>
    <img
      src={ image }
      alt={ name }
      width="160px"
      data-testid={ `${index}-card-img` }
    />
    <p data-testid={ `${index}-card-name` }>{name}</p>
  </article>
);

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default RecipeCard;
