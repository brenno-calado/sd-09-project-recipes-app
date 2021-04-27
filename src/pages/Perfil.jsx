import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Perfil() {
  const { email } = props;
  return (
    <div>
      <Header page="Perfil" />
      <p data-testid="profile-email">
        {email}
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

Perfil.propTypes = {
  email: PropTypes.string.isRequired,
};

export default Perfil;
