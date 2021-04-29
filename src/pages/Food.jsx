import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function Food({ match }) {
  return (
    <div>
      <Header title="Comidas" match={ match } />;
      <button type="button" data-testid="search-top-btn">click</button>
      {SearchBar(match)}
    </div>
  );
}

Food.propTypes = {
  match: PropTypes.shape({}).isRequired,
};

export default Food;
