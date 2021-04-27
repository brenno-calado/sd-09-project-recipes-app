import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import ProfileButton from './buttons/header/ProfileButton';
import SearchButton from './buttons/header/SearchButton';

function Header({ title }) {
  const { pathname } = useLocation();
  return (
    <header data-testid="" className="header-container">
      <ProfileButton />
      <h3 data-testid="page-title">
        {title}
      </h3>
      {
        pathname === '/comidas'
        || pathname === '/bebidas'
        || pathname === '/explorar/comidas/area'
          ? <SearchButton /> : null
      }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
