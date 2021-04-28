import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Drinks({ match }) {
  return <Header title="Bebidas" match={ match } />;
}

Drinks.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default Drinks;
