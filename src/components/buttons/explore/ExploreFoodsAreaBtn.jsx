import React from 'react';
// import { useHistory } from 'react-router-dom';

function ExploreFoodsAreaBtn() {
  // const history = useHistory();
  return (
    <button
      type="button"
      data-testid="explore-by-area"
      className="btn btn-primary"
      // onClick={ history.push('/explorar/comidas/area') }
    >
      Por Local de Origem
    </button>
  );
}

export default ExploreFoodsAreaBtn;
