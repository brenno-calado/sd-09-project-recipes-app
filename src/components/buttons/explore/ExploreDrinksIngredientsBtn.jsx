import React from 'react';
import { useHistory } from 'react-router-dom';

function ExploreDrinksIngredientsBtn() {
  const history = useHistory();
  return (
    <button
      type="button"
      data-testid="explore-by-ingredient"
      className="basic-btn"
      onClick={ () => history.push('/explorar/bebidas/ingredientes') }
    >
      Por Ingredientes
    </button>
  );
}

export default ExploreDrinksIngredientsBtn;
