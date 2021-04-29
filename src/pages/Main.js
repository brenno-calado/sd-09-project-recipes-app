import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getPageTitle from '../services/pageTitles';

const Main = ({ match: { path } }) => (
  <Header activeSearch title={ getPageTitle(path) } />
);

export default Main;

Main.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};
