import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getPageTitle from '../services/pageTitles';

const RecipeList = ({ match: { path } }) => (
  <Header title={ getPageTitle(path) } />
);

export default RecipeList;

RecipeList.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};
