import React from 'react';
import PropTypes from 'prop-types';
import ExploreButtons from '../../common/components/buttons/ExploreButtons';
import Footer from '../../common/components/Footer';
import Header from '../../common/components/Header';

function ExploreFood({ history }) {
  return (
    <div>
      <Header title="Explorar Comidas" isSearchEnable={ false } />
      <ExploreButtons isAreaEnable type="comidas" history={ history } />
      <Footer />
    </div>
  );
}

ExploreFood.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ExploreFood;
