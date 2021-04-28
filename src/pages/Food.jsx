import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';

function Food({ match }) {
  return (
    <div>
      <button type="button" data-testid="search-top-btn">click</button>
      {SearchBar(match)}
    </div>
  );
}

Food.propTypes = {
  match: PropTypes.shape({}).isRequired,
};

export default Food;
