import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function ExploreFoodArea({ match: { path } }) {
  return <Header title="Explorar Origem" path={ path } />;
}

ExploreFoodArea.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default ExploreFoodArea;
