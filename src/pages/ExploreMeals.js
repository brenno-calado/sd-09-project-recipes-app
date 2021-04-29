import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components';
import { fetchRandomRecipe } from '../services/api';

function ExploreMeals() {
  const [randomRecipe, setRandomRecipe] = useState({});

  const getData = async () => {
    setRandomRecipe(await fetchRandomRecipe(true));
  };

  useEffect(() => { getData(); }, []);

  const createButton = (testid, text) => (
    <button data-testid={ testid } type="button">{ text }</button>
  );

  return (
    <section>
      <Header title="Explorar Comidas" />

      <Link to="/explorar/comidas/ingredientes">
        { createButton('explore-by-ingredient', 'Por Ingredientes') }
      </Link>

      <Link to="/explorar/comidas/area">
        { createButton('explore-by-area', 'Por Local de Origem') }
      </Link>

      { randomRecipe.meals && (
        <Link to={ `/comidas/${randomRecipe.meals[0].idMeal}` }>
          { createButton('explore-surprise', 'Me Surpreenda!') }
        </Link>)}

      <Footer />
    </section>
  );
}

export default ExploreMeals;
