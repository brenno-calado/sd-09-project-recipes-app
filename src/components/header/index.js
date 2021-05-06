import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

import profileIcon from '../../images/newIcons/profileIcon.svg';
import searchIcon from '../../images/newIcons/searchIcon.svg';

function index({ title, setSearch, iconSearch = 'visible' }) {
  return (
    <div className="container-header">
      <Link to="/perfil" data-testid="profile-top-btn">
        <img src={ profileIcon } alt="profileIcon" />
      </Link>
      <h2 className="title-header" data-testid="page-title">{ title }</h2>
      <button
        style={ { visibility: iconSearch } }
        className="btn-search-header"
        type="button"
        data-testid="search-top-btn"
        onClick={ () => setSearch() }
      >
        <img src={ searchIcon } alt="searchIcon" />
      </button>
    </div>
  );
}

export default index;
