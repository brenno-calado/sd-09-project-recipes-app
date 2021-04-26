import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Header({ title }) {
  const [search, setSearch] = useState(false);

  function renderContent() {
    return (
      <div>
        <Link to="/perfil">
          <img src="../images/profileIcon.svg" alt="icon" data-testid="profile-top-btn" />
        </Link>
        <h1 data-testid="page-title">{ title }</h1>
        <button type="button" onClick={ () => setSearch(!search) }>
          <img
            src="../images/searchIcon.svg"
            alt="search"
            data-testid="search-top-btn"
          />
        </button>
      </div>
    );
  }

  if (search) {
    return (
      <div>
        { renderContent() }
        <input type="text" id="searchBar" className="hidden" data-testid="search-input" />
      </div>
    );
  }
  return (
    <div>
      { renderContent() }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
