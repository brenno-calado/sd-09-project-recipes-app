import React from 'react';
import { Link } from 'react-router-dom';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';

function ExploreFoods() {
  return (
    <>
      <Header2 title="Explorar Comidas" />
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          name="Por Ingredientes"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          type="button"
          name="Por Local de Origem"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
        <button
          type="button"
          name="Me Surpreenda!"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </Link>
      <Footer />
    </>
  );
}

export default ExploreFoods;
