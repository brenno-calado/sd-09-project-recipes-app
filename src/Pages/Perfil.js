import React from 'react';
import { Link } from 'react-router-dom';
import { Header, MenuInferior } from '../Components';

export default function Perfil() {
  const { email } = JSON.parse(localStorage.getItem('user'));
  const clearLocalStorage = () => {
    localStorage.clear();
  };
  return (
    <div>
      <Header />
      <span data-testid="profile-email">
        { email }
      </span>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </button>
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
      <MenuInferior />
    </div>
  );
}
