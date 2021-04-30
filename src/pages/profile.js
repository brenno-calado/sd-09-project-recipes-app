import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';

export default function Perfil() {
  const user = JSON.parse(localStorage.getItem('user'));
  const clearLocalStorage = () => {
    localStorage.clear()
  }

  return (
    <>
      <Header page="Perfil" />
      <h1 data-testid="profile-email">{ user?.email }</h1>
      <main className="perfil">
        <Link to="/receitas-feitas">
          <btn data-testid="profile-done-btn">Receitas Feitas</btn>
        </Link>
        <Link to="/receitas-favoritas">
          <btn data-testid="profile-favorite-btn">Receitas Favoritas</btn>
        </Link>
        <Link to="/">
          <brn
            data-testid="profile-logout-btn"
            onClick={ clearLocalStorage }
          >
            Sair
          </brn>
        </Link>
      </main>
      <Footer />
    </>
  );
}
