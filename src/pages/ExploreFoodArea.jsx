import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function ExploreFoodArea({ match }) {
  return <Header title="Explorar Origem" match={ match } />;
}

ExploreFoodArea.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default ExploreFoodArea;
