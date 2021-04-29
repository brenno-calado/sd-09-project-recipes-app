import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function Drinks({ match }) {
  return (
    <div>
      <Header title="Bebidas" match={ match } />;
      <button type="button" data-testid="search-top-btn">click</button>
      {SearchBar(match)}
    </div>
  );
}

Drinks.propTypes = {
  match: PropTypes.shape({}).isRequired,
};

export default Drinks;
