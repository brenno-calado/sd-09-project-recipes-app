import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getRandomMeal } from '../services';
import cooking from '../images/cooking.png';
import '../CSS/ExplorarComidas.css';

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
      <section className="buttons-section">
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
      </section>
      <section className="app-icon-section">
        <img className="icon" src={ cooking } alt="icon" />
      </section>
      <Footer />
    </>
  );
}

export default Explorar;
