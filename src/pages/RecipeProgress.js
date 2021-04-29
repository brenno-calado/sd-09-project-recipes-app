import React from 'react';
import PropTypes from 'prop-types';

const RecipeProgress = ({ match: { path } }) => {
  // const isFoodsProgressPage = path.includes('comida');
  // const isDrinksProgressPage = path.includes('bebidas');
  console.log(path);

  return (<div>In progress</div>);
};

export default RecipeProgress;

RecipeProgress.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};
