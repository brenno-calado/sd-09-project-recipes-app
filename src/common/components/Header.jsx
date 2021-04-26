import React from 'react';
import PropTypes from 'prop-types';
import ProfileImage from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

const Header = (props) => {
  const { title } = props;
  return (
    <header
      style={ {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      } }
    >
      <div>
        <img
          src={ ProfileImage }
          alt="profileIcon"
          data-testid="profile-top-btn"
        />
      </div>
      <h1
        data-testid="page-title"
      >
        { title }
      </h1>
      <div>
        <img
          src={ SearchIcon }
          alt="profileIcon"
          data-testid="search-top-btn"
        />
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
