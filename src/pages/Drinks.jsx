import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Drinks({ match }) {
  return (
    <div>
      <Header title="Bebidas" match={ match } />
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  match: PropTypes.shape({}).isRequired,
};

export default Drinks;
