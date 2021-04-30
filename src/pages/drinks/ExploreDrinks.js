import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../../components';
import { fetchRandomRecipe } from '../../services/api';

function ExploreDrinks() {
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async () => setData(await fetchRandomRecipe(false));
    getData();
  }, []);

  const createButton = (testid, text) => (
    <button data-testid={ testid } type="button">{ text }</button>
  );

  if (!data.drinks) return <div>Loading...</div>;

  return (
    <section>
      <Header title="Explorar Bebidas" />
      <Link to="/explorar/bebidas/ingredientes">
        { createButton('explore-by-ingredient', 'Por Ingredientes') }
      </Link>
      <Link to={ `/bebidas/${data.drinks[0].idDrink}` }>
        { createButton('explore-surprise', 'Me Surpreenda!') }
      </Link>
      <Footer />
    </section>
  );
}

export default ExploreDrinks;
