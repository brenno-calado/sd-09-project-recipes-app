import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';

function Drinks({ match }) {
  return (
    <div>
      <Header title="Bebidas" match={ match } />
      {SearchBar(match)}
    </div>
  );
}

Drinks.propTypes = {
  match: PropTypes.shape({}).isRequired,
};

export default Drinks;
