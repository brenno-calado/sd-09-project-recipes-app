import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

function index({ title }) {
  return (
    <div className="container-header">
      <Link to="/perfil" data-testid="profile-top-btn">
        <img src="profileIcon.svg" alt="profileIcon" />
      </Link>
      <h2 data-testid="page-title">{ title }</h2>
      <button className="btn-search" type="button" data-testid="search-top-btn">
        <img src="searchIcon.svg" alt="searchIcon" />
      </button>
    </div>
  );
}

export default index;
