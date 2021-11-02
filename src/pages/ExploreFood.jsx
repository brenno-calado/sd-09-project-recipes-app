import React from 'react';
import PropTypes from 'prop-types';
import ExploreDrinksOrFoods from '../components/ExploreDrinksOrFoods';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFood({ match: { path } }) {
  return (
    <>
      <Header title="Explorar Comidas" />
      <ExploreDrinksOrFoods path={ path } />
      <Footer />
    </>
  );
}

ExploreFood.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default ExploreFood;
