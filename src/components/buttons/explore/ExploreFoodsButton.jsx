import React from 'react';
import { useHistory } from 'react-router-dom';

function ExploreFoodsButton() {
  const history = useHistory();
  return (
    <button
      type="button"
      data-testid="explore-food"
      className="basic-btn"
      onClick={ () => history.push('/explorar/comidas') }
    >
      Explorar Comidas
    </button>
  );
}

export default ExploreFoodsButton;
