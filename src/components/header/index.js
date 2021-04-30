import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function index({ title, setSearch }) {
  return (
    <div className="container-header">
      <Link to="/perfil" data-testid="profile-top-btn">
        <img src={ profileIcon } alt="profileIcon" />
      </Link>
      <h2 data-testid="page-title">{ title }</h2>
      <button
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
