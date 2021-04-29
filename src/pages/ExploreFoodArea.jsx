import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoodArea({ match: { path } }) {
  return (
    <>
      <Header title="Explorar Origem" path={ path } />
      <Footer />
    </>
  );
}

ExploreFoodArea.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default ExploreFoodArea;
