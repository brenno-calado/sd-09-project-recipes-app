import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoodArea({ match }) {
  return (
    <>
      <Header title="Explorar Origem" match={ match } />
      <Footer />
    </>
  );
}

ExploreFoodArea.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default ExploreFoodArea;
