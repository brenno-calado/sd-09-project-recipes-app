import React from 'react';
import PropTypes from 'prop-types';
import ExploreDrinksOrFoods from '../components/ExploreDrinksOrFoods';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreDrinks({ match: { path } }) {
  return (
    <>
      <Header title="Explorar Bebidas" />
      <ExploreDrinksOrFoods path={ path } />
      <Footer />
    </>
  );
}

ExploreDrinks.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default ExploreDrinks;
