import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreFoodAreaa from '../components/ExploreFoodAreaa/index';

function ExploreFoodArea({ match: { path } }) {
  return (
    <>
      <Header title="Explorar Origem" path={ path } />
      <ExploreFoodAreaa />
      <Footer />
    </>
  );
}

ExploreFoodArea.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default ExploreFoodArea;
