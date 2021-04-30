import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../../components';
import { fetchRandomRecipe } from '../../services/api';

function ExploreMeals() {
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => setData(await fetchRandomRecipe(true));
    getData();
  }, []);

  const createButton = (testid, text) => (
    <button data-testid={ testid } type="button">{ text }</button>
  );

  if (!data.meals) return <div>Loading...</div>;

  return (
    <section>
      <Header title="Explorar Comidas" />
      <Link to="/explorar/comidas/ingredientes">
        { createButton('explore-by-ingredient', 'Por Ingredientes') }
      </Link>
      <Link to="/explorar/comidas/area">
        { createButton('explore-by-area', 'Por Local de Origem') }
      </Link>
      <Link to={ `/comidas/${data.meals[0].idMeal}` }>
        { createButton('explore-surprise', 'Me Surpreenda!') }
      </Link>
      <Footer />
    </section>
  );
}

export default ExploreMeals;
