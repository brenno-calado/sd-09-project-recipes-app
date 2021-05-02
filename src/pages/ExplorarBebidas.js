import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getRandomDrink } from '../services';

function Explorar() {
  const [randomDrink, setRandomDrink] = useState({});

  const fetchRandomDrink = async () => {
    const response = await getRandomDrink();
    setRandomDrink(response);
  };

  useEffect(() => {
    fetchRandomDrink();
  }, []);

  return (
    <>
      <Header title="Explorar Bebidas" searchIcon={ false } />
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to={ `/bebidas/${randomDrink.idDrink}` }>
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
