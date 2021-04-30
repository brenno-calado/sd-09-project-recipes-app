import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import getPageTitle from '../services/pageTitles';

import paths from '../routes/paths';

const {
  EXPLORE,
  EXPLORE_DRINK,
  EXPLORE_FOOD,
  FOOD_BY_AREA,
  FOOD_BY_INGREDIENTS,
  DRINK_BY_INGREDIENTS,
} = paths;

const Explore = ({ match: { path } }) => {
  const history = useHistory();
  return (
    <>
      <Header title={ getPageTitle(path) } />
      {
        path === EXPLORE && (
          <>
            <button
              type="button"
              data-testid="explore-food"
              onClick={ () => history.push(EXPLORE_FOOD) }
            >
              Explorar Comidas
            </button>
            <button
              type="button"
              data-testid="explore-drinks"
              onClick={ () => history.push(EXPLORE_DRINK) }
            >
              Explorar Bebidas
            </button>
          </>
        )
      }

      {
        path === EXPLORE_FOOD && (
          <>
            <button
              type="button"
              data-testid="explore-by-ingredient"
              onClick={ () => history.push(FOOD_BY_INGREDIENTS) }
            >
              Por Ingredientes
            </button>
            <button
              type="button"
              data-testid="explore-by-area"
              onClick={ () => history.push(FOOD_BY_AREA) }
            >
              Por Local de Origem
            </button>
            <button type="button" data-testid="explore-surprise">
              Me Surpreenda!
            </button>
          </>
        )
      }

      {
        path === EXPLORE_DRINK && (
          <>
            <button
              type="button"
              data-testid="explore-by-ingredient"
              onClick={ () => history.push(DRINK_BY_INGREDIENTS) }
            >
              Por Ingredientes
            </button>
            <button type="button" data-testid="explore-surprise">
              Me Surpreenda!
            </button>
          </>
        )
      }
      <Footer />
    </>
  );
};

export default Explore;

Explore.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};
