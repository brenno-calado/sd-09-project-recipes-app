import React from 'react';
import PropTypes from 'prop-types';

const RecipeDetails = ({ match: { path } }) => {
  // const isFoodsPage = path.includes('comida');
  // const isDrinksPage = path.includes('bebidas');
  console.log(path);

  return (<div>Process</div>);
};

export default RecipeDetails;

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};
