import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Perfil() {
  return (
    <div>
      <p data-testid="profile-email">email@mail.com</p>
      <Link to="/receitas-feitas">
        <button data-testid="profile-done-btn" type="button">
          Receitas Feitas
        </button>
      </Link>

      <Link to="/receitas-favoritas">
        <button data-testid="profile-favorite-btn" type="button">
          Receitas Favoritas
        </button>
      </Link>

      <Link to="/">
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </button>
      </Link>

      <Footer />
    </div>
  );
}

export default Perfil;
