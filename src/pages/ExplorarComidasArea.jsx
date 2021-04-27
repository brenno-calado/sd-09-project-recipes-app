import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/recipes.css';

function ExplorarComidasArea() {
  return (
    <>
      <Header textProp="Explorar Origem" />

      <select className="select" data-testid="explore-by-area-dropdown">
        <option>Brasil</option>
        <option>Canada</option>
        <option>Praga</option>
      </select>

      <button
        type="button"
        data-testid="explore-food"
      >
        Chelsea Buns
      </button>

      <button
        type="button"
        data-testid="explore-drinks"
      >
        Chelsea Buns
      </button>

      <Footer />
    </>
  );
}

export default ExplorarComidasArea;
