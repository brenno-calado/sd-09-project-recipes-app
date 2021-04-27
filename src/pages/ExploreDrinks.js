import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components';

function ExploreDrinks() {
  const createButton = (testid, text) => (
    <button data-testid={ testid } type="button">{ text }</button>
  );

  return (
    <section>
      <Header title="Explorar Bebidas" search />

      <Link to="/explorar/bebidas/ingredientes">
        { createButton('explore-by-ingredient', 'Por Ingredientes') }
      </Link>

      { createButton('explore-surprise', 'Me Surpreenda!') }

      <Footer />
    </section>
  );
}

export default ExploreDrinks;
