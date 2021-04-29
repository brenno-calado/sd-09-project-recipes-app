import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoods() {
  const history = useHistory();
  const handleClickToIngredients = () => {
    history.push('/explorar/comidas/ingredientes');
  };

  const handleClickToArea = () => {
    history.push('/explorar/comidas/area');
  };

  return (
    <div>
      <h1>Por Ingredientes</h1>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ handleClickToIngredients }
      >
        Por Ingredients
      </button>
      <button
        type="button"
        data-testid="explore-by-area"
        onClick={ handleClickToArea }
      >
        Por Local de Origem
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </button>
      <Header title="Explorar Comidas" />
      <Footer />
    </div>
  );
}

export default ExploreFoods;
