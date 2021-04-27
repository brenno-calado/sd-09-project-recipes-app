import React from 'react';
import { Link } from 'react-router-dom';

const ExploreButtonsDrinks = () => (
  <div>
    <Link to="/explorar/bebidas/ingredientes">
      <button
        type="button"
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </button>
    </Link>

    <Link to="/explorar/bebidas/area">
      <button
        type="button"
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </button>
    </Link>
  </div>
);

export default ExploreButtonsDrinks;
