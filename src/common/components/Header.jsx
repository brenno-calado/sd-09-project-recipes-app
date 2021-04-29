import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileImage from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

const Header = (props) => {
  const { title, isSearchEnable, history } = props;
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const createSearchButton = () => (
    <button
      type="button"
      onClick={ () => setDisplaySearchBar(!displaySearchBar) }
    >
      <img
        data-testid="search-top-btn"
        src={ SearchIcon }
        alt="profileIcon"
      />
    </button>
  );

  const { value } = props;

  return (
    <>
      <header
        style={ {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 2rem',
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
          { isSearchEnable && createSearchButton() }
        </div>
      </header>
      <div>
        {displaySearchBar && <SearchBar value={ value } history={ history } />}
      </div>
    </>
  );
};

Header.defaultProps = {
  isSearchEnable: true,
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  isSearchEnable: PropTypes.bool,
  value: PropTypes.string.isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default Header;
