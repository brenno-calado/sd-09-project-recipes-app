import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import { fetchRandomFood } from '../services/fetchAPI';

function ExploreFoods() {
  const [redirect, setRedirect] = useState(false);
  const [result, setResult] = useState();

  useEffect(() => {
    fetchRandomFood().then((response) => setResult(response.meals[0].idMeal));
  }, []);

  function handleClick() {
    setRedirect(true);
  }

  if (redirect) {
    return <Redirect to={ `/comidas/${result}` } />;
  }
  return (
    <>
      <Header2 title="Explorar Comidas" />
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          name="Por Ingredientes"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          type="button"
          name="Por Local de Origem"
          data-testid="explore-by-area"
        >
          Por Local de Origem
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

export default ExploreFoods;

// a
