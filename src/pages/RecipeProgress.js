import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';

const RecipeProgress = ({ match: { path } }) => {
  // const isFoodsProgressPage = path.includes('comida');
  // const isDrinksProgressPage = path.includes('bebidas');
  console.log(path);

  return (
    <Footer />
  );
};

export default RecipeProgress;

RecipeProgress.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};
