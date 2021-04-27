import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ProfileImage from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import { toggleSearchBar } from '../../actions/userActions';

const Header = (props) => {
  const { title, isSearchEnable = true } = props;
  return (
    <header
      style={ {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      } }
    >
      <div>
        <Link to="/perfil">
          <img
            src={ ProfileImage }
            alt="profileIcon"
            data-testid="profile-top-btn"
          />
        </Link>
      </div>
      <h1
        data-testid="page-title"
      >
        { title }
      </h1>
      <div>
        { isSearchEnable
          && <img
            src={ SearchIcon }
            alt="profileIcon"
            data-testid="search-top-btn"
          /> }
      </div>
    </header>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleSearchBar: () => dispatch(toggleSearchBar()),
});

Header.propTypes = {
  title: PropTypes.string.isRequired,
  isSearchEnable: PropTypes.bool.isRequired,
};

export default connect(null, mapDispatchToProps)(Header);
