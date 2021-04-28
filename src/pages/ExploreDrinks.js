import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreDrinks() {
  return (
    <div>
      <button
        type="button"
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-by-area"
      >
        Por Local de Origem
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </button>

      <Header />
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
