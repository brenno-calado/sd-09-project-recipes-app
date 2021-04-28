import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/recipes.css';

function ExplorarBebidasIng() {
  return (
    <>
      <Header textProp="Explorar Ingredientes" />

      <button
        className="button"
        type="button"
        data-testid="explore-drinks"
      >
        Lime
      </button>

      <button
        className="button"
        type="button"
        data-testid="explore-food"
      >
        Sugar
      </button>

      <Footer />
    </>
  );
}

export default ExplorarBebidasIng;
