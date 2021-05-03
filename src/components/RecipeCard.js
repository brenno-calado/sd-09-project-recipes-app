import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function RecipeCard({ index, thumbUrl, name, redirectUrl }) {
  return (
    <Link to={ redirectUrl }>
      <section data-testid={ `${index}-recipe-card` }>
        <img
          width="80"
          src={ thumbUrl }
          alt="Foto da receita"
          data-testid={ `${index}-card-img` }
        />
        <span data-testid={ `${index}-card-name` }>{name}</span>
      </section>
    </Link>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  thumbUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  redirectUrl: PropTypes.string.isRequired,
};
