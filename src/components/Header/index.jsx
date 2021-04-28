import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HeaderStyle from './styled';
import ProfileIcon from '../../images/profileIcon.svg';
import SearchBar from '../SearchBar/SearchBar';

function Header({ title = 'teste', canFind = false }) {
  return (
    <>
      <HeaderStyle>
        <Link to="/perfil">
          <img data-testid="profile-top-btn" src={ ProfileIcon } alt="profile-button" />
        </Link>
        <span data-testid="page-title">{title}</span>
      </HeaderStyle>
      {canFind && <SearchBar />}
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  canFind: PropTypes.bool.isRequired,
};

export default Header;
