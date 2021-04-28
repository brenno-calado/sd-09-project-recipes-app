import React, { useState } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/recipes.css';

function ExplorarBebidas() {
  const [byIngredients, setByIngredients] = useState(false);
  const [surpriseMe, setSurpriseMe] = useState(false);

  function handleRedirect({ target: { name } }) {
    if (name === 'byIngredients') {
      setByIngredients(true);
    } else if (name === 'surpriseMe') {
      setSurpriseMe(true);
    }
  }

  return (
    <>
      { byIngredients ? <Redirect to="/explorar/bebidas/ingredientes" /> : null }

      {/* Redirecionar para a tela de detalhes */}
      { surpriseMe ? <Redirect to="/" /> : null }

      <Header textProp="Explorar Bebidas" />

      <button
        className="button"
        type="button"
        data-testid="explore-by-ingredient"
        name="byIngredients"
        onClick={ handleRedirect }
      >
        Por Ingredientes
      </button>

      <button
        className="button"
        type="button"
        data-testid="explore-surprise"
        name="surpriseMe"
        onClick={ handleRedirect }
      >
        Me Surpreenda!
      </button>

      <Footer />
    </>
  );
}

export default ExplorarBebidas;
