import React, { useState } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/recipes.css';

function Explorar() {
  const [toFood, setToFood] = useState(false);
  const [toDrinks, setToDrinks] = useState(false);

  function handleRedirect({ target: { name } }) {
    if (name === 'toFood') {
      setToFood(true);
    } else if (name === 'toDrinks') {
      setToDrinks(true);
    }
  }

  return (
    <>
      { toFood ? <Redirect to="/explorar/comidas" /> : null }

      { toDrinks ? <Redirect to="/explorar/bebidas" /> : null }

      <Header textProp="Explorar" />

      <button
        className="button"
        type="button"
        data-testid="explore-food"
        name="toFood"
        onClick={ handleRedirect }
      >
        Explorar Comidas
      </button>

      <button
        className="button"
        type="button"
        data-testid="explore-drinks"
        name="toDrinks"
        onClick={ handleRedirect }
      >
        Explorar Bebidas
      </button>

      <Footer />
    </>
  );
}

export default Explorar;
