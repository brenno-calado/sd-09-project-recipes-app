import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
// import SearchBar from '../components/SearchBar';

function Food({ match }) {
  return (
    <div>
      <Header title="Comidas" match={ match } />
    </div>
  );
}

Food.propTypes = {
  match: PropTypes.shape({}).isRequired,
};

export default Food;
