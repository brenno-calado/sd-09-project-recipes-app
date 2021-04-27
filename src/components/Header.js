import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';

export default function Header(props) {
  const { title } = props;
  return (
    <header>
      <Link to="/perfil">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="" />
      </Link>
      <span data-testid="page-title">{title}</span>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
