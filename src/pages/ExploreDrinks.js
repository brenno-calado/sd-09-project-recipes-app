import React from 'react';
import { Link } from 'react-router-dom';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';

function ExploreDrinks() {
  return (
    <>
      <Header2 title="Explorar Bebidas" />
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          name="Por Ingredientes"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <button
        type="button"
        name="Me Surpreenda!"
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </button>
      <Footer />
    </>
  );
}

export default ExploreDrinks;
