import React from 'react';
import { useHistory } from 'react-router-dom';

function ExploreDrinksButton() {
  const history = useHistory();
  return (
    <button
      type="button"
      data-testid="explore-drinks"
      className="basic-btn"
      onClick={ () => history.push('/explorar/bebidas') }
    >
      Explorar Bebidas
    </button>
  );
}

export default ExploreDrinksButton;
