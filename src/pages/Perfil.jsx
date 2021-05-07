import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../Style/Perfil.css';

function Perfil() {
  return (
    <div>
      <Header page="Perfil" />
      <div className="perfilPage">
        <p data-testid="profile-email" className="email">
          {localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).email}
        </p>
        <div className="buttonProfile">
          <Link
            to="/receitas-feitas"
          >
            <button
              className="btn-explorer"
              type="button"
              data-testid="profile-done-btn"
            >
              Receitas Feitas
            </button>
          </Link>

          <Link
            to="/receitas-favoritas"
          >
            <button
              className="btn-explorer"
              type="button"
              data-testid="profile-favorite-btn"
            >
              Receitas Favoritas
            </button>
          </Link>

          <Link
            to="/"
          >
            <button
              className="btn-explorer"
              type="button"
              data-testid="profile-logout-btn"
              onClick={ () => localStorage.clear() }
            >
              Sair
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
// aaas
export default Perfil;
