import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreArea from '../components/ExploreArea';

function ExploreFoodArea({ match: { path } }) {
  return (
    <>
      <Header title="Explorar Origem" path={ path } />
      <ExploreArea />
      <Footer />
    </>
  );
}

ExploreFoodArea.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default ExploreFoodArea;
