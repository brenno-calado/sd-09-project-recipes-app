import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components';
import { fetchRandomRecipe } from '../services/api';

function ExploreDrinks() {
  const [randomRecipe, setRandomRecipe] = useState({});

  const getData = async () => {
    setRandomRecipe(await fetchRandomRecipe(false));
  };

  useEffect(() => { getData(); }, []);

  const createButton = (testid, text) => (
    <button data-testid={ testid } type="button">{ text }</button>
  );

  return (
    <section>
      <Header title="Explorar Bebidas" />

      <Link to="/explorar/bebidas/ingredientes">
        { createButton('explore-by-ingredient', 'Por Ingredientes') }
      </Link>

      { randomRecipe.drinks && (
        <Link to={ `/bebidas/${randomRecipe.drinks[0].idDrink}` }>
          { createButton('explore-surprise', 'Me Surpreenda!') }
        </Link>) }

      <Footer />
    </section>
  );
}

export default ExploreDrinks;
