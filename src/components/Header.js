import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import paths from '../routes/paths';
import SearchBar from './SearchBar';

const Header = ({ activeSearch = false, title }) => {
  const history = useHistory();
  const [showSearchBar, setShowSearchBar] = useState(false);
  return (
    <header>
      <div className="menu">
        <button type="button" onClick={ () => history.push(paths.PROFILE_PAGE) }>
          <img
            data-testid="profile-top-btn"
            src={ ProfileIcon }
            alt="profile icon"
          />
        </button>
        <h2 className="title" data-testid="page-title">{ title }</h2>
        { activeSearch && (
          <button type="button" onClick={ () => setShowSearchBar(!showSearchBar) }>
            <img
              src={ SearchIcon }
              data-testid="search-top-btn"
              alt="search icon"
            />
          </button>)}
      </div>
      { showSearchBar && <SearchBar /> }
    </header>
  );
};

export default Header;

Header.propTypes = {
  activeSearch: PropTypes.bool,
  title: PropTypes.string,
};

Header.defaultProps = {
  activeSearch: false,
  title: 'App de Receitas',
};
