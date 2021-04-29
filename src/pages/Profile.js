import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getPageTitle from '../services/pageTitles';

const Profile = ({ match: { path } }) => (
  <Header title={ getPageTitle(path) } />
);

export default Profile;

Profile.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};
