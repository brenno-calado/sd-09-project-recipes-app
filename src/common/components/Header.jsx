import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileImage from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

const Header = (props) => {
  const { title, isSearchEnable = true } = props;
  const [displaySearchBar, setDisplaySearchBar] = useState(false);
  const createSearchButton = () => (
    <button
      data-testid="search-top-btn"
      type="button"
      onClick={ () => setDisplaySearchBar(!displaySearchBar)}
    >
      <img
        src={ SearchIcon }
        alt="profileIcon"
      />
    </button>
  );

  return (
    <>
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
          { isSearchEnable && createSearchButton() }
        </div>
      </header>
      <div>
        {displaySearchBar && <SearchBar />}
      </div>
    </>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  isSearchEnable: PropTypes.bool.isRequired,
};

export default Header;
