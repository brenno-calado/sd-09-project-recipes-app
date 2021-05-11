import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getMealsRandom } from '../services/MealFetch';
// import '../styles/recipes.css';

function ExplorarComidas() {
  const [byIngredients, setByIngredients] = useState(false);
  const [byArea, setByArea] = useState(false);
  const [surpriseMe, setSurpriseMe] = useState(false);
  const [random, setRandom] = useState([]);

  function handleRedirect({ target: { name } }) {
    if (name === 'byIngredients') {
      setByIngredients(true);
    } else if (name === 'byArea') {
      setByArea(true);
    } else if (name === 'surpriseMe') {
      setSurpriseMe(true);
    }
  }

  useEffect(() => {
    getMealsRandom().then((response) => setRandom(response));
  }, []);

  return (
    <>
      { byIngredients ? <Redirect to="/explorar/comidas/ingredientes" /> : null }

      { byArea ? <Redirect to="/explorar/comidas/area" /> : null }

      { surpriseMe ? <Redirect to={ `/comidas/${random[0].idMeal}` } /> : null }

      <Header textProp="Explorar Comidas" />

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
        data-testid="explore-by-area"
        name="byArea"
        onClick={ handleRedirect }
      >
        Por Local de Origem
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

export default ExplorarComidas;
