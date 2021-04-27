import React, { useState } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/recipes.css';

function ExplorarComidas() {
  const [byIngredients, setByIngredients] = useState(false);
  const [byArea, setByArea] = useState(false);
  const [surpriseMe, setSurpriseMe] = useState(false);

  function handleRedirect({ target: { name } }) {
    if (name === 'byIngredients') {
      setByIngredients(true);
    } else if (name === 'byArea') {
      setByArea(true);
    } else if (name === 'surpriseMe') {
      setSurpriseMe(true);
    }
  }

  return (
    <>
      { byIngredients ? <Redirect to="/explorar/comidas/ingredientes" /> : null }

      { byArea ? <Redirect to="/explorar/comidas/area" /> : null }

      {/* Redirecionar para a tela de detalhes */}
      { surpriseMe ? <Redirect to="/" /> : null }

      <Header textProp="Explorar Comidas" />

      <button
        type="button"
        data-testid="explore-by-ingredient"
        name="byIngredients"
        onClick={ handleRedirect }
      >
        Por Ingredientes
      </button>

      <button
        type="button"
        data-testid="explore-by-area"
        name="byArea"
        onClick={ handleRedirect }
      >
        Por Local de Origem
      </button>

      <button
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

export default ExplorarComidas;
