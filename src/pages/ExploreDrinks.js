import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import { fetchRandomDrink } from '../services/fetchAPI';

function ExploreDrinks() {
  const [redirect, setRedirect] = useState(false);
  const [result, setResult] = useState();

  useEffect(() => {
    fetchRandomDrink().then((response) => setResult(response.drinks[0].idDrink));
  }, []);

  function handleClick() {
    setRedirect(true);
  }

  if (redirect) {
    return <Redirect to={ `/bebidas/${result}` } />;
  }
  return (
    <>
      <Header2 title="Explorar Bebidas" />
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          name="Por Ingredientes"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <button
        type="button"
        name="Me Surpreenda!"
        data-testid="explore-surprise"
        onClick={ handleClick }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </>
  );
}

export default ExploreDrinks;
