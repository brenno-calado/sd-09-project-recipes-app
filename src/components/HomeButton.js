import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import home from '../images/home.svg';

const HomeButton = ({ destination }) => {
  const history = useHistory();
  return (
    <button type="button" onClick={ () => history.push(`/${destination}`) }>
      <img src={ home } alt="home" width="30px" />
    </button>
  );
};

export default HomeButton;

HomeButton.propTypes = {
  destination: PropTypes.string.isRequired,
};
