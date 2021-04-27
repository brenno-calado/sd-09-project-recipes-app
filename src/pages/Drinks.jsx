import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';

function Drinks({ match }) {
  console.log(match);
  return (
    <div>
      <button type="button" data-testid="search-top-btn">click</button>
      {SearchBar(match)}
    </div>
  );
}

Drinks.propTypes = {
  match: PropTypes.shape({}).isRequired,
};

export default Drinks;
