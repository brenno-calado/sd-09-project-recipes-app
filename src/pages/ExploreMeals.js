import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components';

function ExploreMeals() {
  const createButton = (testid, text) => (
    <button data-testid={ testid } type="button">{ text }</button>
  );

  return (
    <section>
      <Header title="Explorar Comidas" />

      <Link to="/explorar/comidas/ingredientes">
        { createButton('explore-by-ingredient', 'Por Ingredientes') }
      </Link>

      <Link to="/explorar/comidas/area">
        { createButton('explore-by-area', 'Por Local de Origem') }
      </Link>

      { createButton('explore-surprise', 'Me Surpreenda!') }

      <Footer />
    </section>
  );
}

export default ExploreMeals;
