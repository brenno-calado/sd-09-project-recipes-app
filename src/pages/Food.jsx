import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Food({ match }) {
  return (
    <>
      <Header title="Comidas" match={ match } />
      <Footer />
    </>
  );
}

Food.propTypes = {
  match: PropTypes.shape({}).isRequired,
};

export default Food;
