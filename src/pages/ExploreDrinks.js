import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreDrinks() {
  const history = useHistory();

  const handleClickToIngredients = () => {
    history.push('/explorar/comidas/ingredientes');
  };

  return (
    <div>
      <button
        type="button"
        data-testid="explore-by-ingredient"
        onClick={ handleClickToIngredients }
      >
        Por Ingredientes
      </button>
      <button
        type="button"
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </button>

      <Header title="Explorar Bebidas" />
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
