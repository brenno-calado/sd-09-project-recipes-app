import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeCard({ index, thumbUrl, name }) {
  return (
    <section data-testid={ `${index}-recipe-card` }>
      <img src={ thumbUrl } alt="Foto da receita" data-testid={ `${index}-card-img` } />
      <span data-testid={ `${index}-card-name` }>{name}</span>
    </section>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  thumbUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
