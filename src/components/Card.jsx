import React from 'react';
import PropTypes from 'prop-types';

function Card({ thumbSource, title, index }) {
  return (
    <div className="card" data-testid={ `${index}-recipe-card` }>
      <img src={ thumbSource } alt="thumb" data-testid={ `${index}-card-img` } />
      <p data-testid={ `${index}-card-name` }>{title}</p>
    </div>
  );
}

Card.propTypes = {
  thumbSource: PropTypes.string,
}.isRequired;

export default Card;
