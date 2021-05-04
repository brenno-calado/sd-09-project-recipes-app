import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';
import { getRandomFood } from '../services/RecipesApi';

const ExplorerFood = () => {
  const [redirect, setRedirect] = useState(false);
  const [result, setResult] = useState();

  useEffect(() => {
    getRandomFood().then((response) => setResult(response.meals[0].idMeal));
  }, []);

  function handleClick() {
    setRedirect(true);
  }

  if (redirect) {
    return <Redirect to={ `/comidas/${result}` } />;
  }
  return (

    <div>
      <Header />
      <div>
        <Link to="/explorar/comidas/ingredientes">
          <button
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button
            data-testid="explore-by-area"
            type="button"
          >
            Por Local de Origem
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
};

export default ExplorerFood;
