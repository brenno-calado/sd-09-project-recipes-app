import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Perfil() {
  return (
    <div>
      <Header page="Perfil" />
      <p data-testid="profile-email">
        Email
      </p>
      <button
        type="button"
        data-testid="profile-done-btn"
      >
        <Link
          to="/receitas-feitas"
        >
          Receitas Feitas
        </Link>
      </button>

      <button
        type="button"
        data-testid="profile-favorite-btn"
      >
        <Link
          to="/receitas-favoritas"
        >
          Receitas Favoritas
        </Link>
      </button>

      <button
        type="button"
        data-testid="profile-logout-btn"
      >
        Sair
      </button>
      Perfil
      <Footer />
    </div>
  );
}

export default Perfil;
