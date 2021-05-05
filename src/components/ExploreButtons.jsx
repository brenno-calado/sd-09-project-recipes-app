import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Buttons({ origin }) {
  if (origin) {
    return (
      <>
        <Link to="/explorar/comidas/ingredientes">
          <button
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button
            data-testid="explore-by-area"
            type="button"
          >
            Por Local de Origem
          </button>
        </Link>
        <button
          data-testid="explore-surprise"
          type="button"
        >
          Me Surpreenda!
        </button>
      </>
    );
  }
  return (
    <>
      <Link to="/explorar/bebidas/ingredientes">
        <button
          id="ingredient-drinks-link"
          data-testid="explore-by-ingredient"
          type="button"
        >
          Por Ingredientes
        </button>
      </Link>
      <button
        id="surprise-drinks-link"
        data-testid="explore-surprise"
        type="button"
      >
        Me Surpreenda!
      </button>
    </>
  );
}

Buttons.propTypes = {
  origin: PropTypes.bool,
}.isRequired;

export default Buttons;
