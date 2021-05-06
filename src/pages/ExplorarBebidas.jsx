import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getDrinkRandom } from '../services/DrinkFetch';
// import '../styles/recipes.css';

function ExplorarBebidas() {
  const [byIngredients, setByIngredients] = useState(false);
  const [surpriseMe, setSurpriseMe] = useState(false);
  const [random, setRandom] = useState([]);

  function handleRedirect({ target: { name } }) {
    if (name === 'byIngredients') {
      setByIngredients(true);
    } else if (name === 'surpriseMe') {
      setSurpriseMe(true);
    }
  }

  useEffect(() => {
    getDrinkRandom().then((response) => setRandom(response));
  }, []);

  return (
    <>
      { byIngredients ? <Redirect to="/explorar/bebidas/ingredientes" /> : null }

      { surpriseMe ? <Redirect to={ `/bebidas/${random[0].idDrink}` } /> : null }

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
