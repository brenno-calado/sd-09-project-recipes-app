import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { email } = user || 'invalid user';

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <div>
      <Header title="Perfil" />
      <p data-testid="profile-email">{ email }</p>
      <Link to="/receitas-feitas">
        <button type="button" data-testid="profile-done-btn">Receitas Feitas</button>
      </Link>
      <Link to="/receitas-favoritas">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ clearLocalStorage }
        >
          Sair
        </button>
      </Link>
    </div>
  );
};

export default Profile;
