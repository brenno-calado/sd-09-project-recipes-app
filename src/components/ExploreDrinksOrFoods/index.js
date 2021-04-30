import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ExploreDrinksOrFoods({ path }) {
  const renderExploreByArea = () => {
    if (path === '/explorar/comidas') {
      return (
        <>
          <Link
            to="/explorar/comidas/area"
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </Link>
          <br />
        </>
      );
    }
  };

  return (
    <>
      <Link
        to={ `${path}/ingredientes` }
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </Link>
      <br />
      { renderExploreByArea() }
      <Link to={ `${path}` } data-testid="explore-surprise">Me Surpreenda!</Link>
    </>
  );
}

ExploreDrinksOrFoods.propTypes = {
  path: PropTypes.string.isRequired,
};

export default ExploreDrinksOrFoods;
