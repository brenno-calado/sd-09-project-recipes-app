import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIconImage from '../images/searchIcon.svg';

class Header extends React.Component {
  render() {
    const { title, searchIcon } = this.props;
    return (
      <header className="header-component">
        <Link to="/perfil">
          <img
            src={ profileIcon }
            data-testid="profile-top-btn"
            alt="profile button"
          />
        </Link>
        <h2 data-testid="page-title">{title}</h2>
        {searchIcon && (
          <Link to="/explorar">
            <img
              src={ searchIconImage }
              data-testid="search-top-btn"
              alt="search button"
            />
          </Link>
        )}
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchIcon: PropTypes.bool.isRequired,
};

export default Header;
