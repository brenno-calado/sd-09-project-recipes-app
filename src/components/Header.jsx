import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';
import ProfileButton from './buttons/header/ProfileButton';
import SearchButton from './buttons/header/SearchButton';
import SearchBar from './SearchBar';

function Header({ title }) {
  const { pathname } = useLocation();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div>
      <header data-testid="" className="header-container">
        <ProfileButton />
        <h3 data-testid="page-title">
          {title}
        </h3>
        {
          pathname === '/comidas'
          || pathname === '/bebidas'
          || pathname === '/explorar/comidas/area'
            ? <SearchButton onClick={ setShowSearch } status={ showSearch } /> : null
        }
      </header>
      {showSearch ? <SearchBar setShowSearchBar={ setShowSearch } /> : null}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
