import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

const { email } = JSON.parse(localStorage.getItem('user'));

function clearLocalStorage() {
  return (
    localStorage.clear()
  );
}

const Profile = () => (
  <div>
    <Header />
    <div data-testid="profile-email">
      { email }
    </div>
    <div>
    <Link to="/receitas-favoritas">
        <button
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/receitas-feitas">
        <button
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </button>
      </Link>
      <Link to="/">
        <button
          data-testid="profile-logout-btn"
          onClick={ clearLocalStorage }
        >
          Sair
        </button>
      </Link>
    </div>
    <MenuInferior />
  </div>
);

export default Profile;
