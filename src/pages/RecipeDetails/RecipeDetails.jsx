import React from 'react';
import PropTypes from 'prop-types';

function RecipeDetails(props) {
  const { history: { location: { state } } } = props;
  console.log(state);

  return <h1>Detalhes Comidas</h1>;
}

RecipeDetails.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      state: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
};

export default RecipeDetails;
