import React from 'react';
import PropTypes from 'prop-types';
import ExploreButtons from '../../common/components/buttons/ExploreButtons';
import Footer from '../../common/components/Footer';
import Header from '../../common/components/Header';

function ExploreDrinks({ history }) {
  return (
    <div>
      <Header title="Explorar Bebidas" isSearchEnable={ false } />
      <ExploreButtons isAreaEnable={ false } type="bebidas" history={ history } />
      <Footer />
    </div>
  );
}

ExploreDrinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ExploreDrinks;
