import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Food({ match }) {
  return <Header title="Comidas" match={ match } />;
}

Food.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default Food;
