import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Header2({ title }) {
  return (
    <div>
      <Link to="/perfil">
        <img src="../images/profileIcon.svg" alt="icon" data-testid="profile-top-btn" />
      </Link>
      <h1 data-testid="page-title">{ title }</h1>
    </div>
  );
}

Header2.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header2;
