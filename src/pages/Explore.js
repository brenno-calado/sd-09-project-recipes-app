import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import getPageTitle from '../services/pageTitles';

import paths from '../routes/paths';

const { EXPLORE, EXPLORE_DRINK, EXPLORE_FOOD } = paths;

const Explore = ({ match: { path } }) => {
  const history = useHistory();
  return (
    <>
      <Header title={ getPageTitle(path) } />
      {
        path.includes(EXPLORE) && (
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
