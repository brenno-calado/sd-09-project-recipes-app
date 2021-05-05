import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function Perfil() {
  const logout = () => {
    localStorage.clear();
  };

  const userEmail = JSON.parse(localStorage.getItem('user')) || '';

  return (
    <>
      <Header explore="false">Perfil</Header>
      <section>
        <span
          data-testid="profile-email"
        >
          {userEmail.email}
        </span>
        <div>
          <button
            data-testid="profile-done-btn"
            type="button"
          >
            <Link to="/receitas-feitas">
              Receitas Feitas
          </Link>
          </button>
          <button
            data-testid="profile-favorite-btn"
            type="button"
          >
            <Link to="/receitas-favoritas">
              Receitas Favoritas
          </Link>
          </button>
          <button
            data-testid="profile-logout-btn"
            type="button"
            onClick={logout}
          >
            <Link to="/">
              Sair
          </Link>
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Perfil;
