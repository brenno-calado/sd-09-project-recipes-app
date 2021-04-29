import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Drinks({ match }) {
  return (
    <div>
      <Header title="Bebidas" match={ match } />
    </div>
  );
}

Drinks.propTypes = {
  match: PropTypes.shape({}).isRequired,
};

export default Drinks;
