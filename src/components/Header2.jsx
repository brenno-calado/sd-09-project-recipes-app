import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import '../styles/header.css';

function Header2({ title }) {
  return (
    <header className="container-header">
      <Link to="/perfil">
        <img
          src={ profileIcon }
          alt="icon"
          data-testid="profile-top-btn"
          className="header-icon"
        />
      </Link>
      <h1 data-testid="page-title" className="title">{ title }</h1>
    </header>
  );
}

Header2.propTypes = {
  title: PropTypes.string,
};

Header2.defaultProps = {
  title: null,
};

export default Header2;
