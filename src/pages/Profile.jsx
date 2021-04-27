import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import '../styles/profile.css';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="profile">
      <Header />
      <h3 data-testid="profile-email" className="profile-email">
        { user !== null ? user.email : 'email' }
      </h3>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="profile-done-btn"
          className="profile-btn"
        >
          Receitas Feitas
        </button>
      </Link>
      <Link to="/receitas-favoritas">
        <button
          type="button"
          data-testid="profile-favorite-btn"
          className="profile-btn"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          className="profile-btn"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </button>
      </Link>
      <BottomMenu />
    </div>
  );
}

export default Profile;
