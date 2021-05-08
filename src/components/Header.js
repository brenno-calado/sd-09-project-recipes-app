import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIconImage from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../Style/Header/style.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: false,
    };

    this.showSearchInput = this.showSearchInput.bind(this);
  }

  showSearchInput() {
    this.setState((prevState) => ({
      searchInput: !prevState.searchInput,
    }));
  }

  render() {
    const { title, searchIcon } = this.props;
    const { searchInput } = this.state;
    return (
      <header className="header-container">
        <div className="header-component">
          <Link to="/perfil">
            <img
              className="header-profile-icon"
              src={ profileIcon }
              data-testid="profile-top-btn"
              alt="profile button"
            />
          </Link>
          <h2 className="header-meal-text" data-testid="page-title">{title}</h2>
          {searchIcon && (
            <button
              className="header-btn-search"
              type="button"
              onClick={ this.showSearchInput }
            >
              <img
                src={ searchIconImage }
                data-testid="search-top-btn"
                alt="search button"
              />
            </button>
          )}
        </div>
        <SearchBar searchInput={ searchInput } />
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchIcon: PropTypes.bool.isRequired,
};

export default Header;
