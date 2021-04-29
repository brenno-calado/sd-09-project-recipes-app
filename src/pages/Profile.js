import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import getPageTitle from '../services/pageTitles';

const Profile = ({ match: { path } }) => (
  <>
    <Header title={ getPageTitle(path) } />
    <Footer />
  </>
);

export default Profile;

Profile.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};
