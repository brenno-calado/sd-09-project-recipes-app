import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';

const RecipeDetails = ({ match: { path } }) => {
  // const isFoodsPage = path.includes('comida');
  // const isDrinksPage = path.includes('bebidas');
  console.log(path);

  return (
    <Footer />
  );
};

export default RecipeDetails;

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};
