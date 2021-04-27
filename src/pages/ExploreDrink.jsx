import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function ExploreDrink() {
  return (
    <div>
      <Link to="/explorar/bebidas/ingredientes">
        <button data-testid="explore-by-ingredient" type="button">
          Por Ingredientes
        </button>
      </Link>
      <Link to="bebidas/178319">
        <button data-testid="explore-surprise" type="button">
          Me Surpreenda!
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default ExploreDrink;
