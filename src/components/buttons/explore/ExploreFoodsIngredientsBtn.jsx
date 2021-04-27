import React from 'react';
// import { useHistory } from 'react-router-dom';

function ExploreFoodsIngredientsBtn() {
  // const history = useHistory();
  return (
    <button
      type="button"
      data-testid="explore-by-ingredient"
      className="btn btn-primary"
      // onClick={ history.push('/explorar/comidas/ingredientes') }
    >
      Por Ingredientes
    </button>
  );
}

export default ExploreFoodsIngredientsBtn;
