import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import getPageTitle from '../services/pageTitles';

const Explore = ({ match: { path } }) => (
  <>
    <Header title={ getPageTitle(path) } />
    <Footer />
  </>
);

export default Explore;

Explore.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};
