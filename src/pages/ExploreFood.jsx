import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
// import Header from '../components/Header';

function ExploreFood() {
  return (
    <div>
      <Header page="Explorar Comidas" />
      <Link to="/explorar/comidas/ingredientes">
        <button data-testid="explore-by-ingredient" type="button">
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button data-testid="explore-by-area" type="button">
          Por Local de Origem
        </button>
      </Link>
      <Link to="/comidas/52771">
        <button data-testid="explore-surprise" type="button">
          Me Surpreenda!
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default ExploreFood;
