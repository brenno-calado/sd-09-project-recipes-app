import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';
import { getRandomDrink } from '../services/RecipesApi';

function ExplorerDrink() {
  const [redirect, setRedirect] = useState(false);
  const [result, setResult] = useState();

  useEffect(() => {
    getRandomDrink().then((response) => setResult(response.drinks[0].idDrink));
  }, []);

  function handleClick() {
    setRedirect(true);
  }

  if (redirect) {
    return <Redirect to={ `/bebidas/${result}` } />;
  }

  return (
    <div>
      <Header />
      <div>
        <Link to="/explorar/bebidas/ingredientes">
          <button
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes
          </button>
        </Link>
        <button
          data-testid="explore-surprise"
          type="button"
          onClick={ handleClick }
        >
          Me Surpreenda!
        </button>
      </div>
      <MenuInferior />
    </div>
  );
}

export default ExplorerDrink;
