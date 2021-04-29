import React from 'react';
import PropTypes from 'prop-types';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

const Header = ({ activeSearch = false, title }) => (
  <header>
    <img
      src={ ProfileIcon }
      data-testid="profile-top-btn"
      alt="profile icon"
    />
    <h2 data-testid="page-title">{ title }</h2>
    { activeSearch && <img
      src={ SearchIcon }
      data-testid="search-top-btn"
      alt="search icon"
    /> }
  </header>
);

export default Header;

Header.propTypes = {
  activeSearch: PropTypes.bool,
  title: PropTypes.string,
};

Header.defaultProps = {
  activeSearch: false,
  title: 'App de Receitas',
};
