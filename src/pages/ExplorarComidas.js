import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getRandomMeal } from '../services';

function Explorar() {
  const [randomMeal, setRandomMeal] = useState([]);

  const fetchRandomMeal = async () => {
    const response = await getRandomMeal();
    setRandomMeal(response);
  };

  useEffect(() => {
    fetchRandomMeal();
  }, []);

  return (
    <>
      <Header title="Explorar Comidas" searchIcon={ false } />
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
      </Link>
      <Link to={ `/comidas/${randomMeal.idMeal}` }>
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </Link>
      <Footer />
    </>
  );
}

export default Explorar;
